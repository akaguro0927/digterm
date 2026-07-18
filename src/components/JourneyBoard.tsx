"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { useClearedNodes } from "@/lib/userStore";
import {
  flatNodes,
  totalNodes,
  isUnlocked,
  nextNodeId,
  type FlatNode,
} from "@/data/journey";

// 幅は「置かれたコンテナの実寸」に合わせる（＝画面いっぱいに広がる道）。
const TOP = 30; // 上の余白
const STEP = 72; // マスの縦間隔（詰めてスクロール減）
const CH_GAP = 16; // 章のあいだの追加すき間
const BANNER = 44; // 章バナーぶんの高さ
const GOAL_GAP = 78; // 最後のマス→ゴールの間
const LABEL_HALF = 72; // ラベル半幅（端でのはみ出し防止）

interface Placed {
  fn: FlatNode;
  x: number;
  y: number;
}
interface Banner {
  chapter: FlatNode["chapter"];
  y: number;
}
interface Layout {
  placed: Placed[];
  banners: Banner[];
  goalY: number;
  height: number;
  center: number;
}

// 幅 w に合わせて、左右いっぱいに蛇行する座標を組み立てる
function buildLayout(w: number): Layout {
  const center = w / 2;
  // 端に大きく寄せつつ、ノードの丸(±32)＋ラベル(±LABEL_HALF)が必ず内側に収まるよう制限
  const amp = Math.max(40, Math.min(w * 0.26, w / 2 - LABEL_HALF - 8));
  const placed: Placed[] = [];
  const banners: Banner[] = [];
  let y = TOP;
  let gi = 0;
  let lastCh: string | null = null;

  for (const fn of flatNodes) {
    if (fn.chapter.id !== lastCh) {
      if (lastCh !== null) y += CH_GAP;
      banners.push({ chapter: fn.chapter, y });
      y += BANNER;
      lastCh = fn.chapter.id;
    }
    // なめらかな正弦で大きく左右に振る＝広い川のように蛇行
    const x = center + Math.sin(gi * 0.85) * amp;
    placed.push({ fn, x, y });
    y += STEP;
    gi += 1;
  }
  const goalY = y - STEP + GOAL_GAP;
  const height = goalY + 104;
  return { placed, banners, goalY, height, center };
}

