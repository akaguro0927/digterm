"use client";

import { useEffect } from "react";

// サービスワーカーを登録（PWA：ホーム画面に追加＋簡易オフライン）。失敗しても何もしない。
export default function PwaRegister() {
  useEffect(() => {
    if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
