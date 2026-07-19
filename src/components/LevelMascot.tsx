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
function Eyes({
  offset,
  reaction,
  size = "h-4 w-4",
  pupil = "h-2 w-2",
  gap = "gap-3",
}: {
  offset: { x: number; y: number };
  reaction: Reaction;
  size?: string;
  pupil?: string;
  gap?: string;
}) {
  if (reaction === "correct") {
    return (
      <div className={`flex items-end ${gap}`}>
        <Eye offset={offset} size={size} pupil={pupil} closed />
        <Eye offset={offset} size={size} pupil={pupil} closed delay="0.05s" />
      </div>
    );
  }
  const off = reaction === "wrong" ? { x: 0, y: 2.5 } : offset;
  return (
    <div className={`flex items-end ${gap}`}>
      <Eye offset={off} size={size} pupil={pupil} />
      <Eye offset={off} size={size} pupil={pupil} delay="0.05s" />
    </div>
  );
}

// ── 初級：いつものブラウザ窓キャラ（Co-Cre）。アンテナがぴょこぴょこ動く ──
function BrowserChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  return (
    <div className="relative">
      {/* アンテナ（ポインタ） */}
      <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
        <span className="mx-auto block h-4 w-0.5 bg-[#d8cfbc]" />
        <span className="animate-wiggle absolute -top-1 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand-200 bg-white text-brand-600 shadow-sm">
          <Icon name="pointer" className="h-2.5 w-2.5" strokeWidth={2.5} />
        </span>
      </div>
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
    </div>
  );
}

// ── 中級：ネコ。尻尾がゆらゆら／耳がぴくっ、まちがえると耳がへたる ──
function CatChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const earDroop = reaction === "wrong";
  const tailUp = reaction === "correct";
  return (
    <div className="relative">
      {/* 尻尾（ゆらゆら／正解でピンと上がる） */}
      <svg
        viewBox="0 0 24 44"
        className="absolute -right-4 bottom-0 z-0 h-14 w-8 text-orange-200"
        style={{
          transformOrigin: "left bottom",
          animation: tailUp ? "tail-wag 0.5s ease-in-out 2" : "tail-wag 1.8s ease-in-out infinite",
        }}
        aria-hidden
      >
        <path d="M5 42 C5 24, 20 24, 17 6" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
      {/* 耳 */}
      <span
        className="absolute -top-2 left-1.5 z-10 h-0 w-0 border-b-[16px] border-l-[9px] border-r-[9px] border-b-orange-200 border-l-transparent border-r-transparent transition-transform duration-300"
        style={{ transform: earDroop ? "rotate(30deg)" : "rotate(-8deg)", transformOrigin: "bottom" }}
      />
      <span
        className="absolute -top-2 right-1.5 z-10 h-0 w-0 border-b-[16px] border-l-[9px] border-r-[9px] border-b-orange-200 border-l-transparent border-r-transparent transition-transform duration-300"
        style={{ transform: earDroop ? "rotate(-30deg)" : "rotate(8deg)", transformOrigin: "bottom" }}
      />
      {/* 顔 */}
      <div className="relative z-[1] flex h-20 w-20 flex-col items-center justify-center rounded-[46%] border-2 border-orange-200 bg-white shadow-[0_5px_0_#fed7aa]">
        <Eyes offset={offset} reaction={reaction} />
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

// ── 上級：ロボット（フクロウ回避）。アンテナ光が点滅／ボルト付きの画面フェイス ──
function RobotChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const screen =
    reaction === "correct" ? "bg-emerald-50" : reaction === "wrong" ? "bg-rose-50" : "bg-[#eafff3]";
  const light = reaction === "wrong" ? "bg-rose-400" : "bg-amber-400";
  return (
    <div className="relative">
      {/* アンテナ（光が点滅） */}
      <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
        <span className="mx-auto block h-4 w-0.5 bg-slate-300" />
        <span
          className={`absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full ${light}`}
          style={{ animation: "antenna-blip 1.2s ease-in-out infinite" }}
        />
      </div>
      {/* 横のボルト（耳） */}
      <span className="absolute top-1/2 -left-1.5 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-violet-200 bg-white" />
      <span className="absolute top-1/2 -right-1.5 z-10 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-violet-200 bg-white" />
      {/* 頭（四角） */}
      <div className="relative h-20 w-24 rounded-2xl border-2 border-violet-200 bg-white shadow-[0_5px_0_#ddd6fe]">
        {/* 画面フェイス */}
        <div className={`absolute inset-2 flex flex-col items-center justify-center rounded-xl ring-1 ring-violet-100 transition-colors ${screen}`}>
          <Eyes offset={offset} reaction={reaction} gap="gap-2.5" />
          <div className="mt-1">
            <Mouth reaction={reaction} color="text-violet-500" />
          </div>
        </div>
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
      <div key={`c-${nonce}`} className="pointer-events-none absolute inset-0 z-20" aria-hidden>
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
    return (
      <div key={`w-${nonce}`} className="pointer-events-none absolute inset-0 z-20" aria-hidden>
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
          <span className="absolute right-1 top-1 flex gap-0.5" style={{ animation: "sweat 1s ease-in both" }}>
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
        : "";

  return (
    <div ref={ref} className={`relative mx-auto flex h-24 w-full max-w-[10rem] items-end justify-center ${className}`}>
      <EffectLayer level={level} kind={reaction} nonce={nonce} />
      {/* idle は hover-bob でふわふわ、reaction 時はその動き */}
      <div
        key={`${reaction}-${nonce}`}
        className={anim}
        style={reaction === "idle" ? { animation: "hover-bob 3.4s ease-in-out infinite" } : undefined}
      >
        {level === "beginner" && <BrowserChar offset={offset} reaction={reaction} />}
        {level === "intermediate" && <CatChar offset={offset} reaction={reaction} />}
        {level === "advanced" && <RobotChar offset={offset} reaction={reaction} />}
      </div>
    </div>
  );
}
