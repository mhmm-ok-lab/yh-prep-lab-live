// Påminnelsekort: en skärm per typ av problem — formel, figur, varför, exempel, fälla, länk.
// Visas i feedbacken EFTER svar ("Påminn mig: …") och samlat i guiden.
import { HP_CARDS_MATH } from "./hp-cards-math";
import { HP_CARDS_DELPROV } from "./hp-cards-delprov";

export interface HpCard {
  id: string;
  /** Rubrik, t.ex. "Räta linjens ekvation". */
  title: string;
  /**
   * Nycklar som kortet matchar: HpMathArea-id (t.ex. "rata-linjen"), `area`-värden i tvillingarna
   * (t.ex. "räta linjen", "procent") och/eller delprov ("KVA", "NOG", "DTK").
   */
  matches: string[];
  /** Formel eller regel, kort. Tomt för strategikort. */
  formula?: string;
  /** Inline SVG (viewBox, inga externa resurser, currentColor/var(--…) för färg), max ~320×200. */
  svg?: string;
  /** Varför det fungerar, 2–3 meningar. */
  why: string;
  /** Ett exempel räknat steg för steg. */
  example: { prompt: string; steps: string[] };
  /** Vanligaste fällan på HP. */
  trap: string;
  /** Extern fördjupning, helst med video. */
  link: { label: string; url: string };
  /** Minnesregel, en eller två korta rader (2026-10-10). */
  mnemonic?: string;
  /** Fler länkar, t.ex. interaktiv övning. */
  extraLinks?: { label: string; url: string }[];
}

export const HP_CARDS: HpCard[] = [...HP_CARDS_MATH, ...HP_CARDS_DELPROV];

/** Hitta kortet för en area/delprov-nyckel (skiftlägesokänsligt). */
export function findHpCard(key: string): HpCard | undefined {
  const k = key.toLowerCase();
  return HP_CARDS.find((c) => c.matches.some((m) => m.toLowerCase() === k));
}
