"use client";

import Link from "next/link";
import { Icon } from "@/components/icons";
import { useClearedNodes, useJourneyWeak } from "@/lib/userStore";
import { useHasPaidAccess } from "@/lib/plan";
import {
  flatNodes,
  totalNodes,
  isUnlocked,
  nextNodeId,
  isChapterAccessible,
  levels,
  type FlatNode,
} from "@/data/journey";

const levelMeta = (level: string) => levels.find((l) => l.level === level);

// 前回の学習マップ（LearningMap）と同じUI：中央の点線スパイン＋左右にゆれるノード。
function offsetX(globalIndex: number): number {
  return Math.round(Math.sin(globalIndex * 0.9) * 52);
}

// 章ごとにノードをまとめる
function groupByChapter(): { chapter: FlatNode["chapter"]; nodes: FlatNode[] }[] {
  const groups: { chapter: FlatNode["chapter"]; nodes: FlatNode[] }[] = [];
  let cur: { chapter: FlatNode["chapter"]; nodes: FlatNode[] } | null = null;
  for (const fn of flatNodes) {
    if (!cur || cur.chapter.id !== fn.chapter.id) {
      cur = { chapter: fn.chapter, nodes: [] };
      groups.push(cur);
    }
    cur.nodes.push(fn);
  }
  return groups;
}

