import { createSync, type SyncStorage } from "../sync";

function fakeStorage(init: Record<string, string> = {}): SyncStorage & { map: Map<string, string> } {
  const map = new Map(Object.entries(init));
  return {
    map,
    get length() { return map.size; },
    key: (i) => [...map.keys()][i] ?? null,
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => void map.set(k, v),
    removeItem: (k) => void map.delete(k)
  };
}

/** Minimal GitHub-gist-låtsasserver. */
function fakeGithub(files: Record<string, string> = {}, gists: { id: string; description: string }[] = []) {
  const calls: string[] = [];
  const fetchFn = (async (url: string, init?: RequestInit) => {
    const path = url.replace("https://api.github.com", "");
    const method = init?.method ?? "GET";
    calls.push(`${method} ${path}`);
    expect((init?.headers as Record<string, string>).Authorization).toBe("Bearer tok");
    const json = (b: unknown) => ({ ok: true, status: 200, json: async () => b });
    if (method === "GET" && path.startsWith("/gists?")) return json(gists);
    if (method === "POST" && path === "/gists") {
      const body = JSON.parse(String(init?.body));
      expect(body.public).toBe(false);
      expect(body.description).toBe("yh-prep-lab-sync");
      for (const [n, f] of Object.entries<any>(body.files)) files[n] = f.content;
      gists.push({ id: "g1", description: body.description });
      return json({ id: "g1" });
    }
    if (method === "GET") return json({ files: Object.fromEntries(Object.entries(files).map(([n, c]) => [n, { content: c }])) });
    if (method === "PATCH") {
      for (const [n, f] of Object.entries<any>(JSON.parse(String(init?.body)).files)) files[n] = f.content;
      return json({});
    }
    return { ok: false, status: 404, json: async () => ({}) };
  }) as unknown as typeof fetch;
  return { fetchFn, files, calls };
}

describe("sync", () => {
  it("synkar inte utan nyckel", async () => {
    const gh = fakeGithub();
    const s = createSync({ storage: fakeStorage({ "yh.hp-plan.martin": "{}" }), fetchFn: gh.fetchFn, getUser: () => "martin" });
    expect(await s.syncNow()).toBe(false);
    expect(gh.calls).toEqual([]);
    expect(s.statusText()).toBe("Inte kopplad");
  });

  it("koppla skapar hemlig gist, pushar bara den egna användarens data, aldrig nyckeln", async () => {
    const gh = fakeGithub();
    const st = fakeStorage({ "yh.hp-mek-seen.martin": '["a"]', "yh.hp-mek-seen.sys": '["x"]', "yh.color-mode": "dark" });
    const s = createSync({ storage: st, fetchFn: gh.fetchFn, getUser: () => "martin", now: () => 1000 });
    expect(await s.connect("tok")).toBe(true);
    const pushed = JSON.parse(gh.files["martin.json"]);
    expect(Object.keys(pushed.keys)).toEqual(["yh.hp-mek-seen"]);
    expect(gh.files["martin.json"]).not.toContain("tok");
    expect(st.getItem("yh.sync-token.martin")).toBe("tok");
    expect(st.getItem("yh.sync-gist.martin")).toBe("g1");
    expect(JSON.stringify(s.exportSnapshot())).not.toContain("sync-");
    expect(s.statusText()).toMatch(/^Synkad \d\d:\d\d$/);
  });

  it("hittar befintlig gist med samma beskrivning och slår ihop mellan enheter", async () => {
    const gh = fakeGithub({}, [{ id: "g1", description: "yh-prep-lab-sync" }]);
    let applied = 0;
    // Enhet A
    let nowA = 1000;
    const a = fakeStorage({ "yh.hp-mek-result.martin": JSON.stringify([{ completedAt: "2026-10-01" }]) });
    const sa = createSync({ storage: a, fetchFn: gh.fetchFn, getUser: () => "martin", now: () => nowA });
    await sa.connect("tok");
    // Enhet B har egen historik
    const b = fakeStorage({ "yh.hp-mek-result.martin": JSON.stringify([{ completedAt: "2026-10-02" }]) });
    const sb = createSync({ storage: b, fetchFn: gh.fetchFn, getUser: () => "martin", now: () => 2000, onApplied: () => applied++ });
    await sb.connect("tok");
    expect(JSON.parse(b.getItem("yh.hp-mek-result.martin")!)).toHaveLength(2);
    expect(applied).toBe(1);
    nowA = 3000;
    await sa.syncNow();
    expect(JSON.parse(a.getItem("yh.hp-mek-result.martin")!)).toHaveLength(2);
  });

  it("nätverksfel ger status 'Kunde inte synka' och tappar inget", async () => {
    const st = fakeStorage({ "yh.hp-plan.martin": "{}", "yh.sync-token.martin": "tok" });
    const failing = (async () => { throw new Error("offline"); }) as unknown as typeof fetch;
    const s = createSync({ storage: st, fetchFn: failing, getUser: () => "martin" });
    expect(await s.syncNow()).toBe(false);
    expect(s.statusText()).toBe("Kunde inte synka – försöker igen");
    expect(st.getItem("yh.hp-plan.martin")).toBe("{}");
    s.disconnect();
  });

  it("import slår ihop gammal backup med lokal data", () => {
    const st = fakeStorage({ "yh.study-sessions.martin": JSON.stringify([{ completedAt: "2026-10-02" }]) });
    const s = createSync({ storage: st, fetchFn: fetch, getUser: () => "martin" });
    s.importSnapshot({ studySessions: [{ completedAt: "2026-10-01" }], exportedAt: "2026-10-01T00:00:00Z" });
    expect(JSON.parse(st.getItem("yh.study-sessions.martin")!)).toHaveLength(2);
  });
});
