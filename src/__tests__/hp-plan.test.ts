import {
  addDays,
  buildDayTasks,
  buildPlanOverview,
  buildTodayPlan,
  isChecked,
  larOmAreas,
  localDateKey,
  planPosition,
  weakestOrUntriedDelprov,
  type HpPlanData,
  type HpPlanState
} from "../hp-plan";

const iso = (key: string, time = "12:00:00") => new Date(`${key}T${time}`).toISOString();

const emptyData = (over: Partial<HpPlanData> = {}): HpPlanData => ({
  wordsToday: 0,
  lasCompletedAt: [],
  diagnosis: null,
  twin: {},
  ...over
});

const diagnosis = (completedKey: string, hasQuestions = true) => ({
  completedAt: iso(completedKey),
  hasQuestions,
  areas: [
    { area: "brak" as const, level: "kan" as const, correct: 2, total: 2, avgSeconds: 40 },
    { area: "procent" as const, level: "lar-om" as const, correct: 0, total: 2, avgSeconds: 80 },
    { area: "potenser" as const, level: "lar-om" as const, correct: 1, total: 2, avgSeconds: 60 },
    { area: "algebra" as const, level: "repetera" as const, correct: 1, total: 2, avgSeconds: 95 },
    { area: "geometri" as const, level: "repetera" as const, correct: 2, total: 2, avgSeconds: 100 }
  ]
});

const state = (over: Partial<HpPlanState> = {}): HpPlanState => ({ checks: {}, snapshots: {}, ...over });

describe("hp-plan: dag-beräkning", () => {
  it("före 5 okt är dag 1, 5 okt är dag 1, 17 okt är dag 13", () => {
    expect(planPosition("2026-10-04")).toMatchObject({ phase: "plan", day: 1, stepName: "Mät" });
    expect(planPosition("2026-10-05")).toMatchObject({ phase: "plan", day: 1 });
    expect(planPosition("2026-10-11")).toMatchObject({ day: 7, stepName: "Generalrepetition" });
    expect(planPosition("2026-10-14")).toMatchObject({ day: 10, stepName: "Laga" });
    expect(planPosition("2026-10-17")).toMatchObject({ day: 13, stepName: "Landa" });
  });

  it("18 okt är provdag och efter är 'Provdag klar'", () => {
    expect(planPosition("2026-10-18").phase).toBe("exam");
    expect(planPosition("2026-10-19")).toMatchObject({ phase: "after", stepName: "Provdag klar" });
    expect(buildTodayPlan("2026-10-20", emptyData()).items).toEqual([]);
  });

  it("localDateKey och addDays", () => {
    expect(localDateKey(new Date(2026, 9, 5, 23, 59))).toBe("2026-10-05");
    expect(addDays("2026-10-31", 1)).toBe("2026-11-01");
  });
});

describe("hp-plan: Lär om-urval", () => {
  it("Lär om svagast först, därefter Repetera svagast först", () => {
    const areas = larOmAreas(emptyData({ diagnosis: diagnosis("2026-10-04") })).map((a) => a.area);
    expect(areas).toEqual(["procent", "potenser", "algebra", "geometri"]);
  });

  it("diagnos utan frågedata ger inget urval och planen ber om en ny diagnos", () => {
    const data = emptyData({ diagnosis: diagnosis("2026-10-01", false) });
    expect(larOmAreas(data)).toEqual([]);
    expect(buildDayTasks("2026-10-05", data).map((t) => t.id)).toEqual(["diagnos", "ord", "las"]);
  });

  it("dag 3 ger ett område per dag i ordning", () => {
    const data = emptyData({ diagnosis: diagnosis("2026-10-04") });
    expect(buildDayTasks("2026-10-05", data)[0].id).toBe("lar-om:procent");
    expect(buildDayTasks("2026-10-06", data)[0].id).toBe("lar-om:potenser");
    expect(buildDayTasks("2026-10-07", data)[0].id).toBe("lar-om:algebra");
    expect(buildDayTasks("2026-10-08", data)[0].id).toBe("lar-om:geometri");
  });

  it("när områdena är slut eller diagnos saknas används matteträning (otränat, sedan svagast)", () => {
    const data = emptyData({ diagnosis: diagnosis("2026-10-04") });
    const fallback = buildDayTasks("2026-10-09", data)[0];
    expect(fallback.id).toBe("lar-om-train:XYZ");
    const twin = {
      XYZ: { completedAt: iso("2026-10-03"), correct: 9, total: 12 },
      KVA: { completedAt: iso("2026-10-03"), correct: 3, total: 10 },
      NOG: { completedAt: iso("2026-10-03"), correct: 5, total: 6 },
      DTK: { completedAt: iso("2026-10-03"), correct: 8, total: 12 }
    };
    expect(weakestOrUntriedDelprov(emptyData({ twin }))).toBe("KVA");
    expect(weakestOrUntriedDelprov(emptyData({ twin: { XYZ: twin.XYZ } }))).toBe("KVA");
  });
});

