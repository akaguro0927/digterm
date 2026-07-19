"use client";

import { useState } from "react";
import Link from "next/link";
import LevelMascot, { type MascotLevel, type Reaction } from "@/components/LevelMascot";
import { MascotFace, type FaceExpression } from "@/components/MascotTeacher";
import MiniMascot from "@/components/MiniMascot";
import Confetti from "@/components/Confetti";
import { Icon } from "@/components/icons";

const LEVELS: [MascotLevel, string][] = [
  ["beginner", "初級：ブラウザ窓キャラ"],
  ["intermediate", "中級：ネコ"],
  ["advanced", "上級：紫のモンスター"],
];

// キャラ1体ぶんの操作パネル（ボタンで反応を再生）
function MascotDemo({ level, label }: { level: MascotLevel; label: string }) {
  const [reaction, setReaction] = useState<Reaction>("idle");
  const [combo, setCombo] = useState(0);
  const [brokeCombo, setBrokeCombo] = useState(0);
  const [nonce, setNonce] = useState(0);

  const fire = (r: Reaction, c = 0, broke = 0) => {
    setReaction(r);
    setCombo(c);
    setBrokeCombo(broke);
    setNonce((n) => n + 1);
  };

  const btn = "rounded-full px-3 py-1.5 text-xs font-bold ring-1 transition";
  return (
    <div className="card-pop flex flex-col items-center gap-3 p-5">
      <span className="font-display text-sm font-extrabold text-slate-700">{label}</span>
      <div className="flex h-28 items-end">
        <LevelMascot key={nonce} level={level} reaction={reaction} combo={combo} brokeCombo={brokeCombo} nonce={nonce} />
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        <button onClick={() => fire("idle")} className={`${btn} bg-white text-slate-600 ring-slate-200 hover:ring-slate-300`}>ふつう</button>
        <button onClick={() => fire("correct", 1)} className={`${btn} bg-brand-50 text-brand-700 ring-brand-100 hover:ring-brand-300`}>正解</button>
        <button onClick={() => fire("correct", 3)} className={`${btn} bg-brand-50 text-brand-700 ring-brand-100 hover:ring-brand-300`}>正解 コンボ3</button>
        <button onClick={() => fire("correct", 5)} className={`${btn} bg-brand-500 text-white ring-brand-500`}>正解 コンボ5</button>
        <button onClick={() => fire("wrong")} className={`${btn} bg-rose-50 text-rose-600 ring-rose-100 hover:ring-rose-300`}>不正解</button>
        <button onClick={() => fire("wrong", 0, 4)} className={`${btn} bg-rose-100 text-rose-700 ring-rose-200`}>不正解 コンボ途切れ</button>
      </div>
    </div>
  );
}

// レッスン本文キャラの表情
function FaceDemo() {
  const [expr, setExpr] = useState<FaceExpression>("idle");
  const [nonce, setNonce] = useState(0);
  const set = (e: FaceExpression) => {
    setExpr(e);
    setNonce((n) => n + 1);
  };
  const items: [FaceExpression, string][] = [
    ["idle", "ふつう"],
    ["talk", "話す"],
    ["think", "考える"],
    ["happy", "にっこり"],
  ];
  const btn = "rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-slate-200 transition hover:ring-brand-300";
  return (
    <div className="card-pop flex flex-col items-center gap-3 p-5">
      <div className="flex h-28 items-center">
        <MascotFace key={nonce} expression={expr} nonce={nonce} />
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {items.map(([e, l]) => (
          <button key={e} onClick={() => set(e)} className={`${btn} ${expr === e ? "bg-brand-50 text-brand-700" : "bg-white text-slate-600"}`}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

// 生CSSアニメを単体で再生（動きの確認・カタログ）
const ANIMS = ["hop", "shake", "tail-wag", "antenna-blip", "gesture-tilt", "gesture-stretch", "nod", "celebrate-hop", "wiggle", "bob", "float", "point-bounce"];
function AnimDemo() {
  const [nonce, setNonce] = useState(0);
  return (
    <div className="card-pop p-5">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-extrabold text-slate-700">生アニメ カタログ</span>
        <button
          onClick={() => setNonce((n) => n + 1)}
          className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-bold text-white"
        >
          再生
        </button>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {ANIMS.map((a) => (
          <div key={a} className="flex flex-col items-center gap-1.5">
            <span
              key={`${a}-${nonce}`}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600"
              style={{ animation: `${a} 1s ease-in-out ${a.includes("wag") || a === "float" || a === "bob" || a === "antenna-blip" ? "infinite" : "2"}` }}
            >
              <Icon name="zap" className="h-4 w-4" />
            </span>
            <span className="text-[10px] text-slate-400">{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ログイン成功時の紙吹雪
function ConfettiDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="card-pop relative flex min-h-40 flex-col items-center justify-center overflow-hidden p-5">
      {on && <Confetti count={40} key={String(on)} />}
      <button
        onClick={() => {
          setOn(false);
          setTimeout(() => setOn(true), 20);
          setTimeout(() => setOn(false), 2200);
        }}
        className="btn-3d font-display z-10 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-white"
        style={{ ["--edge" as string]: "#12a854" }}
      >
        紙吹雪を再生（登録/ログイン成功時）
      </button>
    </div>
  );
}

// キャラ・エフェクトの開発確認ページ。ボタンで各動き/演出を再生できる。
export default function MascotPreviewPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">DEV / MASCOT</p>
      <h1 className="font-display mt-1 text-3xl font-extrabold">キャラ・エフェクト確認</h1>
      <p className="mt-2 text-sm text-slate-500">
        <strong className="text-slate-700">キャラやエフェクトの変更は、まずこのページで確認します。</strong>
        ボタンを押すと、それぞれの反応・演出が再生されます。気になる箇所を教えてもらえれば、ここを基準に微調整します。
      </p>
      <p className="mt-2 inline-flex flex-wrap gap-x-3 gap-y-1 rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500 ring-1 ring-slate-200">
        <span>初級＝ブラウザ窓キャラ</span>
        <span>中級＝ネコ</span>
        <span>上級＝紫のモンスター</span>
      </p>

      <h2 className="font-display mt-8 text-lg font-extrabold text-slate-800">レベル別キャラ（クイズ/テスト）</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {LEVELS.map(([lv, label]) => (
          <MascotDemo key={lv} level={lv} label={label} />
        ))}
      </div>

      <h2 className="font-display mt-8 text-lg font-extrabold text-slate-800">レッスン本文のキャラ（表情）</h2>
      <div className="mt-3">
        <FaceDemo />
      </div>

      <h2 className="font-display mt-8 text-lg font-extrabold text-slate-800">図鑑カードのミニキャラ</h2>
      <div className="card-pop mt-3 flex items-center justify-center gap-6 p-8">
        <MiniMascot />
        <MiniMascot />
        <MiniMascot />
      </div>

      <h2 className="font-display mt-8 text-lg font-extrabold text-slate-800">成功時の紙吹雪</h2>
      <div className="mt-3">
        <ConfettiDemo />
      </div>

      <h2 className="font-display mt-8 text-lg font-extrabold text-slate-800">生アニメーション</h2>
      <div className="mt-3">
        <AnimDemo />
      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500 ring-1 ring-slate-200">
        なめらか3D風（Rive）の実験は{" "}
        <Link href="/rive-demo" className="font-bold text-brand-600 hover:underline">
          /rive-demo
        </Link>{" "}
        にあります。
      </div>
    </div>
  );
}
