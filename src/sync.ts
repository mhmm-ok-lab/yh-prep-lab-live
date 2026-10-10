// Synk av framsteg mellan enheter via en hemlig GitHub-gist (en fil per användare).
// Nyckel och gist-id sparas per användare och följer aldrig med i synk-data eller export.
import {
  hashString,
  isSnapshot,
  legacyToSnapshot,
  mergeSnapshots,
  refreshMeta,
  sameValues,
  snapshotFrom,
  type SyncMeta,
  type SyncSnapshot
} from "./sync-merge";

const API = "https://api.github.com";
const GIST_DESCRIPTION = "yh-prep-lab-sync";
const SYNC_KEYS = ["yh.sync-token", "yh.sync-gist", "yh.sync-meta"];
const DEBOUNCE_MS = 3000;
const RETRY_MS = 30000;

export const SYNC_TOKEN_URL = "https://github.com/settings/tokens/new?scopes=gist&description=yh-prep-lab-sync";

export type SyncState = "off" | "syncing" | "ok" | "error";

export interface SyncStorage {
  readonly length: number;
  key(i: number): string | null;
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
  removeItem(k: string): void;
}

export interface SyncDeps {
  storage: SyncStorage;
  fetchFn: typeof fetch;
  getUser: () => string;
  now?: () => number;
  /** Anropas när fjärrdata ändrat lokala nycklar. */
  onApplied?: () => void;
  onStatus?: () => void;
}

