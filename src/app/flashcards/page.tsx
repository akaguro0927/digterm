"use client";

import { useState } from "react";
import Link from "next/link";
import { terms, getTerm, type Term, type Category, CATEGORY_LABELS } from "@/data/terms";
import { categoryTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";
import {
  useFavorites,
  useQuizAttempts,
  useWeakClears,
  computeWeakSlugs,
  recordActivity,
} from "@/lib/userStore";

const SESSION_SIZE = 20;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Phase = "setup" | "play" | "done";

export default function FlashcardsPage() {
  const favs = useFavorites();
  const attempts = useQuizAttempts();
  const weakClears = useWeakClears();
  const weakSlugs = computeWeakSlugs(attempts, weakClears).map((w) => w.slug);

  const [phase, setPhase] = useState<Phase>("setup");
  const [deck, setDeck] = useState<Term[]>([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [deckLabel, setDeckLabel] = useState("");

  const start = (label: string, pool: Term[]) => {
    if (pool.length === 0) return;
    setDeck(shuffle(pool).slice(0, SESSION_SIZE));
    setDeckLabel(label);
    setIdx(0);
    setFlipped(false);
    setKnown([]);
    setPhase("play");
  };

  const judge = (ok: boolean) => {
    const card = deck[idx];
    if (ok) setKnown((k) => [...k, card.slug]);
    if (idx + 1 >= deck.length) {
      recordActivity(); // 1セッション=学習1回（ストリーク/カレンダーに反映）
      setPhase("done");
    } else {
      setIdx((i) => i + 1);
      setFlipped(false);
    }
  };

  // ===== セットアップ =====
  if (phase === "setup") {
    const cats = (Object.keys(CATEGORY_LABELS) as Category[]).filter((c) => (c as string) !== "all");
    const decks: { label: string; count: number; pool: Term[]; icon: Parameters<typeof Icon>[0]["name"]; tint: string }[] = [
      { label: "すべて", count: terms.length, pool: terms, icon: "book-open", tint: "bg-brand-50 text-brand-600" },
      { label: "苦手（誤答）", count: weakSlugs.length, pool: weakSlugs.map((s) => getTerm(s)).filter((t): t is Term => !!t), icon: "flame", tint: "bg-rose-50 text-rose-500" },
      { label: "お気に入り", count: favs.length, pool: favs.map((s) => getTerm(s)).filter((t): t is Term => !!t), icon: "heart", tint: "bg-amber-50 text-amber-500" },
    ];

    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="animate-fade-up text-center">
          <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-600 ring-1 ring-violet-100">
            <Icon name="book" className="h-3.5 w-3.5" />
            フラッシュカード
          </span>
          <h1 className="font-display mt-3 text-3xl font-extrabold">カードで暗記</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            表で名前、めくって意味。「覚えた／まだ」でサクサク確認。1回{SESSION_SIZE}枚まで。
          </p>
        </div>

        <p className="font-display mt-8 mb-2 text-sm font-extrabold text-slate-700">デッキを選ぶ</p>
        <div className="space-y-2.5">
          {decks.map((d) => (
            <button
              key={d.label}
              onClick={() => start(d.label, d.pool)}
              disabled={d.count === 0}
              className="card-pop flex w-full items-center gap-3 p-4 text-left transition enabled:hover:-translate-y-0.5 disabled:opacity-40"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${d.tint}`}>
                <Icon name={d.icon} className="h-5 w-5" />
              </span>
              <span className="flex-1">
                <span className="font-display block font-extrabold text-slate-800">{d.label}</span>
                <span className="text-xs text-slate-400">{d.count}語{d.count === 0 ? "（まだありません）" : ""}</span>
              </span>
              <Icon name="arrow-right" className="h-4 w-4 text-slate-300" strokeWidth={2.5} />
            </button>
          ))}
        </div>

        <p className="font-display mt-6 mb-2 text-sm font-extrabold text-slate-700">カテゴリから</p>
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => {
            const pool = terms.filter((t) => t.category === c);
            const th = categoryTheme[c];
            return (
              <button
                key={c}
                onClick={() => start(CATEGORY_LABELS[c], pool)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-brand-600"
              >
                <Icon name={th.icon} className="h-4 w-4" />
                {CATEGORY_LABELS[c]}
                <span className="text-xs text-slate-400">{pool.length}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ===== 結果 =====
  if (phase === "done") {
    const total = deck.length;
    const n = known.length;
    const rate = total > 0 ? Math.round((n / total) * 100) : 0;
    const notKnown = deck.filter((c) => !known.includes(c.slug));
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="card-pop animate-pop-in p-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
            <Icon name="check" className="h-8 w-8" strokeWidth={3} />
          </span>
          <h1 className="font-display mt-4 text-2xl font-extrabold">おつかれさま！</h1>
          <p className="font-display mt-3 text-4xl font-extrabold text-slate-800">
            {n}
            <span className="text-2xl text-slate-400"> / {total}</span>
          </p>
          <p className="mt-1 text-sm text-slate-400">覚えた（{rate}%）・デッキ: {deckLabel}</p>
          <div className="mx-auto mt-4 h-2.5 max-w-xs overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-500 transition-all duration-1000" style={{ width: `${rate}%` }} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {notKnown.length > 0 && (
              <button
                onClick={() => start(`${deckLabel}・復習`, notKnown)}
                className="btn-3d font-display rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#12a854" }}
              >
                覚えてないカードだけ（{notKnown.length}）
              </button>
            )}
            <button
              onClick={() => setPhase("setup")}
              className="btn-3d rounded-full bg-white px-6 py-2.5 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
              style={{ ["--edge" as string]: "#ebe4d5" }}
            >
              デッキを選び直す
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== プレイ =====
  const card = deck[idx];
  const th = categoryTheme[card.category];

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      {/* 進捗 */}
      <div className="mb-5 flex items-center gap-3">
        <button onClick={() => setPhase("setup")} className="text-xs font-bold text-slate-400 hover:text-brand-600">やめる</button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all" style={{ width: `${(idx / deck.length) * 100}%` }} />
        </div>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {idx + 1} <span className="text-slate-300">/ {deck.length}</span>
        </span>
      </div>

      {/* カード（タップでめくる） */}
      <button onClick={() => setFlipped((f) => !f)} className="block w-full [perspective:1200px]" aria-label="カードをめくる">
        <div
          className={`relative h-72 w-full transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        >
          {/* 表：名前 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.6rem] border-2 border-[#e7ddc8] bg-white p-6 text-center shadow-[0_5px_0_#e7ddc8] [backface-visibility:hidden]">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${th.chip}`}>
              <Icon name={th.icon} className="h-3 w-3" />
              {th.label}
            </span>
            <p className="font-display mt-4 text-3xl font-extrabold text-slate-800">{card.nameJa}</p>
            <p className="mt-1 text-sm uppercase tracking-wide text-slate-400">{card.nameEn}</p>
            <p className="mt-6 flex items-center gap-1 text-xs text-slate-400">
              <Icon name="pointer" className="h-3.5 w-3.5" />
              タップして意味を見る
            </p>
          </div>
          {/* 裏：意味 */}
          <div className="absolute inset-0 flex flex-col justify-center rounded-[1.6rem] border-2 border-brand-300 bg-brand-50/40 p-6 text-center shadow-[0_5px_0_#a8f0c4] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="font-display text-lg font-extrabold text-brand-700">{card.nameJa}</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{card.summary}</p>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">{card.description}</p>
            <span className="mt-3 text-[11px] font-bold text-brand-600">図鑑で実物を見る →</span>
          </div>
        </div>
      </button>

      {/* 判定ボタン */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => judge(false)}
          className="btn-3d font-display rounded-2xl bg-white py-3.5 text-sm font-extrabold text-rose-500 ring-2 ring-rose-200"
          style={{ ["--edge" as string]: "#fecdd3" }}
        >
          まだ
        </button>
        <button
          onClick={() => judge(true)}
          className="btn-3d font-display rounded-2xl bg-brand-500 py-3.5 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          覚えた
        </button>
      </div>

      <p className="mt-4 text-center">
        <Link href={`/zukan/${card.slug}`} className="text-xs font-bold text-slate-400 hover:text-brand-600">
          この用語を図鑑で開く
        </Link>
      </p>
    </div>
  );
}
