// HP MEK-träning (meningskomplettering): egna korta texter med luckor (inga UHR-texter).

export interface HpMekOption {
  /** Ord för varje lucka i ordning, t.ex. ["dock", "förvånande"]. */
  fills: string[];
  /** Varför alternativet passar eller inte — pekar på ledordet i texten. */
  why: string;
}

export interface HpMekItem {
  id: string;
  /** Texten med luckor markerade som ___ (1–3 luckor). */
  text: string;
  /** Fyra alternativ A–D, som på provet. */
  options: [HpMekOption, HpMekOption, HpMekOption, HpMekOption];
  /** Index (0–3) för rätt alternativ. */
  correct: number;
  /** Ledtråd efter ett fel svar: vilket signalord/samband att titta på, aldrig svaret. */
  hint: string;
}

export const HP_MEK_ITEMS: HpMekItem[] = [];
