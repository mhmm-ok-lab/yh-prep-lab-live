import { describe, expect, it } from "vitest";
import {
  EMPTY_TERMS_STATE,
  MATH_TERMS,
  TERM_GROUPS,
  findTermUsage,
  findTermsInText,
  gradeTerm,
  markTerm,
  markTermsInHtml,
  planTermCards,
  termCounts
} from "../hp-terms";

describe("Mattetermer-data", () => {
  it("har unika id, giltig grupp och former i gemener", () => {
    const ids = MATH_TERMS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    MATH_TERMS.forEach((t) => {
      expect(TERM_GROUPS).toContain(t.group);
      expect(t.forms.length).toBeGreaterThan(0);
      t.forms.forEach((f) => expect(f).toBe(f.toLowerCase()));
      if (t.url) expect(t.url).toMatch(/^https:\/\/www\.matteboken\.se\/lektioner\//);
    });
  });
  it("ingen form hör till två termer", () => {
    const forms = MATH_TERMS.flatMap((t) => t.forms);
    expect(new Set(forms).size).toBe(forms.length);
  });
});

describe("Termmatchning", () => {
  const ids = (text: string) => findTermsInText(text).map((h) => h.id);

  it("matchar böjningar och hela ord, oavsett versaler", () => {
    expect(ids("Kvoten mellan a och b")).toEqual(["kvot"]);
    expect(ids("Jämför kvoterna")).toEqual(["kvot"]);
    expect(ids("en kvot")).toEqual(["kvot"]);
    expect(ids("kvotering och kvotient")).toEqual([]);
  });
  it("matchar inte inne i sammansatta ord", () => {
    expect(ids("mejeriprodukter och arealen")).toEqual([]);
    expect(ids("cirkeldiagrammet")).toEqual([]);
  });
  it("längsta formen vinner", () => {
    expect(ids("y är omvänt proportionell mot x")).toEqual(["omvant-proportionell"]);
    expect(ids("är p · q jämnt delbart med 2?")).toEqual(["delbar"]);
    expect(ids("Är p ett jämnt heltal?")).toEqual(["udda-jamna", "heltal"]);
  });
  it("hittar f(x) och flerordsformer", () => {
    expect(ids("där f(x) = 2x")).toEqual(["funktion"]);
    expect(ids("roten ur 49")).toEqual(["kvadratrot"]);
  });
});

describe("markTermsInHtml", () => {
  it("markerar bara första förekomsten av varje term", () => {
    const out = markTermsInHtml("Kvoten är 3. Kvoten ökar.");
    expect(out.match(/class="hp-term"/g)?.length).toBe(1);
    expect(out).toContain('data-term="kvot"');
    expect(out).toContain("Kvoten ökar.");
  });
  it("rör inte SVG, tabeller eller attribut", () => {
    const html = '<svg><text>radien</text></svg> Arean <table><td>summan</td></table> <span title="median">x</span>';
    const out = markTermsInHtml(html);
    expect(out).toContain("<text>radien</text>");
    expect(out).toContain("<td>summan</td>");
    expect(out).toContain('title="median"');
    expect(out).toContain('data-term="area"');
    expect(out.match(/class="hp-term"/g)?.length).toBe(1);
  });
  it("tål ett '<' som är text (KVA: b < 0)", () => {
    const out = markTermsInHtml("a > b\nb < 0\n\nKvantitet I: summan av a och b");
    expect(out).toContain("b < 0");
    expect(out).toContain('data-term="summa"');
  });
  it("hoppar över termer man redan kan", () => {
    expect(markTermsInHtml("Kvoten och summan", new Set(["kvot"]))).not.toContain('data-term="kvot"');
  });
  it("lämnar text utan termer orörd", () => {
    expect(markTermsInHtml("Hur många kronor?")).toBe("Hur många kronor?");
  });
});

describe("findTermUsage", () => {
  it("plockar meningen där termen står, och kortar långa", () => {
    const prompts = ["Vad är 2 + 2? Beräkna kvoten av 12 och 3.", "x".repeat(10)];
    expect(findTermUsage("kvot", prompts)).toBe("Beräkna kvoten av 12 och 3.");
    expect(findTermUsage("median", prompts)).toBeNull();
    const long = `${"a ".repeat(100)}medianen ${"b ".repeat(100)}`;
    const u = findTermUsage("median", [long], 60)!;
    expect(u).toContain("medianen");
    expect(u.length).toBeLessThanOrEqual(62);
  });
});

describe("Kortlogik", () => {
  it("skanning sätter status och räknas", () => {
    let s = markTerm(EMPTY_TERMS_STATE, "kvot", "osaker");
    s = markTerm(s, "summa", "kan");
    expect(termCounts(s)).toEqual({ kan: 1, osaker: 1, unmarked: MATH_TERMS.length - 2 });
  });
  it("Kunde två olika dagar → Kan; samma dag räknas en gång", () => {
    let s = markTerm(EMPTY_TERMS_STATE, "kvot", "osaker");
    s = gradeTerm(s, "kvot", true, "2026-10-14");
    s = gradeTerm(s, "kvot", true, "2026-10-14");
    expect(s.terms.kvot).toMatchObject({ status: "osaker", streak: 1 });
    s = gradeTerm(s, "kvot", true, "2026-10-15");
    expect(s.terms.kvot).toMatchObject({ status: "kan", streak: 2 });
  });
  it("Kunde inte nollställer", () => {
    let s = markTerm(EMPTY_TERMS_STATE, "kvot", "osaker");
    s = gradeTerm(s, "kvot", true, "2026-10-14");
    s = gradeTerm(s, "kvot", false, "2026-10-15");
    expect(s.terms.kvot).toMatchObject({ status: "osaker", streak: 0 });
  });
  it("missat och sedan kunnat samma dag räknas inte", () => {
    let s = markTerm(EMPTY_TERMS_STATE, "kvot", "osaker");
    s = gradeTerm(s, "kvot", false, "2026-10-14");
    s = gradeTerm(s, "kvot", true, "2026-10-14");
    expect(s.terms.kvot).toMatchObject({ status: "osaker", streak: 0 });
    s = gradeTerm(s, "kvot", true, "2026-10-15");
    expect(s.terms.kvot).toMatchObject({ streak: 1 });
  });
  it("passet tar bara osäkra, osedda i dag först", () => {
    let s = markTerm(EMPTY_TERMS_STATE, "kvot", "osaker");
    s = markTerm(s, "median", "osaker");
    s = markTerm(s, "summa", "kan");
    s = gradeTerm(s, "kvot", false, "2026-10-14");
    expect(planTermCards(s, "2026-10-14", 12, () => 0)).toEqual(["median", "kvot"]);
    expect(planTermCards(s, "2026-10-14", 1, () => 0)).toEqual(["median"]);
    expect(planTermCards(EMPTY_TERMS_STATE, "2026-10-14")).toEqual([]);
  });
});
