"use client";

// 友達招待コード（モック）。本番では Supabase の referrals テーブルで
// 「招待した/された」を検証し、両者にVIP期間を付与する。
const CODE_KEY = "cocre:invite-code:v1";
const REDEEMED_KEY = "cocre:invite-redeemed:v1";

export const INVITE_REWARD_DAYS = 7;

function gen(): string {
  return "COCRE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function getInviteCode(): string {
  if (typeof window === "undefined") return "COCRE-XXXXXX";
  try {
    let c = window.localStorage.getItem(CODE_KEY);
    if (!c) {
      c = gen();
      window.localStorage.setItem(CODE_KEY, c);
    }
    return c;
  } catch {
    return "COCRE-XXXXXX";
  }
}

export function hasRedeemed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(REDEEMED_KEY) === "1";
  } catch {
    return false;
  }
}

export function markRedeemed() {
  try {
    window.localStorage.setItem(REDEEMED_KEY, "1");
  } catch {
    /* 無視 */
  }
}