export function createSync(deps: SyncDeps) {
  const now = deps.now ?? (() => Date.now());
  const { storage } = deps;
  let state: SyncState = "off";
  let lastOk = 0;
  let applying = false;
  let running: Promise<boolean> | null = null;
  let again = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const suffix = () => `.${deps.getUser()}`;
  const tokenKey = () => `yh.sync-token${suffix()}`;
  const gistKey = () => `yh.sync-gist${suffix()}`;
  const metaKey = () => `yh.sync-meta${suffix()}`;
  const fileName = () => `${deps.getUser()}.json`;

  const getToken = () => storage.getItem(tokenKey());
  const isConnected = () => !!getToken();

  function setState(s: SyncState): void {
    state = s;
    deps.onStatus?.();
  }

  /** Basnyckel → rå värde för aktuell användare, utan synk-nycklar. */
  function readUserData(): Record<string, string> {
    const sfx = suffix();
    const out: Record<string, string> = {};
    for (let i = 0; i < storage.length; i++) {
      const full = storage.key(i);
      if (!full || !full.startsWith("yh.") || !full.endsWith(sfx) || full.length <= 3 + sfx.length) continue;
      const base = full.slice(0, -sfx.length);
      if (SYNC_KEYS.includes(base)) continue;
      const v = storage.getItem(full);
      if (v !== null) out[base] = v;
    }
    return out;
  }

  function loadMeta(): SyncMeta {
    try {
      const m = JSON.parse(storage.getItem(metaKey()) ?? "{}");
      return m && typeof m === "object" ? (m as SyncMeta) : {};
    } catch {
      return {};
    }
  }

  function localSnapshot(): { snap: SyncSnapshot; meta: SyncMeta } {
    const data = readUserData();
    const meta = refreshMeta(data, loadMeta(), now());
    return { snap: snapshotFrom(data, meta, now()), meta };
  }

  /** Skriver sammanslagna värden till lagringen. Returnerar antal ändrade nycklar. */
  function apply(merged: SyncSnapshot, meta: SyncMeta): number {
    const data = readUserData();
    const sfx = suffix();
    let changed = 0;
    applying = true;
    try {
      for (const [base, e] of Object.entries(merged.keys)) {
        if (SYNC_KEYS.includes(base) || !base.startsWith("yh.")) continue;
        if (e.v === null) {
          if (base in data) {
            storage.removeItem(base + sfx);
            changed++;
          }
          meta[base] = { h: "", t: e.t, deleted: true };
        } else {
          if (data[base] !== e.v) {
            storage.setItem(base + sfx, e.v);
            changed++;
          }
          const prev = meta[base];
          meta[base] = { h: hashString(e.v), t: data[base] === e.v && prev ? prev.t : e.t };
        }
      }
      storage.setItem(metaKey(), JSON.stringify(meta));
    } finally {
      applying = false;
    }
    return changed;
  }

  function headers(token: string): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    };
  }

  async function api(token: string, path: string, init?: RequestInit): Promise<any> {
    const res = await deps.fetchFn(`${API}${path}`, { ...init, headers: headers(token) });
    if (!res.ok) throw new Error(`GitHub ${res.status}`);
    return res.json();
  }

  async function findOrCreateGist(token: string, initial: SyncSnapshot): Promise<string> {
    for (let page = 1; page <= 5; page++) {
      const list = (await api(token, `/gists?per_page=100&page=${page}`)) as { id: string; description: string }[];
      const hit = list.find((g) => g.description === GIST_DESCRIPTION);
      if (hit) return hit.id;
      if (list.length < 100) break;
    }
    const created = await api(token, "/gists", {
      method: "POST",
      body: JSON.stringify({
        description: GIST_DESCRIPTION,
        public: false,
        files: { [fileName()]: { content: JSON.stringify(initial) } }
      })
    });
    return created.id as string;
  }

  async function readRemote(token: string, id: string): Promise<SyncSnapshot | null> {
    const gist = await api(token, `/gists/${id}`);
    const file = gist.files?.[fileName()];
    if (!file) return null;
    let content: string | undefined = file.content;
    if (file.truncated && file.raw_url) {
      const raw = await deps.fetchFn(file.raw_url, { headers: { Authorization: `Bearer ${token}` } });
      if (!raw.ok) throw new Error(`GitHub ${raw.status}`);
      content = await raw.text();
    }
    if (!content) return null;
    const parsed = JSON.parse(content) as unknown;
    return isSnapshot(parsed) ? parsed : null;
  }

  async function cycle(): Promise<boolean> {
    const token = getToken();
    if (!token) {
      setState("off");
      return false;
    }
    setState("syncing");
    try {
      const { snap, meta } = localSnapshot();
      let id = storage.getItem(gistKey());
      if (!id) {
        id = await findOrCreateGist(token, snap);
        storage.setItem(gistKey(), id);
      }
      const remote = await readRemote(token, id);
      const merged = remote ? mergeSnapshots(snap, remote) : snap;
      const changed = apply(merged, meta);
      if (!remote || !sameValues(merged, remote)) {
        await api(token, `/gists/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ files: { [fileName()]: { content: JSON.stringify(merged) } } })
        });
      }
      lastOk = now();
      setState("ok");
      if (changed > 0) deps.onApplied?.();
      return true;
    } catch {
      setState("error");
      clearTimeout(timer);
      timer = setTimeout(() => void syncNow(), RETRY_MS);
      return false;
    }
  }

  /** Pull + sammanslagning + push i ett svep. Körs aldrig parallellt. */
  function syncNow(): Promise<boolean> {
    if (!isConnected()) {
      setState("off");
      return Promise.resolve(false);
    }
    if (running) {
      again = true;
      return running;
    }
    running = cycle().finally(() => {
      running = null;
      if (again) {
        again = false;
        void syncNow();
      }
    });
    return running;
  }

  function schedulePush(): void {
    if (!isConnected()) return;
    clearTimeout(timer);
    timer = setTimeout(() => void syncNow(), DEBOUNCE_MS);
  }

  /** Anropas av skriv-kroken för varje localStorage-skrivning. */
  function noteWrite(fullKey: string | null): void {
    if (applying || !fullKey) return;
    const sfx = suffix();
    if (!fullKey.startsWith("yh.") || !fullKey.endsWith(sfx)) return;
    if (SYNC_KEYS.includes(fullKey.slice(0, -sfx.length))) return;
    schedulePush();
  }

  async function connect(token: string): Promise<boolean> {
    const t = token.trim();
    if (!t) return false;
    storage.setItem(tokenKey(), t);
    storage.removeItem(gistKey());
    const ok = await syncNow();
    if (!ok) {
      storage.removeItem(tokenKey());
      setState("off");
    }
    return ok;
  }

  function disconnect(): void {
    clearTimeout(timer);
    storage.removeItem(tokenKey());
    storage.removeItem(gistKey());
    storage.removeItem(metaKey());
    setState("off");
  }

  /** Alla användarens data som snapshot (för Exportera). Innehåller aldrig synk-nycklar. */
  function exportSnapshot(): SyncSnapshot {
    return localSnapshot().snap;
  }

  /** Slår ihop en backup med lokal data. Returnerar antal ändrade nycklar. */
  function importSnapshot(raw: unknown): number {
    const incoming = isSnapshot(raw)
      ? raw
      : legacyToSnapshot((raw ?? {}) as Record<string, unknown>, now());
    if (Object.keys(incoming.keys).length === 0) throw new Error("tom backup");
    const { snap, meta } = localSnapshot();
    const changed = apply(mergeSnapshots(snap, incoming), meta);
    schedulePush();
    return changed;
  }

  function statusText(): string {
    if (state === "off" && !isConnected()) return "Inte kopplad";
    if (state === "error") return "Kunde inte synka – försöker igen";
    if (state === "syncing" && !lastOk) return "Synkar …";
    if (!lastOk) return "Synkar …";
    const d = new Date(lastOk);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `Synkad ${hh}:${mm}`;
  }

  return { syncNow, schedulePush, noteWrite, connect, disconnect, isConnected, exportSnapshot, importSnapshot, statusText };
}

export type Sync = ReturnType<typeof createSync>;

/** Kopplar skrivningar i localStorage till synken (debounce). Anropas en gång vid start. */
export function installWriteHook(onWrite: (key: string | null) => void): void {
  try {
    const proto = Storage.prototype;
    const set = proto.setItem;
    const remove = proto.removeItem;
    proto.setItem = function (this: Storage, k: string, v: string) {
      set.call(this, k, v);
      if (this === localStorage) onWrite(k);
    };
    proto.removeItem = function (this: Storage, k: string) {
      remove.call(this, k);
      if (this === localStorage) onWrite(k);
    };
  } catch {
    // Utan krok synkas ändå vid start och när fliken lämnas.
  }
}
