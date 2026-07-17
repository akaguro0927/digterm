// 端末ローカル（localStorage）にお気に入り・クイズ成績を保存するストア。
//
// 【設計方針】将来 Supabase（docs/04_データ設計.md の favorites / quiz_results テーブル）へ
// 差し替える前提で、このファイルの public API（toggleFavorite / recordQuizAttempt / useFavorites …）を
// テーブル構造と1対1に対応させている。移行時は read/write の中身を Supabase クライアント呼び出しに
// 置き換えるだけで、UI 側（コンポーネント）はそのまま使える。
//
//   localStorage キー          → 将来のテーブル       （docs/04）
//   ---------------------------------------------------------------
//   cocre:favorites:v1        → favorites (term slug, created_at)
//   cocre:quiz-results:v1     → quiz_results (mode, score, total, wrong_term_ids, taken_at)

import { useCallback, useSyncExternalStore } from "react";
import type { QuizMode } from "@/lib/quiz";

const FAV_KEY = "cocre:favorites:v1";
const QUIZ_KEY = "cocre:quiz-results:v1";
const SEEN_KEY = "cocre:seen:v1"; // 詳細を開いた（読んだ）用語のslug → 学習マップの達成度に使う
const JOURNEY_KEY = "cocre:journey:v1"; // クリアしたすごろくノードのid
const STREAK_KEY = "cocre:streak:v1"; // 連続学習日数＋今日の目標
const ACTIVITY_KEY = "cocre:activity-log:v1"; // 日付(YYYY-MM-DD)→学習回数（カレンダー用）
const WEAKCLEAR_KEY = "cocre:weak-clears:v1"; // 苦手復習で正解した回数（slug→count）
const MAX_ATTEMPTS = 200; // 直近200件だけ保持（localStorage肥大化を防ぐ）

export const DAILY_GOAL_DEFAULT = 3; // 1日の目標アクション数

/** ストリーク（連続学習）の保存データ */
export interface StreakData {
  lastDate: string; // 最後に学習した日（YYYY-MM-DD, local）
  current: number; // 連続日数
  longest: number; // 最長連続日数
  todayCount: number; // その日(lastDate)のアクション数
  goal: number; // 1日の目標
}

const EMPTY_STREAK: StreakData = { lastDate: "", current: 0, longest: 0, todayCount: 0, goal: DAILY_GOAL_DEFAULT };

/** 苦手な用語（誤答から集計） */
export interface WeakTerm {
  slug: string;
  misses: number; // 実効ミス数（誤答回数 − 復習正解回数）
}
const EMPTY_WEAKCLEARS: Readonly<Record<string, number>> = Object.freeze({});
const EMPTY_ACTIVITY: Readonly<Record<string, number>> = Object.freeze({});

/** クイズ1回分の成績（→ quiz_results テーブル1行に対応） */
export interface QuizAttempt {
  mode: QuizMode;
  score: number; // 正答数
  total: number; // 出題数
  wrongSlugs: string[]; // 間違えた用語のslug（→ wrong_term_ids / 復習導線用）
  takenAt: number; // epoch ms（→ taken_at）
}

const isBrowser = typeof window !== "undefined";

// 参照の同一性を保つための空定数（useSyncExternalStore は Object.is で比較するため）
const EMPTY_FAV: readonly string[] = [];
const EMPTY_QUIZ: readonly QuizAttempt[] = [];
const EMPTY_SEEN: readonly string[] = [];
const EMPTY_JOURNEY: readonly string[] = [];

function read<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 容量超過などは黙って無視（学習記録は必須データではない） */
  }
}

// ---- モジュール内キャッシュ（getSnapshotで安定した参照を返すため） ----
let favSnapshot: readonly string[] = EMPTY_FAV;
let quizSnapshot: readonly QuizAttempt[] = EMPTY_QUIZ;
let seenSnapshot: readonly string[] = EMPTY_SEEN;
let journeySnapshot: readonly string[] = EMPTY_JOURNEY;
let streakSnapshot: StreakData = EMPTY_STREAK;
let weakClearsSnapshot: Record<string, number> = EMPTY_WEAKCLEARS;
let activitySnapshot: Record<string, number> = EMPTY_ACTIVITY;
let hydrated = false;

