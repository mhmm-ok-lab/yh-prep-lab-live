// HP LÄS-träning: egna övningstexter i högskoleprovets stil (inga UHR-texter).
// Varje svarsalternativ har en egen förklaring så att man förstår varför man valde fel.

export type HpLasQuestionType = "huvudtanke" | "detalj" | "slutsats" | "syfte" | "ordbetydelse";

export interface HpLasOption {
  text: string;
  /** Varför alternativet är rätt eller fel — kort, pekar på stället i texten. */
  why: string;
}

export interface HpLasQuestion {
  id: string;
  type: HpLasQuestionType;
  prompt: string;
  /** Fyra alternativ A–D, som på provet. */
  options: [HpLasOption, HpLasOption, HpLasOption, HpLasOption];
  /** Index (0–3) för rätt alternativ. */
  correct: number;
  /** Vilket stycke (0-baserat index i paragraphs) svaret främst finns i. */
  paragraph: number;
}

export interface HpLasText {
  id: string;
  title: string;
  /** Ämnesområde, t.ex. "historia", "naturvetenskap", "samhälle", "filosofi", "kultur". */
  topic: string;
  /** Texten i stycken, för att kunna visas ett stycke i taget på mobil. */
  paragraphs: string[];
  questions: HpLasQuestion[];
}

export const HP_LAS_TEXTS: HpLasText[] = [];
