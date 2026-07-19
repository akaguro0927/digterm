"use client";

import { Icon, type IconName } from "@/components/icons";
import { Eye, useEyeTracking, usePointerParallax } from "@/components/mascotEyes";

// 紙の図鑑カバー用の「標本プレート」。
// 図形だけで構成した抽象キャラ（Co-Creくん）＋周囲に浮かぶUI部品の標本＋
// 「名前を探す」象徴としての虫めがねスイープ。テキストに依存しないので多言語でもそのまま使える。
// 浮遊アイコンは depth ぶんだけカーソルに合わせて視差移動する（見えてない時は停止）。

const SPECIMENS: { icon: IconName; tint: string; pos: string; delay: string; rot: string; depth: number }[] = [
  { icon: "component", tint: "text-violet-500", pos: "left-1 top-4 sm:left-6", delay: "0s", rot: "-6deg", depth: 20 },
  { icon: "droplet", tint: "text-pink-500", pos: "right-2 top-1 sm:right-8", delay: "1.1s", rot: "5deg", depth: -16 },
  { icon: "terminal", tint: "text-emerald-500", pos: "left-3 bottom-6 sm:left-10", delay: "2.2s", rot: "7deg", depth: 14 },
  { icon: "layout", tint: "text-sky-500", pos: "right-3 bottom-3 sm:right-10", delay: "1.6s", rot: "-5deg", depth: -22 },
];

export default function HeroMascot() {
  const { ref, offset } = useEyeTracking(3);
  const { ref: plateRef, vec } = usePointerParallax();
  return (
    <div ref={plateRef} className="relative mx-auto h-[232px] w-full max-w-md overflow-hidden">
      {/* 標本台の影 */}
      <div className="absolute bottom-10 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-slate-900/10 blur-md" />

      {/* 浮かぶUI部品の標本（外=カーソル視差 / 内=ふわふわ浮遊） */}
      {SPECIMENS.map((s, i) => (
        <span
          key={i}
          className={`absolute z-0 ${s.pos}`}
          style={{
            transform: `translate(${vec.x * s.depth}px, ${vec.y * s.depth}px)`,
            transition: "transform 220ms ease-out",
          }}
          aria-hidden
        >
          <span
            className={`animate-float flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#ebe4d5] bg-white shadow-[0_4px_0_#ebe4d5] ${s.tint}`}
            style={{ ["--float-rotate" as string]: s.rot, animationDelay: s.delay }}
          >
            <Icon name={s.icon} className="h-5 w-5" />
          </span>
        </span>
      ))}

      {/* キャラクター本体（ブラウザ窓の頭） */}
      <div
        className="animate-float absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ ["--float-rotate" as string]: "1deg" }}
      >
        {/* アンテナ（ポインタ） */}
        <div className="absolute -top-7 left-1/2 z-20 -translate-x-1/2">
          <span className="mx-auto block h-6 w-0.5 bg-[#d8cfbc]" />
          <span className="animate-wiggle absolute -top-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#ebe4d5] bg-white text-brand-600 shadow-sm">
            <Icon name="pointer" className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </div>

        {/* 頭（ブラウザ窓） */}
        <div className="relative h-32 w-44 rounded-[1.6rem] border-2 border-[#ebe4d5] bg-white shadow-[0_6px_0_#ebe4d5]">
          {/* ウィンドウのバー */}
          <div className="flex items-center gap-1.5 rounded-t-[1.4rem] border-b border-slate-100 bg-slate-50/70 px-3.5 py-2">
            <span className="h-2 w-2 rounded-full bg-rose-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
          </div>

          {/* 顔 */}
          <div ref={ref} className="relative flex h-[calc(100%-30px)] flex-col items-center justify-center">
            <div className="flex items-end gap-5">
              {/* カーソルを追う目＋まばたき */}
              <Eye offset={offset} size="h-5 w-5" pupil="h-3 w-3" />
              <Eye offset={offset} size="h-5 w-5" pupil="h-3 w-3" delay="0.05s" />
            </div>
            {/* ほっぺ */}
            <span className="absolute left-5 top-[56%] h-2.5 w-2.5 rounded-full bg-brand-200/70" />
            <span className="absolute right-5 top-[56%] h-2.5 w-2.5 rounded-full bg-brand-200/70" />
            {/* 笑顔 */}
            <svg viewBox="0 0 40 16" className="mt-2 h-3.5 w-10 text-brand-500" fill="none" aria-hidden>
              <path d="M4 4 C10 14, 30 14, 36 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* 虫めがね（名前を探す象徴アニメ） */}
      <svg
        viewBox="0 0 56 56"
        className="animate-sweep absolute left-2 top-16 z-20 h-24 w-24"
        aria-hidden
      >
        <circle cx="24" cy="24" r="16" fill="rgba(31,200,102,0.10)" stroke="#12a854" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="16" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" />
        <line x1="35" y1="35" x2="50" y2="50" stroke="#12a854" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
