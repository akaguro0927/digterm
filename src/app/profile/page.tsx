"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useProfile, saveProfile, type Profile } from "@/lib/profile";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useSeen, useClearedNodes, useQuizAttempts, useFavorites } from "@/lib/userStore";
import { computeXp, levelInfo } from "@/lib/level";
import { levelProgressList } from "@/data/journey";

const CERT_SAMPLES = ["基本情報技術者", "応用情報技術者", "ITパスポート", "AWS SAA", "ウェブデザイン技能士"];

export default function ProfilePage() {
  const saved = useProfile();
  const { user } = useAuth();
  const [form, setForm] = useState<Profile>(saved);
  const [done, setDone] = useState(false);

  // 学習の進捗と連動した Lv・称号・コース制覇（level.ts と同じ算出。保存なし）
  const seen = useSeen();
  const cleared = useClearedNodes();
  const attempts = useQuizAttempts();
  const favs = useFavorites();
  const quizCorrect = attempts.reduce((s, a) => s + a.score, 0);
  const info = levelInfo(computeXp(seen.length, cleared.length, quizCorrect, favs.length));
  const masteredCourses = levelProgressList(cleared).filter((c) => c.total > 0 && c.done === c.total);

  useEffect(() => {
    setForm(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved.displayName, saved.bio, saved.certifications, saved.experienceYears]);

  const set = (k: keyof Profile, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(form);
    setDone(true);
    setTimeout(() => setDone(false), 2200);
  };

  const addCert = (c: string) => {
    const cur = form.certifications.trim();
    if (cur.includes(c)) return;
    set("certifications", cur ? `${cur}, ${c}` : c);
  };

  const inputCls =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100";

  const certList = form.certifications
    .split(/[,、]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const initial = form.displayName.trim().slice(0, 1) || "?";

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        マイページにもどる
      </Link>
      <h1 className="font-display mt-2 text-2xl font-extrabold">プロフィール</h1>

      {/* プレビューカード（入力が即反映） */}
      <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-lg shadow-brand-500/20">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-10" aria-hidden />
        <div className="relative flex items-center gap-4">
          <span className="font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl font-extrabold ring-2 ring-white/40 backdrop-blur">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="font-display truncate text-xl font-extrabold">{form.displayName.trim() || "名前未設定"}</p>
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-brand-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 font-bold">
                <Icon name="zap" className="h-3 w-3" />
                Lv{info.level}・{info.title}
              </span>
              {form.experienceYears ? <span className="rounded-full bg-white/20 px-2 py-0.5 font-bold">IT歴 {form.experienceYears}年</span> : <span className="text-brand-200/80">経験年数 未設定</span>}
            </p>
          </div>
        </div>

        {/* 学習の道のり制覇バッジ（コースを全クリアで点灯） */}
        {masteredCourses.length > 0 && (
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            {masteredCourses.map((c) => (
              <span key={c.level} className="inline-flex items-center gap-1 rounded-full bg-amber-300/25 px-2.5 py-1 text-[11px] font-bold ring-1 ring-amber-200/40">
                <Icon name="trophy" className="h-3 w-3" />
                {c.label}制覇
              </span>
            ))}
          </div>
        )}
        {form.bio.trim() && <p className="relative mt-3 text-sm leading-relaxed text-brand-50">{form.bio}</p>}
        {certList.length > 0 && (
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            {certList.map((c) => (
              <span key={c} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold ring-1 ring-white/20">{c}</span>
            ))}
          </div>
        )}
      </div>

      {/* 入力フォーム */}
      <form onSubmit={submit} className="mt-5 space-y-5">
        <div className="card-pop p-5">
          <label className="block">
            <span className="font-display text-xs font-bold text-slate-500">表示名（ニックネーム）</span>
            <input value={form.displayName} onChange={(e) => set("displayName", e.target.value)} placeholder="例: あかぐろ" className={inputCls} />
          </label>
          <label className="mt-4 block">
            <span className="font-display text-xs font-bold text-slate-500">ひとこと（自己紹介）</span>
            <textarea value={form.bio} onChange={(e) => set("bio", e.target.value)} rows={3} placeholder="例: フロントエンドを勉強中！" className={`${inputCls} resize-none`} />
          </label>
          <label className="mt-4 block">
            <span className="font-display text-xs font-bold text-slate-500">IT実務の経験年数</span>
            <div className="mt-1.5 flex items-center gap-2">
              <input type="number" min={0} max={60} value={form.experienceYears} onChange={(e) => set("experienceYears", e.target.value)} placeholder="0" className={`${inputCls} mt-0 w-28`} />
              <span className="text-sm text-slate-500">年</span>
            </div>
          </label>
        </div>

        <div className="card-pop p-5">
          <span className="font-display flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <Icon name="trophy" className="h-3.5 w-3.5 text-amber-500" />
            保有資格
          </span>
          <input value={form.certifications} onChange={(e) => set("certifications", e.target.value)} placeholder="例: 基本情報技術者, ITパスポート" className={inputCls} />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {CERT_SAMPLES.map((c) => (
              <button key={c} type="button" onClick={() => addCert(c)} className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-brand-600">
                ＋ {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-8 py-3 text-sm font-extrabold text-white" style={{ ["--edge" as string]: "#12a854" }}>
            <Icon name="check" className="h-4 w-4" strokeWidth={3} />
            保存する
          </button>
          {done && (
            <span className="animate-pop-in flex items-center gap-1 text-sm font-bold text-brand-600">
              <Icon name="check" className="h-4 w-4" strokeWidth={3} />
              保存しました
            </span>
          )}
        </div>
      </form>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        ※いまは端末に保存されます{user ? "" : "（ログインするとアカウントにも紐づきます）"}。
      </p>
    </div>
  );
}
