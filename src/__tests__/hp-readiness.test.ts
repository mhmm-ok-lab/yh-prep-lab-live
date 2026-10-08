import { describe, expect, it } from "vitest";
import {
  computeReadiness,
  formatMinSec,
  readinessCountdown,
  sortReadiness,
  summarizeReadiness,
  type HpReadyInput
} from "../hp-readiness";

const empty: HpReadyInput = { ord: [], las: [], elf: [], mek: [], twin: {}, diagnosis: null };
const d = (day: number) => `2026-10-${String(day).padStart(2, "0")}T10:00:00.000Z`;

function rowOf(input: HpReadyInput, id: string) {
  return computeReadiness(input).rows.find((r) => r.id === id)!;
}

describe("computeReadiness", () => {
  it("ger åtta rader, alla 'inte provat' utan data", () => {
    const { rows, diag } = computeReadiness(empty);
    expect(rows.map((r) => r.id)).toEqual(["ORD", "LÄS", "MEK", "ELF", "XYZ", "KVA", "NOG", "DTK"]);
    expect(rows.every((r) => r.status === "inte-provat" && r.result === "–" && r.tempo === "–")).toBe(true);
    expect(diag.status).toBe("inte-provat");
  });

  it("ORD: redo vid 70 % och 20 s/ord", () => {
    const r = rowOf({ ...empty, ord: [{ completedAt: d(5), correct: 7, total: 10, avgSeconds: 20 }] }, "ORD");
    expect(r.status).toBe("redo");
    expect(r.result).toBe("7/10 utan hjälp");
    expect(r.tempo).toBe("20 s/ord");
    expect(r.tempoOk).toBe(true);
  });

  it("ORD: använder senaste passet", () => {
    const r = rowOf(
      { ...empty, ord: [
        { completedAt: d(6), correct: 9, total: 10, avgSeconds: 10 },
        { completedAt: d(5), correct: 3, total: 10, avgSeconds: 10 }
      ] },
      "ORD"
    );
    expect(r.status).toBe("redo");
  });

  it("ORD: 69 % ger gul med orsak 'Under 70 %'", () => {
    const r = rowOf({ ...empty, ord: [{ completedAt: d(5), correct: 6, total: 10, avgSeconds: 12 }] }, "ORD");
    expect(r.status).toBe("under");
    expect(r.reasonText).toBe("Under 70 %");
  });

  it("ORD: för långsamt ger gul, båda orsaker visas tillsammans", () => {
    const slow = rowOf({ ...empty, ord: [{ completedAt: d(5), correct: 9, total: 10, avgSeconds: 25 }] }, "ORD");
    expect(slow.reasonText).toBe("För långsamt");
    expect(slow.tempoOk).toBe(false);
    const both = rowOf({ ...empty, ord: [{ completedAt: d(5), correct: 2, total: 10, avgSeconds: 25 }] }, "ORD");
    expect(both.reasonText).toBe("Under 70 % · För långsamt");
  });

  it("MEK: tempo = sekunder / uppgifter mot 50 s", () => {
    const ok = rowOf({ ...empty, mek: [{ completedAt: d(5), correct: 8, total: 10, seconds: 500 }] }, "MEK");
    expect(ok.status).toBe("redo");
    expect(ok.tempo).toBe("50 s/uppg");
    const slow = rowOf({ ...empty, mek: [{ completedAt: d(5), correct: 8, total: 10, seconds: 510 }] }, "MEK");
    expect(slow.status).toBe("under");
  });

  it("XYZ/KVA 60 s, NOG/DTK 90 s", () => {
    const twin = {
      XYZ: { completedAt: d(5), correct: 9, total: 12, seconds: 12 * 61 },
      KVA: { completedAt: d(5), correct: 9, total: 10, seconds: 10 * 60 },
      NOG: { completedAt: d(5), correct: 5, total: 6, seconds: 6 * 90 },
      DTK: { completedAt: d(5), correct: 10, total: 12, seconds: 12 * 91 }
    };
    const { rows } = computeReadiness({ ...empty, twin });
    const by = Object.fromEntries(rows.map((r) => [r.id, r.status]));
    expect(by).toMatchObject({ XYZ: "under", KVA: "redo", NOG: "redo", DTK: "under" });
  });

  it("twin-resultat utan sparad tid: tempo '–' och gul (kan inte bekräftas)", () => {
    const r = rowOf({ ...empty, twin: { XYZ: { completedAt: d(5), correct: 12, total: 12 } } }, "XYZ");
    expect(r.status).toBe("under");
    expect(r.tempo).toBe("–");
    expect(r.tempoOk).toBeNull();
    expect(r.reasonText).toContain("Tempo saknas");
  });

  it("LÄS: räknar de två senaste texterna ihop, tempo mot textbudget", () => {
    const las = [
      { completedAt: d(1), correct: 0, total: 4, seconds: 9999, budgetSeconds: 480 },
      { completedAt: d(5), correct: 3, total: 4, seconds: 400, budgetSeconds: 480 },
      { completedAt: d(6), correct: 3, total: 4, seconds: 470, budgetSeconds: 480 }
    ];
    const r = rowOf({ ...empty, las }, "LÄS");
    expect(r.result).toBe("6/8 utan hjälp");
    expect(r.status).toBe("redo");
    expect(r.tempo).toBe("1:49/fråga");
  });

  it("LÄS: en enda text räcker som underlag; över budget ger gul", () => {
    const r = rowOf({ ...empty, las: [{ completedAt: d(5), correct: 4, total: 4, seconds: 600, budgetSeconds: 480 }] }, "LÄS");
    expect(r.status).toBe("under");
    expect(r.reasonText).toBe("För långsamt");
  });

  it("ELF: lucktext (1 min/lucka) mäts mot sin egen budget", () => {
    const r = rowOf({ ...empty, elf: [{ completedAt: d(5), correct: 5, total: 6, seconds: 330, budgetSeconds: 360 }] }, "ELF");
    expect(r.status).toBe("redo");
    expect(r.tempo).toBe("0:55/fråga");
  });

  it("resultat med total 0 räknas som inte provat", () => {
    expect(rowOf({ ...empty, ord: [{ completedAt: d(5), correct: 0, total: 0, avgSeconds: 0 }] }, "ORD").status).toBe("inte-provat");
  });

  describe("mattediagnos", () => {
    it("grå utan diagnos eller utan frågedata", () => {
      expect(computeReadiness(empty).diag.status).toBe("inte-provat");
      expect(computeReadiness({ ...empty, diagnosis: { hasQuestions: false, areas: [{ level: "kan" }] } }).diag.status).toBe("inte-provat");
    });
    it("grön utan Lär om, även om Repetera finns", () => {
      const diag = computeReadiness({ ...empty, diagnosis: { hasQuestions: true, areas: [{ level: "kan" }, { level: "repetera" }] } }).diag;
      expect(diag.status).toBe("redo");
    });
    it("gul med Lär om", () => {
      const diag = computeReadiness({ ...empty, diagnosis: { hasQuestions: true, areas: [{ level: "lar-om" }, { level: "kan" }, { level: "lar-om" }] } }).diag;
      expect(diag.status).toBe("under");
      expect(diag.reasonText).toBe("Lär om: 2 områden");
      expect(diag.result).toContain("Lär om: 2");
    });
  });
});

