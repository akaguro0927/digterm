"use client";

import { useSeen, useClearedNodes, useQuizAttempts, useFavorites } from "@/lib/userStore";
import { computeXp, levelInfo } from "@/lib/level";

// 既存の学習データからXP・レベル・称号を計算して表示（保存なし・コスト0）。
export default function LevelCard() {
  const seen = useSeen();
  const cleared = useClearedNodes();
  const attempts = useQuizAttempts();
  const favs = useFavorites();

  const quizCorrect = attempts.reduce((s, a) => s + a.score, 0);
  const xp = computeXp(seen.length, cleared.length, quizCorrect, favs.length);
  const info = levelInfo(xp);

  return (
    <div className="card-pop p-5">
      <div className="flex items-center gap-4">
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_3px_0_#12a854]">
          <span className="font-display text-2xl font-extrabold leading-none">{info.level}</span>
          <span className="absolute -bottom-2 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-extrabold text-brand-600 shadow ring-1 ring-brand-100">Lv</span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[11px] font-bold tracking-widest text-brand-500">称号</p>
          <p className="font-display truncate text-lg font-extrabold text-slate-800">{info.title}</p>
        </div>
        <span className="font-display shrink-0 text-sm font-extrabold text-slate-400">
          {info.xp}
          <span className="ml-0.5 text-xs">XP</span>
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700" style={{ width: `${info.pct}%` }} />
      </div>
      <p className="mt-1.5 text-right text-[11px] text-slate-400">次のレベルまで あと {info.toNext} XP</p>
    </div>
  );
}
