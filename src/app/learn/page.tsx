import Link from "next/link";
import LevelHub from "@/components/LevelHub";
import AwardShelf from "@/components/AwardShelf";
import StreakBar from "@/components/StreakBar";
import { MascotFace } from "@/components/MascotTeacher";
import { Icon } from "@/components/icons";
import { getPublicJourney } from "@/lib/journey/public";

export default function LearnPage() {
  const journey = getPublicJourney();
  return (
    <div className="py-10">
      {/* 導入（狭い列） */}
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-6">
          <StreakBar />
        </div>
        <div className="animate-fade-up flex flex-col items-center text-center">
          <MascotFace />
          <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">LEARN</p>
          <h1 className="font-display mt-1 text-3xl font-extrabold">学習の道のり</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            コクリといっしょに、上から順にすすもう。読んで→テストで8割クリアを繰り返すと、
            用語が身について「かんたんなサイト」が作れるようになるよ。
          </p>
          <p className="mt-2 font-display text-xs font-bold text-slate-400">
            全 <span className="text-brand-600">{journey.chapters.length}</span> 章・
            <span className="text-brand-600">{journey.flatNodes.length}</span> マス（初級〜上級）
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold">
            <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700 ring-1 ring-brand-100">初級：無料</span>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-orange-700 ring-1 ring-orange-100">中級：入口だけ無料</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-amber-700 ring-1 ring-amber-200">中上級：VIP</span>
          </div>
          <Link
            href="/curriculum"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 ring-2 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
          >
            <Icon name="book" className="h-3.5 w-3.5 text-brand-500" />
            コース目次で全章を見る
          </Link>
        </div>
      </div>

      {/* 目次ハブ：続きから＋初級/中級/上級の入口（各コースは専用ページへ） */}
      <div className="mx-auto mt-8 max-w-2xl px-4">
        <LevelHub journey={journey} />
      </div>

      {/* 腕試し・復習（章末テストの通し受験＋弱点復習） */}
      <div className="mx-auto mt-8 max-w-2xl px-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/learn/marathon"
            className="card-pop flex items-center gap-3 p-4 transition hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name="trophy" className="h-5 w-5" />
            </span>
            <span>
              <span className="font-display block text-sm font-extrabold text-slate-800">通し復習（腕試し）</span>
              <span className="block text-xs text-slate-400">章末テストをまとめて連続でチャレンジ</span>
            </span>
          </Link>
          <Link
            href="/learn/review"
            className="card-pop flex items-center gap-3 p-4 transition hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Icon name="flame" className="h-5 w-5" />
            </span>
            <span>
              <span className="font-display block text-sm font-extrabold text-slate-800">弱点復習</span>
              <span className="block text-xs text-slate-400">間違えた問題だけ、もう一度</span>
            </span>
          </Link>
        </div>
        {/* 補助導線 */}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 ring-1 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
          >
            <Icon name="book" className="h-3.5 w-3.5 text-brand-500" />
            コース目次（全章）
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-600 ring-1 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
          >
            <Icon name="wrench" className="h-3.5 w-3.5 text-brand-500" />
            道具とAIガイド
          </Link>
        </div>
      </div>

      {/* 賞（狭い列）。※旧「図鑑の必修コース」は各レッスン末尾の“図鑑で実物を見る”に吸収済み。 */}
      <div className="mx-auto max-w-2xl px-4">
        <AwardShelf />
      </div>
    </div>
  );
}
