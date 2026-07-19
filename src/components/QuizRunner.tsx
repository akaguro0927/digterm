"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { categoryTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";
import FavoriteButton from "@/components/FavoriteButton";
import LevelMascot, { type MascotLevel } from "@/components/LevelMascot";
import { recordQuizAttempt, recordReviewResult, recordActivity } from "@/lib/userStore";
import {
  generateQuiz,
  generateReviewQuiz,
  isInputCorrect,
  MODE_CONFIGS,
  type ModeConfig,
  type Question,
  type QuizMode,
} from "@/lib/quiz";

interface AnswerLog {
  question: Question;
  given: string;
  correct: boolean;
}

export default function QuizRunner({
  mode = "beginner",
  reviewSlugs,
}: {
  mode?: QuizMode;
  reviewSlugs?: string[];
}) {
  const isReview = Array.isArray(reviewSlugs) && reviewSlugs.length > 0;
  const reviewKey = isReview ? reviewSlugs!.join(",") : "";
  const config: ModeConfig = isReview
    ? { mode: "beginner", title: "苦手復習", tagline: "", questionCount: Math.min(10, reviewSlugs!.length) }
    : MODE_CONFIGS[mode];
  const isExam = !isReview && mode === "exam";

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [logs, setLogs] = useState<AnswerLog[]>([]);
  const [picked, setPicked] = useState<string | null>(null); // 選択式の回答（フィードバック表示中）
  const [combo, setCombo] = useState(0); // 連続正解
  const [input, setInput] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timeLimitSec ?? 0);

  // 問題はクライアントで生成（ランダムのためSSRとの不一致を避ける）
  useEffect(() => {
    setQuestions(isReview ? generateReviewQuiz(reviewSlugs!, 10) : generateQuiz(mode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isReview, reviewKey]);

  // 試験モードのタイマー
  useEffect(() => {
    if (!isExam || finished || !questions) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isExam, finished, questions, timeLeft]);

  const score = useMemo(() => logs.filter((l) => l.correct).length, [logs]);

  // 終了時に成績を1回だけ端末に記録する（マイページで可視化）
  const recordedRef = useRef(false);
  const isDone = questions !== null && (finished || idx >= questions.length);
  useEffect(() => {
    if (!isDone || !questions || recordedRef.current) return;
    recordedRef.current = true;
    if (isReview) {
      // 復習は通常の成績には残さず、正解した苦手だけ消し込む
      logs.forEach((l) => recordReviewResult(l.question.term.slug, l.correct));
      recordActivity(); // 復習も学習1回とカウント（ストリーク）
    } else {
      recordQuizAttempt({
        mode,
        score,
        total: questions.length,
        wrongSlugs: logs.filter((l) => !l.correct).map((l) => l.question.term.slug),
        takenAt: Date.now(),
      });
    }
  }, [isDone, questions, mode, score, logs, isReview]);

  const restart = () => {
    recordedRef.current = false;
    setQuestions(isReview ? generateReviewQuiz(reviewSlugs!, 10) : generateQuiz(mode));
    setIdx(0);
    setLogs([]);
    setPicked(null);
    setCombo(0);
    setInput("");
    setFinished(false);
    setTimeLeft(config.timeLimitSec ?? 0);
  };

  if (!questions) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-500" />
      </div>
    );
  }

  // ===== 結果画面 =====
  if (finished || idx >= questions.length) {
    const total = questions.length;
    const answered = logs.length;
    const rate = total > 0 ? score / total : 0;
    const passed = isExam && rate >= (config.passRate ?? 0.8);
    const message = isExam
      ? passed
        ? "合格！フロントエンド用語の基礎は身についています。"
        : "不合格…でも間違えた用語こそ伸びしろ。図鑑で復習してもう一度！"
      : rate >= 0.8
        ? "すばらしい！この調子で次のモードへ。"
        : rate >= 0.5
          ? "あと少し！間違えた用語を図鑑で復習しよう。"
          : "まずは図鑑をながめてから再挑戦してみよう。";

    return (
      <div className="animate-pop-in">
        <div className="card-pop p-8 text-center">
          {isExam && (
            <span
              className={`font-display inline-block rounded-full px-4 py-1.5 text-sm font-extrabold ${
                passed ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200" : "bg-rose-50 text-rose-600 ring-1 ring-rose-200"
              }`}
            >
              {passed ? "合格" : "不合格"}（合格ライン {Math.round((config.passRate ?? 0.8) * 100)}%）
            </span>
          )}
          <p className="font-display mt-4 text-5xl font-extrabold text-slate-800">
            {score}
            <span className="text-2xl text-slate-400"> / {total}</span>
          </p>
          <p className="mt-1 text-sm text-slate-400">
            正答率 {Math.round(rate * 100)}%
            {isExam && answered < total && `（時間切れ: ${total - answered}問 未回答）`}
          </p>
          {/* スコアバー */}
          <div className="mx-auto mt-4 h-2.5 max-w-xs overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                rate >= 0.8 ? "bg-emerald-500" : rate >= 0.5 ? "bg-amber-500" : "bg-rose-500"
              }`}
              style={{ width: `${rate * 100}%` }}
            />
          </div>
          <p className="mt-5 font-medium text-slate-600">{message}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={restart}
              className="btn-3d font-display rounded-full bg-brand-500 px-7 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#14663a" }}
            >
              もう一度挑戦
            </button>
            <Link
              href={isReview ? "/mypage" : "/quiz"}
              className="btn-3d rounded-full bg-white px-7 py-2.5 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
              style={{ ["--edge" as string]: "#ebe4d5" }}
            >
              {isReview ? "マイページにもどる" : "モード選択にもどる"}
            </Link>
          </div>
        </div>

        {/* この回の振り返り（全問）＋保存（♡でお気に入り） */}
        {logs.length > 0 && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display flex items-center gap-2 text-lg font-extrabold">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name="book-open" className="h-4 w-4" />
                </span>
                この回の振り返り（{logs.length}問）
              </h2>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Icon name="heart" className="h-3.5 w-3.5" />
                ♡で保存できます
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              {logs.map((l, i) => {
                const term = l.question.term;
                return (
                  <div key={`${term.slug}-${i}`} className="card-pop flex items-center gap-3 p-3.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        l.correct ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                      }`}
                    >
                      <Icon name={l.correct ? "check" : "x"} className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <Link href={`/zukan/${term.slug}`} className="group min-w-0 flex-1">
                      <span className="flex items-baseline gap-1.5">
                        <span className="font-display truncate text-sm font-bold text-slate-700 group-hover:text-brand-600">
                          {term.nameJa}
                        </span>
                        <span className="truncate text-[10px] uppercase tracking-wide text-slate-400">{term.nameEn}</span>
                      </span>
                      {!l.correct && (
                        <span className="mt-0.5 block truncate text-[11px] text-slate-400">
                          あなた: {l.given || "（未回答）"} ／ 正解: {l.question.answer}
                        </span>
                      )}
                    </Link>
                    <FavoriteButton slug={term.slug} className="h-8 w-8" />
                    <Link
                      href={`/zukan/${term.slug}`}
                      className="shrink-0 text-slate-300 transition hover:text-brand-500"
                      aria-label={`${term.nameJa}の解説へ`}
                    >
                      <Icon name="chevron-right" className="h-4 w-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-center">
              <Link href="/mypage" className="text-xs font-bold text-brand-600 hover:underline">
                保存した用語はマイページで見返せます →
              </Link>
            </p>
          </div>
        )}
      </div>
    );
  }

  // ===== 出題画面 =====
  const q = questions[idx];
  const th = categoryTheme[q.term.category];
  // 試験モードでも押した瞬間に○×を出す（Duolingo式）
  const showFeedback = picked !== null;
  const isCorrect =
    picked !== null &&
    (q.type === "input" ? isInputCorrect(q.term, picked) : picked === q.answer);

  const submit = (given: string) => {
    if (picked !== null) return;
    const correct = q.type === "input" ? isInputCorrect(q.term, given) : given === q.answer;
    setLogs((l) => [...l, { question: q, given, correct }]);
    setCombo((c) => (correct ? c + 1 : 0));
    setPicked(given);
  };

  const next = () => {
    setPicked(null);
    setInput("");
    setIdx((i) => i + 1);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(1, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const mascotLevel: MascotLevel =
    mode === "intermediate" ? "intermediate" : mode === "advanced" || mode === "exam" ? "advanced" : "beginner";

  return (
    <div>
      {/* レベル別の相棒キャラ（回答で表情＆演出が変わる） */}
      <LevelMascot
        level={mascotLevel}
        reaction={showFeedback ? (isCorrect ? "correct" : "wrong") : "idle"}
        nonce={idx}
        combo={combo}
        className="mb-3"
      />

      {/* 進捗 + タイマー */}
      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
            style={{ width: `${(idx / questions.length) * 100}%` }}
          />
        </div>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {idx + 1} <span className="text-slate-300">/ {questions.length}</span>
        </span>
        {isExam && (
          <span
            className={`font-display flex items-center gap-1 rounded-full px-3 py-1 text-sm font-extrabold ${
              timeLeft <= 60 ? "animate-wiggle bg-rose-50 text-rose-600" : "bg-white text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            {mm}:{ss}
          </span>
        )}
      </div>

      {/* 問題カード */}
      <div key={idx} className="animate-pop-in card-pop relative mt-5 p-6 sm:p-8">
        {/* 押した瞬間の○×スタンプ */}
        {showFeedback && (
          <div className="pointer-events-none absolute -right-2 -top-3 z-10 sm:right-4 sm:top-4">
            {isCorrect ? (
              <span className="animate-stamp block h-12 w-12 rounded-full border-[6px] border-emerald-500 drop-shadow-md sm:h-14 sm:w-14" />
            ) : (
              <span className="animate-stamp block drop-shadow-md">
                <Icon name="x" className="h-12 w-12 text-rose-500 sm:h-14 sm:w-14" strokeWidth={4} />
              </span>
            )}
          </div>
        )}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${th.chip}`}>
          <Icon name={th.icon} className="h-3 w-3" />
          {th.label}
        </span>
        <p className="protected mt-4 text-lg font-bold leading-relaxed">{q.prompt}</p>

        {/* 選択式 */}
        {q.type !== "input" && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.choices!.map((c) => {
              const isAnswer = c === q.answer;
              const isPicked = c === picked;
              // Duolingo式: 2px枠+下端のベタ影、押すと沈む
              let style =
                "border-[#ebe4d5] bg-white shadow-[0_4px_0_#ebe4d5] hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_5px_0_#c7d2fe] active:translate-y-1 active:shadow-none";
              if (showFeedback) {
                if (isAnswer) style = "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-[0_4px_0_#6ee7b7]";
                else if (isPicked) style = "border-rose-300 bg-rose-50 text-rose-700 shadow-[0_4px_0_#fda4af]";
                else style = "border-slate-100 bg-white text-slate-300 shadow-none";
              }
              return (
                <button
                  key={c}
                  onClick={() => submit(c)}
                  disabled={showFeedback}
                  className={`protected rounded-2xl border-2 p-4 text-left text-sm font-medium leading-relaxed transition-all duration-150 ${style}`}
                >
                  {c}
                  {showFeedback && isAnswer && (
                    <Icon name="check" className="ml-1.5 inline h-4 w-4 text-emerald-500" strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* 記述式 */}
        {q.type === "input" && !showFeedback && (
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) submit(input.trim());
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="用語名をタイプ（例: モーダル / modal）"
              autoFocus
              className="w-full rounded-full bg-slate-50 px-5 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-3d font-display shrink-0 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-white disabled:opacity-40"
              style={{ ["--edge" as string]: "#14663a" }}
            >
              答える
            </button>
          </form>
        )}

        {/* フィードバック（試験以外） */}
        {showFeedback && (
          <div
            className={`animate-pop-in mt-6 rounded-2xl p-5 ${
              isCorrect ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-rose-50 ring-1 ring-rose-200"
            }`}
          >
            <p className={`font-display flex items-center gap-2 font-extrabold ${isCorrect ? "text-emerald-700" : "text-rose-700"}`}>
              <Icon name={isCorrect ? "check" : "x"} className="h-5 w-5" strokeWidth={3} />
              {isCorrect ? "正解！" : `残念… 正解は「${q.answer}」`}
            </p>
            <p className="protected mt-2 text-sm leading-relaxed text-slate-600">
              <span className="font-bold">{q.term.nameJa}</span>（{q.term.nameEn}）: {q.term.summary}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={next}
                className="btn-3d font-display rounded-full bg-slate-800 px-6 py-2.5 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#0f172a" }}
              >
                {idx + 1 >= questions.length ? "結果を見る" : "次の問題へ"}
              </button>
              <Link
                href={`/zukan/${q.term.slug}`}
                target="_blank"
                className="flex items-center gap-1 text-sm font-bold text-brand-600 hover:underline"
              >
                <Icon name="book-open" className="h-4 w-4" />
                図鑑でくわしく見る
              </Link>
            </div>
          </div>
        )}
      </div>

      {isExam && (
        <p className="mt-4 text-center text-xs text-slate-400">
          制限時間内に全{questions.length}問。1問ごとに正誤がわかります
        </p>
      )}
    </div>
  );
}
