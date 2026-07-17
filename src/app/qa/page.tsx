"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import {
  useQuestions,
  addQuestion,
  addAnswer,
  voteQuestion,
  voteAnswer,
  markBest,
  findNgWord,
  QA_CATEGORIES,
  type Question,
} from "@/lib/qaStore";

const CAT_COLORS: Record<string, string> = {
  UI部品: "bg-violet-50 text-violet-600",
  レイアウト: "bg-sky-50 text-sky-600",
  "HTML/CSS": "bg-rose-50 text-rose-600",
  開発用語: "bg-slate-100 text-slate-600",
  バックエンド: "bg-amber-50 text-amber-600",
  その他: "bg-emerald-50 text-emerald-600",
};

function timeAgo(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000);
  if (s < 60) return "たった今";
  if (s < 3600) return `${Math.floor(s / 60)}分前`;
  if (s < 86400) return `${Math.floor(s / 3600)}時間前`;
  return `${Math.floor(s / 86400)}日前`;
}

function Vote({ count, onUp, onDown }: { count: number; onUp: () => void; onDown: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <button onClick={onUp} className="text-slate-300 transition hover:text-brand-500" aria-label="良い">▲</button>
      <span className="font-display text-sm font-extrabold text-slate-700">{count}</span>
      <button onClick={onDown} className="text-slate-300 transition hover:text-rose-400" aria-label="いまいち">▼</button>
    </div>
  );
}

