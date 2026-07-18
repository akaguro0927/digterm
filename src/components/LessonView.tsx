"use client";

import { useState } from "react";
import Link from "next/link";
import MascotTeacher from "@/components/MascotTeacher";
import CodeBlock from "@/components/CodeBlock";
import { Icon } from "@/components/icons";
import { markNodeCleared } from "@/lib/userStore";
import { flatNodes, type LessonNode, type TestQuestion } from "@/data/journey";
import { terms } from "@/data/terms";
import { linkifyStory } from "@/lib/linkify";

function nextHrefAfter(id: string): string {
  const i = flatNodes.findIndex((f) => f.node.id === id);
  const next = flatNodes[i + 1];
  return next ? `/learn/${next.node.id}` : "/learn";
}

// slug → 用語名（図鑑導線チップの表示用）
const termNameBySlug = new Map(terms.map((t) => [t.slug, t.nameJa]));

// レッスン末尾の「ミニ練習問題」（1問・その場で答え合わせ）
function MiniPractice({ q }: { q: TestQuestion }) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;
  return (
    <div className="mt-6 rounded-2xl border-2 border-dashed border-brand-200 bg-brand-50/40 p-5 text-left">
      <p className="font-display flex items-center gap-1.5 text-sm font-extrabold text-brand-700">
        <Icon name="pencil" className="h-4 w-4" />
        ミニ練習問題
      </p>
      <p className="mt-2 text-sm font-bold leading-relaxed text-slate-700">{q.prompt}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {q.choices.map((c, i) => {
          const isAnswer = i === q.answer;
          const isPicked = i === picked;
          let style = "border-[#ebe4d5] bg-white hover:border-brand-300";
          if (answered) {
            if (isAnswer) style = "border-emerald-400 bg-emerald-50 text-emerald-800";
            else if (isPicked) style = "border-rose-300 bg-rose-50 text-rose-700";
            else style = "border-slate-100 bg-white text-slate-300";
          }
          return (
            <button
              key={c}
              onClick={() => !answered && setPicked(i)}
              disabled={answered}
              className={`rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition ${style}`}
            >
              {c}
              {answered && isAnswer && <Icon name="check" className="ml-1 inline h-4 w-4 text-emerald-500" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`animate-pop-in mt-3 rounded-xl p-3 text-sm ${picked === q.answer ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
          <span className="font-display font-extrabold">{picked === q.answer ? "正解！ " : `正解は「${q.choices[q.answer]}」 `}</span>
          <span className="text-slate-600">{q.explain}</span>
        </div>
      )}
    </div>
  );
}

export default function LessonView({ node }: { node: LessonNode }) {
  const [finished, setFinished] = useState(false);

  const complete = () => {
    markNodeCleared(node.id);
    setFinished(true);
  };

  if (!finished) {
    return (
      <MascotTeacher
        lines={linkifyStory(node.story.map((s) => s.text), node.relatedSlugs)}
        onComplete={complete}
        ctaLabel="まとめを見る"
      />
    );
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

      {/* 写経用のコード例（読むだけで終わらせない）*/}
      {node.codeSample && (
        <div className="mt-6 text-left">
          <div className="mb-2 flex items-center gap-1.5">
            <Icon name="code" className="h-4 w-4 text-brand-600" />
            <p className="font-display text-sm font-extrabold text-slate-700">コード例（写経してみよう）</p>
          </div>
          <CodeBlock code={node.codeSample} />
          <p className="mt-2 text-[11px] text-slate-400">エディタに真似して打って、動かして、少しだけ変えてみよう。</p>
        </div>
      )}

      {/* ミニ練習問題（読む→写経→その場で解く）*/}
      {node.practice && <MiniPractice q={node.practice} />}

      {/* 図鑑で実物を見る（旧・必修コースの役割をここに吸収）*/}
      {node.relatedSlugs && node.relatedSlugs.length > 0 && (
        <div className="mt-6 border-t border-dashed border-[#e7ddc8] pt-5">
          <p className="font-display text-[11px] font-bold tracking-widest text-brand-500">図鑑で実物を見る</p>
          <p className="mt-1 text-xs text-slate-400">このレッスンで出てきた用語。タップすると“触れる実例”が見られるよ。</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {node.relatedSlugs
              .filter((s) => termNameBySlug.has(s))
              .map((s) => (
                <Link
                  key={s}
                  href={`/zukan/${s}`}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
                >
                  <Icon name="book-open" className="h-3.5 w-3.5 text-brand-500" />
                  {termNameBySlug.get(s)}
                </Link>
              ))}
          </div>
        </div>
      )}

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
