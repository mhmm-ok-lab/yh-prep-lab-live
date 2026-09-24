// HP ORD-drill: målord från gamla högskoleprov (studera.nu/UHR).
// Svarsalternativ och förklaringar är egna — UHR:s uppgifter kopieras inte.

export interface HpWord {
  id: string;
  word: string;
  /** Fem svarsalternativ, som på provet. */
  options: [string, string, string, string, string];
  /** Index (0–4) för rätt alternativ i options. */
  correct: number;
  /** Kort egen förklaring eller exempelmening, visas efter svar. */
  explanation: string;
  /** Vilket prov ordet förekom på, t.ex. "HT2025". */
  source: string;
}

export const HP_WORDS: HpWord[] = [
  {
    id: "exempel-1",
    word: "eufemism",
    options: ["förskönande omskrivning", "överdrift", "motsägelse", "upprepning", "hån"],
    correct: 0,
    explanation: "Ett mildare ord för något obehagligt, t.ex. \"gå bort\" i stället för \"dö\".",
    source: "exempel",
  },
];
