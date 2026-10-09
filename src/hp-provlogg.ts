// Provpass-logg: Martin matar in antal rätt per delprov för ett gammalt högskoleprov (studera.nu).
// Ren logik utan DOM och lagring, så den går att testa.
import type { HpNameId } from "./hp-names";

export type ProvTyp = "verbalt" | "kvantitativt";

/** Max antal poäng per delprov enligt nuvarande HP-format. */
export const PROV_MAX: Record<HpNameId, number> = { ORD: 10, LÄS: 10, MEK: 10, ELF: 10, XYZ: 12, KVA: 10, NOG: 6, DTK: 12 };

export const PROV_DELPROV: Record<ProvTyp, HpNameId[]> = {
  verbalt: ["ORD", "LÄS", "MEK", "ELF"],
  kvantitativt: ["XYZ", "KVA", "NOG", "DTK"]
};

export interface ProvPass {
  id: string;
  /** ÅÅÅÅ-MM-DD */
  date: string;
  name: string;
  typ: ProvTyp;
  scores: Partial<Record<HpNameId, number>>;
}

export type ProvInputResult = { ok: true; pass: ProvPass } | { ok: false; error: string };

/** Validerar inmatningen. Alla delprov för vald typ måste fyllas i som heltal 0..max. */
export function buildProvPass(input: { id: string; date: string; name: string; typ: ProvTyp; scores: Record<string, string> }): ProvInputResult {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return { ok: false, error: "Välj ett datum." };
  const scores: Partial<Record<HpNameId, number>> = {};
  for (const id of PROV_DELPROV[input.typ]) {
    const raw = (input.scores[id] ?? "").trim();
    if (!/^\d+$/.test(raw)) return { ok: false, error: `Fyll i antal rätt för ${id}.` };
    const n = Number(raw);
    if (n > PROV_MAX[id]) return { ok: false, error: `${id} har högst ${PROV_MAX[id]} uppgifter.` };
    scores[id] = n;
  }
  return { ok: true, pass: { id: input.id, date: input.date, name: input.name.trim() || "Namnlöst pass", typ: input.typ, scores } };
}

export const provPercent = (id: HpNameId, correct: number): number => Math.round((correct / PROV_MAX[id]) * 100);

/** Passen nyast först. */
export const sortProvPass = (list: ProvPass[]): ProvPass[] => [...list].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

/** Procent rätt per pass för ett delprov, äldst först (för utvecklingen). */
export function provTrend(list: ProvPass[], id: HpNameId): { date: string; percent: number }[] {
  return [...list]
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))
    .flatMap((p) => (typeof p.scores[id] === "number" ? [{ date: p.date, percent: provPercent(id, p.scores[id] as number) }] : []));
}

/** Svagaste delprovet = lägst snitt-procent över de tre senaste passen som har delprovet. Null om inget pass finns. */
export function weakestDelprov(list: ProvPass[]): { id: HpNameId; percent: number } | null {
  let best: { id: HpNameId; percent: number } | null = null;
  for (const id of Object.keys(PROV_MAX) as HpNameId[]) {
    const recent = provTrend(list, id).slice(-3);
    if (recent.length === 0) continue;
    const avg = Math.round(recent.reduce((s, r) => s + r.percent, 0) / recent.length);
    if (!best || avg < best.percent) best = { id, percent: avg };
  }
  return best;
}
