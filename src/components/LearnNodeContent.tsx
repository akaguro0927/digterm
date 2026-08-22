"use client";

import Link from "next/link";
import LessonView from "@/components/LessonView";
import TestView from "@/components/TestView";
import { Icon } from "@/components/icons";
import type { Chapter, ChapterPosition, JourneyNode } from "@/data/journey";

interface Props {
  node: JourneyNode;
  chapter: Chapter;
  position: ChapterPosition | null;
  nextHref: string;
}

/** サーバーで権利確認済みの1マスだけを表示するクライアントUI。 */
export default function LearnNodeContent({ node, chapter, position, nextHref }: Props) {
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
            {position && <span className="mr-1.5 text-slate-400">{position.levelLabel} {position.index}/{position.total}章</span>}
            {chapter.title}
          </p>
          <h1 className="font-display text-xl font-extrabold leading-tight sm:text-2xl">{node.title}</h1>
        </div>
      </div>
      <p className="mt-1 text-sm text-slate-400">{node.intro}</p>

      <div className="mt-8">
        {node.type === "lesson" ? (
          <LessonView node={node} nextHref={nextHref} />
        ) : (
          <TestView node={node} nextHref={nextHref} level={chapter.level} />
        )}
      </div>
    </div>
  );
}
