"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { useClearedNodes } from "@/lib/userStore";
import { useHasPaidAccess } from "@/lib/plan";
import { isPublicChapterAccessible, nextPublicNodeId, publicChaptersForLevel, publicLevelProgress } from "@/lib/journey/client";
import type { PublicCourseLevel, PublicJourney } from "@/lib/journey/types";

const ACCENT: Record<PublicCourseLevel, { bar: string; text: string; ring: string }> = {
  beginner: { bar: "bg-emerald-500", text: "text-emerald-600", ring: "ring-emerald-200" },
  intermediate: { bar: "bg-sky-500", text: "text-sky-600", ring: "ring-sky-200" },
  advanced: { bar: "bg-violet-500", text: "text-violet-600", ring: "ring-violet-200" },
};

// レッスンの「目次ハブ」。続きから再開＋初級/中級/上級の入口カード。
// 長い1画面スクロールをやめ、各レベルは専用ページ（/learn/course/[level]）に分ける。
export default function LevelHub({ journey }: { journey: PublicJourney }) {
  const cleared = useClearedNodes();
  const hasPaid = useHasPaidAccess();
  const progress = publicLevelProgress(journey, cleared);

  const nextId = nextPublicNodeId(journey.flatNodes, cleared);
  const nextFlat = nextId ? journey.flatNodes.find((item) => item.node.id === nextId) : undefined;
  const nextLocked = nextFlat ? !isPublicChapterAccessible(nextFlat.chapter, hasPaid) : false;
  const started = cleared.length > 0;

  return (
    <div>
      {/* つづきから（スクロール不要で今のマスへ直行） */}
      {nextFlat && (
        <Link
          href={nextLocked ? "/vip" : `/learn/${nextFlat.node.id}`}
          className="group flex items-center gap-4 rounded-2xl border-2 border-brand-100 bg-gradient-to-r from-brand-50 to-white p-4 transition hover:border-brand-200"
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
              {nextLocked ? "VIPで開放されるマスです" : "スクロールせず、1タップで今の続きへ"}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
            {nextLocked ? "VIPを見る" : "再開"}
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      )}

      {/* レベルの入口カード（それぞれ専用ページへ画面遷移） */}
      <div className="mt-4 grid gap-3">
        {journey.levels.map((lm) => {
          const accent = ACCENT[lm.level];
          const lp = progress.find((p) => p.level === lm.level);
          const chaps = publicChaptersForLevel(journey, lm.level);
          const locked = chaps.length > 0 && chaps.every((c) => !isPublicChapterAccessible(c, hasPaid));
          const done = lp?.pct === 100;
          return (
            <Link
              key={lm.level}
              href={`/learn/course/${lm.level}`}
              className="group card-pop flex items-center gap-4 p-4"
            >
              <span className={`font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white ${accent.bar}`}>
                {done ? <Icon name="trophy" className="h-6 w-6" /> : <Icon name="flag" className="h-6 w-6" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-display text-base font-extrabold text-slate-800 group-hover:text-brand-600">{lm.label}</span>
                  <span className={`font-display text-[11px] font-bold ${accent.text}`}>{lm.eyebrow}</span>
                  {locked && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 ring-1 ring-amber-200">
                      <Icon name="trophy" className="h-2.5 w-2.5" />VIP
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-[11px] text-slate-400">{lm.tagline}</p>
                {lp && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full ${accent.bar}`} style={{ width: `${lp.pct}%` }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {done ? "制覇！" : `${lp.done}/${lp.total} マス`}
                    </span>
                  </div>
                )}
              </div>
              <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
