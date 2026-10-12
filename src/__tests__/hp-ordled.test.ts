import { ORD_KNACK, ORD_PARTS, EMPTY_ORDLED_STATE, gradeOrdled, ordledKnownCount, planKnackPass, planOrdledPass } from "../hp-ordled";

describe("Ordbyggen-data", () => {
  it("har unika id och minst ett exempel per del", () => {
    const ids = ORD_PARTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    ORD_PARTS.forEach((p) => expect(p.examples.length).toBeGreaterThan(0));
  });
  it("knäck ordet: fyra unika alternativ och giltigt facit", () => {
    ORD_KNACK.forEach((k) => {
      expect(new Set(k.options).size).toBe(4);
      expect(k.correct).toBeGreaterThanOrEqual(0);
      expect(k.correct).toBeLessThan(4);
    });
  });
});

describe("Leitner", () => {
  it("kunde flyttar upp en låda per dag, kunde inte till låda 1", () => {
    let s = gradeOrdled(EMPTY_ORDLED_STATE, "o", true, "2026-10-12");
    expect(s.cards.o.box).toBe(2);
    s = gradeOrdled(s, "o", true, "2026-10-12");
    expect(s.cards.o.box).toBe(2);
    s = gradeOrdled(s, "o", true, "2026-10-13");
    expect(s.cards.o.box).toBe(3);
    expect(ordledKnownCount(s)).toBe(1);
    s = gradeOrdled(s, "o", false, "2026-10-14");
    expect(s.cards.o.box).toBe(1);
  });
  it("passet hoppar över delar som sitter", () => {
    const s = { cards: { o: { box: 3 as const, last: "2026-10-11" } } };
    const pass = planOrdledPass(s, "2026-10-12", 100);
    expect(pass).not.toContain("o");
    expect(pass.length).toBe(ORD_PARTS.length - 1);
  });
});

describe("Knäck ordet-pass", () => {
  it("blandar alternativen men behåller rätt svar", () => {
    planKnackPass(50).forEach((k) => {
      const orig = ORD_KNACK.find((o) => o.id === k.id)!;
      expect(k.options[k.correct]).toBe(orig.options[orig.correct]);
    });
  });
});
