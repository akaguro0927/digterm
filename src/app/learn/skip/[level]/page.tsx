"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Icon } from "@/components/icons";
import LevelMascot from "@/components/LevelMascot";
import { levels, type CourseLevel } from "@/data/journey";
import { markNodeCleared } from "@/lib/userStore";
import { levelNodeIds, levelTestQuestions, shuffle, SKIP_PASS, SKIP_COUNT } from "@/lib/skipTest";
import { playCorrect, playWrong } from "@/lib/sfx";

const VALID: CourseLevel[] = ["beginner", "intermediate", "advanced"];

export default function SkipTestPage() {
  const params = useParams<{ level: string }>();
  const level = params.level as CourseLevel;
  const ok = VALID.includes(level);

  const lm = levels.find((l) => l.level === level);
  const nextLevel = ok ? levels[levels.findIndex((l) => l.level === level) + 1] : undefined;

  // 出題（レベル横断からランダムに SKIP_COUNT 問）
  const questions = useMemo(
    () => (ok ? shuffle(levelTestQuestions(level)).slice(0, SKIP_COUNT) : []),
    [level, ok]
  );

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [combo, setCombo] = useState(0);
  const [brokeCombo, setBrokeCombo] = useState(0);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const need = Math.ceil(total * SKIP_PASS);
  const passed = correct >= need;

  // 合格したら、そのレベルのマスをまとめてクリア扱いに
  useEffect(() => {
    if (done && passed && ok) {
      for (const id of levelNodeIds(level)) markNodeCleared(id);
    }
  }, [done, passed, ok, level]);

  if (!ok) {
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

  const q = questions[i];

  const pick = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) {
      setCorrect((c) => c + 1);
      setCombo((c) => c + 1);
      setBrokeCombo(0);
      playCorrect();
    } else {
      setBrokeCombo(combo >= 3 ? combo : 0);
      setCombo(0);
      playWrong();
    }
  };
  const next = () => {
    if (i + 1 >= total) {
      setDone(true);
    } else {
      setI((n) => n + 1);
      setPicked(null);
    }
  };

  // ── 結果画面 ──
  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12">
        <div className={`card-pop p-6 text-center ${passed ? "" : "opacity-95"}`}>
          <LevelMascot
            level={level}
            reaction={passed ? "correct" : "wrong"}
            combo={passed ? 5 : 0}
            nonce={1}
            className="mb-2"
          />
          <span
            className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
              passed ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-400"
            }`}
          >
            <Icon name={passed ? "trophy" : "flag"} className="h-8 w-8" />
          </span>
          <h1 className="font-display mt-4 text-2xl font-extrabold">
            {passed ? "飛び級 合格！" : "もう少し！"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {correct} / {total} 正解（合格ライン {need} 問）
          </p>
          {passed ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              <span className="font-bold text-slate-800">{lm?.label}</span> をまるごとクリア扱いにしたよ。
              {nextLevel ? "つづけて次のコースへ進もう！" : "全コース制覇だ！"}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              飛び級は9割で合格。あと一歩だ。レッスンで学び直してから再挑戦しても、そのまま再チャレンジしてもOK。
            </p>
          )}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {passed && nextLevel ? (
              <Link
                href={`/learn/course/${nextLevel.level}`}
                className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#12a854" }}
              >
                {nextLevel.label}へ進む
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            ) : (
              <Link
                href="/learn"
                className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#12a854" }}
              >
                レッスンの目次へ
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            )}
            {!passed && (
              <Link
                href={`/learn/course/${level}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-600 ring-2 ring-[#e7ddc8] transition hover:text-brand-600"
              >
                コースを見る
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── 出題画面 ──
  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <Link href={`/learn/course/${level}`} className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        やめる
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-display text-xs font-bold tracking-widest text-amber-600">飛び級テスト・{lm?.label}</p>
        <p className="font-display text-xs font-bold text-slate-400">
          {i + 1} / {total}
        </p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${((i) / total) * 100}%` }} />
      </div>
      <p className="mt-1 text-right text-[11px] text-slate-400">合格ライン：{need} / {total} 問（9割）</p>

      {/* レベル別の相棒キャラ（回答で反応） */}
      <LevelMascot
        level={level}
        reaction={picked === null ? "idle" : picked === q.answer ? "correct" : "wrong"}
        combo={combo}
        brokeCombo={brokeCombo}
        nonce={i}
        className="mt-4"
      />

      <div className="card-pop mt-4 p-5">
        <p className="font-display text-base font-extrabold leading-relaxed text-slate-800">{q.prompt}</p>
        <div className="mt-4 grid gap-2.5">
          {q.choices.map((c, idx) => {
            const isAnswer = idx === q.answer;
            const isPicked = idx === picked;
            const show = picked !== null;
            const style = !show
              ? "bg-white ring-2 ring-[#e7ddc8] hover:ring-brand-300 text-slate-700"
              : isAnswer
                ? "bg-brand-50 ring-2 ring-brand-400 text-brand-800"
                : isPicked
                  ? "bg-rose-50 ring-2 ring-rose-300 text-rose-700"
                  : "bg-white ring-2 ring-slate-100 text-slate-400";
            return (
              <button
                key={idx}
                type="button"
                onClick={() => pick(idx)}
                disabled={show}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${style}`}
              >
                <span>{c}</span>
                {show && isAnswer && <Icon name="check" className="h-4 w-4 text-brand-500" strokeWidth={3} />}
                {show && isPicked && !isAnswer && <Icon name="x" className="h-4 w-4 text-rose-400" strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-4">
            <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">{q.explain}</p>
            <button
              type="button"
              onClick={next}
              className="btn-3d font-display mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              {i + 1 >= total ? "結果を見る" : "つぎへ"}
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