function ensureHydrated() {
  if (hydrated || !isBrowser) return;
  favSnapshot = read<string[]>(FAV_KEY, []);
  quizSnapshot = read<QuizAttempt[]>(QUIZ_KEY, []);
  seenSnapshot = read<string[]>(SEEN_KEY, []);
  journeySnapshot = read<string[]>(JOURNEY_KEY, []);
  streakSnapshot = read<StreakData>(STREAK_KEY, EMPTY_STREAK);
  weakClearsSnapshot = read<Record<string, number>>(WEAKCLEAR_KEY, {});
  activitySnapshot = read<Record<string, number>>(ACTIVITY_KEY, {});
  hydrated = true;
}

// ---- 購読（同一タブは直接emit、別タブは storage イベントで反映） ----
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key === FAV_KEY || e.key === null) favSnapshot = read<string[]>(FAV_KEY, []);
  if (e.key === QUIZ_KEY || e.key === null) quizSnapshot = read<QuizAttempt[]>(QUIZ_KEY, []);
  if (e.key === SEEN_KEY || e.key === null) seenSnapshot = read<string[]>(SEEN_KEY, []);
  if (e.key === JOURNEY_KEY || e.key === null) journeySnapshot = read<string[]>(JOURNEY_KEY, []);
  if (e.key === STREAK_KEY || e.key === null) streakSnapshot = read<StreakData>(STREAK_KEY, EMPTY_STREAK);
  if (e.key === WEAKCLEAR_KEY || e.key === null) weakClearsSnapshot = read<Record<string, number>>(WEAKCLEAR_KEY, {});
  if (e.key === ACTIVITY_KEY || e.key === null) activitySnapshot = read<Record<string, number>>(ACTIVITY_KEY, {});
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (isBrowser && listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (isBrowser && listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

// ---- 遠隔（Supabase）書き込みフック（ログイン時に sync 層が登録） ----
export interface RemoteHook {
  favorite?: (slug: string, on: boolean) => void;
  quiz?: (attempt: QuizAttempt) => void;
}
let remoteHook: RemoteHook | null = null;
export function setRemoteHook(h: RemoteHook | null) {
  remoteHook = h;
}

// ============ お気に入り ============

export function toggleFavorite(slug: string) {
  ensureHydrated();
  const set = new Set(favSnapshot);
  const on = !set.has(slug);
  if (on) set.add(slug);
  else set.delete(slug);
  favSnapshot = [...set];
  persist(FAV_KEY, favSnapshot);
  emit();
  remoteHook?.favorite?.(slug, on);
}

// sync 層用（非フックの現在値取得 / 一括置換）
export function getFavoritesNow(): readonly string[] {
  ensureHydrated();
  return favSnapshot;
}
export function replaceFavorites(list: string[]) {
  ensureHydrated();
  favSnapshot = [...new Set(list)];
  persist(FAV_KEY, favSnapshot);
  emit();
}

export function useFavorites(): readonly string[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return favSnapshot;
    },
    () => EMPTY_FAV
  );
}

/** 1用語のお気に入り状態とトグル関数を返す */
export function useFavorite(slug: string): [boolean, () => void] {
  const favs = useFavorites();
  const toggle = useCallback(() => toggleFavorite(slug), [slug]);
  return [favs.includes(slug), toggle];
}

// ============ 既読（読んだ用語） ============

export function markSeen(slug: string) {
  ensureHydrated();
  if (seenSnapshot.includes(slug)) return; // 変更なしなら再描画も起こさない
  seenSnapshot = [...seenSnapshot, slug];
  persist(SEEN_KEY, seenSnapshot);
  emit();
  recordActivity(); // 用語を読んだら学習1回とカウント
}

export function useSeen(): readonly string[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return seenSnapshot;
    },
    () => EMPTY_SEEN
  );
}

// ============ ストリーク（連続学習）＋デイリーゴール ============

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** 2つの YYYY-MM-DD の差（日数, b - a）。空なら Infinity。 */
function daysBetween(a: string, b: string): number {
  if (!a || !b) return Infinity;
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const ta = new Date(ay, am - 1, ad).getTime();
  const tb = new Date(by, bm - 1, bd).getTime();
  return Math.round((tb - ta) / 86400000);
}

