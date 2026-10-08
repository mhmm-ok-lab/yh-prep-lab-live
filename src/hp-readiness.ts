// "Är jag redo?": status per delprov utifrån sparade resultat (beslut 2026-10-08).
// Rena funktioner, ingen localStorage eller DOM, så allt går att testa.
// Mål: minst 70 % utan hjälp i senaste passet (LÄS/ELF: senaste två texterna) OCH tempo inom budget.
import { HP_FORMULA_GREEN_SHARE } from "./hp-formulas";
import { HP_NAMES } from "./hp-names";
import { HP_PLAN_START, HP_PLAN_EXAM, addDays, dayDiff } from "./hp-plan";

export const HP_READY_THRESHOLD = 0.7;

export type HpReadyId = "ORD" | "LÄS" | "MEK" | "ELF" | "XYZ" | "KVA" | "NOG" | "DTK" | "DIAG" | "FORM";
export type HpReadyStatus = "inte-provat" | "under" | "redo";
export type HpReadyReason = "procent" | "tempo" | "tempo-saknas";

/** Sekunder per uppgift. LÄS/ELF mäts mot textens budget i stället (se nedan). */
export const HP_READY_TEMPO_TARGET: Record<"ORD" | "MEK" | "XYZ" | "KVA" | "NOG" | "DTK", number> = {
  ORD: 20,
  MEK: 50,
  XYZ: 60,
  KVA: 60,
  NOG: 90,
  DTK: 90
};

export interface HpReadyInput {
  /** Avslutade ORD-pass, äldst först. */
  ord: { completedAt: string; correct: number; total: number; avgSeconds: number }[];
  las: HpReadyTextResult[];
  elf: HpReadyTextResult[];
  /** Avslutade MEK-pass, äldst först. */
  mek: { completedAt: string; correct: number; total: number; seconds: number }[];
  twin: Partial<Record<"XYZ" | "KVA" | "NOG" | "DTK", { completedAt: string; correct: number; total: number; seconds?: number }>>;
  diagnosis: { hasQuestions: boolean; areas: { level: "kan" | "repetera" | "lar-om" }[] } | null;
  /** Formelträning: antal formler totalt, klara (3 av 3), minst 2 av 3, och påbörjade. */
  formula?: { total: number; done: number; almost: number; started: number } | null;
}

export interface HpReadyTextResult {
  completedAt: string;
  correct: number;
  total: number;
  seconds: number;
  budgetSeconds: number;
}

export interface HpReadyRow {
  id: HpReadyId;
  /** Provets förkortning, t.ex. "MEK". Visas bara som liten sekundär text. */
  short: string;
  /** Fullt namn, t.ex. "Meningskomplettering". */
  name: string;
  status: HpReadyStatus;
  /** "7/10 utan hjälp" eller "–". */
  result: string;
  /** "18 s/ord" eller "–". */
  tempo: string;
  /** true = inom budget, false = över, null = okänt. */
  tempoOk: boolean | null;
  reasons: HpReadyReason[];
  /** "Under 70 %", "För långsamt" eller båda. Tom om inte gul. */
  reasonText: string;
}

const NAMES: Record<HpReadyId, string> = {
  ORD: HP_NAMES.ORD.full,
  LÄS: HP_NAMES.LÄS.full,
  MEK: HP_NAMES.MEK.full,
  ELF: HP_NAMES.ELF.full,
  XYZ: HP_NAMES.XYZ.full,
  KVA: HP_NAMES.KVA.full,
  NOG: HP_NAMES.NOG.full,
  DTK: HP_NAMES.DTK.full,
  DIAG: "Mattediagnos",
  FORM: "Formelträning"
};

export const HP_READY_ORDER: HpReadyId[] = ["ORD", "LÄS", "MEK", "ELF", "XYZ", "KVA", "NOG", "DTK"];

/** m:ss, t.ex. 118 -> "1:58". */
export function formatMinSec(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function sortByDate<T extends { completedAt: string }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.completedAt.localeCompare(b.completedAt));
}

