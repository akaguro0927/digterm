"use client";

import { useEffect, useState } from "react";
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
        <div className="relative flex h-[calc(100%-20px)] flex-col items-center justify-center">
          <Eyes offset={offset} reaction={reaction} />
          {/* ほっぺ */}
          <span className="absolute left-3 top-[56%] h-2 w-2 rounded-full bg-brand-200/70" />
          <span className="absolute right-3 top-[56%] h-2 w-2 rounded-full bg-brand-200/70" />
          <div className="mt-1">
            <Mouth reaction={reaction} color="text-brand-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 中級：かわいいロボット（図形キャラ）。アンテナ光＋ボルト耳＋胴体・腕・足 ──
function RobotChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const light = reaction === "correct" ? "bg-emerald-400" : reaction === "wrong" ? "bg-rose-400" : "bg-amber-400";
  const armAnim =
    reaction === "correct" ? "tail-wag 0.4s ease-in-out 3" : reaction === "wrong" ? "shake 0.5s ease-in-out" : "tail-wag 2.2s ease-in-out infinite";
  return (
    <div className="relative flex flex-col items-center">
      {/* 頭 */}
      <div className="relative z-[2] flex h-[3.1rem] w-[3.7rem] items-center justify-center rounded-2xl bg-gradient-to-b from-slate-100 to-slate-300 ring-2 ring-slate-300 shadow-[0_4px_0_#cbd5e1]">
        {/* アンテナ */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="mx-auto block h-3.5 w-0.5 bg-slate-400" />
          <span className={`absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full ${light} transition-colors`} style={{ animation: "antenna-blip 1.2s ease-in-out infinite" }} />
        </div>
        {/* ボルト耳 */}
        <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-slate-200 ring-2 ring-slate-400/70" />
        <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-slate-200 ring-2 ring-slate-400/70" />
        {/* 画面フェイス */}
        <div className="flex flex-col items-center justify-center rounded-lg bg-white/85 px-2 py-1 ring-1 ring-slate-200">
          <Eyes offset={offset} reaction={reaction} size="h-3.5 w-3.5" pupil="h-2 w-2" gap="gap-2" />
          <div className="mt-0.5">
            <Mouth reaction={reaction} color="text-slate-500" />
          </div>
        </div>
      </div>
      {/* 胴体（胸の光＋腕） */}
      <div className="relative z-[1] -mt-1 flex h-5 w-9 items-center justify-center rounded-lg bg-gradient-to-b from-slate-200 to-slate-300 ring-2 ring-slate-300 shadow-[0_3px_0_#cbd5e1]">
        <span className={`h-2 w-2 rounded-full ${light} transition-colors`} />
        <span
          className="absolute -left-2.5 top-1 h-1.5 w-3.5 rounded-full bg-slate-300"
          style={{ transformOrigin: "right center", animation: armAnim }}
        />
        <span
          className="absolute -right-2.5 top-1 h-1.5 w-3.5 rounded-full bg-slate-300"
          style={{ transformOrigin: "left center", animation: armAnim }}
        />
      </div>
      {/* 足 */}
      <div className="z-0 -mt-0.5 flex gap-2">
        <span className="h-1.5 w-3 rounded-b-md bg-slate-400" />
        <span className="h-1.5 w-3 rounded-b-md bg-slate-400" />
      </div>
    </div>
  );
}

// 鳥のつばさ（角丸のしずく）。正解で上げ・不正解で下げ・待機でパタパタ
function BirdWing({ side, reaction }: { side: "l" | "r"; reaction: Reaction }) {
  const up = reaction === "correct";
  const down = reaction === "wrong";
  const rot = up ? (side === "l" ? -40 : 40) : down ? (side === "l" ? 24 : -24) : 0;
  return (
    <span
      className="absolute top-[42%] z-0 h-7 w-4 -translate-y-1/2 rounded-[60%] bg-sky-500 transition-transform duration-300"
      style={{
        [side === "l" ? "left" : "right"]: "-0.35rem",
        transformOrigin: side === "l" ? "right center" : "left center",
        transform: `rotate(${rot}deg)`,
        animation: reaction === "idle" ? `tail-wag 1.4s ease-in-out ${side === "r" ? "0.2s" : "0s"} infinite` : undefined,
      }}
      aria-hidden
    />
  );
}

