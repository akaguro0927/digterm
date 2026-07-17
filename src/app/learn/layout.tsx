import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学習の道のり",
  description: "キャラといっしょに、AI・プログラミングの基礎からコーディング用語まで。読んで→テストで8割、を繰り返して簡単なサイトが作れるようになる学習すごろく。",
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
