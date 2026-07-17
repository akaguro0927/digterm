"use client";

import { useClearedNodes } from "@/lib/userStore";
import { awards, earnedAwards } from "@/data/awards";
import { Icon } from "@/components/icons";

// 獲得した賞の棚（/learn に表示）。獲得＝色つき、未獲得＝グレー。
export default function AwardShelf() {
  const cleared = useClearedNodes();
  const earnedIds = new Set(earnedAwards(cleared).map((a) => a.id));

  return (
    <div className="card-pop mt-8 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <Icon name="trophy" className="h-4 w-4" />
          </span>
          獲得した賞
        </h2>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {earnedIds.size}
          <span className="text-slate-300"> / {awards.length}</span>
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {awards.map((a) => {
          const got = earnedIds.has(a.id);
          return (
            <div
              key={a.id}
              className={`flex items-center gap-3 rounded-2xl border-2 p-3 transition ${
                got ? "border-[#ebe4d5] bg-white shadow-[0_3px_0_#ebe4d5]" : "border-dashed border-slate-200 bg-slate-50/50"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                  got ? a.tint : "bg-slate-100 text-slate-300"
                }`}
              >
                <Icon name={got ? a.icon : "lock"} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className={`font-display truncate text-sm font-extrabold ${got ? "text-slate-800" : "text-slate-400"}`}>
                  {a.title}
                </p>
                <p className="truncate text-[11px] text-slate-400">{got ? a.desc : "まだ獲得していません"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
