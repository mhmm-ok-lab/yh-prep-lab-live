import type { HpMathArea } from "./hp-math";
import { EMPTY_HP_FORMULA_STATE, type HpFormulaState } from "./hp-formulas";
import type { ProvPass } from "./hp-provlogg";
import type { HpPlanState } from "./hp-plan";
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
const HP_ELF_RESULT_KEY = "yh.hp-elf-result";
const HP_ELF_REPEAT_KEY = "yh.hp-elf-repeat";
const HP_MEK_RESULT_KEY = "yh.hp-mek-result";
const HP_MEK_REPEAT_KEY = "yh.hp-mek-repeat";
const HP_MEK_SEEN_KEY = "yh.hp-mek-seen";
const HP_PLAN_KEY = "yh.hp-plan";
const HP_FORMULA_KEY = "yh.hp-formula";
const HP_PROVLOGG_KEY = "yh.hp-provlogg";
const HP_ORD_RESULT_KEY = "yh.hp-ord-result";
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

/** Utfall per fråga: clean = rätt utan hjälp, hint = rätt efter ledtråd/andra försöket,
 *  shown = visade svar eller fel två gånger. */
export type HpMathOutcome = "clean" | "hint" | "shown";

/** En besvarad diagnosfråga. Svarstexter sparas (alternativen blandas per pass). */
export interface HpMathQuestionResult {
  id: string;
  area: HpMathArea;
  outcome: HpMathOutcome;
  /** Antal felaktiga val innan frågan avslutades (0, 1 eller 2). */
  wrongPicks: number;
  /** Valda svarstexter i ordning (tom om svaret visades utan val). */
  picks: string[];
  /** Rätt svarstext. */
  correctText: string;
  seconds: number;
}