interface Measure {
  correct: number;
  total: number;
  /** Tempo i visningsform, eller "–". */
  tempo: string;
  tempoOk: boolean | null;
}

function noData(id: HpReadyId): HpReadyRow {
  return {
    id,
    short: id,
    name: NAMES[id],
    status: "inte-provat",
    result: "–",
    tempo: "–",
    tempoOk: null,
    reasons: [],
    reasonText: ""
  };
}

/** Gemensam bedömning: ≥ 70 % utan hjälp OCH tempo inom budget. Okänt tempo kan inte bekräftas, så raden blir gul. */
function judge(id: HpReadyId, m: Measure): HpReadyRow {
  const row = noData(id);
  const pct = m.total > 0 ? m.correct / m.total : 0;
  row.result = `${m.correct}/${m.total} utan hjälp`;
  row.tempo = m.tempo;
  row.tempoOk = m.tempoOk;
  if (pct < HP_READY_THRESHOLD) row.reasons.push("procent");
  if (m.tempoOk === false) row.reasons.push("tempo");
  if (m.tempoOk === null) row.reasons.push("tempo-saknas");
  row.status = row.reasons.length === 0 ? "redo" : "under";
  row.reasonText = reasonLabel(row.reasons);
  return row;
}

export function reasonLabel(reasons: HpReadyReason[]): string {
  const parts: string[] = [];
  if (reasons.includes("procent")) parts.push("Under 70 %");
  if (reasons.includes("tempo")) parts.push("För långsamt");
  if (reasons.includes("tempo-saknas")) parts.push("Tempo saknas, kör ett pass");
  return parts.join(" · ");
}

function perItemTempo(avgSeconds: number, target: number, unit: string): Pick<Measure, "tempo" | "tempoOk"> {
  return { tempo: `${Math.round(avgSeconds)} s/${unit}`, tempoOk: avgSeconds <= target };
}

function ordRow(list: HpReadyInput["ord"]): HpReadyRow {
  const last = sortByDate(list).filter((r) => r.total > 0).pop();
  if (!last) return noData("ORD");
  return judge("ORD", { correct: last.correct, total: last.total, ...perItemTempo(last.avgSeconds, HP_READY_TEMPO_TARGET.ORD, "ord") });
}

function mekRow(list: HpReadyInput["mek"]): HpReadyRow {
  const last = sortByDate(list).filter((r) => r.total > 0).pop();
  if (!last) return noData("MEK");
  const avg = last.seconds / last.total;
  return judge("MEK", { correct: last.correct, total: last.total, ...perItemTempo(avg, HP_READY_TEMPO_TARGET.MEK, "uppg") });
}

/** LÄS/ELF: de två senaste texterna räknas ihop. Tempo mot textens egen budget (2 min/fråga, 1 min/lucka). */
function textRow(id: "LÄS" | "ELF", list: HpReadyTextResult[]): HpReadyRow {
  const last = sortByDate(list).filter((r) => r.total > 0).slice(-2);
  if (last.length === 0) return noData(id);
  const correct = last.reduce((a, r) => a + r.correct, 0);
  const total = last.reduce((a, r) => a + r.total, 0);
  const seconds = last.reduce((a, r) => a + r.seconds, 0);
  const budget = last.reduce((a, r) => a + r.budgetSeconds, 0);
  return judge(id, { correct, total, tempo: `${formatMinSec(seconds / total)}/fråga`, tempoOk: seconds <= budget });
}

function twinRow(id: "XYZ" | "KVA" | "NOG" | "DTK", r: HpReadyInput["twin"]["XYZ"]): HpReadyRow {
  if (!r || r.total <= 0) return noData(id);
  if (typeof r.seconds !== "number") {
    return judge(id, { correct: r.correct, total: r.total, tempo: "–", tempoOk: null });
  }
  const avg = r.seconds / r.total;
  return judge(id, { correct: r.correct, total: r.total, ...perItemTempo(avg, HP_READY_TEMPO_TARGET[id], "uppg") });
}

