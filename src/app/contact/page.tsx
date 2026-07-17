"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useAuth } from "@/lib/supabase/AuthProvider";

const CATEGORIES = ["不具合の報告", "機能の要望", "使い方の質問", "アカウント・課金", "その他"];

export default function ContactPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(user?.email ?? "");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, category, message }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setBusy(false);
    }
  };

  const inputCls =
    "mt-1 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-brand-500";

  if (sent) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
          <Icon name="check" className="h-8 w-8" strokeWidth={3} />
        </span>
        <h1 className="font-display mt-4 text-2xl font-extrabold">送信しました！</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          お問い合わせありがとうございます。内容を確認します。
        </p>
        <Link href="/mypage" className="mt-6 text-sm font-bold text-brand-600 hover:underline">
          マイページにもどる
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <div className="animate-fade-up mb-6">
        <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          マイページにもどる
        </Link>
        <h1 className="font-display mt-1 flex items-center gap-2 text-2xl font-extrabold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon name="mail" className="h-5 w-5" />
          </span>
          お問い合わせ
        </h1>
        <p className="mt-1 text-sm text-slate-500">不具合・要望・質問など、お気軽にどうぞ。</p>
      </div>

      <form onSubmit={submit} className="card-pop space-y-4 p-6 sm:p-7">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">お名前（任意）</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="例: あかぐろ" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500">返信先メール（任意）</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500">種別</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500">内容 <span className="text-rose-400">*</span></span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
            placeholder="お問い合わせ内容をご記入ください"
            className={`${inputCls} resize-none`}
          />
        </label>

        {error && (
          <p className="flex items-start gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600 ring-1 ring-rose-200">
            <Icon name="x" className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3} />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy || !message.trim()}
          className="btn-3d font-display flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-500 py-3.5 text-sm font-extrabold text-white disabled:opacity-40"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          {busy ? "送信中…" : "送信する"}
          {!busy && <Icon name="mail" className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
