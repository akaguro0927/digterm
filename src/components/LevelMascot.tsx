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

// ネコ耳（大きめ・とがった三角。外＝クリーム／内＝ピンク）
function CatEar({ side, droop }: { side: "l" | "r"; droop: boolean }) {
  const base = side === "l" ? -14 : 14;
  const rot = droop ? (side === "l" ? 40 : -40) : base;
  return (
    <svg
      viewBox="0 0 30 34"
      className="h-10 w-9 transition-transform duration-300"
      style={{ transform: `rotate(${rot}deg)`, transformOrigin: "bottom center" }}
      aria-hidden
    >
      {/* 外耳：とがった三角（先だけ少し丸め） */}
      <path
        d="M15 2 Q17 2 18 6 L28 28 Q29 31 26 31 L4 31 Q1 31 2 28 L12 6 Q13 2 15 2 Z"
        fill="#f4d3ac"
        stroke="#e9bd8c"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* 内耳：ピンク */}
      <path d="M15 10 L22 27 Q22.5 29 20 29 L10 29 Q7.5 29 8 27 Z" fill="#fbcfe8" />
    </svg>
  );
}

// ── 中級：ネコ（一新・まるっと柔らかい版）。尻尾ゆらゆら、まちがえると耳がへたる ──
function CatChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const earDroop = reaction === "wrong";
  const tailUp = reaction === "correct";
  return (
    <div className="relative">
      {/* 尻尾（ゆらゆら／正解でピンと上がる） */}
      <svg
        viewBox="0 0 24 46"
        className="absolute -right-4 bottom-0 z-0 h-14 w-8 text-[#f4d3ac]"
        style={{
          transformOrigin: "left bottom",
          animation: tailUp ? "tail-wag 0.5s ease-in-out 2" : "tail-wag 1.8s ease-in-out infinite",
        }}
        aria-hidden
      >
        <path d="M6 44 C4 26, 21 26, 16 6" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* 尻尾の先の縞 */}
        <path d="M16 6 C18 9 18 12 16 14" stroke="#e9bd8c" strokeWidth="8" fill="none" strokeLinecap="round" />
      </svg>
      {/* 耳（大きめ・内側ピンク） */}
      <span className="absolute -top-6 left-0 z-10">
        <CatEar side="l" droop={earDroop} />
      </span>
      <span className="absolute -top-6 right-0 z-10">
        <CatEar side="r" droop={earDroop} />
      </span>
      {/* 顔（やわらかい丸） */}
      <div className="relative z-[1] flex h-[5rem] w-[5.4rem] flex-col items-center justify-center rounded-[50%] border-[2.5px] border-[#f0cfa4] bg-[#fff7ee] shadow-[0_6px_0_#f6dcb9]">
        {/* おでこの毛のふさ（キャラ付け） */}
        <span className="absolute -top-0.5 left-1/2 flex -translate-x-1/2 gap-px" aria-hidden>
          <span className="h-2 w-1 rounded-full bg-[#f4d3ac]" />
          <span className="h-2.5 w-1 rounded-full bg-[#f4d3ac]" />
          <span className="h-2 w-1 rounded-full bg-[#f4d3ac]" />
        </span>
        <Eyes offset={offset} reaction={reaction} size="h-5 w-5" pupil="h-3 w-3" gap="gap-2.5" />
        {/* ほっぺ（ぽわっと） */}
        <span className="absolute left-2 top-[55%] h-2.5 w-3 rounded-full bg-rose-200/80" />
        <span className="absolute right-2 top-[55%] h-2.5 w-3 rounded-full bg-rose-200/80" />
        {/* 鼻（小さな逆三角）＋ネコ口(ω) */}
        <svg viewBox="0 0 20 14" className="mt-1 h-3 w-5 text-[#e5a86a]" fill="none" aria-hidden>
          <path d="M7 1 H13 L10 5 Z" fill="#f472b6" />
          {reaction === "idle" && (
            <path d="M10 5 Q10 9 6 9 M10 5 Q10 9 14 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
        {reaction !== "idle" && <Mouth reaction={reaction} color="text-[#e5a86a]" />}
        {/* ヒゲ（片側3本ずつ・外向き・濃いめ） */}
        <span className="absolute -left-2 top-[54%] h-0.5 w-5 -rotate-6 rounded-full bg-[#cf9b5f]" />
        <span className="absolute -left-2 top-[61%] h-0.5 w-5 rounded-full bg-[#cf9b5f]" />
        <span className="absolute -left-2 top-[68%] h-0.5 w-5 rotate-6 rounded-full bg-[#cf9b5f]" />
        <span className="absolute -right-2 top-[54%] h-0.5 w-5 rotate-6 rounded-full bg-[#cf9b5f]" />
        <span className="absolute -right-2 top-[61%] h-0.5 w-5 rounded-full bg-[#cf9b5f]" />
        <span className="absolute -right-2 top-[68%] h-0.5 w-5 -rotate-6 rounded-full bg-[#cf9b5f]" />
      </div>
    </div>
  );
}