// ── 上級：図形の鳥（かわいい小鳥）。つばさがパタパタ／正解でくちばしが開く ──
function BirdChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  return (
    <div className="relative h-[5.5rem] w-[5.5rem]">
      {/* あたまの冠羽（3枚） */}
      <span className="absolute -top-2.5 left-1/2 z-0 flex -translate-x-1/2 items-end gap-0.5" aria-hidden>
        <span className="h-3 w-1.5 -rotate-[18deg] rounded-full bg-orange-400" />
        <span className="h-4 w-1.5 rounded-full bg-orange-400" />
        <span className="h-3 w-1.5 rotate-[18deg] rounded-full bg-orange-400" />
      </span>

      {/* つばさ */}
      <BirdWing side="l" reaction={reaction} />
      <BirdWing side="r" reaction={reaction} />

      {/* あし */}
      <span className="absolute bottom-0 left-[38%] z-0 h-2.5 w-1 rounded-full bg-orange-400" />
      <span className="absolute bottom-0 right-[38%] z-0 h-2.5 w-1 rounded-full bg-orange-400" />

      {/* 体（まるい） */}
      <div className="absolute left-1/2 top-[45%] z-[1] flex h-[4.6rem] w-[4.6rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[50%] bg-sky-400 ring-2 ring-sky-300 shadow-[0_5px_0_#0284c7]">
        {/* おなかの明るい面 */}
        <span className="absolute bottom-1 left-1/2 h-7 w-9 -translate-x-1/2 rounded-[50%] bg-white/45" />
        {/* 目 */}
        <Eyes offset={offset} reaction={reaction} size="h-5 w-5" pupil="h-3 w-3" gap="gap-2" />
        {/* くちばし（正解でパカッと開く） */}
        <svg viewBox="0 0 16 14" className="mt-1 h-3 w-4 text-orange-400" aria-hidden>
          {reaction === "correct" ? (
            <path d="M2 1 H14 L8 13 Z" fill="currentColor" />
          ) : (
            <path d="M2 2 H14 L8 9 Z" fill="currentColor" />
          )}
        </svg>
        {/* ほっぺ */}
        <span className="absolute left-1.5 top-[56%] h-2 w-3 rounded-full bg-rose-300/60" />
        <span className="absolute right-1.5 top-[56%] h-2 w-3 rounded-full bg-rose-300/60" />
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

const SHARD_DIRS = [
  { sx: "-22px", sr: "-120deg" },
  { sx: "-10px", sr: "80deg" },
  { sx: "0px", sr: "160deg" },
  { sx: "12px", sr: "-70deg" },
  { sx: "22px", sr: "120deg" },
];

function EffectLayer({
  level,
  kind,
  nonce,
  combo = 0,
  brokeCombo = 0,
}: {
  level: MascotLevel;
  kind: Reaction;
  nonce: number;
  combo?: number;
  brokeCombo?: number;
}) {
  if (kind === "correct") {
    const fx = CORRECT_FX[level];
    const isCombo = combo >= 3; // 3連続以上で特別演出
    const isBig = combo >= 5;
    // コンボが伸びるほどキラキラを増やす（言葉は使わずエフェクトだけで盛り上げる）
    const extra = isBig ? SPARK_POS.length : isCombo ? 3 : 0;
    const positions = [...SPARK_POS, ...SPARK_POS.slice(0, extra).map((p) => p + " scale-125")];
    return (
      <div key={`c-${nonce}`} className="pointer-events-none absolute inset-0 z-20" aria-hidden>
        {/* コンボ時：広がる光の輪 */}
        {isCombo && (
          <span
            className={`absolute inset-0 m-auto h-16 w-16 rounded-full border-4 ${isBig ? "border-amber-400" : `border-current ${fx.color}`}`}
            style={{ animation: "ring-burst 0.7s ease-out both" }}
          />
        )}
        {isBig && (
          <span
            className="absolute inset-0 m-auto h-16 w-16 rounded-full border-4 border-brand-400"
            style={{ animation: "ring-burst 0.7s ease-out 0.15s both" }}
          />
        )}
        {positions.map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} ${fx.color}`}
            style={{ animation: `spark ${isCombo ? 1.1 : 0.9}s ease-out ${i * 0.07}s both` }}
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
        {/* コンボが途切れた瞬間：かけらが飛び散る */}
        {brokeCombo >= 3 &&
          SHARD_DIRS.map((d, i) => (
            <span
              key={`s${i}`}
              className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-[1px] ${CORRECT_FX[level].color.replace("text-", "bg-")}`}
              style={{ ["--sx" as string]: d.sx, ["--sr" as string]: d.sr, animation: `shard 0.7s ease-in ${i * 0.03}s both` }}
            />
          ))}
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
  combo = 0,
  brokeCombo = 0,
  className = "",
}: {
  level: MascotLevel;
  reaction: Reaction;
  nonce?: number;
  combo?: number;
  brokeCombo?: number;
  className?: string;
}) {
  const { ref, offset } = useEyeTracking(2);

  // アイドル中、ときどき「首かしげ」か「のび」のしぐさをする
  const [gesture, setGesture] = useState<"none" | "tilt" | "stretch">("none");
  useEffect(() => {
    if (reaction !== "idle") {
      setGesture("none");
      return;
    }
    let live = true;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        if (!live) return;
        if (!document.hidden) {
          setGesture(Math.random() < 0.5 ? "tilt" : "stretch");
          setTimeout(() => live && setGesture("none"), 800);
        }
        loop();
      }, 3500 + Math.random() * 3500);
    };
    loop();
    return () => {
      live = false;
      clearTimeout(t);
    };
  }, [reaction]);

  const anim =
    reaction === "correct"
      ? "animate-[hop_0.7s_ease-in-out]"
      : reaction === "wrong"
        ? "animate-[shake_0.5s_ease-in-out]"
        : "";

  const gestureStyle =
    reaction === "idle" && gesture !== "none"
      ? { animation: `gesture-${gesture} 0.8s ease-in-out`, transformOrigin: "bottom center" as const }
      : undefined;

  return (
    <div ref={ref} className={`relative mx-auto flex h-24 w-full max-w-[10rem] items-end justify-center ${className}`}>
      <EffectLayer level={level} kind={reaction} nonce={nonce} combo={combo} brokeCombo={brokeCombo} />
      {/* 外=アイドルのふわふわ／反応の動き、内=ときどきのしぐさ */}
      <div
        key={`${reaction}-${nonce}`}
        className={anim}
        style={reaction === "idle" ? { animation: "hover-bob 3.4s ease-in-out infinite" } : undefined}
      >
        <div style={gestureStyle}>
          {level === "beginner" && <BrowserChar offset={offset} reaction={reaction} />}
          {level === "intermediate" && <RobotChar offset={offset} reaction={reaction} />}
          {level === "advanced" && <BirdChar offset={offset} reaction={reaction} />}
        </div>
      </div>

      {/* 問題を読むときの指さし（新しい問題が出たら下の問題文をぴっと指す） */}
      {reaction === "idle" && (
        <span
          key={`point-${nonce}`}
          className="pointer-events-none absolute -bottom-1 left-1/2 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#ebe4d5] bg-white text-brand-600 shadow-sm"
          style={{ animation: "point-bounce 0.6s ease-in-out 2" }}
          aria-hidden
        >
          <Icon name="pointer" className="h-3.5 w-3.5 rotate-90" strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
}
