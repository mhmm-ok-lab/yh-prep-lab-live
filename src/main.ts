import "./styles.css";
import { MOCK_EXAMS, QUESTIONS, RESEARCH_EVIDENCE, TRACKS } from "./data";
import { createDailyPlan, createTrackMix, formatFirstExamDate, getFirstExamCountdown, getNextMockExam } from "./planner";
import { estimateDrillMinutes, filterQuestions, isAnswerCorrect, scoreAnswers } from "./question-bank";
import {
  clearActiveSession,
  exportStudyDataSnapshot,
  importStudyDataSnapshot,
  loadActiveSession,
  loadStudySessions,
  saveActiveSession,
  saveStudySession,
  setStorageNamespace
} from "./storage";
import type { Mode, Question, QuestionFilters, SessionDraft, StudySession, TrackId } from "./types";

type Page = "overview" | "tracks" | "bank" | "mock" | "research" | "logic" | "walkthrough" | "design";
type ThemeId = "calm-mint" | "calm-public" | "calm-slate";

interface ProfileOption {
  id: string;
  label: string;
}

interface StudyProfile {
  sessionPreference: string;
  blocker: string;
  confidence: string;
  targetPriority: string;
  notes: string;
}

interface SectionResult {
  title: string;
  scorePercent: number;
  correct: number;
  total: number;
  weight: number;
}

interface SessionResult {
  mode: Mode;
  scorePercent: number;
  correct: number;
  total: number;
  weakTopics: string[];
  autoSubmitted: boolean;
  sectionResults: SectionResult[];
  questionReviews: QuestionReview[];
  templateName?: string;
}

interface QuestionReview {
  id: string;
  trackId: TrackId;
  topic: string;
  prompt: string;
  difficulty: string;
  sourceTier: string;
  format: "mcq" | "short";
  selectedOptionText?: string;
  userAnswer: string;
  expectedAnswer: string;
  explanation: string;
  isCorrect: boolean;
}

interface AdaptiveSuggestion {
  trackId: TrackId;
  topic: string;
  mode: Mode;
  durationMinutes: number;
  questionIds: string[];
  reason: string;
  ranking: TrackId[];
}

interface TrackStatus {
  trackId: TrackId;
  minutes: number;
  avgScore: number;
  weakHits: number;
  priority: boolean;
  stage: "not_started" | "in_progress" | "needs_help" | "near_ready";
}

interface ThemePreset {
  id: ThemeId;
  name: string;
  reference: string;
  description: string;
}

interface SharedExamTheme {
  title: string;
  whyItMatters: string;
  drillHint: string;
}

const appRoot = document.querySelector<HTMLDivElement>("#app");
if (!appRoot) {
  throw new Error("App container saknas");
}
const app: HTMLDivElement = appRoot;

const pageLabels: Record<Page, string> = {
  overview: "Översikt",
  tracks: "Spår",
  bank: "Frågebank",
  mock: "Mockprov",
  research: "Research",
  logic: "Logik",
  walkthrough: "Genomgång",
  design: "Design"
};
const urlParams = new URLSearchParams(window.location.search);
const THEME_KEY = "yh.ui-theme";
const UI_BUILD = "2026-04-04-0115";
const BUILD_MARKER_KEY = "yh.ui-build-marker";
const THEME_PRESETS: ThemePreset[] = [
  {
    id: "calm-mint",
    name: "Calm Mint",
    reference: "Nuvarande bas",
    description: "Mjuk mint-ton, avrundade knappar, låg kontraststress."
  },
  {
    id: "calm-public",
    name: "Public Sans Soft",
    reference: "USWDS-inspirerad typografi",
    description: "Rak, tydlig text med neutrala kort och lugn grön accent."
  },
  {
    id: "calm-slate",
    name: "Slate Focus",
    reference: "Data-heavy dashboard-stil",
    description: "Sval grå skala med tydlig hierarki och stramare former."
  }
];
const SHARED_EXAM_THEMES: SharedExamTheme[] = [
  {
    title: "Tidsdisciplin under press",
    whyItMatters: "Alla tre spår kräver att du prioriterar snabbt och håller tempo.",
    drillHint: "Kör korta tidsprov med tydligt stopp och snabb rättning."
  },
  {
    title: "Läsning av instruktioner",
    whyItMatters: "Missad detalj i frågetexten leder ofta till fel svar även med rätt kunskap.",
    drillHint: "Markera nyckelord i varje fråga innan du svarar."
  },
  {
    title: "Strukturerat resonemang",
    whyItMatters: "UX, IT och Programmering belönar logisk motivering, inte bara magkänsla.",
    drillHint: "Öva formatet: problem -> antagande -> testbart nästa steg."
  },
  {
    title: "Felsökning och felanalys",
    whyItMatters: "Förmågan att hitta vad som gick fel återkommer i både IT-säkerhet och programmering.",
    drillHint: "Efter varje pass: skriv en rad om varför varje fel svar blev fel."
  }
];

const CURRENT_USER_ID_KEY = "yh.current-user-id";
const PROFILE_KEY_PREFIX = "yh.study-profile";
const KNOWN_USERS_KEY = "yh.known-user-ids";
const GUEST_USER_ID = "guest";
const LEGACY_GUEST_IDS = new Set(["gäst", "gast", "gst", "g", GUEST_USER_ID]);

function copyLegacyGuestDataIfNeeded(fromId: string): void {
  if (!fromId || fromId === GUEST_USER_ID) {
    return;
  }
  const keysToCopy = [
    `yh.study-sessions.${fromId}`,
    `yh.active-session.${fromId}`,
    `${PROFILE_KEY_PREFIX}.${fromId}`
  ];
  for (const key of keysToCopy) {
    const nextKey = key.replace(`.${fromId}`, `.${GUEST_USER_ID}`);
    if (!localStorage.getItem(nextKey)) {
      const value = localStorage.getItem(key);
      if (value) {
        localStorage.setItem(nextKey, value);
      }
    }
  }
}

function sanitizeUserId(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const safe = normalized.replace(/[^a-z0-9_-]/g, "");
  if (!safe || LEGACY_GUEST_IDS.has(safe)) {
    return GUEST_USER_ID;
  }
  return safe;
}

function loadKnownUsers(): string[] {
  try {
    const raw = localStorage.getItem(KNOWN_USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    const values = Array.isArray(parsed) ? parsed : [];
    const unique = values
      .map((value) => sanitizeUserId(String(value)))
      .filter((value, index, list) => value.length > 0 && list.indexOf(value) === index);
    if (!unique.includes(GUEST_USER_ID)) {
      unique.push(GUEST_USER_ID);
    }
    return unique;
  } catch {
    return [GUEST_USER_ID];
  }
}

function saveKnownUsers(userIds: string[]): void {
  localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify(userIds));
}

function rememberUser(userId: string): string[] {
  const normalized = sanitizeUserId(userId);
  const existing = loadKnownUsers().filter((id) => id !== normalized);
  const next = [normalized, ...existing].slice(0, 25);
  saveKnownUsers(next);
  return next;
}

function formatUserLabel(userId: string): string {
  return sanitizeUserId(userId) === GUEST_USER_ID ? "gäst" : sanitizeUserId(userId);
}

function loadCurrentUserId(): string {
  const stored = localStorage.getItem(CURRENT_USER_ID_KEY) || GUEST_USER_ID;
  const legacySource = stored
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, "");
  const normalized = sanitizeUserId(stored);
  if (normalized === GUEST_USER_ID && legacySource && legacySource !== GUEST_USER_ID) {
    copyLegacyGuestDataIfNeeded(legacySource);
  }
  localStorage.setItem(CURRENT_USER_ID_KEY, normalized);
  knownUserIds = rememberUser(normalized);
  return normalized;
}

function saveCurrentUserId(userId: string): string {
  const normalized = sanitizeUserId(userId);
  localStorage.setItem(CURRENT_USER_ID_KEY, normalized);
  knownUserIds = rememberUser(normalized);
  return normalized;
}

function userBadge(userId: string): string {
  const normalized = sanitizeUserId(userId);
  if (normalized === GUEST_USER_ID) {
    return "G";
  }
  const parts = normalized.split(/[-_]+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  }
  return normalized.slice(0, 2).toUpperCase() || "G";
}

function profileKeyFor(userId: string): string {
  return `${PROFILE_KEY_PREFIX}.${sanitizeUserId(userId)}`;
}

function switchToUser(nextUserId: string): void {
  const nextUser = saveCurrentUserId(nextUserId);
  currentUserId = nextUser;
  knownUserIds = rememberUser(nextUser);
  setStorageNamespace(nextUser);
  activeSession = loadActiveSession();
  studyProfile = loadStudyProfile(nextUser);
  lastResult = null;
  clearSessionTimers();
  startTimer();
  setStorageNotice(`Bytt till användare: ${formatUserLabel(nextUser)}`);
}

