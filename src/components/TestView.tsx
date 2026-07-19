"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { markNodeCleared, useClearedNodes, recordJourneyMiss, resolveJourneyMiss } from "@/lib/userStore";
import { flatNodes, type TestNode } from "@/data/journey";
import { awards } from "@/data/awards";
import LevelMascot from "@/components/LevelMascot";

function nextHrefAfter(id: string): string {
  const i = flatNodes.findIndex((f) => f.node.id === id);
  const next = flatNodes[i + 1];
  return next ? `/learn/${next.node.id}` : "/learn";
}

export default function TestView({ node }: { node: TestNode }) {
  const qs = node.questions;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);

  const cleared = useClearedNodes();
  const level = flatNodes.find((f) => f.node.id === node.id)?.chapter.level ?? "beginner";
  const q = qs[idx];
  const answered = picked !== null;
  const rate = correct / qs.length;
  const passed = rate >= node.passRate;

  // このテスト合格で“新たに獲得”した賞（クリア前後の差分）
  const without = cleared.filter((id) => id !== node.id);
  const newlyEarned = passed ? awards.filter((a) => a.earned(cleared) && !a.earned(without)) : [];

  // 合格したらこのノードをクリア扱いに（1回だけ）
  useEffect(() => {
    if (finished && passed) markNodeCleared(node.id);
  }, [finished, passed, node.id]);

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) {
      setCorrect((c) => c + 1);
      setCombo((c) => c + 1);
      resolveJourneyMiss(node.id, idx, true); // 正解したら弱点から消す
    } else {
      setCombo(0);
      recordJourneyMiss(node.id, idx); // 間違えたら弱点に登録
    }
  };
  const next = () => {
    if (idx + 1 >= qs.length) setFinished(true);
    else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };
  const restart = () => {
    setIdx(0);
    setPicked(null);
    setCorrect(0);
    setCombo(0);
    setFinished(false);
  };

  // ===== 結果 =====
  if (finished) {
    return (
      <div className="animate-pop-in card-pop p-8 text-center">
        <span
          className={`font-display inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-extrabold ${
            passed ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200" : "bg-amber-50 text-amber-600 ring-1 ring-amber-200"
          }`}
        >
          <Icon name={passed ? "trophy" : "flame"} className="h-4 w-4" />
          {passed ? "合格！" : "もう一歩！"}
        </span>
        <p className="font-display mt-4 text-5xl font-extrabold text-slate-800">
          {correct}
          <span className="text-2xl text-slate-400"> / {qs.length}</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">
          正答率 {Math.round(rate * 100)}%（合格ライン {Math.round(node.passRate * 100)}%）
        </p>
        <p className="mt-5 font-medium text-slate-600">
          {passed ? "つぎのマスが解放されたよ。この調子！" : "おしい！レッスンをおさらいして、もう一度チャレンジ。"}
        </p>

        {/* 新しく獲得した賞 */}
        {newlyEarned.length > 0 && (
          <div className="animate-pop-in mt-6 rounded-2xl bg-amber-50/70 p-4 ring-1 ring-amber-200">
            <p className="font-display flex items-center justify-center gap-1.5 text-sm font-extrabold text-amber-700">
              <Icon name="trophy" className="h-4 w-4" />
              賞を{newlyEarned.length}こ 獲得！
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {newlyEarned.map((a) => (
                <span
                  key={a.id}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${a.tint}`}
                >
                  <Icon name={a.icon} className="h-3.5 w-3.5" />
                  {a.title}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* もっと知る（深掘り） */}
        {passed && node.deepDive && (
          <div className="mt-5 rounded-2xl bg-slate-50 p-5 text-left ring-1 ring-slate-200">
            <p className="font-display flex items-center gap-1.5 text-sm font-extrabold text-slate-700">
              <Icon name="lightbulb" className="h-4 w-4 text-brand-600" />
              もっと知る
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{node.deepDive}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {passed ? (
            <Link
              href={nextHrefAfter(node.id)}
              className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-7 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              つぎのマスへ
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          ) : (
            <button
              onClick={restart}
              className="btn-3d font-display rounded-full bg-brand-500 px-7 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              もう一度
            </button>
          )}
          <Link
            href="/learn"
            className="btn-3d rounded-full bg-white px-7 py-2.5 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
            style={{ ["--edge" as string]: "#ebe4d5" }}
          >
            道のりにもどる
          </Link>
        </div>
      </div>
    );
  }

  // ===== 出題 =====
  return (
    <div>
      {/* レベル別の相棒キャラ（回答で表情＆演出が変わる） */}
      <LevelMascot
        level={level}
        reaction={answered ? (picked === q.answer ? "correct" : "wrong") : "idle"}
        nonce={idx}
        combo={combo}
        className="mb-3"
      />

      {/* 進捗 */}
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
            style={{ width: `${(idx / qs.length) * 100}%` }}
          />
        </div>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {idx + 1} <span className="text-slate-300">/ {qs.length}</span>
        </span>
      </div>

      <div key={idx} className="animate-pop-in card-pop relative mt-5 p-6 sm:p-8">
        {/* 押した瞬間の○×スタンプ */}
        {answered && (
          <div className="pointer-events-none absolute -right-2 -top-3 z-10 sm:right-4 sm:top-4">
            {picked === q.answer ? (
              <span className="animate-stamp block h-12 w-12 rounded-full border-[6px] border-emerald-500 drop-shadow-md sm:h-14 sm:w-14" />
            ) : (
              <span className="animate-stamp block drop-shadow-md">
                <Icon name="x" className="h-12 w-12 text-rose-500 sm:h-14 sm:w-14" strokeWidth={4} />
              </span>
            )}
          </div>
        )}

        <p className="text-lg font-bold leading-relaxed">{q.prompt}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {q.choices.map((c, i) => {
            const isAnswer = i === q.answer;
            const isPicked = i === picked;
            let style =
              "border-[#ebe4d5] bg-white shadow-[0_4px_0_#ebe4d5] hover:-translate-y-0.5 hover:border-brand-300 active:translate-y-1 active:shadow-none";
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
          <div
            className={`animate-pop-in mt-6 rounded-2xl p-5 ${
              picked === q.answer ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-rose-50 ring-1 ring-rose-200"
            }`}
          >
            <p className={`font-display flex items-center gap-2 font-extrabold ${picked === q.answer ? "text-emerald-700" : "text-rose-700"}`}>
              <Icon name={picked === q.answer ? "check" : "x"} className="h-5 w-5" strokeWidth={3} />
              {picked === q.answer ? "正解！" : `正解は「${q.choices[q.answer]}」`}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{q.explain}</p>
            <button
              onClick={next}
              className="btn-3d font-display mt-4 rounded-full bg-slate-800 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#0f172a" }}
            >
              {idx + 1 >= qs.length ? "結果を見る" : "つぎの問題へ"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
