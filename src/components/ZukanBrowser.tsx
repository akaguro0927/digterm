"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { terms, termNo, type Category } from "@/data/terms";
import { matchTerm, suggestTerms, matchLesson, type LessonIndexItem } from "@/lib/search";
import { categoryTheme, levelTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";
import FavoriteButton from "@/components/FavoriteButton";
import MiniMascot from "@/components/MiniMascot";
import { hasVisual } from "@/data/visualTerms";

type CategoryFilter = Category | "all";

export default function ZukanBrowser({
  initialCategory = "all",
  lessons = [],
}: {
  initialCategory?: CategoryFilter;
  lessons?: LessonIndexItem[];
}) {
  const PAGE_SIZE = 30; // 重くならないよう初期は30語だけ描画し、以降はまとめて追加ロード

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [level, setLevel] = useState(0); // 0 = すべて
  const [visible, setVisible] = useState(PAGE_SIZE);

  // 図鑑には「実物デモ（視覚説明）がある用語」だけを表示する
  const visibleTerms = useMemo(() => terms.filter((t) => hasVisual(t.slug)), []);

  const filtered = useMemo(
    () =>
      visibleTerms.filter(
        (t) =>
          (category === "all" || t.category === category) &&
          (level === 0 || t.level === level) &&
          matchTerm(t, query)
      ),
    [visibleTerms, query, category, level]
  );

  // ヒット0件のときの「もしかして」候補
  const suggestions = useMemo(
    () => (query.trim() && filtered.length === 0 ? suggestTerms(query, visibleTerms) : []),
    [query, filtered.length, visibleTerms]
  );

  // 検索クエリがあるとき、用語だけでなくレッスンも横断ヒットさせる
  const lessonHits = useMemo(
    () => (query.trim() ? lessons.filter((l) => matchLesson(l, query)).slice(0, 6) : []),
    [query, lessons]
  );

  // 絞り込みが変わったら表示件数をリセット（先頭30語から）
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, category, level]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  // スクロールで見えてきたら自動で次の30語を追加ロード
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => v + PAGE_SIZE);
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, visible, filtered.length]);

  return (
    <div>
      {/* 検索バー */}
      <div className="group mt-6 flex items-center gap-3 rounded-full bg-white px-6 py-4 shadow-md shadow-slate-200/70 ring-1 ring-slate-200 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:shadow-lg focus-within:shadow-brand-100 focus-within:ring-2 focus-within:ring-brand-500">
        <Icon
          name="search"
          className="h-5 w-5 text-slate-300 transition-colors duration-300 group-focus-within:text-brand-500"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="例: もーだる、toast、三本線、くるくる …"
          className="w-full bg-transparent text-[15px] outline-none placeholder:text-slate-300"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-200"
          >
            <Icon name="x" className="h-3 w-3" />
            クリア
          </button>
        )}
      </div>

      {/* 絞り込みチップ */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setCategory("all")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            category === "all"
              ? "scale-105 bg-slate-800 font-bold text-white shadow-md"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-sm"
          }`}
        >
          すべて <span className="ml-0.5 text-xs opacity-60">{visibleTerms.length}</span>
        </button>
        {(Object.keys(categoryTheme) as Category[]).map((c) => {
          const th = categoryTheme[c];
          const count = visibleTerms.filter((t) => t.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                category === c
                  ? `scale-105 bg-gradient-to-r font-bold text-white shadow-md ${th.gradient}`
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:shadow-sm"
              }`}
            >
              <Icon name={th.icon} className="h-3.5 w-3.5" />
              {th.label} <span className="text-xs opacity-60">{count}</span>
            </button>
          );
        })}
        <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" />
        {[0, 1, 2, 3].map((lv) => (
          <button
            key={lv}
            onClick={() => setLevel(lv)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              level === lv
                ? "bg-brand-600 font-bold text-white shadow-md"
                : "bg-white text-slate-500 ring-1 ring-slate-200 hover:-translate-y-0.5"
            }`}
          >
            {lv === 0 ? "全レベル" : levelTheme[lv].label}
          </button>
        ))}
      </div>

      {/* レッスン横断ヒット（検索時のみ・用語とは別枠で） */}
      {lessonHits.length > 0 && (
        <div className="mt-6 rounded-2xl border-2 border-brand-100 bg-brand-50/40 p-4">
          <p className="font-display flex items-center gap-1.5 text-xs font-bold tracking-widest text-brand-600">
            <Icon name="flag" className="h-3.5 w-3.5" />
            レッスンでも学べる
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {lessonHits.map((l) => (
              <Link
                key={l.nodeId}
                href={`/learn/${l.nodeId}`}
                className="group flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:ring-brand-300"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon name="book-open" className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-slate-700 group-hover:text-brand-600">{l.title}</span>
                  <span className="block truncate text-[11px] text-slate-400">
                    {l.levelLabel}・{l.chapterTitle}
                  </span>
                </span>
                <Icon name="arrow-right" className="h-4 w-4 shrink-0 text-brand-400" strokeWidth={2.5} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-sm text-slate-500">
        <span className="font-display text-lg font-extrabold text-brand-600">{filtered.length}</span> 語が見つかりました
        {hasMore && <span className="ml-1 text-slate-400">（{shown.length}語を表示中）</span>}
      </p>

      {/* カードグリッド（カテゴリ/レベル切り替えで段差アニメーション） */}
      <div key={`${category}-${level}`} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((t, i) => {
          const th = categoryTheme[t.category];
          return (
            <Link
              key={t.slug}
              href={`/zukan/${t.slug}`}
              style={{ animationDelay: `${Math.min(i, 11) * 45}ms` }}
              className="group animate-pop-in card-pop relative p-5"
            >
              {/* ホバーでひょこっと出るミニキャラ */}
              <MiniMascot className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${th.tile} ${th.tileText}`}
                >
                  <Icon name={th.icon} className="h-5 w-5" />
                </span>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider text-slate-300">
                      {termNo(t.slug)}
                    </span>
                    <FavoriteButton slug={t.slug} className="h-7 w-7" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${levelTheme[t.level].chip}`}>
                      {levelTheme[t.level].label} {levelTheme[t.level].dots}
                    </span>
                    {t.isPremium && (
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white"
                        title="本番では有料会員限定"
                      >
                        <Icon name="lock" className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <h2 className="font-display mt-3 text-lg font-extrabold transition-colors group-hover:text-brand-600">
                {t.nameJa}
              </h2>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{t.nameEn}</p>
              <p className="protected mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{t.summary}</p>
              <p className="mt-3 flex items-center justify-end gap-1 text-xs font-bold text-brand-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                実例を見る
                <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
              </p>
            </Link>
          );
        })}
      </div>

      {/* 追加ロード（初期30語 → スクロールまたはボタンで+30語ずつ） */}
      {hasMore && (
        <>
          <div ref={sentinelRef} aria-hidden className="h-1" />
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-extrabold text-brand-600 ring-2 ring-[#ebe4d5]"
              style={{ ["--edge" as string]: "#ebe4d5" }}
            >
              もっと見る
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs text-brand-500">
                残り{filtered.length - visible}語
              </span>
            </button>
          </div>
        </>
      )}

      {filtered.length === 0 && (
        <div className="animate-pop-in mt-8 rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">
          <span className="mx-auto flex h-14 w-14 animate-wiggle items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <p className="mt-4 font-bold text-slate-600">「{query}」は見つかりませんでした</p>

          {/* もしかして（あいまい・綴り違いから近い用語を提案） */}
          {suggestions.length > 0 ? (
            <div className="mt-5">
              <p className="text-sm font-bold text-brand-600">もしかして、これですか？</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {suggestions.map((t) => {
                  const th = categoryTheme[t.category];
                  return (
                    <Link
                      key={t.slug}
                      href={`/zukan/${t.slug}`}
                      className="group flex items-center gap-2 rounded-full border-2 border-[#ebe4d5] bg-white py-1.5 pl-1.5 pr-3.5 shadow-[0_3px_0_#ebe4d5] transition hover:-translate-y-0.5"
                    >
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full ${th.tile} ${th.tileText}`}>
                        <Icon name={th.icon} className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-display text-sm font-bold text-slate-700 group-hover:text-brand-600">
                        {t.nameJa}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-slate-400">別の言葉で試してみてください。見た目の記憶でもOKです。</p>
          )}

          <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs">
            {["くるくる", "三本線", "modal"].map((w) => (
              <button
                key={w}
                onClick={() => setQuery(w)}
                className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-600 transition hover:bg-brand-100"
              >
                「{w}」で検索
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