/** 学習アクション（読む・マスクリア・クイズ）が起きたら呼ぶ。連続日数と今日の進捗を更新。 */
export function recordActivity() {
  ensureHydrated();
  const today = ymd(new Date());
  const s = streakSnapshot;
  const gap = daysBetween(s.lastDate, today); // 0=今日, 1=昨日から, それ以上=空き
  const goal = s.goal || DAILY_GOAL_DEFAULT;
  let next: StreakData;
  if (gap === 0) {
    next = { ...s, todayCount: s.todayCount + 1, goal };
  } else if (gap === 1) {
    const current = s.current + 1;
    next = { lastDate: today, current, longest: Math.max(s.longest, current), todayCount: 1, goal };
  } else {
    // 初回、または2日以上あいた＝リセットして1日目
    next = { lastDate: today, current: 1, longest: Math.max(s.longest, 1), todayCount: 1, goal };
  }
  streakSnapshot = next;
  persist(STREAK_KEY, next);
  // 学習カレンダー用に、その日の回数も記録
  activitySnapshot = { ...activitySnapshot, [today]: (activitySnapshot[today] ?? 0) + 1 };
  persist(ACTIVITY_KEY, activitySnapshot);
  emit();
}

/** 日付(YYYY-MM-DD)→学習回数のログ（学習カレンダー用） */
export function useActivityLog(): Record<string, number> {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return activitySnapshot;
    },
    () => EMPTY_ACTIVITY
  );
}

/** 表示用に「今日時点」で補正したストリーク情報 */
export interface StreakView {
  streak: number; // 表示する連続日数（途切れていれば0）
  todayCount: number; // 今日のアクション数
  goal: number;
  goalMet: boolean; // 今日の目標達成
  activeToday: boolean; // 今日すでに学習した
  longest: number;
}

function viewOf(s: StreakData): StreakView {
  const goal = s.goal || DAILY_GOAL_DEFAULT;
  const gap = daysBetween(s.lastDate, ymd(new Date()));
  if (gap === 0) {
    return { streak: s.current, todayCount: s.todayCount, goal, goalMet: s.todayCount >= goal, activeToday: true, longest: s.longest };
  }
  if (gap === 1) {
    return { streak: s.current, todayCount: 0, goal, goalMet: false, activeToday: false, longest: s.longest };
  }
  return { streak: 0, todayCount: 0, goal, goalMet: false, activeToday: false, longest: s.longest };
}

export function useStreak(): StreakView {
  const s = useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return streakSnapshot;
    },
    () => EMPTY_STREAK
  );
  return viewOf(s);
}

// ============ すごろく学習の進捗（クリアしたノード） ============

export function markNodeCleared(nodeId: string) {
  ensureHydrated();
  if (journeySnapshot.includes(nodeId)) return;
  journeySnapshot = [...journeySnapshot, nodeId];
  persist(JOURNEY_KEY, journeySnapshot);
  emit();
  recordActivity(); // マスをクリアしたら学習1回とカウント
}

export function useClearedNodes(): readonly string[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return journeySnapshot;
    },
    () => EMPTY_JOURNEY
  );
}

// ============ クイズ成績 ============

export function recordQuizAttempt(attempt: QuizAttempt) {
  ensureHydrated();
  quizSnapshot = [attempt, ...quizSnapshot].slice(0, MAX_ATTEMPTS);
  persist(QUIZ_KEY, quizSnapshot);
  emit();
  remoteHook?.quiz?.(attempt);
  recordActivity(); // クイズを解いたら学習1回とカウント
}

// sync 層用（非フックの現在値取得 / 一括置換）
export function getQuizAttemptsNow(): readonly QuizAttempt[] {
  ensureHydrated();
  return quizSnapshot;
}
export function replaceQuizAttempts(list: QuizAttempt[]) {
  ensureHydrated();
  quizSnapshot = [...list].sort((a, b) => b.takenAt - a.takenAt).slice(0, MAX_ATTEMPTS);
  persist(QUIZ_KEY, quizSnapshot);
  emit();
}

