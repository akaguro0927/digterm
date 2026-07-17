"use client";

import { useEffect } from "react";

// 転載防止: .protected 内のコピーを無効化する（data-copy-ok は除外）
// 完全な防止は不可能なため「抑止」目的。docs/02_非機能要件.md 参照
export default function CopyGuard() {
  useEffect(() => {
    const onCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      if (target.closest("[data-copy-ok]")) return;
      if (target.closest(".protected")) e.preventDefault();
    };
    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest) return;
      if (target.closest(".protected") && !target.closest("[data-copy-ok]")) {
        e.preventDefault();
      }
    };
    document.addEventListener("copy", onCopy);
    document.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("contextmenu", onContextMenu);
    };
  }, []);
  return null;
}
