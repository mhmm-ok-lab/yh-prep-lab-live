import "./styles.css";
import { GLOSSARY, LS_ITEMS, MOCK_EXAMS, QUESTIONS, RESEARCH_EVIDENCE, TRACKS, VR_ITEMS } from "./data";
import { HP_MATH_AREAS, HP_MATH_QUESTIONS } from "./hp-math";
import type { HpMathArea, HpMathQuestion } from "./hp-math";
import { HP_TWINS } from "./hp-twins";
import type { HpDelprov, HpTwin } from "./hp-twins";
import { HP_WORDS } from "./hp-words";
import type { HpWord } from "./hp-words";
import { HP_LAS_TEXTS } from "./hp-las";
import { HP_ELF_TEXTS } from "./hp-elf";
import { HP_MEK_ITEMS } from "./hp-mek";
import type { HpMekItem } from "./hp-mek";
import type { HpLasQuestion, HpLasQuestionType, HpLasText } from "./hp-las";
import { HP_CARDS, findHpCard } from "./hp-cards";
import {
  HP_FORMULAS,
  HP_FORMULA_GOAL,
  HP_FORMULA_PASS_MAX,
  findFormula,
  formulaProgress,
  introduceFormulas,
  pickFormulaTaskIndex,
  planFormulaPass,
  recordFirstTry,
  recordFormulaPass,
  shuffleOptions,
  type HpFormulaProgress
} from "./hp-formulas";
import { HP_RESOURCE_GROUPS, HP_RESOURCES_CHECKED_LABEL, hpResourcesForGroup } from "./hp-resources";
import type { HpCard } from "./hp-cards";
import { HP_LAS_STRATEGY, HP_NOG_INTRO, HP_KVA_INTRO, HP_GUIDE_CATEGORIES, hpGuideCardsForCategory } from "./hp-guide";
import type { HpGuideCard, HpGuideCategoryId } from "./hp-guide";
import {
  buildPlanOverview,
  buildTodayPlan,
  addDays,
  formatPlanDate,
  formatPlanWeekday,
  HP_PLAN_DAYS,
  HP_PLAN_EXAM,
  HP_PLAN_STEPS,
  HP_PLAN_START,
  localDateKey,
  type HpPlanData,
  type HpPlanItem,
  type HpPlanState
} from "./hp-plan";
import {
  computeReadiness,
  summarizeReadiness,
  type HpReadyId,
  type HpReadyRow
} from "./hp-readiness";
import { createDailyPlan, getNextMockExam } from "./planner";
import { createSync, installWriteHook, SYNC_TOKEN_URL } from "./sync";
import { estimateDrillMinutes, filterQuestions, isAnswerCorrect, scoreAnswers } from "./question-bank";
import {
  addHpLasRepeatText,
  addHpMekRepeatItem,
  addHpRepeatWord,
  addHpTwinRepeatItem,
  clearActiveSession,
  loadActiveSession,
  loadHpLasRepeatQueue,
  loadHpMekRepeatQueue,
  loadHpMekResults,
  loadHpMekSeen,
  loadHpLasResults,
  loadHpMathResult,
  loadHpFormulaState,
  saveHpFormulaState,
  loadHpOrdResults,
  loadHpPlanState,
  loadHpProvlogg,
  loadHpProgress,
  loadHpRepeatQueue,
  loadHpTwinRepeatQueue,
  loadHpTwinResult,
  loadStudySessions,
  recordHpPassCompleted,
  removeHpLasRepeatText,
  removeHpMekRepeatItem,
  removeHpRepeatWord,
  removeHpTwinRepeatItem,
  saveActiveSession,
  saveHpLasResult,
  saveHpMekResult,
  saveHpMekSeen,
  saveHpMathResult,
  saveHpOrdResult,
  saveHpPlanState,
  saveHpProvlogg,
  saveHpTwinResult,
  saveStudySession,
  setStorageNamespace
} from "./storage";
import { buildProvPass, PROV_DELPROV, PROV_MAX, provPercent, provTrend, sortProvPass, weakestDelprov, type ProvTyp } from "./hp-provlogg";
import { HP_NAMES, hpAbbr, hpExpand, hpFull, hpShort } from "./hp-names";
import { loadColorMode, saveColorMode } from "./storage";
import type { ColorMode } from "./storage";
import type { HpLasErrorTag, HpLasSource, HpMathAreaResult, HpMathQuestionResult, HpMathOutcome, HpMathLevel, HpTwinErrorTag, HpTwinResult } from "./storage";
import type { GlossaryEntry, LSItem, LSTrap, Mode, Question, QuestionFilters, SessionDraft, StudySession, TrackId, VRAnswer, VRItem } from "./types";

type Page = "overview" | "tracks" | "bank" | "mock" | "research" | "logic" | "walkthrough" | "glossary" | "course-prog1a" | "course-nackademin_ux" | "course-iths_itsec" | "iths-antagning" | "hp";
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

/** Gemensamt för HP-övningarna: granskningsläge (föregående), överhoppade frågor och obesvarade.
 *  answerLog/tagLog indexeras på position: besvarade frågor ligger alltid kvar på index < currentIndex
 *  (överhoppade flyttas sist), så positionen är stabil. */
interface HpNavFields {
  /** Index på besvarad fråga som granskas (låst), annars null. */
  reviewIndex: number | null;
  answerLog: number[];
  tagLog: (HpTwinErrorTag | null)[];
  /** Id:n på frågor som hoppats över minst en gång. */
  skippedIds: string[];
  /** Antal frågor som lämnades obesvarade när passet avslutades via "Hoppa över" på sista frågan. */
  unanswered: number;
  /** Hjälptrappa (beslut 20): utfall per besvarad fråga (position), alla val per fråga,
   *  felaktiga val på aktuell fråga och om ledtråden visats på aktuell fråga. */
  outcomes: HpOutcome[];
  triesLog: number[][];
  curPicks: number[];
  hintShown: boolean;
}

/** Ärligt utfall per fråga: rätt utan hjälp, rätt efter ledtråd/andra försöket, eller svaret visades (fel). */
type HpOutcome = "clean" | "hint" | "shown";

function hpNavInit(): HpNavFields {
  return { reviewIndex: null, answerLog: [], tagLog: [], skippedIds: [], unanswered: 0, outcomes: [], triesLog: [], curPicks: [], hintShown: false };
}

