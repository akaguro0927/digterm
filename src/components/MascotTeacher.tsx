"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Eye, useEyeTracking } from "@/components/mascotEyes";

export type FaceExpression = "idle" | "happy" | "talk" | "think";

// 表情ごとの口
function FaceMouth({ expression }: { expression: FaceExpression }) {
  if (expression === "talk") {
    return (
      <svg viewBox="0 0 40 16" className="mt-1.5 h-3 w-9 text-brand-500" aria-hidden>
        <ellipse cx="20" cy="8" rx="5" ry="4" fill="currentColor" />
      </svg>
    );
  }
  const d =
    expression === "happy"
      ? "M4 3 C10 15, 30 15, 36 3"
      : expression === "think"
        ? "M9 8 L31 8"
        : "M6 5 C11 11, 29 11, 34 5";
  return (
    <svg viewBox="0 0 40 16" className="mt-1.5 h-3 w-9 text-brand-500" fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ヘッダーで使ったキャラ（ブラウザ窓の顔）。目がカーソルを追う。物語ナレーション用に単体で使う。
// expression で表情、nonce が変わるたびに小さくうなずく（レッスン本文で語りに合わせて動く）。
export function MascotFace({
  className = "",
  expression = "idle",
  nonce = 0,
}: {
  className?: string;
  expression?: FaceExpression;
  nonce?: number;
}) {
  const { ref, offset } = useEyeTracking(2.5);
  const eyeOff = expression === "think" ? { x: 1.5, y: -2 } : offset;
  const closed = expression === "happy";
  return (
    <div className={`animate-float ${className}`} style={{ ["--float-rotate" as string]: "1deg" }}>
      <div key={nonce} className="relative h-24 w-32 rounded-[1.4rem] border-2 border-[#ebe4d5] bg-white shadow-[0_5px_0_#ebe4d5]" style={{ animation: "nod 0.6s ease-in-out" }}>
        <div className="flex items-center gap-1 rounded-t-[1.2rem] border-b border-slate-100 bg-slate-50/70 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
        </div>
        <div ref={ref} className="relative flex h-[calc(100%-26px)] flex-col items-center justify-center">
          <div className="flex items-end gap-4">
            <Eye offset={eyeOff} size="h-4 w-4" pupil="h-2.5 w-2.5" closed={closed} />
            <Eye offset={eyeOff} size="h-4 w-4" pupil="h-2.5 w-2.5" delay="0.05s" closed={closed} />
          </div>
          <span className="absolute left-4 top-[58%] h-2 w-2 rounded-full bg-brand-200/70" />
          <span className="absolute right-4 top-[58%] h-2 w-2 rounded-full bg-brand-200/70" />
          <FaceMouth expression={expression} />
        </div>
      </div>
    </div>
  );
}

export default function MascotTeacher({
  lines,
  onComplete,
  ctaLabel = "よし、つぎへ！",
}: {
  lines: ReactNode[];
  onComplete: () => void;
  ctaLabel?: string;
}) {
  const [i, setI] = useState(0);
  const isLast = i >= lines.length - 1;

  // 語りに合わせて表情を変える（最後はにっこり、それ以外は話す→考える→ふつうを巡回）
  const expression: FaceExpression = isLast ? "happy" : (["talk", "think", "idle"] as const)[i % 3];

  return (
    <div className="flex flex-col items-center">
      <MascotFace expression={expression} nonce={i} />

      {/* ふきだし（キャラのセリフ） */}
      <div key={i} className="animate-pop-in relative mt-5 w-full max-w-md">
        <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l-2 border-t-2 border-[#ebe4d5] bg-white" />
        <div className="relative rounded-3xl border-2 border-[#ebe4d5] bg-white px-6 py-5 shadow-[0_4px_0_#ebe4d5]">
          <p className="text-center text-[15px] font-medium leading-relaxed text-slate-700">{lines[i]}</p>
        </div>
      </div>

      {/* 進捗ドット */}
      <div className="mt-4 flex gap-1.5">
        {lines.map((_, d) => (
          <span
            key={d}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              d === i ? "w-5 bg-brand-500" : d < i ? "w-1.5 bg-brand-300" : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* 操作 */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={() => setI((v) => Math.max(0, v - 1))}
          className={`text-sm font-bold text-slate-400 transition hover:text-slate-600 ${
            i === 0 ? "pointer-events-none opacity-0" : ""
          }`}
        >
          もどる
        </button>
        <span className="animate-bob inline-block">
          <button
            onClick={() => (isLast ? onComplete() : setI((v) => v + 1))}
            className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-7 py-3 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            {isLast ? ctaLabel : "つぎへ"}
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </span>
      </div>
    </div>
  );
}
