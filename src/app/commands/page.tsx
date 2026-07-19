"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import {
  winCommands,
  CMD_CATEGORY_LABELS,
  type CmdCategory,
} from "@/data/winCommands";

const CATS = Object.keys(CMD_CATEGORY_LABELS) as CmdCategory[];

const SHELL_BADGE: Record<string, { label: string; cls: string }> = {
  cmd: { label: "コマンドプロンプト", cls: "bg-slate-100 text-slate-600" },
  ps: { label: "PowerShell", cls: "bg-sky-100 text-sky-700" },
  both: { label: "どちらでも", cls: "bg-emerald-100 text-emerald-700" },
};

function norm(s: string) {
  return s.toLowerCase().replace(/\s+/g, "");
}

export default function CommandsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CmdCategory | "all">("all");

  const filtered = useMemo(() => {
    const nq = norm(q);
    return winCommands.filter((c) => {
      if (cat !== "all" && c.category !== cat) return false;
      if (!nq) return true;
      const blob = norm(
        [c.name, c.reading, c.summary, c.description, ...(c.aliases ?? [])].join(" "),
      );
      return blob.includes(nq);
    });
  }, [q, cat]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="animate-fade-up">
        <p className="font-display text-xs font-bold tracking-widest text-brand-500">COMMAND ZUKAN</p>
        <h1 className="font-display mt-1 flex items-center gap-2 text-3xl font-extrabold">
          <Icon name="terminal" className="h-7 w-7 text-brand-600" />
          Windowsコマンド図鑑
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          「黒い画面（ターミナル）がこわい」を卒業しよう。フロント開発でよく使うコマンドを、用途・具体例つきで集めました。
          コマンドプロンプトと PowerShell の両方に対応。
        </p>
      </div>

      {/* 検索 */}
      <div className="mt-6 flex items-center gap-2 rounded-2xl border-2 border-[#e7ddc8] bg-white px-4 py-3 focus-within:border-brand-300">
        <Icon name="search" className="h-5 w-5 shrink-0 text-slate-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="コマンド名・やりたいこと（例: ファイル 削除 / ぴんぐ）"
          className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-300"
        />
        {q && (
          <button type="button" onClick={() => setQ("")} className="text-slate-300 hover:text-slate-500">
            <Icon name="x" className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* カテゴリ */}
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCat("all")}
          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
            cat === "all" ? "bg-brand-500 text-white" : "bg-white text-slate-500 ring-1 ring-[#e7ddc8] hover:text-brand-600"
          }`}
        >
          すべて
        </button>
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              cat === c ? "bg-brand-500 text-white" : "bg-white text-slate-500 ring-1 ring-[#e7ddc8] hover:text-brand-600"
            }`}
          >
            {CMD_CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs font-bold text-slate-400">{filtered.length} 件</p>

      {/* 一覧 */}
      <div className="mt-2 grid gap-3">
        {filtered.map((c) => {
          const badge = SHELL_BADGE[c.shell];
          return (
            <div key={c.slug} className="card-pop p-5">
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-sm font-bold text-emerald-300">
                  {c.name}
                </code>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${badge.cls}`}>{badge.label}</span>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[10px] font-bold text-brand-600">
                  {CMD_CATEGORY_LABELS[c.category]}
                </span>
              </div>
              <p className="mt-2.5 font-display text-sm font-extrabold text-slate-800">{c.summary}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{c.description}</p>

              <div className="mt-3 rounded-xl bg-slate-900 px-3.5 py-2.5">
                <p className="text-[10px] font-bold tracking-wider text-slate-500">例</p>
                <pre className="mt-0.5 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-100">{c.example}</pre>
              </div>
              {c.exampleNote && <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">{c.exampleNote}</p>}
              {c.aliases && c.aliases.length > 0 && (
                <p className="mt-2 text-[11px] text-slate-400">
                  別名・関連: {c.aliases.map((a) => (
                    <span key={a} className="mr-1.5 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-500">{a}</span>
                  ))}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
          <p className="text-sm text-slate-400">見つかりませんでした。別のことばで探してみてください。</p>
        </div>
      )}

      <div className="mt-8 rounded-2xl bg-brand-50/60 p-4 text-center ring-1 ring-brand-100">
        <p className="text-xs leading-relaxed text-slate-600">
          コマンドは「打って試して覚える」のが最短。まずは <code className="font-mono font-bold text-brand-700">cd</code> と{" "}
          <code className="font-mono font-bold text-brand-700">dir</code> から。
        </p>
        <Link href="/zukan" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline">
          <Icon name="book" className="h-3.5 w-3.5" />
          用語図鑑へもどる
        </Link>
      </div>
    </div>
  );
}
