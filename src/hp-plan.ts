// "Din plan": datumstyrt 13-dagarsprogram inför högskoleprovet 18 okt 2026 (beslut 2026-10-05 (9)).
// Rena funktioner: tar in sparade resultat och ett datum (injicerbart) och ger dagens uppgifter.
// Ingen localStorage eller DOM här, så allt går att testa.
import { HP_MATH_AREAS } from "./hp-math";
import type { HpMathArea } from "./hp-math";
import type { HpDelprov } from "./hp-twins";
import { HP_NAMES, hpFull, hpShort } from "./hp-names";

export const HP_PLAN_START = "2026-10-05";
export const HP_PLAN_EXAM = "2026-10-18";
export const HP_PLAN_DAYS = 13;
/** Daglig formelträning och läsförståelse gäller t.o.m. 16 okt (dag 12). */
const HP_PLAN_DAILY_UNTIL_DAY = 12;
const HP_PLAN_MAX_CARRIED = 2;
/** Uppgifter flyttas fram i högst så här många dagar; äldre släpps tyst (ingen skuldlista). */
const HP_PLAN_CARRY_DAYS = 2;
/** Meningskomplettering: varannan dag (udda dagar) t.o.m. dag 10, när det finns plats. */
const HP_PLAN_MEK_UNTIL_DAY = 10;
/** Mattens rotation efter poäng per timme (beslut 2026-10-08 (2)): kvantitativa resonemang (NOG) och jämförelser (KVA)
 *  oftast, sedan diagram (DTK), sedan problemlösning (XYZ). Index = (dag - 1) % längden. */
export const HP_PLAN_MATH_ROTATION: HpDelprov[] = ["NOG", "KVA", "DTK", "NOG", "KVA", "XYZ", "DTK"];
export function planMathDelprov(day: number): HpDelprov {
  return HP_PLAN_MATH_ROTATION[(day - 1) % HP_PLAN_MATH_ROTATION.length];
}
const HP_PLAN_MAX_TASKS_PER_DAY = 4;
const DELPROV_ORDER: HpDelprov[] = ["XYZ", "KVA", "NOG", "DTK"];

export type HpPlanStepId = "mat" | "lar-om" | "generalrep" | "laga" | "landa";

/** days = dagarna steget äger i listan. span = dagarna steget gäller enligt programmet (Lär om pågår från dag 1, så fort diagnosen finns). */
export const HP_PLAN_STEPS: { id: HpPlanStepId; name: string; days: [number, number]; span: [number, number] }[] = [
  { id: "mat", name: "Mät", days: [1, 2], span: [1, 2] },
  { id: "lar-om", name: "Lär om", days: [3, 6], span: [1, 6] },
  { id: "generalrep", name: "Generalrepetition", days: [7, 7], span: [7, 7] },
  { id: "laga", name: "Laga", days: [8, 10], span: [8, 10] },
  { id: "landa", name: "Landa", days: [11, 13], span: [11, 13] }
];

// ── Datum ──

