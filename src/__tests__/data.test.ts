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
});