/** HP ORD-drillen. Följer samma tillstånds-mönster som VRSession/LSSession. */
interface HpWordSession extends HpNavFields {
  items: HpWord[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  correct: number;
  wrong: number;
  questionStartedAt: number;
  tempoSeconds: number[];
  missedItems: HpWord[];
  /** Id:n på frågor där ?-hjälpen öppnades före svar. */
  helpedIds: string[];
}

/** HP Mattediagnos. Hjälptrappa: Ledtråd, ett nytt försök och Visa svar (userAnswer = -1 om svaret visades utan val). */
interface HpMathSession extends HpNavFields {
  items: HpMathQuestion[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  questionStartedAt: number;
  answers: HpMathQuestionResult[];
  helpedIds: string[];
  currentTag: HpTwinErrorTag | null;
  errorTagCounts: Partial<Record<HpTwinErrorTag, number>>;
}

/** HP Tvillingträning (XYZ/KVA/NOG/DTK). Ett svar per uppgift, felkategori valfri per fel svar. */
interface HpTwinSession extends HpNavFields {
  delprov: HpDelprov;
  items: HpTwin[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  correct: number;
  /** Rätt efter ledtråd eller andra försöket. */
  withHint: number;
  /** Svaret visades (fel). */
  wrong: number;
  questionStartedAt: number;
  missedItems: HpTwin[];
  errorTagCounts: Partial<Record<HpTwinErrorTag, number>>;
  currentTag: HpTwinErrorTag | null;
  helpedIds: string[];
  /** Summa svarstid över besvarade uppgifter (sekunder), för "Är jag redo?". */
  answerSeconds: number;
}

/** HP LÄS-träning: ett pass = en text med dess frågor. Tempomätaren går per text (frågor × 2 min). */
interface HpLasSession extends HpNavFields {
  /** LÄS eller ELF: samma vy och datamodell, men egna resultat och egen repetitionskö. */
  source: HpLasSource;
  text: HpLasText;
  items: HpLasQuestion[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  correct: number;
  withHint: number;
  wrong: number;
  questionStartedAt: number;
  startedAt: number;
  /** Sätts när sista frågan är klar, så att sammanfattningens tid står still. */
  finishedAt: number | null;
  missedItems: HpLasQuestion[];
  errorTagCounts: Partial<Record<HpLasErrorTag, number>>;
  currentTag: HpLasErrorTag | null;
  /** Felkategori per besvarad fråga (position), för granskningsläget. */
  lasTagLog: (HpLasErrorTag | null)[];
  helpedIds: string[];
}

/** HP MEK-träning (meningskomplettering): ett pass = 10 uppgifter, en per skärm. */
interface HpMekSession extends HpNavFields {
  items: HpMekItem[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  correct: number;
  withHint: number;
  wrong: number;
  questionStartedAt: number;
  startedAt: number;
  finishedAt: number | null;
  missedItems: HpMekItem[];
  helpedIds: string[];
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
  glossary: "Ordlista",
  "course-prog1a": "Programmering 1",
  "course-nackademin_ux": "UX-design",
  "course-iths_itsec": "IT-säkerhet",
  "iths-antagning": "Antagningsprov",
  hp: "HP"
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
  void sync.syncNow();
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

// ── Färgläge: Automatiskt (följer systemet) / Ljust / Mörkt ──
const COLOR_MODE_LABELS: Record<ColorMode, string> = { auto: "Automatiskt", light: "Ljust", dark: "Mörkt" };
const THEME_COLOR_LIGHT = "#0f766e";
const THEME_COLOR_DARK = "#14171a";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
let colorMode: ColorMode = loadColorMode();

function applyColorMode(mode: ColorMode): void {
  const dark = mode === "dark" || (mode === "auto" && darkQuery.matches);
  document.documentElement.dataset.scheme = dark ? "dark" : "light";
  // meta color-scheme gör att webbläsarens egna kontroller och scrollbars följer valet.
  const schemeMeta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  if (schemeMeta) schemeMeta.content = mode === "auto" ? "light dark" : mode;
  // theme-color färgar mobilens statusfält/adressfält.
  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;
}
applyColorMode(colorMode);
darkQuery.addEventListener("change", () => {
  if (colorMode === "auto") applyColorMode("auto");
});

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
let hpSession: HpWordSession | null = null;
let hpAutoAdvanceTimer: number | null = null;
let hpTempoIntervalRef: number | null = null;
let hpMathSession: HpMathSession | null = null;
let hpMathTempoIntervalRef: number | null = null;
let hpMathViewingSaved = false;
let hpTwinSession: HpTwinSession | null = null;
let hpFormulaSession: HpFormulaSession | null = null;
let hpTwinTempoIntervalRef: number | null = null;
let hpLasSession: HpLasSession | null = null;
let hpLasTempoIntervalRef: number | null = null;
let hpMekSession: HpMekSession | null = null;
let hpMekTempoIntervalRef: number | null = null;
let hpMekShowAllFor: string | null = null;
/** LÄS: vilken vy som visas (fråga eller text), markerat stycke, vilken fråga som visar alla alternativ,
 *  och scrollposition per vy så att man hamnar rätt när man växlar. */
let hpLasView: "fraga" | "text" = "fraga";
let hpLasHighlight: number | null = null;
let hpLasShowAllFor: string | null = null;
/** Introskärmen "Så läser du" (beslut 2026-10-08 (2)): väntande start, visas första gången läsförståelse öppnas. */
let hpLasIntro: { text: HpLasText; source: HpLasSource } | null = null;
const HP_LAS_INTRO_KEY = "hp-las-intro-seen";
function hpLasIntroSeen(): boolean {
  try {
    return localStorage.getItem(HP_LAS_INTRO_KEY) === "1";
  } catch {
    return true;
  }
}
function hpLasIntroMarkSeen(): void {
  try {
    localStorage.setItem(HP_LAS_INTRO_KEY, "1");
  } catch {
    /* utan lagring visas introt bara en gång per session */
  }
}
/** Introskärmen för NOG/KVA (beslut 2026-10-09): visas första gången ett pass startas, och via Strategi → "Visa genomgången".
 *  startAfter = true vid första start (knappen startar passet), false när den öppnats mitt i ett pass. */
let hpTwinIntro: { delprov: "NOG" | "KVA"; startAfter: boolean } | null = null;
function hpTwinIntroKey(d: "NOG" | "KVA"): string {
  return d === "NOG" ? "hp-nog-intro-seen" : "hp-kva-intro-seen";
}
function hpTwinIntroSeen(d: "NOG" | "KVA"): boolean {
  try {
    return localStorage.getItem(hpTwinIntroKey(d)) === "1";
  } catch {
    return true;
  }
}
function hpTwinIntroMarkSeen(d: "NOG" | "KVA"): void {
  try {
    localStorage.setItem(hpTwinIntroKey(d), "1");
  } catch {
    /* utan lagring visas introt bara en gång per session */
  }
}
/** Påminnelsen ovanför frågan visas de tre första passen (svensk och engelsk läsförståelse sammanlagt). */
const HP_LAS_NUDGE_PASSES = 3;
function hpLasShowNudge(): boolean {
  return Object.keys(loadHpLasResults()).length + Object.keys(loadHpLasResults("elf")).length < HP_LAS_NUDGE_PASSES;
}
const hpLasScroll = { fraga: 0, text: 0 };
/** True när man nått HP via nav/startsidans HP-kort medan ett pass pågår —
 *  visar HP-hem med "Fortsätt pass" i stället för att hoppa rakt in i övningen. */
let hpForceHome = false;
/** Id på frågan vars ?-hjälplager är öppet (null = stängt). Byter fråga => stängs av sig självt. */
let hpHelpOpenFor: string | null = null;
/** HP-guiden: null = ingen guide öppen, annars vilket läge som visas. */
let hpGuideMode: "flashcards" | "page" | "cards" | null = null;
/** Påminnelsekort (beslut 2026-10-05 (6)): id på öppet kort (null = stängt). Passets och granskningens tillstånd
 *  ligger kvar orört i sina egna variabler, så "Tillbaka" återskapar exakt samma vy. */
let hpCardOpen: string | null = null;
let hpResourcesOpen = false;
let hpProvloggOpen = false;
let hpProvloggTyp: ProvTyp = "kvantitativt";
let hpProvloggError = "";
/** "Din plan" (beslut 2026-10-05 (9)): hela planen öppen, vilka "Varför?" som är öppna, och delprovet som
 *  startas från ett Lär om-kort som öppnades via planen. */
let hpPlanAllOpen = false;
/** "Är jag redo?" (beslut 2026-10-08): översikten öppen. Ligger sist i renderHp, så en pågående övning går före. */
const hpPlanWhyOpen = new Set<string>();
let hpPlanCardDelprov: HpDelprov | null = null;
/** Dev-parameter ?plandate=YYYY-MM-DD simulerar ett annat datum. Sparar inget i localStorage. */
const HP_PLAN_DEV_DATE = (() => {
  const v = urlParams.get("plandate");
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
})();
let hpPlanMemState: HpPlanState = { checks: {}, snapshots: {} };
let hpCardReturnScroll = 0;
/** Vilka områden i diagnosgranskningen som var öppna när kortet öppnades (så de är öppna igen efter Tillbaka). */
let hpAreaOpenMemo: string[] | null = null;
let hpGuideFilter: HpGuideCategoryId | "alla" = "alla";
let hpGuideIndex = 0;
let hpGuideFlipped = false;
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

const PROFILE_OPTIONS: { targetPriority: ProfileOption[] } = {
  targetPriority: [
    { id: "nack", label: "Nackademin UX" },
    { id: "iths", label: "IT-Högskolan IT-säkerhet" },
    { id: "prog", label: "Programmering 1" }
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

const HP_EXAM_DATE = new Date("2026-10-18T00:00:00");
const HP_WORDS_PER_PASS = 10;
const HP_TEMPO_TARGET_SECONDS = 20;

function hpDaysLeft(): number {
  const diffMs = HP_EXAM_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diffMs / 86_400_000));
}

/** Bygger dagens ORD-pass: repetitionskön (missade ord) prioriteras, sedan nya ord.
 *  Om ordbanken är mindre än ett pass fylls resten genom att cykla banken igen. */
function buildHpPass(): HpWord[] {
  if (HP_WORDS.length === 0) {
    return [];
  }
  const byId = new Map(HP_WORDS.map((w) => [w.id, w]));
  const repeatIds = loadHpRepeatQueue();
  const repeatWords = repeatIds.map((id) => byId.get(id)).filter((w): w is HpWord => Boolean(w));
  const usedIds = new Set(repeatWords.map((w) => w.id));
  const freshPool = HP_WORDS.filter((w) => !usedIds.has(w.id)).sort(() => Math.random() - 0.5);
  const combined = [...repeatWords, ...freshPool];
  const pass = combined.slice(0, HP_WORDS_PER_PASS);
  let cycleIndex = 0;
  while (pass.length < HP_WORDS_PER_PASS) {
    pass.push(HP_WORDS[cycleIndex % HP_WORDS.length]);
    cycleIndex++;
  }
  return pass;
}

function stopHpTempoInterval(): void {
  if (hpTempoIntervalRef) {
    window.clearInterval(hpTempoIntervalRef);
    hpTempoIntervalRef = null;
  }
}

function updateHpTempoUI(): void {
  if (!hpSession || hpSession.showFeedback) {
    return;
  }
  const el = app.querySelector<HTMLElement>("[data-hp-tempo]");
  if (!el) {
    return;
  }
  const elapsed = Math.round((Date.now() - hpSession.questionStartedAt) / 1000);
  el.textContent = `${elapsed}s / ${HP_TEMPO_TARGET_SECONDS}s mål`;
  el.classList.toggle("hp-tempo-over", elapsed > HP_TEMPO_TARGET_SECONDS);
}

function startHpTempoInterval(): void {
  stopHpTempoInterval();
  updateHpTempoUI();
  hpTempoIntervalRef = window.setInterval(updateHpTempoUI, 500);
}

/** Avslutar ORD-passet: dagens räknare plus resultatet som "Är jag redo?" bygger på. */
function hpOrdFinish(): void {
  if (!hpSession) {
    return;
  }
  const answered = hpSession.items.length - hpSession.unanswered;
  recordHpPassCompleted(answered);
  if (answered > 0) {
    const t = hpSession.tempoSeconds;
    saveHpOrdResult({
      completedAt: new Date().toISOString(),
      correct: hpSession.correct,
      total: answered,
      avgSeconds: t.length > 0 ? t.reduce((a, b) => a + b, 0) / t.length : 0
    });
  }
}

function hpAdvanceQuestion(): void {
  if (!hpSession) {
    return;
  }
  hpSession.currentIndex++;
  if (hpSession.currentIndex >= hpSession.items.length) {
    hpOrdFinish();
  } else {
    hpSession.userAnswer = null;
    hpSession.showFeedback = false;
    hpSession.questionStartedAt = Date.now();
  }
  render();
}

const HP_MATH_TEMPO_TARGET_SECONDS = 90;

/** Blandar svarsalternativen för en fråga så att rätt svar inte alltid hamnar på samma plats. */
function shuffleMathQuestionOptions(q: HpMathQuestion): HpMathQuestion {
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const options = indices.map((i) => q.options[i]) as HpMathQuestion["options"];
  const correct = indices.indexOf(q.correct);
  return { ...q, options, correct };
}

/** Bygger mattediagnosen: 2 frågor per område, områdesordningen blandas varje gång.
 *  Svarsalternativen blandas per fråga så rätt svar inte alltid hamnar på A. */
function buildHpMathPass(): HpMathQuestion[] {
  const byArea = new Map<HpMathArea, HpMathQuestion[]>();
  for (const q of HP_MATH_QUESTIONS) {
    const list = byArea.get(q.area) ?? [];
    list.push(q);
    byArea.set(q.area, list);
  }
  const areaOrder = HP_MATH_AREAS.map((a) => a.id).sort(() => Math.random() - 0.5);
  return areaOrder.flatMap((areaId) => byArea.get(areaId) ?? []).map(shuffleMathQuestionOptions);
}

function hpMathAreaLabel(area: HpMathArea): string {
  return HP_MATH_AREAS.find((a) => a.id === area)?.label ?? area;
}

function hpMathAreaLearnUrl(area: HpMathArea): string {
  return HP_MATH_AREAS.find((a) => a.id === area)?.learnUrl ?? "https://www.matteboken.se/";
}

/** Nivå per område:
 *  Lär om: någon fråga slutade med visat svar (eller fel två gånger), eller ingen fråga klarades utan hjälp.
 *  Repetera: någon fråga krävde ledtråd eller blev fel en gång, eller snittiden är över målet.
 *  Kan: alla frågor utan hjälp inom tid. */
function computeHpMathAreaResults(answers: HpMathQuestionResult[]): HpMathAreaResult[] {
  const results: HpMathAreaResult[] = [];
  for (const areaInfo of HP_MATH_AREAS) {
    const list = answers.filter((a) => a.area === areaInfo.id);
    if (list.length === 0) continue;
    const clean = list.filter((a) => a.outcome === "clean").length;
    const avgSeconds = Math.round(list.reduce((sum, a) => sum + a.seconds, 0) / list.length);
    let level: HpMathLevel;
    if (list.some((a) => a.outcome === "shown") || clean === 0) {
      level = "lar-om";
    } else if (clean === list.length && avgSeconds <= HP_MATH_TEMPO_TARGET_SECONDS) {
      level = "kan";
    } else {
      level = "repetera";
    }
    results.push({ area: areaInfo.id, level, correct: clean, total: list.length, avgSeconds });
  }
  const levelOrder: Record<HpMathLevel, number> = { "lar-om": 0, repetera: 1, kan: 2 };
  return results.sort((x, y) => levelOrder[x.level] - levelOrder[y.level]);
}

/** Bygger sparbar rad för en besvarad fråga (svarstexter, eftersom alternativen blandas per pass). */
function buildHpMathQuestionResult(item: HpMathQuestion, outcome: HpMathOutcome, picks: number[], seconds: number): HpMathQuestionResult {
  return {
    id: item.id,
    area: item.area,
    outcome,
    wrongPicks: picks.filter((p) => p !== item.correct).length,
    picks: picks.map((p) => item.options[p]),
    correctText: item.options[item.correct],
    seconds: Math.round(seconds)
  };
}

function stopHpMathTempoInterval(): void {
  if (hpMathTempoIntervalRef) {
    window.clearInterval(hpMathTempoIntervalRef);
    hpMathTempoIntervalRef = null;
  }
}

function updateHpMathTempoUI(): void {
  if (!hpMathSession || hpMathSession.showFeedback) {
    return;
  }
  hpLadderTick(hpMathSession);
  const el = app.querySelector<HTMLElement>("[data-hp-math-tempo]");
  if (!el) {
    return;
  }
  const elapsed = Math.round((Date.now() - hpMathSession.questionStartedAt) / 1000);
  el.textContent = `${elapsed}s / ${HP_MATH_TEMPO_TARGET_SECONDS}s mål`;
  el.classList.toggle("hp-tempo-over", elapsed > HP_MATH_TEMPO_TARGET_SECONDS);
}

function startHpMathTempoInterval(): void {
  stopHpMathTempoInterval();
  updateHpMathTempoUI();
  hpMathTempoIntervalRef = window.setInterval(updateHpMathTempoUI, 500);
}

function hpMathAdvanceQuestion(): void {
  if (!hpMathSession) {
    return;
  }
  const tagBefore = hpMathSession.currentTag;
  if (hpMathSession.currentTag) {
    const tag = hpMathSession.currentTag;
    hpMathSession.errorTagCounts[tag] = (hpMathSession.errorTagCounts[tag] ?? 0) + 1;
    hpMathSession.currentTag = null;
  }
  hpMathSession.tagLog[hpMathSession.currentIndex] = tagBefore;
  hpMathSession.currentIndex++;
  if (hpMathSession.currentIndex < hpMathSession.items.length) {
    hpMathSession.userAnswer = null;
    hpMathSession.showFeedback = false;
    hpLadderReset(hpMathSession);
    hpMathSession.questionStartedAt = Date.now();
  }
  render();
}

const HP_TWIN_DELPROV_INFO: Record<HpDelprov, { label: string; desc: string }> = {
  XYZ: { label: hpFull("XYZ"), desc: "Räkna ut svaret" },
  KVA: { label: hpFull("KVA"), desc: "Jämför två värden" },
  NOG: { label: hpFull("NOG"), desc: HP_NAMES.NOG.sub ?? "" },
  DTK: { label: hpFull("DTK"), desc: "Läs diagram, tabeller och kartor" }
};

/** Delprov där svarsordningen blandas — KVA och NOG har fasta alternativ i fast ordning som på provet. */
function hpTwinShufflesOptions(delprov: HpDelprov): boolean {
  return delprov === "XYZ" || delprov === "DTK";
}

function hpTwinTempoTarget(delprov: HpDelprov): number {
  return delprov === "NOG" || delprov === "DTK" ? 90 : 60;
}

function hpTwinBank(delprov: HpDelprov): HpTwin[] {
  return HP_TWINS.filter((t) => t.delprov === delprov);
}

function shuffleTwinOptions(t: HpTwin): HpTwin {
  const indices = t.options.map((_, i) => i).sort(() => Math.random() - 0.5);
  const options = indices.map((i) => t.options[i]);
  const correct = indices.indexOf(t.correct);
  return { ...t, options, correct };
}

/** Förstorad figur i matteträningen (DTK-diagram, geometrifigurer). */
let hpFigureZoom = false;

/** Antal uppgifter per pass = antal i ett provpass på riktiga provet. */
const HP_TWIN_PASS_SIZE: Record<HpDelprov, number> = { XYZ: 12, KVA: 10, NOG: 6, DTK: 12 };

/** Fullt namn per matte-delprov (central namnkarta). */
const HP_DELPROV_NAMES: Record<HpDelprov, string> = {
  XYZ: hpFull("XYZ"),
  KVA: hpFull("KVA"),
  NOG: hpFull("NOG"),
  DTK: hpFull("DTK")
};

/** Vad ska Martin göra nu? 1) mattedelprov han aldrig provat, 2) dagens ord om de inte är gjorda,
 *  3) mattedelprovet med lägst andel rätt. */
function recommendHpNext(wordsToday: number): { label: string; reason: string; delprov?: HpDelprov; las?: HpLasText; source?: HpLasSource; mek?: boolean } {
  const order: HpDelprov[] = ["XYZ", "KVA", "NOG", "DTK"];
  const untried = order.find((d) => !loadHpTwinResult(d));
  if (untried) {
    return {
      delprov: untried,
      label: HP_DELPROV_NAMES[untried],
      reason: `Du har inte provat ${HP_DELPROV_NAMES[untried]} än · ${HP_TWIN_PASS_SIZE[untried]} uppgifter`
    };
  }
  // LÄS är prioriterat (Martins svåraste del): direkt efter otränade mattedelprov, och sedan en text om dagen.
  const lasResults = Object.values(loadHpLasResults());
  const lasText = pickHpLasText();
  if (lasText && lasResults.length === 0) {
    return {
      las: lasText,
      label: `${hpFull("LÄS")} – ${lasText.title}`,
      reason: `Du har inte tränat ${hpFull("LÄS").toLowerCase()} än · ${lasText.questions.length} frågor, ca ${hpLasBudgetSeconds(lasText) / 60} min`
    };
  }
  // Verbala delprov som aldrig tränats: MEK, sedan ELF.
  if (HP_MEK_ITEMS.length > 0 && loadHpMekResults().length === 0) {
    return { mek: true, label: hpFull("MEK"), reason: `Du har inte tränat ${hpFull("MEK").toLowerCase()} än · ${HP_MEK_PASS_SIZE} uppgifter, ca ${Math.round((HP_MEK_PASS_SIZE * HP_MEK_TEMPO_TARGET_SECONDS) / 60)} min` };
  }
  const elfText = pickHpLasText("elf");
  if (elfText && Object.keys(loadHpLasResults("elf")).length === 0) {
    return {
      las: elfText,
      source: "elf",
      label: `${hpFull("ELF")} – ${elfText.title}`,
      reason: `Du har inte tränat ${hpFull("ELF").toLowerCase()} än · ${elfText.questions.length} frågor, ca ${Math.round(hpLasBudgetSeconds(elfText) / 60)} min`
    };
  }
  if (wordsToday === 0 && HP_WORDS.length > 0) {
    return { label: "Dagens 10 ord", reason: "Du har inte kört ord i dag" };
  }
  const today = new Date().toDateString();
  if (lasText && !lasResults.some((r) => new Date(r.completedAt).toDateString() === today)) {
    const isRepeat = loadHpLasRepeatQueue().includes(lasText.id);
    return {
      las: lasText,
      label: `${hpFull("LÄS")} – ${lasText.title}`,
      reason: `${isRepeat ? "Du hade fel här sist, dags att repetera" : "Ingen svensk läsförståelse i dag än"} · ${lasText.questions.length} frågor, ca ${hpLasBudgetSeconds(lasText) / 60} min`
    };
  }
  const weakest = suggestNextHpTwinDelprov();
  const r = loadHpTwinResult(weakest)!;
  return {
    delprov: weakest,
    label: HP_DELPROV_NAMES[weakest],
    reason: `Ditt svagaste just nu (senast ${r.correct}/${r.total}) · ${HP_TWIN_PASS_SIZE[weakest]} uppgifter`
  };
}

const HP_LAS_SECONDS_PER_QUESTION = 120;
/** ELF-lucktexter (titel "Gap-fill: …") har en lucka per fråga och går snabbare: 1 min per lucka. */
const HP_GAPFILL_SECONDS_PER_QUESTION = 60;

function hpIsGapFill(text: HpLasText): boolean {
  return /^gap-fill/i.test(text.title);
}

/** Tidsbudget för den fråga man är på (2 min, lucka 1 min). */
function hpLasQuestionBudgetSeconds(text: HpLasText): number {
  return hpIsGapFill(text) ? HP_GAPFILL_SECONDS_PER_QUESTION : HP_LAS_SECONDS_PER_QUESTION;
}

/** Är tiden för den aktuella frågan slut? Bara medan frågan är obesvarad. */
function hpLasQuestionOver(): boolean {
  const s = hpLasSession;
  if (!s || s.reviewIndex !== null || s.showFeedback || s.currentIndex >= s.items.length) return false;
  return (Date.now() - s.questionStartedAt) / 1000 > hpLasQuestionBudgetSeconds(s.text);
}

function hpLasBudgetSeconds(text: HpLasText): number {
  return text.questions.length * (hpIsGapFill(text) ? HP_GAPFILL_SECONDS_PER_QUESTION : HP_LAS_SECONDS_PER_QUESTION);
}

function hpLasTexts(source: HpLasSource): HpLasText[] {
  return source === "elf" ? HP_ELF_TEXTS : HP_LAS_TEXTS;
}

/** Rubrik i övningen: "Svensk läsförståelse – titel" eller "Engelsk läsförståelse · titel". */
function hpLasHeading(source: HpLasSource, text: HpLasText): string {
  return source === "elf" ? `${hpFull("ELF")} · ${text.title}` : `${hpFull("LÄS")} – ${text.title}`;
}

function formatMinSec(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Väljer nästa LÄS-text. Aldrig samma text två gånger i rad. Repetitionskön (texter med fel) först,
 *  sedan texter som inte gjorts, sedan den som gjordes för längst tid sedan. */
function pickHpLasText(source: HpLasSource = "las"): HpLasText | undefined {
  const texts = hpLasTexts(source);
  if (texts.length === 0) {
    return undefined;
  }
  const results = loadHpLasResults(source);
  const lastId = Object.values(results).sort((a, b) => b.completedAt.localeCompare(a.completedAt))[0]?.textId;
  const byId = new Map(texts.map((t) => [t.id, t]));
  const queued = loadHpLasRepeatQueue(source)
    .map((id) => byId.get(id))
    .filter((t): t is HpLasText => Boolean(t) && t!.id !== lastId);
  if (queued.length > 0) {
    return queued[0];
  }
  const fresh = texts.filter((t) => !results[t.id] && t.id !== lastId);
  if (fresh.length > 0) {
    return fresh[0];
  }
  const oldest = texts.filter((t) => t.id !== lastId).sort((a, b) =>
    (results[a.id]?.completedAt ?? "").localeCompare(results[b.id]?.completedAt ?? "")
  );
  return oldest[0] ?? texts[0];
}

function hpLasElapsedSeconds(): number {
  if (!hpLasSession) {
    return 0;
  }
  return Math.round(((hpLasSession.finishedAt ?? Date.now()) - hpLasSession.startedAt) / 1000);
}

function stopHpLasTempoInterval(): void {
  if (hpLasTempoIntervalRef) {
    window.clearInterval(hpLasTempoIntervalRef);
    hpLasTempoIntervalRef = null;
  }
}

function hpLasTempoText(): string {
  return hpLasSession ? `${formatMinSec(hpLasElapsedSeconds())} / ${formatMinSec(hpLasBudgetSeconds(hpLasSession.text))}` : "";
}

function updateHpLasTempoUI(): void {
  if (!hpLasSession) {
    return;
  }
  hpLadderTick(hpLasSession);
  const el = app.querySelector<HTMLElement>("[data-hp-las-tempo]");
  if (!el) {
    return;
  }
  el.textContent = hpLasTempoText();
  el.classList.toggle("hp-tempo-over", hpLasElapsedSeconds() > hpLasBudgetSeconds(hpLasSession.text));
  app.querySelector<HTMLElement>("[data-hp-las-banner]")?.classList.toggle("hp-time-banner-on", hpLasQuestionOver());
}

function startHpLasTempoInterval(): void {
  stopHpLasTempoInterval();
  updateHpLasTempoUI();
  hpLasTempoIntervalRef = window.setInterval(updateHpLasTempoUI, 500);
}

function hpLasResetView(): void {
  hpLasView = "fraga";
  hpLasHighlight = null;
  hpLasShowAllFor = null;
  hpLasScroll.fraga = 0;
  window.scrollTo(0, 0);
}

function hpLasStart(text: HpLasText, source: HpLasSource = "las"): void {
  hpForceHome = false;
  hpHelpOpenFor = null;
  hpLasScroll.text = 0;
  hpLasSession = {
    source,
    text,
    items: text.questions.map((q) => ({ ...q })),
    currentIndex: 0,
    userAnswer: null,
    showFeedback: false,
    correct: 0,
    withHint: 0,
    wrong: 0,
    questionStartedAt: Date.now(),
    startedAt: Date.now(),
    finishedAt: null,
    missedItems: [],
    errorTagCounts: {},
    currentTag: null,
    lasTagLog: [],
    helpedIds: [],
    ...hpNavInit()
  };
  hpLasResetView();
  render();
}

function hpLasAdvanceQuestion(): void {
  if (!hpLasSession) {
    return;
  }
  if (hpLasSession.currentTag) {
    const tag = hpLasSession.currentTag;
    hpLasSession.errorTagCounts[tag] = (hpLasSession.errorTagCounts[tag] ?? 0) + 1;
  }
  hpLasSession.lasTagLog[hpLasSession.currentIndex] = hpLasSession.currentTag;
  hpLasSession.currentIndex++;
  if (hpLasSession.currentIndex < hpLasSession.items.length) {
    hpLasSession.userAnswer = null;
    hpLasSession.showFeedback = false;
    hpLasSession.currentTag = null;
    hpLadderReset(hpLasSession);
    hpLasSession.questionStartedAt = Date.now();
  } else {
    hpLasSaveResult();
  }
  hpLasResetView();
  render();
}

function hpLasSaveResult(): void {
  if (!hpLasSession) {
    return;
  }
  const s = hpLasSession;
  s.finishedAt = Date.now();
  const missedTypes: Record<string, number> = {};
  for (const q of s.missedItems) {
    missedTypes[q.type] = (missedTypes[q.type] ?? 0) + 1;
  }
  saveHpLasResult({
    completedAt: new Date().toISOString(),
    textId: s.text.id,
    correct: s.correct,
    withHint: s.withHint,
    total: s.items.length - s.unanswered,
    seconds: hpLasElapsedSeconds(),
    budgetSeconds: hpLasBudgetSeconds(s.text),
    errorTags: s.errorTagCounts,
    missedTypes
  }, s.source);
  // Texten ligger kvar i repetitionskön tills alla frågor klaras utan hjälp.
  if (s.wrong > 0 || s.withHint > 0 || s.unanswered > 0) {
    addHpLasRepeatText(s.text.id, s.source);
  } else {
    removeHpLasRepeatText(s.text.id, s.source);
  }
}

/** Räknar utfallet för en LÄS-fråga: clean = rätt utan hjälp, hint = rätt efter ledtråd, shown = svaret visades. */
function hpLasRecordOutcome(outcome: HpOutcome, item: HpLasQuestion): void {
  const s = hpLasSession!;
  if (outcome === "clean") {
    s.correct++;
  } else if (outcome === "hint") {
    s.withHint++;
    s.missedItems.push(item);
  } else {
    s.wrong++;
    s.missedItems.push(item);
  }
  s.currentTag = null;
  hpLasShowAllFor = null;
}

/** Växlar mellan fråga och text och minns var man var i respektive vy. */
function hpLasSwitchView(next: "fraga" | "text", highlight: number | null): void {
  hpLasScroll[hpLasView] = window.scrollY;
  hpLasView = next;
  hpLasHighlight = highlight;
  render();
  if (next === "text" && highlight !== null) {
    document.getElementById(`hp-las-p-${highlight}`)?.scrollIntoView({ block: "start" });
  } else {
    window.scrollTo(0, hpLasScroll[next]);
  }
}

// ── MEK (meningskomplettering) ──

/** Ett pass = 10 uppgifter; tempomål 50 s per uppgift (8 min för 10 enligt UHR). */
const HP_MEK_PASS_SIZE = 10;
const HP_MEK_TEMPO_TARGET_SECONDS = 50;

function shuffled<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Blandar alternativen så att rätt svar inte alltid ligger på samma plats. */
function shuffleMekOptions(item: HpMekItem): HpMekItem {
  const order = shuffled([0, 1, 2, 3]);
  const options = order.map((i) => item.options[i]) as HpMekItem["options"];
  return { ...item, options, correct: order.indexOf(item.correct) };
}

/** Dagens MEK-pass: repetitionskön först (uppgifter som behövde hjälp), sedan uppgifter som inte setts,
 *  tills alla setts (då börjar det om). Blandad ordning, så 1-, 2- och 3-luckors uppgifter varvas. */
function buildHpMekPass(): HpMekItem[] {
  const byId = new Map(HP_MEK_ITEMS.map((i) => [i.id, i]));
  const repeat = loadHpMekRepeatQueue()
    .map((id) => byId.get(id))
    .filter((i): i is HpMekItem => Boolean(i))
    .slice(0, Math.floor(HP_MEK_PASS_SIZE / 2));
  const usedIds = new Set(repeat.map((i) => i.id));
  const need = HP_MEK_PASS_SIZE - repeat.length;
  let nextSeen = new Set(loadHpMekSeen().filter((id) => byId.has(id)));
  let pool = shuffled(HP_MEK_ITEMS.filter((i) => !usedIds.has(i.id) && !nextSeen.has(i.id)));
  if (pool.length < need) {
    // Alla uppgifter har setts: en ny runda börjar, de som återstod först.
    const rest = shuffled(HP_MEK_ITEMS.filter((i) => !usedIds.has(i.id) && !pool.includes(i)));
    pool = [...pool, ...rest];
    nextSeen = new Set();
  }
  const picked = [...repeat, ...pool.slice(0, need)];
  picked.forEach((i) => nextSeen.add(i.id));
  saveHpMekSeen([...nextSeen]);
  return shuffled(picked).map(shuffleMekOptions);
}

function hpMekBudgetSeconds(): number {
  return (hpMekSession?.items.length ?? HP_MEK_PASS_SIZE) * HP_MEK_TEMPO_TARGET_SECONDS;
}

function stopHpMekTempoInterval(): void {
  if (hpMekTempoIntervalRef) {
    window.clearInterval(hpMekTempoIntervalRef);
    hpMekTempoIntervalRef = null;
  }
}

function updateHpMekTempoUI(): void {
  if (!hpMekSession || hpMekSession.showFeedback) {
    return;
  }
  hpLadderTick(hpMekSession);
  const el = app.querySelector<HTMLElement>("[data-hp-mek-tempo]");
  if (!el) {
    return;
  }
  const elapsed = Math.round((Date.now() - hpMekSession.questionStartedAt) / 1000);
  el.textContent = `${elapsed}s / ${HP_MEK_TEMPO_TARGET_SECONDS}s mål`;
  el.classList.toggle("hp-tempo-over", elapsed > HP_MEK_TEMPO_TARGET_SECONDS);
}

function startHpMekTempoInterval(): void {
  stopHpMekTempoInterval();
  updateHpMekTempoUI();
  hpMekTempoIntervalRef = window.setInterval(updateHpMekTempoUI, 500);
}

function hpMekStart(): void {
  hpForceHome = false;
  hpHelpOpenFor = null;
  hpMekShowAllFor = null;
  hpMekSession = {
    items: buildHpMekPass(),
    currentIndex: 0,
    userAnswer: null,
    showFeedback: false,
    correct: 0,
    withHint: 0,
    wrong: 0,
    questionStartedAt: Date.now(),
    startedAt: Date.now(),
    finishedAt: null,
    missedItems: [],
    helpedIds: [],
    ...hpNavInit()
  };
  window.scrollTo(0, 0);
  render();
}

function hpMekSaveResult(): void {
  if (!hpMekSession) {
    return;
  }
  const s = hpMekSession;
  s.finishedAt = Date.now();
  saveHpMekResult({
    completedAt: new Date().toISOString(),
    correct: s.correct,
    withHint: s.withHint,
    total: s.items.length - s.unanswered,
    seconds: Math.round((s.finishedAt - s.startedAt) / 1000),
    budgetSeconds: hpMekBudgetSeconds()
  });
}

function hpMekAdvanceQuestion(): void {
  if (!hpMekSession) {
    return;
  }
  hpMekSession.currentIndex++;
  hpMekShowAllFor = null;
  if (hpMekSession.currentIndex < hpMekSession.items.length) {
    hpMekSession.userAnswer = null;
    hpMekSession.showFeedback = false;
    hpLadderReset(hpMekSession);
    hpMekSession.questionStartedAt = Date.now();
  } else {
    hpMekSaveResult();
  }
  window.scrollTo(0, 0);
  render();
}

/** Räknar utfallet. Bara "utan hjälp" tar uppgiften ur repetitionskön; annars läggs den dit. */
function hpMekRecordOutcome(outcome: HpOutcome, item: HpMekItem): void {
  const s = hpMekSession!;
  if (outcome === "clean") {
    s.correct++;
    removeHpMekRepeatItem(item.id);
  } else {
    if (outcome === "hint") s.withHint++;
    else s.wrong++;
    s.missedItems.push(item);
    addHpMekRepeatItem(item.id);
  }
  hpMekShowAllFor = null;
}

/** Föreslår nästa mattedelprov: först ett som aldrig tränats, annars det med lägst andel rätt. */
function suggestNextHpTwinDelprov(): HpDelprov {
  const order: HpDelprov[] = ["XYZ", "KVA", "NOG", "DTK"];
  const untried = order.find((d) => !loadHpTwinResult(d));
  if (untried) return untried;
  return order.reduce((worst, d) => {
    const r = loadHpTwinResult(d)!;
    const w = loadHpTwinResult(worst)!;
    return r.correct / r.total < w.correct / w.total ? d : worst;
  });
}

/** Bygger dagens pass för ett delprov: missade uppgifter (repetitionskö) prioriteras först,
 *  sedan slumpade nya uppgifter tills passet har provets storlek. DTK-frågor som delar tabell
 *  hålls ihop. Svarsordningen blandas endast för XYZ/DTK. */
function buildHpTwinPass(delprov: HpDelprov): HpTwin[] {
  const bank = hpTwinBank(delprov);
  const size = HP_TWIN_PASS_SIZE[delprov];
  const byId = new Map(bank.map((t) => [t.id, t]));
  const repeatIds = loadHpTwinRepeatQueue(delprov);
  const repeatItems = repeatIds
    .map((id) => byId.get(id))
    .filter((t): t is HpTwin => Boolean(t))
    .slice(0, size);
  const usedIds = new Set(repeatItems.map((t) => t.id));
  // Gruppera per tabell så att DTK-frågor om samma tabell kommer i följd.
  const groups = new Map<string, HpTwin[]>();
  for (const t of bank) {
    if (usedIds.has(t.id)) continue;
    const key = t.table ?? t.figure ?? t.id;
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  const freshItems = [...groups.values()].sort(() => Math.random() - 0.5).flat();
  const ordered = [...repeatItems, ...freshItems].slice(0, size);
  return hpTwinShufflesOptions(delprov) ? ordered.map(shuffleTwinOptions) : ordered;
}

function stopHpTwinTempoInterval(): void {
  if (hpTwinTempoIntervalRef) {
    window.clearInterval(hpTwinTempoIntervalRef);
    hpTwinTempoIntervalRef = null;
  }
}

function updateHpTwinTempoUI(): void {
  if (!hpTwinSession || hpTwinSession.showFeedback) {
    return;
  }
  hpLadderTick(hpTwinSession);
  const el = app.querySelector<HTMLElement>("[data-hp-twin-tempo]");
  if (!el) {
    return;
  }
  const target = hpTwinTempoTarget(hpTwinSession.delprov);
  const elapsed = Math.round((Date.now() - hpTwinSession.questionStartedAt) / 1000);
  el.textContent = `${elapsed}s / ${target}s mål`;
  el.classList.toggle("hp-tempo-over", elapsed > target);
}

function startHpTwinTempoInterval(): void {
  stopHpTwinTempoInterval();
  updateHpTwinTempoUI();
  hpTwinTempoIntervalRef = window.setInterval(updateHpTwinTempoUI, 500);
}

function hpTwinStart(delprov: HpDelprov, skipIntro = false): void {
  if (!skipIntro && (delprov === "NOG" || delprov === "KVA") && !hpTwinIntroSeen(delprov)) {
    hpForceHome = false;
    hpCardOpen = null;
    hpPlanCardDelprov = null;
    hpTwinIntro = { delprov, startAfter: true };
    window.scrollTo(0, 0);
    render();
    return;
  }
  hpForceHome = false;
  hpCardOpen = null;
  hpPlanCardDelprov = null;
  hpHelpOpenFor = null;
  hpTwinSession = {
    delprov,
    items: buildHpTwinPass(delprov),
    currentIndex: 0,
    userAnswer: null,
    showFeedback: false,
    correct: 0,
    withHint: 0,
    wrong: 0,
    questionStartedAt: Date.now(),
    missedItems: [],
    errorTagCounts: {},
    currentTag: null,
    helpedIds: [],
    answerSeconds: 0,
    ...hpNavInit()
  };
  render();
}

function hpTwinAdvanceQuestion(): void {
  if (!hpTwinSession) {
    return;
  }
  if (hpTwinSession.currentTag) {
    const tag = hpTwinSession.currentTag;
    hpTwinSession.errorTagCounts[tag] = (hpTwinSession.errorTagCounts[tag] ?? 0) + 1;
  }
  hpTwinSession.tagLog[hpTwinSession.currentIndex] = hpTwinSession.currentTag;
  hpTwinSession.currentIndex++;
  if (hpTwinSession.currentIndex < hpTwinSession.items.length) {
    hpTwinSession.userAnswer = null;
    hpTwinSession.showFeedback = false;
    hpTwinSession.currentTag = null;
    hpLadderReset(hpTwinSession);
    hpTwinSession.questionStartedAt = Date.now();
  } else {
    hpTwinSaveResult();
  }
  render();
}

/** Räknar utfallet och uppdaterar repetitionskön: bara "utan hjälp" tar bort uppgiften ur kön. */
function hpTwinRecordOutcome(outcome: HpOutcome, item: HpTwin): void {
  const s = hpTwinSession!;
  s.answerSeconds += (Date.now() - s.questionStartedAt) / 1000;
  if (outcome === "clean") {
    s.correct++;
    removeHpTwinRepeatItem(s.delprov, item.id);
  } else {
    if (outcome === "hint") s.withHint++;
    else s.wrong++;
    s.missedItems.push(item);
    addHpTwinRepeatItem(s.delprov, item.id);
  }
  s.currentTag = null;
}

function hpTwinSaveResult(): void {
  if (!hpTwinSession) {
    return;
  }
  const result: HpTwinResult = {
    completedAt: new Date().toISOString(),
    delprov: hpTwinSession.delprov,
    correct: hpTwinSession.correct,
    withHint: hpTwinSession.withHint,
    total: hpTwinSession.items.length - hpTwinSession.unanswered,
    seconds: Math.round(hpTwinSession.answerSeconds),
    errorTags: hpTwinSession.errorTagCounts
  };
  saveHpTwinResult(result);
}

function hpMathSaveResult(): void {
  if (!hpMathSession) {
    return;
  }
  const areas = computeHpMathAreaResults(hpMathSession.answers);
  const correct = hpMathSession.answers.filter((a) => a.outcome === "clean").length;
  const withHint = hpMathSession.answers.filter((a) => a.outcome === "hint").length;
  saveHpMathResult({ completedAt: new Date().toISOString(), correct, withHint, total: hpMathSession.answers.length, areas, questions: hpMathSession.answers });
}

/** Gemensam navigering för ORD, mattediagnos och matteträning: föregående (granskning), tillbaka, hoppa över. */
type HpNavSession = HpNavFields & {
  items: { id: string }[];
  currentIndex: number;
  userAnswer: number | null;
  showFeedback: boolean;
  questionStartedAt: number;
};

function hpNavPrev(s: HpNavSession): void {
  const target = (s.reviewIndex ?? s.currentIndex) - 1;
  if (target < 0) {
    return;
  }
  if (hpAutoAdvanceTimer) {
    window.clearTimeout(hpAutoAdvanceTimer);
    hpAutoAdvanceTimer = null;
  }
  hpHelpOpenFor = null;
  s.reviewIndex = target;
  render();
}

function hpNavBack(s: HpNavSession): void {
  hpHelpOpenFor = null;
  s.reviewIndex = null;
  if (!s.showFeedback) {
    // Tiden i granskningsläget ska inte räknas in i frågans tempo.
    s.questionStartedAt = Date.now();
  }
  render();
}

/** Hoppar över nuvarande fråga: flyttas sist i passet. Är den redan sist avslutas passet med den obesvarad.
 *  Returnerar true om passet avslutades. */
function hpNavSkip(s: HpNavSession): boolean {
  if (s.showFeedback || s.reviewIndex !== null) {
    return false;
  }
  hpHelpOpenFor = null;
  if (s.currentIndex >= s.items.length - 1) {
    s.unanswered = s.items.length - s.currentIndex;
    s.currentIndex = s.items.length;
    return true;
  }
  const [item] = s.items.splice(s.currentIndex, 1);
  s.items.push(item);
  if (!s.skippedIds.includes(item.id)) {
    s.skippedIds.push(item.id);
  }
  s.userAnswer = null;
  hpLadderReset(s);
  s.questionStartedAt = Date.now();
  return false;
}

/** ── Hjälptrappa (beslut 20) ── Strategi (alltid) → Ledtråd (efter fel eller 30 s) → nytt försök → Visa svar. */
const HP_HINT_UNLOCK_SECONDS = 30;

function hpLadderReset(s: HpNavFields): void {
  s.curPicks = [];
  s.hintShown = false;
}

function hpHintUnlocked(s: HpNavSession): boolean {
  return s.hintShown || s.curPicks.length > 0 || (Date.now() - s.questionStartedAt) / 1000 >= HP_HINT_UNLOCK_SECONDS;
}

function hpLadderFinish(s: HpNavSession, userAnswer: number, outcome: HpOutcome, picks: number[]): void {
  const pos = s.currentIndex;
  s.userAnswer = userAnswer;
  s.answerLog[pos] = userAnswer;
  s.triesLog[pos] = picks;
  s.outcomes[pos] = outcome;
  s.showFeedback = true;
}

/** Hanterar ett val. Första felet visar inte rätt svar: valet markeras som fel, ledtråden visas och man får försöka igen ("retry").
 *  Rätt (första försöket utan ledtråd = clean, annars hint) eller andra felet (shown) avslutar frågan. */
function hpLadderAnswer(s: HpNavSession, index: number, correct: number): "retry" | HpOutcome {
  if (index === correct) {
    const outcome: HpOutcome = s.curPicks.length === 0 && !s.hintShown ? "clean" : "hint";
    hpLadderFinish(s, index, outcome, [...s.curPicks, index]);
    return outcome;
  }
  s.curPicks.push(index);
  if (s.curPicks.length === 1) {
    s.hintShown = true;
    return "retry";
  }
  hpLadderFinish(s, index, "shown", [...s.curPicks]);
  return "shown";
}

/** "Visa svar": räknas som visade svar. Utan tidigare val blir userAnswer -1. */
function hpLadderShow(s: HpNavSession): void {
  hpLadderFinish(s, s.curPicks.length > 0 ? s.curPicks[s.curPicks.length - 1] : -1, "shown", [...s.curPicks]);
}

/** Låser upp Ledtråd-knappen utan omritning när 30 s har gått (så att frågan inte flyttar sig). */
function hpLadderTick(s: HpNavSession | null): void {
  if (!s || s.showFeedback || s.hintShown) {
    return;
  }
  const btn = app.querySelector<HTMLButtonElement>("[data-hp-hint-btn]");
  if (btn && btn.disabled && hpHintUnlocked(s)) {
    btn.disabled = false;
    btn.classList.remove("hp-ladder-locked");
    app.querySelector("[data-hp-hint-note]")?.remove();
  }
}

function hpOptionClass(base: string, i: number, correct: number, answered: boolean, picks: number[]): string {
  let cls = base;
  if (answered) {
    if (i === correct) cls += " hp-option-correct";
    else if (picks.includes(i)) cls += " hp-option-wrong";
    else cls += " hp-option-neutral";
  } else if (picks.includes(i)) {
    cls += " hp-option-wrong";
  }
  return cls;
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
  const snapshot = sync.exportSnapshot();
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
    const parsed = JSON.parse(await file.text()) as unknown;
    const changed = sync.importSnapshot(parsed);
    reloadUserState();
    setStorageNotice(`Import klar: ${changed} delar uppdaterade, inget gammalt har tagits bort.`);
  } catch {
    setStorageNotice("Import misslyckades. Kontrollera att filen är en giltig backup.");
  }
}

/** Läser om det som hålls i minnet efter att synk eller import ändrat lagringen. */
function reloadUserState(): void {
  activeSession = loadActiveSession();
  studyProfile = loadStudyProfile(currentUserId);
}

const sync = createSync({
  storage: localStorage,
  fetchFn: (...args) => fetch(...args),
  getUser: () => currentUserId,
  onApplied: () => {
    reloadUserState();
    if (!hpSession && !activeSession) render();
  },
  onStatus: () => {
    const el = document.getElementById("sync-status");
    if (el) el.textContent = sync.statusText();
  }
});
installWriteHook((key) => sync.noteWrite(key));
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden" || document.visibilityState === "visible") {
    void sync.syncNow();
  }
});
void sync.syncNow();

async function connectSync(): Promise<void> {
  const input = document.getElementById("sync-token-input") as HTMLInputElement | null;
  const token = input?.value.trim() ?? "";
  if (!token) {
    setStorageNotice("Klistra in nyckeln först.");
    return;
  }
  const statusEl = document.getElementById("sync-status");
  if (statusEl) statusEl.textContent = "Kopplar …";
  const ok = await sync.connect(token);
  setStorageNotice(ok ? "Kopplad. Din data synkas nu automatiskt." : "Kunde inte koppla. Kontrollera nyckeln (scope: gist).");
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
  const priorityTrack = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const priorityTrackName = getTrackName(priorityTrack);
  const suggestion = createAdaptiveSuggestion(sessions);
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

      <!-- ── HP TEASER ── -->
      <div class="hp-teaser-card span-12">
        <div class="hp-teaser-text">
          <span class="hp-teaser-label">Högskoleprovet — ${hpDaysLeft()} dagar kvar</span>
          <span class="hp-teaser-days">18 okt 2026</span>
        </div>
        <button class="hp-teaser-btn" data-action="nav-goto" data-view="hp">Öppna HP →</button>
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
        ${storageNotice ? `<p class="success" style="margin-top:0.5rem">${storageNotice}</p>` : ""}
      </section>

      <!-- ── ALLA SIDOR ── -->
      <section class="card span-12">
        <h3 class="section-label">Alla sidor</h3>
        <div class="site-index-grid">

          <div class="site-index-group">
            <p class="site-index-group-label">Högskoleprovet</p>
            <button class="site-index-item" data-action="nav-goto" data-view="hp">🎓 HP — hem</button>
          </div>

          <div class="site-index-group">
            <p class="site-index-group-label">Kursinnehåll</p>
            <button class="site-index-item" data-action="nav-goto" data-view="course-prog1a">💻 Programmering 1</button>
            <a class="site-index-item" href="./python-minikurs.html">🐍 Python-minikurs</a>
            <button class="site-index-item" data-action="nav-goto" data-view="course-nackademin_ux">🎨 UX-design</button>
            <button class="site-index-item" data-action="nav-goto" data-view="course-iths_itsec">🔒 IT-säkerhet</button>
          </div>

          <div class="site-index-group">
            <p class="site-index-group-label">Antagningsprov</p>
            <button class="site-index-item" data-action="nav-start-vr">📄 Verbal Reasoning</button>
            <button class="site-index-item" data-action="nav-start-ls">🇸🇪 Språkliga färdigheter</button>
            <a class="site-index-item" href="./symbol-sudoku.html">△ Symbol Sudoku</a>
            <a class="site-index-item" href="./gap-challenge.html">◻ Gap Challenge</a>
            <a class="site-index-item" href="./matrix-lab.html">🔲 Matrix Lab</a>
            <button class="site-index-item" data-action="nav-goto" data-view="logic">🧩 Logik</button>
          </div>

          <div class="site-index-group">
            <p class="site-index-group-label">Prov &amp; Referens</p>
            <button class="site-index-item" data-action="nav-goto" data-view="mock">📋 Fullständiga prov</button>
            <button class="site-index-item" data-action="nav-goto" data-view="bank">📚 Frågebank</button>
            <button class="site-index-item" data-action="nav-goto" data-view="glossary">📖 Ordlista</button>
            <a class="site-index-item" href="./regelverksatlas.html">📜 Regelverksatlas</a>
          </div>

          <div class="site-index-group">
            <p class="site-index-group-label">Verktyg</p>
            <a class="site-index-item" href="./chess-clock.html">♟ Schack-klocka</a>
          </div>

        </div>
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
      ${navItem("🎓", "HP", "nav-goto", 'data-view="hp"', activePage === "hp")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Kursinnehåll</p>
      ${navItem("💻", "Programmering 1", "nav-goto", 'data-view="course-prog1a"', activePage === "course-prog1a")}
      <a class="app-nav-item app-nav-link" href="./python-minikurs.html">
        <span class="app-nav-item-icon">🐍</span>
        <span>Python-minikurs</span>
      </a>
      ${navItem("🎨", "UX-design", "nav-goto", 'data-view="course-nackademin_ux"', activePage === "course-nackademin_ux")}
      ${navItem("🔒", "IT-säkerhet", "nav-goto", 'data-view="course-iths_itsec"', activePage === "course-iths_itsec")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Antagningsprov</p>
      ${navItem("📄", "Verbal Reasoning", "nav-start-vr", "", activeTrainer === "vr")}
      ${navItem("🇸🇪", "Språkliga färdigheter", "nav-start-ls", "", activeTrainer === "ls")}
      <a class="app-nav-item app-nav-link" href="./symbol-sudoku.html">
        <span class="app-nav-item-icon">△</span>
        <span>Symbol Sudoku</span>
      </a>
      <a class="app-nav-item app-nav-link" href="./gap-challenge.html">
        <span class="app-nav-item-icon">◻</span>
        <span>Gap Challenge</span>
      </a>
      <a class="app-nav-item app-nav-link" href="./matrix-lab.html">
        <span class="app-nav-item-icon">🔲</span>
        <span>Matrix Lab</span>
      </a>
      ${navItem("🧩", "Logik", "nav-goto", 'data-view="logic"', activePage === "logic")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Prov & Test</p>
      ${navItem("📋", "Fullständiga prov", "nav-goto", 'data-view="mock"', activePage === "mock")}

      <hr class="app-nav-hr">
      <p class="app-nav-section">Referens</p>
      ${navItem("📚", "Frågebank", "nav-goto", 'data-view="bank"', activePage === "bank")}
      ${navItem("📖", "Ordlista", "nav-goto", 'data-view="glossary"', activePage === "glossary")}
      <a class="app-nav-item app-nav-link" href="./regelverksatlas.html">
        <span class="app-nav-item-icon">📜</span>
        <span>Regelverksatlas</span>
      </a>

      <hr class="app-nav-hr">
      <p class="app-nav-section">Verktyg</p>
      <a class="app-nav-item app-nav-link" href="./chess-clock.html">
        <span class="app-nav-item-icon">♟</span>
        <span>Schack-klocka</span>
      </a>

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
          <hr class="profile-divider">
          <p class="profile-q-label">Utseende</p>
          <div class="profile-pill-row" role="group" aria-label="Färgläge">
            ${(["light", "dark", "auto"] as ColorMode[]).map(mode => `
              <button class="profile-pill-btn ${colorMode === mode ? "profile-pill-btn--active" : ""}"
                data-action="set-color-mode" data-mode="${mode}" aria-pressed="${colorMode === mode}">
                ${COLOR_MODE_LABELS[mode]}
              </button>`).join("")}
          </div>
          <p class="profile-q-label">Hur länge tränar du?</p>
          <div class="profile-pill-row">
            ${["30", "45", "60"].map(min => `
              <button class="profile-pill-btn ${studyProfile.sessionPreference === min ? "profile-pill-btn--active" : ""}"
                data-action="profile-pill" data-profile="sessionPreference" data-value="${min}">
                ${min} min
              </button>`).join("")}
          </div>
          <p class="profile-q-label">Vilken skola siktar du på?</p>
          <select class="profile-select" data-profile="targetPriority">
            ${PROFILE_OPTIONS.targetPriority.map(o => `<option value="${o.id}" ${studyProfile.targetPriority === o.id ? "selected" : ""}>${o.label}</option>`).join("")}
          </select>
          <div class="profile-data-row">
            <button class="secondary" data-action="export-progress">Exportera</button>
            <label class="secondary profile-import-label">Importera
              <input type="file" accept="application/json" data-input="import-progress" style="display:none">
            </label>
          </div>
          <p class="profile-q-label">Synk mellan enheter</p>
          <p class="profile-sync-status" id="sync-status" aria-live="polite">${sync.statusText()}</p>
          ${sync.isConnected() ? `
            <button class="secondary" data-action="sync-now">Synka nu</button>
            <button class="secondary" data-action="sync-disconnect">Koppla från</button>
          ` : `
            <p class="profile-sync-help">1. <a href="${SYNC_TOKEN_URL}" target="_blank" rel="noopener">Skapa nyckel</a> (scope gist är förvald, tryck Generate token). 2. Kopiera och klistra in här. Gör samma på alla enheter.</p>
            <input class="profile-sync-input" id="sync-token-input" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Klistra in GitHub-nyckel">
            <button class="secondary" data-action="sync-connect">Koppla</button>
          `}
          ${storageNotice ? `<p class="success profile-notice">${storageNotice}</p>` : ""}
        </div>
      </details>
    </nav>
  `;
}

/** Om ett ORD-/matte-/tvillingpass pågår i bakgrunden: visa ett "Fortsätt pass"-kort
 *  i stället för start-knapparna, så man inte råkar skriva över pågående framsteg. */
function renderHpActiveResume(): string {
  if (hpSession) {
    const total = hpSession.items.length;
    const at = Math.min(hpSession.currentIndex + 1, total);
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">Ord-drillen — fråga ${at}/${total}</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  if (hpMathSession) {
    const total = hpMathSession.items.length;
    const at = Math.min(hpMathSession.currentIndex + 1, total);
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">Mattediagnos — fråga ${at}/${total}</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  if (hpLasSession) {
    const total = hpLasSession.items.length;
    const at = Math.min(hpLasSession.currentIndex + 1, total);
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">${hpLasHeading(hpLasSession.source, hpLasSession.text)} — fråga ${at}/${total}</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  if (hpMekSession) {
    const total = hpMekSession.items.length;
    const at = Math.min(hpMekSession.currentIndex + 1, total);
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">${hpFull("MEK")} — uppgift ${at}/${total}</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  if (hpFormulaSession) {
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">Formelträning</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  if (hpTwinSession) {
    const total = hpTwinSession.items.length;
    const at = Math.min(hpTwinSession.currentIndex + 1, total);
    const info = HP_TWIN_DELPROV_INFO[hpTwinSession.delprov];
    return `
      <div class="hp-resume-card">
        <p class="hp-resume-label">Pågående pass</p>
        <p class="hp-resume-desc">${info.label} — uppgift ${at}/${total}</p>
        <button class="hp-cta-btn" data-action="hp-resume">Fortsätt pass</button>
      </div>
    `;
  }
  return "";
}

// ── Din plan (beslut 2026-10-05 (9)) ──

function hpPlanTodayKey(): string {
  return HP_PLAN_DEV_DATE ?? localDateKey(new Date());
}

function hpPlanData(): HpPlanData {
  const diag = loadHpMathResult();
  const delprover: HpDelprov[] = ["XYZ", "KVA", "NOG", "DTK"];
  const twin: HpPlanData["twin"] = {};
  for (const d of delprover) {
    const r = loadHpTwinResult(d);
    if (r) twin[d] = { completedAt: r.completedAt, correct: r.correct, total: r.total };
  }
  return {
    formulaCompletedAt: loadHpFormulaState().passes.map((p) => p.completedAt),
    twin,
    lasCompletedAt: Object.values(loadHpLasResults()).map((r) => r.completedAt),
    mekCompletedAt: loadHpMekResults().map((r) => r.completedAt),
    elfCompletedAt: Object.values(loadHpLasResults("elf")).map((r) => r.completedAt),
    diagnosis: diag
      ? {
          completedAt: diag.completedAt,
          hasQuestions: Array.isArray(diag.questions) && diag.questions.length > 0,
          areas: diag.areas.map((a) => ({ area: a.area, level: a.level, correct: a.correct, total: a.total, avgSeconds: a.avgSeconds }))
        }
      : null
  };
}

/** Räknar dagens plan och sparar det som ska sparas: dagens frusna lista och automatiska avbockningar. */
function hpPlanCompute() {
  const todayKey = hpPlanTodayKey();
  const data = hpPlanData();
  const state: HpPlanState = HP_PLAN_DEV_DATE ? hpPlanMemState : loadHpPlanState();
  const plan = buildTodayPlan(todayKey, data, state);
  let changed = false;
  if (plan.phase === "plan" && !state.snapshots[todayKey]) {
    state.snapshots[todayKey] = plan.todayTasks;
    changed = true;
  }
  const fresh = Array.from(new Set(plan.newlyAutoDone));
  if (fresh.length > 0) {
    state.checks[todayKey] = Array.from(new Set([...(state.checks[todayKey] ?? []), ...fresh]));
    changed = true;
  }
  if (changed) {
    if (HP_PLAN_DEV_DATE) hpPlanMemState = state;
    else saveHpPlanState(state);
  }
  return { plan, state, data, todayKey };
}

function hpPlanToggleCheck(taskId: string): void {
  const { plan, state, todayKey } = hpPlanCompute();
  const item = plan.items.find((i) => i.task.id === taskId);
  if (!item || item.autoDone) return;
  if (item.done) {
    // Ta bort manuell avbockning från utdelningsdagen och framåt.
    for (const k of Object.keys(state.checks)) {
      if (k >= item.origin && k <= todayKey) state.checks[k] = state.checks[k].filter((id) => id !== taskId);
    }
  } else {
    state.checks[todayKey] = Array.from(new Set([...(state.checks[todayKey] ?? []), taskId]));
  }
  if (HP_PLAN_DEV_DATE) hpPlanMemState = state;
  else saveHpPlanState(state);
}

const HP_PLAN_CHECK_SVG =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function hpPlanGoButton(item: HpPlanItem): string {
  const a = item.task.action;
  const label = item.task.buttonLabel;
  const cls = "hp-plan-go";
  switch (a.type) {
    case "formler":
      return `<button class="${cls}" data-action="hp-formula-start">${label}</button>`;
    case "las":
      return `<button class="${cls}" data-action="hp-las-start">${label}</button>`;
    case "elf":
      return `<button class="${cls}" data-action="hp-las-start" data-source="elf">${label}</button>`;
    case "mek":
      return `<button class="${cls}" data-action="hp-mek-start">${label}</button>`;
    case "diagnos":
      return `<button class="${cls}" data-action="hp-math-start">${label}</button>`;
    case "train":
      return `<button class="${cls}" data-action="hp-twin-start" data-delprov="${a.delprov}">${label}</button>`;
    case "lar-om":
      return `<button class="${cls}" data-action="hp-plan-card" data-task="${item.task.id}">${label}</button>`;
    case "resources":
      return `<button class="${cls}" data-action="hp-resources-open">${label}</button>`;
    case "flashcards":
      return `<button class="${cls}" data-action="hp-guide-flashcards">${label}</button>`;
    default:
      return "";
  }
}

function renderHpPlanRow(item: HpPlanItem): string {
  const { task } = item;
  const whyOpen = hpPlanWhyOpen.has(task.id);
  const go = item.done ? "" : hpPlanGoButton(item);
  const checkLabel = item.done ? `Klar: ${task.title}` : `Bocka av: ${task.title}`;
  const check = `<button class="hp-plan-check" data-action="hp-plan-check" data-task="${task.id}" aria-pressed="${item.done}" aria-label="${checkLabel}" ${item.autoDone ? "disabled" : ""}><span class="hp-plan-check-box">${item.done ? HP_PLAN_CHECK_SVG : ""}</span></button>`;
  return `
    <li class="hp-plan-row ${item.done ? "hp-plan-row-done" : ""}">
      ${check}
      <div class="hp-plan-text">
        ${item.carried ? `<span class="hp-plan-tag">${item.carriedLabel}</span>` : ""}
        <span class="hp-plan-title">${task.title}</span>
        ${task.sub ? `<span class="hp-plan-sub">${task.sub}</span>` : ""}
        <button class="hp-plan-why-btn" data-action="hp-plan-why" data-task="${task.id}" aria-expanded="${whyOpen}">Varför?</button>
      </div>
      ${go}
      ${whyOpen ? `<p class="hp-plan-why">${task.why}</p>` : ""}
    </li>`;
}

/** Rekommenderad knapp (används som extra efter dagens plan och efter provdagen). */
function renderHpRecButton(rec: ReturnType<typeof recommendHpNext>, cls: string): string {
  if (rec.las) return `<button class="${cls}" data-action="hp-las-start" data-source="${rec.source ?? "las"}" data-text-id="${rec.las.id}">${rec.label}</button>`;
  if (rec.mek) return `<button class="${cls}" data-action="hp-mek-start">${rec.label}</button>`;
  if (rec.delprov) return `<button class="${cls}" data-action="hp-twin-start" data-delprov="${rec.delprov}">${rec.label}</button>`;
  return `<button class="${cls}" data-action="hp-start-pass">${rec.label}</button>`;
}

function renderHpRecommended(wordsToday: number, hasWords: boolean): string {
  const rec = recommendHpNext(wordsToday);
  const ordBtn = (rec.delprov || rec.las || rec.mek) && hasWords ? `<button class="hp-secondary-btn" data-action="hp-start-pass">Dagens 10 ord</button>` : "";
  return `
    <p class="hp-rec-label">Rekommenderat nu</p>
    ${renderHpRecButton(rec, "hp-cta-btn")}
    <p class="hp-rec-reason">${rec.reason}</p>
    ${ordBtn}`;
}

function renderHpPlanSection(progress: { wordsCompleted: number }, hasWords: boolean): string {
  const { plan } = hpPlanCompute();
  if (plan.phase === "exam") {
    return `<section class="hp-plan"><p class="hp-plan-kicker">Provdag</p><p class="hp-plan-done">Lycka till i dag.</p></section>`;
  }
  if (plan.phase === "after") {
    return `<section class="hp-plan"><p class="hp-plan-kicker">Provdag klar</p></section>${renderHpRecommended(progress.wordsCompleted, hasWords)}`;
  }
  const rows = plan.items.map(renderHpPlanRow).join("");
  const kicker = `I dag · dag ${plan.day} av ${HP_PLAN_DAYS} · ${plan.stepName}`;
  let footer = "";
  if (plan.allDone) {
    const rec = recommendHpNext(progress.wordsCompleted);
    footer = `<p class="hp-plan-done">Klart för i dag ✓</p>
      ${renderHpRecButton({ ...rec, label: `Extra: ${rec.label}` }, "hp-secondary-btn hp-plan-extra")}`;
  }
  return `
    <section class="hp-plan" aria-label="Din plan">
      <p class="hp-plan-kicker">${kicker}</p>
      <ul class="hp-plan-list">${rows}</ul>
      ${footer}
      <button class="hp-plan-all-btn" data-action="hp-plan-all">Se hela planen</button>
    </section>`;
}

function renderHpPlanAll(): string {
  const { state, data, todayKey } = hpPlanCompute();
  const rows = buildPlanOverview(todayKey, data, state);
  const groups = HP_PLAN_STEPS.map((step, idx) => {
    const days = rows.filter((r) => r.stepId === step.id);
    if (days.length === 0) return "";
    const startKey = addDays(HP_PLAN_START, step.span[0] - 1);
    const endKey = addDays(HP_PLAN_START, step.span[1] - 1);
    const range = step.span[0] === step.span[1] ? formatPlanDate(startKey) : `${Number(startKey.split("-")[2])}–${formatPlanDate(endKey)}`;
    const items = days
      .map((r) => {
        const cls = ["hp-plan-day", r.isToday ? "hp-plan-day-today" : "", r.complete ? "hp-plan-day-done" : ""].join(" ");
        const mark = r.complete ? `<span class="hp-plan-day-mark" role="img" aria-label="Klar">${HP_PLAN_CHECK_SVG}</span>` : `<span class="hp-plan-day-mark ${r.isPast || r.isToday ? "" : "hp-plan-day-mark-future"}" aria-hidden="true"></span>`;
        return `
          <li class="${cls}" ${r.isToday ? 'aria-current="date"' : ""}>
            ${mark}
            <div class="hp-plan-day-body">
              <span class="hp-plan-day-date">Dag ${r.day} · ${formatPlanWeekday(r.dateKey)} ${formatPlanDate(r.dateKey)}${r.isToday ? ' <span class="hp-plan-day-now">I dag</span>' : ""}</span>
              <span class="hp-plan-day-labels">${r.labels.join(" · ")}</span>
            </div>
          </li>`;
      })
      .join("");
    return `
      <section class="hp-res-group">
        <h3 class="hp-res-heading">Steg ${idx + 1} · ${step.name} · ${range}</h3>
        <ul class="hp-plan-days">${items}</ul>
      </section>`;
  }).join("");
  return `
    <div class="hp-guide-page">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-plan-back">‹ Tillbaka till HP-hem</button>
      </div>
      <h2 class="hp-res-title">Din plan</h2>
      <p class="hp-res-checked">${HP_PLAN_DAYS} dagar · ${formatPlanDate(HP_PLAN_START)}–${formatPlanDate(rows[rows.length - 1].dateKey)} · provet ${formatPlanDate(HP_PLAN_EXAM)}</p>
      ${groups}
    </div>
  `;
}

// ── Formelträning (beslut 2026-10-08 Formelträning) ──
// Lär in (5 nya åt gången + snabbtest), flashcards med successive relearning, missade kort tillbaka längre bak.

interface HpFormulaDraw {
  id: string;
  taskIdx: number;
}

interface HpFormulaSession {
  today: string;
  phase: "cards" | "learn" | "quick" | "summary" | "idle";
  /** Snabb repetition av missade kort efter passet (sparar inget). */
  redo: boolean;
  redoDone: boolean;
  /** Extra övning på redan inlärda formler: sparar inget. */
  practice: boolean;
  queue: HpFormulaDraw[];
  total: number;
  cleared: number;
  tried: string[];
  missed: HpFormulaDraw[];
  lastTask: Record<string, number>;
  flipped: boolean;
  paperOpen: boolean;
  calcOpen: boolean;
  calcOptions: string[];
  calcCorrect: number;
  calcPick: number | null;
  learnIds: string[];
  learnIndex: number;
  quick: { id: string; taskIdx: number; options: string[]; correct: number }[];
  quickIndex: number;
  quickPick: number | null;
  quickRight: number;
  saved: boolean;
}

function hpFormulaDate(): string {
  return localDateKey(new Date());
}

function hpFormulaDrawsFor(ids: string[], lastTask: Record<string, number>): HpFormulaDraw[] {
  return ids.map((id) => {
    const taskIdx = pickFormulaTaskIndex(id in lastTask ? lastTask[id] : null);
    lastTask[id] = taskIdx;
    return { id, taskIdx };
  });
}

function hpFormulaStart(practice = false): void {
  hpForceHome = false;
  hpCardOpen = null;
  hpPlanCardDelprov = null;
  hpHelpOpenFor = null;
  const today = hpFormulaDate();
  const state = loadHpFormulaState();
  let due: string[];
  let learn: string[] = [];
  if (practice) {
    due = HP_FORMULAS.filter((f) => state.cards[f.id])
      .map((f) => f.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, HP_FORMULA_PASS_MAX);
  } else {
    ({ due, learn } = planFormulaPass(HP_FORMULAS, state, today));
  }
  const lastTask: Record<string, number> = {};
  const queue = hpFormulaDrawsFor(due, lastTask);
  hpFormulaSession = {
    today,
    phase: queue.length > 0 ? "cards" : learn.length > 0 ? "learn" : "idle",
    redo: false,
    redoDone: false,
    practice,
    queue,
    total: queue.length,
    cleared: 0,
    tried: [],
    missed: [],
    lastTask,
    flipped: false,
    paperOpen: false,
    calcOpen: false,
    calcOptions: [],
    calcCorrect: 0,
    calcPick: null,
    learnIds: learn,
    learnIndex: 0,
    quick: [],
    quickIndex: 0,
    quickPick: null,
    quickRight: 0,
    saved: false
  };
  window.scrollTo(0, 0);
  render();
}

function hpFormulaFlip(): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "cards" || s.queue.length === 0) return;
  const draw = s.queue[0];
  const task = findFormula(draw.id)!.tasks[draw.taskIdx];
  const shuffledOpts = shuffleOptions(task.answers, task.answerCorrect);
  s.flipped = true;
  s.paperOpen = false;
  s.calcOpen = false;
  s.calcPick = null;
  s.calcOptions = shuffledOpts.options;
  s.calcCorrect = shuffledOpts.correct;
  render();
}

/** Kunde / Kunde inte. Första försöket i passet sparas; ett missat kort läggs tillbaka längre bak tills det klaras en gång. */
function hpFormulaAnswer(known: boolean): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "cards" || !s.flipped || s.queue.length === 0) return;
  const draw = s.queue.shift()!;
  const first = !s.tried.includes(draw.id);
  if (first) s.tried.push(draw.id);
  const persist = !s.redo && !s.practice && first;
  if (persist) saveHpFormulaState(recordFirstTry(loadHpFormulaState(), draw.id, known, s.today));
  if (!known && first && !s.redo) s.missed.push(draw);
  if (known || s.redo) {
    s.cleared++;
  } else {
    const [again] = hpFormulaDrawsFor([draw.id], s.lastTask);
    s.queue.splice(Math.min(s.queue.length, 3), 0, again);
  }
  s.flipped = false;
  s.paperOpen = false;
  s.calcOpen = false;
  s.calcPick = null;
  if (s.queue.length === 0) hpFormulaAfterCards(s);
  render();
  window.scrollTo(0, 0);
}

function hpFormulaAfterCards(s: HpFormulaSession): void {
  if (s.redo) {
    s.redoDone = true;
    s.phase = "summary";
    return;
  }
  if (s.learnIds.length > 0) {
    s.phase = "learn";
    s.learnIndex = 0;
  } else {
    hpFormulaEnterSummary(s);
  }
}

function hpFormulaEnterSummary(s: HpFormulaSession): void {
  s.phase = "summary";
  if (!s.saved && !s.practice) {
    s.saved = true;
    saveHpFormulaState(recordFormulaPass(loadHpFormulaState(), new Date().toISOString()));
  }
}

/** "Jag har läst": nästa lärkort, efter det sista kommer snabbtestet. */
function hpFormulaLearned(): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "learn") return;
  if (s.learnIndex + 1 < s.learnIds.length) {
    s.learnIndex++;
  } else {
    saveHpFormulaState(introduceFormulas(loadHpFormulaState(), s.learnIds, s.today));
    s.quick = s.learnIds
      .map((id) => {
        const taskIdx = pickFormulaTaskIndex(null);
        const task = findFormula(id)!.tasks[taskIdx];
        const o = shuffleOptions(task.names, task.nameCorrect);
        return { id, taskIdx, options: o.options, correct: o.correct };
      })
      .sort(() => Math.random() - 0.5);
    s.quickIndex = 0;
    s.quickPick = null;
    s.quickRight = 0;
    s.phase = "quick";
  }
  render();
  window.scrollTo(0, 0);
}

function hpFormulaQuickPick(index: number): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "quick" || s.quickPick !== null) return;
  s.quickPick = index;
  if (index === s.quick[s.quickIndex].correct) s.quickRight++;
  render();
}

function hpFormulaQuickNext(): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "quick" || s.quickPick === null) return;
  if (s.quickIndex + 1 < s.quick.length) {
    s.quickIndex++;
    s.quickPick = null;
  } else {
    hpFormulaEnterSummary(s);
  }
  render();
  window.scrollTo(0, 0);
}

function hpFormulaRedo(): void {
  const s = hpFormulaSession;
  if (!s || s.phase !== "summary" || s.missed.length === 0) return;
  s.redo = true;
  s.phase = "cards";
  s.queue = s.missed.map((m) => ({ id: m.id, taskIdx: pickFormulaTaskIndex(m.taskIdx) }));
  s.total = s.queue.length;
  s.cleared = 0;
  s.tried = [];
  s.flipped = false;
  render();
  window.scrollTo(0, 0);
}

function hpFormulaProgressNow(): HpFormulaProgress {
  return formulaProgress(HP_FORMULAS, loadHpFormulaState());
}

function renderHpFormulaTop(label: string): string {
  return `
    <div class="hp-drill-top">
      <button class="hp-drill-cancel" data-action="hp-formula-cancel">Avbryt</button>
      <span class="hp-drill-progress">${label}</span>
    </div>
    <p class="hp-drill-title">Formelträning</p>`;
}

function renderHpFormulaCards(s: HpFormulaSession): string {
  const draw = s.queue[0];
  const formula = findFormula(draw.id)!;
  const task = formula.tasks[draw.taskIdx];
  const label = `${s.redo ? "Repetition" : "Kort"} ${Math.min(s.cleared + 1, s.total)}/${s.total}`;
  if (!s.flipped) {
    return `
      <div class="hp-drill hp-fm">
        ${renderHpFormulaTop(label)}
        <p class="hp-fm-cue">Vilken formel behövs, och hur ser den ut?</p>
        <p class="hp-fm-stem">${task.stem}</p>
        <button class="hp-cta-btn hp-fm-wide" data-action="hp-formula-flip">Vänd kortet</button>
      </div>`;
  }
  const clean = loadHpFormulaState().cards[formula.id]?.clean ?? 0;
  const card = findHpCard(formula.area);
  const paper = s.paperOpen ? `<ol class="hp-fm-paper">${formula.paperSteps.map((p) => `<li>${p}</li>`).join("")}</ol>` : "";
  const calcOptions = s.calcOpen
    ? `<div class="hp-options hp-fm-options">${s.calcOptions
        .map((o, i) => {
          const cls = hpOptionClass("hp-option-btn", i, s.calcCorrect, s.calcPick !== null, s.calcPick !== null ? [s.calcPick] : []);
          return `<button class="${cls}" data-action="hp-formula-calc-pick" data-index="${i}" ${s.calcPick !== null ? "disabled" : ""}>${o}</button>`;
        })
        .join("")}</div>
      ${s.calcPick !== null ? `<p class="hp-feedback-hint">${s.calcPick === s.calcCorrect ? "Rätt." : "Fel."} ${task.calc}</p>` : ""}`
    : "";
  return `
    <div class="hp-drill hp-fm">
      ${renderHpFormulaTop(label)}
      <p class="hp-fm-stem hp-fm-stem-small">${task.stem}</p>
      <div class="hp-fm-card">
        <p class="hp-fm-label">Formeln · klarad ${clean} av ${HP_FORMULA_GOAL}</p>
        <h2 class="hp-fm-name">${formula.name}</h2>
        <p class="hp-fm-formula">${formula.formula}</p>
        <p class="hp-fm-line"><strong>I huvudet:</strong> ${formula.headTip}</p>
        <button class="hp-fm-paper-btn" data-action="hp-formula-paper" aria-expanded="${s.paperOpen}"><strong>På papper</strong> <span aria-hidden="true">${s.paperOpen ? "▾" : "▸"}</span></button>
        ${paper}
        <p class="hp-fm-calc">${task.calc}</p>
      </div>
      <div class="hp-fm-actions">
        <button class="hp-secondary-btn" data-action="hp-formula-unknown">Kunde inte</button>
        <button class="hp-cta-btn" data-action="hp-formula-known">Kunde</button>
      </div>
      <div class="hp-fm-extras">
        <button class="hp-card-link" data-action="hp-formula-calc">Räkna själv</button>
        ${card ? `<button class="hp-card-link" data-action="hp-card-open" data-card="${card.id}">Påminn mig ›</button>` : ""}
      </div>
      ${calcOptions}
    </div>`;
}

function renderHpFormulaLearn(s: HpFormulaSession): string {
  const formula = findFormula(s.learnIds[s.learnIndex])!;
  const ex = formula.tasks[0];
  const card = findHpCard(formula.area);
  return `
    <div class="hp-drill hp-fm">
      ${renderHpFormulaTop(`Lär in ${s.learnIndex + 1}/${s.learnIds.length}`)}
      <div class="hp-fm-card">
        <p class="hp-fm-label">Ny formel</p>
        <h2 class="hp-fm-name">${formula.name}</h2>
        <p class="hp-fm-formula">${formula.formula}</p>
        <p class="hp-fm-line"><strong>Varför:</strong> ${formula.why}</p>
        <p class="hp-fm-line"><strong>I huvudet:</strong> ${formula.headTip}</p>
        <p class="hp-fm-line"><strong>Exempel:</strong> ${ex.stem}</p>
        <p class="hp-fm-calc">${ex.calc}</p>
      </div>
      ${card ? `<div class="hp-fm-extras"><button class="hp-card-link" data-action="hp-card-open" data-card="${card.id}">Påminn mig ›</button></div>` : ""}
      <button class="hp-cta-btn hp-fm-wide" data-action="hp-formula-learned">Jag har läst</button>
    </div>`;
}

function renderHpFormulaQuick(s: HpFormulaSession): string {
  const q = s.quick[s.quickIndex];
  const formula = findFormula(q.id)!;
  const task = formula.tasks[q.taskIdx];
  const answered = s.quickPick !== null;
  const options = q.options
    .map((o, i) => {
      const cls = hpOptionClass("hp-option-btn", i, q.correct, answered, answered ? [s.quickPick as number] : []);
      return `<button class="${cls}" data-action="hp-formula-quick-pick" data-index="${i}" ${answered ? "disabled" : ""}>${o}</button>`;
    })
    .join("");
  const last = s.quickIndex + 1 >= s.quick.length;
  return `
    <div class="hp-drill hp-fm">
      ${renderHpFormulaTop(`Snabbtest ${s.quickIndex + 1}/${s.quick.length}`)}
      <p class="hp-fm-cue">Vilken formel behövs?</p>
      <p class="hp-fm-stem">${task.stem}</p>
      <div class="hp-options hp-fm-options">${options}</div>
      ${answered ? `<p class="hp-feedback-hint">${s.quickPick === q.correct ? "Rätt." : "Fel."} Formeln: ${formula.formula}</p><button class="hp-next-btn" data-action="hp-formula-quick-next">${last ? "Se resultat" : "Nästa"}</button>` : ""}
    </div>`;
}

function renderHpFormulaSummary(s: HpFormulaSession): string {
  const p = hpFormulaProgressNow();
  const missed = s.missed
    .map((m) => {
      const f = findFormula(m.id)!;
      return `<li class="hp-fm-missed-item"><strong>${f.name}</strong><span class="hp-fm-missed-formula">${f.formula}</span><span class="hp-fm-missed-calc">${f.tasks[m.taskIdx].calc}</span></li>`;
    })
    .join("");
  const redoBtn = s.missed.length > 0 && !s.redoDone ? `<button class="hp-cta-btn hp-fm-wide" data-action="hp-formula-redo">Kör repetitionen (1 min)</button>` : "";
  const quick = s.quick.length > 0 ? `<p class="hp-fm-sum-line">Snabbtest: ${s.quickRight} av ${s.quick.length} rätt. Nya formler kommer tillbaka i morgon.</p>` : "";
  return `
    <div class="hp-summary hp-fm">
      <p class="hp-summary-heading">${s.practice ? "Extra övning klar" : "Passet klart"}</p>
      <p class="hp-fm-count">${p.done} klara · ${p.left} kvar</p>
      ${quick}
      ${
        s.missed.length > 0
          ? `<div class="hp-missed-list"><p class="hp-missed-heading">Det här missade du</p><ul class="hp-fm-missed">${missed}</ul></div>`
          : s.total > 0 && !s.redoDone
            ? `<p class="hp-summary-clean">Allt på första försöket.</p>`
            : ""
      }
      ${s.redoDone ? `<p class="hp-fm-sum-line">Repetitionen är klar.</p>` : ""}
      ${redoBtn}
      <button class="${redoBtn ? "hp-drill-cancel" : "hp-cta-btn hp-fm-wide"}" data-action="hp-formula-close">${redoBtn ? "Klart för idag" : "Klart"}</button>
    </div>`;
}

function renderHpFormulaIdle(): string {
  const p = hpFormulaProgressNow();
  const allDone = p.left === 0;
  return `
    <div class="hp-summary hp-fm">
      ${renderHpFormulaTop("Formelträning")}
      <p class="hp-summary-heading">${allDone ? "Alla formler klara" : "Klart för i dag"}</p>
      <p class="hp-fm-count">${p.done} klara · ${p.left} kvar</p>
      <p class="hp-fm-sum-line">${allDone ? "Du har klarat varje formel på första försöket tre dagar." : "Inga repetitioner är förfallna och dagens fem nya formler är inlärda. Kom tillbaka i morgon, då kommer de tillbaka."}</p>
      ${p.started > 0 ? `<button class="hp-secondary-btn hp-fm-wide" data-action="hp-formula-practice">Öva extra (räknas inte)</button>` : ""}
      <button class="hp-drill-cancel" data-action="hp-formula-close">Tillbaka</button>
    </div>`;
}

function renderHpFormula(): string {
  const s = hpFormulaSession;
  if (!s) return "";
  switch (s.phase) {
    case "cards":
      return renderHpFormulaCards(s);
    case "learn":
      return renderHpFormulaLearn(s);
    case "quick":
      return renderHpFormulaQuick(s);
    case "summary":
      return renderHpFormulaSummary(s);
    default:
      return renderHpFormulaIdle();
  }
}

/** Ett startkort på HP-hem (beslut 2026-10-09). Tre nivåer: titel + "Starta ›", en rad förklaring, en statusrad.
 *  Hela kortet är en knapp (minst 44 px hög). Samma komponent för alla delprov så likvärdiga kort ser lika ut. */
function renderHpStartCard(attrs: string, title: string, sub: string, meta: string): string {
  return `
    <button class="hp-start-card" ${attrs}>
      <span class="hp-start-card-top"><span class="hp-start-card-title">${title}</span><span class="hp-start-card-go" aria-hidden="true">Starta ›</span></span>
      <span class="hp-start-card-sub">${sub}</span>
      <span class="hp-start-card-meta">${meta}</span>
    </button>`;
}

/** Kortet på HP-hem, först i mattesektionen. */
function renderHpFormulaHomeCard(ready: HpReadyMap): string {
  const state = loadHpFormulaState();
  const plan = planFormulaPass(HP_FORMULAS, state, hpFormulaDate());
  const dueText = plan.due.length > 0 ? `${plan.due.length} att repetera` : plan.learn.length > 0 ? `${plan.learn.length} nya` : "";
  return renderHpStartCard('data-action="hp-formula-start"', "Formelträning", "Formler du behöver kunna utantill · 5 min", hpReadyMeta(ready.FORM, dueText));
}

// ── Kopiera min status (2026-10-10): progress som text att klistra in i chatten med Claude ──
let hpStatusCopied = false;

function hpStatusText(): string {
  const { rows, diag, formula } = hpReadyData();
  const line = (r: HpReadyRow) =>
    `- ${r.short} (${r.name}): ${HP_READY_STATUS_ICON[r.status]} ${HP_READY_STATUS_LABEL[r.status]} · ${r.result} · ${r.tempo}${r.reasonText ? ` · ${r.reasonText}` : ""}`;
  const sum = summarizeReadiness(rows);
  const passes = sortProvPass(loadHpProvlogg()).slice(0, 3);
  const weak = weakestDelprov(loadHpProvlogg());
  const passLines = passes.map(
    (p) => `- ${p.date} ${p.name} (${p.typ}): ${Object.entries(p.scores).map(([id, n]) => `${id} ${n}/${PROV_MAX[id as keyof typeof PROV_MAX]}`).join(", ")}`
  );
  return [
    `Min HP-status ${new Date().toISOString().slice(0, 10)} (user: ${currentUserId})`,
    `${sum.ready} av ${sum.total} redo, ${sum.notTried} inte provade`,
    "",
    "Delprov (senaste resultat):",
    ...rows.map(line),
    line(formula),
    line(diag),
    "",
    "Provpass-logg (senaste 3):",
    ...(passLines.length ? passLines : ["- inga pass inmatade"]),
    weak ? `Svagaste i loggen: ${weak.id} (${weak.percent} %)` : ""
  ].join("\n").trim();
}

async function copyHpStatus(): Promise<void> {
  const text = hpStatusText();
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  hpStatusCopied = true;
  render();
  setTimeout(() => {
    hpStatusCopied = false;
    render();
  }, 2500);
}

// ── Är jag redo? (beslut 2026-10-08) ──

function hpReadyData(): { rows: HpReadyRow[]; diag: HpReadyRow; formula: HpReadyRow } {
  const twin: Parameters<typeof computeReadiness>[0]["twin"] = {};
  for (const d of ["XYZ", "KVA", "NOG", "DTK"] as const) {
    const r = loadHpTwinResult(d);
    if (r) twin[d] = { completedAt: r.completedAt, correct: r.correct, total: r.total, seconds: r.seconds };
  }
  const diagnosis = loadHpMathResult();
  const fp = formulaProgress(HP_FORMULAS, loadHpFormulaState());
  return computeReadiness({
    formula: { total: fp.total, done: fp.done, almost: fp.almost, started: fp.started },
    ord: loadHpOrdResults(),
    las: Object.values(loadHpLasResults()),
    elf: Object.values(loadHpLasResults("elf")),
    mek: loadHpMekResults(),
    twin,
    diagnosis: diagnosis
      ? { hasQuestions: Array.isArray(diagnosis.questions) && diagnosis.questions.length > 0, areas: diagnosis.areas.map((a) => ({ level: a.level })) }
      : null
  });
}

const HP_READY_STATUS_LABEL: Record<HpReadyRow["status"], string> = {
  "inte-provat": "Inte provat",
  under: "Under målet",
  redo: "Redo"
};
const HP_READY_STATUS_ICON: Record<HpReadyRow["status"], string> = { "inte-provat": "○", under: "▲", redo: "✓" };

type HpReadyMap = Partial<Record<HpReadyId, HpReadyRow>>;
function hpReadyMap(): HpReadyMap {
  const { rows, diag, formula } = hpReadyData();
  const map: HpReadyMap = { DIAG: diag, FORM: formula };
  for (const r of rows) map[r.id] = r;
  return map;
}

/** Statuschip + senaste resultat i kort form ("7/10 · 18 s") för ett startkort (beslut 2026-10-09 (2)). */
function hpReadyMeta(row: HpReadyRow | undefined, extra = ""): string {
  if (!row) return extra;
  const chip = `<span class="hp-chip hp-chip-${row.status}"><span aria-hidden="true">${HP_READY_STATUS_ICON[row.status]}</span> ${HP_READY_STATUS_LABEL[row.status]}</span>`;
  let last = "";
  if (row.status !== "inte-provat") {
    last = row.id === "DIAG" || row.id === "FORM" ? row.result : [row.result.replace(" utan hjälp", ""), row.tempo === "–" ? "" : row.tempo.replace(/\/\S+$/, "")].filter(Boolean).join(" · ");
  }
  const rest = [last, extra].filter(Boolean).join(" · ");
  return `${chip}${rest ? `<span class="hp-start-card-last">${rest}</span>` : ""}`;
}

function renderHpHome(): string {
  const daysLeft = hpDaysLeft();
  const progress = loadHpProgress();
  const repeatCount = loadHpRepeatQueue().length;
  const hasWords = HP_WORDS.length > 0;
  const lastMathResult = loadHpMathResult();

  const lastMathHtml = lastMathResult
    ? `<button class="hp-math-last-result" data-action="hp-math-view-last">
        <span class="hp-math-last-result-label">Se senaste diagnos ›</span>
      </button>`
    : "";

  const activeResumeHtml = renderHpActiveResume();

  const hpSection = (title: string, body: string) => `<section class="hp-section"><h2 class="hp-section-title">${title}</h2>${body}</section>`;
  const ready = hpReadyMap();
  const sum = summarizeReadiness(hpReadyData().rows);
  return `
    <div class="hp-home">
      <div class="hp-countdown-card">
        <p class="hp-countdown-label">Dagar kvar till högskoleprovet</p>
        <p class="hp-countdown-value">${daysLeft}</p>
        <p class="hp-countdown-sub">18 okt 2026</p>
      </div>
      ${activeResumeHtml ? "" : renderHpPlanSection(progress, hasWords)}
      ${activeResumeHtml ? "" : `<p class="hp-ready-summary-line">${sum.ready} av ${sum.total} redo · ${sum.notTried} inte ${sum.notTried === 1 ? "provad" : "provade"}</p>
      <div class="hp-status-copy"><button class="hp-card-link" data-action="hp-copy-status">${hpStatusCopied ? "Kopierat ✓ klistra in i chatten" : "Kopiera min status för chatten"}</button></div>`}
      ${activeResumeHtml}
      ${activeResumeHtml
        ? ""
        : `
          ${hpSection("Matte", `${renderHpFormulaHomeCard(ready)}${renderHpTwinHomeSection(ready)}${renderHpDiagHomeCard(ready)}${lastMathHtml}`)}
          ${hpSection("Läsning och språk", `${renderHpLasHomeCard(ready)}${renderHpMekHomeCard(ready)}${renderHpElfHomeCard(ready)}`)}
          ${hpSection("Ord", renderHpOrdHomeCard(ready, progress.wordsCompleted, repeatCount))}
          ${hpSection("Gamla prov", renderHpProvloggHomeCard())}
          ${hpSection("Guide och resurser", `${renderHpGuideHomeSection()}`)}
        `}
    </div>
  `;
}

function renderHpOrdHomeCard(ready: HpReadyMap, wordsToday: number, repeatCount: number): string {
  const extra = [`${wordsToday} ord i dag`, repeatCount > 0 ? `${repeatCount} att repetera` : ""].filter(Boolean).join(" · ");
  return renderHpStartCard('data-action="hp-start-pass"', hpAbbr("ORD"), `${HP_NAMES.ORD.full} · 10 ord`, hpReadyMeta(ready.ORD, extra));
}

function renderHpDiagHomeCard(ready: HpReadyMap): string {
  return renderHpStartCard('data-action="hp-math-start"', "Mattediagnos", "Visar vilka områden du ska lära om · 15 min", hpReadyMeta(ready.DIAG));
}

/** Meningskompletteringskortet. */
function renderHpMekHomeCard(ready: HpReadyMap): string {
  if (HP_MEK_ITEMS.length === 0) {
    return "";
  }
  const passes = loadHpMekResults().length;
  const repeat = loadHpMekRepeatQueue().filter((id) => HP_MEK_ITEMS.some((i) => i.id === id)).length;
  void passes;
  return renderHpStartCard('data-action="hp-mek-start"', hpAbbr("MEK"), `${HP_NAMES.MEK.full} · ${HP_MEK_PASS_SIZE} st, ${Math.round((HP_MEK_PASS_SIZE * HP_MEK_TEMPO_TARGET_SECONDS) / 60)} min`, hpReadyMeta(ready.MEK, repeat > 0 ? `${repeat} att repetera` : ""));
}

function renderHpElfHomeCard(ready: HpReadyMap): string {
  if (HP_ELF_TEXTS.length === 0) {
    return "";
  }
  const results = loadHpLasResults("elf");
  const done = HP_ELF_TEXTS.filter((t) => results[t.id]).length;
  const repeat = loadHpLasRepeatQueue("elf").filter((id) => HP_ELF_TEXTS.some((t) => t.id === id)).length;
  const extra = [done === 0 ? `${HP_ELF_TEXTS.length} texter` : `${done} av ${HP_ELF_TEXTS.length} klara`, repeat > 0 ? `${repeat} att repetera` : ""].filter(Boolean).join(" · ");
  return renderHpStartCard('data-action="hp-las-start" data-source="elf"', hpAbbr("ELF"), HP_NAMES.ELF.full, hpReadyMeta(ready.ELF, extra));
}

function renderHpLasHomeCard(ready: HpReadyMap): string {
  if (HP_LAS_TEXTS.length === 0) {
    return "";
  }
  const results = loadHpLasResults();
  const done = HP_LAS_TEXTS.filter((t) => results[t.id]).length;
  const repeat = loadHpLasRepeatQueue().filter((id) => HP_LAS_TEXTS.some((t) => t.id === id)).length;
  const extra = [done === 0 ? `${HP_LAS_TEXTS.length} texter` : `${done} av ${HP_LAS_TEXTS.length} klara`, repeat > 0 ? `${repeat} att repetera` : ""].filter(Boolean).join(" · ");
  return renderHpStartCard('data-action="hp-las-start"', hpAbbr("LÄS"), HP_NAMES.LÄS.full, hpReadyMeta(ready.LÄS, extra));
}

function renderHpGuideHomeSection(): string {
  return `
    <div class="hp-guide-home-btns">
      <button class="hp-secondary-btn hp-guide-home-btn" data-action="hp-guide-flashcards">Flashcards</button>
      <button class="hp-secondary-btn hp-guide-home-btn" data-action="hp-guide-page">Läs hela guiden</button>
      <button class="hp-secondary-btn hp-guide-home-btn" data-action="hp-guide-cards">Påminnelsekort</button>
      <button class="hp-secondary-btn hp-guide-home-btn" data-action="hp-resources-open">Externa resurser</button>
    </div>
  `;
}

function renderHpTwinHomeSection(ready: HpReadyMap): string {
  // Ordning efter prioritet: NOG, KVA, DTK, XYZ (beslut 2026-10-09).
  const delprover: HpDelprov[] = ["NOG", "KVA", "DTK", "XYZ"];
  return delprover
    .map((delprov) => {
      const sub = `${HP_NAMES[delprov].full} · ${HP_TWIN_PASS_SIZE[delprov]} st`;
      return renderHpStartCard(`data-action="hp-twin-start" data-delprov="${delprov}"`, hpAbbr(delprov), sub, hpReadyMeta(ready[delprov]));
    })
    .join("");
}

/** Enkel markdown-tabellrenderare (header, avdelarrad, datarader) — anpassad för HP_TWINS.table. */
function renderHpTwinTable(markdown: string): string {
  const lines = markdown.trim().split("\n").filter(Boolean);
  if (lines.length < 2) {
    return "";
  }
  const parseRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  const header = parseRow(lines[0]);
  const dataRows = lines.slice(2).map(parseRow);
  return `
    <div class="hp-twin-table-wrap">
      <table class="hp-twin-table">
        <thead><tr>${header.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${dataRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

/** Strategi-knapp i topraden (28 px pill, 44 px träffyta). Allmän metod för delprovet, alltid tillgänglig (beslut 20). */
function renderHpHelpButton(open: boolean): string {
  return `<button class="hp-help-btn ${open ? "hp-help-btn-open" : ""}" data-action="hp-help" aria-label="Strategi" aria-expanded="${open}">Strategi</button>`;
}

/** Ledtrådsraden under svarsalternativen: Ledtråd (låst tills ett fel eller 30 s) och därefter Visa svar.
 *  Raden har fast höjd så att inget hoppar när knappen låses upp. Ledtråden visas i en ruta under raden. */
function renderHpLadder(prefix: string, s: HpNavSession, hintHtml: string, extra = ""): string {
  const unlocked = hpHintUnlocked(s);
  const btn = s.hintShown
    ? `<button class="hp-ladder-btn hp-ladder-show" data-action="${prefix}-show">Visa svar</button>`
    : `<button class="hp-ladder-btn hp-ladder-hint ${unlocked ? "" : "hp-ladder-locked"}" data-action="${prefix}-hint" data-hp-hint-btn ${unlocked ? "" : "disabled"}>Ledtråd</button>${unlocked ? "" : `<span class="hp-ladder-note" data-hp-hint-note>efter ett fel eller ${HP_HINT_UNLOCK_SECONDS} s</span>`}`;
  const box = s.hintShown
    ? `<div class="hp-hint-box" role="status">
        ${s.curPicks.length > 0 ? `<p class="hp-hint-lead">Inte riktigt. Prova igen, eller tryck Visa svar.</p>` : ""}
        <p class="hp-hint-text"><strong>Ledtråd:</strong> ${hintHtml}</p>
        ${extra}
      </div>`
    : "";
  return `<div class="hp-ladder-row">${btn}</div>${box}`;
}

const HP_NO_HINT = "Den här frågan har ingen särskild ledtråd. Öppna Strategi för metoden, eller tryck Visa svar.";

/** Rubrik i feedbacken utifrån utfallet. */
function hpOutcomeTitle(outcome: HpOutcome, userAnswer: number): string {
  if (outcome === "clean") return "Rätt!";
  if (outcome === "hint") return "Rätt, med ledtråd";
  return userAnswer < 0 ? "Här är svaret" : "Fel svar";
}

/** Ärlig räkning, t.ex. "8 utan hjälp · 2 med ledtråd · 1 visade svar". */
function ladderSummary(clean: number, hint: number, shown: number): string {
  const parts = [`${clean} utan hjälp`];
  if (hint > 0) parts.push(`${hint} med ledtråd`);
  if (shown > 0) parts.push(`${shown} visade svar`);
  return `<p class="hp-summary-ladder">${parts.join(" · ")}</p>`;
}

/** Kompakt hjälplager: bara den allmänna metoden för delprovet (ur HP_GUIDE). Frågespecifik ledtråd visas först efter svar. */
function renderHpHelpPanel(categoryId: "ord" | "las" | "mek" | "elf" | "xyz" | "kva" | "nog" | "dtk"): string {
  if (categoryId === "las" || categoryId === "elf") {
    return `
    <div class="hp-help-panel" role="region" aria-label="Hjälp">
      <p class="hp-help-title">${HP_LAS_STRATEGY.title}</p>
      <ol class="hp-help-list">${HP_LAS_STRATEGY.steps.map((t) => `<li>${t}</li>`).join("")}</ol>
      <p class="hp-help-focus"><strong>Fokus:</strong> ${HP_LAS_STRATEGY.focus}</p>
      <button class="hp-help-close" data-action="hp-help">Stäng</button>
    </div>
  `;
  }
  const info = HP_GUIDE_CATEGORIES.find((c) => c.id === categoryId)!;
  const cards = hpGuideCardsForCategory(categoryId).slice(0, 3);
  const steps = cards
    .map((c) => `<li><strong>${c.rubrik}.</strong> ${c.gorSaHar}</li>`)
    .join("");
  return `
    <div class="hp-help-panel" role="region" aria-label="Hjälp">
      <p class="hp-help-title">Så löser du ${info.label.toLowerCase()}</p>
      <ul class="hp-help-list">${steps}</ul>
      ${categoryId === "nog" || categoryId === "kva" ? `<button class="hp-help-intro-link" data-action="hp-twin-intro-open" data-delprov="${categoryId.toUpperCase()}">Visa genomgången</button>` : ""}
      <button class="hp-help-close" data-action="hp-help">Stäng</button>
    </div>
  `;
}

/** Rubrik under topraden: vilken övning och vilket delprov det är (Martins test 2026-10-05). */
function renderHpDrillTitle(text: string): string {
  return `<p class="hp-drill-title">${text}</p>`;
}

/** Progress-text; en överhoppad fråga som kommit tillbaka märks med "(överhoppad)". */
function renderHpProgress(label: string, reviewIndex: number | null, skipped: boolean): string {
  if (reviewIndex !== null) {
    return `<span class="hp-drill-progress">Granskar<span class="hp-drill-progress-sub">${label}</span></span>`;
  }
  return `<span class="hp-drill-progress">${label}${skipped ? `<span class="hp-drill-progress-sub">(överhoppad)</span>` : ""}</span>`;
}

/** Rad med Föregående / Hoppa över (eller Tillbaka till aktuell fråga i granskningsläge).
 *  Synlig pill 28 px, träffyta 44 px via ::after. Ligger direkt under svarsalternativen så frågan,
 *  svaren och stegen syns utan scroll (beslut 6) och inte hamnar i tumzonen för svaren. */
function renderHpNavRow(prefix: string, s: HpNavSession): string {
  const pos = s.reviewIndex ?? s.currentIndex;
  const prevDisabled = pos <= 0;
  const prev = `<button class="hp-nav-btn" data-action="${prefix}-prev" ${prevDisabled ? "disabled" : ""}>← Föregående</button>`;
  if (s.reviewIndex !== null) {
    return `<div class="hp-nav-row">${prev}<button class="hp-nav-btn hp-nav-btn-primary" data-action="${prefix}-review-back">Tillbaka till aktuell fråga</button></div>`;
  }
  if (s.showFeedback) {
    return `<div class="hp-nav-row">${prev}</div>`;
  }
  const isLast = s.currentIndex >= s.items.length - 1;
  return `<div class="hp-nav-row">${prev}<button class="hp-nav-btn" data-action="${prefix}-skip">${isLast ? "Avsluta utan svar →" : "Hoppa över →"}</button></div>`;
}

function renderHpQuestion(): string {
  if (!hpSession) {
    return "";
  }
  const { items, currentIndex, showFeedback, reviewIndex } = hpSession;
  const total = items.length;
  const inReview = reviewIndex !== null;
  const idx = reviewIndex ?? currentIndex;
  const item = items[idx];
  const userAnswer = inReview ? hpSession.answerLog[idx] : hpSession.userAnswer;
  const answered = inReview || showFeedback;
  const isCorrect = answered && userAnswer === item.correct;

  const pips = items
    .map((_, i) => `<span class="hp-pip ${i < currentIndex ? "hp-pip-done" : i === currentIndex ? "hp-pip-active" : ""}"></span>`)
    .join("");

  const optionsHtml = item.options
    .map((opt, i) => {
      let cls = "hp-option-btn";
      if (answered) {
        if (i === item.correct) cls += " hp-option-correct";
        else if (i === userAnswer) cls += " hp-option-wrong";
        else cls += " hp-option-neutral";
      }
      return `<button class="${cls}" data-action="hp-answer" data-index="${i}" ${answered ? "disabled" : ""}>${opt}</button>`;
    })
    .join("");

  const ordExplain = answered
    ? `<p class="hp-feedback-meaning">${item.word} = ${item.options[item.correct]}</p>
          <p class="hp-feedback-explanation">${item.explanation}</p>
          ${item.hint ? `<p class="hp-feedback-think"><strong>Så minns du det:</strong> ${item.hint}</p>` : ""}`
    : "";
  const feedbackHtml = answered
    ? isCorrect
      ? `<div class="hp-feedback hp-feedback-ok">
          ${ordExplain}
          ${inReview ? "" : `<p class="hp-feedback-hint">Tryck för att fortsätta</p>`}
        </div>`
      : `<div class="hp-feedback hp-feedback-wrong">
          ${ordExplain}
          ${inReview ? "" : `<button class="hp-next-btn" data-action="hp-next">Nästa</button>`}
        </div>`
    : "";

  return `
    <div class="hp-drill" ${showFeedback && isCorrect && !inReview ? 'data-action="hp-tap-advance"' : ""}>
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-cancel">Avbryt</button>
        ${renderHpProgress(`Ord ${idx + 1}/${total}`, reviewIndex, !inReview && hpSession.skippedIds.includes(item.id))}
        ${inReview ? "" : `<span class="hp-tempo" data-hp-tempo>0s / ${HP_TEMPO_TARGET_SECONDS}s mål</span>${renderHpHelpButton(hpHelpOpenFor === item.id)}`}
      </div>
      ${renderHpDrillTitle(hpFull("ORD"))}
      <div class="hp-pip-row">${pips}</div>
      <p class="hp-word">${item.word}</p>
      <div class="hp-options">${optionsHtml}</div>
      ${renderHpNavRow("hp", hpSession)}
      ${!inReview && hpHelpOpenFor === item.id ? renderHpHelpPanel("ord") : ""}
      ${feedbackHtml}
    </div>
  `;
}

function helpedSummary(count: number): string {
  return count > 0 ? `<p class="hp-summary-helped">Strategi öppnad på ${count} ${count === 1 ? "fråga" : "frågor"}</p>` : "";
}

function unansweredSummary(count: number): string {
  return count > 0 ? `<p class="hp-summary-helped">Obesvarade: ${count}</p>` : "";
}

function renderHpSummary(): string {
  if (!hpSession) {
    return "";
  }
  const { items, correct, tempoSeconds, missedItems } = hpSession;
  const total = items.length;
  const avgTempo = tempoSeconds.length > 0 ? Math.round(tempoSeconds.reduce((a, b) => a + b, 0) / tempoSeconds.length) : 0;
  const underTarget = avgTempo > 0 && avgTempo <= HP_TEMPO_TARGET_SECONDS;

  return `
    <div class="hp-summary">
      <p class="hp-summary-heading">Passet klart</p>
      <div class="hp-progress-row">
        <div class="stat-widget">
          <span class="stat-widget-label">Rätt</span>
          <span class="stat-widget-value">${correct}<span class="stat-widget-unit">/${total}</span></span>
        </div>
        <div class="stat-widget">
          <span class="stat-widget-label">Snitt-tempo</span>
          <span class="stat-widget-value">${avgTempo}<span class="stat-widget-unit">s/ord</span></span>
          <span class="stat-widget-sub">${underTarget ? "under målet ✓" : `över ${HP_TEMPO_TARGET_SECONDS} s-målet`}</span>
        </div>
      </div>
      ${helpedSummary(hpSession.helpedIds.length)}
      ${unansweredSummary(hpSession.unanswered)}
      ${missedItems.length > 0
        ? `<div class="hp-missed-list">
            <p class="hp-missed-heading">Missade ord — kommer tillbaka i nästa pass</p>
            ${missedItems.map((w) => `<p class="hp-missed-item">${w.word} — ${w.options[w.correct]}</p>`).join("")}
          </div>`
        : `<p class="hp-summary-clean">Inga missade ord — starkt jobbat!</p>`}
      ${(() => {
        const next = suggestNextHpTwinDelprov();
        return `<button class="hp-cta-btn" data-action="hp-twin-start" data-delprov="${next}">Nästa: matte ${next} (${HP_TWIN_PASS_SIZE[next]} uppgifter)</button>`;
      })()}
      <button class="hp-secondary-btn" data-action="hp-start-pass">10 ord till</button>
      <button class="hp-drill-cancel" data-action="hp-close">Klart för idag</button>
    </div>
  `;
}

function renderHpMathQuestion(): string {
  if (!hpMathSession) {
    return "";
  }
  const { items, currentIndex, showFeedback, reviewIndex } = hpMathSession;
  const total = items.length;
  const inReview = reviewIndex !== null;
  const idx = reviewIndex ?? currentIndex;
  const item = items[idx];
  const userAnswer = inReview ? hpMathSession.answerLog[idx] : hpMathSession.userAnswer;
  const answered = inReview || showFeedback;
  const outcome: HpOutcome = answered ? hpMathSession.outcomes[idx] ?? "shown" : "clean";
  const picks = answered ? hpMathSession.triesLog[idx] ?? [] : hpMathSession.curPicks;
  const shownTag = inReview ? hpMathSession.tagLog[idx] ?? null : hpMathSession.currentTag;

  const optionsHtml = item.options
    .map((opt, i) => {
      const cls = hpOptionClass("hp-option-btn", i, item.correct, answered, picks);
      return `<button class="${cls}" data-action="hp-math-answer" data-index="${i}" ${answered || picks.includes(i) ? "disabled" : ""}>${String.fromCharCode(65 + i)}. ${opt}</button>`;
    })
    .join("");

  const feedbackHtml = answered
    ? `<div class="hp-feedback ${outcome === "shown" ? "hp-feedback-wrong" : "hp-feedback-ok"}">
        <p class="hp-feedback-meaning">${hpOutcomeTitle(outcome, userAnswer ?? -1)}</p>
        <div class="hp-math-solution">
          ${item.solutionSteps.map((step) => `<p class="hp-math-solution-step">${step}</p>`).join("")}
          <p class="hp-math-formula">📐 ${item.formula}</p>
        </div>
        ${renderHpThinkBlock(item.hint)}
        ${renderHpCardLinks([item.area])}
        ${outcome === "shown" ? (inReview ? renderHpTagReadOnly(shownTag) : renderHpTagRow(hpMathSession.currentTag)) : ""}
        ${inReview ? "" : `<button class="hp-next-btn" data-action="hp-math-next">Nästa</button>`}
      </div>`
    : "";

  return `
    <div class="hp-drill">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-math-cancel">Avbryt</button>
        ${renderHpProgress(`Fråga ${idx + 1}/${total}`, reviewIndex, !inReview && hpMathSession.skippedIds.includes(item.id))}
        ${inReview ? "" : `<span class="hp-tempo" data-hp-math-tempo>0s / ${HP_MATH_TEMPO_TARGET_SECONDS}s mål</span>${renderHpHelpButton(hpHelpOpenFor === item.id)}`}
      </div>
      ${renderHpDrillTitle("Mattediagnos")}
      <p class="hp-math-area-label">${hpMathAreaLabel(item.area)}</p>
      <p class="hp-word hp-math-prompt">${item.prompt}</p>
      <div class="hp-options">${optionsHtml}</div>
      ${!answered ? renderHpLadder("hp-math", hpMathSession, item.hint ?? HP_NO_HINT) : ""}
      ${renderHpNavRow("hp-math", hpMathSession)}
      ${!inReview && hpHelpOpenFor === item.id ? renderHpHelpPanel("xyz") : ""}
      ${feedbackHtml}
    </div>
  `;
}

const HP_MATH_LEVEL_LABEL: Record<HpMathLevel, string> = {
  "lar-om": "Lär om",
  repetera: "Repetera",
  kan: "Kan"
};

/** "Lär om: 2 områden · Repetera: 3 · Kan: 6" */
function hpMathLevelCounts(areas: HpMathAreaResult[]): string {
  const n = (l: HpMathLevel) => areas.filter((a) => a.level === l).length;
  const lar = n("lar-om");
  return `Lär om: ${lar} ${lar === 1 ? "område" : "områden"} · Repetera: ${n("repetera")} · Kan: ${n("kan")}`;
}

const HP_MATH_OUTCOME_LABEL: Record<HpMathOutcome, string> = {
  clean: "Rätt utan hjälp",
  hint: "Rätt med ledtråd",
  shown: "Visade svar"
};

/** En fråga i granskningen: fråga, ditt svar, rätt svar, utfall, lösning och "Så skulle du ha tänkt". */
function renderHpMathReviewQuestion(q: HpMathQuestionResult): string {
  const bank = HP_MATH_QUESTIONS.find((x) => x.id === q.id);
  const mine = q.picks.length > 0 ? q.picks.join(" → ") : "Visade svaret utan att välja";
  let outcomeLabel = HP_MATH_OUTCOME_LABEL[q.outcome];
  if (q.outcome === "hint" && q.wrongPicks > 0) outcomeLabel = "Fel första försöket, rätt efteråt";
  if (q.outcome === "shown" && q.wrongPicks >= 2) outcomeLabel = "Fel två gånger";
  return `
    <div class="hp-math-review-q">
      <p class="hp-math-review-outcome hp-math-review-${q.outcome}">${outcomeLabel}</p>
      <p class="hp-math-review-prompt">${bank ? bank.prompt : "Frågan finns inte kvar i frågebanken."}</p>
      <p class="hp-math-review-line"><span>Ditt svar</span> ${mine}</p>
      <p class="hp-math-review-line"><span>Rätt svar</span> ${q.correctText}</p>
      ${bank
        ? `<div class="hp-math-solution">
            ${bank.solutionSteps.map((step) => `<p class="hp-math-solution-step">${step}</p>`).join("")}
            <p class="hp-math-formula">📐 ${bank.formula}</p>
          </div>
          ${renderHpThinkBlock(bank.hint)}`
        : ""}
    </div>
  `;
}

/** Område som expanderbar details; är det enda Lär om-området öppet från start; annars syns alla som kompakta rader (44 px) så listan ryms utan scroll. */
function renderHpMathAreaCard(result: HpMathAreaResult, questions: HpMathQuestionResult[] | null, open = false): string {
  const own = questions ? questions.filter((q) => q.area === result.area) : [];
  const areaCard = findHpCard(result.area);
  const learn = `<div class="hp-math-learn-row"><a class="hp-math-learn-link" href="${hpMathAreaLearnUrl(result.area)}" target="_blank" rel="noopener">Lär dig ↗</a>${areaCard ? `<button class="hp-card-link" data-action="hp-card-open" data-card="${areaCard.id}">Påminn mig: ${areaCard.title}</button>` : ""}</div>`;
  const isOpen = hpAreaOpenMemo ? hpAreaOpenMemo.includes(result.area) : open;
  const body = questions === null
    ? learn
    : `${own.map(renderHpMathReviewQuestion).join("")}${learn}`;
  return `
    <details class="hp-guide-section hp-math-area-card" data-area="${result.area}" ${isOpen ? "open" : ""}>
      <summary class="hp-guide-section-summary">
        <span class="hp-math-level-badge hp-math-level-${result.level}">${HP_MATH_LEVEL_LABEL[result.level]}</span>
        <span class="hp-math-area-card-name">${hpMathAreaLabel(result.area)}</span>
        <span class="hp-guide-section-count">${result.correct}/${result.total}</span>
      </summary>
      <div class="hp-guide-section-body">${body}</div>
    </details>
  `;
}

function renderHpMathResultFromData(correct: number, total: number, areas: HpMathAreaResult[], withHint: number | null, questions: HpMathQuestionResult[] | null, helpedCount = 0, tagCounts: Partial<Record<HpTwinErrorTag, number>> = {}, unanswered = 0): string {
  const lärOm = areas.filter((a) => a.level === "lar-om");
  const repetera = areas.filter((a) => a.level === "repetera");
  const kan = areas.filter((a) => a.level === "kan");

  return `
    <div class="hp-summary">
      <p class="hp-summary-heading">Mattediagnos klar</p>
      <p class="hp-math-level-counts">${hpMathLevelCounts(areas)}</p>
      ${questions === null ? `<p class="hp-math-review-missing">Gör om diagnosen för att se dina svar fråga för fråga.</p>` : ""}
      ${withHint === null ? "" : ladderSummary(correct, withHint, total - correct - withHint)}
      ${helpedSummary(helpedCount)}
      ${unansweredSummary(unanswered)}
      ${lärOm.length > 0
        ? `<div class="hp-math-priority-list">
            <p class="hp-missed-heading">Lär om</p>
            ${lärOm.map((a) => renderHpMathAreaCard(a, questions, lärOm.length === 1)).join("")}
          </div>`
        : ""}
      ${repetera.length > 0
        ? `<div class="hp-math-priority-list">
            <p class="hp-missed-heading">Repetera först</p>
            ${repetera.map((a) => renderHpMathAreaCard(a, questions)).join("")}
          </div>`
        : ""}
      ${lärOm.length === 0 && repetera.length === 0 ? `<p class="hp-summary-clean">Alla områden klarade utan hjälp inom tid — starkt jobbat!</p>` : ""}
      <button class="hp-cta-btn" data-action="hp-math-close">Klart</button>
      ${kan.length > 0
        ? `<div class="hp-math-result-scroll">
            <p class="hp-missed-heading">Kan</p>
            ${kan.map((a) => renderHpMathAreaCard(a, questions)).join("")}
          </div>`
        : ""}
      ${(Object.keys(HP_TWIN_TAG_LABEL) as HpTwinErrorTag[]).some((t) => (tagCounts[t] ?? 0) > 0)
        ? `<div class="hp-twin-tag-summary">
            <p class="hp-missed-heading">Felanalys</p>
            ${(Object.keys(HP_TWIN_TAG_LABEL) as HpTwinErrorTag[]).filter((t) => (tagCounts[t] ?? 0) > 0).map((t) => `<div class="hp-twin-tag-summary-row"><span>${HP_TWIN_TAG_LABEL[t]}</span><span>${tagCounts[t]}</span></div>`).join("")}
          </div>`
        : ""}
    </div>
  `;
}

function renderHpMathResult(): string {
  if (!hpMathSession) {
    return "";
  }
  const areas = computeHpMathAreaResults(hpMathSession.answers);
  const correct = hpMathSession.answers.filter((a) => a.outcome === "clean").length;
  const total = hpMathSession.answers.length;
  const withHint = hpMathSession.answers.filter((a) => a.outcome === "hint").length;
  return renderHpMathResultFromData(correct, total, areas, withHint, hpMathSession.answers, hpMathSession.helpedIds.length, hpMathSession.errorTagCounts, hpMathSession.unanswered);
}

function renderHpMathSavedResult(): string {
  const result = loadHpMathResult();
  if (!result) {
    return renderHpHome();
  }
  return renderHpMathResultFromData(result.correct, result.total, result.areas, result.withHint ?? null, result.questions ?? null);
}

const HP_TWIN_TAG_LABEL: Record<HpTwinErrorTag, string> = {
  slarv: "Slarv",
  "kunde-inte": "Kunde inte",
  missforstod: "Missförstod"
};

/** "Så skulle du ha tänkt": frågespecifik ledtråd, visas först efter svar. */
/** Max 2 påminnelsekort för en fråga: områdets kort först, sedan delprovets strategikort (KVA/NOG/DTK). */
function hpCardsFor(keys: string[]): HpCard[] {
  const found: HpCard[] = [];
  for (const k of keys) {
    const c = findHpCard(k);
    if (c && !found.includes(c)) found.push(c);
  }
  return found.slice(0, 2);
}

/** Länkar "Påminn mig: [titel]" i feedbacken. Visas bara efter svar (beslut 2026-10-05 (6)). */
function renderHpCardLinks(keys: string[]): string {
  const cards = hpCardsFor(keys);
  if (cards.length === 0) return "";
  return `<div class="hp-card-links">${cards
    .map((c) => `<button class="hp-card-link" data-action="hp-card-open" data-card="${c.id}">Påminn mig: ${hpExpand(c.title)}</button>`)
    .join("")}</div>`;
}

function renderHpCard(card: HpCard): string {
  return `
    <div class="hp-card">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-card-back">← Tillbaka</button>
        <span class="hp-drill-progress">Påminnelsekort</span>
      </div>
      <h2 class="hp-card-title">${hpExpand(card.title)}</h2>
      ${card.formula ? `<p class="hp-card-formula">${card.formula}</p>` : ""}
      ${card.svg ? `<div class="hp-card-figure">${hpExpand(card.svg)}</div>` : ""}
      <div class="hp-card-block">
        <p class="hp-card-label">Varför</p>
        <p class="hp-card-text">${hpExpand(card.why)}</p>
      </div>
      <div class="hp-card-block">
        <p class="hp-card-label">Exempel</p>
        <p class="hp-card-text hp-card-prompt">${hpExpand(card.example.prompt)}</p>
        <ol class="hp-card-steps">${card.example.steps.map((st) => `<li>${hpExpand(st)}</li>`).join("")}</ol>
      </div>
      <div class="hp-card-block hp-card-trap">
        <p class="hp-card-label">Fällan på provet</p>
        <p class="hp-card-text">${hpExpand(card.trap)}</p>
      </div>
      <a class="hp-card-extlink" href="${card.link.url}" target="_blank" rel="noopener">${hpExpand(card.link.label)} ↗</a>
      ${hpPlanCardDelprov ? `<button class="hp-cta-btn hp-plan-card-cta" data-action="hp-twin-start" data-delprov="${hpPlanCardDelprov}">Nu ett pass: ${HP_DELPROV_NAMES[hpPlanCardDelprov].toLowerCase()}</button>` : ""}
    </div>
  `;
}

/** Guidens lista med alla påminnelsekort. */
function renderHpCardList(): string {
  return `
    <div class="hp-guide-page">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-guide-cancel">Avbryt</button>
        <span class="hp-drill-progress">Påminnelsekort · ${HP_CARDS.length}</span>
      </div>
      <div class="hp-card-list">
        ${HP_CARDS.map((c) => `<button class="hp-card-list-item" data-action="hp-card-open" data-card="${c.id}"><span>${hpExpand(c.title)}</span><span class="hp-card-list-go" aria-hidden="true">›</span></button>`).join("")}
      </div>
    </div>
  `;
}

function renderHpThinkBlock(hint: string | undefined): string {
  return hint ? `<p class="hp-feedback-think"><strong>Så skulle du ha tänkt:</strong> ${hint}</p>` : "";
}

/** "Varför blev det fel?" med Slarv / Kunde inte / Missförstod. */
function renderHpTagRow(current: HpTwinErrorTag | null, action = "hp-math-tag"): string {
  return `<p class="hp-feedback-why">Varför blev det fel?</p>
      <div class="hp-twin-tag-row">
        ${(Object.keys(HP_TWIN_TAG_LABEL) as HpTwinErrorTag[])
          .map(
            (tag) =>
              `<button class="hp-twin-tag-btn ${current === tag ? "hp-twin-tag-selected" : ""}" data-action="${action}" data-tag="${tag}">${HP_TWIN_TAG_LABEL[tag]}</button>`
          )
          .join("")}
      </div>`;
}

/** Granskningsläge: visar vilken felkategori man valde, utan att den går att ändra. */
function renderHpTagReadOnly(tag: HpTwinErrorTag | null): string {
  return tag ? `<p class="hp-feedback-why">Du valde: ${HP_TWIN_TAG_LABEL[tag]}</p>` : "";
}

function renderHpTwinQuestion(): string {
  if (!hpTwinSession) {
    return "";
  }
  const { items, currentIndex, showFeedback, delprov, reviewIndex } = hpTwinSession;
  const total = items.length;
  const inReview = reviewIndex !== null;
  const idx = reviewIndex ?? currentIndex;
  const item = items[idx];
  const userAnswer = inReview ? hpTwinSession.answerLog[idx] : hpTwinSession.userAnswer;
  const answered = inReview || showFeedback;
  const outcome: HpOutcome = answered ? hpTwinSession.outcomes[idx] ?? "shown" : "clean";
  const picks = answered ? hpTwinSession.triesLog[idx] ?? [] : hpTwinSession.curPicks;
  const target = hpTwinTempoTarget(delprov);
  const shownTag = inReview ? hpTwinSession.tagLog[idx] ?? null : hpTwinSession.currentTag;

  const optionsHtml = item.options
    .map((opt, i) => {
      const cls = hpOptionClass("hp-option-btn", i, item.correct, answered, picks);
      return `<button class="${cls}" data-action="hp-twin-answer" data-index="${i}" ${answered || picks.includes(i) ? "disabled" : ""}>${opt}</button>`;
    })
    .join("");

  const tagRowHtml = answered && outcome === "shown" ? (inReview ? renderHpTagReadOnly(shownTag) : renderHpTagRow(shownTag, "hp-twin-tag")) : "";

  const feedbackHtml = answered
    ? `<div class="hp-feedback ${outcome === "shown" ? "hp-feedback-wrong" : "hp-feedback-ok"}">
        <p class="hp-feedback-meaning">${hpOutcomeTitle(outcome, userAnswer ?? -1)}</p>
        <p class="hp-feedback-explanation">${item.solution}</p>
        ${renderHpThinkBlock(item.hint)}
        ${renderHpCardLinks([item.area, item.delprov])}
        ${tagRowHtml}
        <a class="hp-twin-original-link" href="${item.twinOf.url}" target="_blank" rel="noopener">Se originaluppgiften (${item.twinOf.prov}, provpass ${item.twinOf.provpass}, uppgift ${item.twinOf.uppgift}) ↗</a>
        ${inReview ? "" : `<button class="hp-next-btn" data-action="hp-twin-next">Nästa</button>`}
      </div>`
    : "";

  return `
    <div class="hp-drill">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-twin-cancel">Avbryt</button>
        ${renderHpProgress(`${hpShort(delprov)} ${idx + 1}/${total}`, reviewIndex, !inReview && hpTwinSession.skippedIds.includes(item.id))}
        ${inReview ? "" : `<span class="hp-tempo" data-hp-twin-tempo>0s / ${target}s mål</span>${renderHpHelpButton(hpHelpOpenFor === item.id)}`}
      </div>
      ${renderHpDrillTitle(HP_DELPROV_NAMES[delprov])}
      ${item.figure ? `<div class="hp-twin-figure${hpFigureZoom ? " hp-twin-figure--zoom" : ""}" data-action="hp-figure-zoom" role="button" aria-label="${hpFigureZoom ? "Förminska figuren" : "Förstora figuren"}">${item.figure}</div><p class="hp-twin-figure-hint">${hpFigureZoom ? "Tryck på figuren för att förminska" : "Tryck på figuren för att förstora"}</p>` : ""}
      <p class="hp-twin-prompt">${item.prompt}</p>
      ${item.table ? renderHpTwinTable(item.table) : ""}
      <div class="hp-options">${optionsHtml}</div>
      ${!answered ? renderHpLadder("hp-twin", hpTwinSession, item.hint ?? HP_NO_HINT) : ""}
      ${renderHpNavRow("hp-twin", hpTwinSession)}
      ${!inReview && hpHelpOpenFor === item.id ? renderHpHelpPanel(delprov.toLowerCase() as "xyz" | "kva" | "nog" | "dtk") : ""}
      ${feedbackHtml}
    </div>
  `;
}

function renderHpTwinSummary(): string {
  if (!hpTwinSession) {
    return "";
  }
  const { items, correct, missedItems, delprov, errorTagCounts } = hpTwinSession;
  const total = items.length;
  const tagEntries = (Object.keys(HP_TWIN_TAG_LABEL) as HpTwinErrorTag[])
    .map((tag) => ({ tag, count: errorTagCounts[tag] ?? 0 }))
    .filter((entry) => entry.count > 0);

  return `
    <div class="hp-summary">
      <p class="hp-summary-heading">${HP_DELPROV_NAMES[delprov]} — passet klart</p>
      <div class="hp-progress-row">
        <div class="stat-widget">
          <span class="stat-widget-label">Utan hjälp</span>
          <span class="stat-widget-value">${correct}<span class="stat-widget-unit">/${total}</span></span>
        </div>
        <div class="stat-widget">
          <span class="stat-widget-label">Visade svar</span>
          <span class="stat-widget-value">${hpTwinSession.wrong}</span>
        </div>
      </div>
      ${ladderSummary(correct, hpTwinSession.withHint, hpTwinSession.wrong)}
      ${helpedSummary(hpTwinSession.helpedIds.length)}
      ${unansweredSummary(hpTwinSession.unanswered)}
      ${tagEntries.length > 0
        ? `<div class="hp-twin-tag-summary">
            <p class="hp-missed-heading">Felanalys</p>
            ${tagEntries.map((entry) => `<div class="hp-twin-tag-summary-row"><span>${HP_TWIN_TAG_LABEL[entry.tag]}</span><span>${entry.count}</span></div>`).join("")}
          </div>`
        : ""}
      ${missedItems.length > 0
        ? `<div class="hp-missed-list">
            <p class="hp-missed-heading">Behövde hjälp — kommer tillbaka i nästa pass</p>
            ${missedItems.map((t) => `<p class="hp-missed-item">${t.area}</p>`).join("")}
          </div>`
        : `<p class="hp-summary-clean">Alla utan hjälp — starkt jobbat!</p>`}
      <button class="hp-cta-btn" data-action="hp-twin-close">Klart</button>
    </div>
  `;
}

// ── MEK: rendering ──

/** Texten med luckorna markerade. Med `fills` sätts orden in i luckorna (ok = rätt ord, wrong = ett val som inte stämde). */
function renderHpMekText(item: HpMekItem, fills: string[] | null, tone: "ok" | "wrong" | null): string {
  const multi = (item.text.match(/___/g) ?? []).length > 1;
  let n = 0;
  return item.text.replace(/___/g, () => {
    const i = n++;
    if (fills && fills[i] !== undefined) {
      return `<span class="hp-mek-fill hp-mek-fill-${tone ?? "ok"}">${fills[i]}</span>`;
    }
    return `<span class="hp-mek-gap" role="img" aria-label="lucka ${i + 1}">${multi ? i + 1 : ""}</span>`;
  });
}

function hpMekFills(item: HpMekItem, i: number): string {
  return item.options[i].fills.join(" – ");
}

function renderHpMekFeedback(item: HpMekItem, userAnswer: number, inReview: boolean): string {
  const s = hpMekSession!;
  const idx = s.reviewIndex ?? s.currentIndex;
  const outcome: HpOutcome = s.outcomes[idx] ?? "shown";
  const picked = userAnswer >= 0;
  const showAll = hpMekShowAllFor === item.id;
  const L = (i: number) => HP_LAS_LETTERS[i];
  let whyHtml: string;
  if (showAll) {
    whyHtml = `<div class="hp-las-all">${item.options
      .map((opt, i) => {
        const cls = i === item.correct ? "hp-las-all-ok" : i === userAnswer ? "hp-las-all-wrong" : "";
        const mark = i === item.correct ? "Rätt" : i === userAnswer ? "Du valde" : "";
        return `<div class="hp-las-all-item ${cls}"><p class="hp-las-all-head"><strong>${L(i)}.</strong> ${hpMekFills(item, i)}${mark ? `<span class="hp-las-all-mark">${mark}</span>` : ""}</p><p class="hp-las-why">${opt.why}</p></div>`;
      })
      .join("")}</div>`;
  } else {
    whyHtml = `${outcome !== "shown" || !picked ? "" : `<p class="hp-las-why"><strong>Du valde ${L(userAnswer)} (${hpMekFills(item, userAnswer)}):</strong> ${item.options[userAnswer].why}</p>`}
        <p class="hp-las-why"><strong>Rätt svar ${L(item.correct)} (${hpMekFills(item, item.correct)}):</strong> ${item.options[item.correct].why}</p>`;
  }
  // Valde man fel visas hur meningen låter med rätt ord, så att rätt version hörs i huvudet.
  const rightSentence = outcome === "shown" && picked
    ? `<p class="hp-mek-right"><span class="hp-mek-right-label">Så här låter det rätt</span>${renderHpMekText(item, item.options[item.correct].fills, "ok")}</p>`
    : "";
  const last = s.currentIndex >= s.items.length - 1;
  return `<div class="hp-feedback ${outcome === "shown" ? "hp-feedback-wrong" : "hp-feedback-ok"}">
      <p class="hp-feedback-meaning">${hpOutcomeTitle(outcome, userAnswer)}</p>
      ${rightSentence}
      ${whyHtml}
      <button class="hp-las-linkbtn" data-action="hp-mek-all">${showAll ? "Dölj alla alternativ" : "Se alla alternativ"}</button>
      ${inReview ? "" : `<button class="hp-next-btn" data-action="hp-mek-next">${last ? "Se sammanfattning" : "Nästa"}</button>`}
    </div>`;
}

function renderHpMekQuestion(): string {
  if (!hpMekSession) {
    return "";
  }
  const s = hpMekSession;
  const inReview = s.reviewIndex !== null;
  const idx = s.reviewIndex ?? s.currentIndex;
  const item = s.items[idx];
  const userAnswer = inReview ? s.answerLog[idx] : s.userAnswer;
  const answered = inReview || s.showFeedback;
  const picks = answered ? s.triesLog[idx] ?? [] : s.curPicks;
  const lastPick = answered ? (userAnswer !== null && userAnswer >= 0 ? userAnswer : -1) : picks.length > 0 ? picks[picks.length - 1] : -1;

  // Efter ett val sätts de valda orden in i luckorna, så att man hör hur det låter.
  let textHtml: string;
  if (lastPick >= 0) {
    const right = lastPick === item.correct;
    textHtml = renderHpMekText(item, item.options[lastPick].fills, right ? "ok" : "wrong");
  } else if (answered) {
    textHtml = renderHpMekText(item, item.options[item.correct].fills, "ok");
  } else {
    textHtml = renderHpMekText(item, null, null);
  }

  const optionsHtml = item.options
    .map((_, i) => {
      const cls = hpOptionClass("hp-option-btn hp-las-opt", i, item.correct, answered, picks);
      return `<button class="${cls}" data-action="hp-mek-answer" data-index="${i}" ${answered || picks.includes(i) ? "disabled" : ""}><span class="hp-las-letter">${HP_LAS_LETTERS[i]}</span><span>${hpMekFills(item, i)}</span></button>`;
    })
    .join("");

  const helpHtml = !inReview && hpHelpOpenFor === item.id ? renderHpHelpPanel("mek") : "";
  return `
    <div class="hp-drill hp-mek">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-mek-cancel">Avbryt</button>
        ${renderHpProgress(`${hpShort("MEK")} ${idx + 1}/${s.items.length}`, s.reviewIndex, !inReview && s.skippedIds.includes(item.id))}
        ${inReview ? "" : `<span class="hp-tempo" data-hp-mek-tempo>0s / ${HP_MEK_TEMPO_TARGET_SECONDS}s mål</span>${renderHpHelpButton(hpHelpOpenFor === item.id)}`}
      </div>
      ${renderHpDrillTitle(hpFull("MEK"))}
      <p class="hp-mek-text" aria-live="polite">${textHtml}</p>
      <div class="hp-options">${optionsHtml}</div>
      ${!answered ? renderHpLadder("hp-mek", s, item.hint) : ""}
      ${renderHpNavRow("hp-mek", s)}
      ${helpHtml}
      ${answered ? renderHpMekFeedback(item, userAnswer as number, inReview) : ""}
    </div>
  `;
}

function renderHpMekSummary(): string {
  if (!hpMekSession) {
    return "";
  }
  const s = hpMekSession;
  const answeredTotal = s.items.length - s.unanswered;
  const seconds = Math.round(((s.finishedAt ?? Date.now()) - s.startedAt) / 1000);
  const avg = answeredTotal > 0 ? Math.round(seconds / answeredTotal) : 0;
  const underTarget = avg > 0 && avg <= HP_MEK_TEMPO_TARGET_SECONDS;
  return `
    <div class="hp-summary">
      <p class="hp-summary-heading">${hpFull("MEK")} — klart</p>
      <div class="hp-progress-row">
        <div class="stat-widget">
          <span class="stat-widget-label">Utan hjälp</span>
          <span class="stat-widget-value">${s.correct}<span class="stat-widget-unit">/${answeredTotal}</span></span>
        </div>
        <div class="stat-widget">
          <span class="stat-widget-label">Snitt-tempo</span>
          <span class="stat-widget-value">${avg}<span class="stat-widget-unit">s/uppgift</span></span>
          <span class="stat-widget-sub">${underTarget ? "under målet ✓" : `över ${HP_MEK_TEMPO_TARGET_SECONDS} s-målet`}</span>
        </div>
      </div>
      ${ladderSummary(s.correct, s.withHint, s.wrong)}
      ${helpedSummary(s.helpedIds.length)}
      ${unansweredSummary(s.unanswered)}
      ${s.missedItems.length > 0
        ? `<div class="hp-missed-list">
            <p class="hp-missed-heading">Behövde hjälp — kommer tillbaka i nästa pass</p>
            ${s.missedItems.map((i) => `<p class="hp-missed-item">${renderHpMekText(i, i.options[i.correct].fills, "ok")}</p>`).join("")}
          </div>`
        : `<p class="hp-summary-clean">Alla utan hjälp — starkt jobbat!</p>`}
      <button class="hp-cta-btn" data-action="hp-mek-start">10 till</button>
      <button class="hp-drill-cancel" data-action="hp-mek-close">Klart för idag</button>
    </div>
  `;
}

const HP_LAS_TAG_LABEL: Record<HpLasErrorTag, string> = {
  "missad-detalj": "Missade detalj",
  feltolkat: "Feltolkade",
  tidsbrist: "Tidsbrist"
};

const HP_LAS_TAG_COACH: Record<HpLasErrorTag, string> = {
  "missad-detalj": "Svaret fanns i texten men du hittade det inte. Prova sökläsning härnäst: leta bara efter det frågan frågar om.",
  feltolkat: "Du läste rätt ställe men drog fel slutsats. Läs meningen före och efter en gång till innan du väljer.",
  tidsbrist: "Du gissade för att tiden rann iväg. Öva på att skumma snabbare i första läsningen."
};

const HP_LAS_TYPE_LABEL: Record<HpLasQuestionType, string> = {
  huvudtanke: "Huvudtanke",
  detalj: "Detalj",
  slutsats: "Slutsats",
  syfte: "Författarens syfte",
  ordbetydelse: "Ord i sammanhang"
};

const HP_LAS_LETTERS = ["A", "B", "C", "D"];

function renderHpLasTagRow(current: HpLasErrorTag | null): string {
  return `<p class="hp-feedback-why">Varför blev det fel?</p>
      <div class="hp-twin-tag-row">
        ${(Object.keys(HP_LAS_TAG_LABEL) as HpLasErrorTag[])
          .map(
            (tag) =>
              `<button class="hp-twin-tag-btn ${current === tag ? "hp-twin-tag-selected" : ""}" data-action="hp-las-tag" data-tag="${tag}">${HP_LAS_TAG_LABEL[tag]}</button>`
          )
          .join("")}
      </div>`;
}

/** Sticky rad överst: topprad (Avbryt, progress, tempo mot textens budget, ?) och en växlare Fråga / Text.
 *  Tempot syns hela tiden, även när man läser texten. */
function renderHpLasBar(item: HpLasQuestion, idx: number): string {
  const s = hpLasSession!;
  const inReview = s.reviewIndex !== null;
  const textView = hpLasView === "text";
  const over = hpLasElapsedSeconds() > hpLasBudgetSeconds(s.text);
  const segQ = textView
    ? `<button class="hp-las-seg" data-action="hp-las-view" data-las-view="fraga">Till frågan</button>`
    : `<button class="hp-las-seg hp-las-seg-on" aria-pressed="true" data-action="hp-las-view" data-las-view="fraga">Frågan</button>`;
  const segT = textView
    ? `<button class="hp-las-seg hp-las-seg-on" aria-pressed="true" data-action="hp-las-view" data-las-view="text">Texten</button>`
    : `<button class="hp-las-seg" data-action="hp-las-view" data-las-view="text">Visa texten</button>`;
  return `
    <div class="hp-las-bar">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-las-cancel">Avbryt</button>
        ${renderHpProgress(`${hpShort(s.source === "elf" ? "ELF" : "LÄS")} fråga ${idx + 1}/${s.items.length}`, s.reviewIndex, !inReview && s.skippedIds.includes(item.id))}
        <span class="hp-tempo ${over ? "hp-tempo-over" : ""}" data-hp-las-tempo>${hpLasTempoText()}</span>
        ${inReview ? "" : renderHpHelpButton(hpHelpOpenFor === item.id)}
      </div>
      ${textView ? "" : renderHpDrillTitle(hpLasHeading(s.source, s.text))}
      <div class="hp-las-switch" role="group" aria-label="Växla mellan fråga och text">${segQ}${segT}</div>
      ${textView ? `<p class="hp-las-reminder"><strong>Fråga ${idx + 1}:</strong> ${item.prompt}</p>` : ""}
      ${inReview ? "" : `<p class="hp-time-banner ${hpLasQuestionOver() ? "hp-time-banner-on" : ""}" data-hp-las-banner role="status">Tiden för frågan är slut – stryk det som är fel, gissa och gå vidare</p>`}
    </div>
  `;
}

/** Introskärm för NOG/KVA: ovanligt format, förklaras med ett genomräknat exempel (worked example, Sweller). */
function renderHpTwinIntro(): string {
  const intro = hpTwinIntro!;
  const nog = intro.delprov === "NOG";
  const c = nog ? HP_NOG_INTRO : HP_KVA_INTRO;
  const opts = c.options
    .map(([letter, text]) => `<li><span class="hp-twin-intro-letter">${letter}</span><span>${text}</span></li>`)
    .join("");
  const lead = nog ? `<p class="hp-twin-intro-lead">${HP_NOG_INTRO.optionsLead}</p>` : "";
  const steps = c.steps.map((t) => `<li>${t}</li>`).join("");
  const claims = c.example.claims
    .map((t, i) => `<li>${nog ? `<span class="hp-twin-intro-claim-n">(${i + 1})</span>` : ""}<span>${t}</span></li>`)
    .join("");
  const walk = c.example.walk.map((t) => `<li>${t}</li>`).join("");
  const traps = c.traps.map((t) => `<li>${t}</li>`).join("");
  return `
    <div class="hp-drill hp-twin-intro">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-twin-intro-close">${intro.startAfter ? "Tillbaka" : "Stäng"}</button>
      </div>
      <p class="hp-ready-kicker">${c.kicker}</p>
      <h2 class="hp-las-intro-title">${c.title}</h2>
      <p class="hp-twin-intro-sub">${c.sub}</p>
      <p class="hp-twin-intro-goal">${c.goal}</p>
      ${lead}
      <ul class="hp-twin-intro-options">${opts}</ul>
      <div class="hp-twin-intro-card">
        <p class="hp-twin-intro-h">${c.stepsTitle}</p>
        <ol class="hp-twin-intro-list">${steps}</ol>
      </div>
      <div class="hp-twin-intro-card">
        <p class="hp-twin-intro-h">${c.example.title}</p>
        <p class="hp-twin-intro-q">${c.example.question}</p>
        <ul class="hp-twin-intro-claims">${claims}</ul>
        <ul class="hp-twin-intro-walk">${walk}</ul>
        <p class="hp-twin-intro-answer">${c.example.answer}</p>
      </div>
      <div class="hp-twin-intro-traps">
        <p class="hp-twin-intro-h">${c.trapsTitle}</p>
        <ul class="hp-twin-intro-list">${traps}</ul>
      </div>
      <div class="hp-twin-intro-actions">
        <button class="hp-cta-btn" data-action="hp-twin-intro-go">${intro.startAfter ? "Jag fattar – kör" : "Jag fattar"}</button>
      </div>
    </div>
  `;
}

/** Introskärmen "Så läser du": strategin på en skärm, en knapp. Visas första gången (och går att öppna via Strategi). */
function renderHpLasIntro(): string {
  const intro = hpLasIntro!;
  return `
    <div class="hp-drill hp-las-intro">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-las-intro-close">Tillbaka</button>
      </div>
      <p class="hp-ready-kicker">Så läser du</p>
      <h2 class="hp-las-intro-title">${HP_LAS_STRATEGY.title}</h2>
      <ol class="hp-las-intro-steps">${HP_LAS_STRATEGY.steps.map((t) => `<li>${t}</li>`).join("")}</ol>
      <p class="hp-las-intro-focus"><strong>Fokus:</strong> ${HP_LAS_STRATEGY.focus}</p>
      <button class="hp-cta-btn" data-action="hp-las-intro-go">Jag fattar – kör</button>
      <p class="hp-las-intro-note">${intro.source === "elf" ? hpFull("ELF") : hpFull("LÄS")} · du hittar strategin igen under Strategi i övningen.</p>
    </div>
  `;
}

/** Luckans nummer ur frågan ("Which alternative best fits gap (3)?"). */
function hpGapNumber(q: HpLasQuestion): number | null {
  const m = /gap \((\d+)\)/i.exec(q.prompt);
  return m ? Number(m[1]) : null;
}

/** Markerar luckorna i ett stycke: aktuell lucka tydligt, övriga dämpade. Med `fill` sätts rätt ord in i aktuell lucka. */
function renderHpGapText(paragraph: string, current: number | null, fill: string | null): string {
  return paragraph.replace(/\((\d+)\) ___/g, (_m, n: string) => {
    if (Number(n) !== current) {
      return `<span class="hp-gap-other">(${n}) ___</span>`;
    }
    return fill
      ? `<mark class="hp-gap hp-gap-cur hp-gap-filled">(${n}) <strong>${fill}</strong></mark>`
      : `<mark class="hp-gap hp-gap-cur">(${n}) ___</mark>`;
  });
}

function renderHpLasText(item: HpLasQuestion): string {
  const s = hpLasSession!;
  const gapNo = hpIsGapFill(s.text) ? hpGapNumber(item) : null;
  const paras = s.text.paragraphs
    .map(
      (p, i) => `
        <div class="hp-las-para ${hpLasHighlight === i ? "hp-las-para-hl" : ""}" id="hp-las-p-${i}">
          <span class="hp-las-pnum" aria-label="Stycke ${i + 1}">${i + 1}</span>
          <p>${gapNo !== null ? renderHpGapText(p, gapNo, null) : p}</p>
        </div>`
    )
    .join("");
  return `
    <p class="hp-las-text-title">${s.text.title}<span class="hp-las-topic">${s.text.topic}</span></p>
    <div class="hp-las-paras">${paras}</div>
    <button class="hp-secondary-btn" data-action="hp-las-view" data-las-view="fraga">Till frågan</button>
  `;
}

function renderHpLasFeedback(item: HpLasQuestion, userAnswer: number, inReview: boolean): string {
  const s = hpLasSession!;
  const idx = s.reviewIndex ?? s.currentIndex;
  const outcome: HpOutcome = s.outcomes[idx] ?? "shown";
  const picked = userAnswer >= 0;
  const shownTag = inReview ? s.lasTagLog[idx] ?? null : s.currentTag;
  const showAll = hpLasShowAllFor === item.id;
  const L = (i: number) => HP_LAS_LETTERS[i];
  let whyHtml: string;
  if (showAll) {
    whyHtml = `<div class="hp-las-all">${item.options
      .map((opt, i) => {
        const cls = i === item.correct ? "hp-las-all-ok" : i === userAnswer ? "hp-las-all-wrong" : "";
        const mark = i === item.correct ? "Rätt" : i === userAnswer ? "Du valde" : "";
        return `<div class="hp-las-all-item ${cls}"><p class="hp-las-all-head"><strong>${L(i)}.</strong> ${opt.text}${mark ? `<span class="hp-las-all-mark">${mark}</span>` : ""}</p><p class="hp-las-why">${opt.why}</p></div>`;
      })
      .join("")}</div>`;
  } else {
    whyHtml = `${outcome !== "shown" || !picked ? "" : `<p class="hp-las-why"><strong>Du valde ${L(userAnswer)}:</strong> ${item.options[userAnswer].why}</p>`}
        <p class="hp-las-why"><strong>Rätt svar ${L(item.correct)}:</strong> ${item.options[item.correct].why}</p>`;
  }
  const n = item.paragraph + 1;
  const gapFill = hpIsGapFill(s.text);
  const tagHtml = outcome === "shown" ? (inReview ? (shownTag ? `<p class="hp-feedback-why">Du valde: ${HP_LAS_TAG_LABEL[shownTag]}</p>` : "") : renderHpLasTagRow(shownTag)) : "";
  const last = s.currentIndex >= s.items.length - 1;
  return `<div class="hp-feedback ${outcome === "shown" ? "hp-feedback-wrong" : "hp-feedback-ok"}">
      <p class="hp-feedback-meaning">${hpOutcomeTitle(outcome, userAnswer)}</p>
      ${whyHtml}
      <button class="hp-las-linkbtn" data-action="hp-las-all">${showAll ? "Dölj alla alternativ" : "Se alla alternativ"}</button>
      ${gapFill
        ? ""
        : `<div class="hp-las-where">
        <span class="hp-feedback-why">Svaret finns i stycke ${n}</span>
        <button class="hp-las-open" data-action="hp-las-para" data-para="${item.paragraph}">Öppna stycke ${n}</button>
      </div>`}
      ${tagHtml}
      ${inReview ? "" : `<button class="hp-next-btn" data-action="hp-las-next">${last ? "Se sammanfattning" : "Nästa"}</button>`}
    </div>`;
}

function renderHpLasQuestion(): string {
  if (!hpLasSession) {
    return "";
  }
  const s = hpLasSession;
  const inReview = s.reviewIndex !== null;
  const idx = s.reviewIndex ?? s.currentIndex;
  const item = s.items[idx];
  const userAnswer = inReview ? s.answerLog[idx] : s.userAnswer;
  const answered = inReview || s.showFeedback;
  const helpHtml = !inReview && hpHelpOpenFor === item.id ? renderHpHelpPanel(s.source) : "";

  if (hpLasView === "text") {
    return `
      <div class="hp-drill hp-las">
        ${renderHpLasBar(item, idx)}
        ${helpHtml}
        ${renderHpLasText(item)}
      </div>
    `;
  }

  const picks = answered ? s.triesLog[idx] ?? [] : s.curPicks;
  const optionsHtml = item.options
    .map((opt, i) => {
      const cls = hpOptionClass("hp-option-btn hp-las-opt", i, item.correct, answered, picks);
      return `<button class="${cls}" data-action="hp-las-answer" data-index="${i}" ${answered || picks.includes(i) ? "disabled" : ""}><span class="hp-las-letter">${HP_LAS_LETTERS[i]}</span><span>${opt.text}</span></button>`;
    })
    .join("");

  // Lucktext: stycket med luckan ligger tätt ovanför frågan, med aktuell lucka markerad (svaret beror på omgivningen).
  const gapNo = hpIsGapFill(s.text) ? hpGapNumber(item) : null;
  const gapContext = gapNo !== null
    ? `<div class="hp-gap-context"><p>${renderHpGapText(s.text.paragraphs[item.paragraph] ?? "", gapNo, answered && item.correct >= 0 ? item.options[item.correct].text : null)}</p></div>`
    : "";
  const ladderHtml = answered
    ? ""
    : gapNo !== null
      ? renderHpLadder("hp-las", s, `Läs meningen före och efter lucka (${gapNo}). Vilket ord styr formen eller sambandet?`)
      : renderHpLadder("hp-las", s, `Titta i stycke ${item.paragraph + 1}.`, `<button class="hp-las-open" data-action="hp-las-para" data-para="${item.paragraph}">Öppna stycke ${item.paragraph + 1}</button>`);

  return `
    <div class="hp-drill hp-las">
      ${renderHpLasBar(item, idx)}
      ${gapContext}
      ${gapNo === null && !answered && hpLasShowNudge() ? `<p class="hp-las-nudge">${HP_LAS_STRATEGY.nudge}</p>` : ""}
      <p class="hp-las-prompt">${item.prompt}</p>
      <div class="hp-options">${optionsHtml}</div>
      ${ladderHtml}
      ${renderHpNavRow("hp-las", s)}
      ${helpHtml}
      ${answered ? renderHpLasFeedback(item, userAnswer as number, inReview) : ""}
    </div>
  `;
}

function renderHpLasSummary(): string {
  if (!hpLasSession) {
    return "";
  }
  const s = hpLasSession;
  const answeredTotal = s.items.length - s.unanswered;
  const seconds = hpLasElapsedSeconds();
  const budget = hpLasBudgetSeconds(s.text);
  const withinBudget = seconds <= budget;
  const tagEntries = (Object.keys(HP_LAS_TAG_LABEL) as HpLasErrorTag[])
    .map((tag) => ({ tag, count: s.errorTagCounts[tag] ?? 0 }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count);
  const missedTypes = new Map<HpLasQuestionType, number>();
  for (const q of s.missedItems) {
    missedTypes.set(q.type, (missedTypes.get(q.type) ?? 0) + 1);
  }
  const next = pickHpLasText(s.source);
  return `
    <div class="hp-summary">
      <p class="hp-summary-heading">${hpLasHeading(s.source, s.text)} — klart</p>
      <div class="hp-progress-row">
        <div class="stat-widget">
          <span class="stat-widget-label">Utan hjälp</span>
          <span class="stat-widget-value">${s.correct}<span class="stat-widget-unit">/${answeredTotal}</span></span>
        </div>
        <div class="stat-widget">
          <span class="stat-widget-label">Tid</span>
          <span class="stat-widget-value">${formatMinSec(seconds)}</span>
          <span class="stat-widget-sub">${withinBudget ? `inom budget ${formatMinSec(budget)} ✓` : `${formatMinSec(seconds - budget)} över budget ${formatMinSec(budget)}`}</span>
        </div>
      </div>
      ${ladderSummary(s.correct, s.withHint, s.wrong)}
      ${helpedSummary(s.helpedIds.length)}
      ${unansweredSummary(s.unanswered)}
      ${tagEntries.length > 0
        ? `<div class="hp-twin-tag-summary">
            <p class="hp-missed-heading">Felanalys</p>
            ${tagEntries.map((e) => `<div class="hp-twin-tag-summary-row"><span>${HP_LAS_TAG_LABEL[e.tag]}</span><span>${e.count}</span></div>`).join("")}
            <p class="hp-las-coach">${HP_LAS_TAG_COACH[tagEntries[0].tag]}</p>
          </div>`
        : ""}
      ${missedTypes.size > 0
        ? `<div class="hp-twin-tag-summary">
            <p class="hp-missed-heading">Frågetyper du behövde hjälp med</p>
            ${[...missedTypes.entries()].map(([type, count]) => `<div class="hp-twin-tag-summary-row"><span>${HP_LAS_TYPE_LABEL[type]}</span><span>${count}</span></div>`).join("")}
            <p class="hp-las-coach">Texten kommer tillbaka i ett senare pass.</p>
          </div>`
        : `<p class="hp-summary-clean">Alla utan hjälp — starkt jobbat!</p>`}
      ${next ? `<button class="hp-cta-btn" data-action="hp-las-start" data-source="${s.source}" data-text-id="${next.id}">Nästa text: ${next.title}</button>` : ""}
      <button class="hp-drill-cancel" data-action="hp-las-close">Klart för idag</button>
    </div>
  `;
}

/** HP-guiden: flashcards-läge, ett kort per skärm, tryck för att vända. */
function renderHpGuideFlashcards(): string {
  let items = hpGuideCardsForCategory(hpGuideFilter);
  if (items.length === 0) {
    hpGuideFilter = "alla";
    items = hpGuideCardsForCategory(hpGuideFilter);
  }
  const total = items.length;
  if (hpGuideIndex >= total) hpGuideIndex = total - 1;
  if (hpGuideIndex < 0) hpGuideIndex = 0;
  const card = items[hpGuideIndex];
  const categoryInfo = HP_GUIDE_CATEGORIES.find((c) => c.id === card.kategori)!;

  const chips = [{ id: "alla" as const, shortLabel: "Alla" }, ...HP_GUIDE_CATEGORIES]
    .map((c) => {
      const active = hpGuideFilter === c.id;
      return `<button class="hp-guide-chip ${active ? "hp-guide-chip-active" : ""}" data-action="hp-guide-filter" data-category="${c.id}">${c.shortLabel}</button>`;
    })
    .join("");

  const faceHtml = hpGuideFlipped
    ? `
      <p class="hp-guide-card-gorsahar">${card.gorSaHar}</p>
      <p class="hp-guide-card-varfor">${card.varfor}</p>
      ${card.kalla ? `<p class="hp-guide-card-kalla">Källa: ${card.kalla}</p>` : ""}
      <p class="hp-guide-card-hint">Tryck för att vända tillbaka</p>
    `
    : `
      <p class="hp-guide-card-kategori">${categoryInfo.label}</p>
      <p class="hp-guide-card-rubrik">${card.rubrik}</p>
      <p class="hp-guide-card-hint">Tryck för att vända</p>
    `;

  return `
    <div class="hp-guide-flash">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-guide-cancel">Avbryt</button>
        <span class="hp-drill-progress">${hpGuideIndex + 1}/${total}</span>
      </div>
      <div class="hp-guide-chip-row">${chips}</div>
      <div class="hp-guide-card ${hpGuideFlipped ? "hp-guide-card-back" : ""}" data-action="hp-guide-flip">
        ${faceHtml}
      </div>
      <div class="hp-guide-nav-row">
        <button class="hp-guide-nav-btn" data-action="hp-guide-prev" ${hpGuideIndex === 0 ? "disabled" : ""}>‹ Föregående</button>
        <button class="hp-guide-nav-btn" data-action="hp-guide-next" ${hpGuideIndex === total - 1 ? "disabled" : ""}>Nästa ›</button>
      </div>
    </div>
  `;
}

function renderHpGuidePageCard(card: HpGuideCard): string {
  return `
    <div class="hp-guide-page-card">
      <p class="hp-guide-page-card-rubrik">${card.rubrik}</p>
      <p class="hp-guide-page-card-gorsahar">${card.gorSaHar}</p>
      <p class="hp-guide-page-card-varfor">${card.varfor}</p>
      ${card.kalla ? `<p class="hp-guide-page-card-kalla">Källa: ${card.kalla}</p>` : ""}
    </div>
  `;
}

/** HP-guiden: lång översiktssida, ihopfällbara sektioner. "Viktigast" öppen från start. */
function renderHpGuidePage(): string {
  const topCards = hpGuideCardsForCategory("viktigast");
  const otherCategories = HP_GUIDE_CATEGORIES.filter((c) => c.id !== "viktigast");

  const topHtml = `
    <div class="hp-guide-page-top">
      <p class="hp-guide-page-top-heading">De 7 viktigaste råden</p>
      ${topCards.map((c) => renderHpGuidePageCard(c)).join("")}
    </div>
  `;

  const sectionsHtml = otherCategories
    .map((cat) => {
      const cards = hpGuideCardsForCategory(cat.id);
      if (cards.length === 0) return "";
      return `
        <details class="hp-guide-section">
          <summary class="hp-guide-section-summary">${cat.label} <span class="hp-guide-section-count">${cards.length}</span></summary>
          <div class="hp-guide-section-body">
            ${cards.map((c) => renderHpGuidePageCard(c)).join("")}
          </div>
        </details>
      `;
    })
    .join("");

  return `
    <div class="hp-guide-page">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-guide-cancel">Avbryt</button>
        <span class="hp-drill-progress">Guide — översikt</span>
      </div>
      ${topHtml}
      ${sectionsHtml}
    </div>
  `;
}

/** Externa resurser: rubrik, sedan länkar med en rad förklaring och kostnad under. */
function renderHpResources(): string {
  const groups = HP_RESOURCE_GROUPS.map((group) => {
    const items = hpResourcesForGroup(group)
      .map(
        (r) => `
          <li class="hp-res-item">
            <a class="hp-res-link" href="${r.url}" target="_blank" rel="noopener">${hpExpand(r.title)} <span aria-hidden="true">↗</span><span class="hp-res-sr"> (öppnas i ny flik)</span></a>
            <span class="hp-res-desc">${hpExpand(r.desc)}</span>
            <span class="hp-res-cost hp-res-cost-${r.cost === "gratis" ? "free" : "other"}">${r.cost}</span>
          </li>`
      )
      .join("");
    return `
      <section class="hp-res-group">
        <h3 class="hp-res-heading">${group}</h3>
        <ul class="hp-res-list">${items}</ul>
      </section>`;
  }).join("");
  return `
    <div class="hp-guide-page">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-resources-close">‹ Tillbaka till HP-hem</button>
      </div>
      <h2 class="hp-res-title">Externa resurser</h2>
      <p class="hp-res-checked">Kontrollerade ${HP_RESOURCES_CHECKED_LABEL}</p>
      ${groups}
    </div>
  `;
}

// ── Provpass-logg ──

const escapeHtml = (t: string): string => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function renderHpProvloggHomeCard(): string {
  const list = loadHpProvlogg();
  const weak = weakestDelprov(list);
  const meta = list.length === 0 ? "Inga pass loggade än" : `${list.length} pass · svagast just nu: ${weak ? hpAbbr(weak.id) : "–"}`;
  return renderHpStartCard('data-action="hp-provlogg-open"', "Provpass-logg", "Skriv in resultat från gamla prov och se vad du ska plugga mer", `<span class="hp-start-card-last">${meta}</span>`).replace("Starta ›", "Öppna ›");
}

function renderHpProvlogg(): string {
  const list = loadHpProvlogg();
  const weak = weakestDelprov(list);
  const typ = hpProvloggTyp;
  const today = new Date().toISOString().slice(0, 10);
  const typBtn = (t: ProvTyp, label: string) =>
    `<button class="hp-secondary-btn hp-prov-typ${t === typ ? " is-on" : ""}" data-action="hp-provlogg-typ" data-typ="${t}" aria-pressed="${t === typ}">${label}</button>`;
  const fields = PROV_DELPROV[typ]
    .map(
      (id) => `
      <label class="hp-prov-field">
        <span class="hp-prov-field-name">${hpAbbr(id)}</span>
        <span class="hp-prov-field-sub">${HP_NAMES[id].full} · av ${PROV_MAX[id]}${id === "ELF" ? " · lämna tomt om passet saknar ELF" : ""}</span>
        <input class="hp-prov-input" type="number" inputmode="numeric" min="0" max="${PROV_MAX[id]}" data-prov-score="${id}" />
      </label>`
    )
    .join("");
  const bars = (Object.keys(PROV_MAX) as (keyof typeof PROV_MAX)[])
    .map((id) => {
      const t = provTrend(list, id);
      if (t.length === 0) return "";
      const isWeak = weak?.id === id;
      const last = t[t.length - 1].percent;
      return `
        <li class="hp-prov-row${isWeak ? " is-weak" : ""}">
          <span class="hp-prov-row-name">${hpAbbr(id)}</span>
          <span class="hp-prov-row-sub">${HP_NAMES[id].full}${isWeak ? " · lägg mest tid här" : ""}</span>
          <span class="hp-prov-bars" role="img" aria-label="Procent rätt per pass, äldst först: ${t.map((x) => x.percent + " %").join(", ")}">${t
            .slice(-8)
            .map((x) => `<span class="hp-prov-bar" style="height:${Math.max(x.percent, 4)}%"></span>`)
            .join("")}</span>
          <span class="hp-prov-row-pct">${last} %</span>
        </li>`;
    })
    .join("");
  const history = sortProvPass(list)
    .slice(0, 10)
    .map((p) => {
      const parts = PROV_DELPROV[p.typ].map((id) => `${hpAbbr(id)} ${p.scores[id] ?? 0}/${PROV_MAX[id]} (${provPercent(id, p.scores[id] ?? 0)} %)`).join(" · ");
      return `
        <li class="hp-prov-pass">
          <span class="hp-prov-pass-title">${escapeHtml(p.name)}</span>
          <span class="hp-prov-pass-sub">${p.date} · ${p.typ === "verbalt" ? "Verbalt" : "Kvantitativt"}</span>
          <span class="hp-prov-pass-sub">${parts}</span>
          <button class="hp-secondary-btn hp-prov-del" data-action="hp-provlogg-delete" data-id="${escapeHtml(p.id)}">Ta bort</button>
        </li>`;
    })
    .join("");
  return `
    <div class="hp-guide-page hp-prov">
      <div class="hp-drill-top">
        <button class="hp-drill-cancel" data-action="hp-provlogg-close">‹ Tillbaka till HP-hem</button>
      </div>
      <h2 class="hp-res-title">Provpass-logg</h2>
      <p class="hp-res-checked">Antal rätt per delprov i gamla högskoleprov</p>
      ${bars ? `<section class="hp-prov-section"><h3 class="hp-res-heading">Utveckling</h3><ul class="hp-prov-list">${bars}</ul></section>` : ""}
      <section class="hp-prov-section">
        <h3 class="hp-res-heading">Nytt pass</h3>
        <div class="hp-prov-typrow">${typBtn("kvantitativt", "Kvantitativt")}${typBtn("verbalt", "Verbalt")}</div>
        <label class="hp-prov-field"><span class="hp-prov-field-name">Prov</span><input class="hp-prov-input hp-prov-wide" type="text" maxlength="60" placeholder="t.ex. Vår 2024 pass 3" data-prov-name /></label>
        <label class="hp-prov-field"><span class="hp-prov-field-name">Datum</span><input class="hp-prov-input hp-prov-wide" type="date" value="${today}" data-prov-date /></label>
        <div class="hp-prov-fields">${fields}</div>
        ${hpProvloggError ? `<p class="hp-prov-error" role="alert">${hpProvloggError}</p>` : ""}
        <button class="hp-cta-btn" data-action="hp-provlogg-save">Spara pass</button>
      </section>
      ${history ? `<section class="hp-prov-section"><h3 class="hp-res-heading">Senaste passen</h3><ul class="hp-prov-list">${history}</ul></section>` : ""}
    </div>
  `;
}

function renderHp(): string {
  if (hpForceHome) {
    hpCardOpen = null;
    hpResourcesOpen = false;
    hpProvloggOpen = false;
    hpPlanAllOpen = false;
    hpPlanCardDelprov = null;
    return renderHpHome();
  }
  if (hpPlanAllOpen) {
    return renderHpPlanAll();
  }
  if (hpResourcesOpen) {
    return renderHpResources();
  }
  if (hpProvloggOpen) {
    return renderHpProvlogg();
  }
  const openCard = hpCardOpen ? HP_CARDS.find((c) => c.id === hpCardOpen) : undefined;
  if (openCard) {
    return renderHpCard(openCard);
  }
  if (hpGuideMode === "cards") {
    return renderHpCardList();
  }
  if (hpGuideMode === "flashcards") {
    return renderHpGuideFlashcards();
  }
  if (hpGuideMode === "page") {
    return renderHpGuidePage();
  }
  if (hpLasIntro) {
    return renderHpLasIntro();
  }
  if (hpTwinIntro) {
    return renderHpTwinIntro();
  }
  if (hpFormulaSession) {
    return renderHpFormula();
  }
  if (hpMathSession) {
    return hpMathSession.currentIndex >= hpMathSession.items.length ? renderHpMathResult() : renderHpMathQuestion();
  }
  if (hpMathViewingSaved) {
    return renderHpMathSavedResult();
  }
  if (hpLasSession) {
    return hpLasSession.currentIndex >= hpLasSession.items.length ? renderHpLasSummary() : renderHpLasQuestion();
  }
  if (hpMekSession) {
    return hpMekSession.currentIndex >= hpMekSession.items.length ? renderHpMekSummary() : renderHpMekQuestion();
  }
  if (hpTwinSession) {
    return hpTwinSession.currentIndex >= hpTwinSession.items.length ? renderHpTwinSummary() : renderHpTwinQuestion();
  }
  if (hpSession) {
    return hpSession.currentIndex >= hpSession.items.length ? renderHpSummary() : renderHpQuestion();
  }
  return renderHpHome();
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

    </div>
  `;
}

function renderBank(): string {
  const filtered = filterQuestions(QUESTIONS, filters);
  const topics = Array.from(new Set(QUESTIONS.map((question) => question.topic))).sort();
  const trackFilters: { id: "all" | TrackId; label: string; cls: string }[] = [
    { id: "all",            label: "Alla",  cls: "" },
    { id: "nackademin_ux",  label: "UX",    cls: "track-nackademin_ux" },
    { id: "iths_itsec",     label: "IT-H",  cls: "track-iths_itsec" },
    { id: "prog1a",         label: "Prog",  cls: "track-prog1a" },
  ];

  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Frågebank med filter</h3>
        <div class="bank-track-filters">
          ${trackFilters.map((f) => `
            <button class="track-filter-btn${f.cls ? ` ${f.cls}` : ""}"
                    data-action="filter-track"
                    data-track-id="${f.id}"
                    aria-pressed="${filters.trackId === f.id ? "true" : "false"}">${f.label}</button>
          `).join("")}
        </div>
        <details class="bank-more-filters">
          <summary>Fler filter ▼</summary>
          <div class="inline-controls">
            <select data-filter="topic">
              <option value="all" ${filters.topic === "all" ? "selected" : ""}>Alla ämnen</option>
              ${topics
                .map((topic) => `<option value="${topic}" ${filters.topic === topic ? "selected" : ""}>${topic}</option>`)
                .join("")}
            </select>

            <select data-filter="difficulty">
              <option value="all" ${filters.difficulty === "all" ? "selected" : ""}>Alla nivåer</option>
              ${["Lätt", "Medel", "Svår"]
                .map((diff) => `<option value="${diff}" ${filters.difficulty === diff ? "selected" : ""}>${diff}</option>`)
                .join("")}
            </select>

            <select data-filter="sourceTier">
              <option value="all" ${filters.sourceTier === "all" ? "selected" : ""}>Alla källnivåer</option>
              ${["Officiell", "Sekundär", "Community"]
                .map((sourceTier) => `<option value="${sourceTier}" ${filters.sourceTier === sourceTier ? "selected" : ""}>${sourceTier}</option>`)
                .join("")}
            </select>
          </div>
        </details>
        <div class="inline-controls" style="margin-top:0.5rem">
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

  // Sortera så att målspårets grupp visas överst med ★
  const priorityTrackId = getPriorityTrackFromProfile(studyProfile.targetPriority);
  const priorityTrackName = getTrackName(priorityTrackId);
  const sortedGroups = Object.entries(grouped).sort(([a], [b]) => {
    if (a === priorityTrackName) return -1;
    if (b === priorityTrackName) return 1;
    return 0;
  });

  return `
    <div class="grid">
      <section class="card span-12">
        <h3>Välj ett prov</h3>
        <p class="muted">Välj nedan och tryck Starta. Klockan tickar — precis som på riktigt.</p>
        <div class="inline-controls">
          <select data-mock-select="true">
            ${sortedGroups.map(([groupName, exams]) => `
              <optgroup label="${groupName === priorityTrackName ? `★ ${groupName}` : groupName}">
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

function renderCourseView(trackId: TrackId): string {
  const sessions = loadStudySessions();
  const progress = buildTrackProgress(sessions);
  const pct = progress[trackId];

  const meta: Record<TrackId, { title: string; subtitle: string; allLabel: string }> = {
    prog1a:        { title: "Programmering 1 (Python)", subtitle: "A-prövning · Python-grunder", allLabel: "Python" },
    nackademin_ux: { title: "UX-design",               subtitle: "Nackademin · Analys & problemlösning", allLabel: "UX" },
    iths_itsec:    { title: "IT-säkerhet",              subtitle: "IT-Högskolan · Nätverk & teknik", allLabel: "IT-säkerhet" }
  };
  const { title, subtitle, allLabel } = meta[trackId];
  const drillCount = Math.min(8, QUESTIONS.filter((q) => q.track_id === trackId).length);
  const evidence = RESEARCH_EVIDENCE.filter((e) => e.track_id === trackId);

  const evidenceHtml = evidence.length === 0
    ? `<p class="muted course-research-empty">Inga evidenskort för det här spåret ännu.</p>`
    : evidence.map((e) => `
        <div class="course-research-card">
          <p class="course-research-claim">${e.claim}</p>
          <p class="course-research-meta muted">${e.provider} · ${e.confidence} tillförlitlighet</p>
        </div>
      `).join("");

  return `
    <div class="course-view">
      <button class="course-back-btn" data-action="course-back">← Tillbaka</button>

      <div class="course-header">
        <h2 class="course-title">${title}</h2>
        <p class="course-subtitle muted">${subtitle}</p>
        <div class="course-progress-row">
          <div class="progress course-progress-bar">
            <div style="width:${pct}%"></div>
          </div>
          <span class="progress-pct">${pct}%&nbsp;klart</span>
        </div>
      </div>

      <div class="course-actions">
        <button class="primary course-action-btn" data-action="start-track-learn" data-track="${trackId}">
          Genomgång — Grunderna
        </button>
        <button class="secondary course-action-btn" data-action="start-track-drill" data-track="${trackId}">
          Öva — ${drillCount} anpassade frågor
        </button>
        ${trackId === "iths_itsec" ? `
        <button class="primary course-action-btn" data-view="iths-antagning">
          Antagningsprov — Träna ämne för ämne
        </button>
        ` : ""}
      </div>

      <button class="course-bank-link" data-action="goto-track-bank" data-track="${trackId}">
        Se alla ${allLabel}-frågor →
      </button>

      <details class="course-research">
        <summary class="course-research-summary">Varför det fungerar</summary>
        <div class="course-research-body">
          ${evidenceHtml}
        </div>
      </details>

      ${trackId === "nackademin_ux" ? `
      <details class="course-research">
        <summary class="course-research-summary">UX scenario-generator</summary>
        <div class="course-research-body">
          <div class="course-research-card">
            <p class="course-research-claim">${generatedUxScenario}</p>
            <p class="course-research-meta muted">Workflow: 1) Målgruppsanalys → 2) Enkel wireframe-idé → 3) Motivering</p>
          </div>
          <button class="secondary" data-action="generate-ux-case">Generera nytt case</button>
        </div>
      </details>
      ` : ""}
    </div>
  `;
}

function renderIthsAntagning(): string {
  return `
    <div class="grid">

      <section class="card span-12">
        <span class="track-pill track-iths_itsec">IT-säkerhet</span>
        <h2 style="font-size: var(--text-hero); margin-top: 0.5rem;">Antagningsprov – välj ämne</h2>
        <p class="muted">Välj ett ämne. Varje quiz är ≤ 10 min. Kör om för att få andra frågor ur poolen.</p>
      </section>

      <div class="span-12">
        <p style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.5rem;">Del 1 – Allmänna ämnen</p>
      </div>

      <article class="card span-4">
        <h3>Svenska</h3>
        <p class="muted" style="font-size: var(--text-sm);">Grammatik, syftning, stavning · 4 av 8 frågor · ~8 min</p>
        <button class="primary" data-action="start-iths-sv">Starta →</button>
      </article>

      <article class="card span-4">
        <h3>Engelska</h3>
        <p class="muted" style="font-size: var(--text-sm);">Teknisk ordförståelse, meningsstruktur · 4 av 8 frågor · ~8 min</p>
        <button class="primary" data-action="start-iths-en">Starta →</button>
      </article>

      <article class="card span-4">
        <h3>Matematik</h3>
        <p class="muted" style="font-size: var(--text-sm);">Procent, algebra, ekvationer · 6 av 16 frågor · ~10 min</p>
        <button class="primary" data-action="start-iths-ma">Starta →</button>
      </article>

      <div class="span-12" style="margin-top: 0.25rem;">
        <p style="font-size: var(--text-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 0.5rem;">Del 2 – Dator- och nätverksteknik</p>
      </div>

      <article class="card span-12">
        <h3>Nätverk &amp; IT-säkerhet</h3>
        <p class="muted" style="font-size: var(--text-sm);">IP-adressering, OSI-modellen, protokoll, VPN, brandväggar · 8 av 35 frågor slumpas · ~10 min</p>
        <button class="primary" data-action="start-iths-d2">Starta →</button>
      </article>

      <details class="card span-12" style="padding: 1rem;">
        <summary style="cursor: pointer; font-weight: 600; font-size: var(--text-h3); list-style: none; display: flex; justify-content: space-between; align-items: center;">
          ⚡ Snabbstart – lär dig det viktigaste på 20 min
          <span class="muted" style="font-size: var(--text-sm); font-weight: 400;">▼</span>
        </summary>
        <p class="muted" style="font-size: var(--text-sm); margin: 0.5rem 0 1rem;">Fyra saker som provet troligen testar — och som faktiskt sitter efter en genomläsning.</p>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">

          <div style="background: var(--surface-container); border-radius: 0.75rem; padding: 0.85rem 1rem;">
            <p style="font-weight: 700; margin: 0 0 0.25rem; font-size: var(--text-md);">1. Procent</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>x% av Y</strong> = (x ÷ 100) × Y</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>Baklänges</strong> (priset EFTER höjning är känt): dela med (1 + höjningen). Ex: pris efter 15% höjning = 575 kr → ursprung = 575 ÷ 1,15 = <strong>500 kr</strong></p>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin: 0.25rem 0 0;">Minns: multiplicera med (1 − rabatt) eller (1 + höjning). Aldrig dividera med procentsatsen direkt.</p>
          </div>

          <div style="background: var(--surface-container); border-radius: 0.75rem; padding: 0.85rem 1rem;">
            <p style="font-weight: 700; margin: 0 0 0.25rem; font-size: var(--text-md);">2. Pythagoras sats</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>c² = a² + b²</strong> &nbsp;(c = hypotenusan, den längsta sidan)</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;">Lär dig: <strong>3–4–5</strong> är ett pythagorestripel. Dubbla det: 6–8–<strong>10</strong>.</p>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin: 0.25rem 0 0;">Används också för avstånd i koordinatsystem: d = √((x₂−x₁)² + (y₂−y₁)²)</p>
          </div>

          <div style="background: var(--surface-container); border-radius: 0.75rem; padding: 0.85rem 1rem;">
            <p style="font-weight: 700; margin: 0 0 0.25rem; font-size: var(--text-md);">3. Median</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>Steg 1:</strong> Sortera talen i storleksordning.</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>Steg 2:</strong> Ta mittentaltet. Om jämnt antal tal → medelvärdet av de två i mitten.</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;">Ex: 3, 7, 2, 9, 5 → sorterat: 2, 3, <strong>5</strong>, 7, 9 → median = 5</p>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin: 0.25rem 0 0;">Medelvärde = summa ÷ antal. Median = mitten. De är INTE samma sak.</p>
          </div>

          <div style="background: var(--surface-container); border-radius: 0.75rem; padding: 0.85rem 1rem;">
            <p style="font-weight: 700; margin: 0 0 0.25rem; font-size: var(--text-md);">4. Linjär ekvation</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;"><strong>Flytta tal</strong> till ena sidan, <strong>dela</strong> med koefficienten.</p>
            <p style="font-size: var(--text-sm); margin: 0 0 0.25rem;">Ex: 3x + 7 = 22 → 3x = 15 → x = <strong>5</strong></p>
            <p style="font-size: var(--text-xs); color: var(--text-muted); margin: 0.25rem 0 0;">Kolla alltid svaret: 3×5 + 7 = 22 ✓</p>
          </div>

        </div>

        <p style="font-size: var(--text-xs); color: var(--text-muted); margin: 1rem 0 0;">Klar? Starta Matematik-quizzen ovan och se hur det går.</p>
      </details>

      <section class="card span-12">
        <h3>Djupdyk – Matematik 2b</h3>
        <p class="muted" style="font-size: var(--text-sm);">Gratis resurser på svenska — öppnas i nytt fönster.</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">
          <a href="https://www.matteboken.se/lektioner/gymnasiet/matte-niva-2" target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--accent);">
            📖 Matteboken.se — Teori, genomgångar och övningar (gratis)
          </a>
          <a href="https://vidma.se/np2b/" target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--accent);">
            📝 Vidma.se — Gamla nationella prov Matematik 2b med lösningar
          </a>
          <a href="https://vidma.se/ma2bc/" target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--accent);">
            🎬 Vidma.se — Videogenomgångar per kapitel (2b/2c)
          </a>
          <a href="https://eddler.se/kurser/matematik-2b/" target="_blank" rel="noopener" style="font-size: var(--text-sm); color: var(--accent);">
            ⚡ Eddler.se — Digital kurs med självkorrigerande övningar (gratis provlektion)
          </a>
        </div>
        <p class="muted" style="font-size: var(--text-xs); margin-top: 0.75rem;">Fokusera på: algebra, andragradsekvationer, exponential/logaritmer, Pythagoras, statistik.</p>
      </section>

      <div class="span-12">
        <button class="ghost" data-action="course-back">← Tillbaka till IT-säkerhet</button>
      </div>

    </div>
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
    case "course-prog1a":
      return renderCourseView("prog1a");
    case "course-nackademin_ux":
      return renderCourseView("nackademin_ux");
    case "course-iths_itsec":
      return renderCourseView("iths_itsec");
    case "iths-antagning":
      return renderIthsAntagning();
    case "hp":
      return renderHp();
    default:
      return renderOverview();
  }
}

// π saknas i Public Sans, så webbläsaren lånar tecknet från ett annat typsnitt utan sidluft
// och det klistras ihop med r, · och siffror. Varje π får en egen span med lite luft (.math-sym).
function spaceMathSymbols(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.nodeValue?.includes("π") && !n.parentElement?.closest("textarea, input, .math-sym")
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const frag = document.createDocumentFragment();
    node.nodeValue!.split(/(π)/).forEach((part) => {
      if (part === "π") {
        const span = document.createElement("span");
        span.className = "math-sym";
        span.textContent = "π";
        frag.appendChild(span);
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    node.replaceWith(frag);
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
  spaceMathSymbols(app);

  if (page === "hp" && hpSession && hpSession.currentIndex < hpSession.items.length && !hpSession.showFeedback && hpSession.reviewIndex === null) {
    startHpTempoInterval();
  } else {
    stopHpTempoInterval();
  }

  if (page === "hp" && hpMathSession && hpMathSession.currentIndex < hpMathSession.items.length && !hpMathSession.showFeedback && hpMathSession.reviewIndex === null) {
    startHpMathTempoInterval();
  } else {
    stopHpMathTempoInterval();
  }

  if (page === "hp" && hpLasSession && hpLasSession.currentIndex < hpLasSession.items.length) {
    startHpLasTempoInterval();
  } else {
    stopHpLasTempoInterval();
  }

  if (page === "hp" && hpMekSession && hpMekSession.currentIndex < hpMekSession.items.length && !hpMekSession.showFeedback && hpMekSession.reviewIndex === null) {
    startHpMekTempoInterval();
  } else {
    stopHpMekTempoInterval();
  }

  if (page === "hp" && hpTwinSession && hpTwinSession.currentIndex < hpTwinSession.items.length && !hpTwinSession.showFeedback && hpTwinSession.reviewIndex === null) {
    startHpTwinTempoInterval();
  } else {
    stopHpTwinTempoInterval();
  }
}

app.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const viewBtn = target.closest<HTMLButtonElement>("button[data-view]");
  if (viewBtn) {
    const targetView = viewBtn.dataset.view as Page;
    if (targetView in pageLabels) {
      const pageIconMap: Record<Page, string> = {
        overview: "🏠", tracks: "💻", bank: "📚", mock: "📋",
        research: "🔬", logic: "🧩", walkthrough: "📖", glossary: "📖",
        "course-prog1a": "💻", "course-nackademin_ux": "🎨", "course-iths_itsec": "🔒",
        "iths-antagning": "🔒",
        hp: "🎓"
      };
      pushRecentView({ label: pageLabels[targetView], icon: pageIconMap[targetView], action: "nav-goto", dataView: targetView });
      history.replaceState(null, "", `?view=${targetView}`);
    }
    page = targetView;
    navOpen = false;
    if (targetView === "hp") {
      // Nav-länken och startsidans HP-kort ska alltid gå till HP-hem —
      // ett pågående pass visas som "Fortsätt pass" i stället för att hoppa rakt in i.
      hpForceHome = true;
    }
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

  if (action === "sync-connect") {
    void connectSync();
    return;
  }

  if (action === "sync-now") {
    void sync.syncNow();
    return;
  }

  if (action === "sync-disconnect") {
    sync.disconnect();
    setStorageNotice("Frånkopplad. Datan på den här enheten ligger kvar.");
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

  if (action === "course-back") {
    page = "overview";
    render();
    return;
  }

  if (action === "goto-track-bank") {
    const trackId = actionEl.dataset.track as TrackId;
    filters = { ...filters, trackId };
    page = "bank";
    render();
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

  if (action === "filter-track") {
    filters = { ...filters, trackId: actionEl.dataset.trackId as "all" | TrackId };
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

  const ithsQuizMap: Record<string, string> = {
    "start-iths-sv": "mock-iths-d1-sv",
    "start-iths-en": "mock-iths-d1-en",
    "start-iths-ma": "mock-iths-d1-ma",
    "start-iths-d2": "mock-iths-d2"
  };
  if (action && action in ithsQuizMap) {
    const template = MOCK_EXAMS.find((item) => item.id === ithsQuizMap[action]);
    if (!template) return;
    const ids = template.sections.flatMap((section) => {
      if (section.question_pool && section.questions_count) {
        const shuffled = [...section.question_pool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, section.questions_count);
      }
      return section.question_ids;
    });
    startSession("Lär", ids, template.total_minutes, template.id);
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
        research: "🔬", logic: "🧩", walkthrough: "📖", glossary: "📖",
        "course-prog1a": "💻", "course-nackademin_ux": "🎨", "course-iths_itsec": "🔒",
        "iths-antagning": "🔒",
        hp: "🎓"
      };
      pushRecentView({ label: pageLabels[targetView], icon: pageIconMap[targetView], action: "nav-goto", dataView: targetView });
      history.replaceState(null, "", `?view=${targetView}`);
      page = targetView;
      navOpen = false;
      if (targetView === "hp") {
        // Nav-länken och startsidans HP-kort ska alltid gå till HP-hem —
        // ett pågående pass visas som "Fortsätt pass" i stället för att hoppas rakt in i.
        hpForceHome = true;
      }
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

  if (action === "hp-resume") {
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-help") {
    const cur = hpLasSession && hpLasSession.currentIndex < hpLasSession.items.length
      ? { id: hpLasSession.items[hpLasSession.currentIndex].id, answered: hpLasSession.showFeedback, helped: hpLasSession.helpedIds }
      : hpMekSession && hpMekSession.currentIndex < hpMekSession.items.length
      ? { id: hpMekSession.items[hpMekSession.currentIndex].id, answered: hpMekSession.showFeedback, helped: hpMekSession.helpedIds }
      : hpTwinSession && hpTwinSession.currentIndex < hpTwinSession.items.length
      ? { id: hpTwinSession.items[hpTwinSession.currentIndex].id, answered: hpTwinSession.showFeedback, helped: hpTwinSession.helpedIds }
      : hpMathSession && hpMathSession.currentIndex < hpMathSession.items.length
        ? { id: hpMathSession.items[hpMathSession.currentIndex].id, answered: hpMathSession.showFeedback, helped: hpMathSession.helpedIds }
        : hpSession && hpSession.currentIndex < hpSession.items.length
          ? { id: hpSession.items[hpSession.currentIndex].id, answered: hpSession.showFeedback, helped: hpSession.helpedIds }
          : null;
    if (!cur) return;
    if (hpHelpOpenFor === cur.id) {
      hpHelpOpenFor = null;
    } else {
      hpHelpOpenFor = cur.id;
      // Hjälp före svar sparas per fråga; efter svar är det bara repetition av metoden.
      if (!cur.answered && !cur.helped.includes(cur.id)) cur.helped.push(cur.id);
    }
    render();
    if (hpHelpOpenFor) {
      app.querySelector(".hp-help-panel")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    return;
  }

  if (action === "hp-start-pass") {
    hpForceHome = false;
    hpHelpOpenFor = null;
    hpSession = {
      items: buildHpPass(),
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      correct: 0,
      wrong: 0,
      questionStartedAt: Date.now(),
      tempoSeconds: [],
      missedItems: [],
      helpedIds: [],
      ...hpNavInit()
    };
    render();
    return;
  }

  if (action === "hp-answer") {
    if (!hpSession || hpSession.showFeedback) return;
    const index = Number(actionEl.dataset.index);
    const item = hpSession.items[hpSession.currentIndex];
    const elapsedSeconds = (Date.now() - hpSession.questionStartedAt) / 1000;
    hpSession.tempoSeconds.push(elapsedSeconds);
    const isCorrect = index === item.correct;
    if (isCorrect) {
      hpSession.correct++;
      removeHpRepeatWord(item.id);
      hpAutoAdvanceTimer = window.setTimeout(() => {
        hpAutoAdvanceTimer = null;
        hpAdvanceQuestion();
      }, 3000);
    } else {
      hpSession.wrong++;
      hpSession.missedItems.push(item);
      addHpRepeatWord(item.id);
    }
    hpSession.userAnswer = index;
    hpSession.answerLog[hpSession.currentIndex] = index;
    hpSession.showFeedback = true;
    render();
    return;
  }

  if (action === "hp-prev") {
    if (hpSession) hpNavPrev(hpSession);
    return;
  }

  if (action === "hp-review-back") {
    if (hpSession) hpNavBack(hpSession);
    return;
  }

  if (action === "hp-skip") {
    if (!hpSession) return;
    if (hpNavSkip(hpSession)) {
      hpOrdFinish();
    }
    render();
    return;
  }

  if (action === "hp-tap-advance") {
    if (!hpSession || !hpSession.showFeedback) return;
    if (hpAutoAdvanceTimer) {
      window.clearTimeout(hpAutoAdvanceTimer);
      hpAutoAdvanceTimer = null;
    }
    hpAdvanceQuestion();
    return;
  }

  if (action === "hp-next") {
    if (!hpSession) return;
    hpAdvanceQuestion();
    return;
  }

  if (action === "hp-cancel") {
    hpSession = null;
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-close") {
    hpSession = null;
    render();
    return;
  }

  if (action === "hp-math-start") {
    hpForceHome = false;
    hpHelpOpenFor = null;
    hpMathViewingSaved = false;
    hpMathSession = {
      items: buildHpMathPass(),
      currentIndex: 0,
      userAnswer: null,
      showFeedback: false,
      questionStartedAt: Date.now(),
      answers: [],
      helpedIds: [],
      currentTag: null,
      errorTagCounts: {},
      ...hpNavInit()
    };
    render();
    return;
  }

  if (action === "hp-math-view-last") {
    hpMathViewingSaved = true;
    render();
    return;
  }

  if (action === "hp-math-answer") {
    if (!hpMathSession || hpMathSession.showFeedback) return;
    const index = Number(actionEl.dataset.index);
    const item = hpMathSession.items[hpMathSession.currentIndex];
    const elapsedSeconds = (Date.now() - hpMathSession.questionStartedAt) / 1000;
    const res = hpLadderAnswer(hpMathSession, index, item.correct);
    if (res !== "retry") {
      hpMathSession.answers.push(buildHpMathQuestionResult(item, res, hpMathSession.triesLog[hpMathSession.currentIndex] ?? [], elapsedSeconds));
      hpMathSession.currentTag = null;
    }
    render();
    return;
  }

  if (action === "hp-math-hint") {
    if (!hpMathSession || hpMathSession.showFeedback || !hpHintUnlocked(hpMathSession)) return;
    hpMathSession.hintShown = true;
    render();
    return;
  }

  if (action === "hp-math-show") {
    if (!hpMathSession || hpMathSession.showFeedback || !hpMathSession.hintShown) return;
    const item = hpMathSession.items[hpMathSession.currentIndex];
    const elapsedSeconds = (Date.now() - hpMathSession.questionStartedAt) / 1000;
    hpLadderShow(hpMathSession);
    hpMathSession.answers.push(buildHpMathQuestionResult(item, "shown", hpMathSession.triesLog[hpMathSession.currentIndex] ?? [], elapsedSeconds));
    hpMathSession.currentTag = null;
    render();
    return;
  }

  if (action === "hp-math-tag") {
    if (!hpMathSession || !hpMathSession.showFeedback) return;
    const tag = actionEl.dataset.tag as HpTwinErrorTag;
    hpMathSession.currentTag = hpMathSession.currentTag === tag ? null : tag;
    render();
    return;
  }

  if (action === "hp-math-next") {
    if (!hpMathSession) return;
    hpMathAdvanceQuestion();
    if (hpMathSession && hpMathSession.currentIndex >= hpMathSession.items.length) {
      hpMathSaveResult();
    }
    return;
  }

  if (action === "hp-math-prev") {
    if (hpMathSession) hpNavPrev(hpMathSession);
    return;
  }

  if (action === "hp-math-review-back") {
    if (hpMathSession) hpNavBack(hpMathSession);
    return;
  }

  if (action === "hp-math-skip") {
    if (!hpMathSession) return;
    if (hpNavSkip(hpMathSession)) {
      hpMathSaveResult();
    }
    render();
    return;
  }

  if (action === "hp-math-cancel") {
    hpMathSession = null;
    hpMathViewingSaved = false;
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-math-close") {
    hpMathSession = null;
    hpMathViewingSaved = false;
    render();
    return;
  }

  if (action === "hp-las-start") {
    const source: HpLasSource = actionEl.dataset.source === "elf" ? "elf" : "las";
    const wanted = actionEl.dataset.textId ? hpLasTexts(source).find((t) => t.id === actionEl.dataset.textId) : undefined;
    const text = wanted ?? pickHpLasText(source);
    if (text) {
      if (hpLasIntroSeen()) {
        hpLasStart(text, source);
      } else {
        hpForceHome = false;
        hpLasIntro = { text, source };
        window.scrollTo(0, 0);
        render();
      }
    }
    return;
  }

  if (action === "hp-las-intro-go") {
    if (!hpLasIntro) return;
    const { text, source } = hpLasIntro;
    hpLasIntro = null;
    hpLasIntroMarkSeen();
    hpLasStart(text, source);
    return;
  }

  if (action === "hp-las-intro-close") {
    hpLasIntro = null;
    render();
    return;
  }

  if (action === "hp-las-view") {
    if (!hpLasSession) return;
    const next = actionEl.dataset.lasView === "text" ? "text" : "fraga";
    if (next !== hpLasView) hpLasSwitchView(next, null);
    return;
  }

  if (action === "hp-las-para") {
    if (!hpLasSession) return;
    hpLasSwitchView("text", Number(actionEl.dataset.para));
    return;
  }

  if (action === "hp-las-all") {
    if (!hpLasSession) return;
    const cur = hpLasSession.items[hpLasSession.reviewIndex ?? hpLasSession.currentIndex];
    hpLasShowAllFor = hpLasShowAllFor === cur.id ? null : cur.id;
    render();
    return;
  }

  if (action === "hp-las-answer") {
    if (!hpLasSession || hpLasSession.showFeedback) return;
    const index = Number(actionEl.dataset.index);
    const item = hpLasSession.items[hpLasSession.currentIndex];
    const res = hpLadderAnswer(hpLasSession, index, item.correct);
    if (res !== "retry") {
      hpLasRecordOutcome(res, item);
    }
    render();
    return;
  }

  if (action === "hp-las-hint") {
    if (!hpLasSession || hpLasSession.showFeedback || !hpHintUnlocked(hpLasSession)) return;
    hpLasSession.hintShown = true;
    render();
    return;
  }

  if (action === "hp-las-show") {
    if (!hpLasSession || hpLasSession.showFeedback || !hpLasSession.hintShown) return;
    hpLadderShow(hpLasSession);
    hpLasRecordOutcome("shown", hpLasSession.items[hpLasSession.currentIndex]);
    render();
    return;
  }

  if (action === "hp-las-tag") {
    if (!hpLasSession || !hpLasSession.showFeedback) return;
    const tag = actionEl.dataset.tag as HpLasErrorTag;
    hpLasSession.currentTag = hpLasSession.currentTag === tag ? null : tag;
    render();
    return;
  }

  if (action === "hp-las-next") {
    if (hpLasSession) hpLasAdvanceQuestion();
    return;
  }

  if (action === "hp-las-prev") {
    if (hpLasSession) {
      hpLasView = "fraga";
      hpLasShowAllFor = null;
      hpNavPrev(hpLasSession);
    }
    return;
  }

  if (action === "hp-las-review-back") {
    if (hpLasSession) {
      hpLasView = "fraga";
      hpLasShowAllFor = null;
      hpNavBack(hpLasSession);
    }
    return;
  }

  if (action === "hp-las-skip") {
    if (!hpLasSession) return;
    if (hpNavSkip(hpLasSession)) {
      hpLasSaveResult();
    }
    hpLasResetView();
    render();
    return;
  }

  if (action === "hp-las-cancel") {
    hpLasSession = null;
    hpForceHome = false;
    hpLasResetView();
    render();
    return;
  }

  if (action === "hp-las-close") {
    hpLasSession = null;
    hpLasResetView();
    render();
    return;
  }

  if (action === "hp-mek-start") {
    hpMekStart();
    return;
  }

  if (action === "hp-mek-all") {
    if (!hpMekSession) return;
    const cur = hpMekSession.items[hpMekSession.reviewIndex ?? hpMekSession.currentIndex];
    hpMekShowAllFor = hpMekShowAllFor === cur.id ? null : cur.id;
    render();
    return;
  }

  if (action === "hp-mek-answer") {
    if (!hpMekSession || hpMekSession.showFeedback) return;
    const index = Number(actionEl.dataset.index);
    const item = hpMekSession.items[hpMekSession.currentIndex];
    const res = hpLadderAnswer(hpMekSession, index, item.correct);
    if (res !== "retry") {
      hpMekRecordOutcome(res, item);
    }
    render();
    return;
  }

  if (action === "hp-mek-hint") {
    if (!hpMekSession || hpMekSession.showFeedback || !hpHintUnlocked(hpMekSession)) return;
    hpMekSession.hintShown = true;
    render();
    return;
  }

  if (action === "hp-mek-show") {
    if (!hpMekSession || hpMekSession.showFeedback || !hpMekSession.hintShown) return;
    hpLadderShow(hpMekSession);
    hpMekRecordOutcome("shown", hpMekSession.items[hpMekSession.currentIndex]);
    render();
    return;
  }

  if (action === "hp-mek-next") {
    if (hpMekSession) hpMekAdvanceQuestion();
    return;
  }

  if (action === "hp-mek-prev") {
    if (hpMekSession) {
      hpMekShowAllFor = null;
      hpNavPrev(hpMekSession);
    }
    return;
  }

  if (action === "hp-mek-review-back") {
    if (hpMekSession) {
      hpMekShowAllFor = null;
      hpNavBack(hpMekSession);
    }
    return;
  }

  if (action === "hp-mek-skip") {
    if (!hpMekSession) return;
    if (hpNavSkip(hpMekSession)) {
      hpMekSaveResult();
    }
    window.scrollTo(0, 0);
    render();
    return;
  }

  if (action === "hp-mek-cancel") {
    hpMekSession = null;
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-mek-close") {
    hpMekSession = null;
    render();
    return;
  }

  if (action === "hp-twin-intro-open") {
    const d = actionEl.dataset.delprov === "KVA" ? "KVA" : "NOG";
    hpTwinIntro = { delprov: d, startAfter: false };
    window.scrollTo(0, 0);
    render();
    return;
  }

  if (action === "hp-twin-intro-go") {
    if (!hpTwinIntro) return;
    const { delprov, startAfter } = hpTwinIntro;
    hpTwinIntro = null;
    hpTwinIntroMarkSeen(delprov);
    if (startAfter) {
      hpTwinStart(delprov, true);
    } else {
      render();
    }
    return;
  }

  if (action === "hp-twin-intro-close") {
    hpTwinIntro = null;
    render();
    return;
  }

  if (action === "hp-twin-start") {
    hpTwinStart(actionEl.dataset.delprov as HpDelprov);
    return;
  }

  if (action === "hp-twin-answer") {
    if (!hpTwinSession || hpTwinSession.showFeedback) return;
    const index = Number(actionEl.dataset.index);
    const item = hpTwinSession.items[hpTwinSession.currentIndex];
    const res = hpLadderAnswer(hpTwinSession, index, item.correct);
    if (res !== "retry") {
      hpTwinRecordOutcome(res, item);
    }
    render();
    return;
  }

  if (action === "hp-twin-hint") {
    if (!hpTwinSession || hpTwinSession.showFeedback || !hpHintUnlocked(hpTwinSession)) return;
    hpTwinSession.hintShown = true;
    render();
    return;
  }

  if (action === "hp-twin-show") {
    if (!hpTwinSession || hpTwinSession.showFeedback || !hpTwinSession.hintShown) return;
    hpLadderShow(hpTwinSession);
    hpTwinRecordOutcome("shown", hpTwinSession.items[hpTwinSession.currentIndex]);
    render();
    return;
  }

  if (action === "hp-twin-tag") {
    if (!hpTwinSession || !hpTwinSession.showFeedback) return;
    const tag = actionEl.dataset.tag as HpTwinErrorTag;
    hpTwinSession.currentTag = hpTwinSession.currentTag === tag ? null : tag;
    render();
    return;
  }

  if (action === "hp-figure-zoom") {
    hpFigureZoom = !hpFigureZoom;
    render();
    return;
  }

  if (action === "hp-twin-next") {
    if (!hpTwinSession) return;
    hpFigureZoom = false;
    hpTwinAdvanceQuestion();
    return;
  }

  if (action === "hp-twin-prev") {
    if (hpTwinSession) hpNavPrev(hpTwinSession);
    return;
  }

  if (action === "hp-twin-review-back") {
    if (hpTwinSession) hpNavBack(hpTwinSession);
    return;
  }

  if (action === "hp-twin-skip") {
    if (!hpTwinSession) return;
    if (hpNavSkip(hpTwinSession)) {
      hpTwinSaveResult();
    }
    render();
    return;
  }

  if (action === "hp-twin-cancel") {
    hpTwinSession = null;
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-twin-close") {
    hpTwinSession = null;
    render();
    return;
  }

  if (action === "hp-guide-flashcards") {
    hpForceHome = false;
    hpGuideMode = "flashcards";
    hpGuideFilter = "alla";
    hpGuideIndex = 0;
    hpGuideFlipped = false;
    render();
    return;
  }

  if (action === "hp-card-open") {
    hpPlanCardDelprov = null;
    hpCardReturnScroll = window.scrollY;
    hpAreaOpenMemo = Array.from(app.querySelectorAll<HTMLElement>("details.hp-math-area-card[open]")).map((d) => d.dataset.area ?? "");
    hpCardOpen = actionEl.dataset.card ?? null;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-formula-start") {
    hpFormulaStart();
    return;
  }
  if (action === "hp-formula-practice") {
    hpFormulaStart(true);
    return;
  }
  if (action === "hp-formula-flip") {
    hpFormulaFlip();
    return;
  }
  if (action === "hp-formula-known" || action === "hp-formula-unknown") {
    hpFormulaAnswer(action === "hp-formula-known");
    return;
  }
  if (action === "hp-formula-paper" && hpFormulaSession) {
    hpFormulaSession.paperOpen = !hpFormulaSession.paperOpen;
    render();
    return;
  }
  if (action === "hp-formula-calc" && hpFormulaSession) {
    hpFormulaSession.calcOpen = !hpFormulaSession.calcOpen;
    render();
    return;
  }
  if (action === "hp-formula-calc-pick" && hpFormulaSession && hpFormulaSession.calcPick === null) {
    hpFormulaSession.calcPick = Number(actionEl.dataset.index);
    render();
    return;
  }
  if (action === "hp-formula-learned") {
    hpFormulaLearned();
    return;
  }
  if (action === "hp-formula-quick-pick") {
    hpFormulaQuickPick(Number(actionEl.dataset.index));
    return;
  }
  if (action === "hp-formula-quick-next") {
    hpFormulaQuickNext();
    return;
  }
  if (action === "hp-formula-redo") {
    hpFormulaRedo();
    return;
  }
  if (action === "hp-formula-cancel" || action === "hp-formula-close") {
    hpFormulaSession = null;
    hpForceHome = false;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-card-back") {
    hpCardOpen = null;
    hpPlanCardDelprov = null;
    render();
    hpAreaOpenMemo = null;
    window.scrollTo(0, hpCardReturnScroll);
    return;
  }

  if (action === "hp-plan-check") {
    hpPlanToggleCheck(actionEl.dataset.task ?? "");
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
    return;
  }

  if (action === "hp-plan-why") {
    const id = actionEl.dataset.task ?? "";
    if (hpPlanWhyOpen.has(id)) hpPlanWhyOpen.delete(id);
    else hpPlanWhyOpen.add(id);
    const y = window.scrollY;
    render();
    window.scrollTo(0, y);
    return;
  }

  if (action === "hp-plan-card") {
    const item = hpPlanCompute().plan.items.find((i) => i.task.id === actionEl.dataset.task);
    if (!item || item.task.action.type !== "lar-om") return;
    const card = findHpCard(item.task.action.area);
    hpForceHome = false;
    hpCardReturnScroll = window.scrollY;
    hpAreaOpenMemo = null;
    if (card) {
      hpPlanCardDelprov = item.task.action.delprov;
      hpCardOpen = card.id;
      render();
      window.scrollTo(0, 0);
    } else {
      hpTwinStart(item.task.action.delprov);
    }
    return;
  }

  if (action === "hp-plan-all") {
    hpPlanAllOpen = true;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-plan-back") {
    hpPlanAllOpen = false;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-copy-status") {
    void copyHpStatus();
    return;
  }

  if (action === "hp-provlogg-open") {
    hpForceHome = false;
    hpProvloggOpen = true;
    hpProvloggError = "";
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-provlogg-close") {
    hpProvloggOpen = false;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-provlogg-typ") {
    hpProvloggTyp = actionEl.dataset.typ === "verbalt" ? "verbalt" : "kvantitativt";
    hpProvloggError = "";
    render();
    return;
  }

  if (action === "hp-provlogg-save") {
    const scores: Record<string, string> = {};
    app.querySelectorAll<HTMLInputElement>("[data-prov-score]").forEach((el) => {
      scores[el.dataset.provScore ?? ""] = el.value;
    });
    const res = buildProvPass({
      id: `${Date.now()}`,
      date: app.querySelector<HTMLInputElement>("[data-prov-date]")?.value ?? "",
      name: app.querySelector<HTMLInputElement>("[data-prov-name]")?.value ?? "",
      typ: hpProvloggTyp,
      scores
    });
    if (!res.ok) {
      hpProvloggError = res.error;
    } else {
      saveHpProvlogg([...loadHpProvlogg(), res.pass]);
      hpProvloggError = "";
    }
    render();
    return;
  }

  if (action === "hp-provlogg-delete") {
    const id = actionEl.dataset.id;
    if (id && window.confirm("Ta bort det här passet?")) {
      saveHpProvlogg(loadHpProvlogg().filter((p) => p.id !== id));
      render();
    }
    return;
  }

  if (action === "hp-resources-open") {
    hpResourcesOpen = true;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-resources-close") {
    hpResourcesOpen = false;
    render();
    window.scrollTo(0, 0);
    return;
  }

  if (action === "hp-guide-cards") {
    hpForceHome = false;
    hpGuideMode = "cards";
    render();
    return;
  }

  if (action === "hp-guide-page") {
    hpForceHome = false;
    hpGuideMode = "page";
    render();
    return;
  }

  if (action === "hp-guide-cancel") {
    hpGuideMode = null;
    hpForceHome = false;
    render();
    return;
  }

  if (action === "hp-guide-flip") {
    hpGuideFlipped = !hpGuideFlipped;
    render();
    return;
  }

  if (action === "hp-guide-filter") {
    hpGuideFilter = (actionEl.dataset.category as HpGuideCategoryId | "alla") ?? "alla";
    hpGuideIndex = 0;
    hpGuideFlipped = false;
    render();
    return;
  }

  if (action === "hp-guide-prev") {
    if (hpGuideIndex > 0) {
      hpGuideIndex--;
      hpGuideFlipped = false;
      render();
    }
    return;
  }

  if (action === "hp-guide-next") {
    const total = hpGuideCardsForCategory(hpGuideFilter).length;
    if (hpGuideIndex < total - 1) {
      hpGuideIndex++;
      hpGuideFlipped = false;
      render();
    }
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
    setStorageNotice("Profil sparad.");
    return;
  }

  if (action === "profile-pill") {
    const key = actionEl.dataset.profile as keyof StudyProfile;
    const value = actionEl.dataset.value;
    if (key && value) {
      studyProfile = { ...studyProfile, [key]: value };
      saveStudyProfile(studyProfile);
      render();
      // Håll avatar-menyn öppen efter re-render
      const userMenu = document.querySelector<HTMLDetailsElement>(".app-nav-user-menu");
      if (userMenu) userMenu.open = true;
    }
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

  if (action === "set-color-mode") {
    const nextMode = actionEl.dataset.mode as ColorMode;
    if (nextMode !== "auto" && nextMode !== "light" && nextMode !== "dark") {
      return;
    }
    colorMode = nextMode;
    saveColorMode(colorMode);
    applyColorMode(colorMode);
    render();
    // Håll avatar-menyn öppen så man ser valet slå igenom
    const userMenu = document.querySelector<HTMLDetailsElement>(".app-nav-user-menu");
    if (userMenu) userMenu.open = true;
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

// HP-guiden: enkel horisontell svep-navigering på flashcards, som komplement
// till Föregående/Nästa-knapparna.
let hpGuideSwipeStartX: number | null = null;
let hpGuideSwipeStartY: number | null = null;
app.addEventListener(
  "touchstart",
  (event) => {
    if (hpGuideMode !== "flashcards" || event.touches.length !== 1) {
      hpGuideSwipeStartX = null;
      return;
    }
    const target = event.target as HTMLElement;
    if (!target.closest(".hp-guide-card")) {
      hpGuideSwipeStartX = null;
      return;
    }
    hpGuideSwipeStartX = event.touches[0].clientX;
    hpGuideSwipeStartY = event.touches[0].clientY;
  },
  { passive: true }
);

app.addEventListener(
  "touchend",
  (event) => {
    if (hpGuideSwipeStartX === null || hpGuideSwipeStartY === null) return;
    const startX = hpGuideSwipeStartX;
    const startY = hpGuideSwipeStartY;
    hpGuideSwipeStartX = null;
    hpGuideSwipeStartY = null;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;
    const total = hpGuideCardsForCategory(hpGuideFilter).length;
    if (deltaX < 0 && hpGuideIndex < total - 1) {
      hpGuideIndex++;
      hpGuideFlipped = false;
      render();
    } else if (deltaX > 0 && hpGuideIndex > 0) {
      hpGuideIndex--;
      hpGuideFlipped = false;
      render();
    }
  },
  { passive: true }
);

app.addEventListener("input", (event) => {
  const target = event.target as HTMLElement;
  const profileField = target.closest<HTMLElement>("[data-profile]");
  if (profileField) {
    const key = profileField.dataset.profile as keyof StudyProfile;
    if (key) {
      if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target instanceof HTMLInputElement) {
        studyProfile = { ...studyProfile, [key]: target.value };
        saveStudyProfile(studyProfile);
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