export function useQuizAttempts(): readonly QuizAttempt[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return quizSnapshot;
    },
    () => EMPTY_QUIZ
  );
}

// ============ 苦手復習（誤答から「弱点」を集計） ============

/** 誤答履歴 − 復習正解 から、いまの苦手用語を多い順で返す */
export function computeWeakSlugs(
  attempts: readonly QuizAttempt[],
  clears: Record<string, number>
): WeakTerm[] {
  const miss = new Map<string, number>();
  for (const a of attempts) for (const s of a.wrongSlugs) miss.set(s, (miss.get(s) ?? 0) + 1);
  const out: WeakTerm[] = [];
  for (const [slug, m] of miss) {
    const strength = m - (clears[slug] ?? 0);
    if (strength > 0) out.push({ slug, misses: strength });
  }
  return out.sort((a, b) => b.misses - a.misses);
}

/** 苦手復習で1問答えた結果を反映（正解なら苦手から1つ消し込む） */
export function recordReviewResult(slug: string, correct: boolean) {
  ensureHydrated();
  if (!correct) return; // 不正解は苦手のまま残す
  weakClearsSnapshot = { ...weakClearsSnapshot, [slug]: (weakClearsSnapshot[slug] ?? 0) + 1 };
  persist(WEAKCLEAR_KEY, weakClearsSnapshot);
  emit();
}

export function useWeakClears(): Record<string, number> {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensureHydrated();
      return weakClearsSnapshot;
    },
    () => EMPTY_WEAKCLEARS
  );
}

// ============ 集計（マイページ用） ============

export interface ModeBest {
  score: number;
  total: number;
  rate: number;
}

export interface QuizStats {
  totalRuns: number;
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number; // 0-1
  bestByMode: Partial<Record<QuizMode, ModeBest>>;
  examPassed: boolean;
  studyDays: number; // ユニークな学習日数
  lastPlayed?: number;
}

/** localの日付（YYYY-MM-DD）に変換して学習日を数える */
function localDayKey(epochMs: number): string {
  const d = new Date(epochMs);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export function computeStats(attempts: readonly QuizAttempt[]): QuizStats {
  const bestByMode: Partial<Record<QuizMode, ModeBest>> = {};
  const days = new Set<string>();
  let totalAnswered = 0;
  let totalCorrect = 0;
  let examPassed = false;
  let lastPlayed: number | undefined;

  for (const a of attempts) {
    totalAnswered += a.total;
    totalCorrect += a.score;
    days.add(localDayKey(a.takenAt));
    if (lastPlayed === undefined || a.takenAt > lastPlayed) lastPlayed = a.takenAt;

    const rate = a.total > 0 ? a.score / a.total : 0;
    const prev = bestByMode[a.mode];
    if (!prev || rate > prev.rate) bestByMode[a.mode] = { score: a.score, total: a.total, rate };
    if (a.mode === "exam" && rate >= 0.8) examPassed = true;
  }

  return {
    totalRuns: attempts.length,
    totalAnswered,
    totalCorrect,
    accuracy: totalAnswered > 0 ? totalCorrect / totalAnswered : 0,
    bestByMode,
    examPassed,
    studyDays: days.size,
    lastPlayed,
  };
}

// ============ 全消去（マイページの「記録を消す」用） ============

export function clearAllUserData() {
  favSnapshot = EMPTY_FAV;
  quizSnapshot = EMPTY_QUIZ;
  seenSnapshot = EMPTY_SEEN;
  journeySnapshot = EMPTY_JOURNEY;
  streakSnapshot = EMPTY_STREAK;
  weakClearsSnapshot = EMPTY_WEAKCLEARS;
  activitySnapshot = EMPTY_ACTIVITY;
  if (isBrowser) {
    try {
      window.localStorage.removeItem(FAV_KEY);
      window.localStorage.removeItem(QUIZ_KEY);
      window.localStorage.removeItem(SEEN_KEY);
      window.localStorage.removeItem(JOURNEY_KEY);
      window.localStorage.removeItem(STREAK_KEY);
      window.localStorage.removeItem(WEAKCLEAR_KEY);
      window.localStorage.removeItem(ACTIVITY_KEY);
    } catch {
      /* 無視 */
    }
  }
  emit();
}
