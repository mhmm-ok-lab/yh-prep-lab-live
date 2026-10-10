import { mergeEntry, mergeSnapshots, refreshMeta, snapshotFrom, type SyncEntry } from "../sync-merge";

const e = (v: unknown, t: number): SyncEntry => ({ v: v === null ? null : JSON.stringify(v), t });
const val = (x: SyncEntry | undefined) => (x?.v ? JSON.parse(x.v) : null);

describe("sync-merge", () => {
  it("resultathistorik: union utan dubbletter, sorterad", () => {
    const a = e([{ completedAt: "2026-10-01", c: 1 }, { completedAt: "2026-10-03", c: 3 }], 1);
    const b = e([{ completedAt: "2026-10-02", c: 2 }, { completedAt: "2026-10-03", c: 3 }], 2);
    const m = val(mergeEntry("yh.hp-mek-result", a, b));
    expect(m.map((x: any) => x.c)).toEqual([1, 2, 3]);
  });
  it("study-sessions behåller nyast-först", () => {
    const a = e([{ completedAt: "2026-10-03" }, { completedAt: "2026-10-01" }], 1);
    const b = e([{ completedAt: "2026-10-02" }], 2);
    const m = val(mergeEntry("yh.study-sessions", a, b));
    expect(m.map((x: any) => x.completedAt)).toEqual(["2026-10-03", "2026-10-02", "2026-10-01"]);
  });
  it("formelkort: per post den nyare, inget försvinner", () => {
    const a = e({ cards: { x: { introduced: "d", clean: 1, lastClean: "2026-10-01", due: "2026-10-02" }, y: { introduced: "d", clean: 1, lastClean: "2026-10-05", due: "z" } }, passes: [{ completedAt: "1" }] }, 1);
    const b = e({ cards: { x: { introduced: "d", clean: 2, lastClean: "2026-10-04", due: "2026-10-09" }, z: { introduced: "d", clean: 0, lastClean: "", due: "q" } }, passes: [{ completedAt: "2" }] }, 2);
    const m = val(mergeEntry("yh.hp-formula", a, b));
    expect(m.cards.x.clean).toBe(2);
    expect(Object.keys(m.cards).sort()).toEqual(["x", "y", "z"]);
    expect(m.passes).toHaveLength(2);
  });
  it("plan checks: union av avbockade", () => {
    const a = e({ checks: { "2026-10-10": ["a"] }, snapshots: {} }, 1);
    const b = e({ checks: { "2026-10-10": ["b"], "2026-10-11": ["c"] }, snapshots: {} }, 2);
    const m = val(mergeEntry("yh.hp-plan", a, b));
    expect(m.checks["2026-10-10"]).toEqual(["a", "b"]);
    expect(m.checks["2026-10-11"]).toEqual(["c"]);
  });
  it("köer och seen: senaste skrivning vinner (avklarade återuppstår inte)", () => {
    expect(val(mergeEntry("yh.hp-mek-repeat", e(["a", "b"], 1), e(["b"], 2)))).toEqual(["b"]);
    expect(val(mergeEntry("yh.hp-mek-seen", e(["a", "b"], 5), e(["a"], 2)))).toEqual(["a", "b"]);
  });
  it("aktiv session: borttagning nyare än skrivning vinner, äldre gör det inte", () => {
    expect(mergeEntry("yh.active-session", e({ s: 1 }, 1), e(null, 2))?.v).toBeNull();
    expect(val(mergeEntry("yh.active-session", e({ s: 1 }, 3), e(null, 2)))).toEqual({ s: 1 });
  });
  it("resultat försvinner aldrig av gravsten", () => {
    expect(val(mergeEntry("yh.hp-mek-result", e([{ completedAt: "1" }], 1), e(null, 9)))).toHaveLength(1);
  });
  it("mergeSnapshots tar nycklar från båda sidor", () => {
    const m = mergeSnapshots({ version: 1, updatedAt: 1, keys: { "yh.a": e(1, 1) } }, { version: 1, updatedAt: 2, keys: { "yh.b": e(2, 2) } });
    expect(Object.keys(m.keys).sort()).toEqual(["yh.a", "yh.b"]);
  });
  it("refreshMeta: ny tid bara för ändrade nycklar, gravsten för borttagna", () => {
    const m1 = refreshMeta({ "yh.a": "1", "yh.b": "2" }, {}, 100);
    const m2 = refreshMeta({ "yh.a": "1", "yh.b": "3" }, m1, 200);
    expect(m2["yh.a"].t).toBe(100);
    expect(m2["yh.b"].t).toBe(200);
    const m3 = refreshMeta({ "yh.a": "1" }, m2, 300);
    expect(m3["yh.b"]).toMatchObject({ deleted: true, t: 300 });
    expect(snapshotFrom({ "yh.a": "1" }, m3, 300).keys["yh.b"].v).toBeNull();
  });
});
