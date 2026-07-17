"use client";

import { OPEN_TOUR_EVENT } from "@/components/GuidedTour";
import { Icon } from "@/components/icons";

// 使い方（ガイドツアー）をもう一度開くボタン。フッターなどに設置。
export default function HelpButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event(OPEN_TOUR_EVENT))}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-brand-50 hover:text-brand-600 ${className}`}
    >
      <Icon name="book-open" className="h-3.5 w-3.5" />
      使い方をもう一度見る
    </button>
  );
}
