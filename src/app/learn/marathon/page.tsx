"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { recordActivity, recordJourneyMiss, resolveJourneyMiss } from "@/lib/userStore";
import { useHasPaidAccess } from "@/lib/plan";
import {
  flatNodes,
  isChapterAccessible,
  levels,
  type CourseLevel,
  type TestQuestion,
} from "@/data/journey";

type Scope = "all" | CourseLevel;

interface MarathonQ {
  nodeId: string;
  qIndex: number;
  chapterTitle: string;
  nodeTitle: string;
  levelLabel: string;
  q: TestQuestion;
}

// スコープ（すべて or レベル別）に含まれる、アクセス可能な章末テストの全設問を
// コース順に集める。VIPロック中の章は含めない（=腕試しできるのは開放済みの範囲）。
function collectQuestions(scope: Scope, hasPaid: boolean): MarathonQ[] {
  const labelOf = (lv: CourseLevel) => levels.find((l) => l.level === lv)?.label ?? "";
  const out: MarathonQ[] = [];
  for (const f of flatNodes) {
    if (f.node.type !== "test") continue;
    if (scope !== "all" && f.chapter.level !== scope) continue;
    if (!isChapterAccessible(f.chapter, hasPaid)) continue;
    f.node.questions.forEach((q, qIndex) => {
      out.push({
        nodeId: f.node.id,
        qIndex,
        chapterTitle: f.chapter.title,
        nodeTitle: f.node.title,
        levelLabel: labelOf(f.chapter.level),
        q,
      });
    });
  }
  return out;
}

// スコープに“ロック中（VIP未開放）のテスト設問”が残っているか（注記の出し分けに使う）
function hasLockedQuestions(scope: Scope, hasPaid: boolean): boolean {
  if (hasPaid) return false;
  return flatNodes.some(
    (f) =>
      f.node.type === "test" &&
      (scope === "all" || f.chapter.level === scope) &&
      !isChapterAccessible(f.chapter, hasPaid),
  );
}

const SCOPES: { key: Scope; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "beginner", label: "初級" },
  { key: "intermediate", label: "中級" },
  { key: "advanced", label: "上級" },
];

