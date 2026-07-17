"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { usePlan, setPlan } from "@/lib/plan";
import { useAuth } from "@/lib/supabase/AuthProvider";

const ROWS: { label: string; free: string | boolean; vip: string | boolean }[] = [
  { label: "図鑑を見る", free: true, vip: true },
  { label: "問題集・実力試験", free: true, vip: true },
  { label: "ストリーク・デイリーゴール", free: true, vip: true },
  { label: "レッスン（すごろく）", free: "第1〜2章まで", vip: "全章" },
  { label: "弱点復習（間違いだけ集中）", free: false, vip: true },
  { label: "AIでしらべる / AIに質問", free: "1日1回お試し", vip: "無制限" },
  { label: "プレミアム用語（上級・実装課題）", free: false, vip: true },
  { label: "広告", free: "あり", vip: "なし" },
];

function Cell({ v, accent }: { v: string | boolean; accent?: boolean }) {
  if (v === true)
    return <Icon name="check" className={`mx-auto h-5 w-5 ${accent ? "text-brand-600" : "text-emerald-500"}`} strokeWidth={3} />;
  if (v === false) return <Icon name="x" className="mx-auto h-4 w-4 text-slate-300" strokeWidth={3} />;
  return <span className={`text-xs font-bold ${accent ? "text-brand-700" : "text-slate-500"}`}>{v}</span>;
}

export default function VipPage() {
  const plan = usePlan();
  const isVip = plan === "vip";
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  // 申し込み: Stripe が設定済みなら Checkout へ、未設定ならデモ切替。
  const startCheckout = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
        return;
      }
      // 未設定（demo）＝ローカルで VIP を有効化して体験
      setPlan("vip");
    } catch {
      setPlan("vip");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-fade-up text-center">
        <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
          <Icon name="trophy" className="h-3.5 w-3.5" />
          Co-Cre VIP
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">もっと本気で覚えるなら</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          無料でも「調べる」は使い放題。VIPは「身につける」機能（弱点復習・全レッスン・AI無制限・広告なし）が開きます。
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm">
          <span className="text-slate-500">いまのプラン：</span>
          <span className={`font-display font-extrabold ${isVip ? "text-amber-600" : "text-slate-700"}`}>
            {isVip ? "VIP会員" : "無料プラン"}
          </span>
        </div>
      </div>

      {/* 比較表 */}
      <div className="card-pop mt-8 overflow-hidden p-0">
        <div className="grid grid-cols-[1fr_5rem_5rem] items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-4 py-3 text-center sm:grid-cols-[1fr_7rem_7rem]">
          <span className="text-left text-xs font-bold text-slate-400">できること</span>
          <span className="font-display text-sm font-extrabold text-slate-500">無料</span>
          <span className="font-display flex items-center justify-center gap-1 text-sm font-extrabold text-amber-600">
            <Icon name="trophy" className="h-3.5 w-3.5" />
            VIP
          </span>
        </div>
        {ROWS.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1fr_5rem_5rem] items-center gap-2 px-4 py-3 text-center sm:grid-cols-[1fr_7rem_7rem] ${
              i % 2 ? "bg-white" : "bg-slate-50/30"
            }`}
          >
            <span className="text-left text-sm font-medium text-slate-700">{r.label}</span>
            <Cell v={r.free} />
            <span className="rounded-xl bg-amber-50/60 py-1">
              <Cell v={r.vip} accent />
            </span>
          </div>
        ))}
      </div>

      {/* CTA（いまはデモ切替） */}
      <div className="mt-6 text-center">
        {!isVip ? (
          <>
            <button
              onClick={startCheckout}
              disabled={busy}
              className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 text-sm font-extrabold text-white disabled:opacity-50"
              style={{ ["--edge" as string]: "#b45309" }}
            >
              <Icon name="trophy" className="h-4 w-4" />
              {busy ? "準備中…" : "VIPに申し込む"}
            </button>
            <p className="mt-3 text-xs text-slate-400">
              決済キー未設定のいまは、押すとデモでVIP機能を体験できます。<br />
              Stripe を設定すると、このボタンから実際の申し込み（Checkout）に切り替わります。
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-amber-50 px-5 py-3 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
              <Icon name="check" className="h-4 w-4" strokeWidth={3} />
              VIP機能が開放されています（デモ）
            </div>
            <div className="mt-4">
              <button onClick={() => setPlan("free")} className="text-xs font-bold text-slate-400 hover:text-slate-600 hover:underline">
                無料プランに戻す（デモ）
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
        <Link href="/ai" className="font-bold text-brand-600 hover:underline">
          AIでしらべるを試す →
        </Link>
        <span className="text-slate-300">/</span>
        <Link href="/mypage" className="font-bold text-brand-600 hover:underline">
          マイページ →
        </Link>
      </div>
    </div>
  );
}