export default function JourneyBoard() {
  const cleared = useClearedNodes();
  const hasPaid = useHasPaidAccess();
  const weak = useJourneyWeak();
  const clearedSet = new Set(cleared);
  const doneCount = flatNodes.filter((f) => clearedSet.has(f.node.id)).length;
  const pct = totalNodes > 0 ? Math.round((doneCount / totalNodes) * 100) : 0;
  const nextId = nextNodeId(cleared);
  const allDone = nextId === null;

  const chapters = groupByChapter();
  let globalIndex = -1;

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
        {/* 凡例 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brand-500" />クリア</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-white ring-2 ring-brand-400" />今ここ</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-white ring-2 ring-[#e7ddc8]" />これから</span>
        </div>
      </div>

      {/* 弱点復習への導線（間違えた問題があるときだけ） */}
      {weak.length > 0 && (
        <Link
          href="/learn/review"
          className="group mt-4 flex items-center gap-3 rounded-2xl border-2 border-rose-100 bg-rose-50/60 p-4 transition hover:border-rose-200"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-500 shadow-sm">
            <Icon name="flame" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-sm font-extrabold text-slate-800">
              間違えた問題が <span className="text-rose-600">{weak.length}</span> 問
            </p>
            <p className="text-[11px] text-slate-500">テストで間違えた問題だけ復習。正解すると消えていくよ</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
            復習する
            <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>
      )}

      {/* レベルジャンプ（長い道のりを素早く移動）＋目次 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {levels.map((lm) => (
          <a
            key={lm.level}
            href={`#level-${lm.level}`}
            className="rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 ring-1 ring-[#e7ddc8] transition hover:text-brand-600 hover:ring-brand-300"
          >
            {lm.label}
          </a>
        ))}
        <Link
          href="/curriculum"
          className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-[11px] font-bold text-brand-700 ring-1 ring-brand-100 transition hover:bg-brand-100"
        >
          <Icon name="book" className="h-3 w-3" />
          目次
        </Link>
      </div>

      {/* 道のり */}
      <div className="relative mx-auto mt-8 max-w-md pb-4">
        {/* 中央スパイン（点線の道） */}
        <div
          className="pointer-events-none absolute bottom-16 left-1/2 top-10 -translate-x-1/2 border-l-[3px] border-dashed border-[#e0d6bf]"
          aria-hidden
        />

        {chapters.map((chap, ci) => {
          const chapterDone = chap.nodes.every((fn) => clearedSet.has(fn.node.id));
          const chapterLocked = !isChapterAccessible(chap.chapter, hasPaid);
          const prevLevel = ci > 0 ? chapters[ci - 1].chapter.level : null;
          const showLevelHeader = chap.chapter.level !== prevLevel;
          const lm = levelMeta(chap.chapter.level);
          return (
            <section key={chap.chapter.id} className="relative">
              {/* コースレベルの区切り（初級／中級／上級） */}
              {showLevelHeader && lm && (
                <div id={`level-${chap.chapter.level}`} className="relative mx-auto mb-2 mt-12 max-w-md scroll-mt-20 px-2 text-center first:mt-2">
                  <p className="font-display text-[11px] font-bold tracking-widest text-brand-500">{lm.eyebrow}</p>
                  <h3 className="font-display mt-0.5 text-lg font-extrabold text-slate-800">
                    {lm.label}
                    {chap.chapter.access === "vip" && (
                      <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-[10px] font-extrabold text-amber-700">
                        <Icon name="trophy" className="h-3 w-3" />VIP
                      </span>
                    )}
                  </h3>
                  <p className="mx-auto mt-1 max-w-xs text-[11px] leading-snug text-slate-400">{lm.tagline}</p>
                </div>
              )}

              {/* 章見出し */}
              <div
                className="animate-pop-in relative mx-auto my-6 flex max-w-xs items-center gap-3 rounded-2xl border-2 border-[#e7ddc8] bg-[#fdfbf5] px-4 py-2.5 shadow-[0_3px_0_#e7ddc8]"
                style={{ animationDelay: `${ci * 120}ms` }}
              >
                <span
                  className={`font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    chapterDone ? "bg-brand-500 text-white" : chap.chapter.chip
                  }`}
                >
                  {chapterDone ? <Icon name="check" className="h-4 w-4" strokeWidth={3} /> : ci + 1}
                </span>
                <span className="min-w-0">
                  <span className="font-display block text-sm font-extrabold text-slate-800">{chap.chapter.title}</span>
                  <span className="block truncate text-[11px] text-slate-400">{chap.chapter.subtitle}</span>
                </span>
              </div>

              {/* 章内のノード */}
              <div className="relative flex flex-col items-center gap-8">
                {chap.nodes.map((fn) => {
                  globalIndex += 1;
                  const gi = globalIndex;
                  const node = fn.node;
                  const done = clearedSet.has(node.id);
                  const vipLocked = chapterLocked && !done; // VIP章なのに未課金
                  const unlocked = !vipLocked && isUnlocked(node.id, cleared);
                  const isNext = node.id === nextId;
                  const isTest = node.type === "test";

                  const circle = (
                    <span
                      className={`flex h-16 w-16 items-center justify-center transition-transform duration-200 ${
                        isTest ? "rounded-2xl" : "rounded-full"
                      } ${
                        done
                          ? "bg-brand-500 text-white shadow-[0_5px_0_#12a854]"
                          : vipLocked
                            ? "bg-amber-50 text-amber-500 ring-2 ring-amber-200 shadow-[0_4px_0_#fcd34d]"
                            : !unlocked
                              ? "bg-white text-slate-300 ring-2 ring-[#e7ddc8] shadow-[0_4px_0_#e7ddc8]"
                              : isNext
                                ? "animate-pulse bg-white text-brand-600 ring-4 ring-brand-400 shadow-[0_5px_0_#e7ddc8]"
                                : isTest
                                  ? "bg-amber-400 text-white shadow-[0_5px_0_#d97706]"
                                  : "bg-white text-brand-600 ring-2 ring-[#e7ddc8] shadow-[0_4px_0_#e7ddc8]"
                      } ${unlocked || vipLocked ? "group-hover:-translate-y-1 group-active:translate-y-0.5" : ""}`}
                    >
                      {done ? (
                        <Icon name="check" className="h-7 w-7" strokeWidth={3} />
                      ) : vipLocked || !unlocked ? (
                        <Icon name="lock" className="h-6 w-6" />
                      ) : (
                        <Icon name={node.icon} className="h-7 w-7" />
                      )}
                    </span>
                  );

                  const label = (
                    <span
                      className={`font-display mt-2 max-w-[8rem] text-center text-xs font-bold leading-tight ${
                        done ? "text-brand-700" : vipLocked ? "text-amber-600" : unlocked ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {node.title}
                      {vipLocked && (
                        <span className="mt-0.5 block">
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">
                            <Icon name="trophy" className="h-2.5 w-2.5" />VIPで開く
                          </span>
                        </span>
                      )}
                      {isTest && unlocked && !done && (
                        <span className="mt-0.5 block">
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-700">テスト・8割で合格</span>
                        </span>
                      )}
                    </span>
                  );

                  const inner = (
                    <>
                      {isNext && (
                        <span className="animate-float font-display absolute -top-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                          ここ！
                        </span>
                      )}
                      {circle}
                      {label}
                    </>
                  );

                  return (
                    <div
                      key={node.id}
                      className="animate-pop-in relative"
                      style={{ transform: `translateX(${offsetX(gi)}px)`, animationDelay: `${gi * 55 + 200}ms` }}
                    >
                      {vipLocked ? (
                        <Link href="/vip" className="group flex flex-col items-center" title="VIPで開放されるレッスンです">
                          {inner}
                        </Link>
                      ) : unlocked ? (
                        <Link href={`/learn/${node.id}`} className="group flex flex-col items-center" title={node.title}>
                          {inner}
                        </Link>
                      ) : (
                        <div className="flex cursor-not-allowed flex-col items-center" title="前のマスをクリアすると解放されます">
                          {inner}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* ゴール */}
        <div className="animate-pop-in relative mt-10 flex flex-col items-center" style={{ animationDelay: `${totalNodes * 55 + 300}ms` }}>
          <span
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              allDone
                ? "bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_6px_0_#12a854]"
                : "bg-white text-slate-300 ring-2 ring-[#e7ddc8] shadow-[0_5px_0_#e7ddc8]"
            }`}
          >
            <Icon name="trophy" className="h-9 w-9" />
          </span>
          <p className="font-display mt-2 text-sm font-extrabold text-slate-700">
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
