"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { usePlan, setPlan } from "@/lib/plan";
import { getInviteCode, hasRedeemed, markRedeemed, INVITE_REWARD_DAYS } from "@/lib/invite";

export default function InvitePage() {
  const plan = usePlan();
  const [code, setCode] = useState("COCRE-••••••");
  const [copied, setCopied] = useState(false);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  useEffect(() => {
    setCode(getInviteCode());
    setRedeemed(hasRedeemed());
  }, []);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareText = `Co-Cre（フロントエンド用語図鑑）を使ってるよ！この招待コードで登録するとお互いにVIP${INVITE_REWARD_DAYS}日プレゼント → ${code}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 無視 */
    }
  };

  const redeem = (e: React.FormEvent) => {
    e.preventDefault();
    const v = input.trim().toUpperCase();
    if (!v) return;
    if (v === code) {
      setMsg({ ok: false, text: "自分のコードは使えません。" });
      return;
    }
    if (redeemed) {
      setMsg({ ok: false, text: "すでに招待コードを利用済みです。" });
      return;
    }
    if (!/^COCRE-[A-Z0-9]{4,8}$/.test(v)) {
      setMsg({ ok: false, text: "コードの形式が正しくありません（例: COCRE-AB12CD）。" });
      return;
    }
    markRedeemed();
    setRedeemed(true);
    setPlan("vip");
    setMsg({ ok: true, text: `VIP${INVITE_REWARD_DAYS}日をプレゼント！（デモ）VIP機能が使えるようになりました。` });
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="animate-fade-up text-center">
        <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 ring-1 ring-amber-100">
          <Icon name="trophy" className="h-3.5 w-3.5" />
          友達招待
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">友達を招待してVIP</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          あなたのコードで友達が始めると、<span className="font-bold text-slate-700">お互いにVIP{INVITE_REWARD_DAYS}日</span>プレゼント。
        </p>
      </div>

      {/* 自分のコード */}
      <div className="card-pop mt-6 p-6 text-center">
        <p className="font-display text-xs font-bold text-slate-400">あなたの招待コード</p>
        <p className="font-display mt-2 select-all text-3xl font-extrabold tracking-widest text-brand-600">{code}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={copy} className="btn-3d rounded-full bg-brand-500 py-2.5 text-sm font-extrabold text-white" style={{ ["--edge" as string]: "#12a854" }}>
            {copied ? "コピー済" : "コピー"}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-slate-900 py-2.5 text-center text-sm font-bold text-white transition hover:brightness-110"
          >
            Xで招待
          </a>
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#06c755] py-2.5 text-center text-sm font-bold text-white transition hover:brightness-110"
          >
            LINEで招待
          </a>
        </div>
      </div>

      {/* コードを使う */}
      <div className="card-pop mt-4 p-6">
        <p className="font-display text-sm font-extrabold text-slate-800">招待された人はこちら</p>
        <p className="mt-1 text-xs text-slate-500">受け取ったコードを入力すると、VIP{INVITE_REWARD_DAYS}日がもらえます。</p>
        <form onSubmit={redeem} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setMsg(null);
            }}
            placeholder="COCRE-AB12CD"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm uppercase tracking-widest outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
          <button type="submit" className="btn-3d font-display shrink-0 rounded-xl bg-brand-500 px-5 text-sm font-extrabold text-white" style={{ ["--edge" as string]: "#12a854" }}>
            使う
          </button>
        </form>
        {msg && (
          <p className={`mt-2 flex items-center gap-1.5 text-xs ${msg.ok ? "text-brand-600" : "text-rose-500"}`}>
            <Icon name={msg.ok ? "check" : "x"} className="h-3.5 w-3.5" strokeWidth={3} />
            {msg.text}
          </p>
        )}
        {plan === "vip" && !msg && <p className="mt-2 text-xs font-bold text-amber-600">現在VIP会員です。</p>}
      </div>

      <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-center text-[11px] leading-relaxed text-slate-400 ring-1 ring-slate-200">
        ※これはモックです。本番では、招待された友達が実際に登録したときに、両者へ自動でVIP{INVITE_REWARD_DAYS}日を付与します（不正利用対策つき）。
      </p>

      <p className="mt-4 text-center">
        <Link href="/vip" className="text-sm font-bold text-brand-600 hover:underline">VIPでできることを見る →</Link>
      </p>
    </div>
  );
}