function diagRow(d: HpReadyInput["diagnosis"]): HpReadyRow {
  if (!d || !d.hasQuestions || d.areas.length === 0) return noData("DIAG");
  const laraOm = d.areas.filter((a) => a.level === "lar-om").length;
  const repetera = d.areas.filter((a) => a.level === "repetera").length;
  const kan = d.areas.filter((a) => a.level === "kan").length;
  const row = noData("DIAG");
  row.result = laraOm + repetera === 0 ? `Kan: ${kan} områden` : `Lär om: ${laraOm} · Repetera: ${repetera} · Kan: ${kan}`;
  row.status = laraOm === 0 ? "redo" : "under";
  row.reasonText = laraOm === 0 ? "" : `Lär om: ${laraOm} ${laraOm === 1 ? "område" : "områden"}`;
  return row;
}

/** Formler: grå = inte påbörjat, grön = minst 80 % klara (3 av 3) eller minst 80 % på 2 av 3, annars gul. */
function formulaRow(f: HpReadyInput["formula"]): HpReadyRow {
  if (!f || f.total <= 0 || f.started <= 0) return noData("FORM");
  const row = noData("FORM");
  row.result = `${f.done} av ${f.total} klara`;
  const ready = f.done / f.total >= HP_FORMULA_GREEN_SHARE || f.almost / f.total >= HP_FORMULA_GREEN_SHARE;
  row.status = ready ? "redo" : "under";
  row.reasonText = ready ? "" : `Under 80 % klara`;
  return row;
}

/** Status per delprov (i HP_READY_ORDER) plus mattediagnosen och formlerna (utanför de 8). */
export function computeReadiness(input: HpReadyInput): { rows: HpReadyRow[]; diag: HpReadyRow; formula: HpReadyRow } {
  const rows: HpReadyRow[] = [
    ordRow(input.ord),
    textRow("LÄS", input.las),
    mekRow(input.mek),
    textRow("ELF", input.elf),
    twinRow("XYZ", input.twin.XYZ),
    twinRow("KVA", input.twin.KVA),
    twinRow("NOG", input.twin.NOG),
    twinRow("DTK", input.twin.DTK)
  ];
  return { rows, diag: diagRow(input.diagnosis), formula: formulaRow(input.formula) };
}

const STATUS_RANK: Record<HpReadyStatus, number> = { "inte-provat": 0, under: 1, redo: 2 };

/** Grå först, sedan gul, sedan grön, så att det som saknas syns först. Stabil inom varje grupp. */
export function sortReadiness(rows: HpReadyRow[]): HpReadyRow[] {
  return rows
    .map((r, i) => ({ r, i }))
    .sort((a, b) => STATUS_RANK[a.r.status] - STATUS_RANK[b.r.status] || a.i - b.i)
    .map((x) => x.r);
}

export function summarizeReadiness(rows: HpReadyRow[]): { ready: number; notTried: number; under: number; total: number } {
  return {
    ready: rows.filter((r) => r.status === "redo").length,
    notTried: rows.filter((r) => r.status === "inte-provat").length,
    under: rows.filter((r) => r.status === "under").length,
    total: rows.length
  };
}

/** "Generalrepetition om 3 dagar" fram till sön 11 okt, sedan "Provet om N dagar". */
export function readinessCountdown(todayKey: string): string {
  const genrep = addDays(HP_PLAN_START, 6);
  const toGenrep = dayDiff(todayKey, genrep);
  const toExam = dayDiff(todayKey, HP_PLAN_EXAM);
  const days = (n: number) => (n === 1 ? "1 dag" : `${n} dagar`);
  if (toGenrep > 0) return `Generalrepetition om ${days(toGenrep)}`;
  if (toGenrep === 0) return "Generalrepetition i dag";
  if (toExam > 0) return `Provet om ${days(toExam)}`;
  if (toExam === 0) return "Provet är i dag";
  return "Provet är avklarat";
}
