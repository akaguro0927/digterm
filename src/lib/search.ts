import type { Term } from "@/data/terms";

// カタカナ→ひらがな変換 + 小文字化で表記ゆれを吸収する
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/[ー・\s]/g, ""); // 長音・中黒・空白は無視
}

// q の文字が t に「順番どおり」現れるか（あいまい一致）。例: 「もだ」→「もーだる」
function isSubsequence(q: string, t: string): boolean {
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t[j] === q[i]) i++;
  }
  return i === q.length;
}

// 編集距離（レーベンシュタイン）。短い語同士なので素朴実装で十分。
function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    prev = curr;
  }
  return prev[b.length];
}

function nameTargets(term: Term): string[] {
  return [term.nameJa, term.nameEn, term.reading, ...(term.aliases ?? [])]
    .map(normalize)
    .filter(Boolean);
}

export function matchTerm(term: Term, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;
  const names = nameTargets(term);
  const summary = normalize(term.summary);
  // 1) 部分一致（名前系＋一言説明）
  if (summary.includes(q) || names.some((t) => t.includes(q))) return true;
  // 2) あいまい一致（名前系に順序どおり文字が含まれる）
  if (q.length >= 2 && names.some((t) => isSubsequence(q, t))) return true;
  return false;
}

// 検索の類似スコア（0〜1）。「もしかして」候補の並び替えに使う。
function similarity(q: string, term: Term): number {
  let best = 0;
  for (const n of nameTargets(term)) {
    if (n.includes(q) || q.includes(n)) best = Math.max(best, 0.95);
    else if (isSubsequence(q, n)) best = Math.max(best, 0.75);
    else {
      const ratio = 1 - levenshtein(q, n) / Math.max(q.length, n.length);
      if (ratio > 0.5) best = Math.max(best, ratio * 0.65);
    }
  }
  return best;
}

/**
 * 「これですか？」候補。ヒット0件のときに、綴り違い・あいまい表現から近い用語を返す。
 */
export function suggestTerms(query: string, pool: readonly Term[], limit = 3): Term[] {
  const q = normalize(query);
  if (q.length < 1) return [];
  return pool
    .map((t) => ({ t, s: similarity(q, t) }))
    .filter((x) => x.s >= 0.3)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.t);
}
