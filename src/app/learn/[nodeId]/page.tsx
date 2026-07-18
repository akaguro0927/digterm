"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getFlatNode, isChapterAccessible, chapterPositionInLevel } from "@/data/journey";
import { useHasPaidAccess } from "@/lib/plan";
import LessonView from "@/components/LessonView";
import TestView from "@/components/TestView";
import { Icon } from "@/components/icons";

export default function LearnNodePage() {
  const params = useParams();
  const id = String(params.nodeId ?? "");
  const found = getFlatNode(id);
  const hasPaid = useHasPaidAccess();

  if (!found) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="font-bold text-slate-600">このマスは見つかりませんでした。</p>
        <Link href="/learn" className="mt-4 inline-block text-sm font-bold text-brand-600 hover:underline">
          道のりにもどる
        </Link>
      </div>
    );
  }

  const { node, chapter } = found;
  const pos = chapterPositionInLevel(chapter.id);

  // VIP章なのに未課金 → 中身は出さず、案内（アップセル）を表示。
  // ※デモのクライアント判定。本番は必ずサーバー側でも中身を出し分けること。
  if (!isChapterAccessible(chapter, hasPaid)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          道のりにもどる
        </Link>
        <div className="card-pop animate-pop-in mt-6 p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-200">
            <Icon name="lock" className="h-7 w-7" />
          </span>
          <p className="font-display mt-3 text-[11px] font-bold tracking-widest text-amber-600">{chapter.title}</p>
          <h1 className="font-display mt-1 text-2xl font-extrabold">このレッスンはVIP限定です</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            中級・上級コースはVIPで開放されます。初級コースと中級の入口（HTMLを書いてみる）は無料のまま。続きはVIPでどうぞ。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/vip"
              className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#b45309" }}
            >
              <Icon name="trophy" className="h-4 w-4" />
              VIPを見る
            </Link>
            <Link
              href="/learn"
              className="btn-3d rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
              style={{ ["--edge" as string]: "#ebe4d5" }}
            >
              道のりにもどる
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link
        href="/learn"
        className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600"
      >
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        道のりにもどる
      </Link>

      <div className="animate-fade-up mt-4 flex items-center gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${chapter.chip}`}>
          <Icon name={node.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className={`font-display text-[11px] font-bold ${chapter.tint}`}>
            {pos && <span className="mr-1.5 text-slate-400">{pos.levelLabel} {pos.index}/{pos.total}章</span>}
            {chapter.title}
          </p>
          <h1 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{node.title}</h1>
        </div>
      </div>
      <p className="mt-1 text-sm text-slate-400">{node.intro}</p>

      <div className="mt-8">
        {node.type === "lesson" ? <LessonView node={node} /> : <TestView node={node} />}
      </div>
    </div>
  );
}
