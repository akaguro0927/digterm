"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { useClearedNodes } from "@/lib/userStore";
import { useHasPaidAccess } from "@/lib/plan";
import {
  levels,
  chaptersByLevel,
  nodesByChapter,
  isChapterAccessible,
  levelProgressList,
  nextNodeId,
  getFlatNode,
} from "@/data/journey";

// レベル別の色（バー・見出し）
const LEVEL_ACCENT: Record<string, { bar: string; ring: string; text: string }> = {
  beginner: { bar: "bg-emerald-500", ring: "ring-emerald-200", text: "text-emerald-600" },
  intermediate: { bar: "bg-sky-500", ring: "ring-sky-200", text: "text-sky-600" },
  advanced: { bar: "bg-violet-500", ring: "ring-violet-200", text: "text-violet-600" },
};

export default function CurriculumPage() {
  const cleared = useClearedNodes();
  const clearedSet = new Set(cleared);
  const hasPaid = useHasPaidAccess();
  const progress = levelProgressList(cleared);

  // 「次にやるマス」（未クリアの先頭）
  const nextId = nextNodeId(cleared);
  const nextFlat = nextId ? getFlatNode(nextId) : undefined;
  const nextLocked = nextFlat ? !isChapterAccessible(nextFlat.chapter, hasPaid) : false;
  const started = cleared.length > 0;
  const allDone = nextId === null && started;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* ヘッダー */}
      <div className="animate-fade-up">
        <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          学習の道のりにもどる
        </Link>
        <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">CURRICULUM</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">コース目次</h1>
        <p className="mt-2 text-sm text-slate-500">
          初級から上級まで、全コースの章を一覧で。気になる章から見て、いまの立ち位置を確かめよう。
        </p>

        {/* レベルへジャンプ（初級→中級→上級のショートカット） */}
        <nav className="mt-4 flex flex-wrap gap-2" aria-label="レベルへジャンプ">
          {levels.map((lm) => {
            const accent = LEVEL_ACCENT[lm.level];
            const lp = progress.find((p) => p.level === lm.level);
            return (
              <a
                key={lm.level}
                href={`#${lm.level}`}
                className={`group flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-slate-600 ring-2 ring-[#e7ddc8] transition hover:text-slate-900 hover:ring-brand-300`}
              >
                <span className={`h-2 w-2 rounded-full ${accent.bar}`} />
                {lm.label}
                {lp && (
                  <span className={`font-display ${lp.pct >= 100 ? "text-amber-500" : "text-slate-400"}`}>
                    {lp.pct >= 100 ? "制覇" : `${lp.pct}%`}
                  </span>
                )}
              </a>
            );
          })}
        </nav>
      </div>

      {/* 全コース制覇の祝福 */}
      {allDone && (
        <div className="animate-pop-in relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-6 text-center text-white shadow-lg shadow-amber-500/25">
          <div className="bg-dots pointer-events-none absolute inset-0 opacity-10" aria-hidden />
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
            <Icon name="trophy" className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-3 text-2xl font-extrabold">全コース制覇！</h2>
          <p className="mt-1 text-sm text-amber-50">初級から上級まで、すべてのマスをクリアしたよ。おめでとう、そしてここからが本番だ！</p>
        </div>
      )}

      {/* 続きから再開（次にやるマス） */}
      {nextFlat && (
        <Link
          href={nextLocked ? "/vip" : `/learn/${nextFlat.node.id}`}
          className="group animate-fade-up mt-6 flex items-center gap-4 rounded-2xl border-2 border-brand-100 bg-gradient-to-r from-brand-50 to-white p-4 transition hover:border-brand-200"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
            <Icon name={nextLocked ? "lock" : "flag"} className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[11px] font-bold tracking-widest text-brand-500">
              {started ? "つづきから" : "ここからスタート"}
            </p>
            <p className="font-display truncate text-sm font-extrabold text-slate-800">
              {nextFlat.chapter.title}「{nextFlat.node.title}」
            </p>
            <p className="truncate text-[11px] text-slate-400">
              {nextLocked ? "VIPで開放されるマスです" : "次にやるマスへ、1タップで再開"}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
            {nextLocked ? "VIPを見る" : "再開"}
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      )}

      {/* レベルごと */}
      {levels.map((lm) => {
        const accent = LEVEL_ACCENT[lm.level];
        const chapters = chaptersByLevel(lm.level);
        const lp = progress.find((p) => p.level === lm.level);
        return (
          <section key={lm.level} id={lm.level} className="mt-10 scroll-mt-24">
            <div className="flex items-end justify-between">
              <div>
                <p className={`font-display text-[11px] font-bold tracking-widest ${accent.text}`}>{lm.eyebrow}</p>
                <h2 className="font-display mt-0.5 text-2xl font-extrabold">{lm.label}</h2>
                <p className="mt-1 max-w-md text-xs text-slate-400">{lm.tagline}</p>
              </div>
              {lp && (
                lp.pct >= 100 ? (
                  <span className="font-display inline-flex shrink-0 animate-pop-in items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
                    <Icon name="trophy" className="h-3.5 w-3.5" />
                    制覇！
                  </span>
                ) : (
                  <span className="font-display shrink-0 text-sm font-extrabold text-slate-500">
                    {lp.pct}<span className="text-xs text-slate-300">%</span>
                  </span>
                )
              )}
            </div>
            {lp && (
              <div className={`mt-2 h-2 overflow-hidden rounded-full bg-slate-100 ${lp.pct >= 100 ? "ring-2 ring-amber-200" : ""}`}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${lp.pct >= 100 ? "bg-gradient-to-r from-amber-400 to-amber-500" : accent.bar}`}
                  style={{ width: `${lp.pct}%` }}
                />
              </div>
            )}

            <div className="mt-4 space-y-3">
              {chapters.map((chap, i) => {
                const nodes = nodesByChapter[chap.id] ?? [];
                const total = nodes.length;
                const done = nodes.filter((n) => clearedSet.has(n.id)).length;
                const chapterDone = total > 0 && done === total;
                const locked = !isChapterAccessible(chap, hasPaid);
                const firstNode = nodes[0];
                const href = locked ? "/vip" : firstNode ? `/learn/${firstNode.id}` : "/learn";
                return (
                  <Link
                    key={chap.id}
                    href={href}
                    className="group card-pop flex items-center gap-3 p-4"
                  >
                    <span
                      className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                        chapterDone ? "bg-brand-500 text-white" : chap.chip
                      }`}
                    >
                      {chapterDone ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-display text-sm font-extrabold text-slate-800 group-hover:text-brand-600">
                          {chap.title}
                        </span>
                        {chap.access === "free" ? (
                          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-600 ring-1 ring-brand-100">無料</span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">
                            <Icon name="trophy" className="h-2.5 w-2.5" />VIP
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-slate-400">{chap.subtitle}</p>
                      {/* 章内の進捗 */}
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div className={`h-full rounded-full ${accent.bar}`} style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{done}/{total} マス</span>
                      </div>
                    </div>
                    {locked ? (
                      <Icon name="lock" className="h-4 w-4 shrink-0 text-amber-400" />
                    ) : (
                      <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
