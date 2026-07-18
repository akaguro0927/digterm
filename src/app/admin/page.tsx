"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { terms } from "@/data/terms";
import { useQuestions, deleteQuestion, deleteAnswer, type Question } from "@/lib/qaStore";

// ※モックの管理画面。パスワードは端末ローカル判定（本番は Supabase のロール判定に置き換える）。
const ADMIN_PASS = "cocre-admin";
const ADMIN_KEY = "cocre:admin:v1";

function Stat({ label, value, tint }: { label: string; value: number; tint: string }) {
  return (
    <div className="card-pop p-4 text-center">
      <p className={`font-display text-2xl font-extrabold ${tint}`}>{value}</p>
      <p className="mt-0.5 text-[11px] text-slate-400">{label}</p>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const questions = useQuestions();

  useEffect(() => {
    try {
      if (window.localStorage.getItem(ADMIN_KEY) === "1") setAuthed(true);
    } catch {
      /* 無視 */
    }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      try {
        window.localStorage.setItem(ADMIN_KEY, "1");
      } catch {
        /* 無視 */
      }
      setAuthed(true);
    } else {
      setErr(true);
    }
  };

  const logout = () => {
    try {
      window.localStorage.removeItem(ADMIN_KEY);
    } catch {
      /* 無視 */
    }
    setAuthed(false);
  };

  // ===== ログイン =====
  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-10">
        <div className="card-pop p-7 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-800 text-white">
            <Icon name="shield" className="h-7 w-7" />
          </span>
          <h1 className="font-display mt-4 text-2xl font-extrabold">管理者ページ</h1>
          <p className="mt-1 text-sm text-slate-500">合言葉を入力してください。</p>
          <form onSubmit={login} className="mt-5">
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setErr(false);
              }}
              placeholder="合言葉"
              className="w-full rounded-xl bg-slate-50 px-4 py-3 text-center text-sm outline-none ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-brand-500"
            />
            {err && <p className="mt-2 text-xs text-rose-500">合言葉がちがいます。</p>}
            <button
              type="submit"
              className="btn-3d font-display mt-4 w-full rounded-full bg-slate-800 py-3 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#0f172a" }}
            >
              入る
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== ダッシュボード =====
  const totalAnswers = questions.reduce((s, q) => s + q.answers.length, 0);
  const unanswered = questions.filter((q) => q.answers.length === 0).length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-slate-400">ADMIN</p>
          <h1 className="font-display mt-1 text-3xl font-extrabold">管理者ダッシュボード</h1>
        </div>
        <button onClick={logout} className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-500">
          <Icon name="log-out" className="h-3.5 w-3.5" />
          ログアウト
        </button>
      </div>

      {/* 統計 */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="図鑑の用語" value={terms.length} tint="text-brand-600" />
        <Stat label="質問" value={questions.length} tint="text-slate-700" />
        <Stat label="回答" value={totalAnswers} tint="text-slate-700" />
        <Stat label="未回答" value={unanswered} tint="text-amber-500" />
      </div>

      {/* Q&Aモデレーション */}
      <h2 className="font-display mb-3 mt-8 flex items-center gap-2 text-lg font-extrabold text-slate-800">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
          <Icon name="trash" className="h-4 w-4" />
        </span>
        Q&Aの管理（不適切な投稿を削除）
      </h2>

      {questions.length === 0 && <p className="text-sm text-slate-400">質問はありません。</p>}

      <div className="space-y-3">
        {questions.map((q) => (
          <ModItem key={q.id} q={q} />
        ))}
      </div>

      <p className="mt-8 rounded-2xl bg-slate-50 px-4 py-3 text-[11px] leading-relaxed text-slate-400 ring-1 ring-slate-200">
        ※これはモックの管理画面です（合言葉は端末内で判定）。本番では、ログインしたユーザーの「管理者ロール」をサーバー側（Supabase）で判定し、
        低評価の自動整理・期限削除・昇格の承認もここで行います。
      </p>
    </div>
  );
}

function ModItem({ q }: { q: Question }) {
  const cat = q.category;
  const delQ = () => {
    if (window.confirm(`質問「${q.title}」を削除しますか？（回答もすべて消えます）`)) deleteQuestion(q.id);
  };
  return (
    <div className="card-pop p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">{cat}</span>
          <p className="font-display mt-1 font-bold text-slate-800">{q.title}</p>
          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{q.body}</p>
          <p className="mt-1 text-[10px] text-slate-400">▲{q.votes}・回答{q.answers.length}・{q.author}</p>
        </div>
        <button onClick={delQ} className="flex shrink-0 items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-100">
          <Icon name="trash" className="h-3.5 w-3.5" />
          質問を削除
        </button>
      </div>

      {q.answers.length > 0 && (
        <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
          {q.answers.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <div className="min-w-0">
                <p className="text-xs text-slate-600">{a.body}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">▲{a.votes}・{a.author}{a.best ? "・ベスト" : ""}</p>
              </div>
              <button
                onClick={() => window.confirm("この回答を削除しますか？") && deleteAnswer(q.id, a.id)}
                className="shrink-0 text-slate-300 hover:text-rose-500"
                aria-label="回答を削除"
              >
                <Icon name="trash" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
