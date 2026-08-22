import Link from "next/link";
import JourneyBoard from "@/components/JourneyBoard";
import { Icon } from "@/components/icons";
import { getPublicJourney } from "@/lib/journey/public";
import { isPublicChapterAccessible, publicChaptersForLevel } from "@/lib/journey/client";
import type { PublicCourseLevel } from "@/lib/journey/types";
import { getServerEntitlement } from "@/lib/supabase/server";

const VALID: PublicCourseLevel[] = ["beginner", "intermediate", "advanced"];

export default async function LevelBoardPage({ params }: { params: Promise<{ level: string }> }) {
  const { level: rawLevel } = await params;
  const journey = getPublicJourney();
  const { hasPaidAccess: hasPaid } = await getServerEntitlement();
  const level = rawLevel as PublicCourseLevel;

  if (!VALID.includes(level)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-sm text-slate-500">コースが見つかりませんでした。</p>
        <Link href="/learn" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand-600">
          <Icon name="chevron-left" className="h-4 w-4" />
          レッスンの目次へ
        </Link>
      </div>
    );
  }

  const lm = journey.levels.find((item) => item.level === level)!;
  const chaps = publicChaptersForLevel(journey, level);
  const allLocked = chaps.length > 0 && chaps.every((chapter) => !isPublicChapterAccessible(chapter, hasPaid));

  return (
    <div className="py-10">
      <div className="mx-auto max-w-2xl px-4">
        <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          レッスンの目次にもどる
        </Link>
        <p className="font-display mt-3 text-xs font-bold tracking-widest text-brand-500">{lm.eyebrow}</p>
        <h1 className="font-display mt-0.5 text-3xl font-extrabold">{lm.label}</h1>
        <p className="mt-1 text-sm text-slate-500">{lm.tagline}</p>

        {/* 飛び級（このコースをスキップ）＋レベル切替 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/learn/skip/${level}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-100"
          >
            <Icon name="zap" className="h-3.5 w-3.5" />
            飛び級テスト（このコースをスキップ）
          </Link>
          {journey.levels
            .filter((l) => l.level !== level)
            .map((l) => (
              <Link
                key={l.level}
                href={`/learn/course/${l.level}`}
                className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-slate-600 ring-1 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
              >
                {l.label}へ
              </Link>
            ))}
        </div>

        {allLocked && !hasPaid && (
          <Link
            href="/vip"
            className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-amber-100 bg-amber-50/60 p-4 transition hover:border-amber-200"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-500 shadow-sm">
              <Icon name="trophy" className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-extrabold text-slate-800">このコースはVIP限定</p>
              <p className="text-[11px] text-slate-500">VIPに入るか、飛び級テストに合格すると開放されます</p>
            </div>
            <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-amber-400" />
          </Link>
        )}
      </div>

      <div className="mx-auto mt-6 max-w-2xl px-4">
        <JourneyBoard journey={journey} level={level} />
      </div>
    </div>
  );
}
