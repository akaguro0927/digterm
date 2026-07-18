"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useJourneyWeak, parseJourneyWeak, resolveJourneyMiss } from "@/lib/userStore";
import { getFlatNode, type TestQuestion } from "@/data/journey";

interface WeakQ {
  nodeId: string;
  qIndex: number;
  chapterTitle: string;
  nodeTitle: string;
  q: TestQuestion;
}

// 弱点キーから、実際の設問を復元
function buildWeakQuestions(keys: readonly string[]): WeakQ[] {
  const out: WeakQ[] = [];
  for (const { nodeId, qIndex } of parseJourneyWeak(keys)) {
    const f = getFlatNode(nodeId);
    if (!f || f.node.type !== "test") continue;
    const q = f.node.questions[qIndex];
    if (!q) continue;
    out.push({ nodeId, qIndex, chapterTitle: f.chapter.title, nodeTitle: f.node.title, q });
  }
  return out;
}

export default function LessonReviewPage() {
  const weak = useJourneyWeak();
  // 開始時点の弱点で固定（復習中に消えても順番が崩れないように）。restartで再構築。
  const [questions, setQuestions] = useState<WeakQ[]>(() => buildWeakQuestions(weak));

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [cleared, setCleared] = useState(0);
  const [done, setDone] = useState(false);

  const restart = () => {
    setQuestions(buildWeakQuestions(weak)); // いまの弱点で作り直す
    setIdx(0);
    setPicked(null);
    setCleared(0);
    setDone(false);
  };

  const total = questions.length;
  const current = questions[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered || !current) return;
    setPicked(i);
    const correct = i === current.q.answer;
    resolveJourneyMiss(current.nodeId, current.qIndex, correct); // 正解なら弱点から消える
    if (correct) setCleared((c) => c + 1);
  };

  const next = () => {
    if (idx + 1 >= total) setDone(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  // 弱点ゼロ
  if (total === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon name="check" className="h-8 w-8" strokeWidth={3} />
        </span>
        <h1 className="font-display mt-4 text-2xl font-extrabold">弱点はありません！</h1>
        <p className="mt-2 text-sm text-slate-500">
          レッスンのテストで間違えた問題が、ここに集まります。いまはすべてクリア済み。すばらしい！
        </p>
        <Link
          href="/learn"
          className="btn-3d font-display mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          道のりへもどる
          <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    );
  }

  // 完了
  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
          <Icon name="trophy" className="h-8 w-8" />
        </span>
        <h1 className="font-display mt-4 text-2xl font-extrabold">復習おつかれさま！</h1>
        <p className="mt-2 text-sm text-slate-500">
          {total}問中 <span className="font-extrabold text-brand-600">{cleared}</span>問 正解。
          正解した問題は弱点から消えたよ。残りはもう一度チャレンジしてみよう。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={restart}
            className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            もう一度復習する
          </button>
          <Link
            href="/learn"
            className="btn-3d rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
            style={{ ["--edge" as string]: "#ebe4d5" }}
          >
            道のりへ
          </Link>
        </div>
      </div>
    );
  }

  const q = current.q;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        道のりにもどる
      </Link>

      <div className="mt-4 text-center">
        <p className="font-display text-xs font-bold tracking-widest text-rose-500">弱点復習</p>
        <h1 className="font-display mt-1 text-2xl font-extrabold">間違えた問題だけ、もう一度</h1>
        <p className="mt-1 text-xs text-slate-400">正解すると弱点リストから消えます</p>
      </div>

      {/* 進捗 */}
      <div className="mt-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500" style={{ width: `${(idx / total) * 100}%` }} />
        </div>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {idx + 1} <span className="text-slate-300">/ {total}</span>
        </span>
      </div>

      <div key={idx} className="animate-pop-in card-pop mt-5 p-6 sm:p-8">
        <p className="text-[11px] font-bold text-slate-400">
          {current.chapterTitle}・{current.nodeTitle}
        </p>
        <p className="mt-2 text-lg font-bold leading-relaxed">{q.prompt}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {q.choices.map((c, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            let style = "border-[#ebe4d5] bg-white shadow-[0_4px_0_#ebe4d5] hover:-translate-y-0.5 hover:border-brand-300";
            if (answered) {
              if (isAnswer) style = "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-[0_4px_0_#6ee7b7]";
              else if (isPicked) style = "border-rose-300 bg-rose-50 text-rose-700 shadow-[0_4px_0_#fda4af]";
              else style = "border-slate-100 bg-white text-slate-300 shadow-none";
            }
            return (
              <button
                key={c}
                onClick={() => pick(i)}
                disabled={answered}
                className={`rounded-2xl border-2 p-4 text-left text-sm font-medium leading-relaxed transition-all duration-150 ${style}`}
              >
                {c}
                {answered && isAnswer && <Icon name="check" className="ml-1.5 inline h-4 w-4 text-emerald-500" strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`animate-pop-in mt-6 rounded-2xl p-5 ${picked === q.answer ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-rose-50 ring-1 ring-rose-200"}`}>
            <p className={`font-display flex items-center gap-2 font-extrabold ${picked === q.answer ? "text-emerald-700" : "text-rose-700"}`}>
              <Icon name={picked === q.answer ? "check" : "x"} className="h-5 w-5" strokeWidth={3} />
              {picked === q.answer ? "正解！弱点から消えたよ" : `正解は「${q.choices[q.answer]}」`}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.explain}</p>
            <button
              onClick={next}
              className="btn-3d font-display mt-4 rounded-full bg-slate-800 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#0f172a" }}
            >
              {idx + 1 >= total ? "結果を見る" : "つぎの問題へ"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
