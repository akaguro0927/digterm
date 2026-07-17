"use client";

import { useState } from "react";
import Link from "next/link";
import MascotTeacher from "@/components/MascotTeacher";
import { Icon } from "@/components/icons";
import { markNodeCleared } from "@/lib/userStore";
import { flatNodes, type LessonNode } from "@/data/journey";

function nextHrefAfter(id: string): string {
  const i = flatNodes.findIndex((f) => f.node.id === id);
  const next = flatNodes[i + 1];
  return next ? `/learn/${next.node.id}` : "/learn";
}

export default function LessonView({ node }: { node: LessonNode }) {
  const [finished, setFinished] = useState(false);

  const complete = () => {
    markNodeCleared(node.id);
    setFinished(true);
  };

  if (!finished) {
    return <MascotTeacher lines={node.story.map((s) => s.text)} onComplete={complete} ctaLabel="まとめを見る" />;
  }

  // まとめ（覚えるのはこれだけ）＋クリア
  return (
    <div className="animate-pop-in card-pop p-7 text-center sm:p-8">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <Icon name="lightbulb" className="h-7 w-7" />
      </span>
      <h2 className="font-display mt-3 text-xl font-extrabold">覚えるのはこれだけ！</h2>
      <ul className="mx-auto mt-4 max-w-sm space-y-2 text-left">
        {node.takeaways.map((t) => (
          <li key={t} className="flex items-start gap-2 rounded-2xl bg-brand-50/60 px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-brand-100">
            <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={3} />
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={nextHrefAfter(node.id)}
          className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-7 py-3 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          つぎのマスへ
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
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
  );
}
