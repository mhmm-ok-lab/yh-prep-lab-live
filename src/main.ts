import "./styles.css";
import { GLOSSARY, LS_ITEMS, MOCK_EXAMS, QUESTIONS, RESEARCH_EVIDENCE, TRACKS, VR_ITEMS } from "./data";
import { createDailyPlan, formatFirstExamDate, getNextMockExam } from "./planner";
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
import type { GlossaryEntry, LSItem, LSTrap, Mode, Question, QuestionFilters, SessionDraft, StudySession, TrackId, VRAnswer, VRItem } from "./types";

type Page = "overview" | "tracks" | "bank" | "mock" | "research" | "logic" | "walkthrough" | "glossary";
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
  /** Antal fel i sektionen */
  missed?: number;
  /** Rekommenderade extra träningsfråge-ID:n baserat på antal fel */
  extraPracticeIds?: string[];
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
  scoringCriteria?: string[];
  strongAnswerExample?: string;
  commonMistakes?: string;
}

interface VRSession {
  items: VRItem[];
  currentIndex: number;
  userAnswer: VRAnswer | null;
  showFeedback: boolean;
  correct: number;
  wrong: number;
  trapCounts: Partial<Record<string, number>>;
}

interface LSSession {
  items: LSItem[];
  currentIndex: number;
  userAnswer: string | null;
  showFeedback: boolean;
  correct: number;
  wrong: number;
  trapCounts: Partial<Record<LSTrap, number>>;
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

interface RecentEntry {
  label: string;
  icon: string;
  action: string;
  dataView?: string;
}

const appRoot = document.querySelector<HTMLDivElement>("#app");
if (!appRoot) {
  throw new Error("App container saknas");
}
const app: HTMLDivElement = appRoot;

const pageLabels: Record<Page, string> = {
  overview: "Hem",
  tracks: "Träna",
  bank: "Frågebank",
  mock: "Prov",
  research: "Research",
  logic: "Logik",
  walkthrough: "Genomgång",
  glossary: "Ordlista"
};


const RECENT_VIEWS_KEY = "yh.recent-views";

function loadRecentViews(): RecentEntry[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_VIEWS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function pushRecentView(entry: RecentEntry): void {
  const views = loadRecentViews().filter(v => v.label !== entry.label);
  views.unshift(entry);
  localStorage.setItem(RECENT_VIEWS_KEY, JSON.stringify(views.slice(0, 3)));
}

const urlParams = new URLSearchParams(window.location.search);
const THEME_KEY = "yh.ui-theme";
const UI_BUILD = "2026-04-04-0245";
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
let activeGlossaryTerm: GlossaryEntry | null = null;
let vrSession: VRSession | null = null;
let lsSession: LSSession | null = null;
let navOpen = false;
let glossaryFilter: "all" | "general" | "python" | "network" | "ux" = "all";
let glossarySearch = "";
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
let _isOnline = navigator.onLine;
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
    { id: "nack", label: "Nackademin UX" },
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

/** Mappar aptitudprovets sektion-topics till extra träningsfrågor (nack-b + nack-c serien).
 *  Poolen blandas så att man får variation varje gång. */
const APTITUDE_EXTRA_QUESTIONS: Record<string, string[]> = {
  "Aptitud: Induktiv logik":        ["nack-b1", "nack-c1", "nack-b2", "nack-c2", "nack-b3", "nack-c3", "nack-c4", "nack-c5"],
  "Aptitud: Deduktiv logik":        ["nack-b4", "nack-c6", "nack-b5", "nack-c7", "nack-b6", "nack-c8", "nack-c9"],
  "Aptitud: Verbal förmåga":        ["nack-b7", "nack-c10", "nack-b8", "nack-c11", "nack-b9", "nack-c12", "nack-c13"],
  "Aptitud: Svensk språkfärdighet": ["nack-b10", "nack-c14", "nack-b11", "nack-c15", "nack-b12", "nack-c16", "nack-c17"]
};

/** Hur många extra frågor rekommenderas baserat på antal fel */
function extraPracticeCount(missed: number): number {
  if (missed >= 3) return 3;
  if (missed === 2) return 2;
  if (missed === 1) return 1;
  return 0;
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
    const sectionIdSet = new Set(section.question_pool ?? section.question_ids);
    const sectionQuestions = questions.filter((question) => sectionIdSet.has(question.id));
    const sectionScored = scoreAnswers(sectionQuestions, answers);
    const missed = sectionScored.total - sectionScored.correct;

    // Bygg lista med rekommenderade extra frågor om sektionen är aptitud-typ
    // Blandas slumpmässigt för variation varje gång
    const extraPool = section.topics
      .flatMap((topic) => APTITUDE_EXTRA_QUESTIONS[topic] ?? []);
    const shuffled = [...extraPool].sort(() => Math.random() - 0.5);
    const count = extraPracticeCount(missed);
    const extraPracticeIds = shuffled.slice(0, count);

    return {
      title: section.title,
      scorePercent: sectionScored.scorePercent,
      correct: sectionScored.correct,
      total: sectionScored.total,
      weight: section.weight,
      missed,
      extraPracticeIds: extraPracticeIds.length > 0 ? extraPracticeIds : undefined
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
  const topTrackBySession = sortedByDate
    .map((session) => {
      const top = Object.entries(session.track_mix).sort((a, b) => b[1] - a[1])[0];
      if (!top) {
        return null;
      }
      const [trackId, mix] = top;
      return mix >= 50 ? (trackId as TrackId) : null;
    })
    .filter((trackId): trackId is TrackId => Boolean(trackId));

  let recentSameTrackStreak = 0;
  let streakTrack: TrackId | null = null;
  for (const trackId of topTrackBySession) {
    if (!streakTrack) {
      streakTrack = trackId;
      recentSameTrackStreak = 1;
      continue;
    }
    if (trackId === streakTrack) {
      recentSameTrackStreak += 1;
      continue;
    }
    break;
  }

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

  const minMinutes = Math.min(...TRACKS.map((track) => stats[track.id].minutes));

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
    if (info.minutes <= minMinutes + 10) {
      score += 0.35;
    }
    score += info.weakHits * 0.75;
    score -= info.recentHeavy * 1.1;
    if (streakTrack && recentSameTrackStreak >= 2 && track.id === streakTrack) {
      score -= 1.2;
    }
    if (info.avgScore > 75 && info.minutes > 80) {
      score -= 0.6;
    }
    info.score = score;
  }

  const scoreRanking = Object.entries(stats).sort((a, b) => b[1].score - a[1].score);
  let chosenTrack = (scoreRanking[0]?.[0] as TrackId) || targetTrack;
  const secondTrack = scoreRanking[1]?.[0] as TrackId | undefined;
  const scoreGap = (scoreRanking[0]?.[1].score || 0) - (scoreRanking[1]?.[1].score || 0);
  if (streakTrack && recentSameTrackStreak >= 3 && chosenTrack === streakTrack && secondTrack && scoreGap <= 0.85) {
    chosenTrack = secondTrack;
  }
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

  const reasonParts: string[] = [];
  if (chosenTrack === targetTrack) {
    reasonParts.push("matchar ditt primära mål");
  }
  if (stats[chosenTrack].weakHits > 0) {
    reasonParts.push(`${stats[chosenTrack].weakHits} svaghetsträffar`);
  }
  if (stats[chosenTrack].minutes < 20) {
    reasonParts.push("låg träningstid hittills");
  }
  if (streakTrack && recentSameTrackStreak >= 2 && chosenTrack !== streakTrack) {
    reasonParts.push(`rotation efter ${recentSameTrackStreak} pass i ${getTrackName(streakTrack)}`);
  }
  if (reasonParts.length === 0) {
    reasonParts.push("balanserad progression");
  }

  const reason = `${getTrackName(chosenTrack)} prioriteras nu: ${reasonParts.join(" • ")}.`;

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

  // Skip SW in dev — prevents stale CSS cache in Vite dev server
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    navigator.serviceWorker.getRegistrations().then(regs => Promise.all(regs.map(r => r.unregister())));
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
      isCorrect: isAnswerCorrect(question, userAnswer),
      scoringCriteria: question.scoring_criteria,
      strongAnswerExample: question.strong_answer_example,
      commonMistakes: question.common_mistakes
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

function calcStreakDays(sessions: StudySession[]): number {
  if (sessions.length === 0) return 0;
  const uniqueDates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  let streak = 0;
  let cursor = today;
  for (const d of uniqueDates) {
    if (d === cursor) {
      streak++;
      const prev = new Date(cursor);
      prev.setDate(prev.getDate() - 1);
      cursor = prev.toISOString().slice(0, 10);
    } else if (d < cursor) {
      break;
    }
  }
  return streak;
}

function calcAvgScore(sessions: StudySession[]): number {
  const scored = sessions.filter((s) => typeof s.score === "number" && s.score >= 0);
  if (scored.length === 0) return 0;
  return Math.round(scored.reduce((sum, s) => sum + s.score, 0) / scored.length);
}

function renderOverview(): string {
  const sessions = loadStudySessions();
  const progress = buildTrackProgress(sessions);
  const firstExamDateLabel = formatFirstExamDate();
  const priorityTrack = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const priorityTrackName = getTrackName(priorityTrack);
  const suggestion = createAdaptiveSuggestion(sessions);
  const statuses = getTrackStatuses(sessions, suggestion);
  const rankPos = new Map<TrackId, number>(suggestion.ranking.map((trackId, index) => [trackId, index]));
  const orderedStatuses = [...statuses].sort(
    (a, b) => (rankPos.get(a.trackId) ?? 99) - (rankPos.get(b.trackId) ?? 99)
  );
  const streakDays = calcStreakDays(sessions);
  const avgScore = calcAvgScore(sessions);
  const totalMin = totalCompletedMinutes(sessions);
  const hasHistory = sessions.length > 0;
  const lastSavedSession = sessions[sessions.length - 1] ?? null;
  const lastTrackId: TrackId | null = lastSavedSession
    ? ((Object.entries(lastSavedSession.track_mix).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null) as TrackId | null)
    : null;
  const modeLabelMap: Record<string, string> = { "Lär": "Genomgång", "Drill": "Öva", "Tidsprov": "Tidsprov" };
  const lastModeLabel = lastSavedSession ? (modeLabelMap[lastSavedSession.mode] ?? lastSavedSession.mode) : "";

  return `
    <div class="grid overview-grid">

      <!-- ── STAT WIDGETS ── -->
      <div class="overview-stats-row">
        <div class="stat-widget">
          <div class="stat-widget-top">
            <span class="stat-widget-label">Streak</span>
            <span class="stat-widget-icon">🔥</span>
          </div>
          <div class="stat-widget-value">${streakDays}<span class="stat-widget-unit">dagar</span></div>
          <div class="stat-widget-bar">
            ${[...Array(7)].map((_, i) => `<div class="stat-widget-pip ${i < streakDays ? "stat-widget-pip-on" : ""}"></div>`).join("")}
          </div>
        </div>
        <div class="stat-widget">
          <div class="stat-widget-top">
            <span class="stat-widget-label">Snittpoäng</span>
            <span class="stat-widget-icon">📈</span>
          </div>
          <div class="stat-widget-value">${avgScore > 0 ? avgScore : "—"}<span class="stat-widget-unit">${avgScore > 0 ? "%" : ""}</span></div>
          <div class="stat-widget-sub">${totalMin > 0 ? `${totalMin} min totalt` : "Inga pass ännu"}</div>
        </div>
      </div>

      <!-- ── HUVUDKORT: context-aware CTA ── -->
      ${hasHistory ? `
      <section class="card critical-card span-12">
        <p class="overview-section-label">Fortsätt där du slutade</p>
        <h2 class="overview-heading">${lastTrackId ? getTrackName(lastTrackId) : priorityTrackName} · ${lastModeLabel}</h2>
        <p class="muted overview-reason">${suggestion.reason}</p>
        <div class="overview-cta-row">
          <button class="primary overview-cta-main" data-action="start-today-drill">▶ Starta</button>
          <button class="overview-cta-secondary" data-view="mock">📋 Prov</button>
        </div>
      </section>
      ` : `
      <section class="card span-12 overview-welcome">
        <p class="overview-section-label">Välkommen</p>
        <h2 class="overview-heading">Välj vad du vill börja med</h2>
        <p class="muted overview-reason">Öppna menyn och välj en kurs eller träning att starta.</p>
        <div class="overview-cta-row">
          <button class="primary overview-cta-main" data-action="toggle-nav">Öppna träningsmenyn →</button>
        </div>
      </section>
      `}

      <!-- ── PROGRESSION ── -->
      <section class="card span-12">
        <h3 class="section-label">Din progression</h3>
        <div class="progress-grid">
          <div class="progress-row">
            <span class="track-pill track-nackademin_ux">UX</span>
            <div class="progress"><div style="width:${progress.nackademin_ux}%"></div></div>
            <span class="progress-pct">${progress.nackademin_ux}%</span>
          </div>
          <div class="progress-row">
            <span class="track-pill track-iths_itsec">IT-H</span>
            <div class="progress"><div style="width:${progress.iths_itsec}%"></div></div>
            <span class="progress-pct">${progress.iths_itsec}%</span>
          </div>
          <div class="progress-row">
            <span class="track-pill track-prog1a">Prog</span>
            <div class="progress"><div style="width:${progress.prog1a}%"></div></div>
            <span class="progress-pct">${progress.prog1a}%</span>
          </div>
        </div>
        <p class="muted text-xs" style="margin-top:0.5rem">${sessions.length} pass genomförda · ${totalCompletedMinutes(sessions)} min totalt</p>
      </section>

      <!-- ── PRIORITERING ── -->
      <section class="card span-12">
        <h3 class="section-label">Vilket spår härnäst?</h3>
        <div class="priority-strip">
          ${orderedStatuses
            .map(
              (status) => `
                <button class="track-priority-btn ${stageButtonClass(status.stage)} ${status.priority ? "is-recommended" : ""}"
                  data-action="focus-priority-track" data-track="${status.trackId}">
                  <strong>${status.priority ? "★ " : ""}${getTrackName(status.trackId)}</strong>
                  <span>${stageLabel(status.stage)} · ${status.avgScore}% snitt · ${status.minutes} min</span>
                </button>
              `
            )
            .join("")}
        </div>
      </section>

      <!-- ── INSTÄLLNINGAR (kollapsad) ── -->
      <section class="card span-12">
        <details>
          <summary>⚙️ Mina inställningar</summary>
          <div class="inline-controls" style="margin-top:0.75rem">
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
            <label for="profile-notes">Övrigt att ta hänsyn till</label>
            <textarea id="profile-notes" data-profile="notes" rows="2" placeholder="Valfritt">${studyProfile.notes}</textarea>
            <button class="primary" data-action="save-profile">Spara</button>
          </div>
          <p class="muted" style="margin-top:0.5rem">
            Provdatum: ${firstExamDateLabel} ·
            <button class="secondary" data-action="export-progress" style="display:inline;padding:0.2rem 0.5rem;font-size:0.8rem">Exportera backup</button>
            <input type="file" accept="application/json" data-input="import-progress" />
          </p>
          ${storageNotice ? `<p class="success">${storageNotice}</p>` : ""}
        </details>
      </section>

    </div>
  `;
}

function renderVRSession(): string {
  if (!vrSession) return "";
  const { items, currentIndex, userAnswer, showFeedback, correct, wrong, trapCounts } = vrSession;
  const total = items.length;
  const isDone = currentIndex >= total;

  if (isDone) {
    const scorePercent = Math.round((correct / total) * 100);
    const trapEntries = Object.entries(trapCounts).filter(([, v]) => (v ?? 0) > 0);
    return `
      <div class="vr-session">
        <div class="vr-results-header">
          <h2>Verbal Reasoning — klart</h2>
          <div class="vr-score-big">${correct}/${total} <span>rätt (${scorePercent}%)</span></div>
          <div class="vr-results-bar"><div class="vr-results-bar-fill" style="width:${scorePercent}%"></div></div>
        </div>
        ${trapEntries.length > 0 ? `
          <div class="vr-trap-summary">
            <h3>Fällor du landade i</h3>
            <ul>
              ${trapEntries.map(([trap, count]) => `<li><strong>${trap}</strong> ×${count}</li>`).join("")}
            </ul>
          </div>
        ` : `<p class="vr-clean">Inga fällor! Du läste texten exakt som den var skriven.</p>`}
        <div class="vr-result-actions">
          <button class="primary" data-action="vr-restart">Kör igen</button>
          <button class="secondary" data-action="vr-close">Tillbaka till Träna</button>
        </div>
      </div>
    `;
  }

  const item = items[currentIndex];
  const progressPct = Math.round((currentIndex / total) * 100);
  const isCorrect = userAnswer === item.answer;

  const answerLabels: VRAnswer[] = ["Sant", "Falskt", "Kan ej avgöras"];
  const answerIcons: Record<VRAnswer, string> = {
    "Sant": "✓",
    "Falskt": "✗",
    "Kan ej avgöras": "?"
  };

  return `
    <div class="vr-session">
      <div class="vr-header">
        <span class="vr-title">Verbal Reasoning</span>
        <span class="vr-progress-label">${currentIndex + 1} / ${total}</span>
      </div>
      <div class="vr-progressbar"><div class="vr-progressbar-fill" style="width:${progressPct}%"></div></div>

      <div class="vr-passage ${showFeedback ? "vr-passage-answered" : ""}">
        <div class="vr-passage-label">TEXT</div>
        <p class="vr-passage-text">${item.passage}</p>
        ${showFeedback && item.relevant_sentence && !item.relevant_sentence.startsWith("—") ? `
          <div class="vr-relevant-wrap">
            <span class="vr-relevant-label">📌 Avgörande mening</span>
            <blockquote class="vr-relevant">${item.relevant_sentence}</blockquote>
          </div>
        ` : ""}
      </div>

      <div class="vr-statement-wrap">
        <div class="vr-statement-label">PÅSTÅENDE</div>
        <p class="vr-statement">${item.statement}</p>
      </div>

      ${!showFeedback ? `
        <div class="vr-answer-btns">
          ${answerLabels.map(a => `
            <button class="vr-answer-btn" data-action="vr-answer" data-answer="${a}">
              <span class="vr-answer-icon">${answerIcons[a]}</span>
              ${a}
            </button>
          `).join("")}
        </div>
      ` : `
        <div class="vr-feedback ${isCorrect ? "vr-feedback-correct" : "vr-feedback-wrong"}">
          <div class="vr-feedback-verdict">
            ${isCorrect
              ? `<span class="vr-verdict-icon">✅</span> Rätt! Svaret är <strong>${item.answer}</strong>.`
              : `<span class="vr-verdict-icon">❌</span> Du valde <strong>${userAnswer}</strong> — rätt svar är <strong>${item.answer}</strong>.`
            }
          </div>
          ${!isCorrect && item.trap ? `
            <div class="vr-trap-badge">🎯 Fällan: ${item.trap}</div>
          ` : ""}
          <p class="vr-explanation">${item.explanation}</p>
          ${item.relevant_sentence.startsWith("—") ? `<p class="vr-no-sentence">Texten innehåller ingen mening som bekräftar påståendet — det är precis poängen.</p>` : ""}
        </div>
        <div class="vr-next-row">
          <span class="vr-running-score">✓ ${correct}  ✗ ${wrong}</span>
          <button class="primary" data-action="vr-next">
            ${currentIndex + 1 < total ? "Nästa →" : "Visa resultat →"}
          </button>
        </div>
      `}

      <button class="vr-quit-btn secondary" data-action="vr-close">Avsluta</button>
    </div>
  `;
}

function renderNavDropdown(): string {
  const activeTrainer = lsSession ? "ls" : vrSession ? "vr" : null;
  const activePage = page;

  const navItem = (icon: string, label: string, action: string, dataAttr: string, isActive = false) => `
    <button class="app-nav-item ${isActive ? "app-nav-item-active" : ""}" data-action="${action}" ${dataAttr}>
      <span class="app-nav-item-icon">${icon}</span>
      <span>${label}</span>
    </button>
  `;

  return `
    <div class="app-nav-overlay" data-action="toggle-nav"></div>
    <div class="app-nav-menu">

      <p class="app-nav-section">Senaste</p>
      ${(() => {
        const recent = loadRecentViews();
        if (recent.length === 0) return `<p class="app-nav-empty">Ingen historik ännu</p>`;
        return recent.map(v =>
          navItem(v.icon, v.label, v.action, v.dataView ? `data-view="${v.dataView}"` : "")
        ).join("");
      })()}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Dagligt</p>
      ${navItem("🏠", "Hem", "nav-goto", 'data-view="overview"', activePage === "overview" && !activeTrainer)}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Kursinnehåll</p>
      ${navItem("💻", "Programmering 1", "nav-goto", 'data-view="tracks"', activePage === "tracks")}
      ${navItem("🎨", "UX-design", "nav-goto", 'data-view="tracks"', false)}
      ${navItem("🔒", "IT-säkerhet", "nav-goto", 'data-view="tracks"', false)}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Antagningsprov</p>
      ${navItem("📄", "Verbal Reasoning", "nav-start-vr", "", activeTrainer === "vr")}
      ${navItem("🇸🇪", "Språkliga färdigheter", "nav-start-ls", "", activeTrainer === "ls")}
      <a class="app-nav-item app-nav-link" href="./symbol-sudoku.html" target="_blank">
        <span class="app-nav-item-icon">△</span>
        <span>Symbol Sudoku</span>
      </a>
      ${navItem("🧩", "Logik", "nav-goto", 'data-view="logic"', activePage === "logic")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Prov & Test</p>
      ${navItem("📋", "Fullständiga prov", "nav-goto", 'data-view="mock"', activePage === "mock")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Referens</p>
      ${navItem("📚", "Frågebank", "nav-goto", 'data-view="bank"', activePage === "bank")}
      ${navItem("📖", "Ordlista", "nav-goto", 'data-view="glossary"', activePage === "glossary")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Konto</p>
      ${navItem("⚙️", "Profil / Inställningar", "open-profile", "", false)}

    </div>
  `;
}

function renderAppNav(): string {
  const contextLabel = lsSession
    ? "Språkliga färdigheter"
    : vrSession
    ? "Verbal Reasoning"
    : pageLabels[page];

  const activeTrainer = lsSession ? "ls" : vrSession ? "vr" : null;
  const navPageClass = activeTrainer ? "nav-page--train" : `nav-page--${page}`;

  const userInitial = userBadge(currentUserId);

  return `
    <nav class="app-nav">
      <button class="app-nav-home" data-action="nav-home" title="Hem">🧠</button>
      <button class="app-nav-ctx ${navPageClass}" data-action="toggle-nav">
        <span class="app-nav-ctx-label">${contextLabel}</span>
        <span class="app-nav-ctx-dot">${navOpen ? "▴" : "▾"}</span>
      </button>
      ${navOpen ? renderNavDropdown() : ""}
      <details class="app-nav-user-menu mini-menu">
        <summary class="app-nav-user" title="Konto">
          <span class="app-nav-user-initial">${userInitial}</span>
        </summary>
        <div class="mini-menu-body app-nav-user-body">
          <p class="muted">Aktiv: ${formatUserLabel(currentUserId)}${_isOnline ? "" : " · Offline"}</p>
          <button class="secondary" data-action="quick-switch-user">Välj användare</button>
          <button class="secondary" data-action="quick-create-user">Ny användare</button>
          <button class="secondary" data-action="quick-switch-guest">Byt till gäst</button>
          <p class="muted">Tidigare</p>
          <div class="user-switch-grid" id="known-user-list">
            ${knownUserIds
              .map(
                (userId) => `
                  <button class="secondary ${userId === currentUserId ? "active" : ""}"
                    data-action="quick-select-user" data-user="${userId}">
                    ${formatUserLabel(userId)}
                  </button>`
              )
              .join("")}
          </div>
          <p class="muted">Stil</p>
          <div class="user-switch-grid">
            ${THEME_PRESETS.map(
              (theme) => `
                <button class="secondary ${activeTheme === theme.id ? "active" : ""}"
                  data-action="set-theme" data-theme="${theme.id}">
                  ${theme.name}
                </button>`
            ).join("")}
          </div>
        </div>
      </details>
    </nav>
  `;
}

function renderLSSession(): string {
  if (!lsSession) return "";
  const { items, currentIndex, userAnswer, showFeedback, correct, wrong, trapCounts } = lsSession;
  const total = items.length;
  const isDone = currentIndex >= total;

  if (isDone) {
    const scorePercent = Math.round((correct / total) * 100);
    const trapEntries = Object.entries(trapCounts).filter(([, v]) => (v ?? 0) > 0);
    return `
      <div class="ls-session">
        <div class="ls-results-header">
          <h2>Språkliga färdigheter — klart</h2>
          <div class="ls-score-big">${correct}/${total} <span>rätt (${scorePercent}%)</span></div>
          <div class="ls-results-bar"><div class="ls-results-bar-fill" style="width:${scorePercent}%"></div></div>
        </div>
        ${trapEntries.length > 0 ? `
          <div class="ls-trap-summary">
            <h3>Fällor du landade i</h3>
            <ul>
              ${trapEntries.map(([trap, count]) => `<li><strong>${trap}</strong> ×${count}</li>`).join("")}
            </ul>
          </div>
        ` : `<p class="ls-clean">Inga fällor! Rent genomfört.</p>`}
        <div class="ls-result-actions">
          <button class="primary" data-action="ls-restart">Kör igen</button>
          <button class="secondary" data-action="ls-close">Tillbaka till Träna</button>
        </div>
      </div>
    `;
  }

  const item = items[currentIndex];
  const progressPct = Math.round((currentIndex / total) * 100);
  const isCorrect = userAnswer === item.answer;

  const typeLabels: Record<string, string> = {
    komplettering: "Meningskomplettering",
    ordforrad: "Ordförråd",
    stavning: "Stavning"
  };

  return `
    <div class="ls-session">
      <div class="ls-header">
        <span class="ls-title">Språkliga färdigheter</span>
        <span class="ls-progress-label">${currentIndex + 1} / ${total}</span>
      </div>
      <div class="ls-progressbar"><div class="ls-progressbar-fill" style="width:${progressPct}%"></div></div>

      <div class="ls-type-badge">${typeLabels[item.type] ?? item.type}</div>

      <div class="ls-prompt-wrap">
        <p class="ls-prompt">${item.prompt.replace("[___]", '<span class="ls-gap">___</span>')}</p>
      </div>

      ${!showFeedback ? `
        <div class="ls-answer-btns">
          ${item.options.map((opt, i) => `
            <button class="ls-answer-btn" data-action="ls-answer" data-answer="${opt}">
              <span class="ls-answer-letter">${String.fromCharCode(65 + i)}</span>
              ${opt}
            </button>
          `).join("")}
        </div>
      ` : `
        <div class="ls-answer-display">
          ${item.options.map((opt, i) => `
            <div class="ls-answer-result ${opt === item.answer ? "ls-answer-correct" : opt === userAnswer ? "ls-answer-wrong" : "ls-answer-neutral"}">
              <span class="ls-answer-letter">${String.fromCharCode(65 + i)}</span>
              ${opt}
              ${opt === item.answer ? ' <span class="ls-check">✓</span>' : ""}
              ${opt === userAnswer && opt !== item.answer ? ' <span class="ls-cross">✗</span>' : ""}
            </div>
          `).join("")}
        </div>
        <div class="ls-feedback ${isCorrect ? "ls-feedback-correct" : "ls-feedback-wrong"}">
          <div class="ls-feedback-verdict">
            ${isCorrect
              ? `<span class="ls-verdict-icon">✅</span> Rätt! Svaret är <strong>${item.answer}</strong>.`
              : `<span class="ls-verdict-icon">❌</span> Du valde <strong>${userAnswer}</strong> — rätt svar är <strong>${item.answer}</strong>.`
            }
          </div>
          ${!isCorrect && item.trap ? `
            <div class="ls-trap-badge">🎯 Fällan: ${item.trap}</div>
          ` : ""}
          <p class="ls-explanation">${item.explanation}</p>
        </div>
        <div class="ls-next-row">
          <span class="ls-running-score">✓ ${correct}  ✗ ${wrong}</span>
          <button class="primary" data-action="ls-next">
            ${currentIndex + 1 < total ? "Nästa →" : "Visa resultat →"}
          </button>
        </div>
      `}

      <button class="ls-quit-btn secondary" data-action="ls-close">Avsluta</button>
    </div>
  `;
}

function renderTracks(): string {
  if (lsSession) return renderLSSession();
  if (vrSession) return renderVRSession();
  const logicQuestions = getLogicQuestions();

  return `
    <div class="tracks-layout">

      <!-- ── AON-TRÄNING ── -->
      <p class="tracks-section-label">Aon-träning</p>

      <div class="aon-bento">

        <!-- Verbal Reasoning — stor feature card -->
        <div class="bento-card bento-card-feature">
          <div class="bento-card-meta">
            <span class="bento-tag">Verbal Reasoning</span>
            <span class="bento-pool">${VR_ITEMS.length} frågor</span>
          </div>
          <p class="bento-desc">Sant / Falskt / Kan ej avgöras utifrån texten. Tränar Verklighetsknappen, Kvantifikatorfällan och Implikationsfällan.</p>
          <button class="primary bento-cta" data-action="start-vr-trainer">Starta</button>
        </div>

        <!-- Språkliga + Symbol Sudoku — 2-kol -->
        <div class="bento-card bento-card-half">
          <span class="bento-icon">🇸🇪</span>
          <div class="bento-card-meta">
            <span class="bento-tag">Scales LT-SE</span>
          </div>
          <p class="bento-name">Språkliga färdigheter</p>
          <button class="primary bento-cta-sm" data-action="start-ls-trainer">Starta</button>
        </div>

        <div class="bento-card bento-card-half bento-card-sudoku">
          <span class="bento-icon">△</span>
          <div class="bento-card-meta">
            <span class="bento-tag">Deductive Logic</span>
          </div>
          <p class="bento-name">Symbol Sudoku</p>
          <a class="primary bento-cta-sm" href="./symbol-sudoku.html" target="_blank">Öppna</a>
        </div>

      </div>

      <!-- ── KURSTRÄNING ── -->
      <p class="tracks-section-label">Kursträning</p>

      <div class="tracks-subject-list">
        ${TRACKS.map((track) => `
          <div class="subject-card">
            <div class="subject-card-info">
              <p class="subject-card-name">${track.name}</p>
              <p class="subject-card-exam">${track.goal_exam}</p>
            </div>
            <div class="subject-card-actions">
              <button class="primary subject-btn" data-action="start-track-learn" data-track="${track.id}" title="Lär-läge">📖</button>
              <button class="secondary subject-btn" data-action="start-track-drill" data-track="${track.id}" title="Drill-läge">⚡</button>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- ── ÖVRIGT ── -->
      <p class="tracks-section-label">Övrigt</p>

      <div class="bento-card bento-card-flat">
        <div class="bento-flat-row">
          <div>
            <p class="bento-name">Logik &amp; resonemang</p>
            <p class="bento-desc-sm">Logiskt tänkande — relevant för Nackademin och IT-H.</p>
          </div>
          <button class="primary bento-cta-sm" data-action="start-logic-drill">${estimateDrillMinutes(logicQuestions)} min</button>
        </div>
      </div>

      <div class="bento-card bento-card-flat">
        <details>
          <summary class="bento-name">UX scenario-generator</summary>
          <p class="bento-desc-sm" style="margin-top:0.5rem">${generatedUxScenario}</p>
          <p class="bento-desc-sm">Workflow: 1) Målgruppsanalys → 2) Enkel wireframe-idé → 3) Motivering.</p>
          <button class="secondary" style="margin-top:0.5rem" data-action="generate-ux-case">Generera nytt case</button>
        </details>
      </div>

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

