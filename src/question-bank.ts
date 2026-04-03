import type { Question, QuestionFilters } from "./types";

export function filterQuestions(questions: Question[], filters: QuestionFilters): Question[] {
  return questions.filter((question) => {
    if (filters.trackId !== "all" && question.track_id !== filters.trackId) {
      return false;
    }
    if (filters.topic !== "all" && question.topic !== filters.topic) {
      return false;
    }
    if (filters.difficulty !== "all" && question.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.sourceTier !== "all" && question.source_tier !== filters.sourceTier) {
      return false;
    }
    return true;
  });
}

export function estimateDrillMinutes(questions: Question[]): number {
  const sum = questions.reduce((acc, question) => acc + question.estimated_minutes, 0);
  return Math.min(45, Math.max(15, sum));
}

export function isAnswerCorrect(question: Question, rawAnswer: string): boolean {
  const answer = rawAnswer.trim().toLowerCase();
  const expected = question.answer_key.trim().toLowerCase();
  if (question.format === "mcq") {
    return answer === expected;
  }
  return answer.length > 0 && expected.includes(answer.slice(0, 8));
}

export function scoreAnswers(
  questions: Question[],
  answers: Record<string, string>
): { correct: number; total: number; scorePercent: number; weakTopics: string[] } {
  let correct = 0;
  const missesByTopic = new Map<string, number>();

  for (const question of questions) {
    const answer = answers[question.id] || "";
    const isCorrect = isAnswerCorrect(question, answer);

    if (isCorrect) {
      correct += 1;
      continue;
    }

    missesByTopic.set(question.topic, (missesByTopic.get(question.topic) || 0) + 1);
  }

  const total = questions.length;
  const scorePercent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const weakTopics = [...missesByTopic.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([topic]) => topic)
    .slice(0, 3);

  return { correct, total, scorePercent, weakTopics };
}