describe("hp-plan: stegens uppgifter", () => {
  const data = emptyData({ diagnosis: diagnosis("2026-10-04") });

  it("11 okt: generalrepetition på papper, manuell, plus ord och LÄS", () => {
    const tasks = buildDayTasks("2026-10-11", data);
    expect(tasks.map((t) => t.id)).toEqual(["generalrep", "ord", "las"]);
    expect(tasks[0].auto).toBeUndefined();
    expect(tasks[0].title).toContain("4 pass à 55 min");
    expect(tasks[0].action).toEqual({ type: "resources" });
    expect(tasks[0].why).toMatch(/vecka före provet/);
  });

  it("14 okt: svagaste delprov och ny diagnos", () => {
    expect(buildDayTasks("2026-10-14", data).map((t) => t.id)).toEqual(["laga-train", "laga-diagnos", "ord", "las"]);
  });

  it("15 och 16 okt: flashcards plus korta pass", () => {
    expect(buildDayTasks("2026-10-16", data).map((t) => t.id)).toEqual(["strategi-flashcards", "ord", "las"]);
  });

  it("17 okt: bara flashcards och vila (inga dagliga pass)", () => {
    const tasks = buildDayTasks("2026-10-17", data);
    expect(tasks.map((t) => t.id)).toEqual(["strategi-flashcards", "vila"]);
    expect(tasks[1].sub).toMatch(/legitimation/i);
  });
});

describe("hp-plan: auto-avbockning", () => {
  const data = emptyData({ diagnosis: diagnosis("2026-10-04") });

  it("ord klara först vid minst 10 ord i dag", () => {
    expect(buildTodayPlan("2026-10-06", { ...data, wordsToday: 9 }).items.find((i) => i.task.id === "ord")!.done).toBe(false);
    expect(buildTodayPlan("2026-10-06", { ...data, wordsToday: 10 }).items.find((i) => i.task.id === "ord")!.done).toBe(true);
  });

  it("LÄS klar när en text är klar i dag, inte i går", () => {
    const yesterday = buildTodayPlan("2026-10-06", { ...data, lasCompletedAt: [iso("2026-10-05")] });
    expect(yesterday.items.find((i) => i.task.id === "las")!.done).toBe(false);
    const today = buildTodayPlan("2026-10-06", { ...data, lasCompletedAt: [iso("2026-10-06", "08:00:00")] });
    expect(today.items.find((i) => i.task.id === "las")!.done).toBe(true);
    expect(today.newlyAutoDone).toContain("las");
  });

  it("diagnos klar när completedAt är i dag och har frågedata", () => {
    const d = emptyData({ diagnosis: diagnosis("2026-10-05") });
    const snap = state({ snapshots: { "2026-10-05": buildDayTasks("2026-10-05", emptyData()) } });
    const plan = buildTodayPlan("2026-10-05", d, snap);
    expect(plan.items.find((i) => i.task.id === "diagnos")!.done).toBe(true);
  });

  it("matteträning i rätt delprov i dag bockar av Lär om", () => {
    const twin = { XYZ: { completedAt: iso("2026-10-05"), correct: 8, total: 12 } };
    const plan = buildTodayPlan("2026-10-05", { ...data, twin });
    expect(plan.items[0].task.id).toBe("lar-om:procent");
    expect(plan.items[0].done).toBe(true);
    const wrong = buildTodayPlan("2026-10-05", { ...data, twin: { KVA: twin.XYZ } });
    expect(wrong.items[0].done).toBe(false);
  });

  it("manuell avbockning sparad för datumet räknas", () => {
    const s = state({ checks: { "2026-10-11": ["generalrep"] } });
    const plan = buildTodayPlan("2026-10-11", data, s);
    expect(plan.items.find((i) => i.task.id === "generalrep")!.done).toBe(true);
    expect(plan.allDone).toBe(false);
  });

  it("allt klart ger allDone", () => {
    const open = buildTodayPlan("2026-10-17", data);
    expect(open.allDone).toBe(false);
    const ids = open.items.map((i) => i.task.id);
    const s = state({ checks: { "2026-10-17": ids } });
    const plan = buildTodayPlan("2026-10-17", data, s);
    expect(plan.allDone).toBe(true);
  });
});