          <button class="primary" data-action="start-drill">Starta Drill</button>
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
  const questionCount = template.sections.reduce(
    (sum, section) => sum + (section.questions_count ?? section.question_ids.length),
    0
  );

  // Gruppera prov per skola/kategori baserat på track_id
  const grouped: Record<string, typeof MOCK_EXAMS> = {};
  for (const exam of MOCK_EXAMS) {
    const key = getTrackName(exam.track_id);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(exam);
  }

  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Välj ett prov</h3>
        <p class="muted">Välj nedan och tryck Starta. Klockan tickar — precis som på riktigt.</p>
        <div class="inline-controls">
          <select data-mock-select="true">
            ${Object.entries(grouped).map(([groupName, exams]) => `
              <optgroup label="${groupName}">
                ${exams.map((item) => `<option value="${item.id}" ${item.id === template.id ? "selected" : ""}>${item.name}</option>`).join("")}
              </optgroup>
            `).join("")}
          </select>
          <button class="primary btn-lg" data-action="start-mock">▶ Starta ${template.total_minutes} min</button>
        </div>
      </section>

      <section class="card span-12">
        <h3>${template.name}</h3>
        <p class="muted">${questionCount} frågor · ${template.total_minutes} min · ${template.scoring_rules}</p>
        <div class="mock-sections-grid">
          ${template.sections
            .map(
              (section) => `
                <div class="mock-section-item">
                  <strong>${section.title}</strong>
                  <span class="muted">${section.minutes} min · ${Math.round(section.weight * 100)}% av betyget</span>
                  <span class="muted">${section.question_pool
                    ? `🎲 ${section.questions_count} av ${section.question_pool.length} frågor slumpas`
                    : `${section.question_ids.length} frågor`}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
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
          <button class="primary" data-action="start-logic-drill">Starta Drill</button>
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
        <h3>Hur funkar appen? En snabb genomgång</h3>
        <p>Du har tre spår att träna inför:</p>
        <ul class="list-clean">
          <li>🎨 <strong>Nackademin UX</strong> — UX-design och användarfokus</li>
          <li>🔒 <strong>IT-H IT-säkerhet</strong> — nätverk, säkerhet och teknik</li>
          <li>💻 <strong>Programmering 1/A</strong> — Python-grunder</li>
        </ul>
        <p>Navigera med menyn uppe till höger. Du kan alltid byta sida — ett pågående test sparas och visas längst upp.</p>
      </section>

      <section class="card span-6">
        <h3>🧠 Lär-läget</h3>
        <p>Du svarar på en fråga. Direkt efteråt visas förklaring och vad som var rätt. Inget tidspress — perfekt för att faktiskt förstå.</p>
        <div class="inline-controls">
          <button class="primary" data-action="start-walkthrough-learn">
            Starta lärtest (8 frågor)
          </button>
        </div>
        <p class="muted">${walkthroughQuestions.length} frågor från UX, IT-H och programmering. Förklaring visas efter varje svar.</p>
      </section>

      <section class="card span-6">
        <h3>⏱ Tidsprov-läget</h3>
        <p>Klockan tickar. Du svarar på alla frågor och får ett samlat resultat på slutet — precis som ett riktigt antagningsprov.</p>
        <div class="inline-controls">
          <button class="secondary" data-action="start-walkthrough-timed">
            Starta snabbprov (5 min)
          </button>
        </div>
        <p class="muted">Mini-check med 5 frågor. Bra för att vänja sig vid tidspressformat.</p>
      </section>

      <section class="card span-12">
        <h3>📋 De andra sidorna</h3>
        <ul class="list-clean">
          <li><strong>Frågebank</strong> — bläddra och filtrera alla frågor. Bra för att se vad som finns.</li>
          <li><strong>Prov</strong> — välj ett av de färdiga proven (5 min till 90 min) och kör.</li>
          <li><strong>Spår</strong> — snabbstart per ämne, plus daglig studieplan.</li>
          <li><strong>Research</strong> — källmaterial bakom frågorna.</li>
        </ul>
      </section>
    </div>
  `;
}


// ── Glossary helpers ────────────────────────────────────────────────

function renderGlossaryTerms(text: string): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, (_match, key: string) => {
    const entry = GLOSSARY.find((g) => g.term === key);
    const display = entry ? entry.term : key;
    return `<span class="g-term" data-term="${key}" tabindex="0">${display}</span>`;
  });
}

