import { findHpCard } from "../hp-cards";
import {
  EMPTY_HP_FORMULA_STATE,
  HP_FORMULAS,
  HP_FORMULA_NEW_PER_DAY,
  HP_FORMULA_PASS_MAX,
  dueFormulaIds,
  formulaProgress,
  introduceFormulas,
  newFormulaIds,
  pickFormulaTaskIndex,
  planFormulaPass,
  recordFirstTry,
  shuffleOptions,
  type HpFormulaState
} from "../hp-formulas";

const fresh = (): HpFormulaState => ({ cards: {}, passes: [] });

describe("hp-formulas: innehåll", () => {
  it("minst 40 formler med unika id, två uppgifter var och påminnelsekort", () => {
    expect(HP_FORMULAS.length).toBeGreaterThanOrEqual(40);
    expect(new Set(HP_FORMULAS.map((f) => f.id)).size).toBe(HP_FORMULAS.length);
    for (const f of HP_FORMULAS) {
      expect(f.tasks).toHaveLength(2);
      expect(findHpCard(f.area), f.id).toBeDefined();
      expect(f.headTip.length, f.id).toBeGreaterThan(5);
      expect(f.paperSteps.length, f.id).toBeGreaterThanOrEqual(2);
      expect(f.paperSteps.length, f.id).toBeLessThanOrEqual(3);
    }
  });

  it("varje uppgift har fyra olika namn och fyra olika svar med giltigt rätt-index", () => {
    for (const f of HP_FORMULAS) {
      for (const t of f.tasks) {
        expect(t.names, f.id).toHaveLength(4);
        expect(new Set(t.names).size, f.id).toBe(4);
        expect(t.answers, f.id).toHaveLength(4);
        expect(new Set(t.answers).size, f.id).toBe(4);
        expect(t.nameCorrect).toBeGreaterThanOrEqual(0);
        expect(t.nameCorrect).toBeLessThan(4);
        expect(t.answerCorrect).toBeGreaterThanOrEqual(0);
        expect(t.answerCorrect).toBeLessThan(4);
        expect(t.names[t.nameCorrect], f.id).toBe(f.name);
        expect(t.calc.length).toBeGreaterThan(3);
      }
    }
  });

  it("rätt svar ingår i uträkningen", () => {
    // Uträkningen slutar med rätt svar (kontrollräknat i generatorn); här fångar vi bara att de hänger ihop.
    for (const f of HP_FORMULAS) {
      for (const t of f.tasks) {
        const right = t.answers[t.answerCorrect].replace(/ .*$/, "");
        expect(t.calc.replace(/ /g, " ").replace(/\s/g, ""), f.id).toContain(right.replace(/\s/g, ""));
      }
    }
  });
});

describe("hp-formulas: successive relearning", () => {
  it("nya formler: högst 5 per dag, i katalogens ordning", () => {
    const ids = newFormulaIds(HP_FORMULAS, fresh(), "2026-10-08");
    expect(ids).toHaveLength(HP_FORMULA_NEW_PER_DAY);
    expect(ids).toEqual(HP_FORMULAS.slice(0, 5).map((f) => f.id));
    const after = introduceFormulas(fresh(), ids, "2026-10-08");
    expect(newFormulaIds(HP_FORMULAS, after, "2026-10-08")).toEqual([]);
    expect(newFormulaIds(HP_FORMULAS, after, "2026-10-09")).toHaveLength(5);
  });

  it("inlärda formler kommer tillbaka dagen efter, inte samma dag", () => {
    const st = introduceFormulas(fresh(), ["a"], "2026-10-08");
    expect(dueFormulaIds([{ id: "a" } as never], st, "2026-10-08")).toEqual([]);
    expect(dueFormulaIds([{ id: "a" } as never], st, "2026-10-09")).toEqual(["a"]);
  });

  it("klar efter 3 olika dagar på första försöket, inte efter 3 pass samma dag", () => {
    let st = introduceFormulas(fresh(), ["a"], "2026-10-08");
    st = recordFirstTry(st, "a", true, "2026-10-09");
    st = recordFirstTry(st, "a", true, "2026-10-09");
    st = recordFirstTry(st, "a", true, "2026-10-09");
    expect(st.cards.a.clean).toBe(1);
    st = recordFirstTry(st, "a", true, "2026-10-10");
    expect(formulaProgress([{ id: "a" } as never], st).done).toBe(0);
    st = recordFirstTry(st, "a", true, "2026-10-12");
    expect(st.cards.a.clean).toBe(3);
    expect(formulaProgress([{ id: "a" } as never], st).done).toBe(1);
    expect(dueFormulaIds([{ id: "a" } as never], st, "2026-10-20")).toEqual([]);
  });

  it("missad formel är förfallen i dag igen och tappar inte räknaren", () => {
    let st = introduceFormulas(fresh(), ["a"], "2026-10-08");
    st = recordFirstTry(st, "a", true, "2026-10-09");
    st = recordFirstTry(st, "a", false, "2026-10-10");
    expect(st.cards.a.clean).toBe(1);
    expect(dueFormulaIds([{ id: "a" } as never], st, "2026-10-10")).toEqual(["a"]);
  });

  it("pass: förfallna först, högst 10 kort inklusive nya", () => {
    let st = fresh();
    const ids = HP_FORMULAS.slice(0, 20).map((f) => f.id);
    st = introduceFormulas(st, ids, "2026-10-01");
    const plan = planFormulaPass(HP_FORMULAS, st, "2026-10-08");
    expect(plan.learn).toHaveLength(5);
    expect(plan.due).toHaveLength(HP_FORMULA_PASS_MAX - 5);
    expect(plan.due.every((id) => ids.includes(id))).toBe(true);
    const quiet = planFormulaPass(HP_FORMULAS, introduceFormulas(st, HP_FORMULAS.map((f) => f.id), "2026-10-01"), "2026-10-08");
    expect(quiet.learn).toEqual([]);
    expect(quiet.due).toHaveLength(HP_FORMULA_PASS_MAX);
  });

  it("framsteg: klara, påbörjade och minst 2 av 3", () => {
    let st = introduceFormulas(fresh(), ["a", "b", "c"], "2026-10-01");
    for (const d of ["2026-10-02", "2026-10-03", "2026-10-04"]) st = recordFirstTry(st, "a", true, d);
    for (const d of ["2026-10-02", "2026-10-03"]) st = recordFirstTry(st, "b", true, d);
    const p = formulaProgress([{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }] as never, st);
    expect(p).toMatchObject({ total: 4, done: 1, started: 3, almost: 2, left: 3 });
  });

  it("tom state är tom", () => {
    expect(EMPTY_HP_FORMULA_STATE.cards).toEqual({});
  });
});

describe("hp-formulas: blandning", () => {
  it("shuffleOptions behåller rätt svar", () => {
    const opts = ["a", "b", "c", "d"];
    for (let i = 0; i < 20; i++) {
      const r = shuffleOptions(opts, 2);
      expect(r.options[r.correct]).toBe("c");
      expect([...r.options].sort()).toEqual(opts);
    }
  });

  it("återkommande formel får den andra uppgiften", () => {
    expect(pickFormulaTaskIndex(0)).toBe(1);
    expect(pickFormulaTaskIndex(1)).toBe(0);
    expect([0, 1]).toContain(pickFormulaTaskIndex(null));
  });
});
