export type TrackId = "nackademin_ux" | "iths_itsec" | "prog1a";

export type Mode = "Lär" | "Drill" | "Tidsprov";

export type Difficulty = "Lätt" | "Medel" | "Svår";

export type SourceTier = "Officiell" | "Sekundär" | "Community";

export type QuestionFormat = "mcq" | "short";

export interface Track {
  id: TrackId;
  name: string;
  goal_exam: string;
  weight: number;
  language_mode: "sv" | "sv-en";
}

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  track_id: TrackId;
  topic: string;
  format: QuestionFormat;
  difficulty: Difficulty;
  source_tier: SourceTier;
  estimated_minutes: number;
  prompt: string;
  options?: QuestionOption[];
  answer_key: string;
  explanation: string;
  /** Bedömningspunkter – vad ett starkt svar ska innehålla (fritext) */
  scoring_criteria?: string[];
  /** Resonemangsexempel – visar hur ett starkt svar kan låta (inte ett facit att memorera) */
  strong_answer_example?: string;
  /** Vanliga svagheter – typiska missar och varför de inte räcker */
  common_mistakes?: string;
}

export interface StudySession {
  id: string;
  date: string;
  duration_minutes: number;
  mode: Mode;
  track_mix: Record<TrackId, number>;
  score: number;
  weak_topics: string[];
}

export interface MockExamSection {
  title: string;
  track_id: TrackId;
  topics: string[];
  question_ids: string[];
  /** Större pool att slumpa ifrån – om satt används question_pool + questions_count istället för question_ids */
  question_pool?: string[];
  /** Hur många frågor som slumpas ur question_pool per körning */
  questions_count?: number;
  minutes: number;
  weight: number;
}

export interface MockExamTemplate {
  id: string;
  name: string;
  track_id: TrackId;
  total_minutes: number;
  sections: MockExamSection[];
  scoring_rules: string;
}

export interface ResearchEvidence {
  id: string;
  provider: string;
  url: string;
  claim: string;
  confidence: "Låg" | "Medel" | "Hög";
  source_tier: SourceTier;
  track_id?: TrackId;
  last_verified_date: string;
}

export interface QuestionFilters {
  trackId: TrackId | "all";
  topic: string | "all";
  difficulty: Difficulty | "all";
  sourceTier: SourceTier | "all";
}

export interface DailyPlanBlock {
  trackId: TrackId;
  topic: string;
  minutes: number;
  mode: Mode;
}

export interface DailyPlan {
  sprint: "A" | "B";
  title: string;
  totalMinutes: number;
  blocks: DailyPlanBlock[];
}

export interface GlossaryEntry {
  term: string;
  category: "general" | "python" | "network" | "ux";
  sv: string;
  en: string;
  story: string;
  related?: string[];
}

export interface SessionDraft {
  id: string;
  mode: Mode;
  startedAt: number;
  endsAt: number;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, string>;
  templateId?: string;
}

export type VRAnswer = "Sant" | "Falskt" | "Kan ej avgöras";
export type VRTrap = "Verklighetsknappen" | "Kvantifikatorfällan" | "Implikationsfällan" | "Negationsfällan";

export type LSQuestionType = "komplettering" | "ordforrad" | "stavning";
export type LSTrap = "Kontextknappen" | "Definitionsfällan" | "Dubblingsfällan" | "Särkrivningsfällan";

export interface LSItem {
  id: string;
  type: LSQuestionType;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  trap?: LSTrap;
}

export interface VRItem {
  id: string;
  passage: string;
  statement: string;
  answer: VRAnswer;
  trap?: VRTrap;
  explanation: string;
  relevant_sentence: string;
}
