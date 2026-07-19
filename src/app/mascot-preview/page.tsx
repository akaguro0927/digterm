"use client";

import { useState } from "react";
import Link from "next/link";
import LevelMascot, { type MascotLevel, type Reaction } from "@/components/LevelMascot";
import { MascotFace, type FaceExpression } from "@/components/MascotTeacher";
import MiniMascot from "@/components/MiniMascot";
import { Icon } from "@/components/icons";

const LEVELS: [MascotLevel, string][] = [
  ["beginner", "初級：ブラウザ窓キャラ"],
  ["intermediate", "中級：ネコ"],
  ["advanced", "上級：ロボット"],
];
const REACTIONS: [Reaction, string][] = [
  ["idle", "ふつう（待機）"],
  ["correct", "正解（コンボ5）"],
  ["wrong", "不正解"],
];
const FACES: [FaceExpression, string][] = [
  ["idle", "ふつう"],
  ["talk", "話す"],
  ["think", "考える"],
  ["happy", "にっこり"],
];

// キャラ確認用（開発向け）。全キャラ×全リアクションを一覧して、微調整の指示を出しやすくする。
export default function MascotPreviewPage() {
  const [n, setN] = useState(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-xs font-bold tracking-widest text-brand-500">MASCOT PREVIEW</p>
          <h1 className="font-display mt-1 text-3xl font-extrabold">キャラ確認</h1>
        </div>
        <button
          onClick={() => setN((v) => v + 1)}
          className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          <Icon name="zap" className="h-4 w-4" />
          アニメをもう一度再生
        </button>
      </div>

      {LEVELS.map(([lv, label]) => (
        <section key={lv} className="mt-8">
          <h2 className="font-display text-lg font-extrabold text-slate-800">{label}</h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REACTIONS.map(([r, rl]) => (
              <div key={r} className="card-pop flex flex-col items-center gap-2 p-5">
                <LevelMascot key={`${lv}-${r}-${n}`} level={lv} reaction={r} nonce={n} combo={r === "correct" ? 5 : 0} />
                <span className="text-xs font-bold text-slate-500">{rl}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-10">
        <h2 className="font-display text-lg font-extrabold text-slate-800">レッスン本文のキャラ（表情）</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {FACES.map(([e, el]) => (
            <div key={e} className="card-pop flex flex-col items-center gap-2 p-5">
              <MascotFace key={`${e}-${n}`} expression={e} nonce={n} />
              <span className="text-xs font-bold text-slate-500">{el}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-lg font-extrabold text-slate-800">図鑑カードのミニキャラ</h2>
        <div className="card-pop mt-3 flex items-center justify-center gap-6 p-8">
          <MiniMascot />
          <MiniMascot />
          <MiniMascot />
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-400">
        気になる箇所（大きさ・目・耳・色など）を教えてください。ここを見ながら精密に直します。
      </p>
    </div>
  );
}
