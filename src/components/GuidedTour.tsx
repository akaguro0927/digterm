"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

const KEY = "cocre:tour-done:v1";
// ヘルプ等から開き直すためのイベント名（HelpButton から発火）
export const OPEN_TOUR_EVENT = "cocre:open-tutorial";

interface Step {
  key: string;
  selector?: string; // 指し示す実要素（無ければ中央表示）
  title: string;
  body: string;
  optional?: boolean; // 要素が無ければスキップ
  finish?: boolean;
}

const STEPS: Step[] = [
  { key: "welcome", title: "ようこそ！", body: "実際の画面を指しながら、使い方を30秒で案内します。" },
  { key: "zukan", selector: '[data-tour="nav-zukan"]', title: "① 図鑑で探す", body: "用語の一覧。「くるくる」など“見た目の記憶”でも探せます。" },
  { key: "quiz", selector: '[data-tour="nav-quiz"]', title: "② 問題集で試す", body: "覚えたかクイズで確認。答えた瞬間に○×が出ます。" },
  { key: "learn", selector: '[data-tour="nav-learn"]', title: "③ レッスン", body: "コクリと物語で学ぶコース。テストに合格しながら進みます。" },
  { key: "mypage", selector: '[data-tour="nav-mypage"]', title: "④ マイページ", body: "♡で保存した用語や、クイズの成績はここに集まります。" },
  { key: "cta", selector: '[data-tour="hero-cta"]', title: "まずはここから", body: "「図鑑で探す」を押して、気になる部品を見てみましょう。", optional: true },
  { key: "finish", title: "準備OK！", body: "それでは、さっそく始めましょう。フッターの「使い方」からいつでも見返せます。", finish: true },
];

function elementFor(step: Step | undefined): HTMLElement | null {
  if (!step?.selector) return null;
  return document.querySelector<HTMLElement>(step.selector);
}

export default function GuidedTour() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  // 指定方向で「表示できる」ステップ（中央表示 or 要素が存在）を探す
  const resolve = useCallback((start: number, dir: 1 | -1): number => {
    let i = start;
    while (i >= 0 && i < STEPS.length) {
      const s = STEPS[i];
      if (!s.selector || elementFor(s)) return i;
      i += dir;
    }
    return -1;
  }, []);

  const finishTour = useCallback(() => {
    setActive(false);
    setRect(null);
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* 無視 */
    }
  }, []);

  const start = useCallback(() => {
    const first = resolve(0, 1);
    if (first < 0) return;
    setIndex(first);
    setActive(true);
  }, [resolve]);

  // 初回だけ自動起動
  useEffect(() => {
    let done = false;
    try {
      done = Boolean(window.localStorage.getItem(KEY));
    } catch {
      /* 無視 */
    }
    if (done) return;
    const t = setTimeout(start, 700); // レイアウト確定後に開始
    return () => clearTimeout(t);
  }, [start]);

  // ヘルプ（フッター等）からの再起動を常時受け付ける
  useEffect(() => {
    const open = () => start();
    window.addEventListener(OPEN_TOUR_EVENT, open);
    return () => window.removeEventListener(OPEN_TOUR_EVENT, open);
  }, [start]);

  // ステップが変わったら対象へスクロールして位置を計測
  useEffect(() => {
    if (!active) return;
    const step = STEPS[index];
    const el = elementFor(step);
    if (!el) {
      setRect(null);
      return;
    }
    el.scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    const measure = () => setRect(el.getBoundingClientRect());
    const t = setTimeout(measure, 380);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [active, index]);

  const next = () => {
    const step = STEPS[index];
    if (step.finish) return finishTour();
    const n = resolve(index + 1, 1);
    if (n < 0) return finishTour();
    setIndex(n);
  };
  const prev = () => {
    const p = resolve(index - 1, -1);
    if (p >= 0) setIndex(p);
  };

  if (!active) return null;

  const step = STEPS[index];
  const vw = typeof window !== "undefined" ? window.innerWidth : 360;
  const vh = typeof window !== "undefined" ? window.innerHeight : 640;
  const TW = Math.min(320, vw - 24);
  const PAD = 8;

  // ハイライト（暗転の中の“穴”）の位置
  const holeStyle: React.CSSProperties | null = rect
    ? {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null;

  // 吹き出しの位置と矢印
  let tipStyle: React.CSSProperties;
  let arrowLeft = TW / 2;
  let placement: "center" | "below" | "above" = "center";
  if (!rect) {
    tipStyle = { left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: TW };
  } else {
    const left = Math.min(Math.max(rect.left + rect.width / 2 - TW / 2, 12), vw - TW - 12);
    arrowLeft = Math.min(Math.max(rect.left + rect.width / 2 - left, 18), TW - 18);
    if (rect.bottom + 200 < vh) {
      placement = "below";
      tipStyle = { top: rect.bottom + 16, left, width: TW };
    } else {
      placement = "above";
      tipStyle = { bottom: vh - rect.top + 16, left, width: TW };
    }
  }

  const contentSteps = STEPS.filter((s) => !s.finish && s.key !== "welcome");
  const dotActive = contentSteps.findIndex((s) => s.key === step.key);

  return (
    <div className="fixed inset-0 z-[70]">
      {/* クリックを吸収（誤タップ防止） */}
      <div className="absolute inset-0" />

      {/* スポットライト（対象以外を暗転） */}
      {holeStyle && (
        <div
          className="pointer-events-none absolute rounded-2xl ring-4 ring-brand-400 transition-all duration-300"
          style={{ ...holeStyle, boxShadow: "0 0 0 9999px rgba(15, 23, 42, 0.68)" }}
        />
      )}
      {/* 対象が無い（中央）ステップ用の全面暗転 */}
      {!holeStyle && <div className="absolute inset-0 bg-slate-900/68 backdrop-blur-[1px]" />}

      {/* 吹き出し */}
      <div
        className="animate-pop-in absolute rounded-2xl border-2 border-[#ebe4d5] bg-white p-4 shadow-2xl"
        style={tipStyle}
      >
        {/* 矢印 */}
        {placement === "below" && (
          <span
            className="absolute -top-2 h-3.5 w-3.5 rotate-45 border-l-2 border-t-2 border-[#ebe4d5] bg-white"
            style={{ left: arrowLeft }}
          />
        )}
        {placement === "above" && (
          <span
            className="absolute -bottom-2 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#ebe4d5] bg-white"
            style={{ left: arrowLeft }}
          />
        )}

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-extrabold text-slate-800">{step.title}</h3>
          <button
            onClick={finishTour}
            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            スキップ
          </button>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.body}</p>

        {/* 進捗ドット */}
        <div className="mt-3 flex gap-1.5">
          {contentSteps.map((s, i) => (
            <span
              key={s.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === dotActive ? "w-5 bg-brand-500" : "w-1.5 bg-slate-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            onClick={prev}
            className={`text-sm font-bold text-slate-400 transition hover:text-slate-600 ${
              index === resolve(0, 1) ? "pointer-events-none opacity-0" : ""
            }`}
          >
            もどる
          </button>
          {step.finish ? (
            <button
              onClick={() => {
                finishTour();
                router.push("/zukan");
              }}
              className="btn-3d font-display rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              図鑑をひらく
            </button>
          ) : (
            <button
              onClick={next}
              className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
              style={{ ["--edge" as string]: "#12a854" }}
            >
              {step.key === "welcome" ? "はじめる" : "次へ"}
              <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
