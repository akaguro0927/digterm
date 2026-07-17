"use client";

import { useStreak } from "@/lib/userStore";
import { Icon } from "@/components/icons";

// 連続学習日数（ストリーク）＋今日の目標リング。毎日開く動機づけ（Duolingo式）。
export default function StreakBar() {
  const { streak, todayCount, goal, goalMet, activeToday } = useStreak();
  const pct = goal > 0 ? Math.min(1, todayCount / goal) : 0;
  const R = 16;
  const C = 2 * Math.PI * R;

  return (
    <div className="card-pop flex items-center justify-between gap-3 p-4">
      {/* ストリーク */}
      <div className="flex items-center gap-3">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            streak > 0 ? "bg-amber-50 text-amber-500" : "bg-slate-100 text-slate-300"
          }`}
        >
          <Icon name="flame" className="h-6 w-6" />
        </span>
        <div>
          <p className="font-display text-2xl font-extrabold leading-none text-slate-800">
            {streak}
            <span className="ml-1 text-sm font-bold text-slate-400">日連続</span>
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            {streak === 0
              ? "今日から始めよう！"
              : activeToday
                ? "今日ももう学習ずみ、えらい！"
                : "今日も続けて記録をのばそう"}
          </p>
        </div>
      </div>

      {/* 今日の目標リング */}
      <div className="flex items-center gap-2.5">
        <div className="hidden text-right sm:block">
          <p className="font-display text-[11px] font-bold text-slate-500">今日の目標</p>
          <p className="text-[11px] text-slate-400">{goalMet ? "達成！" : `あと ${Math.max(0, goal - todayCount)} 回`}</p>
        </div>
        <div className="relative h-12 w-12 shrink-0">
          <svg viewBox="0 0 40 40" className="h-12 w-12 -rotate-90">
            <circle cx="20" cy="20" r={R} fill="none" stroke="#eef2f7" strokeWidth="5" />
            <circle
              cx="20"
              cy="20"
              r={R}
              fill="none"
              stroke={goalMet ? "#12a854" : "#40dc7e"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - pct)}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center">
            {goalMet ? (
              <Icon name="check" className="h-5 w-5 text-brand-600" strokeWidth={3} />
            ) : (
              <span className="font-display text-xs font-extrabold text-slate-600">
                {todayCount}/{goal}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