function loadTheme(): ThemeId {
  const stored = localStorage.getItem(THEME_KEY) as ThemeId | null;
  if (stored && THEME_PRESETS.some((theme) => theme.id === stored)) {
    return stored;
  }
  return "calm-public";
}

function applyTheme(themeId: ThemeId): void {
  document.body.dataset.theme = themeId;
  localStorage.setItem(THEME_KEY, themeId);
}

let page: Page = "overview";
let filters: QuestionFilters = {
  trackId: "all",
  topic: "all",
  difficulty: "all",
  sourceTier: "all"
};
let knownUserIds = loadKnownUsers();
let currentUserId = loadCurrentUserId();
setStorageNamespace(currentUserId);
let activeTheme: ThemeId = loadTheme();
applyTheme(activeTheme);
let chosenMockId = getNextMockExam().id;
const requestedView = urlParams.get("view");
if (requestedView && requestedView in pageLabels) {
  page = requestedView as Page;
}
const requestedTrack = urlParams.get("track");
if (requestedTrack && TRACKS.some((track) => track.id === requestedTrack)) {
  filters = { ...filters, trackId: requestedTrack as TrackId };
}
const requestedMock = urlParams.get("mock");
if (requestedMock && MOCK_EXAMS.some((mock) => mock.id === requestedMock)) {
  chosenMockId = requestedMock;
}
let activeSession: SessionDraft | null = loadActiveSession();
let lastResult: SessionResult | null = null;
let sessionEndTimeoutRef: number | null = null;
let isOnline = navigator.onLine;
let storageNotice = "";
const PULL_REFRESH_TRIGGER_PX = 82;
const PULL_REFRESH_MAX_PX = 112;
let pullStartY: number | null = null;
let pullDistance = 0;
let pullArmed = false;
let pullIndicator: HTMLDivElement | null = null;
let generatedUxScenario =
  "Designa en digital tjänst för IKEA som löser problemet: kunden vill boka upphämtning av returvaror.";

const PROFILE_QUESTION_ORDER = ["sessionPreference", "blocker", "confidence", "targetPriority"] as const;
const PROFILE_OPTIONS: Record<(typeof PROFILE_QUESTION_ORDER)[number], ProfileOption[]> = {
  sessionPreference: [
    { id: "30", label: "30 min fokuspass (rekommenderat nu)" },
    { id: "45", label: "45 min standardpass" },
    { id: "60", label: "60 min när jag har energi" }
  ],
  blocker: [
    { id: "time", label: "Tidsstress i prov" },
    { id: "logic", label: "Logik och resonemang" },
    { id: "network", label: "IT/nätverkstermer" },
    { id: "coding", label: "Kodförståelse/felsökning" },
    { id: "other", label: "Annat (skriv i fritext)" }
  ],
  confidence: [
    { id: "low", label: "Låg - behöver tydlig guidning" },
    { id: "mid", label: "Medel - behöver mest träning" },
    { id: "high", label: "Hög - vill främst ha tidsprov" }
  ],
  targetPriority: [
    { id: "nack", label: "Nackademin UX (akut)" },
    { id: "iths", label: "IT-H IT-säkerhet" },
    { id: "prog", label: "Programmering 1/A" }
  ]
};
let studyProfile: StudyProfile = loadStudyProfile();

function getTrackName(trackId: TrackId): string {
  return TRACKS.find((track) => track.id === trackId)?.name || trackId;
}

function getTrackClass(trackId: TrackId): string {
  return `track-${trackId}`;
}

function getSessionClockState(session: SessionDraft): {
  remainingMs: number;
  remainingPercent: number;
} {
  const remainingMs = Math.max(0, session.endsAt - Date.now());
  const totalMs = Math.max(1, session.endsAt - session.startedAt);
  const remainingPercent = Math.max(0, Math.min(100, (remainingMs / totalMs) * 100));
  return {
    remainingMs,
    remainingPercent
  };
}

function updateActiveSessionClockUI(): void {
  if (!activeSession) {
    return;
  }
  const clock = getSessionClockState(activeSession);
  const timerBar = app.querySelector<HTMLElement>("[data-session-remaining-bar]");
  if (timerBar) {
    timerBar.style.width = `${clock.remainingPercent}%`;
  }
  const timerTrack = app.querySelector<HTMLElement>("[data-session-remaining-track]");
  if (timerTrack) {
    timerTrack.setAttribute("aria-valuenow", String(Math.round(clock.remainingPercent)));
  }
}

function clearSessionTimers(): void {
  if (sessionEndTimeoutRef) {
    window.clearTimeout(sessionEndTimeoutRef);
    sessionEndTimeoutRef = null;
  }
}

function getSessionQuestions(session: SessionDraft): Question[] {
  return session.questionIds.map((id) => QUESTIONS.find((question) => question.id === id)).filter(Boolean) as Question[];
}

function totalCompletedMinutes(sessions: StudySession[]): number {
  return sessions.reduce((sum, session) => sum + session.duration_minutes, 0);
}

function buildTrackProgress(sessions: StudySession[]): Record<TrackId, number> {
  const totals: Record<TrackId, number> = {
    nackademin_ux: 0,
    iths_itsec: 0,
    prog1a: 0
  };

  for (const session of sessions) {
    totals.nackademin_ux += session.track_mix.nackademin_ux || 0;
    totals.iths_itsec += session.track_mix.iths_itsec || 0;
    totals.prog1a += session.track_mix.prog1a || 0;
  }

  const divisor = Math.max(1, sessions.length);
  return {
    nackademin_ux: Math.round(totals.nackademin_ux / divisor),
    iths_itsec: Math.round(totals.iths_itsec / divisor),
    prog1a: Math.round(totals.prog1a / divisor)
  };
}

function getLogicQuestions(): Question[] {
  return QUESTIONS.filter((question) =>
    ["Logik/analys", "Svenska/Engelska/Matte", "Code tracing", "Debugging-game"].includes(question.topic)
  );
}

function getWalkthroughQuestions(): Question[] {
  const walkthroughIds = ["ux-1", "ux-9", "it-1", "it-11", "core-1", "prog-1", "prog-12", "prog-8"];
  return walkthroughIds
    .map((id) => QUESTIONS.find((question) => question.id === id))
    .filter((question): question is Question => Boolean(question));
}

function generateUxScenarioPrompt(): string {
  const organizations = ["IKEA", "1177", "SJ", "Skatteverket", "Foodora"];
  const problems = [
    "användaren hittar inte status på sitt ärende",
    "för många steg gör att användaren avbryter",
    "det är otydligt vad som händer efter beställning",
    "returer och ombokningar upplevs krångliga",
    "supporten får för många repetitiva frågor"
  ];
  const company = organizations[Math.floor(Math.random() * organizations.length)];
  const problem = problems[Math.floor(Math.random() * problems.length)];
  return `Designa en digital tjänst för ${company} som löser problemet: ${problem}.`;
}

function getDefaultStudyProfile(): StudyProfile {
  return {
    sessionPreference: "30",
    blocker: "time",
    confidence: "mid",
    targetPriority: "nack",
    notes: ""
  };
}

function loadStudyProfile(userId = currentUserId): StudyProfile {
  try {
    const raw = localStorage.getItem(profileKeyFor(userId));
    if (!raw) {
      return getDefaultStudyProfile();
    }
    const parsed = JSON.parse(raw) as Partial<StudyProfile>;
    return {
      ...getDefaultStudyProfile(),
      ...parsed
    };
  } catch {
    return getDefaultStudyProfile();
  }
}

function saveStudyProfile(profile: StudyProfile, userId = currentUserId): void {
  localStorage.setItem(profileKeyFor(userId), JSON.stringify(profile));
}

function calculateMockSectionResults(
  templateId: string | undefined,
  questions: Question[],
  answers: Record<string, string>
): { templateName?: string; sectionResults: SectionResult[]; finalScore: number } {
  const fallback = scoreAnswers(questions, answers);
  if (!templateId) {
    return {
      sectionResults: [],
      finalScore: fallback.scorePercent
    };
  }

  const template = MOCK_EXAMS.find((item) => item.id === templateId);
  if (!template) {
    return {
      sectionResults: [],
      finalScore: fallback.scorePercent
    };
  }

  const sectionResults = template.sections.map((section) => {
    const sectionQuestions = questions.filter((question) => section.question_ids.includes(question.id));
    const sectionScored = scoreAnswers(sectionQuestions, answers);
    return {
      title: section.title,
      scorePercent: sectionScored.scorePercent,
      correct: sectionScored.correct,
      total: sectionScored.total,
      weight: section.weight
    };
  });

  const weightTotal = sectionResults.reduce((sum, section) => sum + section.weight, 0) || 1;
  const weightedScore = sectionResults.reduce(
    (sum, section) => sum + section.scorePercent * (section.weight / weightTotal),
    0
  );

  return {
    templateName: template.name,
    sectionResults,
    finalScore: Math.round(weightedScore)
  };
}