describe("hp-plan: överföring", () => {
  const data = emptyData({ diagnosis: diagnosis("2026-10-04") });

  it("ogjort Lär om från i går flyttas fram med etikett, dagliga gör det inte", () => {
    const plan = buildTodayPlan("2026-10-06", data);
    const carried = plan.items.filter((i) => i.carried);
    expect(carried).toHaveLength(1);
    expect(carried[0].task.id).toBe("lar-om:procent");
    expect(carried[0].carriedLabel).toBe("Från i går");
    expect(plan.items.filter((i) => i.task.id === "ord")).toHaveLength(1);
  });

  it("gjord uppgift flyttas inte", () => {
    const plan = buildTodayPlan("2026-10-06", data, state({ checks: { "2026-10-05": ["lar-om:procent"] } }));
    expect(plan.items.some((i) => i.carried)).toBe(false);
  });

  it("max 2 överförda, de senaste, och bara från de två senaste dagarna", () => {
    const t13 = buildDayTasks("2026-10-11", data); // generalrep, ord, las
    const t14 = buildDayTasks("2026-10-14", data); // laga-train, laga-diagnos, ord, las
    const snap = state({ snapshots: { "2026-10-13": t13, "2026-10-14": t14 } });
    const carried = buildTodayPlan("2026-10-15", data, snap).items.filter((i) => i.carried);
    expect(carried).toHaveLength(2);
    expect(carried.every((i) => i.origin === "2026-10-14")).toBe(true);
    expect(carried.every((i) => i.carriedLabel === "Från i går")).toBe(true);
    // Längre tillbaka än två dagar släpps tyst.
    const old = buildTodayPlan("2026-10-13", data).items.filter((i) => i.carried);
    expect(old.some((i) => i.origin < "2026-10-11")).toBe(false);
  });

  it("ogjord generalrepetition flyttas till 12 okt, och avbockad i efterhand försvinner", () => {
    const next = buildTodayPlan("2026-10-12", data);
    expect(next.items.some((i) => i.carried && i.task.id === "generalrep")).toBe(true);
    const done = buildTodayPlan("2026-10-12", data, state({ checks: { "2026-10-12": ["generalrep"] } }));
    expect(done.items.some((i) => i.task.id === "generalrep" && i.carried)).toBe(false);
  });

  it("fryst ögonblicksbild gör att uppgiften inte byter innehåll när resultat ändras", () => {
    const snap = state({ snapshots: { "2026-10-09": buildDayTasks("2026-10-09", emptyData()) } });
    const later = emptyData({
      twin: { XYZ: { completedAt: iso("2026-10-09"), correct: 5, total: 12 } }
    });
    const plan = buildTodayPlan("2026-10-09", later, snap);
    expect(plan.items[0].task.id).toBe("lar-om-train:XYZ");
    expect(plan.items[0].done).toBe(true);
  });

  it("isChecked gäller från utdelningsdagen till i dag", () => {
    const checks = { "2026-10-08": ["x"] };
    expect(isChecked("x", "2026-10-07", "2026-10-09", checks)).toBe(true);
    expect(isChecked("x", "2026-10-09", "2026-10-10", checks)).toBe(false);
  });
});

describe("hp-plan: hela planen", () => {
  it("13 dagar grupperade efter steg, dagens markerad och avbockade dagar märkta", () => {
    const data = emptyData({ diagnosis: diagnosis("2026-10-04") });
    const s = state({
      checks: { "2026-10-05": ["lar-om:procent", "ord", "las"] },
      snapshots: { "2026-10-05": buildDayTasks("2026-10-05", data) }
    });
    const rows = buildPlanOverview("2026-10-07", data, s);
    expect(rows).toHaveLength(13);
    expect(rows[0]).toMatchObject({ dateKey: "2026-10-05", complete: true, isPast: true, stepName: "Mät" });
    expect(rows[1].complete).toBe(false);
    expect(rows[2].isToday).toBe(true);
    expect(rows[12].dateKey).toBe("2026-10-17");
    expect(rows[6].stepName).toBe("Generalrepetition");
  });
});
