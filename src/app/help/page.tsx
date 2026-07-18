"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "@/components/icons";

const FEATURES: { icon: IconName; tint: string; title: string; body: string; href: string }[] = [
  { icon: "book-open", tint: "bg-brand-50 text-brand-600", title: "図鑑", body: "用語やUI部品を、実物デモつきで検索。名前がうろ覚えでも探せます。", href: "/zukan" },
  { icon: "message", tint: "bg-violet-50 text-violet-600", title: "みんなのQ&A", body: "わからないことを質問して、みんなで教えあう場所。", href: "/qa" },
  { icon: "flag", tint: "bg-amber-50 text-amber-600", title: "レッスン", body: "コクリと物語で学ぶすごろく。読んで→テストで少しずつ進みます。", href: "/learn" },
  { icon: "zap", tint: "bg-indigo-50 text-indigo-600", title: "AIでしらべる", body: "スクショから部品名を判定・AIに質問（無料は1日1回／VIP無制限）。", href: "/ai" },
  { icon: "pencil", tint: "bg-rose-50 text-rose-600", title: "問題集", body: "クイズと実力試験で定着。間違えた用語は苦手復習へ。", href: "/quiz" },
  { icon: "book", tint: "bg-emerald-50 text-emerald-600", title: "フラッシュカード", body: "カードをめくって「覚えた／まだ」でサクサク暗記。", href: "/flashcards" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "登録しなくても使えますか？", a: "はい。図鑑・問題集・レッスンなどは登録なし・無料で使えます。ログインすると、学習記録が複数の端末で同期できます。" },
  { q: "「VIP」だと何ができますか？", a: "AIでしらべる／AIに質問が無制限になり、広告が消え、全レッスン・弱点復習などが開放されます。無料でも「調べる」機能はずっと使えます。" },
  { q: "AIはどのくらい使えますか？", a: "無料プランは1日1回お試しで使えます。もっと使いたい場合はVIP会員（無制限）へ。" },
  { q: "うろ覚えの名前でも検索できますか？", a: "できます。ひらがな・カタカナ・英語のほか、「三本線」「くるくる」など“見た目の記憶”でもヒットします。" },
  { q: "学習の記録は消えますか？", a: "未ログインの場合はこの端末にのみ保存されます。ログインするとアカウントに紐づき、引き継げます。マイページからいつでも削除もできます。" },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-pop overflow-hidden p-0">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
        <span className="font-display text-sm font-bold text-slate-800">{q}</span>
        <Icon name="chevron-right" className={`h-4 w-4 shrink-0 text-slate-300 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && <p className="border-t border-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-600">{a}</p>}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-fade-up text-center">
        <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600 ring-1 ring-brand-100">
          <Icon name="message" className="h-3.5 w-3.5" />
          ヘルプ
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">使い方ガイド</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">Co-Cre の使い方と、よくある質問をまとめました。</p>
        <button
          onClick={() => window.dispatchEvent(new Event("cocre:open-tutorial"))}
          className="btn-3d font-display mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          <Icon name="flag" className="h-4 w-4" />
          30秒ツアーをもう一度見る
        </button>
      </div>

      {/* 機能ガイド */}
      <h2 className="font-display mb-3 mt-10 text-lg font-extrabold text-slate-800">できること</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <Link key={f.title} href={f.href} className="card-pop flex items-start gap-3 p-4 transition hover:-translate-y-0.5">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${f.tint}`}>
              <Icon name={f.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display font-extrabold text-slate-800">{f.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{f.body}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <h2 className="font-display mb-3 mt-10 text-lg font-extrabold text-slate-800">よくある質問</h2>
      <div className="space-y-2.5">
        {FAQ.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        解決しないときは{" "}
        <Link href="/contact" className="font-bold text-brand-600 hover:underline">お問い合わせ</Link>
        {" "}からどうぞ。
      </p>
    </div>
  );
}
