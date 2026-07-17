"use client";

// プロフィール（表示名・ひとこと・保有資格・IT経験年数）。いまは端末ローカル保存。
// 本番では Supabase の profiles テーブルに保存する。
import { useSyncExternalStore } from "react";

export interface Profile {
  displayName: string;
  bio: string;
  certifications: string; // カンマ区切りなど自由記述（例: 基本情報技術者, ITパスポート）
  experienceYears: string; // IT実務歴（年）
}

const KEY = "cocre:profile:v1";
const EMPTY: Profile = { displayName: "", bio: "", certifications: "", experienceYears: "" };

let snapshot: Profile = EMPTY;
let hydrated = false;
const isBrowser = typeof window !== "undefined";
const listeners = new Set<() => void>();

function ensure() {
  if (hydrated || !isBrowser) return;
  try {
    const raw = window.localStorage.getItem(KEY);
    snapshot = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Profile>) } : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
  hydrated = true;
}

function emit() {
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key === KEY || e.key === null) {
    try {
      const raw = isBrowser ? window.localStorage.getItem(KEY) : null;
      snapshot = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Profile>) } : EMPTY;
    } catch {
      snapshot = EMPTY;
    }
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

export function saveProfile(p: Profile) {
  snapshot = p;
  hydrated = true;
  if (isBrowser) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      /* 無視 */
    }
  }
  emit();
}

export function useProfile(): Profile {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensure();
      return snapshot;
    },
    () => EMPTY
  );
}

export function hasProfile(p: Profile): boolean {
  return !!(p.displayName || p.bio || p.certifications || p.experienceYears);
}
