"use client";

import Link from "next/link";
import { useIsVip } from "@/lib/plan";
import { Icon } from "@/components/icons";

// 広告枠。無料ユーザーにだけ表示（VIPは非表示）。本番はここに AdSense のコードを差し込む。
export default function AdSlot({ className = "" }: { className?: string }) {
  const isVip = useIsVip();
  if (isVip) return null;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 ${className}`}>
      <span className="absolute right-2.5 top-2.5 rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-slate-400 ring-1 ring-slate-200">
        スポンサー
      </span>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-300 ring-1 ring-slate-200">
          <Icon name="image" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-500">広告スペース</p>
          <p className="text-[11px] text-slate-400">
            ここに広告が表示されます。
            <Link href="/vip" className="ml-0.5 font-bold text-brand-600 hover:underline">
              VIPで非表示に →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
