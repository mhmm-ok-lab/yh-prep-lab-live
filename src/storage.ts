import type { SessionDraft, StudySession } from "./types";

const STUDY_SESSIONS_KEY = "yh.study-sessions";
const ACTIVE_SESSION_KEY = "yh.active-session";
const SNAPSHOT_VERSION = 1;
let storageNamespace = "default";

export interface StudyDataSnapshot {
  version: number;
  exportedAt: string;
  studySessions: StudySession[];
  activeSession: SessionDraft | null;
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function namespacedKey(key: string): string {
  return `${key}.${storageNamespace}`;
}

function sanitizeNamespace(value: string): string {
  const safe = value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return safe || "default";
}

export function setStorageNamespace(namespace: string): string {
  storageNamespace = sanitizeNamespace(namespace);
  return storageNamespace;
}

export function getStorageNamespace(): string {
  return storageNamespace;
}

export function loadStudySessions(): StudySession[] {
  return safeParse<StudySession[]>(localStorage.getItem(namespacedKey(STUDY_SESSIONS_KEY)), []);
}

export function saveStudySession(session: StudySession): void {
  const sessions = loadStudySessions();
  sessions.unshift(session);
  localStorage.setItem(namespacedKey(STUDY_SESSIONS_KEY), JSON.stringify(sessions.slice(0, 100)));
}

export function loadActiveSession(): SessionDraft | null {
  return safeParse<SessionDraft | null>(localStorage.getItem(namespacedKey(ACTIVE_SESSION_KEY)), null);
}

export function saveActiveSession(session: SessionDraft): void {
  localStorage.setItem(namespacedKey(ACTIVE_SESSION_KEY), JSON.stringify(session));
}

export function clearActiveSession(): void {
  localStorage.removeItem(namespacedKey(ACTIVE_SESSION_KEY));
}

export function exportStudyDataSnapshot(): StudyDataSnapshot {
  return {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    studySessions: loadStudySessions(),
    activeSession: loadActiveSession()
  };
}

export function importStudyDataSnapshot(snapshot: Partial<StudyDataSnapshot>): {
  importedSessions: number;
  restoredActiveSession: boolean;
} {
  const sessions = Array.isArray(snapshot.studySessions) ? snapshot.studySessions.slice(0, 100) : [];
  localStorage.setItem(namespacedKey(STUDY_SESSIONS_KEY), JSON.stringify(sessions));

  const hasActive = !!snapshot.activeSession && typeof snapshot.activeSession === "object";
  if (hasActive) {
    localStorage.setItem(namespacedKey(ACTIVE_SESSION_KEY), JSON.stringify(snapshot.activeSession));
  } else {
    localStorage.removeItem(namespacedKey(ACTIVE_SESSION_KEY));
  }

  return {
    importedSessions: sessions.length,
    restoredActiveSession: hasActive
  };
}
