// クライアント側のAI窓口。サーバーの /api/ai/* を呼ぶ（キー未設定ならサーバーがモックを返す）。
// UIはこの関数にだけ依存する。

import type { IdentifyCandidate, AskResult } from "@/lib/ai/core";

export type { IdentifyCandidate, AskResult };

export async function identifyFromImage(file: File): Promise<IdentifyCandidate[]> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch("/api/ai/identify", { method: "POST", body: form });
  const data = await res.json();
  return (data.candidates ?? []) as IdentifyCandidate[];
}

export async function askAI(question: string): Promise<AskResult> {
  const res = await fetch("/api/ai/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  return (await res.json()) as AskResult;
}

// ============ 利用回数（無料の1日上限）＝コスト暴走を防ぐ／VIPで無制限 ============

const AI_USAGE_KEY = "cocre:ai-usage:v1";
export const AI_FREE_DAILY = 1; // 無料は1日1回お試し（VIPは無制限）

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function getAiRemaining(): number {
  if (typeof window === "undefined") return AI_FREE_DAILY;
  try {
    const raw = window.localStorage.getItem(AI_USAGE_KEY);
    const data = raw ? (JSON.parse(raw) as { date: string; count: number }) : null;
    const used = data && data.date === todayKey() ? data.count : 0;
    return Math.max(0, AI_FREE_DAILY - used);
  } catch {
    return AI_FREE_DAILY;
  }
}

export function consumeAi(): number {
  if (typeof window === "undefined") return AI_FREE_DAILY;
  try {
    const raw = window.localStorage.getItem(AI_USAGE_KEY);
    const data = raw ? (JSON.parse(raw) as { date: string; count: number }) : null;
    const used = data && data.date === todayKey() ? data.count : 0;
    const next = { date: todayKey(), count: used + 1 };
    window.localStorage.setItem(AI_USAGE_KEY, JSON.stringify(next));
    return Math.max(0, AI_FREE_DAILY - next.count);
  } catch {
    return AI_FREE_DAILY;
  }
}