// 点列を通るなめらかな道（Catmull-Rom → ベジェ）
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function JourneyBoard() {
  const cleared = useClearedNodes();
  const clearedSet = new Set(cleared);
  const doneCount = flatNodes.filter((f) => clearedSet.has(f.node.id)).length;
  const pct = totalNodes > 0 ? Math.round((doneCount / totalNodes) * 100) : 0;
  const nextId = nextNodeId(cleared);
  const allDone = nextId === null;

  // コンテナの実寸を測って全幅に対応
  const boardRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const update = () => setW(el.getBoundingClientRect().width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layout = w > 0 ? buildLayout(w) : null;

  return (
    <div className="relative">
      {/* 進捗ヘッダー */}
      <div className="card-pop mx-auto max-w-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-brand-500">しんちょく</p>
            <p className="font-display mt-0.5 text-3xl font-extrabold text-slate-800">
              {pct}
              <span className="text-lg text-slate-400">%</span>
            </p>
          </div>
          <p className="font-display text-sm font-extrabold text-slate-600">
            {doneCount} <span className="text-slate-300">/ {totalNodes} マス</span>
          </p>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* 道のり本体（幅いっぱい） */}
      <div ref={boardRef} className="relative mt-6 w-full" style={{ height: layout?.height ?? 420 }}>
        {layout && (
          <>
            {/* 線（SVG） */}
            <svg
              className="pointer-events-none absolute inset-0 z-0"
              width={w}
              height={layout.height}
              viewBox={`0 0 ${w} ${layout.height}`}
              fill="none"
              aria-hidden
            >
              {(() => {
                const roadD = smoothPath([...layout.placed.map((p) => ({ x: p.x, y: p.y })), { x: layout.center, y: layout.goalY }]);
                return (
                  <>
                    {/* 細い線（道はやめてシンプルに） */}
                    <path d={roadD} stroke="#e2ddce" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
                    {/* 進んだぶんだけ緑に */}
                    <path
                      d={roadD}
                      stroke="#1fc866"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength={100}
                      strokeDasharray={100}
                      strokeDashoffset={100 - pct}
                      style={{ transition: "stroke-dashoffset 0.8s ease" }}
                    />
                  </>
                );
              })()}
            </svg>

            {/* 章のバナー */}
            {layout.banners.map((b, ci) => (
              <div
                key={b.chapter.id}
                className="animate-pop-in absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-2xl border-2 border-[#e7ddc8] bg-[#fdfbf5] px-3.5 py-1.5 shadow-[0_3px_0_#e7ddc8]"
                style={{ top: b.y, animationDelay: `${ci * 80}ms` }}
              >
                <span className={`font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${b.chapter.chip}`}>
                  {ci + 1}
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-[13px] font-extrabold leading-tight text-slate-800">{b.chapter.title}</span>
                  <span className="block text-[10px] leading-tight text-slate-400">{b.chapter.subtitle}</span>
                </span>
              </div>
            ))}

            {/* マス */}
            {layout.placed.map(({ fn, x, y }, i) => {
              const node = fn.node;
              const done = clearedSet.has(node.id);
              const unlocked = isUnlocked(node.id, cleared);
              const isNext = node.id === nextId;
              const isTest = node.type === "test";

              const circle = (
                <span
                  className={`flex h-16 w-16 items-center justify-center transition-transform duration-200 ${
                    isTest ? "rounded-2xl" : "rounded-full"
                  } ${
                    done
                      ? "bg-brand-500 text-white shadow-[0_5px_0_#12a854]"
                      : !unlocked
                        ? "bg-white text-slate-300 ring-2 ring-[#e7ddc8] shadow-[0_4px_0_#e7ddc8]"
                        : isNext
                          ? "animate-pulse bg-white text-brand-600 ring-4 ring-brand-400 shadow-[0_5px_0_#e7ddc8]"
                          : isTest
                            ? "bg-amber-400 text-white shadow-[0_5px_0_#d97706]"
                            : "bg-white text-brand-600 ring-2 ring-[#e7ddc8] shadow-[0_4px_0_#e7ddc8]"
                  } ${unlocked ? "group-hover:-translate-y-1 group-active:translate-y-0.5" : ""}`}
                >
                  {done ? (
                    <Icon name="check" className="h-7 w-7" strokeWidth={3} />
                  ) : !unlocked ? (
                    <Icon name="lock" className="h-6 w-6" />
                  ) : (
                    <Icon name={node.icon} className="h-7 w-7" />
                  )}
                </span>
              );

              const inner = (
                <div
                  className="animate-pop-in absolute z-20"
                  style={{ left: x, top: y, transform: "translate(-50%, -50%)", animationDelay: `${i * 40 + 150}ms` }}
                >
                  {isNext && (
                    <span className="animate-float font-display absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      ここ！
                    </span>
                  )}
                  {circle}
                  <span
                    className={`font-display absolute left-1/2 top-full mt-1 w-[8.5rem] -translate-x-1/2 text-center text-[11px] font-bold leading-tight ${
                      done ? "text-brand-700" : unlocked ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {node.title}
                    {isTest && unlocked && !done && (
                      <span className="mt-0.5 block">
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">テスト・8割で合格</span>
                      </span>
                    )}
                  </span>
                </div>
              );

              return unlocked ? (
                <Link key={node.id} href={`/learn/${node.id}`} className="group">
                  {inner}
                </Link>
              ) : (
                <div key={node.id} className="cursor-not-allowed" title="前のマスをクリアすると解放されます">
                  {inner}
                </div>
              );
            })}

            {/* ゴール */}
            <div
              className="animate-pop-in absolute z-20 flex flex-col items-center"
              style={{ left: layout.center, top: layout.goalY, transform: "translate(-50%, -50%)", animationDelay: `${layout.placed.length * 40 + 250}ms` }}
            >
              <span
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  allDone
                    ? "bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_6px_0_#12a854]"
                    : "bg-white text-slate-300 ring-2 ring-[#e7ddc8] shadow-[0_5px_0_#e7ddc8]"
                }`}
              >
                <Icon name="trophy" className="h-9 w-9" />
              </span>
              <p className="font-display absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 text-center text-sm font-extrabold text-slate-700">
                {allDone ? "クリア！図鑑デビューだ" : "ゴール：かんたんなサイトへ"}
              </p>
            </div>
          </>
        )}
      </div>

      {allDone && (
        <div className="mt-6 flex justify-center">
          <Link
            href="/zukan"
            className="btn-3d font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-6 py-2.5 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#12a854" }}
          >
            図鑑をひらく
            <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </div>
  );
}