function getProfileLabel(questionId: (typeof PROFILE_QUESTION_ORDER)[number], optionId: string): string {
  return PROFILE_OPTIONS[questionId].find((option) => option.id === optionId)?.label || optionId;
}

function getPriorityTrackFromProfile(priority: string): TrackId {
  if (priority === "iths") {
    return "iths_itsec";
  }
  if (priority === "prog") {
    return "prog1a";
  }
  return "nackademin_ux";
}

function getDefaultTopicForTrack(trackId: TrackId): string {
  if (trackId === "nackademin_ux") {
    return "Logik/analys";
  }
  if (trackId === "iths_itsec") {
    return "Dator- och nätverksteknik";
  }
  return "Loopar";
}

function guessTrackForTopic(topic: string): TrackId {
  const pool = QUESTIONS.filter((question) => question.topic === topic);
  if (pool.length === 0) {
    return "nackademin_ux";
  }
  const counts: Record<TrackId, number> = { nackademin_ux: 0, iths_itsec: 0, prog1a: 0 };
  for (const question of pool) {
    counts[question.track_id] += 1;
  }
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] as TrackId) || "nackademin_ux";
}

function createAdaptiveSuggestion(sessions: StudySession[]): AdaptiveSuggestion {
  const targetTrack = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const sprint = createDailyPlan().sprint;

  const stats: Record<
    TrackId,
    { minutes: number; avgScore: number; weight: number; weakHits: number; recentHeavy: number; score: number }
  > = {
    nackademin_ux: { minutes: 0, avgScore: 0, weight: 0, weakHits: 0, recentHeavy: 0, score: 0 },
    iths_itsec: { minutes: 0, avgScore: 0, weight: 0, weakHits: 0, recentHeavy: 0, score: 0 },
    prog1a: { minutes: 0, avgScore: 0, weight: 0, weakHits: 0, recentHeavy: 0, score: 0 }
  };

  const sortedByDate = [...sessions].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  for (const session of sessions) {
    for (const trackId of TRACKS.map((track) => track.id)) {
      const mix = session.track_mix[trackId];
      const share = mix / 100;
      if (mix <= 0) {
        continue;
      }
      stats[trackId].minutes += Math.round(session.duration_minutes * share);
      stats[trackId].avgScore += session.score * share;
      stats[trackId].weight += share;
    }

    for (const topic of session.weak_topics) {
      const topicTrack = guessTrackForTopic(topic);
      stats[topicTrack].weakHits += 1;
    }
  }

  for (const trackId of TRACKS.map((track) => track.id)) {
    const info = stats[trackId];
    info.avgScore = info.weight > 0 ? Math.round(info.avgScore / info.weight) : 0;
  }

  const recent = sortedByDate.slice(0, 2);
  for (const session of recent) {
    const topTrack = (Object.entries(session.track_mix).sort((a, b) => b[1] - a[1])[0]?.[0] as TrackId) || "nackademin_ux";
    if (session.track_mix[topTrack] >= 60) {
      stats[topTrack].recentHeavy += 1;
    }
  }

  for (const track of TRACKS) {
    const info = stats[track.id];
    let score = 0;
    if (track.id === targetTrack) {
      score += 2.2;
    }
    if (sprint === "A" && track.id === "nackademin_ux") {
      score += 1.4;
    }
    if (sprint === "B" && track.id === "iths_itsec") {
      score += 1.4;
    }
    if (info.minutes < 20) {
      score += 1.2;
    }
    score += info.weakHits * 0.75;
    score -= info.recentHeavy * 1.1;
    if (info.avgScore > 75 && info.minutes > 80) {
      score -= 0.6;
    }
    info.score = score;
  }

  const chosenTrack = (Object.entries(stats).sort((a, b) => b[1].score - a[1].score)[0]?.[0] as TrackId) || targetTrack;
  const ranking = (Object.entries(stats)
    .sort((a, b) => b[1].score - a[1].score)
    .map(([trackId]) => trackId) as TrackId[]).slice(0, TRACKS.length);
  const weakTopicsForTrack = sortedByDate
    .flatMap((session) => session.weak_topics)
    .filter((topic) => guessTrackForTopic(topic) === chosenTrack);
  const topic = weakTopicsForTrack[0] || getDefaultTopicForTrack(chosenTrack);
  const mode: Mode = stats[chosenTrack].weakHits >= 2 || studyProfile.confidence === "low" ? "Lär" : "Drill";
  const durationMinutes = Math.max(25, Math.min(45, Number.parseInt(studyProfile.sessionPreference, 10) || 35));

  const prioritized = QUESTIONS.filter((question) => question.track_id === chosenTrack).sort((a, b) => {
    const aMatch = a.topic === topic ? 1 : 0;
    const bMatch = b.topic === topic ? 1 : 0;
    return bMatch - aMatch;
  });
  const questionIds = prioritized.slice(0, 10).map((question) => question.id);

  const reason = `${getTrackName(chosenTrack)} prioriteras nu (${stats[chosenTrack].weakHits} svaghetsträffar, senaste fokus balanseras).`;

  return {
    trackId: chosenTrack,
    topic,
    mode,
    durationMinutes,
    questionIds,
    reason,
    ranking
  };
}

function getTrackStatuses(sessions: StudySession[], suggestion: AdaptiveSuggestion): TrackStatus[] {
  return TRACKS.map((track) => {
    const perTrackMinutes = sessions.reduce(
      (sum, session) => sum + Math.round((session.duration_minutes * (session.track_mix[track.id] || 0)) / 100),
      0
    );
    const weightedScore = sessions.reduce((sum, session) => sum + session.score * ((session.track_mix[track.id] || 0) / 100), 0);
    const weightedShare = sessions.reduce((sum, session) => sum + (session.track_mix[track.id] || 0) / 100, 0);
    const avgScore = weightedShare > 0 ? Math.round(weightedScore / weightedShare) : 0;
    const weakHits = sessions
      .flatMap((session) => session.weak_topics)
      .filter((topic) => guessTrackForTopic(topic) === track.id).length;

    let stage: TrackStatus["stage"] = "in_progress";
    if (perTrackMinutes < 15) {
      stage = "not_started";
    } else if (weakHits >= 3 || (weightedShare > 0 && avgScore < 55)) {
      stage = "needs_help";
    } else if (avgScore >= 75 && perTrackMinutes >= 80 && weakHits <= 1) {
      stage = "near_ready";
    }

    return {
      trackId: track.id,
      minutes: perTrackMinutes,
      avgScore,
      weakHits,
      priority: suggestion.trackId === track.id,
      stage
    };
  });
}

function stageLabel(stage: TrackStatus["stage"]): string {
  if (stage === "not_started") {
    return "Ej startad";
  }
  if (stage === "needs_help") {
    return "Mycket fel";
  }
  if (stage === "near_ready") {
    return "Nära klar";
  }
  return "Påbörjad";
}

function stageButtonClass(stage: TrackStatus["stage"]): string {
  if (stage === "not_started") {
    return "track-btn-not-started";
  }
  if (stage === "needs_help") {
    return "track-btn-needs-help";
  }
  if (stage === "near_ready") {
    return "track-btn-near-ready";
  }
  return "track-btn-in-progress";
}

function getTodayDrillQuestions(): Question[] {
  const plan = createDailyPlan();
  const picked: Question[] = [];
  const priorityTrack = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const blockerKeywords: Record<string, string[]> = {
    time: ["Logik/analys", "Problemlösning", "Svenska/Engelska/Matte"],
    logic: ["Logik/analys", "Code tracing", "Debugging-game"],
    network: ["Dator- och nätverksteknik", "Säkerhet och social engineering"],
    coding: ["Loopar", "Metoder", "Felsökning", "Code tracing", "Debugging-game"],
    other: []
  };
  const focusTopics = blockerKeywords[studyProfile.blocker] || [];

  for (const block of plan.blocks) {
    const pool = QUESTIONS.filter((question) => question.track_id === block.trackId);
    const target = block.minutes >= 20 ? 4 : block.minutes >= 10 ? 3 : 2;
    const selectedForTrack = pool.slice(0, target);
    for (const question of selectedForTrack) {
      if (!picked.find((item) => item.id === question.id)) {
        picked.push(question);
      }
    }
  }

  const priorityPool = QUESTIONS.filter((question) => question.track_id === priorityTrack);
  for (const question of priorityPool) {
    if (!picked.find((item) => item.id === question.id)) {
      picked.unshift(question);
    }
    if (picked.length >= 12) {
      break;
    }
  }

  if (focusTopics.length > 0) {
    const focusPool = QUESTIONS.filter((question) => focusTopics.includes(question.topic));
    for (const question of focusPool) {
      if (!picked.find((item) => item.id === question.id)) {
        picked.push(question);
      }
      if (picked.length >= 12) {
        break;
      }
    }
  }

  if (picked.length < 8) {
    for (const question of QUESTIONS) {
      if (!picked.find((item) => item.id === question.id)) {
        picked.push(question);
      }
      if (picked.length >= 8) {
        break;
      }
    }
  }

  return picked.slice(0, 12);
}

