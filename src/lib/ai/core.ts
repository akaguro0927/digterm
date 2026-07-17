// ============================================================
// AIロジックの中核（サーバー安全・window非依存）。
// APIルート(/api/ai/*)とクライアント(型のみ)の両方から使う。
// GEMINI未設定時のフォールバック（モック）もここに置く。
// ============================================================

import { terms, getTerm, type Term } from "@/data/terms";
import { hasVisual } from "@/data/visualTerms";
import { normalize } from "@/lib/search";

export interface IdentifyCandidate {
  slug: string;
  confidence: number;
}

export interface AskResult {
  answer: string;
  refs: string[];
}

/** 有効そうな Gemini APIキーがあれば返す（Google の API キーは "AIza" 始まり）。
 * 形式が違うキーで失敗し続けないよう、形式チェックで“実質未設定”を判定する。 */
export function geminiKey(): string | null {
  const k = process.env.GEMINI_API_KEY;
  return k && k.startsWith("AIza") ? k : null;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const COMMON_SLUGS = [
  "button", "modal", "toast", "header", "hamburger-menu", "tab", "dropdown",
  "card", "spinner", "badge", "search-bar", "tooltip", "breadcrumb", "carousel",
  "drawer", "fab", "avatar", "accordion", "pagination", "progress-bar",
].filter((s) => getTerm(s) && hasVisual(s));

/** 図鑑で許可する語彙（AIに「この中から選ばせる」ためのカタログ） */
export function visualCatalog(): { slug: string; name: string }[] {
  return terms.filter((t) => hasVisual(t.slug)).map((t) => ({ slug: t.slug, name: t.nameJa }));
}

/** 質問文の中の図鑑用語を拾う（簡易RAGの根拠）。
 * 表記ゆれ（長音・中黒など）を normalize で吸収し、質問に含まれる用語名のうち
 * 一番長く一致したものを採用する（＝より具体的な語を優先）。 */
export function findTermInQuestion(q: string): Term | null {
  const nq = normalize(q);
  if (!nq) return null;
  let best: Term | null = null;
  let bestLen = 0;
  for (const t of terms) {
    const names = [t.nameJa, t.nameEn, t.reading, ...(t.aliases ?? [])];
    for (const name of names) {
      const nn = normalize(name);
      if (nn.length >= 2 && nq.includes(nn) && nn.length > bestLen) {
        best = t;
        bestLen = nn.length;
      }
    }
  }
  return best;
}

// ---- モック（GEMINI未設定時のフォールバック） ----

export function mockIdentify(): IdentifyCandidate[] {
  const picked = shuffle(COMMON_SLUGS).slice(0, 3);
  return picked.map((slug, i) => ({ slug, confidence: 0.92 - i * 0.22 }));
}

export function mockAsk(question: string): AskResult {
  const hit = findTermInQuestion(question);
  if (hit) {
    return {
      answer: `「${hit.nameJa}」（${hit.nameEn}）のことですね。\n\n${hit.summary}\n\n${hit.description}\n\n＜よく使う場面＞\n${hit.useCase}`,
      refs: [hit.slug],
    };
  }
  return {
    answer:
      "いい質問ですね！\nいまはお試し版なので、図鑑にある用語名を入れて聞くと、その用語をくわしく解説します。\n例：「モーダルって何？」「ハンバーガーメニューの使いどころは？」",
    refs: [],
  };
}
