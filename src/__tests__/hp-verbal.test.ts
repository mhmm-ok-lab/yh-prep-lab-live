import { describe, expect, it } from "vitest";
import { HP_LAS_TEXTS } from "../hp-las";
import { HP_LAS_TEXTS_HP } from "../hp-las-hp";
import { HP_ELF_TEXTS } from "../hp-elf";
import { HP_MEK_ITEMS } from "../hp-mek";
import { HP_MEK_ITEMS_HP } from "../hp-mek-hp";

const LEVELS = ["latt", "medel", "svar", undefined];

describe("verbala uppgifter", () => {
  it("LÄS/ELF: fyra alternativ med förklaring, giltigt rätt svar och stycke, unika id", () => {
    const ids = new Set<string>();
    for (const t of [...HP_LAS_TEXTS, ...HP_ELF_TEXTS]) {
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);
      for (const q of t.questions) {
        expect(ids.has(q.id)).toBe(false);
        ids.add(q.id);
        expect(q.options).toHaveLength(4);
        q.options.forEach((opt) => expect(opt.why.length).toBeGreaterThan(10));
        expect(q.correct).toBeGreaterThanOrEqual(0);
        expect(q.correct).toBeLessThan(4);
        expect(q.paragraph).toBeLessThan(t.paragraphs.length);
        expect(LEVELS).toContain(q.level);
      }
    }
  });

  it("MEK: fyra alternativ, lika många ord som luckor, unika id", () => {
    const ids = new Set<string>();
    for (const item of HP_MEK_ITEMS) {
      expect(ids.has(item.id)).toBe(false);
      ids.add(item.id);
      const gaps = item.text.split("___").length - 1;
      expect(item.options).toHaveLength(4);
      item.options.forEach((opt) => expect(opt.fills).toHaveLength(gaps));
      expect(item.correct).toBeLessThan(4);
      expect(LEVELS).toContain(item.level);
    }
  });

  it("provnivå-texterna delas ut först", () => {
    expect(HP_LAS_TEXTS[0].id).toBe(HP_LAS_TEXTS_HP[0].id);
    expect(HP_MEK_ITEMS[0].id).toBe(HP_MEK_ITEMS_HP[0].id);
  });
});
