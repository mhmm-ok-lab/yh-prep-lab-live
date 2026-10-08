// En enda namnkarta för högskoleprovets delprov (beslut 2026-10-08 (2)).
// Fullt namn + förkortning visas tillsammans överallt, t.ex. "Kvantitativa resonemang (NOG)" —
// Martin känner då igen förkortningen på provet OCH förstår vad den betyder (beslut 2026-10-09).
// Interna id:n och datafält är oförändrade.

export type HpNameId = "ORD" | "LÄS" | "MEK" | "ELF" | "XYZ" | "KVA" | "NOG" | "DTK";

export interface HpName {
  /** Fullt namn, huvudetikett. */
  full: string;
  /** Kort namn när fullt namn inte ryms på 375 px (progress, chips). */
  short: string;
  /** Förkortningen som provet använder. Endast sekundär text. */
  abbr: string;
  /** Undertext där det finns plats. */
  sub?: string;
}

export const HP_NAMES: Record<HpNameId, HpName> = {
  ORD: { full: "Ordförståelse", short: "Ord", abbr: "ORD" },
  LÄS: { full: "Svensk läsförståelse", short: "Läsförståelse", abbr: "LÄS" },
  MEK: { full: "Meningskomplettering", short: "Meningar", abbr: "MEK" },
  ELF: { full: "Engelsk läsförståelse", short: "Engelska", abbr: "ELF" },
  XYZ: { full: "Matematisk problemlösning", short: "Problemlösning", abbr: "XYZ" },
  KVA: { full: "Kvantitativa jämförelser", short: "Jämförelser", abbr: "KVA" },
  NOG: { full: "Kvantitativa resonemang", short: "Resonemang", abbr: "NOG", sub: "Räcker informationen?" },
  DTK: { full: "Diagram, tabeller och kartor", short: "Diagram", abbr: "DTK" }
};

export const hpFull = (id: HpNameId): string => `${HP_NAMES[id].full} (${HP_NAMES[id].abbr})`;
export const hpShort = (id: HpNameId): string => `${HP_NAMES[id].short} (${HP_NAMES[id].abbr})`;

/** Skriver ut förkortningar i text som kommer från datafiler (påminnelsekort, resurslänkar).
 *  Första ordet i en mening får stor bokstav, "DTK-fel" blir "diagram-fel". */
export function hpExpand(text: string): string {
  return text.replace(/\b(ORD|LÄS|MEK|ELF|XYZ|KVA|NOG|DTK)\b/g, (_m, id: HpNameId, offset: number, whole: string) => {
    const n = HP_NAMES[id];
    if (whole[offset + id.length] === "-") return n.short.toLowerCase();
    const sentenceStart = offset === 0 || /\.\s$/.test(whole.slice(Math.max(0, offset - 2), offset));
    return `${sentenceStart ? n.full : n.full.toLowerCase()} (${id})`;
  });
}
