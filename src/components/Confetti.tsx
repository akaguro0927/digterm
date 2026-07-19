"use client";

import { useMemo } from "react";

const COLORS = ["#1fc866", "#f59e0b", "#f43f5e", "#8b5cf6", "#38bdf8", "#34d399"];

// 自前の紙吹雪（外部ライブラリなし・CSSアニメのみ）。クライアントでだけ生成するのでSSR差異なし。
export default function Confetti({ count = 30 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 1.6 + Math.random() * 1.2,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.round(Math.random() * 6),
        round: i % 3 === 0,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            animation: `confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