function renderGlossaryOverlay(entry: GlossaryEntry): string {
  return `
    <div class="glossary-overlay" data-action="close-glossary">
      <div class="glossary-card" role="dialog" aria-modal="true" aria-label="Ordlista: ${entry.term}">
        <button class="glossary-close" data-action="close-glossary" aria-label="Stäng">×</button>
        <p class="glossary-term-title">${entry.term}</p>
        <div class="glossary-langs">
          <div class="glossary-lang">
            <span class="glossary-lang-label">SV</span>
            <p>${entry.sv}</p>
          </div>
          <div class="glossary-lang">
            <span class="glossary-lang-label">EN</span>
            <p>${entry.en}</p>
          </div>
        </div>
        <div class="glossary-story">
          <span class="glossary-story-label">🍳 I köket:</span>
          <p>${entry.story}</p>
        </div>
        ${entry.related
          ? `<p class="glossary-related">Se även: ${entry.related
              .map((r) => `<span class="g-term" data-term="${r}" tabindex="0">${r}</span>`)
              .join(", ")}</p>`
          : ""}
      </div>
    </div>
  `;
}

function renderGlossary(): string {
  const categoryLabels: Record<string, string> = {
    all: "Alla",
    general: "Allmänt",
    python: "Python",
    network: "Nätverk",
    ux: "UX"
  };

  const categoryShort: Record<string, string> = {
    general: "Alm",
    python: "Py",
    network: "Nät",
    ux: "UX"
  };

  const filtered = GLOSSARY.filter((entry) => {
    const matchesCategory = glossaryFilter === "all" || entry.category === glossaryFilter;
    const searchLower = glossarySearch.toLowerCase();
    const matchesSearch =
      searchLower === "" ||
      entry.term.toLowerCase().includes(searchLower) ||
      entry.sv.toLowerCase().includes(searchLower) ||
      entry.en.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  return `
    <section class="card">
      <h2>Ordlista</h2>
      <p class="muted">Klicka på ett kort för att se förklaring och köksexempel.</p>
      <div class="glossary-filter-bar">
        ${(["all", "general", "python", "network", "ux"] as const)
          .map(
            (cat) =>
              `<button class="secondary ${glossaryFilter === cat ? "active" : ""}" data-action="glossary-filter" data-category="${cat}">${categoryLabels[cat]}</button>`
          )
          .join("")}
      </div>
      <input
        class="glossary-search"
        type="search"
        placeholder="Sök term..."
        value="${glossarySearch}"
        data-action="glossary-search"
        aria-label="Sök i ordlistan"
      />
      ${
        filtered.length === 0
          ? `<p class="muted">Inga termer matchar sökningen.</p>`
          : `<div class="glossary-page-grid">
              ${filtered
                .map(
                  (entry) => `
                    <div class="glossary-entry-card" data-action="open-glossary-term" data-term="${entry.term}" data-cat="${entry.category}" tabindex="0" role="button" aria-label="Öppna ${entry.term}">
                      <div class="glossary-entry-header">
                        <p class="glossary-entry-term">${entry.term}</p>
                        ${glossaryFilter === "all" ? `<span class="glossary-entry-cat">${categoryShort[entry.category] ?? entry.category}</span>` : ""}
                      </div>
                      <p class="glossary-entry-sv">${entry.sv}</p>
                    </div>
                  `
                )
                .join("")}
            </div>`
      }
    </section>
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
                (option) => {
                  const isSelected = answerValue === option.id;
                  const isCorrect = option.id === currentQuestion.answer_key;
                  const showResult = activeSession!.mode === "Lär" && answerValue !== "";
                  let cls = "answer-option";
                  if (isSelected) cls += " is-selected";
                  if (showResult && isCorrect) cls += " is-correct-answer";
                  if (showResult && isSelected && !isCorrect) cls += " is-wrong-answer";
                  return `
                  <label class="${cls}">
                    <input type="radio" name="answer-${currentQuestion.id}" data-action="answer" data-qid="${currentQuestion.id}" value="${option.id}" ${
                      isSelected ? "checked" : ""
                    } />
                    <span class="answer-option-key">${option.id.toUpperCase()}</span>
                    <span class="answer-option-text">${option.text}</span>
                    ${showResult && isCorrect ? '<span class="answer-correct-mark">✓ Rätt svar</span>' : ""}
                  </label>
                `;
                }
              )
              .join("")}</div>
            </fieldset>`
          : `<textarea data-action="answer-text" data-qid="${currentQuestion.id}" rows="4" placeholder="Skriv ditt svar här">${answerValue}</textarea>`
      }
      ${
        activeSession.mode === "Lär"
          ? answerValue
            ? `<div class="learn-explanation">
                <p class="learn-result-label">${
                  currentQuestion.format === "mcq" && answerValue === currentQuestion.answer_key
                    ? "✅ Rätt!"
                    : currentQuestion.format === "mcq"
                    ? `❌ Fel — rätt svar var <strong>${currentQuestion.answer_key.toUpperCase()}</strong>`
                    : "📝 Ditt svar noterat"
                }</p>
                <p class="learn-explanation-text">${renderGlossaryTerms(currentQuestion.explanation)}</p>
              </div>`
            : `<p class="learn-hint">💡 Välj ett svar ovan — förklaring visas efteråt.</p>`
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
  const sessions = loadStudySessions();
  const suggestion = createAdaptiveSuggestion(sessions);

  // Sektionsrapport med riktad träningsrekommendation om aptitudprov
  const sectionsWithExtra = lastResult.sectionResults.filter(
    (s) => s.extraPracticeIds && s.extraPracticeIds.length > 0
  );
  const hasAptitudeFeedback = sectionsWithExtra.length > 0;

  const sectionLines =
    lastResult.sectionResults.length === 0
      ? ""
      : `
        <p><strong>Sektionsrapport:</strong></p>
        <ul class="list-clean">
          ${lastResult.sectionResults
            .map((section) => {
              const missedBadge = section.missed && section.missed > 0
                ? `<span class="missed-badge">${section.missed} fel</span>`
                : `<span class="ok-badge">✓</span>`;
              return `<li>${missedBadge} ${section.title}: ${section.correct}/${section.total} (${section.scorePercent}%)</li>`;
            })
            .join("")}
        </ul>
        ${hasAptitudeFeedback ? `
        <div class="practice-report">
          <p><strong>📋 Rekommenderad träning efter detta prov:</strong></p>
          ${sectionsWithExtra.map((section) => `
            <div class="practice-section-row">
              <div class="practice-section-info">
                <span class="practice-section-title">${section.title.replace(/Del [A-D] – /, "")}</span>
                <span class="practice-section-count">${section.extraPracticeIds!.length} extra ${section.extraPracticeIds!.length === 1 ? "fråga" : "frågor"} rekommenderas</span>
              </div>
              <button class="secondary practice-btn"
                data-action="start-aptitude-drill"
                data-question-ids="${section.extraPracticeIds!.join(",")}">
                Träna nu
              </button>
            </div>
          `).join("")}
          ${sectionsWithExtra.length > 1 ? `
          <button class="primary"
            data-action="start-aptitude-drill"
            data-question-ids="${sectionsWithExtra.flatMap((s) => s.extraPracticeIds!).join(",")}">
            Träna alla svaga delar (${sectionsWithExtra.flatMap((s) => s.extraPracticeIds!).length} frågor)
          </button>` : ""}
        </div>` : `
        <p class="muted">✓ Inga svaga delar – inga extra frågor rekommenderas.</p>`}
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
                <details class="review-item ${review.format === "short" ? "is-manual" : review.isCorrect ? "is-correct" : "is-wrong"}">
                  <summary>
                    <span class="review-status">${review.format === "short" ? "Fritext" : review.isCorrect ? "Rätt" : "Fel"}</span>
                    <span>Fråga ${index + 1}: ${review.topic}</span>
                  </summary>
                  <p><strong>Spår:</strong> ${getTrackName(review.trackId)} • ${review.difficulty} • ${review.sourceTier}</p>
                  <p><strong>Fråga:</strong> ${review.prompt}</p>
                  <p><strong>Ditt svar:</strong> ${formatReviewUserAnswer(review)}</p>
                  ${review.format === "short" ? `
                  <hr>
                  <p><strong>Modellsvar (jämförelsepunkt, inte facit att memorera):</strong><br>${review.expectedAnswer}</p>
                  ${review.scoringCriteria && review.scoringCriteria.length > 0 ? `
                  <p><strong>Bedömningspunkter – vad ett starkt svar innehåller:</strong></p>
                  <ul class="scoring-list">
                    ${review.scoringCriteria.map(c => `<li>${c}</li>`).join("")}
                  </ul>` : ""}
                  ${review.strongAnswerExample ? `
                  <details class="inner-details">
                    <summary>Resonemangsexempel (starkt svar)</summary>
                    <p class="muted">${review.strongAnswerExample.replace(/\n/g, "<br>")}</p>
                  </details>` : ""}
                  ${review.commonMistakes ? `
                  <details class="inner-details">
                    <summary>Vanliga svagheter att undvika</summary>
                    <p class="muted">${review.commonMistakes}</p>
                  </details>` : ""}
                  <p class="muted"><em>Fritext bedöms mot kriterierna ovan – sätt ett eget betyg på ditt svar.</em></p>
                  ` : `
                  <p><strong>Facit:</strong> ${review.expectedAnswer}</p>
                  <p><strong>Förklaring:</strong> ${review.explanation}</p>
                  `}
                </details>
              `
            )
            .join("")}
        </div>
      `;

  return `
    <section class="card result-complete-card">
      <p class="overview-section-label">Session klar! ✓</p>
      <h3 class="overview-heading">${lastResult.scorePercent}% · ${lastResult.correct}/${lastResult.total} rätt${lastResult.autoSubmitted ? " (autosubmit)" : ""}</h3>
      ${lastResult.templateName ? `<p class="muted result-meta">Mall: ${lastResult.templateName}</p>` : ""}
      ${lastResult.weakTopics.length > 0 ? `<p class="muted result-meta">Svagt: ${lastResult.weakTopics.join(" · ")}</p>` : ""}
      <div class="overview-cta-row result-cta-row">
        <button class="primary overview-cta-main" data-action="start-next-pass">▶ Kör en till</button>
        <button class="overview-cta-secondary" data-action="nav-home">🏠 Gå till Hem</button>
      </div>
      ${sectionLines}
      <p class="muted result-meta"><strong>Nästa pass:</strong> ${getTrackName(suggestion.trackId)} · ${suggestion.mode} · ${suggestion.durationMinutes} min — ${suggestion.reason}</p>
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
    case "glossary":
      return renderGlossary();
    default:
      return renderOverview();
  }
}


