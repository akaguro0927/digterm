"use client";

import { Icon } from "@/components/icons";
import { Eye, useEyeTracking, usePointerParallax } from "@/components/mascotEyes";

type Mode = "login" | "signup";

const SKIN: Record<
  Mode,
  { ring: string; shadow: string; cheek: string; smile: string; antenna: string; hand: string; handEdge: string }
> = {
  login: {
    ring: "border-brand-200",
    shadow: "shadow-[0_8px_0_#bff3d4]",
    cheek: "bg-brand-200/70",
    smile: "text-brand-500",
    antenna: "text-brand-600",
    hand: "bg-brand-400",
    handEdge: "shadow-[0_3px_0_#12a854]",
  },
  signup: {
    ring: "border-violet-200",
    shadow: "shadow-[0_8px_0_#ddd6fe]",
    cheek: "bg-violet-200/70",
    smile: "text-violet-500",
    antenna: "text-violet-600",
    hand: "bg-violet-400",
    handEdge: "shadow-[0_3px_0_#6d28d9]",
  },
};

// ログイン画面の相棒キャラ。カーソルで目線＋体がゆれ、パスワード入力中は手で目をかくす。
export default function AuthMascot({ mode, peeking }: { mode: Mode; peeking: boolean }) {
  const { ref: faceRef, offset } = useEyeTracking(3);
  const { ref: bodyRef, vec } = usePointerParallax();
  const s = SKIN[mode];

  return (
    <div ref={bodyRef} className="relative flex h-56 w-full items-center justify-center">
      {/* 台の影 */}
      <div className="absolute bottom-6 left-1/2 h-4 w-36 -translate-x-1/2 rounded-full bg-slate-900/10 blur-md" />

      {/* 体（カーソルにあわせて傾く・少し動く） */}
      <div
        className="relative"
        style={{
          transform: `translate(${vec.x * 8}px, ${vec.y * 6}px) rotate(${vec.x * 5}deg)`,
          transition: "transform 220ms ease-out",
        }}
      >
        {/* アンテナ（ポインタ） */}
        <div className="absolute -top-7 left-1/2 z-20 -translate-x-1/2">
          <span className="mx-auto block h-6 w-0.5 bg-[#d8cfbc]" />
          <span className={`animate-wiggle absolute -top-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white ${s.ring} ${s.antenna} shadow-sm`}>
            <Icon name="pointer" className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>

        {/* 頭（ブラウザ窓） */}
        <div className={`relative h-36 w-48 rounded-[1.8rem] border-2 bg-white ${s.ring} ${s.shadow}`}>
          {/* ウィンドウのバー */}
          <div className="flex items-center gap-1.5 rounded-t-[1.6rem] border-b border-slate-100 bg-slate-50/70 px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
          </div>

          {/* 顔 */}
          <div ref={faceRef} className="relative flex h-[calc(100%-34px)] flex-col items-center justify-center overflow-hidden">
            <div className="flex items-end gap-6">
              <Eye offset={offset} size="h-6 w-6" pupil="h-3.5 w-3.5" closed={peeking} />
              <Eye offset={offset} size="h-6 w-6" pupil="h-3.5 w-3.5" delay="0.05s" closed={peeking} />
            </div>
            {/* ほっぺ */}
            <span className={`absolute left-6 top-[54%] h-3 w-3 rounded-full ${s.cheek}`} />
            <span className={`absolute right-6 top-[54%] h-3 w-3 rounded-full ${s.cheek}`} />
            {/* 口（通常は笑顔／のぞき見中は小さめ） */}
            {peeking ? (
              <span className="mt-3 h-2.5 w-2.5 rounded-full border-2 border-slate-400" />
            ) : (
              <svg viewBox="0 0 40 16" className={`mt-3 h-4 w-11 ${s.smile}`} fill="none" aria-hidden>
                <path d="M4 4 C10 14, 30 14, 36 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}

            {/* 目かくしの手（パスワード入力中だけ、下からせり上がって目をかくす） */}
            <div
              className="pointer-events-none absolute inset-x-0 flex justify-center gap-4"
              style={{
                top: "18%",
                transform: peeking ? "translateY(0)" : "translateY(150%)",
                opacity: peeking ? 1 : 0,
                transition: "transform 260ms cubic-bezier(0.34,1.56,0.64,1), opacity 200ms ease-out",
              }}
              aria-hidden
            >
              <span className={`h-9 w-9 rounded-full border-2 ${s.ring} ${s.hand} ${s.handEdge}`} />
              <span className={`h-9 w-9 rounded-full border-2 ${s.ring} ${s.hand} ${s.handEdge}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
