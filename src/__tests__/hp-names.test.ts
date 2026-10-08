import { HP_NAMES, hpExpand } from "../hp-names";
import { computeReadiness } from "../hp-readiness";

describe("hp-names: fulla namn", () => {
  it("namnkartan har fulla namn, korta namn och förkortning", () => {
    expect(HP_NAMES.KVA.full).toBe("Kvantitativa jämförelser");
    expect(HP_NAMES.NOG.full).toBe("Kvantitativa resonemang");
    expect(HP_NAMES.NOG.sub).toBe("Räcker informationen?");
    expect(HP_NAMES.DTK.full).toBe("Diagram, tabeller och kartor");
    expect(HP_NAMES.ELF.short).toBe("Engelska");
    expect(Object.values(HP_NAMES).every((n) => n.full !== n.abbr && n.short !== n.abbr)).toBe(true);
  });

  it("hpExpand skriver ut förkortningar i löpande text", () => {
    expect(hpExpand("KVA: testa fem tal")).toBe("Kvantitativa jämförelser: testa fem tal");
    expect(hpExpand("De flesta DTK-fel är inte räknefel")).toBe("De flesta diagram-fel är inte räknefel");
    expect(hpExpand("Fördjupa: NOG och svaren")).toBe("Fördjupa: kvantitativa resonemang och svaren");
  });

  it("Är jag redo? använder fullt namn och behåller förkortningen i separat fält", () => {
    const rows = computeReadiness({
      formula: { total: 10, done: 0, almost: 0, started: 0 },
      ord: [],
      las: [],
      elf: [],
      mek: [],
      twin: {},
      diagnosis: null
    }).rows;
    const kva = rows.find((r) => r.id === "KVA")!;
    expect(kva.name).toBe("Kvantitativa jämförelser");
    expect(kva.short).toBe("KVA");
    expect(rows.every((r) => !/\b(ORD|LÄS|MEK|ELF|XYZ|KVA|NOG|DTK)\b/.test(r.name))).toBe(true);
  });
});
