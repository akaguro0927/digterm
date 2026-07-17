"use client";

// Q&Aコミュニティのモック用ストア（端末ローカル保存）。
// 本番では Supabase（questions / answers / votes）に置き換える。
import { useSyncExternalStore } from "react";

export interface Answer {
  id: string;
  body: string;
  author: string;
  createdAt: number;
  votes: number;
  best: boolean;
}
export interface Question {
  id: string;
  title: string;
  body: string;
  category: string;
  author: string;
  createdAt: number;
  votes: number;
  answers: Answer[];
}

export const QA_CATEGORIES = ["UI部品", "レイアウト", "HTML/CSS", "開発用語", "バックエンド", "その他"];

// NGワード（デモ用のごく一部。本番はサーバー側＋AIモデレーションで判定）
const NG_WORDS = ["死ね", "殺す", "バカ野郎", "きもい", "うざい"];
export function findNgWord(text: string): string | null {
  const t = text.toLowerCase();
  for (const w of NG_WORDS) if (t.includes(w.toLowerCase())) return w;
  return null;
}

const KEY = "cocre:qa:v1";
const isBrowser = typeof window !== "undefined";

function seed(): Question[] {
  const now = Date.now();
  const d = (days: number) => now - days * 86400000;
  return [
    {
      id: "q1",
      title: "この三本線のメニューって何て名前ですか？",
      body: "スマホサイトでよく見る、右上の横線3本のボタンの名前が知りたいです。",
      category: "UI部品",
      author: "しょしんしゃ",
      createdAt: d(1),
      votes: 6,
      answers: [
        { id: "a1", body: "「ハンバーガーメニュー」です！三本線がハンバーガーに見えることから。図鑑にも載ってますよ。", author: "せんぱいA", createdAt: d(1), votes: 9, best: true },
        { id: "a2", body: "ハンバーガーアイコンとも言いますね。押すとメニューが出てくるやつです。", author: "コクリ好き", createdAt: d(1), votes: 2, best: false },
      ],
    },
    {
      id: "q2",
      title: "flexboxとgrid、どっちを使えばいい？",
      body: "レイアウトを組むとき、flexとgridの使い分けが分かりません。",
      category: "レイアウト",
      author: "まなびたい",
      createdAt: d(2),
      votes: 4,
      answers: [
        { id: "a3", body: "ざっくり、1方向（横 or 縦）に並べるならflex、格子状（縦横）に置くならgridが向いてます。", author: "レイアウト職人", createdAt: d(2), votes: 7, best: true },
      ],
    },
    {
      id: "q3",
      title: "モーダルとダイアログって違うものですか？",
      body: "どちらも小さい窓が出るイメージなのですが…",
      category: "UI部品",
      author: "きになる",
      createdAt: d(3),
      votes: 3,
      answers: [
        { id: "a4", body: "ほぼ同じ意味で使われます。厳密には「モーダル＝後ろの操作をブロックする窓」全般で、ダイアログはその一種（対話用）というニュアンスです。", author: "せんぱいA", createdAt: d(3), votes: 5, best: false },
      ],
    },
    {
      id: "q4",
      title: "レスポンシブ対応って何から始めればいい？",
      body: "スマホでも見やすくしたいのですが、最初の一歩が分かりません。",
      category: "HTML/CSS",
      author: "はじめまして",
      createdAt: d(0),
      votes: 1,
      answers: [],
    },
    {
      id: "q5",
      title: "APIって結局なんですか？ざっくり知りたい",
      body: "よく聞くけどイメージが湧きません。",
      category: "バックエンド",
      author: "ぎもん",
      createdAt: d(4),
      votes: 5,
      answers: [
        { id: "a5", body: "お店の「店員さん」みたいなものです。こちらの注文（リクエスト）を受けて、裏から料理（データ）を持ってきてくれる窓口、が近いイメージ。", author: "たとえ名人", createdAt: d(4), votes: 8, best: true },
      ],
    },
  ];
}

let snapshot: Question[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function ensure() {
  if (hydrated || !isBrowser) return;
  try {
    const raw = window.localStorage.getItem(KEY);
    snapshot = raw ? (JSON.parse(raw) as Question[]) : seed();
    if (!raw) window.localStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    snapshot = seed();
  }
  hydrated = true;
}

function commit(next: Question[]) {
  snapshot = next;
  if (isBrowser) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* 無視 */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useQuestions(): Question[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      ensure();
      return snapshot;
    },
    () => []
  );
}

export function getQuestion(id: string): Question | undefined {
  ensure();
  return snapshot.find((q) => q.id === id);
}

const uid = () => Math.random().toString(36).slice(2, 9);

export function addQuestion(input: { title: string; body: string; category: string }): string {
  ensure();
  const id = uid();
  const q: Question = {
    id,
    title: input.title,
    body: input.body,
    category: input.category,
    author: "あなた",
    createdAt: Date.now(),
    votes: 0,
    answers: [],
  };
  commit([q, ...snapshot]);
  return id;
}

export function addAnswer(qid: string, body: string) {
  ensure();
  commit(
    snapshot.map((q) =>
      q.id === qid
        ? { ...q, answers: [...q.answers, { id: uid(), body, author: "あなた", createdAt: Date.now(), votes: 0, best: false }] }
        : q
    )
  );
}

export function voteQuestion(qid: string, dir: 1 | -1) {
  ensure();
  commit(snapshot.map((q) => (q.id === qid ? { ...q, votes: q.votes + dir } : q)));
}

export function voteAnswer(qid: string, aid: string, dir: 1 | -1) {
  ensure();
  commit(
    snapshot.map((q) =>
      q.id === qid ? { ...q, answers: q.answers.map((a) => (a.id === aid ? { ...a, votes: a.votes + dir } : a)) } : q
    )
  );
}

export function markBest(qid: string, aid: string) {
  ensure();
  commit(
    snapshot.map((q) =>
      q.id === qid ? { ...q, answers: q.answers.map((a) => ({ ...a, best: a.id === aid ? !a.best : false })) } : q
    )
  );
}
