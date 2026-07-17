"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getTerm } from "@/data/terms";
import { roadmap, roadmapSlugs } from "@/data/roadmap";
import { categoryTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";
import { useSeen } from "@/lib/userStore";

const INTRO_KEY = "cocre:map-introed:v1";

// 中央スパイン周りに左右へうねらせるための水平オフセット（Duolingo風の道のり）
function offsetX(globalIndex: number): number {
  return Math.round(Math.sin(globalIndex * 0.9) * 52);
}

export default function LearningMap({ hideWelcome = false }: { hideWelcome?: boolean }) {
  const seen = useSeen();
  const [playId, setPlayId] = useState(0); // ++でアニメを再生
  const [showWelcome, setShowWelcome] = useState(false);

  // 初回だけウェルカム表示（クライアントのみ／ハイドレーション不一致を避ける）
  // ※レッスンページに埋め込むときは hideWelcome で抑制（オンボーディングの二重表示を防ぐ）
  useEffect(() => {
    if (hideWelcome) return;
    try {
      if (!window.localStorage.getItem(INTRO_KEY)) setShowWelcome(true);
    } catch {
      /* 無視 */
    }
  }, [hideWelcome]);

  const dismissWelcome = () => {
    setShowWelcome(false);
    try {
      window.localStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* 無視 */
    }
    setPlayId((n) => n + 1); // 開始と同時にマップ全体をアニメ表示
  };

  const seenSet = useMemo(() => new Set(seen), [seen]);
  const total = roadmapSlugs.length;
  const done = roadmapSlugs.filter((s) => seenSet.has(s)).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  // 現在地 = 最初のまだ読んでいないノード
  const currentSlug = roadmapSlugs.find((s) => !seenSet.has(s)) ?? null;

  let globalIndex = -1;

  return (
    <div className="relative">
      {/* 進捗ヘッダー */}
      <div className="card-pop p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-brand-500">達成度</p>
            <p className="font-display mt-0.5 text-3xl font-extrabold text-slate-800">
              {pct}
              <span className="text-lg text-slate-400">%</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-sm font-extrabold text-slate-600">
              {done} <span className="text-slate-300">/ {total} 語</span>
            </p>
            <button
              onClick={() => setPlayId((n) => n + 1)}
              className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500 transition hover:bg-brand-50 hover:text-brand-600"
            >
              <Icon name="book-open" className="h-3 w-3" />
              マップを最初から
            </button>
          </div>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        {/* 凡例 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-500" />読んだ</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-white ring-2 ring-brand-400" />現在地</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-white ring-2 ring-[#e7ddc8]" />これから</span>
        </div>
      </div>

      {/* ウェルカム（初回のみ） */}
      {showWelcome && (
        <div className="animate-fade-up fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="animate-pop-in card-pop max-w-sm p-7 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
              <Icon name="book-open" className="h-8 w-8" />
            </span>
            <h2 className="font-display mt-4 text-xl font-extrabold">これがあなたの学習マップ</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              上から順にたどると、フロントエンドの<span className="font-bold text-slate-700">最低限おさえたい知識</span>が身につきます。
              用語を開くと「読んだ」印がつき、達成度が進みます。
            </p>
            <button
              onClick={dismissWelcome}
              className="btn-3d font-display mt-6 w-full rounded-full bg-brand-500 py-3 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              マップをはじめる
            </button>
          </div>
        </div>
      )}

      {/* 道のり */}
      <div key={playId} className="relative mx-auto mt-8 max-w-md pb-4">
        {/* 中央スパイン（点線の道） */}
        <div
          className="pointer-events-none absolute bottom-16 left-1/2 top-10 -translate-x-1/2 border-l-[3px] border-dashed border-[#e0d6bf]"
          aria-hidden
        />

        {roadmap.map((stage, si) => {
          const nodes = stage.slugs.map((s) => getTerm(s)).filter((t) => t !== undefined);
          const stageDone = stage.slugs.every((s) => seenSet.has(s));
          return (
            <section key={stage.title} className="relative">
              {/* ステージ見出し */}
              <div
                className="animate-pop-in relative mx-auto my-6 flex max-w-xs items-center gap-3 rounded-2xl border-2 border-[#e7ddc8] bg-[#fdfbf5] px-4 py-2.5 shadow-[0_3px_0_#e7ddc8]"
                style={{ animationDelay: `${si * 120}ms` }}
              >
                <span
                  className={`font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    stageDone ? "bg-brand-500 text-white" : "bg-white text-brand-600 ring-2 ring-brand-200"
                  }`}
                >
                  {stageDone ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : si + 1}
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-sm font-extrabold text-slate-800">{stage.title}</span>
                  <span className="block truncate text-[11px] text-slate-400">{stage.subtitle}</span>
                </span>
              </div>

              {/* ステージ内のノード */}
              <div className="relative flex flex-col items-center gap-8">
                {nodes.map((t) => {
                  globalIndex += 1;
                  const gi = globalIndex;
                  const th = categoryTheme[t.category];
                  const isDone = seenSet.has(t.slug);
                  const isCurrent = t.slug === currentSlug;
                  return (
                    <div
                      key={t.slug}
                      className="animate-pop-in relative"
                      style={{ transform: `translateX(${offsetX(gi)}px)`, animationDelay: `${gi * 55 + 200}ms` }}
                    >
                      {isCurrent && (
                        <span className="animate-float font-display absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                          ここから
                        </span>
                      )}
                      <Link
                        href={`/zukan/${t.slug}`}
                        className="group flex flex-col items-center"
                        title={t.nameJa}
                      >
                        <span
                          className={`flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-200 group-hover:-translate-y-1 group-active:translate-y-0.5 ${
                            isDone
                              ? "bg-brand-500 text-white shadow-[0_5px_0_#12a854]"
                              : isCurrent
                                ? "animate-pulse bg-white text-brand-600 ring-4 ring-brand-400 shadow-[0_5px_0_#e7ddc8]"
                                : "bg-white text-slate-400 ring-2 ring-[#e7ddc8] shadow-[0_4px_0_#e7ddc8]"
                          }`}
                        >
                          {isDone ? (
                            <Icon name="check" className="h-7 w-7" strokeWidth={3} />
                          ) : (
                            <Icon name={th.icon} className="h-6 w-6" />
                          )}
                        </span>
                        <span
                          className={`font-display mt-2 max-w-[7rem] truncate text-center text-xs font-bold ${
                            isDone ? "text-brand-700" : "text-slate-500"
                          }`}
                        >
                          {t.nameJa}
                        </span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ゴール */}
        <div className="animate-pop-in relative mt-8 flex flex-col items-center" style={{ animationDelay: `${total * 55 + 300}ms` }}>
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              pct === 100
                ? "bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_6px_0_#12a854]"
                : "bg-white text-slate-300 ring-2 ring-[#e7ddc8] shadow-[0_5px_0_#e7ddc8]"
            }`}
          >
            <Icon name="trophy" className="h-9 w-9" />
          </span>
          <p className="font-display mt-2 text-sm font-extrabold text-slate-700">
            {pct === 100 ? "制覇！おめでとう" : "ゴール：必修コンプリート"}
          </p>
        </div>
      </div>
    </div>
  );
}
