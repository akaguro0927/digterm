"use client";

import Link from "next/link";
import QuizRunner from "@/components/QuizRunner";
import { useQuizAttempts, useWeakClears, computeWeakSlugs } from "@/lib/userStore";
import { getTerm } from "@/data/terms";
import { Icon } from "@/components/icons";

export default function ReviewPage() {
  const attempts = useQuizAttempts();
  const clears = useWeakClears();
  const slugs = computeWeakSlugs(attempts, clears)
    .filter((w) => getTerm(w.slug))
    .map((w) => w.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="animate-fade-up mb-6">
        <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          マイページにもどる
        </Link>
        <h1 className="font-display mt-1 text-2xl font-extrabold">苦手復習</h1>
        <p className="mt-1 text-sm text-slate-500">
          クイズで間違えた用語だけを出題。正解すると、苦手リストから消えていくよ。
        </p>
      </div>

      {slugs.length === 0 ? (
        <div className="card-pop p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
            <Icon name="check" className="h-7 w-7" strokeWidth={3} />
          </span>
          <p className="font-display mt-3 text-lg font-extrabold">いまは苦手なし！</p>
          <p className="mt-1 text-sm text-slate-500">問題集で間違えると、ここに復習用の用語がたまります。</p>
          <Link
            href="/quiz"
            className="btn-3d font-display mt-5 inline-block rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            問題集へ
          </Link>
        </div>
      ) : (
        <QuizRunner reviewSlugs={slugs} />
      )}
    </div>
  );
}
