import type { Metadata } from "next";
import Link from "next/link";
import { terms } from "@/data/terms";
import { MODE_CONFIGS } from "@/lib/quiz";
import { Icon, type IconName } from "@/components/icons";

export const metadata: Metadata = {
  title: "問題集",
  description: "フロントエンド用語を初心者〜上級者モードのクイズと実力試験で定着させよう。",
};

const modeStyles: Record<
  string,
  { icon: IconName; tile: string; badge: string; level: string }
> = {
  beginner: {
    icon: "lightbulb",
    tile: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    level: "かんたん",
  },
  intermediate: {
    icon: "book-open",
    tile: "bg-amber-50 text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    level: "ふつう",
  },
  advanced: {
    icon: "pencil",
    tile: "bg-rose-50 text-rose-600",
    badge: "bg-rose-100 text-rose-700",
    level: "むずかしい",
  },
};

export default function QuizTopPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="animate-fade-up">
        <p className="font-display text-xs font-bold tracking-widest text-brand-500">QUIZ</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">問題集</h1>
        <p className="mt-2 text-sm text-slate-500">
          図鑑で「見て覚えた」を、クイズで「使える」に。問題は全{terms.length}語から毎回ランダムに出題されます。
        </p>
      </div>

      {/* 3つのモード */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {(["beginner", "intermediate", "advanced"] as const).map((m, i) => {
          const c = MODE_CONFIGS[m];
          const s = modeStyles[m];
          return (
            <Link
              key={m}
              href={`/quiz/${m}`}
              style={{ animationDelay: `${i * 90}ms` }}
              className="group animate-pop-in card-pop flex flex-col p-6"
            >
              <div className="flex items-center justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${s.tile}`}>
                  <Icon name={s.icon} className="h-5.5 w-5.5" />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${s.badge}`}>{s.level}</span>
              </div>
              <h2 className="font-display mt-4 text-lg font-extrabold group-hover:text-brand-600">{c.title}</h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-slate-500">{c.tagline}</p>
              <p className="mt-4 flex items-center justify-between text-xs font-bold text-slate-400">
                全{c.questionCount}問・解説つき
                <Icon name="arrow-right" className="h-4 w-4 text-brand-500 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </p>
            </Link>
          );
        })}
      </div>

      {/* 実力試験 */}
      <Link
        href="/quiz/exam"
        className="group animate-pop-in relative mt-6 block overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 p-8 text-white shadow-xl shadow-brand-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-10"
        style={{ animationDelay: "280ms" }}
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 animate-blob rounded-full bg-emerald-500/20 blur-3xl" aria-hidden />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <span className="rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold text-white">EXAM</span>
            <h2 className="font-display mt-3 text-2xl font-extrabold sm:text-3xl">{MODE_CONFIGS.exam.title}</h2>
            <p className="mt-2 text-sm text-brand-200">{MODE_CONFIGS.exam.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
              <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">20問</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">制限時間 10:00</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">合格ライン 80%</span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">1問ごとに正誤表示</span>
            </div>
          </div>
          <span className="font-display flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-extrabold text-brand-700 shadow-lg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
            試験にいどむ
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>
      </Link>

      <p className="mt-6 text-center text-xs text-slate-400">
        成績の保存・苦手用語の自動復習はアカウント機能（M3）で実装予定
      </p>
    </div>
  );
}
