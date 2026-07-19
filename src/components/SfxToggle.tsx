"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { isSfxOn, setSfxOn, playCorrect } from "@/lib/sfx";

// マイページ「その他」に置く効果音のON/OFFトグル。
export default function SfxToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(isSfxOn());
    const h = () => setOn(isSfxOn());
    window.addEventListener("sfx-change", h);
    return () => window.removeEventListener("sfx-change", h);
  }, []);

  const toggle = () => {
    const next = !on;
    setSfxOn(next);
    setOn(next);
    if (next) playCorrect(); // ONにした瞬間にサンプル再生
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-sm text-slate-700 transition hover:bg-slate-50"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon name="bell" className="h-4 w-4" />
      </span>
      <span className="flex-1 text-left font-medium">効果音（正解・不正解の音）</span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-brand-500" : "bg-slate-200"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}
