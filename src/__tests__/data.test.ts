import { MOCK_EXAMS, QUESTIONS, RESEARCH_EVIDENCE } from "../data";

describe("content coverage", () => {
  it("contains a Programming 1/A mock template with three sections", () => {
    const template = MOCK_EXAMS.find((item) => item.id === "mock-prog-45");
    expect(template).toBeDefined();
    expect(template?.total_minutes).toBe(45);
    expect(template?.sections.length).toBe(3);
  });

  it("has valid question references in every mock section", () => {
    const questionIds = new Set(QUESTIONS.map((question) => question.id));
    const allSectionIds = MOCK_EXAMS.flatMap((template) => template.sections.flatMap((section) => section.question_ids));
    expect(allSectionIds.every((id) => questionIds.has(id))).toBe(true);
  });

  it("includes at least one official evidence card per track", () => {
    const official = RESEARCH_EVIDENCE.filter((entry) => entry.source_tier === "Officiell");
    const tracks = new Set(official.map((entry) => entry.track_id));
    expect(tracks.has("nackademin_ux")).toBe(true);
    expect(tracks.has("iths_itsec")).toBe(true);
  });

  it("keeps question quality minimum for mini and mock usage", () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(40);

    const mcqQuestions = QUESTIONS.filter((question) => question.format === "mcq");
    expect(mcqQuestions.every((question) => (question.options?.length || 0) >= 4)).toBe(true);
    expect(QUESTIONS.every((question) => question.explanation.trim().length > 10)).toBe(true);
    expect(QUESTIONS.every((question) => question.prompt.trim().length > 10)).toBe(true);
  });

  it("contains at least one quick mock and one long mock", () => {
    const quick = MOCK_EXAMS.filter((template) => template.total_minutes <= 10);
    const long = MOCK_EXAMS.filter((template) => template.total_minutes >= 45);
    expect(quick.length).toBeGreaterThanOrEqual(2);
    expect(long.length).toBeGreaterThanOrEqual(3);
  });
});
