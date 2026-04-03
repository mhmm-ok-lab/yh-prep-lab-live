import { QUESTIONS } from "../data";
import { estimateDrillMinutes, filterQuestions, scoreAnswers } from "../question-bank";

describe("question bank", () => {
  it("filters by track and source tier", () => {
    const filtered = filterQuestions(QUESTIONS, {
      trackId: "iths_itsec",
      topic: "all",
      difficulty: "all",
      sourceTier: "Officiell"
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((question) => question.track_id === "iths_itsec" && question.source_tier === "Officiell")).toBe(true);
  });

  it("scores mcq answers and identifies weak topics", () => {
    const selection = QUESTIONS.filter((question) => ["ux-1", "ux-2", "it-1"].includes(question.id));
    const result = scoreAnswers(selection, {
      "ux-1": "b",
      "ux-2": "a",
      "it-1": "a"
    });

    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
    expect(result.scorePercent).toBe(67);
    expect(result.weakTopics).toContain("Dator- och nätverksteknik");
  });

  it("returns a practical drill time window", () => {
    const minutes = estimateDrillMinutes(QUESTIONS.slice(0, 2));
    expect(minutes).toBeGreaterThanOrEqual(15);
    expect(minutes).toBeLessThanOrEqual(45);
  });
});