export interface HpMathResult {
  completedAt: string;
  /** Rätt utan hjälp (rätt efter ledtråd räknas inte hit, så statistiken blir ärlig). */
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint?: number;
  total: number;
  areas: HpMathAreaResult[];
  /** Per fråga, för granskning. Saknas i resultat sparade före 2026-10-05. */
  questions?: HpMathQuestionResult[];
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

/** "Din plan": avbockningar per datum och frusna dagslistor (beslut 2026-10-05 (9)). */
export function loadHpPlanState(): HpPlanState {
  try {
    const stored = safeParse<Partial<HpPlanState> | null>(localStorage.getItem(namespacedKey(HP_PLAN_KEY)), null);
    return { checks: stored?.checks ?? {}, snapshots: stored?.snapshots ?? {} };
  } catch {
    return { checks: {}, snapshots: {} };
  }
}

export function saveHpPlanState(state: HpPlanState): void {
  try {
    localStorage.setItem(namespacedKey(HP_PLAN_KEY), JSON.stringify(state));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — planen visas ändå för denna session
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
  /** Summa svarstid över besvarade uppgifter, sekunder. Saknas i resultat sparade före 2026-10-08. */
  seconds?: number;
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

/** LÄS och ELF delar träningsvy och datamodell men har egna resultat och egen repetitionskö. */
export type HpLasSource = "las" | "elf";

const HP_LAS_KEYS: Record<HpLasSource, { result: string; repeat: string }> = {
  las: { result: HP_LAS_RESULT_KEY, repeat: HP_LAS_REPEAT_KEY },
  elf: { result: HP_ELF_RESULT_KEY, repeat: HP_ELF_REPEAT_KEY }
};

function loadHpLasResultMap(source: HpLasSource): HpLasResultMap {
  try {
    return safeParse<HpLasResultMap>(localStorage.getItem(namespacedKey(HP_LAS_KEYS[source].result)), {});
  } catch {
    return {};
  }
}

/** Alla sparade LÄS- (eller ELF-) resultat (nyckel = text-id). */
export function loadHpLasResults(source: HpLasSource = "las"): HpLasResultMap {
  return loadHpLasResultMap(source);
}

export function loadHpLasResult(textId: string, source: HpLasSource = "las"): HpLasResult | null {
  return loadHpLasResultMap(source)[textId] ?? null;
}

export function saveHpLasResult(result: HpLasResult, source: HpLasSource = "las"): void {
  try {
    const map = loadHpLasResultMap(source);
    map[result.textId] = result;
    localStorage.setItem(namespacedKey(HP_LAS_KEYS[source].result), JSON.stringify(map));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

/** Repetitionskö för LÄS/ELF: id på texter där minst en fråga blev fel (äldst först). */
export function loadHpLasRepeatQueue(source: HpLasSource = "las"): string[] {
  try {
    return safeParse<string[]>(localStorage.getItem(namespacedKey(HP_LAS_KEYS[source].repeat)), []);
  } catch {
    return [];
  }
}

function saveHpLasRepeatQueue(queue: string[], source: HpLasSource): void {
  try {
    localStorage.setItem(namespacedKey(HP_LAS_KEYS[source].repeat), JSON.stringify(queue));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

export function addHpLasRepeatText(textId: string, source: HpLasSource = "las"): void {
  const queue = loadHpLasRepeatQueue(source);
  if (!queue.includes(textId)) {
    saveHpLasRepeatQueue([...queue, textId], source);
  }
}

export function removeHpLasRepeatText(textId: string, source: HpLasSource = "las"): void {
  const queue = loadHpLasRepeatQueue(source);
  const next = queue.filter((id) => id !== textId);
  if (next.length !== queue.length) {
    saveHpLasRepeatQueue(next, source);
  }
}

// ── ORD: resultat per pass (för "Är jag redo?") ──

/** Ett avslutat ORD-pass. correct = rätt på första svaret (ORD har ingen ledtrådstrappa). */
export interface HpOrdResult {
  completedAt: string;
  correct: number;
  total: number;
  /** Snittid per besvarat ord, sekunder. */
  avgSeconds: number;
}

/** De senaste ORD-passen (nyast sist). */
export function loadHpOrdResults(): HpOrdResult[] {
  try {
    const list = safeParse<HpOrdResult[]>(localStorage.getItem(namespacedKey(HP_ORD_RESULT_KEY)), []);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveHpOrdResult(result: HpOrdResult): void {
  try {
    const list = [...loadHpOrdResults(), result].slice(-30);
    localStorage.setItem(namespacedKey(HP_ORD_RESULT_KEY), JSON.stringify(list));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

// ── MEK (meningskomplettering) ──

/** Ett avslutat MEK-pass (10 uppgifter). */
export interface HpMekResult {
  completedAt: string;
  /** Rätt utan hjälp. */
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint: number;
  total: number;
  seconds: number;
  budgetSeconds: number;
}

/** De senaste passen (nyast sist). Räcker för avbockning i planen och "senast". */
export function loadHpMekResults(): HpMekResult[] {
  try {
    const list = safeParse<HpMekResult[]>(localStorage.getItem(namespacedKey(HP_MEK_RESULT_KEY)), []);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveHpMekResult(result: HpMekResult): void {
  try {
    const list = [...loadHpMekResults(), result].slice(-30);
    localStorage.setItem(namespacedKey(HP_MEK_RESULT_KEY), JSON.stringify(list));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

function loadIdList(key: string): string[] {
  try {
    const list = safeParse<string[]>(localStorage.getItem(namespacedKey(key)), []);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveIdList(key: string, ids: string[]): void {
  try {
    localStorage.setItem(namespacedKey(key), JSON.stringify(ids));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

/** Repetitionskö för MEK: uppgifter som behövde hjälp, äldst först. Lämnar kön när de klaras utan hjälp. */
export function loadHpMekRepeatQueue(): string[] {
  return loadIdList(HP_MEK_REPEAT_KEY);
}

export function addHpMekRepeatItem(id: string): void {
  const queue = loadHpMekRepeatQueue();
  if (!queue.includes(id)) saveIdList(HP_MEK_REPEAT_KEY, [...queue, id]);
}

export function removeHpMekRepeatItem(id: string): void {
  const queue = loadHpMekRepeatQueue();
  const next = queue.filter((qid) => qid !== id);
  if (next.length !== queue.length) saveIdList(HP_MEK_REPEAT_KEY, next);
}

/** Uppgifter som redan delats ut (så att nya pass tar nya uppgifter tills alla setts). */
export function loadHpMekSeen(): string[] {
  return loadIdList(HP_MEK_SEEN_KEY);
}

export function saveHpMekSeen(ids: string[]): void {
  saveIdList(HP_MEK_SEEN_KEY, ids);
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

// ── Färgläge (ljust / mörkt / automatiskt) ──
// Enhetsinställning, inte per användare: nyckeln är medvetet utan namnrymd.
export type ColorMode = "auto" | "light" | "dark";
export const COLOR_MODE_KEY = "yh.color-mode";

export function loadColorMode(): ColorMode {
  try {
    const stored = localStorage.getItem(COLOR_MODE_KEY);
    if (stored === "light" || stored === "dark" || stored === "auto") {
      return stored;
    }
  } catch {
    // Privat läge eller blockerad lagring: falla tillbaka på automatiskt.
  }
  return "auto";
}

export function saveColorMode(mode: ColorMode): void {
  try {
    localStorage.setItem(COLOR_MODE_KEY, mode);
  } catch {
    // Ignorera: valet gäller då bara tills sidan laddas om.
  }
}

// ── Formelträning (successive relearning) ──

export function loadHpFormulaState(): HpFormulaState {
  try {
    const stored = safeParse<Partial<HpFormulaState> | null>(localStorage.getItem(namespacedKey(HP_FORMULA_KEY)), null);
    return {
      cards: stored && typeof stored.cards === "object" && stored.cards ? stored.cards : {},
      passes: Array.isArray(stored?.passes) ? stored.passes : []
    };
  } catch {
    return { ...EMPTY_HP_FORMULA_STATE, cards: {}, passes: [] };
  }
}

export function saveHpFormulaState(state: HpFormulaState): void {
  try {
    localStorage.setItem(namespacedKey(HP_FORMULA_KEY), JSON.stringify(state));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}

// ── Provpass-logg ──

export function loadHpProvlogg(): ProvPass[] {
  try {
    const list = safeParse<ProvPass[]>(localStorage.getItem(namespacedKey(HP_PROVLOGG_KEY)), []);
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveHpProvlogg(list: ProvPass[]): void {
  try {
    localStorage.setItem(namespacedKey(HP_PROVLOGG_KEY), JSON.stringify(list.slice(-200)));
  } catch {
    // localStorage kan vara otillgängligt (privat läge, full disk) — tyst fallback
  }
}
