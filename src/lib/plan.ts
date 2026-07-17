"use client";

// 会員プラン（無料 / VIP）の状態。いまは端末ローカルのデモ切替。
// 本番では Supabase の subscriptions（+ サーバー判定）に置き換える。
import { useSyncExternalStore } from "react";

export type Plan = "free" | "vip";
const PLAN_KEY = "cocre:plan:v1";

let snapshot: Plan = "free";
let hydrated = false;
const isBrowser = typeof window !== "undefined";
const listeners = new Set<() => void>();

function ensure() {
  if (hydrated || !isBrowser) return;
  try {
    snapshot = window.localStorage.getItem(PLAN_KEY) === "vip" ? "vip" : "free";
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
    snapshot = isBrowser && window.localStorage.getItem(PLAN_KEY) === "vip" ? "vip" : "free";
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
