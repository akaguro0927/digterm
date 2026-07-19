"use client";

import Link from "next/link";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { Icon } from "@/components/icons";

// Rive 動作確認用のデモ（サンプルの.rivを再生）。本番キャラの前に「滑らかに動く／状態を切り替えられる」を体感するためのページ。
const STATE_MACHINE = "drive";

export default function RiveDemoPage() {
  const { rive, RiveComponent } = useRive({
    src: "/rive/off_road_car.riv",
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });
  // ステートマシンの入力（真偽値）を切り替えると、動きがなめらかに遷移する＝正解/不正解の切替もこれで作る
  const drive = useStateMachineInput(rive, STATE_MACHINE, "drive");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">RIVE DEMO</p>
      <h1 className="font-display mt-1 text-3xl font-extrabold">なめらかキャラの実験</h1>
      <p className="mt-2 text-sm text-slate-500">
        これは Duolingo と同じ仕組み（Rive）のサンプル。ブラウザの中だけで再生され、サーバー・AIは使いません。
        本番はここに「セラミックのマスコット」を差し替えます。
      </p>

      <div className="card-pop mt-6 flex flex-col items-center p-6">
        <div className="h-64 w-full max-w-md">
          <RiveComponent className="h-full w-full" />
        </div>
        <button
          type="button"
          onClick={() => {
            if (drive) drive.value = !drive.value;
          }}
          className="btn-3d font-display mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          <Icon name="zap" className="h-4 w-4" />
          状態を切り替える（走る / とまる）
        </button>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
          ボタンで状態を切り替えると、パラパラではなく“ぬるっと”遷移します。
          <br />
          クイズでは、これを「正解 / 不正解 / ふつう」の切替に使います。
        </p>
      </div>
    </div>
  );
}