// モンスターのツノ（角丸コーン・先が光る）
function MonsterHorn({ side }: { side: "l" | "r" }) {
  return (
    <svg
      viewBox="0 0 18 22"
      className="h-6 w-5"
      style={{ transform: side === "l" ? "rotate(-16deg)" : "rotate(16deg)" }}
      aria-hidden
    >
      <path d="M9 1 C11 6 13 12 13 19 Q13 21 9 21 Q5 21 5 19 C5 12 7 6 9 1 Z" fill="#fcd34d" />
      <path d="M9 1 C10 6 10 10 9 14 C8 10 8 6 9 1 Z" fill="#fbbf24" opacity="0.7" />
      {/* 先の光 */}
      <circle cx="9" cy="2.5" r="1.6" fill="#fef3c7" style={{ animation: "antenna-blip 1.4s ease-in-out infinite" }} />
    </svg>
  );
}

// ── 上級：かわいいモンスター（紫・毛むくじゃら）。ツノが光り、腕がゆれる／キバつき ──
const FUR_COUNT = 15;
function MonsterChar({ offset, reaction }: { offset: { x: number; y: number }; reaction: Reaction }) {
  const body =
    reaction === "correct"
      ? "from-violet-400 to-fuchsia-500"
      : reaction === "wrong"
        ? "from-violet-500 to-violet-700"
        : "from-violet-400 to-violet-600";
  const fur = reaction === "correct" ? "bg-fuchsia-500" : reaction === "wrong" ? "bg-violet-700" : "bg-violet-500";
  return (
    <div className="relative h-[5.5rem] w-[6rem]">
      {/* 毛のふさふさ（体の周りのファー） */}
      <div className="absolute left-1/2 top-[46%] z-0 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: FUR_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`absolute h-4 w-4 rounded-full transition-colors ${fur}`}
            style={{ left: "-8px", top: "-8px", transform: `rotate(${i * (360 / FUR_COUNT)}deg) translateY(-2.15rem)` }}
          />
        ))}
      </div>

      {/* ツノ（左右） */}
      <span className="absolute -top-3 left-3.5 z-20">
        <MonsterHorn side="l" />
      </span>
      <span className="absolute -top-3 right-3.5 z-20">
        <MonsterHorn side="r" />
      </span>

      {/* 腕（左右・ぷらぷら） */}
      <span
        className={`absolute left-0 top-[48%] z-0 h-4 w-6 -translate-y-1/2 rounded-full ${fur}`}
        style={{ transformOrigin: "right center", animation: "tail-wag 2.2s ease-in-out infinite" }}
      />
      <span
        className={`absolute right-0 top-[48%] z-0 h-4 w-6 -translate-y-1/2 rounded-full ${fur}`}
        style={{ transformOrigin: "left center", animation: "tail-wag 2.2s ease-in-out 0.3s infinite" }}
      />

      {/* 体 */}
      <div
        className={`absolute left-1/2 top-[46%] z-[1] flex h-[5rem] w-[5.2rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[46%] bg-gradient-to-b ring-2 ring-violet-300/60 transition-colors ${body}`}
      >
        {/* おなかの明るい面 */}
        <span className="absolute bottom-1 left-1/2 h-7 w-10 -translate-x-1/2 rounded-[50%] bg-white/25" />
        {/* 大きな目 */}
        <Eyes offset={offset} reaction={reaction} size="h-6 w-6" pupil="h-3.5 w-3.5" gap="gap-2" />
        {/* ほっぺ */}
        <span className="absolute left-1.5 top-[58%] h-2.5 w-3.5 rounded-full bg-fuchsia-300/60" />
        <span className="absolute right-1.5 top-[58%] h-2.5 w-3.5 rounded-full bg-fuchsia-300/60" />
        {/* 口＋キバ */}
        <div className="relative z-[1] mt-1.5">
          <Mouth reaction={reaction} color="text-white" />
          {reaction !== "correct" && (
            <>
              <span className="absolute -top-0.5 left-1 h-0 w-0 border-l-[3px] border-r-[3px] border-t-[5px] border-l-transparent border-r-transparent border-t-white" />
              <span className="absolute -top-0.5 right-1 h-0 w-0 border-l-[3px] border-r-[3px] border-t-[5px] border-l-transparent border-r-transparent border-t-white" />
            </>
          )}
        </div>
      </div>

      {/* 足（下・ちょこん） */}
      <span className={`absolute bottom-0 left-[32%] z-[1] h-3 w-5 rounded-[50%] ${fur}`} />
      <span className={`absolute bottom-0 right-[32%] z-[1] h-3 w-5 rounded-[50%] ${fur}`} />
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
          {level === "intermediate" && <CatChar offset={offset} reaction={reaction} />}
          {level === "advanced" && <MonsterChar offset={offset} reaction={reaction} />}
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
