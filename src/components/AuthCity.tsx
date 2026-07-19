"use client";

import { Eye, useEyeTracking, usePointerParallax } from "@/components/mascotEyes";

type Mode = "login" | "signup";

interface Building {
  shape: "box" | "cyl"; // 箱型 / 円柱型
  h: string;
  w: string;
  depth: number; // カーソル視差の強さ（符号で向き）
  windows: number;
  delay: string;
}

// ビル群のシルエット（高さバラバラ＝スカイライン）。真ん中が一番高い。
const BUILDINGS: Building[] = [
  { shape: "box", h: "h-24", w: "w-12", depth: 16, windows: 4, delay: "0s" },
  { shape: "cyl", h: "h-36", w: "w-14", depth: -10, windows: 6, delay: "0.6s" },
  { shape: "box", h: "h-48", w: "w-16", depth: 7, windows: 8, delay: "1.2s" },
  { shape: "cyl", h: "h-32", w: "w-12", depth: -14, windows: 5, delay: "0.3s" },
  { shape: "box", h: "h-28", w: "w-14", depth: 12, windows: 4, delay: "0.9s" },
];

export default function AuthCity({
  mode,
  peeking,
  celebrating = false,
}: {
  mode: Mode;
  peeking: boolean;
  celebrating?: boolean;
}) {
  const { ref: eyesRef, offset } = useEyeTracking(2.5);
  const { ref: cityRef, vec } = usePointerParallax();

  const accent = mode === "login" ? "bg-brand-400" : "bg-violet-400";
  const ring = mode === "login" ? "border-brand-200" : "border-violet-200";
  const smile = mode === "login" ? "text-brand-500" : "text-violet-500";
  const eyesClosed = peeking || celebrating; // 入力中は目隠し／お祝い中は笑い目（弧）

  return (
    <div ref={cityRef} className="relative flex h-64 w-full items-end justify-center gap-2.5 pb-2">
      {/* 地面 */}
      <div className="absolute bottom-2 left-1/2 h-1.5 w-64 max-w-full -translate-x-1/2 rounded-full bg-slate-900/10 blur-[2px]" />

      <div ref={eyesRef} className="flex items-end justify-center gap-2.5">
        {BUILDINGS.map((b, i) => (
          <div
            key={i}
            className="animate-float relative"
            style={{
              transform: `translateX(${vec.x * b.depth}px) rotate(${vec.x * 2}deg)`,
              transition: "transform 240ms ease-out",
              animationDelay: b.delay,
              ["--float-rotate" as string]: "0deg",
            }}
          >
            <div
              className={`relative ${b.h} ${b.w} border-2 bg-white ${ring} flex flex-col items-center rounded-b-md shadow-[0_5px_0_rgba(0,0,0,0.06)] ${
                b.shape === "cyl" ? "rounded-t-[999px]" : "rounded-t-xl"
              }`}
              style={celebrating ? { animation: `celebrate-hop 0.9s ${i * 0.08}s ease-in-out 2` } : undefined}
            >
              {/* アンテナ（真ん中の一番高いビルだけ） */}
              {i === 2 && (
                <span className="absolute -top-4 left-1/2 h-4 w-0.5 -translate-x-1/2 bg-[#d8cfbc]">
                  <span className={`absolute -top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${accent}`} />
                </span>
              )}

              {/* 顔 */}
              <div className="mt-3 flex items-end gap-1.5">
                <Eye offset={offset} size="h-3.5 w-3.5" pupil="h-2 w-2" closed={eyesClosed} />
                <Eye offset={offset} size="h-3.5 w-3.5" pupil="h-2 w-2" closed={eyesClosed} delay="0.06s" />
              </div>
              {/* 口 */}
              {celebrating ? (
                <span className="mt-1 h-1.5 w-3 rounded-b-full bg-slate-500" />
              ) : peeking ? (
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full border-2 border-slate-400" />
              ) : (
                <svg viewBox="0 0 24 10" className={`mt-1 h-2 w-5 ${smile}`} fill="none" aria-hidden>
                  <path d="M3 3 C7 9, 17 9, 21 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              )}

              {/* 窓（ビルらしさ） */}
              <div className="mt-2 grid grid-cols-2 gap-1">
                {Array.from({ length: b.windows }).map((_, w) => (
                  <span
                    key={w}
                    className={`h-1.5 w-1.5 rounded-[1px] ${w % 3 === 0 ? accent : "bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
