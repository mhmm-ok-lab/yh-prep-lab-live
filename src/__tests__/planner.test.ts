import {
  createDailyPlan,
  formatFirstExamDate,
  getDaysUntilFirstExam,
  getFirstExamCountdown,
  getNextMockExam,
  getSprint
} from "../planner";

describe("planner", () => {
  it("keeps both sprint plans within 30-45 minutes", () => {
    const sprintA = createDailyPlan(new Date("2026-04-05T08:00:00"));
    const sprintB = createDailyPlan(new Date("2026-04-08T08:00:00"));

    for (const plan of [sprintA, sprintB]) {
      expect(plan.totalMinutes).toBeGreaterThanOrEqual(30);
      expect(plan.totalMinutes).toBeLessThanOrEqual(45);
    }
  });

  it("shows the correct sprint A window and countdown before the first exam", () => {
    const today = new Date("2026-04-03T08:00:00");
    const plan = createDailyPlan(today);

    expect(plan.sprint).toBe("A");
    expect(plan.title).toContain("D-4 till D-0");
    expect(getDaysUntilFirstExam(today)).toBe(4);
    expect(getFirstExamCountdown(today)).toBe("D-4");
    expect(formatFirstExamDate()).toContain("7 april 2026");
  });

  it("keeps sprint A on the first exam day and switches to sprint B the day after", () => {
    expect(getSprint(new Date("2026-04-07T08:00:00"))).toBe("A");
    expect(getSprint(new Date("2026-04-08T08:00:00"))).toBe("B");
    expect(getNextMockExam(new Date("2026-04-08T08:00:00"))).toMatchObject({
      id: "mock-iths-90",
      label: "IT-H Del 1+2 (90 min)"
    });
  });
});
