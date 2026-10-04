import type { HpMathArea } from "./hp-math";
import type { HpDelprov } from "./hp-twins";
import type { SessionDraft, StudySession } from "./types";

const STUDY_SESSIONS_KEY = "yh.study-sessions";
const ACTIVE_SESSION_KEY = "yh.active-session";
const HP_REPEAT_QUEUE_KEY = "yh.hp-repeat-queue";
const HP_PROGRESS_KEY = "yh.hp-progress";
const HP_MATH_RESULT_KEY = "yh.hp-math-result";
const HP_TWIN_REPEAT_KEY = "yh.hp-twin-repeat";
const HP_TWIN_RESULT_KEY = "yh.hp-twin-result";
const HP_LAS_RESULT_KEY = "yh.hp-las-result";
const HP_LAS_REPEAT_KEY = "yh.hp-las-repeat";
const SNAPSHOT_VERSION = 1;
let storageNamespace = "default";

export interface HpProgress {
  date: string;
  wordsCompleted: number;
  passesCompleted: number;
}

export type HpMathLevel = "kan" | "repetera" | "lar-om";

export interface HpMathAreaResult {
  area: HpMathArea;
  level: HpMathLevel;
  correct: number;
  total: number;
  avgSeconds: number;
}

export interface HpMathResult {
  completedAt: string;
  /** Rätt utan hjälp (rätt efter ledtråd räknas inte hit, så statistiken blir ärlig). */
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint?: number;
  total: number;
  areas: HpMathAreaResult[];
}