export default function MarathonPage() {
  const hasPaid = useHasPaidAccess();
  const [scope, setScope] = useState<Scope | null>(null);
  const [questions, setQuestions] = useState<MarathonQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [misses, setMisses] = useState(0);
  const [done, setDone] = useState(false);

  // 各スコープの出題数プレビュー（開始画面のバッジ用）
  const counts = useMemo(() => {
    const m = new Map<Scope, number>();
    for (const s of SCOPES) m.set(s.key, collectQuestions(s.key, hasPaid).length);
    return m;
  }, [hasPaid]);

  const start = (s: Scope) => {
    const qs = collectQuestions(s, hasPaid);
    setScope(s);
    setQuestions(qs);
    setIdx(0);
    setPicked(null);
    setCorrect(0);
    setMisses(0);
    setDone(false);
  };

  const total = questions.length;
  const current = questions[idx];
  const answered = picked !== null;

  const pick = (i: number) => {
    if (answered || !current) return;
    setPicked(i);
    const ok = i === current.q.answer;
    resolveJourneyMiss(current.nodeId, current.qIndex, ok); // 正解→弱点から消える
    if (ok) {
      setCorrect((c) => c + 1);
    } else {
      recordJourneyMiss(current.nodeId, current.qIndex); // 不正解→弱点に登録
      setMisses((m) => m + 1);
    }
  };

  const next = () => {
    if (idx + 1 >= total) {
      recordActivity(); // 1セッション完了でストリーク/カレンダーに反映
      setDone(true);
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  };

  // ===== 開始画面（スコープ選択）=====
  if (scope === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
          <Icon name="chevron-left" className="h-3.5 w-3.5" />
          道のりにもどる
        </Link>
        <div className="mt-4 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <Icon name="trophy" className="h-8 w-8" />
          </span>
          <p className="font-display mt-3 text-xs font-bold tracking-widest text-brand-500">MARATHON</p>
          <h1 className="font-display mt-1 text-2xl font-extrabold">通し復習（腕試し）</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            これまでの章末テストを、コース順にまとめて連続で受けるモード。
            間違えた問題は<Link href="/learn/review" className="font-bold text-rose-500 underline decoration-dotted underline-offset-2">弱点復習</Link>にたまるよ。
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {SCOPES.map((s) => {
            const n = counts.get(s.key) ?? 0;
            const disabled = n === 0;
            return (
              <button
                key={s.key}
                onClick={() => !disabled && start(s.key)}
                disabled={disabled}
                className={`card-pop flex items-center justify-between p-5 text-left transition ${
                  disabled ? "cursor-not-allowed opacity-50" : "hover:-translate-y-0.5"
                }`}
              >
                <div>
                  <p className="font-display text-lg font-extrabold text-slate-800">{s.label}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{disabled ? "受けられるテストがまだありません" : `${n} 問を連続で`}</p>
                </div>
                <Icon name="arrow-right" className="h-5 w-5 shrink-0 text-brand-500" strokeWidth={2.5} />
              </button>
            );
          })}
        </div>

        {hasLockedQuestions("all", hasPaid) && (
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-amber-600">
            <Icon name="lock" className="h-3.5 w-3.5" />
            VIP限定の章のテストは含まれません（開放するとここに増えます）
          </p>
        )}
      </div>
    );
  }

  // ===== 完了 =====
  if (done) {
    const rate = total > 0 ? Math.round((correct / total) * 100) : 0;
    const great = rate >= 80;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${great ? "bg-amber-50 text-amber-500" : "bg-brand-50 text-brand-600"}`}>
          <Icon name={great ? "trophy" : "flame"} className="h-8 w-8" />
        </span>
        <h1 className="font-display mt-4 text-2xl font-extrabold">通し復習おつかれさま！</h1>
        <p className="font-display mt-4 text-5xl font-extrabold text-slate-800">
          {correct}
          <span className="text-2xl text-slate-400"> / {total}</span>
        </p>
        <p className="mt-1 text-sm text-slate-400">正答率 {rate}%</p>
        <p className="mt-4 font-medium text-slate-600">
          {great ? "みごと！ この調子で全章制覇をめざそう。" : "おつかれさま。間違えた問題は弱点にためたよ。"}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {misses > 0 && (
            <Link
              href="/learn/review"
              className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#e11d48" }}
            >
              弱点を復習（{misses}）
              <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          )}
          <button
            onClick={() => start(scope)}
            className="btn-3d font-display rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            もう一度
          </button>
          <button
            onClick={() => setScope(null)}
            className="btn-3d rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]"
            style={{ ["--edge" as string]: "#ebe4d5" }}
          >
            範囲をえらび直す
          </button>
        </div>
      </div>
    );
  }

  // ===== 出題 =====
  const q = current.q;
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <button onClick={() => setScope(null)} className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        やめる
      </button>

      <div className="mt-4 text-center">
        <p className="font-display text-xs font-bold tracking-widest text-brand-500">通し復習</p>
        <h1 className="font-display mt-1 text-2xl font-extrabold">章末テストを連続でチャレンジ</h1>
      </div>

      {/* 進捗 */}
      <div className="mt-6 flex items-center gap-4">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500" style={{ width: `${(idx / total) * 100}%` }} />
        </div>
        <span className="font-display text-sm font-extrabold text-slate-500">
          {idx + 1} <span className="text-slate-300">/ {total}</span>
        </span>
      </div>

      <div key={idx} className="animate-pop-in card-pop mt-5 p-6 sm:p-8">
        <p className="text-[11px] font-bold text-slate-400">
          {current.levelLabel}・{current.chapterTitle}
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
              {picked === q.answer ? "正解！" : `正解は「${q.choices[q.answer]}」`}
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
