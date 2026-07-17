"use client";

import { useEffect, useState } from "react";
import { useClearedNodes } from "@/lib/userStore";
import { earnedAwards, type Award } from "@/data/awards";
import { Icon } from "@/components/icons";

const SEEN_KEY = "cocre:awards-seen:v1";

// 新しく獲得した賞をどこの画面でも「賞を獲得！」とお祝い表示する（layoutに常設）。
export default function AwardCelebration() {
  const cleared = useClearedNodes();
  const [queue, setQueue] = useState<Award[]>([]);
  const earned = earnedAwards(cleared);
  const earnedKey = earned.map((a) => a.id).join(",");

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(SEEN_KEY);
    } catch {
      return;
    }
    // 初回（キー未作成）は、いまの獲得済みを黙って記録するだけ（過去分は祝わない）
    if (raw === null) {
      try {
        window.localStorage.setItem(SEEN_KEY, JSON.stringify(earned.map((a) => a.id)));
      } catch {
        /* 無視 */
      }
      return;
    }
    const seen: string[] = JSON.parse(raw);
    const newly = earned.filter((a) => !seen.includes(a.id));
    if (newly.length === 0) return;
    setQueue((q) => [...q, ...newly.filter((a) => !q.some((x) => x.id === a.id))]);
    try {
      window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, ...newly.map((a) => a.id)]));
    } catch {
      /* 無視 */
    }
    // earnedKey が変わったときだけ評価する
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earnedKey]);

  if (queue.length === 0) return null;
  const a = queue[0];
  const close = () => setQueue((q) => q.slice(1));

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="animate-award card-pop max-w-xs p-7 text-center">
        <p className="font-display text-xs font-bold tracking-widest text-amber-500">賞を獲得！</p>
        <span className={`mx-auto mt-3 flex h-20 w-20 items-center justify-center rounded-3xl ${a.tint}`}>
          <Icon name={a.icon} className="h-10 w-10" />
        </span>
        <h2 className="font-display mt-4 text-xl font-extrabold">{a.title}</h2>
        <p className="mt-1 text-sm text-slate-500">{a.desc}</p>
        <button
          onClick={close}
          className="btn-3d font-display mt-6 w-full rounded-full bg-brand-500 py-3 text-sm font-extrabold text-white"
          style={{ ["--edge" as string]: "#12a854" }}
        >
          やった！
        </button>
      </div>
    </div>
  );
}