function render(): void {
  const isSessionFocus = Boolean(activeSession);
  const showSessionCard = isSessionFocus;
  app.innerHTML = `
    <div class="app">
      ${renderAppNav()}

      <main>
        ${showSessionCard ? renderActiveSession() : ""}
        ${!isSessionFocus ? renderLastResult() : ""}
        ${renderPage()}
      </main>

    </div>
    ${activeGlossaryTerm ? renderGlossaryOverlay(activeGlossaryTerm) : ""}
  `;
}

app.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const viewBtn = target.closest<HTMLButtonElement>("button[data-view]");
  if (viewBtn) {
    const targetView = viewBtn.dataset.view as Page;
    if (targetView in pageLabels) {
      const pageIconMap: Record<Page, string> = {
        overview: "🏠", tracks: "💻", bank: "📚", mock: "📋",
        research: "🔬", logic: "🧩", walkthrough: "📖", glossary: "📖"
      };
      pushRecentView({ label: pageLabels[targetView], icon: pageIconMap[targetView], action: "nav-goto", dataView: targetView });
      history.replaceState(null, "", `?view=${targetView}`);
    }
    page = targetView;
    navOpen = false;
    render();
    return;
  }

  // Handle g-term glossary clicks (not action-based)
  const gTerm = target.closest<HTMLElement>(".g-term");
  if (gTerm && gTerm.dataset.term) {
    const found = GLOSSARY.find((g) => g.term === gTerm.dataset.term);
    if (found) {
      activeGlossaryTerm = found;
      render();
    }
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

  if (action === "start-next-pass") {
    const sessions = loadStudySessions();
    const suggestion = createAdaptiveSuggestion(sessions);
    if (suggestion.questionIds.length === 0) {
      setStorageNotice("Kunde inte skapa rekommenderat pass just nu.");
      return;
    }
    startSession(suggestion.mode, suggestion.questionIds, suggestion.durationMinutes);
    return;
  }

  if (action === "resume-active-session") {
    if (!activeSession) {
      setStorageNotice("Ingen aktiv session att återgå till.");
      return;
    }
    page = activeSession.templateId ? "mock" : "bank";
    render();
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
    const ids = template.sections.flatMap((section) => {
      if (section.question_pool && section.questions_count) {
        const shuffled = [...section.question_pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, section.questions_count);
      }
      return section.question_ids;
    });
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

  if (action === "close-glossary") {
    // Don't close if click was inside the card itself (only backdrop or close button)
    if (actionEl.classList.contains("glossary-overlay") && target.closest(".glossary-card")) {
      return;
    }
    activeGlossaryTerm = null;
    render();
    return;
  }

  if (action === "open-glossary-term") {
    const termKey = actionEl.dataset.term;
    if (termKey) {
      const found = GLOSSARY.find((g) => g.term === termKey);
      if (found) {
        activeGlossaryTerm = found;
        render();
      }
    }
    return;
  }

  if (action === "glossary-filter") {
    glossaryFilter = (actionEl.dataset.category as typeof glossaryFilter) || "all";
    render();
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
    const ids = template.sections.flatMap((section) => {
      if (section.question_pool && section.questions_count) {
        const shuffled = [...section.question_pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, section.questions_count);
      }
      return section.question_ids;
    });
    startSession("Tidsprov", ids, template.total_minutes, template.id);
    return;
  }

  if (action === "start-vr-trainer") {
    const shuffled = [...VR_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    vrSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    page = "tracks";
    render();
    return;
  }

  if (action === "vr-answer") {
    if (!vrSession || vrSession.showFeedback) return;
    const answer = actionEl.dataset.answer as VRAnswer;
    const item = vrSession.items[vrSession.currentIndex];
    const isCorrect = answer === item.answer;
    if (isCorrect) {
      vrSession.correct++;
    } else {
      vrSession.wrong++;
      if (item.trap) {
        vrSession.trapCounts[item.trap] = (vrSession.trapCounts[item.trap] ?? 0) + 1;
      }
    }
    vrSession.userAnswer = answer;
    vrSession.showFeedback = true;
    render();
    return;
  }

  if (action === "vr-next") {
    if (!vrSession) return;
    vrSession.currentIndex++;
    vrSession.userAnswer = null;
    vrSession.showFeedback = false;
    render();
    return;
  }

  if (action === "vr-restart") {
    const shuffled = [...VR_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    vrSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    render();
    return;
  }

  if (action === "vr-close") {
    vrSession = null;
    page = "tracks";
    render();
    return;
  }

  if (action === "start-ls-trainer") {
    const shuffled = [...LS_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    lsSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    page = "tracks";
    render();
    return;
  }

  if (action === "ls-answer") {
    if (!lsSession || lsSession.showFeedback) return;
    const answer = actionEl.dataset.answer as string;
    const item = lsSession.items[lsSession.currentIndex];
    const isCorrect = answer === item.answer;
    if (isCorrect) {
      lsSession.correct++;
    } else {
      lsSession.wrong++;
      if (item.trap) {
        lsSession.trapCounts[item.trap] = (lsSession.trapCounts[item.trap] ?? 0) + 1;
      }
    }
    lsSession.userAnswer = answer;
    lsSession.showFeedback = true;
    render();
    return;
  }

  if (action === "ls-next") {
    if (!lsSession) return;
    lsSession.currentIndex++;
    lsSession.userAnswer = null;
    lsSession.showFeedback = false;
    render();
    return;
  }

  if (action === "ls-restart") {
    const shuffled = [...LS_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    lsSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    render();
    return;
  }

  if (action === "ls-close") {
    lsSession = null;
    page = "tracks";
    render();
    return;
  }

  if (action === "nav-home") {
    page = "overview";
    navOpen = false;
    render();
    return;
  }

  if (action === "toggle-nav") {
    navOpen = !navOpen;
    render();
    return;
  }

  if (action === "open-profile") {
    navOpen = false;
    render();
    const userMenu = document.querySelector<HTMLDetailsElement>(".app-nav-user-menu");
    if (userMenu) userMenu.open = true;
    return;
  }

  if (action === "nav-goto") {
    const targetView = actionEl.dataset.view as Page;
    if (targetView) {
      const pageIconMap: Record<Page, string> = {
        overview: "🏠", tracks: "💻", bank: "📚", mock: "📋",
        research: "🔬", logic: "🧩", walkthrough: "📖", glossary: "📖"
      };
      pushRecentView({ label: pageLabels[targetView], icon: pageIconMap[targetView], action: "nav-goto", dataView: targetView });
      history.replaceState(null, "", `?view=${targetView}`);
      page = targetView;
      navOpen = false;
      render();
    }
    return;
  }

  if (action === "nav-start-vr") {
    const shuffled = [...VR_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    vrSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    pushRecentView({ label: "Verbal Reasoning", icon: "📄", action: "nav-start-vr" });
    navOpen = false;
    page = "tracks";
    render();
    return;
  }

  if (action === "nav-start-ls") {
    const shuffled = [...LS_ITEMS].sort(() => Math.random() - 0.5).slice(0, 12);
    lsSession = {
      items: shuffled,
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      trapCounts: {}
    };
    pushRecentView({ label: "Språkliga färdigheter", icon: "🇸🇪", action: "nav-start-ls" });
    navOpen = false;
    page = "tracks";
    render();
    return;
  }

  if (action === "start-aptitude-drill") {
    const rawIds = actionEl.dataset.questionIds ?? "";
    const ids = rawIds.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return;
    const minutes = Math.max(3, ids.length * 1);
    startSession("Drill", ids, minutes);
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

  const glossarySearchInput = target.closest<HTMLInputElement>("input[data-action='glossary-search']");
  if (glossarySearchInput) {
    glossarySearch = glossarySearchInput.value;
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
  _isOnline = true;
  render();
});

window.addEventListener("offline", () => {
  _isOnline = false;
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
