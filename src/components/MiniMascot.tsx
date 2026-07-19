import { Eye } from "@/components/mascotEyes";

// 図鑑カード用の超軽量ミニキャラ（カーソル追従なし＝298枚あっても軽い）。
// まばたきだけCSSでする。カードのホバーで“ひょこっ”と出す使い方を想定。
export default function MiniMascot({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden>
      <span className="relative block h-9 w-11 rounded-xl border-2 border-[#ebe4d5] bg-white shadow-[0_2px_0_#ebe4d5]">
        <span className="flex items-center gap-0.5 rounded-t-[0.6rem] border-b border-slate-100 bg-slate-50/70 px-1.5 py-0.5">
          <span className="h-1 w-1 rounded-full bg-rose-300" />
          <span className="h-1 w-1 rounded-full bg-amber-300" />
          <span className="h-1 w-1 rounded-full bg-emerald-300" />
        </span>
        <span className="flex h-[calc(100%-12px)] flex-col items-center justify-center">
          <span className="flex items-end gap-1.5">
            <Eye offset={{ x: 0, y: 0 }} size="h-2.5 w-2.5" pupil="h-1.5 w-1.5" />
            <Eye offset={{ x: 0, y: 0 }} size="h-2.5 w-2.5" pupil="h-1.5 w-1.5" delay="0.05s" />
          </span>
          <svg viewBox="0 0 24 10" className="mt-0.5 h-1.5 w-4 text-brand-500" fill="none" aria-hidden>
            <path d="M3 3 C7 9, 17 9, 21 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    </span>
  );
}
