"use client";

import { Icon } from "@/components/icons";
import { useClearedNodes } from "@/lib/userStore";
import { MOCK_FRIENDS, progressLabel, progressPct } from "@/lib/friendsMock";

interface Row {
  name: string;
  cleared: number;
  tint: string;
  me?: boolean;
}

// 友達がいま「どの賞／どのコース」にいるかを一覧で見る（モック）。
// 本番では Supabase の friends 関係＋相手の進捗を読む（下部の注記参照）。
export default function FriendsProgress() {
  const cleared = useClearedNodes();
  const myCount = cleared.length;

  const rows: Row[] = [
    ...MOCK_FRIENDS.map((f) => ({ ...f })),
    { name: "あなた", cleared: myCount, tint: "bg-brand-500", me: true },
  ].sort((a, b) => b.cleared - a.cleared);

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2">
        <Icon name="trophy" className="h-4 w-4 text-amber-500" />
        <h2 className="font-display text-lg font-extrabold text-slate-800">友達の進捗</h2>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-400">モック</span>
      </div>
      <p className="mt-1 text-xs text-slate-500">だれがどのコースまで進んだかを見て、いっしょに競おう。</p>

      <div className="card-pop mt-3 divide-y divide-slate-100 p-0">
        {rows.map((r, idx) => (
          <div
            key={r.name}
            className={`flex items-center gap-3 px-4 py-3 ${r.me ? "bg-brand-50/50" : ""}`}
          >
            <span className={`font-display w-5 shrink-0 text-center text-sm font-extrabold ${idx === 0 ? "text-amber-500" : "text-slate-300"}`}>
              {idx + 1}
            </span>
            <span className={`font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white ${r.tint}`}>
              {r.name.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-sm font-extrabold text-slate-800">
                {r.name}
                {r.me && <span className="ml-1 text-[10px] font-bold text-brand-600">(あなた)</span>}
              </p>
              <p className="truncate text-[11px] text-slate-400">{progressLabel(r.cleared)}・{r.cleared}マス</p>
            </div>
            <span className="font-display shrink-0 text-sm font-extrabold text-slate-500">
              {progressPct(r.cleared)}<span className="text-[10px] text-slate-300">%</span>
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
        ※ 友達はダミー表示です。本番では、招待でつながった友達の実際の進捗が並びます。
      </p>
    </div>
  );
}
