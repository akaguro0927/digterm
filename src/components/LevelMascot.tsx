"use client";

import { Icon, type IconName } from "@/components/icons";
import { Eye, useEyeTracking } from "@/components/mascotEyes";

export type MascotLevel = "beginner" | "intermediate" | "advanced";
export type Reaction = "idle" | "correct" | "wrong";

// 顔の口（反応で表情が変わる）
function Mouth({ reaction, color }: { reaction: Reaction; color: string }) {
  const d =
    reaction === "correct"
      ? "M3 3 C9 13, 21 13, 27 3"
      : reaction === "wrong"
        ? "M4 10 C10 3, 20 3, 26 10"
        : "M4 4 C9 10, 21 10, 26 4";
  return (
    <svg viewBox="0 0 30 14" className={`h-3 w-7 ${color}`} fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// 反応にあわせた目（idle=カーソル追従／correct=にっこり弧／wrong=下向きしょんぼり）
function Eyes({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  if (reaction === "correct") {
    return (
      <div className="flex items-end gap-3">
        <Eye offset={offset} size="h-4 w-4" pupil="h-2 w-2" closed />
        <Eye offset={offset} size="h-4 w-4" pupil="h-2 w-2" closed delay="0.05s" />
      </div>
    );
  }
  const off = reaction === "wrong" ? { x: 0, y: 2.5 } : offset;
  return (
    <div className="flex items-end gap-3">
      <Eye offset={off} size="h-4 w-4" pupil="h-2 w-2" />
      <Eye offset={off} size="h-4 w-4" pupil="h-2 w-2" delay="0.05s" />
    </div>
  );
}

// ── 初級：いつものブラウザ窓キャラ（Co-Cre）──
function BrowserChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  return (
    <div className="relative h-20 w-24 rounded-2xl border-2 border-brand-200 bg-white shadow-[0_5px_0_#bff3d4]">
      <div className="flex items-center gap-1 rounded-t-xl border-b border-slate-100 bg-slate-50/70 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
      </div>
      <div className="flex h-[calc(100%-20px)] flex-col items-center justify-center">
        <Eyes offset={offset} reaction={reaction} />
        <div className="mt-1">
          <Mouth reaction={reaction} color="text-brand-500" />
        </div>
      </div>
    </div>
  );
}

// ── 中級：ネコ（動物キャラ）──
function CatChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const earDroop = reaction === "wrong";
  return (
    <div className="relative">
      {/* 耳 */}
      <span
        className="absolute -top-2 left-1 h-0 w-0 border-b-[16px] border-l-[9px] border-r-[9px] border-b-orange-200 border-l-transparent border-r-transparent transition-transform"
        style={{ transform: earDroop ? "rotate(28deg)" : "rotate(-8deg)" }}
      />
      <span
        className="absolute -top-2 right-1 h-0 w-0 border-b-[16px] border-l-[9px] border-r-[9px] border-b-orange-200 border-l-transparent border-r-transparent transition-transform"
        style={{ transform: earDroop ? "rotate(-28deg)" : "rotate(8deg)" }}
      />
      {/* 顔 */}
      <div className="relative flex h-20 w-20 flex-col items-center justify-center rounded-[46%] border-2 border-orange-200 bg-white shadow-[0_5px_0_#fed7aa]">
        <Eyes offset={offset} reaction={reaction} />
        {/* 鼻 */}
        <span className="mt-1 h-0 w-0 border-l-[3px] border-r-[3px] border-t-[4px] border-l-transparent border-r-transparent border-t-rose-300" />
        <Mouth reaction={reaction} color="text-orange-400" />
        {/* ヒゲ */}
        <span className="absolute left-0 top-[52%] h-px w-4 -rotate-6 bg-slate-200" />
        <span className="absolute left-0 top-[60%] h-px w-4 rotate-6 bg-slate-200" />
        <span className="absolute right-0 top-[52%] h-px w-4 rotate-6 bg-slate-200" />
        <span className="absolute right-0 top-[60%] h-px w-4 -rotate-6 bg-slate-200" />
      </div>
    </div>
  );
}

// ── 上級：フクロウ（かしこい動物キャラ）──
function OwlChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  return (
    <div className="relative">
      {/* 羽角（耳） */}
      <span className="absolute -top-2 left-3 h-0 w-0 border-b-[12px] border-l-[6px] border-r-[6px] border-b-violet-200 border-l-transparent border-r-transparent -rotate-12" />
      <span className="absolute -top-2 right-3 h-0 w-0 border-b-[12px] border-l-[6px] border-r-[6px] border-b-violet-200 border-l-transparent border-r-transparent rotate-12" />
      {/* 体 */}
      <div className="relative flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center rounded-[50%_50%_46%_46%] border-2 border-violet-200 bg-white shadow-[0_5px_0_#ddd6fe]">
        {/* 大きな目の円盤 */}
        <div className="flex items-center gap-0.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 ring-1 ring-violet-100">
            {reaction === "correct" ? (
              <Eye offset={offset} size="h-4 w-4" pupil="h-2 w-2" closed />
            ) : (
              <Eye offset={reaction === "wrong" ? { x: 0, y: 2.5 } : offset} size="h-4 w-4" pupil="h-2.5 w-2.5" />
            )}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 ring-1 ring-violet-100">
            {reaction === "correct" ? (
              <Eye offset={offset} size="h-4 w-4" pupil="h-2 w-2" closed delay="0.05s" />
            ) : (
              <Eye offset={reaction === "wrong" ? { x: 0, y: 2.5 } : offset} size="h-4 w-4" pupil="h-2.5 w-2.5" delay="0.05s" />
            )}
          </span>
        </div>
        {/* くちばし */}
        <span className="mt-0.5 h-0 w-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-amber-400" />
      </div>
    </div>
  );
}