/** Lokalt datum som YYYY-MM-DD. */
export function localDateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function keyToUtc(key: string): number {
  const [y, m, d] = key.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Antal dagar från a till b (b - a). */
export function dayDiff(a: string, b: string): number {
  return Math.round((keyToUtc(b) - keyToUtc(a)) / 86_400_000);
}

export function addDays(key: string, n: number): string {
  const d = new Date(keyToUtc(key) + n * 86_400_000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

const MONTHS = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
const WEEKDAYS = ["sön", "mån", "tis", "ons", "tors", "fre", "lör"];

export function formatPlanDate(key: string): string {
  const [, m, d] = key.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
}

export function formatPlanWeekday(key: string): string {
  return WEEKDAYS[new Date(keyToUtc(key)).getUTCDay()];
}

export type HpPlanPhase = "plan" | "exam" | "after";

export interface HpPlanPosition {
  phase: HpPlanPhase;
  /** 1–13. Före start = 1. Efter planen = 13. */
  day: number;
  step: HpPlanStepId | null;
  stepName: string;
}

export function planStepForDay(day: number): { id: HpPlanStepId; name: string } {
  return HP_PLAN_STEPS.find((s) => day >= s.days[0] && day <= s.days[1]) ?? HP_PLAN_STEPS[HP_PLAN_STEPS.length - 1];
}

export function planPosition(key: string): HpPlanPosition {
  if (dayDiff(HP_PLAN_EXAM, key) > 0) {
    return { phase: "after", day: HP_PLAN_DAYS, step: null, stepName: "Provdag klar" };
  }
  if (key === HP_PLAN_EXAM) {
    return { phase: "exam", day: HP_PLAN_DAYS, step: null, stepName: "Provdag" };
  }
  const day = Math.min(HP_PLAN_DAYS, Math.max(1, dayDiff(HP_PLAN_START, key) + 1));
  const step = planStepForDay(day);
  return { phase: "plan", day, step: step.id, stepName: step.name };
}

// ── Indata (strukturella typer, så storage.ts inte behövs här) ──

export interface HpPlanDiagnosisArea {
  area: HpMathArea;
  level: "kan" | "repetera" | "lar-om";
  correct: number;
  total: number;
  avgSeconds: number;
}

export interface HpPlanData {
  /** completedAt (ISO) för varje avslutat formelpass. */
  formulaCompletedAt: string[];
  /** completedAt (ISO) för varje sparat resultat i svensk läsförståelse. */
  lasCompletedAt: string[];
  /** completedAt (ISO) för varje sparat pass i meningskomplettering. */
  mekCompletedAt: string[];
  /** completedAt (ISO) för varje sparad text i engelsk läsförståelse. */
  elfCompletedAt: string[];
  /** Senaste mattediagnos. */
  diagnosis: { completedAt: string; hasQuestions: boolean; areas: HpPlanDiagnosisArea[] } | null;
  /** Senaste matteträning per delprov. */
  twin: Partial<Record<HpDelprov, { completedAt: string; correct: number; total: number }>>;
}

export type HpPlanAction =
  | { type: "formler" }
  | { type: "las" }
  | { type: "mek" }
  | { type: "elf" }
  | { type: "diagnos" }
  | { type: "train"; delprov: HpDelprov }
  | { type: "lar-om"; area: HpMathArea; delprov: HpDelprov }
  | { type: "resources" }
  | { type: "flashcards" }
  | { type: "none" };

export type HpPlanAuto = { kind: "formler" } | { kind: "las" } | { kind: "mek" } | { kind: "elf" } | { kind: "diagnos" } | { kind: "train"; delprov: HpDelprov };

export interface HpPlanTask {
  id: string;
  title: string;
  /** Kort etikett för "Se hela planen". */
  short: string;
  /** Rad under titeln (valfri). */
  sub?: string;
  why: string;
  action: HpPlanAction;
  buttonLabel: string;
  /** Hur uppgiften bockas av automatiskt (saknas = bara manuellt). */
  auto?: HpPlanAuto;
  /** Flyttas fram till nästa dag om den inte blev gjord. Dagliga formler/LÄS gör det inte. */
  carry: boolean;
}

export interface HpPlanState {
  /** Avbockade uppgifts-id per datum. */
  checks: Record<string, string[]>;
  /** Frysta uppgifter per datum, så att listan inte ändras när resultaten ändras. */
  snapshots: Record<string, HpPlanTask[]>;
}

export const EMPTY_HP_PLAN_STATE: HpPlanState = { checks: {}, snapshots: {} };

// ── Urval ──

function ratio(a: { correct: number; total: number }): number {
  return a.total > 0 ? a.correct / a.total : 0;
}

/** Lär om-områden (svagast först), sedan Repetera-områden (svagast först). Tom om ingen diagnos med frågedata finns. */
export function larOmAreas(data: HpPlanData): HpPlanDiagnosisArea[] {
  const diag = data.diagnosis;
  if (!diag || !diag.hasQuestions) return [];
  const weakestFirst = (a: HpPlanDiagnosisArea, b: HpPlanDiagnosisArea) =>
    ratio(a) - ratio(b) || b.avgSeconds - a.avgSeconds;
  const larOm = diag.areas.filter((a) => a.level === "lar-om").sort(weakestFirst);
  const repetera = diag.areas.filter((a) => a.level === "repetera").sort(weakestFirst);
  return [...larOm, ...repetera];
}

/** Delprov att träna: ett otränat först (i ordning), annars det med lägst andel rätt. */
export function weakestOrUntriedDelprov(data: HpPlanData): HpDelprov {
  const untried = DELPROV_ORDER.find((d) => !data.twin[d]);
  if (untried) return untried;
  return [...DELPROV_ORDER].sort((a, b) => ratio(data.twin[a]!) - ratio(data.twin[b]!))[0];
}

export function hpMathAreaLabel(area: HpMathArea): string {
  // Förklaringen i parentes (t.ex. "Geometri (area/omkrets/…)") hör inte hemma i en radrubrik.
  return (HP_MATH_AREAS.find((a) => a.id === area)?.label ?? area).replace(/\s*\(.*\)\s*$/, "");
}

// ── Uppgifter ──

const WHY_FORMLER = "På provet får du ingen formelsamling. Fem minuter om dagen räcker om formlerna kommer tillbaka på olika dagar: en formel är klar först när du klarat den på första försöket tre dagar.";
const WHY_LAS = "Läsförståelse är din svåraste del. Du läser långsamt, så målet är inte att läsa fort utan att leta smart: ett nyckelord, sökläs, två eller tre meningar runt stället. En text om dagen, växelvis svensk och engelsk, bygger vanan.";

const WHY_MEK = "Meningskomplettering är det snabbaste verbala delprovet att förbättra: samma fem, sex samband återkommer hela tiden. Tio uppgifter varannan dag tränar dig att läsa hela meningen innan du väljer.";
const WHY_MATH = "Kvantitativa resonemang och kvantitativa jämförelser ger flest poäng per timme för dig, så de kommer oftast. Diagram, tabeller och kartor samt matematisk problemlösning turas om däremellan.";

function taskFormler(): HpPlanTask {
  return {
    id: "formler",
    title: "Formelträning, 5 min",
    short: "Formler",
    sub: "vilken formel, hur den ser ut, hur du räknar",
    why: WHY_FORMLER,
    action: { type: "formler" },
    buttonLabel: "Starta",
    auto: { kind: "formler" },
    carry: false
  };
}

/** Dagens läsförståelse: udda dagar svensk, jämna dagar engelsk. Id:n "las" och "elf" behålls så att avbockning och sparade listor fungerar. */
function taskReading(day: number): HpPlanTask {
  return taskReadingKind(day % 2 === 1 ? "las" : "elf");
}

function taskReadingKind(kind: "las" | "elf"): HpPlanTask {
  if (kind === "las") {
    return {
      id: "las",
      title: `${hpFull("LÄS")}: en text`,
      short: hpFull("LÄS"),
      sub: "Använd sökläsning, 2 min/fråga",
      why: WHY_LAS,
      action: { type: "las" },
      buttonLabel: "Starta",
      auto: { kind: "las" },
      carry: false
    };
  }
  return {
    id: "elf",
    title: `${hpFull("ELF")}: en text`,
    short: hpFull("ELF"),
    sub: "Använd sökläsning, 2 min/fråga",
    why: WHY_LAS,
    action: { type: "elf" },
    buttonLabel: "Starta",
    auto: { kind: "elf" },
    carry: false
  };
}

function taskMek(): HpPlanTask {
  return {
    id: "mek",
    title: `10 uppgifter: ${hpFull("MEK").toLowerCase()}`,
    short: hpFull("MEK"),
    sub: "ca 8 min",
    why: WHY_MEK,
    action: { type: "mek" },
    buttonLabel: "Starta",
    auto: { kind: "mek" },
    carry: false
  };
}

/** Dagens matteträning enligt rotationen (när steget inte redan är matte). */
function taskMath(delprov: HpDelprov): HpPlanTask {
  return {
    id: "matte-train",
    title: `Matteträning: ${hpFull(delprov)}`,
    short: hpShort(delprov),
    sub: delprov === "NOG" ? HP_NAMES.NOG.sub : undefined,
    why: WHY_MATH,
    action: { type: "train", delprov },
    buttonLabel: "Starta",
    auto: { kind: "train", delprov },
    carry: false
  };
}

function taskDiagnos(): HpPlanTask {
  return {
    id: "diagnos",
    title: "Gör mattediagnosen",
    short: "Mattediagnos",
    sub: "ca 15 min",
    why: "Först mäter vi vad du kan. Då lägger du tiden på det som är svagt i stället för på det du redan kan.",
    action: { type: "diagnos" },
    buttonLabel: "Starta",
    auto: { kind: "diagnos" },
    carry: true
  };
}

function taskLarOm(area: HpMathArea): HpPlanTask {
  const label = hpMathAreaLabel(area);
  return {
    id: `lar-om:${area}`,
    title: `Lär om: ${label}`,
    short: `Lär om: ${label}`,
    sub: `Påminnelsekort och ett pass i ${hpFull("XYZ").toLowerCase()}`,
    why: "Kortet visar metoden och passet låter dig använda den direkt. Det är så den fastnar, en sak i taget.",
    action: { type: "lar-om", area, delprov: "XYZ" },
    buttonLabel: "Starta",
    auto: { kind: "train", delprov: "XYZ" },
    carry: true
  };
}

function taskTrainFallback(delprov: HpDelprov): HpPlanTask {
  return {
    id: `lar-om-train:${delprov}`,
    title: `Lär om: matteträning i ${hpFull(delprov).toLowerCase()}`,
    short: `Lär om: ${hpShort(delprov).toLowerCase()}`,
    why: "Utan diagnos börjar vi där du har tränat minst eller har lägst andel rätt. Då ser du direkt vad som behöver arbetas upp.",
    action: { type: "train", delprov },
    buttonLabel: "Starta",
    auto: { kind: "train", delprov },
    carry: true
  };
}

function taskGeneralrep(): HpPlanTask {
  return {
    id: "generalrep",
    title: "Helt gammalt prov på papper, 4 pass à 55 min",
    short: "Gammalt prov",
    sub: "Bocka av när du är klar",
    why: "Tränar uthållighet och tempo i provets eget format. Söndag, en vecka före provet, ger tid att laga det som gick dåligt.",
    action: { type: "resources" },
    buttonLabel: "Hitta prov",
    carry: true
  };
}

function taskLagaTrain(delprov: HpDelprov): HpPlanTask {
  return {
    id: "laga-train",
    title: `Matteträning: ${hpFull(delprov)}`,
    short: `Träning: ${hpShort(delprov).toLowerCase()}`,
    sub: delprov === "NOG" ? HP_NAMES.NOG.sub : undefined,
    why: "Efter generalrepetitionen laga det som ger mest poäng per timme. Kvantitativa resonemang och jämförelser kommer oftast, diagram och problemlösning turas om.",
    action: { type: "train", delprov },
    buttonLabel: "Starta",
    auto: { kind: "train", delprov },
    carry: true
  };
}

function taskLagaDiagnos(): HpPlanTask {
  return {
    id: "laga-diagnos",
    title: "Gör om mattediagnosen",
    short: "Ny diagnos",
    sub: "ca 15 min",
    why: "Jämför med första diagnosen. Du ser vad som har satt sig och vad som är kvar att laga de sista dagarna.",
    action: { type: "diagnos" },
    buttonLabel: "Starta",
    auto: { kind: "diagnos" },
    carry: true
  };
}

function taskFlashcards(): HpPlanTask {
  return {
    id: "strategi-flashcards",
    title: "Strategi-flashcards",
    short: "Flashcards",
    why: "De sista dagarna handlar om att komma ihåg strategierna, inte att lära nytt. Korta kort i lugnt tempo räcker.",
    action: { type: "flashcards" },
    buttonLabel: "Öppna",
    carry: false
  };
}

function taskVila(): HpPlanTask {
  return {
    id: "vila",
    title: "Vila, packa och lägg dig tidigt",
    short: "Vila och packa",
    sub: "Legitimation, blyertspennor, suddgummi, klocka utan uppkoppling, mat",
    why: "Utvilad hjärna och en packad väska dagen innan tar bort morgonens beslut. Då kan du lägga all energi på provet.",
    action: { type: "none" },
    buttonLabel: "",
    carry: false
  };
}

/** Uppgifterna för ett datum, beräknade från aktuella resultat (utan överförda). */
export function buildDayTasks(key: string, data: HpPlanData): HpPlanTask[] {
  const pos = planPosition(key);
  if (pos.phase !== "plan") return [];
  const day = pos.day;
  const tasks: HpPlanTask[] = [];

  const larOm = larOmAreas(data);
  const larOmTask = (index: number): HpPlanTask => {
    const area = larOm[index];
    return area ? taskLarOm(area.area) : taskTrainFallback(weakestOrUntriedDelprov(data));
  };

  if (day <= 2) {
    if (data.diagnosis?.hasQuestions) {
      tasks.push(larOmTask(day - 1));
    } else {
      tasks.push(taskDiagnos());
    }
  } else if (day <= 6) {
    tasks.push(larOmTask(day - 1));
  } else if (day === 7) {
    tasks.push(taskGeneralrep());
  } else if (day <= 10) {
    tasks.push(taskLagaTrain(planMathDelprov(day)));
    if (day === 10) tasks.push(taskLagaDiagnos());
  } else {
    tasks.push(taskFlashcards());
    if (day === 13) tasks.push(taskVila());
  }

  if (day <= HP_PLAN_DAILY_UNTIL_DAY) {
    tasks.push(taskFormler(), taskReading(day));
  }
  // Varannan dag meningskomplettering (udda dagar t.o.m. dag 10), övriga dagar matteträning enligt rotationen när steget inte redan är matte.
  // Generalrepetitionen (dag 7) och ny diagnos (dag 10) är redan stora, så de dagarna hoppar vi över. Aldrig ordförståelse.
  if (day <= HP_PLAN_DAILY_UNTIL_DAY && day !== 7 && day !== 10 && tasks.length < HP_PLAN_MAX_TASKS_PER_DAY) {
    const stepIsMath = day >= 8 && day <= 10;
    if (day % 2 === 1 && day <= HP_PLAN_MEK_UNTIL_DAY) {
      tasks.push(taskMek());
    } else if (!stepIsMath) {
      tasks.push(taskMath(planMathDelprov(day)));
    }
  }
  return tasks;
}

// ── Avbockning ──

function isoToKey(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : localDateKey(d);
}

function inRange(key: string, from: string, to: string): boolean {
  return key !== "" && key >= from && key <= to;
}

/** Är uppgiften gjord automatiskt, räknat från dagen den delades ut (origin) till i dag? */
export function isAutoDone(task: HpPlanTask, origin: string, today: string, data: HpPlanData): boolean {
  const auto = task.auto;
  if (!auto) return false;
  switch (auto.kind) {
    case "formler":
      return data.formulaCompletedAt.some((iso) => inRange(isoToKey(iso), origin, today));
    case "las":
      return data.lasCompletedAt.some((iso) => inRange(isoToKey(iso), origin, today));
    case "mek":
      return data.mekCompletedAt.some((iso) => inRange(isoToKey(iso), origin, today));
    case "elf":
      return data.elfCompletedAt.some((iso) => inRange(isoToKey(iso), origin, today));
    case "diagnos":
      return !!data.diagnosis?.hasQuestions && inRange(isoToKey(data.diagnosis.completedAt), origin, today);
    case "train": {
      const r = data.twin[auto.delprov];
      return !!r && inRange(isoToKey(r.completedAt), origin, today);
    }
  }
}

/** Är id avbockat (manuellt eller sparat från automatik) någon gång mellan origin och i dag? */
export function isChecked(id: string, origin: string, today: string, checks: Record<string, string[]>): boolean {
  // "ord" (Dagens 10 ord) ersattes av "formler"; en gammal avbockning räknas som gjord.
  const ids = id === "formler" ? [id, "ord"] : [id];
  return Object.keys(checks).some((k) => inRange(k, origin, today) && ids.some((i) => checks[k].includes(i)));
}

export interface HpPlanItem {
  task: HpPlanTask;
  /** Dagen uppgiften delades ut. */
  origin: string;
  carried: boolean;
  /** "Från i går" eller "Från 8 okt". */
  carriedLabel?: string;
  done: boolean;
  /** Gjord av automatiken (kan inte bockas av manuellt). */
  autoDone: boolean;
}

export interface HpPlanToday {
  phase: HpPlanPhase;
  dateKey: string;
  day: number;
  totalDays: number;
  stepName: string;
  items: HpPlanItem[];
  allDone: boolean;
  /** Uppgifter som automatiken just nu räknar som gjorda men som inte är sparade för i dag. */
  newlyAutoDone: string[];
  /** Dagens egna uppgifter (utan överförda), att spara som ögonblicksbild. */
  todayTasks: HpPlanTask[];
}

/** Frysta listor behåller uppgifternas id, åtgärd och avbockning men får dagens texter (fulla namn, sökläsning),
 *  så att en lista som frystes före namnbytet inte visar förkortningar. */
function refreshTaskText(t: HpPlanTask): HpPlanTask {
  let fresh: HpPlanTask | null = null;
  if (t.id === "ord") fresh = taskFormler();
  else if (t.id === "formler") fresh = taskFormler();
  else if (t.id === "las" || t.id === "elf") fresh = taskReadingKind(t.id);
  else if (t.id === "mek") fresh = taskMek();
  else if (t.id === "matte-train" && t.action.type === "train") fresh = taskMath(t.action.delprov);
  else if (t.id === "laga-train" && t.action.type === "train") fresh = taskLagaTrain(t.action.delprov);
  else if (t.id.startsWith("lar-om-train:") && t.action.type === "train") fresh = taskTrainFallback(t.action.delprov);
  else if (t.id.startsWith("lar-om:") && t.action.type === "lar-om") fresh = taskLarOm(t.action.area);
  if (!fresh) return t;
  return t.id === "ord" ? fresh : { ...t, title: fresh.title, short: fresh.short, sub: fresh.sub, why: fresh.why };
}

function tasksFor(key: string, data: HpPlanData, state: HpPlanState): HpPlanTask[] {
  // Frysta listor från före 2026-10-08 kan innehålla "Dagens 10 ord": byt mot formelträningen.
  const snap = state.snapshots[key]?.map(refreshTaskText);
  return snap ?? buildDayTasks(key, data);
}

export function buildTodayPlan(todayKey: string, data: HpPlanData, state: HpPlanState = EMPTY_HP_PLAN_STATE): HpPlanToday {
  const pos = planPosition(todayKey);
  const base = { phase: pos.phase, dateKey: todayKey, day: pos.day, totalDays: HP_PLAN_DAYS, stepName: pos.stepName };
  if (pos.phase !== "plan") {
    return { ...base, items: [], allDone: false, newlyAutoDone: [], todayTasks: [] };
  }

  const todayTasks = tasksFor(todayKey, data, state);
  const todayIds = new Set(todayTasks.map((t) => t.id));
  const items: HpPlanItem[] = [];
  const newlyAutoDone: string[] = [];

  const evaluate = (task: HpPlanTask, origin: string) => {
    const autoDone = isAutoDone(task, origin, todayKey, data);
    const checked = isChecked(task.id, origin, todayKey, state.checks);
    if (autoDone && !(state.checks[todayKey] ?? []).includes(task.id)) newlyAutoDone.push(task.id);
    return { autoDone, done: autoDone || checked };
  };

  // Överförda: ej gjorda från tidigare dagar (utom dagliga), de två senaste.
  const carried: HpPlanItem[] = [];
  const seen = new Set(todayIds);
  if (dayDiff(HP_PLAN_START, todayKey) >= 1) {
    for (let n = 1; n <= HP_PLAN_CARRY_DAYS; n++) {
      const k = addDays(todayKey, -n);
      if (k < HP_PLAN_START) break;
      for (const task of tasksFor(k, data, state)) {
        if (!task.carry || seen.has(task.id)) continue;
        const ev = evaluate(task, k);
        if (ev.done) continue;
        seen.add(task.id);
        const yesterday = dayDiff(k, todayKey) === 1;
        carried.push({ task, origin: k, carried: true, carriedLabel: yesterday ? "Från i går" : `Från ${formatPlanDate(k)}`, ...ev });
      }
    }
  }
  const carriedKept = carried.slice(0, HP_PLAN_MAX_CARRIED).reverse();

  for (const task of todayTasks) {
    items.push({ task, origin: todayKey, carried: false, ...evaluate(task, todayKey) });
  }
  items.push(...carriedKept);

  return {
    ...base,
    items,
    allDone: items.length > 0 && items.every((i) => i.done),
    newlyAutoDone,
    todayTasks
  };
}

/** Dagstatus för "Se hela planen". */
export interface HpPlanDayRow {
  dateKey: string;
  day: number;
  stepId: HpPlanStepId;
  stepName: string;
  isToday: boolean;
  isPast: boolean;
  /** Alla dagens uppgifter är gjorda. */
  complete: boolean;
  labels: string[];
}

export function buildPlanOverview(todayKey: string, data: HpPlanData, state: HpPlanState = EMPTY_HP_PLAN_STATE): HpPlanDayRow[] {
  const rows: HpPlanDayRow[] = [];
  const todayPlan = buildTodayPlan(todayKey, data, state);
  const todayDoneIds = new Set(todayPlan.items.filter((i) => i.done).map((i) => i.task.id));
  for (let day = 1; day <= HP_PLAN_DAYS; day++) {
    const key = addDays(HP_PLAN_START, day - 1);
    const step = planStepForDay(day);
    const tasks = tasksFor(key, data, state);
    const isToday = key === todayKey;
    const isPast = key < todayKey;
    const complete =
      (isPast || isToday) &&
      tasks.length > 0 &&
      tasks.every((t) => isChecked(t.id, key, todayKey, state.checks) || (isToday && todayDoneIds.has(t.id)));
    rows.push({ dateKey: key, day, stepId: step.id, stepName: step.name, isToday, isPast, complete, labels: tasks.map((t) => t.short) });
  }
  return rows;
}