function setStorageNotice(message: string): void {
  storageNotice = message;
  render();
  window.setTimeout(() => {
    storageNotice = "";
    render();
  }, 3500);
}

function exportProgressSnapshot(): void {
  const snapshot = exportStudyDataSnapshot();
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.href = url;
  link.download = `yh-prep-backup-${stamp}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setStorageNotice("Backup exporterat.");
}

async function importProgressSnapshot(file: File): Promise<void> {
  try {
    const raw = await file.text();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result = importStudyDataSnapshot(parsed);
    activeSession = loadActiveSession();
    setStorageNotice(
      `Import klar: ${result.importedSessions} pass, aktiv session ${result.restoredActiveSession ? "återställd" : "saknas"}.`
    );
  } catch {
    setStorageNotice("Import misslyckades. Kontrollera att filen är en giltig backup.");
  }
}

function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const isGithubPages = window.location.hostname.endsWith("github.io");
  if (isGithubPages) {
    navigator.serviceWorker
      .getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => undefined);

    if ("caches" in window) {
      caches
        .keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .catch(() => undefined);
    }
    return;
  }

  navigator.serviceWorker.register("sw.js").catch(() => {
    setStorageNotice("Kunde inte aktivera offline-läge.");
  });
}

function ensureFreshBuild(): boolean {
  try {
    const previous = localStorage.getItem(BUILD_MARKER_KEY);
    if (previous !== UI_BUILD) {
      localStorage.setItem(BUILD_MARKER_KEY, UI_BUILD);
      if (previous) {
        const url = new URL(window.location.href);
        if (url.searchParams.get("v") !== UI_BUILD) {
          url.searchParams.set("v", UI_BUILD);
          window.location.replace(url.toString());
          return true;
        }
      }
    }
  } catch {
    return false;
  }
  return false;
}

function isPullRefreshBlockedTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }
  return Boolean(target.closest("input, textarea, select, button, a, summary, label"));
}

function ensurePullIndicator(): HTMLDivElement {
  if (pullIndicator) {
    return pullIndicator;
  }
  const indicator = document.createElement("div");
  indicator.className = "pull-refresh-indicator";
  indicator.setAttribute("aria-hidden", "true");
  indicator.textContent = "Dra ned för uppdatera";
  document.body.append(indicator);
  pullIndicator = indicator;
  return indicator;
}

function updatePullIndicator(distance: number, armed: boolean): void {
  const indicator = ensurePullIndicator();
  const bounded = Math.max(0, Math.min(PULL_REFRESH_MAX_PX, distance));
  indicator.style.opacity = bounded > 0 ? "1" : "0";
  indicator.style.transform = `translate(-50%, ${-50 + bounded}px)`;
  indicator.classList.toggle("visible", bounded > 0);
  indicator.classList.toggle("armed", armed);
  indicator.textContent = armed ? "Släpp för att uppdatera" : "Dra ned för uppdatera";
}

function resetPullIndicator(): void {
  pullStartY = null;
  pullDistance = 0;
  pullArmed = false;
  if (!pullIndicator) {
    return;
  }
  pullIndicator.style.opacity = "0";
  pullIndicator.style.transform = "translate(-50%, -50px)";
  pullIndicator.classList.remove("visible", "armed");
  pullIndicator.textContent = "Dra ned för uppdatera";
}

function triggerSafeRefresh(): void {
  if (activeSession) {
    saveActiveSession(activeSession);
    setStorageNotice("Uppdaterar sidan... aktivt pass autosparas.");
    window.setTimeout(() => window.location.reload(), 120);
    return;
  }
  window.location.reload();
}

function setupPullToRefresh(): void {
  if (!("ontouchstart" in window)) {
    return;
  }
  ensurePullIndicator();

  window.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        pullStartY = null;
        return;
      }
      if (window.scrollY > 0 || isPullRefreshBlockedTarget(event.target)) {
        pullStartY = null;
        return;
      }
      pullStartY = event.touches[0].clientY;
      pullDistance = 0;
      pullArmed = false;
      updatePullIndicator(0, false);
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (pullStartY === null || event.touches.length !== 1) {
        return;
      }
      if (window.scrollY > 0) {
        resetPullIndicator();
        return;
      }

      const deltaY = event.touches[0].clientY - pullStartY;
      if (deltaY <= 0) {
        updatePullIndicator(0, false);
        return;
      }

      pullDistance = Math.min(PULL_REFRESH_MAX_PX, deltaY * 0.7);
      pullArmed = pullDistance >= PULL_REFRESH_TRIGGER_PX;
      updatePullIndicator(pullDistance, pullArmed);
      event.preventDefault();
    },
    { passive: false }
  );

  const finishPullGesture = () => {
    if (pullStartY === null) {
      return;
    }
    const shouldRefresh = pullArmed;
    resetPullIndicator();
    if (shouldRefresh) {
      triggerSafeRefresh();
    }
  };

  window.addEventListener("touchend", finishPullGesture, { passive: true });
  window.addEventListener("touchcancel", finishPullGesture, { passive: true });
}

function closeHeaderMenus(except?: HTMLDetailsElement): void {
  const openMenus = document.querySelectorAll<HTMLDetailsElement>("details.mini-menu[open]");
  openMenus.forEach((menu) => {
    if (!except || menu !== except) {
      menu.open = false;
    }
  });
}

function setupHeaderMenuBehavior(): void {
  document.addEventListener(
    "toggle",
    (event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) {
        return;
      }
      if (!target.matches("details.mini-menu")) {
        return;
      }
      if (target.open) {
        closeHeaderMenus(target);
      }
    },
    true
  );

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest("details.mini-menu")) {
        return;
      }
      closeHeaderMenus();
    },
    true
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHeaderMenus();
    }
  });
}

function startTimer(): void {
  clearSessionTimers();

  if (!activeSession) {
    return;
  }

  const remainingMs = Math.max(0, activeSession.endsAt - Date.now());
  sessionEndTimeoutRef = window.setTimeout(() => {
    finishSession(true);
  }, remainingMs);
  updateActiveSessionClockUI();
}

function buildTrackMixFromQuestions(questions: Question[]): Record<TrackId, number> {
  if (questions.length === 0) {
    return { nackademin_ux: 0, iths_itsec: 0, prog1a: 0 };
  }

  const byTrack: Record<TrackId, number> = { nackademin_ux: 0, iths_itsec: 0, prog1a: 0 };
  for (const question of questions) {
    byTrack[question.track_id] += 1;
  }

  return {
    nackademin_ux: Math.round((byTrack.nackademin_ux / questions.length) * 100),
    iths_itsec: Math.round((byTrack.iths_itsec / questions.length) * 100),
    prog1a: Math.round((byTrack.prog1a / questions.length) * 100)
  };
}

function formatReviewUserAnswer(review: QuestionReview): string {
  if (review.userAnswer.trim().length === 0) {
    return "Inget svar";
  }
  if (review.format === "mcq") {
    return `${review.userAnswer.toUpperCase()}${review.selectedOptionText ? ` - ${review.selectedOptionText}` : ""}`;
  }
  return review.userAnswer;
}

function startSession(mode: Mode, questionIds: string[], durationMinutes: number, templateId?: string): void {
  if (questionIds.length === 0) {
    return;
  }

  activeSession = {
    id: crypto.randomUUID(),
    mode,
    startedAt: Date.now(),
    endsAt: Date.now() + durationMinutes * 60_000,
    questionIds,
    currentIndex: 0,
    answers: {},
    templateId
  };

  saveActiveSession(activeSession);
  startTimer();
  render();
}

function finishSession(autoSubmitted = false): void {
  if (!activeSession) {
    return;
  }

  const questions = getSessionQuestions(activeSession);
  const scored = scoreAnswers(questions, activeSession.answers);
  const mockBreakdown = calculateMockSectionResults(activeSession.templateId, questions, activeSession.answers);
  const trackMix = buildTrackMixFromQuestions(questions);
  const questionReviews: QuestionReview[] = questions.map((question) => {
    const userAnswer = (activeSession?.answers[question.id] || "").trim();
    const selectedOptionText =
      question.format === "mcq"
        ? question.options?.find((option) => option.id.toLowerCase() === userAnswer.toLowerCase())?.text
        : undefined;
    return {
      id: question.id,
      trackId: question.track_id,
      topic: question.topic,
      prompt: question.prompt,
      difficulty: question.difficulty,
      sourceTier: question.source_tier,
      format: question.format,
      selectedOptionText,
      userAnswer,
      expectedAnswer: question.answer_key,
      explanation: question.explanation,
      isCorrect: isAnswerCorrect(question, userAnswer)
    };
  });

  const durationMinutes = Math.max(1, Math.round((Date.now() - activeSession.startedAt) / 60_000));

  saveStudySession({
    id: activeSession.id,
    date: new Date().toISOString(),
    duration_minutes: durationMinutes,
    mode: activeSession.mode,
    track_mix: trackMix,
    score: mockBreakdown.finalScore,
    weak_topics: scored.weakTopics
  });

  lastResult = {
    mode: activeSession.mode,
    scorePercent: mockBreakdown.finalScore,
    correct: scored.correct,
    total: scored.total,
    weakTopics: scored.weakTopics,
    autoSubmitted,
    sectionResults: mockBreakdown.sectionResults,
    questionReviews,
    templateName: mockBreakdown.templateName
  };

  activeSession = null;
  clearActiveSession();
  clearSessionTimers();
  render();
}

function cancelSession(): void {
  activeSession = null;
  clearActiveSession();
  clearSessionTimers();
  render();
}

function renderOverview(): string {
  const sessions = loadStudySessions();
  const plan = createDailyPlan();
  const trackMix = createTrackMix(plan.blocks);
  const progress = buildTrackProgress(sessions);
  const firstExamCountdown = getFirstExamCountdown();
  const firstExamDateLabel = formatFirstExamDate();
  const nextMock = getNextMockExam();
  const todayQuestions = getTodayDrillQuestions();
  const priorityTrack = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const priorityTrackName = getTrackName(priorityTrack);
  const preferenceMinutes = Number.parseInt(studyProfile.sessionPreference, 10) || plan.totalMinutes;
  const blockerLabel = getProfileLabel("blocker", studyProfile.blocker);
  const suggestion = createAdaptiveSuggestion(sessions);
  const statuses = getTrackStatuses(sessions, suggestion);
  const rankPos = new Map<TrackId, number>(suggestion.ranking.map((trackId, index) => [trackId, index]));
  const orderedStatuses = [...statuses].sort(
    (a, b) => (rankPos.get(a.trackId) ?? 99) - (rankPos.get(b.trackId) ?? 99)
  );

  return `
    <div class="grid overview-grid">
      <section class="card critical-card span-12">
        <h3>Snabbstart idag</h3>
        <p class="muted">Status: ${isOnline ? "Online" : "Offline"} • ${plan.totalMinutes} min</p>
        <div class="critical-kpis">
          <p><strong>Prov:</strong> ${firstExamCountdown}</p>
          <p><strong>Nästa mock:</strong> ${nextMock.minutes} min</p>
        </div>
        <p class="muted">Nu: ${priorityTrackName} • ${preferenceMinutes} min • ${blockerLabel}</p>
        <div class="inline-controls">
          <button class="primary" data-action="start-today-drill">Starta dagens pass</button>
        </div>
      </section>

      <section class="card span-12">
        <p class="muted">Prioritering</p>
        <div class="priority-strip">
          ${orderedStatuses
            .map(
              (status) => `
                <button class="track-priority-btn ${stageButtonClass(status.stage)} ${status.priority ? "is-recommended" : ""}"
                  data-action="focus-priority-track" data-track="${status.trackId}">
                  <strong>${status.priority ? "(R) " : ""}${getTrackName(status.trackId)}</strong>
                  <span>${status.priority ? suggestion.mode : "Drill"} • ${stageLabel(status.stage)} • ${status.avgScore}% • ${status.minutes} min</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <section class="card span-12">
        <h3>Ny här? Kör guidat test</h3>
        <p class="muted">Snabb genomgång av hur sidan funkar + mini-test i lärläge.</p>
        <div class="inline-controls">
          <button class="secondary" data-view="walkthrough">Öppna genomgång</button>
        </div>
      </section>

      <section class="card span-12">
        <details>
          <summary>Intervju</summary>
          <p class="muted">Flervalsfrågor med fritext för "Annat". Svaren styr rekommenderad träning i appen.</p>
          <div class="inline-controls">
            <label for="profile-sessionPreference">Passlängd</label>
            <select id="profile-sessionPreference" data-profile="sessionPreference">
              ${PROFILE_OPTIONS.sessionPreference
                .map(
                  (option) =>
                    `<option value="${option.id}" ${studyProfile.sessionPreference === option.id ? "selected" : ""}>${option.label}</option>`
                )
                .join("")}
            </select>

            <label for="profile-blocker">Största hinder</label>
            <select id="profile-blocker" data-profile="blocker">
              ${PROFILE_OPTIONS.blocker
                .map(
                  (option) => `<option value="${option.id}" ${studyProfile.blocker === option.id ? "selected" : ""}>${option.label}</option>`
                )
                .join("")}
            </select>

            <label for="profile-confidence">Nuvarande nivå</label>
            <select id="profile-confidence" data-profile="confidence">
              ${PROFILE_OPTIONS.confidence
                .map(
                  (option) =>
                    `<option value="${option.id}" ${studyProfile.confidence === option.id ? "selected" : ""}>${option.label}</option>`
                )
                .join("")}
            </select>

            <label for="profile-targetPriority">Primärt mål</label>
            <select id="profile-targetPriority" data-profile="targetPriority">
              ${PROFILE_OPTIONS.targetPriority
                .map(
                  (option) =>
                    `<option value="${option.id}" ${studyProfile.targetPriority === option.id ? "selected" : ""}>${option.label}</option>`
                )
                .join("")}
            </select>

            <label for="profile-notes">Annat du vill att planen tar hänsyn till</label>
            <textarea id="profile-notes" data-profile="notes" rows="3" placeholder="Skriv fritt här (valfritt)">${studyProfile.notes}</textarea>
            <button class="primary" data-action="save-profile">Spara intervju</button>
          </div>
          <p class="muted">Valt just nu: ${getProfileLabel("sessionPreference", studyProfile.sessionPreference)} • ${getProfileLabel("blocker", studyProfile.blocker)}</p>
        </details>
      </section>

      <section class="card span-6">
        <details>
          <summary>Dagens plan</summary>
          <p class="muted">${plan.title}</p>
          <ol class="list-clean">
            ${plan.blocks
              .map(
                (block) =>
                  `<li><span class="track-pill ${getTrackClass(block.trackId)}">${getTrackName(block.trackId)}</span> ${block.topic} (${block.minutes} min)</li>`
              )
              .join("")}
          </ol>
          <p class="muted">Fördelning: UX ${trackMix.nackademin_ux}% • IT-H ${trackMix.iths_itsec}% • Prog1/A ${trackMix.prog1a}%</p>
          <p class="muted">Frågor i dagens pass: ${todayQuestions.length}</p>
        </details>
      </section>

      <section class="card span-6">
        <details>
          <summary>Visa progression</summary>
          <p><span class="track-pill track-nackademin_ux">UX</span> ${progress.nackademin_ux}%</p>
          <div class="progress"><div style="width:${progress.nackademin_ux}%"></div></div>
          <p><span class="track-pill track-iths_itsec">IT</span> ${progress.iths_itsec}%</p>
          <div class="progress"><div style="width:${progress.iths_itsec}%"></div></div>
          <p><span class="track-pill track-prog1a">Prog</span> ${progress.prog1a}%</p>
          <div class="progress"><div style="width:${progress.prog1a}%"></div></div>
          <p><span class="track-pill">Logik</span> ${Math.round((progress.nackademin_ux + progress.iths_itsec) / 2)}%</p>
          <div class="progress"><div style="width:${Math.round((progress.nackademin_ux + progress.iths_itsec) / 2)}%"></div></div>
        </details>
      </section>

      <section class="card span-6">
        <details>
          <summary>Visa provdetaljer och backup</summary>
          <p><strong>Första provdatum:</strong> ${firstExamDateLabel}</p>
          <p><strong>Genomförd tid:</strong> ${totalCompletedMinutes(sessions)} min (${sessions.length} pass)</p>
          <div class="inline-controls">
            <button class="secondary" data-action="export-progress">Exportera backup</button>
            <input type="file" accept="application/json" data-input="import-progress" />
          </div>
          ${storageNotice ? `<p class="success">${storageNotice}</p>` : ""}
        </details>
      </section>
    </div>
  `;
}

function renderTracks(): string {
  const sharedCore = ["Logik/analys", "Mattebas", "Teststrategi", "Programmeringsgrunder"];
  return `
    <div class="grid">
      ${TRACKS.map(
        (track) => `
          <section class="card span-4">
            <h3>${track.name}</h3>
            <p class="muted">Mål: ${track.goal_exam}</p>
            <p>Språk: ${track.language_mode === "sv" ? "Svenska" : "Svenska + English terms"}</p>
            <p><strong>Gemensam kärna:</strong> ${sharedCore.join(" • ")}</p>
            <div class="inline-controls">
              <button class="primary" data-action="start-track-learn" data-track="${track.id}">Starta Lär</button>
              <button class="secondary" data-action="start-track-drill" data-track="${track.id}">Starta Drill</button>
            </div>
          </section>
        `
      ).join("")}
      <section class="card span-12">
        <h3>UX scenario-generator</h3>
        <p>${generatedUxScenario}</p>
        <p class="muted">
          Workflow: 1) Målgruppsanalys → 2) Enkel wireframe-idé (text/skiss) → 3) Motivering.
        </p>
        <button class="primary" data-action="generate-ux-case">Generera nytt case</button>
      </section>
    </div>
  `;
}

function renderBank(): string {
  const filtered = filterQuestions(QUESTIONS, filters);
  const topics = Array.from(new Set(QUESTIONS.map((question) => question.topic))).sort();

  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Frågebank med filter</h3>
        <div class="inline-controls">
          <select data-filter="trackId">
            <option value="all" ${filters.trackId === "all" ? "selected" : ""}>Alla spår</option>
            ${TRACKS.map(
              (track) =>
                `<option value="${track.id}" ${filters.trackId === track.id ? "selected" : ""}>${track.name}</option>`
            ).join("")}
          </select>

          <select data-filter="topic">
            <option value="all" ${filters.topic === "all" ? "selected" : ""}>Alla ämnen</option>
            ${topics
              .map((topic) => `<option value="${topic}" ${filters.topic === topic ? "selected" : ""}>${topic}</option>`)
              .join("")}
          </select>

          <select data-filter="difficulty">
            <option value="all" ${filters.difficulty === "all" ? "selected" : ""}>Alla nivåer</option>
            ${["Lätt", "Medel", "Svår"]
              .map(
                (diff) =>
                  `<option value="${diff}" ${filters.difficulty === diff ? "selected" : ""}>${diff}</option>`
              )
              .join("")}
          </select>

          <select data-filter="sourceTier">
            <option value="all" ${filters.sourceTier === "all" ? "selected" : ""}>Alla källnivåer</option>
            ${["Officiell", "Sekundär", "Community"]
              .map(
                (sourceTier) =>
                  `<option value="${sourceTier}" ${filters.sourceTier === sourceTier ? "selected" : ""}>${sourceTier}</option>`
              )
              .join("")}
          </select>

          <button class="primary" data-action="start-drill">Starta Drill (${estimateDrillMinutes(filtered)} min)</button>
        </div>
        <p class="muted">${filtered.length} frågor matchar filter.</p>
      </section>

      ${filtered
        .map(
          (question) => `
            <article class="card span-6">
              <p>
                <span class="track-pill ${getTrackClass(question.track_id)}">${getTrackName(question.track_id)}</span>
                <span class="research-tag">${question.difficulty}</span>
                <span class="research-tag">${question.source_tier}</span>
              </p>
              <p><strong>${question.topic}</strong></p>
              <p>${question.prompt}</p>
              <details>
                <summary>Visa facit + förklaring</summary>
                <p><strong>Svar:</strong> ${question.answer_key}</p>
                <p>${question.explanation}</p>
              </details>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderMock(): string {
  const template = MOCK_EXAMS.find((item) => item.id === chosenMockId) || MOCK_EXAMS[0];
  const questionCount = template.sections.reduce((sum, section) => sum + section.question_ids.length, 0);
  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Mockprov (tidsprov)</h3>
        <div class="inline-controls">
          <select data-mock-select="true">
            ${MOCK_EXAMS.map(
              (item) => `<option value="${item.id}" ${item.id === template.id ? "selected" : ""}>${item.name}</option>`
            ).join("")}
          </select>
          <button class="primary" data-action="start-mock">Starta ${template.total_minutes} min</button>
        </div>
        <p class="muted">${questionCount} frågor i detta mockprov.</p>
        <p class="muted">Poängregel: ${template.scoring_rules}</p>
      </section>

      ${template.sections
        .map(
          (section) => `
            <section class="card span-6">
              <h3>${section.title}</h3>
              <p><span class="track-pill ${getTrackClass(section.track_id)}">${getTrackName(section.track_id)}</span></p>
              <p>Tid: ${section.minutes} min • Vikt: ${Math.round(section.weight * 100)}%</p>
              <p>Ämnen: ${section.topics.join(" • ")}</p>
              <p class="muted">Frågor: ${section.question_ids.join(", ")}</p>
            </section>
          `
        )
        .join("")}
    </div>
  `;
}

function renderResearch(): string {
  const officialCount = RESEARCH_EVIDENCE.filter((entry) => entry.source_tier === "Officiell").length;
  const communityCount = RESEARCH_EVIDENCE.filter((entry) => entry.source_tier === "Community").length;
  const secondaryCount = RESEARCH_EVIDENCE.filter((entry) => entry.source_tier === "Sekundär").length;

  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Evidence-kort: tidigare års prov och mönster</h3>
        <p class="muted">Officiell: ${officialCount} • Sekundär: ${secondaryCount} • Community: ${communityCount}</p>
      </section>
      <section class="card span-12">
        <h3>Gemensamt mellan proven (cross-training)</h3>
        <p class="muted">Det här är kärnan du kan träna en gång och få nytta i flera spår.</p>
        <div class="review-list">
          ${SHARED_EXAM_THEMES.map(
            (theme) => `
              <article class="review-item">
                <p><strong>${theme.title}</strong></p>
                <p>${theme.whyItMatters}</p>
                <p class="muted">Drilltips: ${theme.drillHint}</p>
              </article>
            `
          ).join("")}
        </div>
      </section>
      ${RESEARCH_EVIDENCE.map(
        (entry) => `
          <article class="card span-6">
            <p>
              <span class="research-tag">${entry.source_tier}</span>
              <span class="research-tag">Tillförlitlighet: ${entry.confidence}</span>
              <span class="research-tag">${entry.source_tier === "Officiell" ? "Bekräftat" : "Antagande"}</span>
            </p>
            <h3>${entry.provider}</h3>
            <p>${entry.claim}</p>
            <p class="muted">Verifierad: ${entry.last_verified_date}</p>
            <a href="${entry.url}" target="_blank" rel="noreferrer">Öppna källa</a>
          </article>
        `
      ).join("")}
    </div>
  `;
}

function renderLogic(): string {
  const logicQuestions = getLogicQuestions();
  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Logik-flik</h3>
        <p class="muted">Inspirerad av Gemini-planens dashboard med egen logikmodul.</p>
        <div class="inline-controls">
          <button class="primary" data-action="start-logic-drill">
            Starta logik-drill (${estimateDrillMinutes(logicQuestions)} min)
          </button>
        </div>
      </section>
      ${logicQuestions
        .map(
          (question) => `
            <article class="card span-6">
              <p>
                <span class="track-pill ${getTrackClass(question.track_id)}">${getTrackName(question.track_id)}</span>
                <span class="research-tag">${question.topic}</span>
              </p>
              <p>${question.prompt}</p>
              <details>
                <summary>Visa facit + förklaring</summary>
                <p><strong>Svar:</strong> ${question.answer_key}</p>
                <p>${question.explanation}</p>
              </details>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderWalkthrough(): string {
  const walkthroughQuestions = getWalkthroughQuestions();
  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Guidad test-genomgång</h3>
        <p>
          Kör detta när du vill förstå <strong>hela upplägget</strong> och samtidigt testa nivå:
          först en snabb rundtur i appens delar, sedan ett kort lärtest med facit och förklaring.
        </p>
        <ol class="list-clean">
          <li><strong>Översikt:</strong> dagligt pass, prioritering och snabbstart.</li>
          <li><strong>Spår:</strong> välj Nackademin UX, IT-H IT-säkerhet eller Programmering 1/A.</li>
          <li><strong>Frågebank:</strong> filtrera frågor på spår, ämne, svårighet, källnivå.</li>
          <li><strong>Mockprov:</strong> kör tidsprov (inkl. mini-check 5 min).</li>
          <li><strong>Research:</strong> se vad som är officiellt, sekundärt och community.</li>
          <li><strong>Logik:</strong> extra övningar för resonemang.</li>
          <li><strong>Python-minikurs:</strong> öppnas via toppmenyn när du vill byta del.</li>
        </ol>
        <div class="inline-controls">
          <button class="primary" data-action="start-walkthrough-learn">
            Starta guidat test (Lär, 8 min)
          </button>
          <button class="secondary" data-action="start-walkthrough-timed">
            Starta snabbtest (Tidsprov, 5 min)
          </button>
        </div>
        <p class="muted">
          Guidat test: ${walkthroughQuestions.length} frågor från UX, IT-H, matte/språk och programmering.
        </p>
      </section>
    </div>
  `;
}

function renderDesign(): string {
  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Designförslag (lugn + tydlig)</h3>
        <p class="muted">Välj en stil som känns minst spretig. Du kan byta när som helst.</p>
        <p class="muted">
          Referens:
          <a href="https://www.w3.org/WAI/tutorials/forms/grouping/" target="_blank" rel="noreferrer">W3C formgruppering</a>
          •
          <a href="https://designsystem.digital.gov/components/radio-buttons/" target="_blank" rel="noreferrer">USWDS radio buttons</a>
        </p>
        <div class="theme-grid">
          ${THEME_PRESETS.map(
            (theme) => `
              <article class="theme-card ${activeTheme === theme.id ? "active" : ""}">
                <p class="muted">${theme.reference}</p>
                <h3>${theme.name}</h3>
                <p>${theme.description}</p>
                <div class="theme-demo-row">
                  <button class="primary" type="button">Primär</button>
                  <button class="secondary" type="button">Sekundär</button>
                </div>
                <p class="theme-demo-text">Exempeltext för rubrik, brödtext och knappar.</p>
                <button class="secondary" data-action="set-theme" data-theme="${theme.id}">
                  ${activeTheme === theme.id ? "Aktiv stil" : "Använd denna stil"}
                </button>
              </article>
            `
          ).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderActiveSession(): string {
  if (!activeSession) {
    return "";
  }

  const questions = getSessionQuestions(activeSession);
  const currentQuestion = questions[activeSession.currentIndex];
  if (!currentQuestion) {
    return "";
  }

  const clock = getSessionClockState(activeSession);
  const answered = Object.keys(activeSession.answers).length;
  const answerValue = activeSession.answers[currentQuestion.id] || "";

  return `
    <section class="card session">
      <div class="session-head">
        <h3>Aktiv ${activeSession.mode}</h3>
        <button class="session-close" data-action="cancel-session" aria-label="Avbryt test">×</button>
      </div>
      <p class="session-timer muted">Tidspuls för passet</p>
      <div class="session-timer-line" data-session-remaining-track role="progressbar" aria-label="Tid kvar i passet" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(clock.remainingPercent)}">
        <div data-session-remaining-bar style="width:${clock.remainingPercent}%"></div>
      </div>
      <p class="muted">Autosparning: aktiv • ${answered}/${questions.length} besvarade</p>
      <p class="session-question"><strong>Fråga ${activeSession.currentIndex + 1}/${questions.length}:</strong> ${currentQuestion.prompt}</p>

      ${
        currentQuestion.format === "mcq"
          ? `<fieldset class="answer-group">
              <legend class="sr-only">Välj ett svar</legend>
              <div class="answer-options">${(currentQuestion.options || [])
              .map(
                (option) => `
                  <label class="answer-option ${answerValue === option.id ? "is-selected" : ""}">
                    <input type="radio" name="answer-${currentQuestion.id}" data-action="answer" data-qid="${currentQuestion.id}" value="${option.id}" ${
                      answerValue === option.id ? "checked" : ""
                    } />
                    <span class="answer-option-key">${option.id.toUpperCase()}</span>
                    <span class="answer-option-text">${option.text}</span>
                  </label>
                `
              )
              .join("")}</div>
            </fieldset>`
          : `<textarea data-action="answer-text" data-qid="${currentQuestion.id}" rows="4" placeholder="Skriv ditt svar här">${answerValue}</textarea>`
      }
      ${
        activeSession.mode === "Lär"
          ? `
            <details open>
              <summary>Förklaring i lärläge</summary>
              <p><strong>Facit:</strong> ${currentQuestion.answer_key}</p>
              <p>${currentQuestion.explanation}</p>
            </details>
          `
          : ""
      }

      <p class="muted">Källnivå: ${currentQuestion.source_tier} • Nivå: ${currentQuestion.difficulty}</p>
      <div class="inline-controls session-actions">
        <button class="secondary" data-action="prev-q" ${activeSession.currentIndex === 0 ? "disabled" : ""}>Föregående</button>
        <button class="secondary" data-action="next-q" ${activeSession.currentIndex === questions.length - 1 ? "disabled" : ""}>Nästa</button>
        <button class="primary" data-action="submit-session">Avsluta och rätta</button>
      </div>
    </section>
  `;
}

function renderLastResult(): string {
  if (!lastResult) {
    return "";
  }

  const sectionLines =
    lastResult.sectionResults.length === 0
      ? ""
      : `
        <p><strong>Sektionsrapport:</strong></p>
        <ul class="list-clean">
          ${lastResult.sectionResults
            .map(
              (section) =>
                `<li>${section.title}: ${section.correct}/${section.total} (${section.scorePercent}%) • Vikt ${Math.round(section.weight * 100)}%</li>`
            )
            .join("")}
        </ul>
      `;
  const reviewLines =
    lastResult.questionReviews.length === 0
      ? ""
      : `
        <p><strong>Frågegenomgång (alltid synlig):</strong></p>
        <div class="review-list">
          ${lastResult.questionReviews
            .map(
              (review, index) => `
                <details class="review-item ${review.isCorrect ? "is-correct" : "is-wrong"}">
                  <summary>
                    <span class="review-status">${review.isCorrect ? "Rätt" : "Fel"}</span>
                    <span>Fråga ${index + 1}: ${review.topic}</span>
                  </summary>
                  <p><strong>Spår:</strong> ${getTrackName(review.trackId)} • ${review.difficulty} • ${review.sourceTier}</p>
                  <p><strong>Fråga:</strong> ${review.prompt}</p>
                  <p><strong>Ditt svar:</strong> ${formatReviewUserAnswer(review)}</p>
                  <p><strong>Facit:</strong> ${review.expectedAnswer}</p>
                  <p><strong>Förklaring:</strong> ${review.explanation}</p>
                </details>
              `
            )
            .join("")}
        </div>
      `;

  return `
    <section class="card">
      <h3 class="success">Senaste resultat: ${lastResult.scorePercent}%</h3>
      <p>${lastResult.mode} • ${lastResult.correct}/${lastResult.total} rätt ${lastResult.autoSubmitted ? "(autosubmit vid timeout)" : ""}</p>
      ${lastResult.templateName ? `<p class="muted">Mall: ${lastResult.templateName}</p>` : ""}
      ${sectionLines}
      <p><strong>Svaga områden:</strong> ${lastResult.weakTopics.length > 0 ? lastResult.weakTopics.join(" • ") : "Inga tydliga svagheter"}</p>
      ${reviewLines}
    </section>
  `;
}

function renderPage(): string {
  switch (page) {
    case "overview":
      return renderOverview();
    case "tracks":
      return renderTracks();
    case "bank":
      return renderBank();
    case "mock":
      return renderMock();
    case "research":
      return renderResearch();
    case "logic":
      return renderLogic();
    case "walkthrough":
      return renderWalkthrough();
    case "design":
      return renderDesign();
    default:
      return renderOverview();
  }
}

function render(): void {
  const plan = createDailyPlan();
  const isSessionFocus = Boolean(activeSession);
  app.innerHTML = `
    <div class="app">
      <header class="hero">
        <div class="hero-top">
          <div>
            <h1>YH Prep Lab</h1>
            <p>Träna inför Nackademin UX, IT-H IT-säkerhet och Programmering 1/A.</p>
            <p class="muted app-build">Build: ${UI_BUILD}</p>
          </div>
          <div class="hero-actions">
            <span class="badge">${plan.sprint === "A" ? "Sprint A: Nackademin först" : "Sprint B: IT-H fokus"}</span>
            <details class="mini-menu context-menu">
              <summary>${pageLabels[page]}</summary>
              <div class="mini-menu-body">
                ${Object.entries(pageLabels)
                  .map(
                    ([key, label]) =>
                      `<button class="secondary ${page === key ? "active" : ""}" data-view="${key}">${label}</button>`
                  )
                  .join("")}
                <button class="secondary" data-action="open-python-course">Python-minikurs</button>
              </div>
            </details>
            <details class="mini-menu user-menu">
              <summary class="user-avatar" title="Byt användare">
                <span class="user-avatar-icon" aria-hidden="true">👤</span>
                <span class="user-avatar-initial">${userBadge(currentUserId)}</span>
              </summary>
              <div class="mini-menu-body">
                <p class="muted">Aktiv: ${formatUserLabel(currentUserId)}</p>
                <button class="secondary" data-action="quick-switch-user">Välj användare i lista</button>
                <button class="secondary" data-action="quick-create-user">Skapa ny användare</button>
                <button class="secondary" data-action="quick-switch-guest">Byt till gäst</button>
                <p class="muted">Tidigare användare</p>
                <div class="user-switch-grid" id="known-user-list">
                  ${knownUserIds
                    .map(
                      (userId) => `
                        <button class="secondary ${userId === currentUserId ? "active" : ""}" data-action="quick-select-user" data-user="${userId}">
                          ${formatUserLabel(userId)}
                        </button>
                      `
                    )
                    .join("")}
                </div>
                <p class="muted">Stil</p>
                <div class="user-switch-grid">
                  ${THEME_PRESETS.map(
                    (theme) => `
                      <button class="secondary ${activeTheme === theme.id ? "active" : ""}" data-action="set-theme" data-theme="${theme.id}">
                        ${theme.name}
                      </button>
                    `
                  ).join("")}
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main>
        ${renderActiveSession()}
        ${isSessionFocus ? "" : renderLastResult()}
        ${isSessionFocus ? "" : renderPage()}
      </main>
    </div>
  `;
}

app.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const viewBtn = target.closest<HTMLButtonElement>("button[data-view]");
  if (viewBtn) {
    page = viewBtn.dataset.view as Page;
    render();
    return;
  }

  const actionEl = target.closest<HTMLElement>("[data-action]");
  if (!actionEl) {
    return;
  }

  const action = actionEl.dataset.action;
  if (!action) {
    return;
  }

  if (action === "export-progress") {
    exportProgressSnapshot();
    return;
  }

  if (action === "start-today-drill") {
    const todayQuestions = getTodayDrillQuestions();
    const todayPlan = createDailyPlan();
    const preferredMinutes = Number.parseInt(studyProfile.sessionPreference, 10);
    startSession(
      "Drill",
      todayQuestions.map((question) => question.id),
      Number.isNaN(preferredMinutes) ? todayPlan.totalMinutes : Math.max(30, Math.min(45, preferredMinutes))
    );
    return;
  }

  if (action === "focus-priority-track") {
    const trackId = actionEl.dataset.track as TrackId;
    page = "bank";
    filters = { trackId, topic: "all", difficulty: "all", sourceTier: "all" };
    setStorageNotice(`${getTrackName(trackId)} vald. Starta när du vill.`);
    render();
    return;
  }

  if (action === "generate-ux-case") {
    generatedUxScenario = generateUxScenarioPrompt();
    render();
    return;
  }

  if (action === "start-logic-drill") {
    const logicQuestions = getLogicQuestions();
    startSession(
      "Drill",
      logicQuestions.slice(0, 12).map((question) => question.id),
      estimateDrillMinutes(logicQuestions)
    );
    return;
  }

  if (action === "start-walkthrough-learn") {
    const walkthroughQuestions = getWalkthroughQuestions();
    startSession(
      "Lär",
      walkthroughQuestions.map((question) => question.id),
      8
    );
    return;
  }

  if (action === "start-walkthrough-timed") {
    const template = MOCK_EXAMS.find((item) => item.id === "mock-mini-5");
    if (!template) {
      return;
    }
    const ids = template.sections.flatMap((section) => section.question_ids);
    startSession("Tidsprov", ids, template.total_minutes, template.id);
    return;
  }

  if (action === "start-track-drill") {
    const trackId = actionEl.dataset.track as TrackId;
    const qIds = QUESTIONS.filter((question) => question.track_id === trackId)
      .slice(0, 8)
      .map((question) => question.id);
    startSession("Drill", qIds, estimateDrillMinutes(QUESTIONS.filter((question) => qIds.includes(question.id))));
    return;
  }

  if (action === "start-track-learn") {
    const trackId = actionEl.dataset.track as TrackId;
    const qIds = QUESTIONS.filter((question) => question.track_id === trackId)
      .slice(0, 6)
      .map((question) => question.id);
    startSession("Lär", qIds, 20);
    return;
  }

  if (action === "open-python-course") {
    window.location.href = "python-minikurs.html";
    return;
  }

  if (action === "start-drill") {
    const filtered = filterQuestions(QUESTIONS, filters);
    startSession(
      "Drill",
      filtered.slice(0, 12).map((question) => question.id),
      estimateDrillMinutes(filtered)
    );
    return;
  }

  if (action === "start-mock") {
    const template = MOCK_EXAMS.find((item) => item.id === chosenMockId);
    if (!template) {
      return;
    }
    const ids = template.sections.flatMap((section) => section.question_ids);
    startSession("Tidsprov", ids, template.total_minutes, template.id);
    return;
  }

  if (action === "save-profile") {
    saveStudyProfile(studyProfile);
    setStorageNotice("Intervju sparad. Rekommenderad plan uppdaterad.");
    return;
  }

  if (action === "quick-switch-user") {
    const list = document.getElementById("known-user-list");
    const firstUserBtn = list?.querySelector<HTMLButtonElement>("button[data-action='quick-select-user']");
    if (firstUserBtn) {
      firstUserBtn.focus();
    }
    return;
  }

  if (action === "quick-switch-guest") {
    switchToUser(GUEST_USER_ID);
    return;
  }

  if (action === "quick-select-user") {
    const selected = actionEl.dataset.user;
    if (!selected) {
      return;
    }
    switchToUser(selected);
    return;
  }

  if (action === "quick-create-user") {
    const input = window.prompt("Skapa användar-id (a-z, 0-9, bindestreck/underscore):", "");
    if (input === null) {
      return;
    }
    const normalized = sanitizeUserId(input);
    if (!normalized || normalized === GUEST_USER_ID) {
      setStorageNotice("Användar-id saknas eller blev ogiltigt.");
      return;
    }
    const exists = knownUserIds.includes(normalized);
    switchToUser(normalized);
    setStorageNotice(exists ? `Bytte till befintlig användare: ${normalized}` : `Ny användare skapad: ${normalized}`);
    return;
  }

  if (action === "set-theme") {
    const nextTheme = actionEl.dataset.theme as ThemeId;
    if (!THEME_PRESETS.some((theme) => theme.id === nextTheme)) {
      return;
    }
    activeTheme = nextTheme;
    applyTheme(activeTheme);
    render();
    return;
  }

  if (!activeSession) {
    return;
  }

  if (action === "prev-q") {
    activeSession.currentIndex = Math.max(0, activeSession.currentIndex - 1);
    saveActiveSession(activeSession);
    render();
    return;
  }

  if (action === "next-q") {
    activeSession.currentIndex = Math.min(activeSession.questionIds.length - 1, activeSession.currentIndex + 1);
    saveActiveSession(activeSession);
    render();
    return;
  }

  if (action === "submit-session") {
    finishSession(false);
    return;
  }

  if (action === "cancel-session") {
    cancelSession();
    return;
  }

  if (action === "answer") {
    const input = target as HTMLInputElement;
    const qid = input.dataset.qid;
    if (!qid) {
      return;
    }
    activeSession.answers[qid] = input.value;
    saveActiveSession(activeSession);
    render();
  }
});

app.addEventListener("input", (event) => {
  const target = event.target as HTMLElement;
  const profileField = target.closest<HTMLElement>("[data-profile]");
  if (profileField) {
    const key = profileField.dataset.profile as keyof StudyProfile;
    if (key) {
      if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target instanceof HTMLInputElement) {
        studyProfile = { ...studyProfile, [key]: target.value };
      }
    }
    return;
  }

  const answerArea = target.closest<HTMLTextAreaElement>("textarea[data-action='answer-text']");
  if (answerArea && activeSession) {
    const qid = answerArea.dataset.qid;
    if (qid) {
      activeSession.answers[qid] = answerArea.value;
      saveActiveSession(activeSession);
    }
    return;
  }

  const filterSelect = target.closest<HTMLSelectElement>("select[data-filter]");
  if (filterSelect) {
    const key = filterSelect.dataset.filter as keyof QuestionFilters;
    filters = { ...filters, [key]: filterSelect.value } as QuestionFilters;
    render();
    return;
  }

  const mockSelect = target.closest<HTMLSelectElement>("select[data-mock-select='true']");
  if (mockSelect) {
    chosenMockId = mockSelect.value;
    render();
  }
});

app.addEventListener("change", (event) => {
  const target = event.target as HTMLElement;
  const fileInput = target.closest<HTMLInputElement>("input[data-input='import-progress']");
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    return;
  }
  const [file] = fileInput.files;
  void importProgressSnapshot(file);
  fileInput.value = "";
});

window.addEventListener("online", () => {
  isOnline = true;
  render();
});

window.addEventListener("offline", () => {
  isOnline = false;
  render();
});

if (!ensureFreshBuild()) {
  registerServiceWorker();
  setupPullToRefresh();
  setupHeaderMenuBehavior();

  if (activeSession && Date.now() >= activeSession.endsAt) {
    finishSession(true);
  } else {
    startTimer();
    render();
  }
}
