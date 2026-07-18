"use client";

// 会員プラン（無料 / VIP / 買い切り）の状態。いまは端末ローカルのデモ切替。
// 本番では Supabase の subscriptions / purchases（+ サーバー判定）に置き換える。
//   free     … 無料。初級コース＋中級の入口(m1)まで。
//   vip      … サブスク。全コース＋AI無制限＋広告なし。
//   lifetime … 買い切り（設計のみ・未リリース）。中上級コースの“閲覧”を永続開放。
//              AI無制限などの継続コストがかかる機能は含めない想定（詳細は docs/05）。
import { useSyncExternalStore } from "react";

export type Plan = "free" | "vip" | "lifetime";
const PLAN_KEY = "cocre:plan:v1";

/** localStorage の生値を正規化。未知の値は free。 */
function readPlan(): Plan {
  if (!isBrowser) return "free";
  const v = window.localStorage.getItem(PLAN_KEY);
  return v === "vip" || v === "lifetime" ? v : "free";
}

let snapshot: Plan = "free";
let hydrated = false;
const isBrowser = typeof window !== "undefined";
const listeners = new Set<() => void>();

function ensure() {
  if (hydrated || !isBrowser) return;
  try {
    snapshot = readPlan();
  } catch {
    snapshot = "free";
  }
  hydrated = true;
}

function emit() {
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key === PLAN_KEY || e.key === null) {
    snapshot = readPlan();
    emit();
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (isBrowser && listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (isBrowser && listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

export function setPlan(p: Plan) {
  snapshot = p;
  hydrated = true;
  if (isBrowser) {
    try {
      window.localStorage.setItem(PLAN_KEY, p);
    } catch {
      /* 無視 */
    }
  }
  emit();
}

export function usePlan(): Plan {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensure();
      return snapshot;
    },
    () => "free"
  );
}

export function useIsVip(): boolean {
  return usePlan() === "vip";
}

/**
 * 有料コンテンツ（中上級コースなど）を開けるか。
 * サブスク(vip)でも買い切り(lifetime)でも true。
 * 章のロック判定にはこちらを使う（AI無制限など“継続コスト機能”は useIsVip 側で分ける）。
 */
export function useHasPaidAccess(): boolean {
  const p = usePlan();
  return p === "vip" || p === "lifetime";
}
