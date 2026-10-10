// Sammanslagning av framsteg mellan enheter. Rena funktioner, ingen localStorage eller nätverk,
// så allt går att testa. Princip: ingenting får försvinna för att en enhet glömt synka.

/** En nyckel i en snapshot. v = rå JSON-sträng, null = borttagen (gravsten). t = senaste ändring (ms). */
export interface SyncEntry {
  v: string | null;
  t: number;
}

export interface SyncSnapshot {
  version: 1;
  updatedAt: number;
  /** Basnyckel utan användarsuffix, t.ex. "yh.hp-formula". */
  keys: Record<string, SyncEntry>;
}

/** Per-nyckel-bokföring på enheten: hash av senast sedda värde + när det ändrades. */
export type SyncMeta = Record<string, { h: string; t: number; deleted?: boolean }>;

/** Nycklar där senaste skrivning vinner (köer, "seen", aktiv session, dagsräknare, profil). */
const LAST_WRITE_WINS = /(repeat|seen|queue|active-session|progress|study-profile)/;
const TIME_FIELDS = ["completedAt", "lastClean", "due", "endedAt", "date"] as const;

export function hashString(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return `${s.length}:${(h >>> 0).toString(36)}`;
}

function isObj(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function timeOf(x: unknown): string {
  if (!isObj(x)) return "";
  for (const f of TIME_FIELDS) {
    const v = x[f];
    if (typeof v === "string" && v) return v;
  }
  return "";
}

function stamped(x: unknown): boolean {
  return isObj(x) && TIME_FIELDS.some((f) => typeof x[f] === "string");
}

function same(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function sortKey(x: unknown): string {
  if (isObj(x)) return timeOf(x) || (typeof x.id === "string" ? x.id : "");
  return String(x);
}

function mergeArrays(a: unknown[], b: unknown[], ta: number, tb: number, top: boolean): unknown[] {
  const prim = [...a, ...b].every((x) => typeof x !== "object" || x === null);
  if (prim) {
    return [...a, ...b.filter((x) => !a.includes(x))];
  }
  const allStamped = [...a, ...b].every(stamped);
  if (!top && !allStamped) return tb > ta ? b : a; // t.ex. frysta plan-uppgifter: senaste vinner
  const byKey = new Map<string, unknown>();
  const add = (list: unknown[], newer: boolean) => {
    for (const item of list) {
      const id = isObj(item) && typeof item.id === "string" ? `id:${item.id}` : `j:${JSON.stringify(item)}`;
      if (!byKey.has(id) || newer) byKey.set(id, item);
    }
  };
  add(a, tb <= ta);
  add(b, tb > ta);
  const out = [...byKey.values()];
  if (!allStamped) return out;
  const descending = a.length > 1 && sortKey(a[0]) > sortKey(a[a.length - 1]);
  out.sort((x, y) => (sortKey(x) < sortKey(y) ? -1 : sortKey(x) > sortKey(y) ? 1 : 0));
  return descending ? out.reverse() : out;
}

function mergeValues(a: unknown, b: unknown, ta: number, tb: number, top: boolean): unknown {
  if (same(a, b)) return a;
  if (Array.isArray(a) && Array.isArray(b)) return mergeArrays(a, b, ta, tb, top);
  if (isObj(a) && isObj(b)) {
    if (stamped(a) && stamped(b)) {
      // Atomär post (t.ex. formelkort): den nyare vinner, vid lika tid den med mest framsteg.
      const xa = timeOf(a);
      const xb = timeOf(b);
      if (xa !== xb) return xa > xb ? a : b;
      const ca = typeof a.clean === "number" ? a.clean : 0;
      const cb = typeof b.clean === "number" ? b.clean : 0;
      if (ca !== cb) return ca > cb ? a : b;
      return tb > ta ? b : a;
    }
    const out: Record<string, unknown> = {};
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (!(k in a)) out[k] = b[k];
      else if (!(k in b)) out[k] = a[k];
      else out[k] = mergeValues(a[k], b[k], ta, tb, false);
    }
    return out;
  }
  return tb > ta ? b : a;
}

export function mergeEntry(name: string, a: SyncEntry | undefined, b: SyncEntry | undefined): SyncEntry | undefined {
  if (!a) return b;
  if (!b) return a;
  const t = Math.max(a.t, b.t);
  if (a.v === b.v) return { v: a.v, t };
  const lww = LAST_WRITE_WINS.test(name);
  if (a.v === null || b.v === null) {
    // Borttagning (t.ex. avslutad session) vinner bara om den är nyare och nyckeln är "senaste vinner".
    if (lww) return a.t >= b.t ? a : b;
    return a.v === null ? b : a;
  }
  if (lww) return a.t >= b.t ? a : b;
  try {
    const merged = mergeValues(JSON.parse(a.v), JSON.parse(b.v), a.t, b.t, true);
    const v = JSON.stringify(merged);
    return { v, t };
  } catch {
    return a.t >= b.t ? a : b;
  }
}

export function mergeSnapshots(local: SyncSnapshot, remote: SyncSnapshot): SyncSnapshot {
  const keys: Record<string, SyncEntry> = {};
  for (const k of new Set([...Object.keys(local.keys), ...Object.keys(remote.keys)])) {
    const e = mergeEntry(k, local.keys[k], remote.keys[k]);
    if (e) keys[k] = e;
  }
  return { version: 1, updatedAt: Math.max(local.updatedAt, remote.updatedAt), keys };
}

/** Är a lika med b (samma nycklar och värden)? Tider ignoreras. */
export function sameValues(a: SyncSnapshot, b: SyncSnapshot): boolean {
  const ks = new Set([...Object.keys(a.keys), ...Object.keys(b.keys)]);
  for (const k of ks) {
    if ((a.keys[k]?.v ?? null) !== (b.keys[k]?.v ?? null)) return false;
  }
  return true;
}

/** Uppdaterar per-nyckel-tid utifrån vad som faktiskt ligger i lagringen nu. */
export function refreshMeta(current: Record<string, string>, prev: SyncMeta, now: number): SyncMeta {
  const next: SyncMeta = {};
  for (const [k, v] of Object.entries(current)) {
    const h = hashString(v);
    const p = prev[k];
    next[k] = p && !p.deleted && p.h === h ? p : { h, t: now };
  }
  for (const [k, p] of Object.entries(prev)) {
    if (k in current) continue;
    next[k] = p.deleted ? p : { h: "", t: now, deleted: true };
  }
  return next;
}

export function snapshotFrom(current: Record<string, string>, meta: SyncMeta, now: number): SyncSnapshot {
  const keys: Record<string, SyncEntry> = {};
  for (const [k, m] of Object.entries(meta)) {
    keys[k] = m.deleted ? { v: null, t: m.t } : { v: current[k] ?? null, t: m.t };
  }
  return { version: 1, updatedAt: now, keys };
}

/** Gör om en gammal backup (bara pass + aktiv session) till en snapshot. */
export function legacyToSnapshot(raw: Record<string, unknown>, now: number): SyncSnapshot {
  const keys: Record<string, SyncEntry> = {};
  const t = Date.parse(String(raw.exportedAt ?? "")) || now;
  if (Array.isArray(raw.studySessions)) keys["yh.study-sessions"] = { v: JSON.stringify(raw.studySessions), t };
  if (raw.activeSession && typeof raw.activeSession === "object") {
    keys["yh.active-session"] = { v: JSON.stringify(raw.activeSession), t };
  }
  return { version: 1, updatedAt: t, keys };
}

export function isSnapshot(x: unknown): x is SyncSnapshot {
  return isObj(x) && isObj(x.keys);
}