// 正解時のキラキラ／不正解時のもやもや（レベルごとに形・色ちがい）
const CORRECT_FX: Record<MascotLevel, { icon: IconName; color: string }> = {
  beginner: { icon: "zap", color: "text-brand-500" },
  intermediate: { icon: "heart", color: "text-rose-400" },
  advanced: { icon: "trophy", color: "text-amber-500" },
};

const SPARK_POS = ["left-0 top-1", "right-0 top-2", "left-4 -top-2", "right-5 -top-1", "left-1/2 -top-3"];

function EffectLayer({ level, kind, nonce }: { level: MascotLevel; kind: Reaction; nonce: number }) {
  if (kind === "correct") {
    const fx = CORRECT_FX[level];
    return (
      <div key={`c-${nonce}`} className="pointer-events-none absolute inset-0 z-10" aria-hidden>
        {SPARK_POS.map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} ${fx.color}`}
            style={{ animation: `spark 0.9s ease-out ${i * 0.08}s both` }}
          >
            <Icon name={fx.icon} className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    );
  }
  if (kind === "wrong") {
    // レベルごとに違う「がっかり」演出
    return (
      <div key={`w-${nonce}`} className="pointer-events-none absolute inset-0 z-10" aria-hidden>
        {level === "beginner" && (
          <span
            className="absolute right-1 top-2 h-3 w-2.5 rounded-full rounded-tl-none bg-sky-300"
            style={{ animation: "sweat 0.9s ease-in both" }}
          />
        )}
        {level === "intermediate" && (
          <span className="absolute right-0 top-0 text-rose-400" style={{ animation: "sweat 0.9s ease-in both" }}>
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M8 2 V6 M8 2 L5 5 M8 2 L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        )}
        {level === "advanced" && (
          <span
            className="absolute right-1 top-1 flex gap-0.5"
            style={{ animation: "sweat 1s ease-in both" }}
          >
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </span>
        )}
      </div>
    );
  }
  return null;
}

// レッスン・問題集に置く、レベル別の相棒キャラ。回答で表情＆周りの演出が変わる。
export default function LevelMascot({
  level,
  reaction,
  nonce = 0,
  className = "",
}: {
  level: MascotLevel;
  reaction: Reaction;
  nonce?: number;
  className?: string;
}) {
  const { ref, offset } = useEyeTracking(2);
  const anim =
    reaction === "correct"
      ? "animate-[hop_0.7s_ease-in-out]"
      : reaction === "wrong"
        ? "animate-[shake_0.5s_ease-in-out]"
        : "animate-float";

  return (
    <div ref={ref} className={`relative mx-auto flex h-24 w-full max-w-[10rem] items-end justify-center ${className}`}>
      <EffectLayer level={level} kind={reaction} nonce={nonce} />
      <div key={`${reaction}-${nonce}`} className={anim}>
        {level === "beginner" && <BrowserChar offset={offset} reaction={reaction} />}
        {level === "intermediate" && <CatChar offset={offset} reaction={reaction} />}
        {level === "advanced" && <OwlChar offset={offset} reaction={reaction} />}
      </div>
    </div>
  );
}
