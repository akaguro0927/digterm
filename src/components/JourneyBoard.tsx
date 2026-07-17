"use client";

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

// 盤の座標系（固定幅で、SVGの道とノードのpx位置を一致させる）。
// うねり＝ジグザグを明確にして縦を詰め、スクロール量を減らす。
const W = 340; // 盤の横幅
const CENTER = W / 2;
const AMP = 66; // 左右のふり幅（ジグザグ）
const TOP = 36; // 上の余白
const STEP = 86; // マスの縦間隔（詰めた）
const CH_GAP = 24; // 章のあいだの追加すき間
const BANNER = 52; // 章バナーぶんの高さ
const GOAL_GAP = 92; // 最後のマス→ゴールの間

interface Placed {
  fn: FlatNode;
  x: number;
  y: number;
}
interface Banner {
  chapter: FlatNode["chapter"];
  y: number;
}

// うねりの座標を組み立てる（章の変わり目でバナー用のすき間を足す）
function buildLayout() {
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
    // 左右にきっちり振る＝ジグザグ（滑らか曲線がS字の道になる）
    const x = CENTER + (gi % 2 === 0 ? -AMP : AMP);
    placed.push({ fn, x, y });
    y += STEP;
    gi += 1;
  }
  const goalY = y - STEP + GOAL_GAP;
  const height = goalY + 104; // ゴールの円＋下のラベルぶんの余白（はみ出し防止）
  return { placed, banners, goalY, height };
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

// ---- 道ぞいの小さな挿絵（余白を埋める。絵文字は使わずSVG） ----
function Cloud({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 34" className={className} style={style} fill="#eef4ef" aria-hidden>
      <ellipse cx="20" cy="22" rx="14" ry="11" />
      <ellipse cx="36" cy="16" rx="17" ry="14" />
      <ellipse cx="50" cy="22" rx="12" ry="10" />
    </svg>
  );
}
function Sprout({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 40" className={className} style={style} fill="none" aria-hidden>
      <path d="M16 40 V22" stroke="#79cf95" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 30 C8 28 4 21 6 14 C14 14 18 21 15 30Z" fill="#a8f0c4" />
      <path d="M17 28 C24 26 28 19 26 12 C18 12 14 19 17 28Z" fill="#6fe4a1" />
    </svg>
  );
}
function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="#ffd36b" aria-hidden>
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" />
    </svg>
  );
}
// 小さなコクリ（余白でこっちを見てる）
function MiniMascot({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative h-12 w-14 rounded-xl border-2 border-[#ebe4d5] bg-white shadow-[0_3px_0_#ebe4d5] ${className}`} style={style}>
      <div className="flex items-center gap-0.5 rounded-t-[0.6rem] border-b border-slate-100 bg-slate-50/70 px-1.5 py-0.5">
        <span className="h-1 w-1 rounded-full bg-rose-300" />
        <span className="h-1 w-1 rounded-full bg-amber-300" />
        <span className="h-1 w-1 rounded-full bg-emerald-300" />
      </div>
      <div className="flex h-[calc(100%-13px)] flex-col items-center justify-center">
        <div className="flex gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
        </div>
        <svg viewBox="0 0 24 10" className="mt-0.5 h-2 w-5 text-brand-500" fill="none" aria-hidden>
          <path d="M3 3 C7 8 17 8 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export default function JourneyBoard() {
  const cleared = useClearedNodes();
  const clearedSet = new Set(cleared);
  const doneCount = flatNodes.filter((f) => clearedSet.has(f.node.id)).length;
  const pct = totalNodes > 0 ? Math.round((doneCount / totalNodes) * 100) : 0;
  const nextId = nextNodeId(cleared);
  const allDone = nextId === null;

  const { placed, banners, goalY, height } = buildLayout();
  const roadPts = [...placed.map((p) => ({ x: p.x, y: p.y })), { x: CENTER, y: goalY }];
  const roadD = smoothPath(roadPts);

  return (
    <div className="relative">
      {/* 進捗ヘッダー */}
      <div className="card-pop p-5 sm:p-6">
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

      {/* すごろくの「うねる道」。左右の余白には挿絵とキャラを置く */}
      <div className="relative mx-auto mt-6" style={{ width: W, height, maxWidth: "100%" }}>
        {/* 装飾レイヤー（道の背後・クリック無効・スマホでは控えめ） */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Cloud className="animate-float absolute -left-16 top-10 hidden w-16 opacity-80 sm:block" />
          <Cloud className="animate-float-slow absolute -right-20 hidden w-24 opacity-70 sm:block" style={{ top: height * 0.28 }} />
          <Cloud className="animate-float absolute -left-20 hidden w-20 opacity-60 sm:block" style={{ top: height * 0.62 }} />
          <Sprout className="absolute -left-9 hidden w-7 sm:block" style={{ top: height * 0.46 }} />
          <Sprout className="absolute -right-10 hidden w-8 sm:block" style={{ top: height * 0.72 }} />
          <Sprout className="absolute -left-10 hidden w-6 sm:block" style={{ top: height * 0.88 }} />
          <Sprout className="absolute -right-8 hidden w-6 sm:block" style={{ top: height * 0.16 }} />
          <MiniMascot className="animate-float absolute -right-16 hidden sm:block" style={{ top: TOP + 4 }} />
          <Sparkle className="animate-float absolute hidden w-5 opacity-90 sm:block" style={{ top: goalY - 34, left: -30 }} />
          <Sparkle className="animate-float-slow absolute hidden w-4 opacity-80 sm:block" style={{ top: goalY + 8, left: W + 14 }} />
          <Sparkle className="animate-float absolute hidden w-3 opacity-70 sm:block" style={{ top: goalY - 6, left: W + 34 }} />
        </div>

        {/* 道（SVG）。クリックはノードに通すので pointer-events-none */}
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={W}
          height={height}
          viewBox={`0 0 ${W} ${height}`}
          fill="none"
          aria-hidden
        >
          <path d={roadD} stroke="#e7ddc8" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
          <path d={roadD} stroke="#f4eede" strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={roadD}
            stroke="url(#roadGrad)"
            strokeWidth={20}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={100}
            strokeDashoffset={100 - pct}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
          <path d={roadD} stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeDasharray="1 15" opacity={0.9} />
          <defs>
            <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#40dc7e" />
              <stop offset="1" stopColor="#12a854" />
            </linearGradient>
          </defs>
        </svg>

        {/* 章のバナー（道ぞいの標識） */}
        {banners.map((b, ci) => (
          <div
            key={b.chapter.id}
            className="animate-pop-in absolute left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-2xl border-2 border-[#e7ddc8] bg-[#fdfbf5] px-3.5 py-1.5 shadow-[0_3px_0_#e7ddc8]"
            style={{ top: b.y, animationDelay: `${ci * 90}ms` }}
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

        {/* マス（ノード） */}
        {placed.map(({ fn, x, y }, i) => {
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
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 45 + 200}ms`,
              }}
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
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                      テスト・8割で合格
                    </span>
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
          style={{
            left: CENTER,
            top: goalY,
            transform: "translate(-50%, -50%)",
            animationDelay: `${placed.length * 45 + 300}ms`,
          }}
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
