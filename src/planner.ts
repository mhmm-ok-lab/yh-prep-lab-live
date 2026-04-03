import type { DailyPlan, DailyPlanBlock, TrackId } from "./types";

const PASS_MIN = 30;
const PASS_MAX = 45;
const DAY_MS = 24 * 60 * 60 * 1000;
export const FIRST_EXAM_DATE = new Date(2026, 3, 7, 9, 0, 0);

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function totalMinutes(blocks: DailyPlanBlock[]): number {
  return blocks.reduce((sum, block) => sum + block.minutes, 0);
}

function startOfLocalDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function formatFirstExamDate(firstExamDate = FIRST_EXAM_DATE): string {
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(firstExamDate);
}

export function getDaysUntilFirstExam(today = new Date(), firstExamDate = FIRST_EXAM_DATE): number {
  return Math.round((startOfLocalDay(firstExamDate) - startOfLocalDay(today)) / DAY_MS);
}

export function getFirstExamCountdown(today = new Date(), firstExamDate = FIRST_EXAM_DATE): string {
  const daysRemaining = getDaysUntilFirstExam(today, firstExamDate);
  if (daysRemaining < 0) {
    return "Första provet är genomfört";
  }
  if (daysRemaining === 0) {
    return "D-0 idag";
  }
  return `D-${daysRemaining}`;
}

function normalizeToPassWindow(blocks: DailyPlanBlock[]): DailyPlanBlock[] {
  const current = totalMinutes(blocks);
  if (current >= PASS_MIN && current <= PASS_MAX) {
    return blocks;
  }

  const target = clamp(current, PASS_MIN, PASS_MAX);
  const scale = target / Math.max(current, 1);

  const scaled = blocks.map((block) => ({
    ...block,
    minutes: Math.max(3, Math.round(block.minutes * scale))
  }));

  const diff = clamp(target - totalMinutes(scaled), -5, 5);
  if (diff !== 0) {
    scaled[0] = { ...scaled[0], minutes: Math.max(3, scaled[0].minutes + diff) };
  }

  return scaled;
}

export function getSprint(today = new Date(), firstExamDate = FIRST_EXAM_DATE): "A" | "B" {
  return startOfLocalDay(today) <= startOfLocalDay(firstExamDate) ? "A" : "B";
}

function sprintATitle(today: Date): string {
  const daysRemaining = getDaysUntilFirstExam(today);
  const windowLabel = daysRemaining <= 0 ? "D-0: provdag" : `D-${daysRemaining} till D-0`;
  return `Sprint A (${windowLabel}): Nackademin-prioritet`;
}

function sprintABlocks(): DailyPlanBlock[] {
  return normalizeToPassWindow([
    {
      trackId: "nackademin_ux",
      topic: "Analys + problemlösning",
      minutes: 25,
      mode: "Drill"
    },
    {
      trackId: "prog1a",
      topic: "Programmeringsgrunder (variabler/villkor/loopar)",
      minutes: 7,
      mode: "Lär"
    },
    {
      trackId: "iths_itsec",
      topic: "Snabb engelska/matte-rep",
      minutes: 3,
      mode: "Drill"
    }
  ]);
}

function sprintBBlocks(): DailyPlanBlock[] {
  return normalizeToPassWindow([
    {
      trackId: "iths_itsec",
      topic: "Dator- och nätverksteknik",
      minutes: 24,
      mode: "Drill"
    },
    {
      trackId: "prog1a",
      topic: "Kodövning + felsökning",
      minutes: 10,
      mode: "Drill"
    },
    {
      trackId: "nackademin_ux",
      topic: "Teststrategi och tidsdisciplin",
      minutes: 6,
      mode: "Lär"
    }
  ]);
}

export function createDailyPlan(today = new Date()): DailyPlan {
  const sprint = getSprint(today);
  const blocks = sprint === "A" ? sprintABlocks() : sprintBBlocks();
  return {
    sprint,
    title: sprint === "A" ? sprintATitle(today) : "Sprint B (efter första provet): IT-H-prioritet",
    totalMinutes: totalMinutes(blocks),
    blocks
  };
}

export function createTrackMix(blocks: DailyPlanBlock[]): Record<TrackId, number> {
  const sum = totalMinutes(blocks) || 1;
  const base: Record<TrackId, number> = {
    nackademin_ux: 0,
    iths_itsec: 0,
    prog1a: 0
  };

  for (const block of blocks) {
    base[block.trackId] += block.minutes;
  }

  return {
    nackademin_ux: Math.round((base.nackademin_ux / sum) * 100),
    iths_itsec: Math.round((base.iths_itsec / sum) * 100),
    prog1a: Math.round((base.prog1a / sum) * 100)
  };
}

export function getNextMockExam(today = new Date()): { id: string; label: string; minutes: number } {
  const sprint = getSprint(today);
  return sprint === "A"
    ? { id: "mock-nack-60", label: "Nackademin-liknande 60 min", minutes: 60 }
    : { id: "mock-iths-90", label: "IT-H Del 1+2 (90 min)", minutes: 90 };
}
