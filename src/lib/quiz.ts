import { terms, type Term } from "@/data/terms";
import { normalize } from "@/lib/search";

// 問題は用語データから自動生成する（docs/06_問題集設計.md の方針）。
// 用語を追加するだけで問題も増える。

export type QuizMode = "beginner" | "intermediate" | "advanced" | "exam";

export type QuestionType = "name-choice" | "desc-choice" | "input";

export interface Question {
  term: Term;
  type: QuestionType;
  prompt: string;
  choices?: string[]; // 選択式のみ
  answer: string; // 表示用の正解
}

export interface ModeConfig {
  mode: QuizMode;
  title: string;
  tagline: string;
  questionCount: number;
  timeLimitSec?: number; // 試験のみ
  passRate?: number; // 試験のみ（0-1）
}

export const MODE_CONFIGS: Record<QuizMode, ModeConfig> = {
  beginner: {
    mode: "beginner",
    title: "初心者モード",
    tagline: "4択で「名前と意味」を結びつける最初の一歩",
    questionCount: 10,
  },
  intermediate: {
    mode: "intermediate",
    title: "中級者モード",
    tagline: "説明・使いどころから用語を判断する",
    questionCount: 10,
  },
  advanced: {
    mode: "advanced",
    title: "上級者モード",
    tagline: "選択肢なし。用語名を自分でタイプして答える",
    questionCount: 10,
  },
  exam: {
    mode: "exam",
    title: "実力試験",
    tagline: "全カテゴリ20問・制限時間10分・正答率80%で合格",
    questionCount: 20,
    timeLimitSec: 600,
    passRate: 0.8,
  },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 誤答の選択肢は同カテゴリから優先して選ぶ（間違えやすいものを混ぜる）
function pickDistractors(correct: Term, count: number): Term[] {
  const sameCategory = shuffle(
    terms.filter((t) => t.slug !== correct.slug && t.category === correct.category)
  );
  const others = shuffle(
    terms.filter((t) => t.slug !== correct.slug && t.category !== correct.category)
  );
  return [...sameCategory, ...others].slice(0, count);
}

function makeNameChoice(term: Term, useUseCase: boolean): Question {
  const distractors = pickDistractors(term, 3);
  const prompt = useUseCase
    ? `「${term.useCase}」——この場面で使う部品・用語は？`
    : `「${term.summary}」——この説明に当てはまる用語は？`;
  return {
    term,
    type: "name-choice",
    prompt,
    choices: shuffle([term, ...distractors]).map((t) => t.nameJa),
    answer: term.nameJa,
  };
}

function makeDescChoice(term: Term): Question {
  const distractors = pickDistractors(term, 3);
  return {
    term,
    type: "desc-choice",
    prompt: `「${term.nameJa}」の説明として正しいものは？`,
    choices: shuffle([term, ...distractors]).map((t) => t.summary),
    answer: term.summary,
  };
}

function makeInput(term: Term): Question {
  return {
    term,
    type: "input",
    prompt: `「${term.summary}」——この用語の名前は？（日本語・英語どちらでもOK）`,
    answer: term.nameJa,
  };
}

// 記述式の正誤判定: 表記ゆれ（ひらがな/カタカナ/英語/別名）を許容する
export function isInputCorrect(term: Term, input: string): boolean {
  const v = normalize(input);
  if (!v) return false;
  const paren = term.nameJa.match(/[（(](.+?)[）)]/)?.[1];
  const base = term.nameJa.replace(/[（(].+?[）)]/g, "");
  const candidates = [
    term.nameJa,
    base,
    paren ?? "",
    term.nameEn,
    term.reading,
    ...(term.aliases ?? []),
  ]
    .filter(Boolean)
    .map((c) => normalize(c).replace(/[（()）・･\-‐/／]/g, ""));
  const cleaned = v.replace(/[（()）・･\-‐/／]/g, "");
  return candidates.some((c) => c === cleaned);
}

/** 苦手復習用：指定した用語(slug)だけから出題（4択中心・タイプ入力は使わず取り組みやすく） */
export function generateReviewQuiz(slugs: string[], count = 10): Question[] {
  const set = new Set(slugs);
  const pool = shuffle(terms.filter((t) => set.has(t.slug)));
  return pool
    .slice(0, Math.min(count, pool.length))
    .map((t, i) => (i % 2 === 0 ? makeNameChoice(t, false) : makeDescChoice(t)));
}

export function generateQuiz(mode: QuizMode): Question[] {
  const config = MODE_CONFIGS[mode];

  if (mode === "beginner") {
    const pool = shuffle(terms.filter((t) => t.level === 1));
    return pool
      .slice(0, config.questionCount)
      .map((t, i) => (i % 3 === 2 ? makeDescChoice(t) : makeNameChoice(t, false)));
  }

  if (mode === "intermediate") {
    const pool = shuffle(terms.filter((t) => t.level <= 2));
    return pool.slice(0, config.questionCount).map((t, i) => {
      if (i % 3 === 0) return makeDescChoice(t);
      if (i % 3 === 1) return makeNameChoice(t, true);
      return makeNameChoice(t, false);
    });
  }

  if (mode === "advanced") {
    // 上級はレベル2〜3中心。タイプして答える（写経学習と同じ思想）
    const hard = terms.filter((t) => t.level >= 2);
    const pool = shuffle(hard.length >= config.questionCount ? hard : terms);
    return pool.slice(0, config.questionCount).map((t) => makeInput(t));
  }

  // 試験: 全レベルから出題。4択中心＋記述を数問ミックス
  const pool = shuffle(terms);
  return pool.slice(0, config.questionCount).map((t, i) => {
    if (i % 5 === 4) return makeInput(t);
    if (i % 5 === 2) return makeDescChoice(t);
    return makeNameChoice(t, i % 5 === 3);
  });
}