function CatChip({ c }: { c: string }) {
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${CAT_COLORS[c] ?? "bg-slate-100 text-slate-500"}`}>{c}</span>;
}

export default function QaPage() {
  const questions = useQuestions();
  const [view, setView] = useState<"list" | "detail" | "new">("list");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("すべて");

  const selected = questions.find((q) => q.id === selectedId) ?? null;

  const open = (id: string) => {
    setSelectedId(id);
    setView("detail");
  };

  // ===== 質問詳細 =====
  if (view === "detail" && selected) {
    return <Detail q={selected} onBack={() => setView("list")} />;
  }

  // ===== 質問投稿 =====
  if (view === "new") {
    return (
      <NewQuestion
        onCancel={() => setView("list")}
        onCreated={(id) => open(id)}
      />
    );
  }

  // ===== 一覧 =====
  const list = filter === "すべて" ? questions : questions.filter((q) => q.category === filter);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-fade-up flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-brand-500">Q&amp;A</p>
          <h1 className="font-display mt-1 text-3xl font-extrabold">みんなのQ&amp;A</h1>
          <p className="mt-2 text-sm text-slate-500">わからない用語を質問して、みんなで教えあおう。</p>
        </div>
        <button
          onClick={() => setView("new")}
          className="btn-3d font-display inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          <Icon name="pencil" className="h-4 w-4" />
          質問する
        </button>
      </div>

      {/* AI導線（無料は1日1回・VIP無制限） */}
      <Link
        href="/ai"
        className="mt-5 flex items-center gap-3 rounded-2xl border-2 border-indigo-100 bg-indigo-50/50 p-3.5 transition hover:border-indigo-200"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-500">
          <Icon name="zap" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-700">すぐ答えがほしい？ AIに聞く・スクショで調べる</p>
          <p className="text-[11px] text-slate-500">無料は1日1回お試し／VIPは無制限</p>
        </div>
        <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300" />
      </Link>

      {/* カテゴリ絞り込み */}
      <div className="no-scrollbar mt-5 flex gap-1.5 overflow-x-auto pb-1">
        {["すべて", ...QA_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition ${
              filter === c ? "bg-slate-800 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 質問カード一覧 */}
      <div className="mt-5 space-y-3">
        {list.map((q) => {
          const best = q.answers.find((a) => a.best);
          return (
            <button key={q.id} onClick={() => open(q.id)} className="block w-full text-left">
              <div className="card-pop p-4 transition hover:-translate-y-0.5">
                <div className="flex items-center gap-2">
                  <CatChip c={q.category} />
                  <span className="text-[11px] text-slate-400">{timeAgo(q.createdAt)}・{q.author}</span>
                </div>
                <h2 className="font-display mt-1.5 font-extrabold text-slate-800">{q.title}</h2>
                <p className="mt-1 line-clamp-1 text-xs text-slate-500">{q.body}</p>
                <div className="mt-2.5 flex items-center gap-3 text-[11px] font-bold">
                  <span className="flex items-center gap-1 text-slate-400">▲ {q.votes}</span>
                  <span className={`flex items-center gap-1 ${q.answers.length ? "text-brand-600" : "text-amber-500"}`}>
                    <Icon name="book-open" className="h-3.5 w-3.5" />
                    {q.answers.length ? `回答 ${q.answers.length}` : "回答募集中"}
                  </span>
                  {best && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      解決済み
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Detail({ q, onBack }: { q: Question; onBack: () => void }) {
  const [answer, setAnswer] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const sorted = [...q.answers].sort((a, b) => (b.best ? 1 : 0) - (a.best ? 1 : 0) || b.votes - a.votes);

  const submit = () => {
    const body = answer.trim();
    if (!body) return;
    const ng = findNgWord(body);
    if (ng) {
      setErr(`不適切な言葉（「${ng}」）が含まれています。書き直してください。`);
      return;
    }
    addAnswer(q.id, body);
    setAnswer("");
    setErr(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <button onClick={onBack} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        質問一覧にもどる
      </button>

      {/* 質問 */}
      <div className="card-pop mt-3 p-5">
        <div className="flex gap-4">
          <Vote count={q.votes} onUp={() => voteQuestion(q.id, 1)} onDown={() => voteQuestion(q.id, -1)} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <CatChip c={q.category} />
              <span className="text-[11px] text-slate-400">{timeAgo(q.createdAt)}・{q.author}</span>
            </div>
            <h1 className="font-display mt-2 text-xl font-extrabold">{q.title}</h1>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">{q.body}</p>
          </div>
        </div>
      </div>

      {/* 回答 */}
      <h2 className="font-display mt-6 text-sm font-extrabold text-slate-700">{q.answers.length}件の回答</h2>

      {q.answers.length === 0 && (
        <Link href="/ai" className="mt-2 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700 ring-1 ring-amber-200">
          <Icon name="zap" className="h-4 w-4 shrink-0" />
          まだ回答がありません。<span className="font-bold">AIにたたき台を頼む（VIP）</span>こともできます →
        </Link>
      )}

      <div className="mt-3 space-y-3">
        {sorted.map((a) => (
          <div key={a.id} className={`rounded-2xl border-2 p-4 ${a.best ? "border-emerald-200 bg-emerald-50/40" : "border-[#ebe4d5] bg-white"}`}>
            <div className="flex gap-4">
              <Vote count={a.votes} onUp={() => voteAnswer(q.id, a.id, 1)} onDown={() => voteAnswer(q.id, a.id, -1)} />
              <div className="min-w-0 flex-1">
                {a.best && (
                  <span className="font-display inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    ベストアンサー
                  </span>
                )}
                <p className={`whitespace-pre-line text-sm leading-relaxed text-slate-700 ${a.best ? "mt-1.5" : ""}`}>{a.body}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{timeAgo(a.createdAt)}・{a.author}</span>
                  <button
                    onClick={() => markBest(q.id, a.id)}
                    className={`text-[11px] font-bold ${a.best ? "text-emerald-600" : "text-slate-400 hover:text-emerald-600"}`}
                  >
                    {a.best ? "ベスト解除" : "ベストにする"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 回答フォーム */}
      <div className="card-pop mt-6 p-4">
        <p className="font-display mb-2 text-sm font-extrabold text-slate-700">回答する</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={3}
          placeholder="知っていることを教えてあげよう"
          className="w-full resize-none rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500"
        />
        {err && (
          <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-500">
            <Icon name="x" className="h-3.5 w-3.5" strokeWidth={3} />
            {err}
          </p>
        )}
        <div className="mt-2 flex justify-end">
          <button
            onClick={submit}
            disabled={!answer.trim()}
            className="btn-3d font-display rounded-full bg-brand-500 px-5 py-2 text-sm font-extrabold text-white disabled:opacity-40"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            回答を投稿
          </button>
        </div>
      </div>
    </div>
  );
}

function NewQuestion({ onCancel, onCreated }: { onCancel: () => void; onCreated: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(QA_CATEGORIES[0]);
  const [err, setErr] = useState<string | null>(null);

  const submit = () => {
    if (!title.trim()) return;
    const ng = findNgWord(title + " " + body);
    if (ng) {
      setErr(`不適切な言葉（「${ng}」）が含まれています。書き直してください。`);
      return;
    }
    const id = addQuestion({ title: title.trim(), body: body.trim(), category });
    onCreated(id);
  };

  const inputCls =
    "mt-1 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <button onClick={onCancel} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        やめる
      </button>
      <h1 className="font-display mt-3 text-2xl font-extrabold">質問する</h1>
      <p className="mt-1 text-sm text-slate-500">わからないこと、うろ覚えの名前、なんでもどうぞ。</p>

      <div className="card-pop mt-5 space-y-4 p-6">
        <label className="block">
          <span className="text-xs font-bold text-slate-500">タイトル</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例: この丸いボタンの名前は？" className={inputCls} />
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500">カテゴリ</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
            {QA_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-bold text-slate-500">くわしく（任意）</span>
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="状況や、見た目の特徴などを書くと回答がつきやすいよ" className={`${inputCls} resize-none`} />
        </label>
        {err && (
          <p className="flex items-center gap-1 text-xs text-rose-500">
            <Icon name="x" className="h-3.5 w-3.5" strokeWidth={3} />
            {err}
          </p>
        )}
        <p className="text-[11px] text-slate-400">※暴言・不適切な内容は投稿できません。低評価が多い投稿は自動で整理されます。</p>
        <button
          onClick={submit}
          disabled={!title.trim()}
          className="btn-3d font-display w-full rounded-full bg-brand-500 py-3 text-sm font-extrabold text-white disabled:opacity-40"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          投稿する
        </button>
      </div>
    </div>
  );
}
