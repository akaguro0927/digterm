"use client";

import { useEffect } from "react";
import { markSeen } from "@/lib/userStore";

// 用語詳細ページで、その用語を「読んだ」と記録する（学習マップの達成度に反映）。
export default function SeenTracker({ slug }: { slug: string }) {
  useEffect(() => {
    markSeen(slug);
  }, [slug]);
  return null;
}
