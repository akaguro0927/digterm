"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { terms, type Term } from "@/data/terms";
import { categoryTheme } from "@/lib/categoryTheme";
import { Icon } from "@/components/icons";

// 今日の1語。SSG（ビルド時固定）にならないよう、日付判定はクライアントで行う。
export default function WordOfTheDay() {
  const [term, setTerm] = useState<Term | null>(null);

  useEffect(() => {
    const d = new Date();
    const key = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    setTerm(terms[key % terms.length]);
  }, []);

  if (!term) {
    return <div className="h-[92px] animate-pulse rounded-3xl bg-slate-100" aria-hidden />;
  }

  const th = categoryTheme[term.category];
  return (
    <Link
      href={`/zukan/${term.slug}`}
      className="group block rounded-3xl border-2 border-[#e7ddc8] bg-white p-5 shadow-[0_4px_0_#e7ddc8] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_0_#e7ddc8] sm:p-6"
    >
      <div className="flex items-center gap-4">
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${th.tile} ${th.tileText}`}>
          <Icon name={th.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[11px] font-bold tracking-widest text-brand-500">今日の1語</p>
          <p className="font-display truncate text-xl font-extrabold text-slate-800">
            {term.nameJa}
            <span className="ml-2 text-xs font-bold uppercase tracking-wide text-slate-400">{term.nameEn}</span>
          </p>
          <p className="mt-0.5 truncate text-xs text-slate-500">{term.summary}</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600 transition group-hover:bg-brand-100">
          見る
          <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  );
}
