"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getTerm } from "@/data/terms";
import { categoryTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";
import { useIsVip } from "@/lib/plan";
import {
  identifyFromImage,
  askAI,
  getAiRemaining,
  consumeAi,
  AI_FREE_DAILY,
  type IdentifyCandidate,
  type AskResult,
} from "@/lib/ai/assistant";

type Tab = "image" | "ask";

const SAMPLES = ["モーダルって何？", "ハンバーガーメニューの使いどころは？", "トーストとモーダルの違いは？"];

function TermCard({ slug, badge }: { slug: string; badge?: string }) {
  const term = getTerm(slug);
  if (!term) return null;
  const th = categoryTheme[term.category];
  return (
    <Link
      href={`/zukan/${term.slug}`}
      className="group flex items-center gap-3 rounded-2xl border-2 border-[#ebe4d5] bg-white p-3.5 shadow-[0_3px_0_#ebe4d5] transition hover:-translate-y-0.5"
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${th.tile} ${th.tileText}`}>
        <Icon name={th.icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5">
          <span className="font-display truncate text-sm font-extrabold text-slate-800 group-hover:text-brand-600">
            {term.nameJa}
          </span>
          {badge && <span className="rounded-full bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-600">{badge}</span>}
        </span>
        <span className="block truncate text-[11px] text-slate-400">{term.summary}</span>
      </span>
      <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-brand-500" />
    </Link>
  );
}

export default function AiPage() {
  const isVip = useIsVip();
  const [tab, setTab] = useState<Tab>("image");
  const [remaining, setRemaining] = useState<number>(AI_FREE_DAILY);
  const [busy, setBusy] = useState(false);

  // 画像
  const [preview, setPreview] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<IdentifyCandidate[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pickedFile = useRef<File | null>(null);

  // 質問
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AskResult | null>(null);

  useEffect(() => {
    setRemaining(getAiRemaining());
  }, []);

  const out = !isVip && remaining <= 0;

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    pickedFile.current = f;
    setCandidates(null);
    setPreview(URL.createObjectURL(f));
  };

  const runImage = async () => {
    if (!pickedFile.current || busy || out) return;
    setBusy(true);
    setCandidates(null);
    const res = await identifyFromImage(pickedFile.current);
    setCandidates(res);
    if (!isVip) setRemaining(consumeAi());
    setBusy(false);
  };

  const runAsk = async (q: string) => {
    const text = q.trim();
    if (!text || busy || out) return;
    setQuestion(text);
    setBusy(true);
    setAnswer(null);
    const res = await askAI(text);
    setAnswer(res);
    if (!isVip) setRemaining(consumeAi());
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="animate-fade-up text-center">
        <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 ring-1 ring-indigo-100">
          <Icon name="zap" className="h-3.5 w-3.5" />
          AI・お試し版（β）
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">AIでしらべる</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          「この部品なんて名前？」をスクショから判定。用語についてAIに質問もできます。
        </p>
      </div>

      {/* 無料回数（コスト設計のデモ） */}
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-2.5 text-xs ring-1 ring-slate-200">
        {isVip ? (
          <span className="flex items-center gap-1.5 font-bold text-amber-600">
            <Icon name="trophy" className="h-3.5 w-3.5" />
            VIP会員：AIでしらべる無制限
          </span>
        ) : (
          <>
            <span className="flex items-center gap-1.5 text-slate-500">
              <Icon name="zap" className="h-3.5 w-3.5 text-indigo-500" />
              今日の無料利用：残り <span className="font-display font-extrabold text-slate-700">{remaining}</span> / {AI_FREE_DAILY} 回
            </span>
            <Link href="/vip" className="font-bold text-indigo-600 hover:underline">
              VIPなら無制限 →
            </Link>
          </>
        )}
      </div>

      {/* タブ */}
      <div className="mt-5 flex rounded-full bg-slate-100 p-1.5">
        {([["image", "image", "画像でしらべる"], ["ask", "lightbulb", "AIに質問"]] as const).map(([key, icon, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`font-display flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-extrabold transition ${
              tab === key ? "bg-white text-indigo-700 shadow-[0_2px_0_#e0e7ff]" : "text-slate-400 hover:text-slate-500"
            }`}
          >
            <Icon name={icon} className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {out && (
        <Link
          href="/vip"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-2xl bg-amber-50 px-4 py-3 text-center text-xs font-bold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-100"
        >
          <Icon name="trophy" className="h-4 w-4" />
          今日の無料回数を使い切りました。VIPなら無制限 →
        </Link>
      )}

      {/* ===== 画像でしらべる ===== */}
      {tab === "image" && (
        <div className="mt-5">
          <input ref={fileRef} type="file" accept="image/*" onChange={onPick} className="hidden" />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 px-4 py-10 text-center transition hover:border-indigo-300 hover:bg-indigo-50/40"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="選んだ画像" className="max-h-52 w-auto rounded-xl shadow-sm ring-1 ring-slate-200" />
            ) : (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                  <Icon name="image" className="h-7 w-7" />
                </span>
                <span className="font-display text-sm font-extrabold text-slate-700">スクショを選ぶ</span>
                <span className="text-[11px] text-slate-400">名前を知りたい部分が写った画像でOK</span>
              </>
            )}
          </button>

          {preview && (
            <button
              onClick={runImage}
              disabled={busy || out}
              className="btn-3d font-display mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 py-3.5 text-sm font-extrabold text-white disabled:opacity-40"
              style={{ ["--edge" as string]: "#4338ca" }}
            >
              {busy ? "解析中…" : "この部品の名前を調べる"}
              {!busy && <Icon name="search" className="h-4 w-4" strokeWidth={2.5} />}
            </button>
          )}

          {busy && tab === "image" && (
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
              画像を解析しています…
            </div>
          )}

          {candidates && !busy && (
            <div className="animate-pop-in mt-6">
              <p className="font-display mb-2 flex items-center gap-1.5 text-sm font-extrabold text-slate-700">
                <Icon name="search" className="h-4 w-4 text-indigo-500" />
                これですか？（近い順）
              </p>
              <div className="space-y-2.5">
                {candidates.map((c, i) => (
                  <TermCard key={c.slug} slug={c.slug} badge={i === 0 ? "いちばん近い" : undefined} />
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-slate-400">
                ちがった時は別の候補や図鑑検索もどうぞ。画像は保存していません。
              </p>
            </div>
          )}

          <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-[11px] leading-relaxed text-slate-400 ring-1 ring-slate-200">
            ※これはお試し版（モック）です。いまは画像を実際には解析せず、代表的な部品の候補を表示します。
            本番ではAI（画像認識）が実際のスクショから部品名を判定します。
          </p>
        </div>
      )}

      {/* ===== AIに質問 ===== */}
      {tab === "ask" && (
        <div className="mt-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {SAMPLES.map((s) => (
              <button
                key={s}
                onClick={() => setQuestion(s)}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-indigo-600"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runAsk(question);
            }}
            className="flex gap-2"
          >
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="用語について質問（例: モーダルって何？）"
              className="w-full rounded-full bg-slate-50 px-5 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={busy || out || !question.trim()}
              className="btn-3d font-display shrink-0 rounded-full bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white disabled:opacity-40"
              style={{ ["--edge" as string]: "#4338ca" }}
            >
              {busy ? "…" : "聞く"}
            </button>
          </form>

          {busy && tab === "ask" && (
            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500" />
              考えています…
            </div>
          )}

          {answer && !busy && (
            <div className="animate-pop-in mt-5">
              <div className="rounded-3xl border-2 border-[#ebe4d5] bg-white p-5 shadow-[0_4px_0_#ebe4d5]">
                <p className="font-display mb-2 flex items-center gap-1.5 text-xs font-bold text-indigo-600">
                  <Icon name="zap" className="h-3.5 w-3.5" />
                  AIの回答
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{answer.answer}</p>
              </div>
              {answer.refs.length > 0 && (
                <div className="mt-3">
                  <p className="mb-2 text-[11px] font-bold text-slate-400">根拠にした図鑑</p>
                  <div className="space-y-2.5">
                    {answer.refs.map((slug) => (
                      <TermCard key={slug} slug={slug} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-[11px] leading-relaxed text-slate-400 ring-1 ring-slate-200">
            ※お試し版（モック）。いまは図鑑データを根拠に答えます。本番ではAIが自由に回答し、関連する図鑑にリンクします。
          </p>
        </div>
      )}
    </div>
  );
}
