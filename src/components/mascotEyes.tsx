"use client";

import { useEffect, useRef, useState } from "react";

// キャラの目がカーソルを追う仕掛け。
// face の中心を基準に、カーソル方向へ瞳を少しだけ動かす。
// ※ 要素が画面に見えていない or タブが非アクティブのときは追従を止める（負荷対策）。
export function useEyeTracking(max = 3) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (!visible) setOffset({ x: 0, y: 0 }); // 見えなくなったら中央へ戻す
      },
      { threshold: 0 }
    );
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      if (!visible || document.hidden) return;
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
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [max]);

  return { ref, offset };
}

// コンテナの中心を基準に、カーソル位置を -1〜1 に正規化して返す視差フック。
// 浮遊アイコンなどを「カーソルに合わせてゆるく動かす」のに使う。
// 見えていない/タブ非アクティブのときは (0,0) に戻して動きを止める。
export function usePointerParallax() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vec, setVec] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (!visible) setVec({ x: 0, y: 0 });
      },
      { threshold: 0 }
    );
    io.observe(el);

    const onMove = (e: PointerEvent) => {
      if (!visible || document.hidden) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2 || 1)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2 || 1)));
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVec({ x: nx, y: ny }));
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, vec };
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
