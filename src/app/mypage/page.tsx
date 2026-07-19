"use client";

import Link from "next/link";
import { getTerm, termNo } from "@/data/terms";
import { categoryTheme, levelTheme } from "@/lib/categoryTheme";
import { MODE_CONFIGS, type QuizMode } from "@/lib/quiz";
import { Icon, type IconName } from "@/components/icons";
import FavoriteButton from "@/components/FavoriteButton";
import StreakBar from "@/components/StreakBar";
import LevelCard from "@/components/LevelCard";
import ShareButton from "@/components/ShareButton";
import StudyCalendar from "@/components/StudyCalendar";
import AdSlot from "@/components/AdSlot";
import { usePlan } from "@/lib/plan";
import { useProfile, hasProfile } from "@/lib/profile";
import { useAuth } from "@/lib/supabase/AuthProvider";
import {
  useFavorites,
  useQuizAttempts,
  useWeakClears,
  useClearedNodes,
  useJourneyWeak,
  computeStats,
  computeWeakSlugs,
  clearAllUserData,
} from "@/lib/userStore";
import { levelProgressList } from "@/data/journey";
import { awards } from "@/data/awards";

const MODE_META: Record<QuizMode, { icon: IconName; tile: string; bar: string }> = {
  beginner: { icon: "lightbulb", tile: "bg-emerald-50 text-emerald-600", bar: "bg-emerald-500" },
  intermediate: { icon: "book-open", tile: "bg-amber-50 text-amber-600", bar: "bg-amber-500" },
  advanced: { icon: "pencil", tile: "bg-rose-50 text-rose-600", bar: "bg-rose-500" },
  exam: { icon: "trophy", tile: "bg-brand-50 text-brand-600", bar: "bg-brand-500" },
};

const MODE_ORDER: QuizMode[] = ["beginner", "intermediate", "advanced", "exam"];

// コース別進捗バーの色（初級/中級/上級）
const COURSE_BAR: Record<string, string> = {
  beginner: "bg-emerald-500",
  intermediate: "bg-sky-500",
  advanced: "bg-violet-500",
};

// レベル → 制覇バッジ(award id) の対応
const CLEAR_AWARD_ID: Record<string, string> = {
  beginner: "beginner-clear",
  intermediate: "intermediate-clear",
  advanced: "advanced-clear",
};
const awardById = new Map(awards.map((a) => [a.id, a]));

