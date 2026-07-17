"use client";

import { useEffect, useRef, useState } from "react";

// キャラの目がカーソルを追う仕掛け。
// face の中心を基準に、カーソル方向へ瞳を少しだけ動かす。
export function useEyeTracking(max = 3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 160); // 近いほど控えめ、遠いほど最大まで
      setOffset({ x: (dx / dist) * max * k, y: (dy / dist) * max * k });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [max]);

  return { ref, offset };
}

// 白目＋瞳。瞳がカーソル方向へ動き、まばたきもする。
export function Eye({
  offset,
  size = "h-4 w-4",
  pupil = "h-2.5 w-2.5",
  delay = "0s",
}: {
  offset: { x: number; y: number };
  size?: string;
  pupil?: string;
  delay?: string;
}) {
  return (
    <span
      className={`animate-blink relative block origin-center rounded-full bg-white ring-1 ring-slate-200 ${size}`}
      style={{ animationDelay: delay }}
    >
      <span
        className={`absolute left-1/2 top-1/2 rounded-full bg-slate-800 ${pupil}`}
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          transition: "transform 90ms linear",
        }}
      />
    </span>
  );
}