export interface StudyDataSnapshot {
  version: number;
  exportedAt: string;
  studySessions: StudySession[];
  activeSession: SessionDraft | null;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function namespacedKey(key: string): string {
  return `${key}.${storageNamespace}`;
}

function sanitizeNamespace(value: string): string {
  const safe = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return safe || "default";
}

export function setStorageNamespace(namespace: string): string {
  storageNamespace = sanitizeNamespace(namespace);
  return storageNamespace;
}

export function getStorageNamespace(): string {
  return storageNamespace;
}

export function loadStudySessions(): StudySession[] {
  return safeParse<StudySession[]>(localStorage.getItem(namespacedKey(STUDY_SESSIONS_KEY)), []);
}

export function saveStudySession(session: StudySession): void {
  const sessions = loadStudySessions();
  sessions.unshift(session);
  localStorage.setItem(namespacedKey(STUDY_SESSIONS_KEY), JSON.stringify(sessions.slice(0, 100)));
}

export function loadActiveSession(): SessionDraft | null {
  return safeParse<SessionDraft | null>(localStorage.getItem(namespacedKey(ACTIVE_SESSION_KEY)), null);
}

export function saveActiveSession(session: SessionDraft): void {
  localStorage.setItem(namespacedKey(ACTIVE_SESSION_KEY), JSON.stringify(session));
}

export function clearActiveSession(): void {
  localStorage.removeItem(namespacedKey(ACTIVE_SESSION_KEY));
}

export function loadHpRepeatQueue(): string[] {
  return safeParse<string[]>(localStorage.getItem(namespacedKey(HP_REPEAT_QUEUE_KEY)), []);
}

function saveHpRepeatQueue(queue: string[]): void {
  try {
    localStorage.setItem(namespacedKey(HP_REPEAT_QUEUE_KEY), JSON.stringify(queue));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

/** Lägg till ett ord i repetitionskön (om det inte redan väntar där). */
export function addHpRepeatWord(wordId: string): void {
  const queue = loadHpRepeatQueue();
  if (!queue.includes(wordId)) {
    queue.push(wordId);
    saveHpRepeatQueue(queue);
  }
}

/** Ta bort ett ord ur repetitionskön (klarat igen). */
export function removeHpRepeatWord(wordId: string): void {
  const queue = loadHpRepeatQueue();
  const next = queue.filter((id) => id !== wordId);
  if (next.length !== queue.length) {
    saveHpRepeatQueue(next);
  }
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function loadHpProgress(): HpProgress {
  const stored = safeParse<HpProgress | null>(localStorage.getItem(namespacedKey(HP_PROGRESS_KEY)), null);
  if (!stored || stored.date !== todayIso()) {
    return { date: todayIso(), wordsCompleted: 0, passesCompleted: 0 };
  }
  return stored;
}

export function recordHpPassCompleted(wordsInPass: number): HpProgress {
  const current = loadHpProgress();
  const next: HpProgress = {
    date: todayIso(),
    wordsCompleted: current.wordsCompleted + wordsInPass,
    passesCompleted: current.passesCompleted + 1
  };
  try {
    localStorage.setItem(namespacedKey(HP_PROGRESS_KEY), JSON.stringify(next));
  } catch {
    // tyst fallback — progress visas ändå för denna session, sparas bara inte
  }
  return next;
}

export function loadHpMathResult(): HpMathResult | null {
  return safeParse<HpMathResult | null>(localStorage.getItem(namespacedKey(HP_MATH_RESULT_KEY)), null);
}

export function saveHpMathResult(result: HpMathResult): void {
  try {
    localStorage.setItem(namespacedKey(HP_MATH_RESULT_KEY), JSON.stringify(result));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

export type HpTwinErrorTag = "slarv" | "kunde-inte" | "missforstod";

export interface HpTwinResult {
  completedAt: string;
  delprov: HpDelprov;
  /** Rätt utan hjälp. */
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint?: number;
  total: number;
  errorTags: Partial<Record<HpTwinErrorTag, number>>;
}

type HpTwinRepeatMap = Partial<Record<HpDelprov, string[]>>;

function loadHpTwinRepeatMap(): HpTwinRepeatMap {
  return safeParse<HpTwinRepeatMap>(localStorage.getItem(namespacedKey(HP_TWIN_REPEAT_KEY)), {});
}

function saveHpTwinRepeatMap(map: HpTwinRepeatMap): void {
  try {
    localStorage.setItem(namespacedKey(HP_TWIN_REPEAT_KEY), JSON.stringify(map));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

/** Repetitionskö per delprov (XYZ/KVA/NOG/DTK) — samma mönster som HP_REPEAT_QUEUE för ORD. */
export function loadHpTwinRepeatQueue(delprov: HpDelprov): string[] {
  return loadHpTwinRepeatMap()[delprov] ?? [];
}

export function addHpTwinRepeatItem(delprov: HpDelprov, id: string): void {
  const map = loadHpTwinRepeatMap();
  const queue = map[delprov] ?? [];
  if (!queue.includes(id)) {
    map[delprov] = [...queue, id];
    saveHpTwinRepeatMap(map);
  }
}

export function removeHpTwinRepeatItem(delprov: HpDelprov, id: string): void {
  const map = loadHpTwinRepeatMap();
  const queue = map[delprov] ?? [];
  const next = queue.filter((qid) => qid !== id);
  if (next.length !== queue.length) {
    map[delprov] = next;
    saveHpTwinRepeatMap(map);
  }
}

type HpTwinResultMap = Partial<Record<HpDelprov, HpTwinResult>>;

function loadHpTwinResultMap(): HpTwinResultMap {
  return safeParse<HpTwinResultMap>(localStorage.getItem(namespacedKey(HP_TWIN_RESULT_KEY)), {});
}

/** Senast sparade resultat för ett delprov (visas som liten rad under respektive knapp på HP-hem). */
export function loadHpTwinResult(delprov: HpDelprov): HpTwinResult | null {
  return loadHpTwinResultMap()[delprov] ?? null;
}

export function saveHpTwinResult(result: HpTwinResult): void {
  try {
    const map = loadHpTwinResultMap();
    map[result.delprov] = result;
    localStorage.setItem(namespacedKey(HP_TWIN_RESULT_KEY), JSON.stringify(map));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

export type HpLasErrorTag = "missad-detalj" | "feltolkat" | "tidsbrist";

/** Senaste resultatet för en LÄS-text (en text = ett pass). */
export interface HpLasResult {
  completedAt: string;
  textId: string;
  /** Rätt utan hjälp. */
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint?: number;
  /** Besvarade frågor (obesvarade, via "Avsluta utan svar", räknas inte). */
  total: number;
  seconds: number;
  budgetSeconds: number;
  errorTags: Partial<Record<HpLasErrorTag, number>>;
  /** Frågetyper (huvudtanke, detalj, …) som blev fel, antal per typ. */
  missedTypes: Record<string, number>;
}

type HpLasResultMap = Record<string, HpLasResult>;

function loadHpLasResultMap(): HpLasResultMap {
  try {
    return safeParse<HpLasResultMap>(localStorage.getItem(namespacedKey(HP_LAS_RESULT_KEY)), {});
  } catch {
    return {};
  }
}

/** Alla sparade LÄS-resultat (nyckel = text-id). */
export function loadHpLasResults(): HpLasResultMap {
  return loadHpLasResultMap();
}

export function loadHpLasResult(textId: string): HpLasResult | null {
  return loadHpLasResultMap()[textId] ?? null;
}

export function saveHpLasResult(result: HpLasResult): void {
  try {
    const map = loadHpLasResultMap();
    map[result.textId] = result;
    localStorage.setItem(namespacedKey(HP_LAS_RESULT_KEY), JSON.stringify(map));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

/** Repetitionskö för LÄS: id på texter där minst en fråga blev fel (äldst först). */
export function loadHpLasRepeatQueue(): string[] {
  try {
    return safeParse<string[]>(localStorage.getItem(namespacedKey(HP_LAS_REPEAT_KEY)), []);
  } catch {
    return [];
  }
}

function saveHpLasRepeatQueue(queue: string[]): void {
  try {
    localStorage.setItem(namespacedKey(HP_LAS_REPEAT_KEY), JSON.stringify(queue));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

export function addHpLasRepeatText(textId: string): void {
  const queue = loadHpLasRepeatQueue();
  if (!queue.includes(textId)) {
    saveHpLasRepeatQueue([...queue, textId]);
  }
}

export function removeHpLasRepeatText(textId: string): void {
  const queue = loadHpLasRepeatQueue();
  const next = queue.filter((id) => id !== textId);
  if (next.length !== queue.length) {
    saveHpLasRepeatQueue(next);
  }
}

export function exportStudyDataSnapshot(): StudyDataSnapshot {
  return {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    studySessions: loadStudySessions(),
    activeSession: loadActiveSession()
  };
}

export function importStudyDataSnapshot(snapshot: Partial<StudyDataSnapshot>): {
  importedSessions: number;
  restoredActiveSession: boolean;
} {
  const sessions = Array.isArray(snapshot.studySessions) ? snapshot.studySessions.slice(0, 100) : [];
  localStorage.setItem(namespacedKey(STUDY_SESSIONS_KEY), JSON.stringify(sessions));

  const hasActive = !!snapshot.activeSession && typeof snapshot.activeSession === "object";
  if (hasActive) {
    localStorage.setItem(namespacedKey(ACTIVE_SESSION_KEY), JSON.stringify(snapshot.activeSession));
  } else {
    localStorage.removeItem(namespacedKey(ACTIVE_SESSION_KEY));
  }

  return {
    importedSessions: sessions.length,
    restoredActiveSession: hasActive
  };
}
