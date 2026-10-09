import { buildProvPass, provPercent, provTrend, sortProvPass, weakestDelprov, type ProvPass } from "../hp-provlogg";

const kvant = { ORD: "", XYZ: "6", KVA: "5", NOG: "3", DTK: "9" };

describe("hp-provlogg", () => {
  it("godkänner giltigt pass och trimmar namn", () => {
    const r = buildProvPass({ id: "a", date: "2026-10-01", name: " Vår 2024 pass 3 ", typ: "kvantitativt", scores: kvant });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.pass.scores).toEqual({ XYZ: 6, KVA: 5, NOG: 3, DTK: 9 });
  });
  it("avvisar över max, tomt och negativt", () => {
    expect(buildProvPass({ id: "a", date: "2026-10-01", name: "", typ: "kvantitativt", scores: { ...kvant, NOG: "7" } }).ok).toBe(false);
    expect(buildProvPass({ id: "a", date: "2026-10-01", name: "", typ: "kvantitativt", scores: { ...kvant, XYZ: "" } }).ok).toBe(false);
    expect(buildProvPass({ id: "a", date: "2026-10-01", name: "", typ: "kvantitativt", scores: { ...kvant, KVA: "-1" } }).ok).toBe(false);
    expect(buildProvPass({ id: "a", date: "", name: "", typ: "kvantitativt", scores: kvant }).ok).toBe(false);
  });
  it("procent, trend och svagaste delprov", () => {
    expect(provPercent("NOG", 3)).toBe(50);
    const mk = (id: string, date: string, NOG: number, DTK: number): ProvPass => ({ id, date, name: id, typ: "kvantitativt", scores: { XYZ: 12, KVA: 10, NOG, DTK } });
    const list = [mk("b", "2026-10-05", 4, 12), mk("a", "2026-10-01", 2, 12)];
    expect(provTrend(list, "NOG").map((t) => t.percent)).toEqual([33, 67]);
    expect(sortProvPass(list)[0].id).toBe("b");
    expect(weakestDelprov(list)).toEqual({ id: "NOG", percent: 50 });
    expect(weakestDelprov([])).toBeNull();
  });
});