describe("sortReadiness och summarizeReadiness", () => {
  it("grå först, sedan gul, sedan grön, stabilt inom grupp", () => {
    const { rows } = computeReadiness({
      ...empty,
      ord: [{ completedAt: d(5), correct: 9, total: 10, avgSeconds: 10 }],
      mek: [{ completedAt: d(5), correct: 1, total: 10, seconds: 100 }],
      twin: { KVA: { completedAt: d(5), correct: 10, total: 10, seconds: 100 } }
    });
    const sorted = sortReadiness(rows).map((r) => r.id);
    expect(sorted).toEqual(["LÄS", "ELF", "XYZ", "NOG", "DTK", "MEK", "ORD", "KVA"]);
    expect(summarizeReadiness(rows)).toEqual({ ready: 2, notTried: 5, under: 1, total: 8 });
  });
});

describe("readinessCountdown", () => {
  it("räknar till generalrepetitionen (11 okt), sedan till provet (18 okt)", () => {
    expect(readinessCountdown("2026-10-08")).toBe("Generalrepetition om 3 dagar");
    expect(readinessCountdown("2026-10-10")).toBe("Generalrepetition om 1 dag");
    expect(readinessCountdown("2026-10-11")).toBe("Generalrepetition i dag");
    expect(readinessCountdown("2026-10-12")).toBe("Provet om 6 dagar");
    expect(readinessCountdown("2026-10-18")).toBe("Provet är i dag");
    expect(readinessCountdown("2026-10-19")).toBe("Provet är avklarat");
  });
});

describe("formatMinSec", () => {
  it("formaterar m:ss", () => {
    expect(formatMinSec(118)).toBe("1:58");
    expect(formatMinSec(5)).toBe("0:05");
  });
});

describe("Formler i 'Är jag redo?'", () => {
  const form = (done: number, almost: number, started: number, total = 50) => computeReadiness({ ...empty, formula: { total, done, almost, started } }).formula;

  it("grå utan påbörjade formler (och utan indata)", () => {
    expect(computeReadiness(empty).formula.status).toBe("inte-provat");
    expect(form(0, 0, 0).status).toBe("inte-provat");
  });

  it("gul när man börjat men under 80 %", () => {
    const r = form(10, 20, 30);
    expect(r.status).toBe("under");
    expect(r.result).toBe("10 av 50 klara");
  });

  it("grön vid minst 80 % klara, eller minst 80 % på 2 av 3", () => {
    expect(form(40, 45, 50).status).toBe("redo");
    expect(form(39, 40, 50).status).toBe("redo");
    expect(form(39, 39, 50).status).toBe("under");
  });

  it("räknas inte med i 'X av 8 redo'", () => {
    expect(computeReadiness({ ...empty, formula: { total: 50, done: 50, almost: 50, started: 50 } }).rows).toHaveLength(8);
  });
});