function formatDateTime(ms: number): string {
  const d = new Date(ms);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function StatTile({
  icon,
  value,
  label,
  tint,
}: {
  icon: IconName;
  value: string;
  label: string;
  tint: string;
}) {
  return (
    <div className="card-pop flex items-center gap-3 p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tint}`}>
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-display text-2xl font-extrabold leading-none text-slate-800">{value}</p>
        <p className="mt-1 text-xs font-medium text-slate-400">{label}</p>
      </div>
    </div>
  );
}

export default function MyPage() {
  const { user } = useAuth();
  const plan = usePlan();
  const profile = useProfile();
  const favSlugs = useFavorites();
  const attempts = useQuizAttempts();
  const weakClears = useWeakClears();
  const clearedNodes = useClearedNodes();
  const journeyWeak = useJourneyWeak();
  const courseProgress = levelProgressList(clearedNodes);
  const stats = computeStats(attempts);
  const weakTerms = computeWeakSlugs(attempts, weakClears).filter((w) => getTerm(w.slug));

  const favTerms = favSlugs
    .map((s) => getTerm(s))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  const hasProgress = attempts.length > 0;

  const handleClear = () => {
    if (
      window.confirm(
        "お気に入りと学習記録をすべて削除します。この端末のデータは元に戻せません。よろしいですか？"
      )
    ) {
      clearAllUserData();
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* ヘッダー */}
      <div className="animate-fade-up">
        <p className="font-display text-xs font-bold tracking-widest text-brand-500">MY PAGE</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">マイページ</h1>
        <p className="mt-2 text-sm text-slate-500">
          お気に入りに登録した用語と、これまでの学習記録をまとめて確認できます。
        </p>
      </div>

      {/* 保存先の案内（ログイン状態で出し分け） */}
      {user ? (
        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-800 ring-1 ring-brand-200">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
          <p>
            <span className="font-bold">アカウントに同期中</span>（{user.email}）。
            お気に入り・成績は他の端末でも同じものが見られます。
          </p>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200">
          <span className="flex items-start gap-2.5">
            <Icon name="lightbulb" className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <span>
              いまの記録は<span className="font-bold">この端末にのみ</span>保存されています。
              ログインすると複数の端末で同期でき、記録も引き継がれます。
            </span>
          </span>
          <Link
            href="/login"
            className="shrink-0 rounded-full bg-amber-500 px-3.5 py-1.5 font-bold text-white transition hover:brightness-105"
          >
            ログイン
          </Link>
        </div>
      )}

      {/* レベル・称号 */}
      <div className="mt-6">
        <LevelCard />
      </div>

      {/* 成果をシェア */}
      <div className="mt-3">
        <ShareButton />
      </div>

      {/* ストリーク＋今日の目標 */}
      <div className="mt-4">
        <StreakBar />
      </div>

      {/* 学習カレンダー（草） */}
      <div className="mt-4">
        <StudyCalendar />
      </div>

      {/* コース別の進捗（すごろく学習） */}
      <div className="card-pop mt-4 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display flex items-center gap-2 text-lg font-extrabold">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name="flag" className="h-4 w-4" />
            </span>
            コースの進捗
          </h2>
          <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
            道のりへ
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="mt-4 space-y-4">
          {courseProgress.map((p) => {
            const bar = COURSE_BAR[p.level];
            const done = p.pct >= 100;
            const clearAward = done ? awardById.get(CLEAR_AWARD_ID[p.level]) : undefined;
            return (
              <div key={p.level}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-display flex items-center gap-2 font-extrabold text-slate-700">
                    {p.label}
                    {clearAward && (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${clearAward.tint}`}>
                        <Icon name={clearAward.icon} className="h-3 w-3" />
                        {clearAward.title}
                      </span>
                    )}
                  </span>
                  <span className="font-display text-xs font-extrabold text-slate-500">
                    {p.done}<span className="text-slate-300"> / {p.total}</span>
                    <span className="ml-2 text-slate-400">{p.pct}%</span>
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${bar} transition-all duration-700`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 苦手復習への導線（誤答がある時だけ） */}
      {weakTerms.length > 0 && (
        <Link
          href="/quiz/review"
          className="group mt-4 flex items-center gap-4 rounded-2xl border-2 border-rose-100 bg-rose-50/60 p-4 transition hover:border-rose-200 hover:bg-rose-50"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
            <Icon name="flame" className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-slate-800">
              苦手な用語が <span className="text-rose-600">{weakTerms.length}</span> 個あります
            </p>
            <p className="mt-0.5 text-xs text-slate-500">間違えた用語だけを復習。正解すると消えていきます。</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
            復習する
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      )}

      {/* レッスンの弱点復習（テストで間違えた問題があるとき） */}
      {journeyWeak.length > 0 && (
        <Link
          href="/learn/review"
          className="group mt-4 flex items-center gap-4 rounded-2xl border-2 border-rose-100 bg-rose-50/60 p-4 transition hover:border-rose-200 hover:bg-rose-50"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
            <Icon name="flame" className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-slate-800">
              レッスンで間違えた問題が <span className="text-rose-600">{journeyWeak.length}</span> 問
            </p>
            <p className="mt-0.5 text-xs text-slate-500">テストの誤答だけを復習。正解すると消えていきます。</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
            復習する
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      )}

      {/* VIP導線 */}
      <Link
        href="/vip"
        className="group mt-4 flex items-center gap-4 rounded-2xl border-2 border-amber-100 bg-gradient-to-r from-amber-50 to-white p-4 transition hover:border-amber-200"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-500 shadow-sm">
          <Icon name="trophy" className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold text-slate-800">
            {plan === "vip" ? "VIP会員です" : "Co-Cre VIP"}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {plan === "vip"
              ? "全レッスン・弱点復習・AI無制限・広告なしが使えます。"
              : "弱点復習・全レッスン・AI無制限・広告なし。もっと本気で覚えるなら。"}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
          {plan === "vip" ? "管理" : "見てみる"}
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </Link>

      {/* プロフィール */}
      <Link
        href="/profile"
        className="group mt-4 flex items-center gap-4 rounded-2xl border-2 border-[#ebe4d5] bg-white p-4 shadow-[0_3px_0_#ebe4d5] transition hover:-translate-y-0.5"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon name="user" className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          {hasProfile(profile) ? (
            <>
              <p className="font-display truncate text-sm font-extrabold text-slate-800">
                {profile.displayName || "名前未設定"}
                {profile.experienceYears && <span className="ml-1.5 text-xs font-bold text-slate-400">IT歴 {profile.experienceYears}年</span>}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {profile.certifications ? `資格: ${profile.certifications}` : profile.bio || "プロフィールを編集"}
              </p>
            </>
          ) : (
            <>
              <p className="font-display text-sm font-extrabold text-slate-800">プロフィールを登録しよう</p>
              <p className="mt-0.5 text-xs text-slate-500">資格やIT経験年数を書けます</p>
            </>
          )}
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 transition group-hover:bg-slate-200">
          編集
          <Icon name="chevron-right" className="h-3.5 w-3.5" />
        </span>
      </Link>

      {/* 広告（無料ユーザーのみ） */}
      <AdSlot className="mt-4" />

      {/* ===== 学習の記録 ===== */}
      <section className="mt-10">
        <h2 className="font-display flex items-center gap-2.5 text-xl font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Icon name="chart" className="h-4 w-4" />
          </span>
          学習の記録
        </h2>

        {hasProgress ? (
          <>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatTile
                icon="flame"
                value={`${stats.studyDays}日`}
                label="学習した日数"
                tint="bg-orange-50 text-orange-500"
              />
              <StatTile
                icon="pencil"
                value={`${stats.totalRuns}回`}
                label="挑戦した回数"
                tint="bg-sky-50 text-sky-500"
              />
              <StatTile
                icon="check"
                value={`${Math.round(stats.accuracy * 100)}%`}
                label="平均正答率"
                tint="bg-emerald-50 text-emerald-500"
              />
              <StatTile
                icon="trophy"
                value={stats.examPassed ? "合格" : "未合格"}
                label="実力試験"
                tint={stats.examPassed ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-400"}
              />
            </div>

            {/* モード別ベストスコア */}
            <h3 className="font-display mt-8 text-sm font-extrabold text-slate-500">モード別ベストスコア</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {MODE_ORDER.map((m) => {
                const best = stats.bestByMode[m];
                const meta = MODE_META[m];
                return (
                  <div key={m} className="card-pop flex items-center gap-3 p-4">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.tile}`}>
                      <Icon name={meta.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-extrabold text-slate-700">
                        {MODE_CONFIGS[m].title}
                      </p>
                      {best ? (
                        <div className="mt-1.5 flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className={`h-full rounded-full ${meta.bar}`}
                              style={{ width: `${Math.round(best.rate * 100)}%` }}
                            />
                          </div>
                          <span className="font-display shrink-0 text-xs font-extrabold text-slate-500">
                            {best.score}/{best.total}
                          </span>
                        </div>
                      ) : (
                        <p className="mt-1 text-xs text-slate-400">まだ挑戦していません</p>
                      )}
                    </div>
                    <Link
                      href={m === "exam" ? "/quiz/exam" : `/quiz/${m}`}
                      className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-brand-50 hover:text-brand-600"
                    >
                      挑戦
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* 最近の記録 */}
            <h3 className="font-display mt-8 text-sm font-extrabold text-slate-500">最近の記録</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border-2 border-[#ebe4d5] bg-white">
              {attempts.slice(0, 8).map((a, i) => {
                const meta = MODE_META[a.mode];
                const rate = a.total > 0 ? a.score / a.total : 0;
                return (
                  <div
                    key={`${a.takenAt}-${i}`}
                    className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0"
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.tile}`}>
                      <Icon name={meta.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-slate-700">{MODE_CONFIGS[a.mode].title}</span>
                      <span className="block text-[11px] text-slate-400">{formatDateTime(a.takenAt)}</span>
                    </span>
                    <span
                      className={`font-display shrink-0 text-sm font-extrabold ${
                        rate >= 0.8 ? "text-emerald-600" : rate >= 0.5 ? "text-amber-600" : "text-rose-500"
                      }`}
                    >
                      {a.score}
                      <span className="text-xs text-slate-300"> / {a.total}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="card-pop mt-4 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Icon name="chart" className="h-6 w-6" />
            </span>
            <p className="mt-4 font-bold text-slate-600">まだ記録がありません</p>
            <p className="mt-1 text-sm text-slate-400">
              問題集に挑戦すると、ここに成績が記録されていきます。
            </p>
            <Link
              href="/quiz"
              className="btn-3d font-display mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#14663a" }}
            >
              <Icon name="pencil" className="h-4 w-4" strokeWidth={2.5} />
              問題集にいどむ
            </Link>
          </div>
        )}
      </section>

      {/* ===== お気に入り ===== */}
      <section className="mt-12">
        <h2 className="font-display flex items-center gap-2.5 text-xl font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
            <Icon name="heart" className="h-4 w-4" fill="currentColor" />
          </span>
          お気に入りの用語
          {favTerms.length > 0 && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">
              {favTerms.length}
            </span>
          )}
        </h2>

        {favTerms.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {favTerms.map((t) => {
              const th = categoryTheme[t.category];
              const lv = levelTheme[t.level];
              return (
                <Link key={t.slug} href={`/zukan/${t.slug}`} className="group card-pop p-4">
                  <div className="flex items-start justify-between">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${th.tile} ${th.tileText}`}>
                      <Icon name={th.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold tracking-wider text-slate-300">
                        {termNo(t.slug)}
                      </span>
                      <FavoriteButton slug={t.slug} className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="font-display mt-3 text-base font-extrabold group-hover:text-brand-600">
                    {t.nameJa}
                  </h3>
                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{t.nameEn}</p>
                  <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${lv.chip}`}>
                    {lv.label} {lv.dots}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card-pop mt-4 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-300">
              <Icon name="heart" className="h-6 w-6" />
            </span>
            <p className="mt-4 font-bold text-slate-600">お気に入りはまだありません</p>
            <p className="mt-1 text-sm text-slate-400">
              図鑑で用語を開き、ハート（♡）を押すとここに集められます。
            </p>
            <Link
              href="/zukan"
              className="btn-3d font-display mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-extrabold text-brand-600 ring-2 ring-[#ebe4d5]"
              style={{ ["--edge" as string]: "#ebe4d5" }}
            >
              <Icon name="search" className="h-4 w-4" strokeWidth={2.5} />
              図鑑で探す
            </Link>
          </div>
        )}
      </section>

      {/* ===== その他 ===== */}
      <section className="mt-12">
        <h2 className="font-display mb-3 text-lg font-extrabold text-slate-800">その他</h2>
        <div className="card-pop divide-y divide-slate-100 p-0">
          {[
            { icon: "user", label: "プロフィール編集", href: "/profile" },
            { icon: "mail", label: "お問い合わせ", href: "/contact" },
            { icon: "trophy", label: "会員プラン・お支払い", href: "/vip" },
            { icon: "shield", label: "プライバシーポリシー", href: "/legal/privacy" },
            { icon: "book", label: "利用規約", href: "/legal/terms" },
            { icon: "credit-card", label: "特定商取引法に基づく表記", href: "/legal/tokusho" },
          ].map((it) => (
            <Link
              key={it.label}
              href={it.href}
              className="flex items-center gap-3 px-4 py-3.5 text-sm text-slate-700 transition first:rounded-t-2xl last:rounded-b-2xl hover:bg-slate-50"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Icon name={it.icon as IconName} className="h-4 w-4" />
              </span>
              <span className="flex-1 font-medium">{it.label}</span>
              <Icon name="chevron-right" className="h-4 w-4 text-slate-300" />
            </Link>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">Co-Cre プロトタイプ版 v0.1</p>
      </section>

      {/* ===== 記録の削除 ===== */}
      {(hasProgress || favTerms.length > 0) && (
        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
          >
            <Icon name="trash" className="h-3.5 w-3.5" />
            この端末の記録をすべて消す
          </button>
        </div>
      )}
    </div>
  );
}
