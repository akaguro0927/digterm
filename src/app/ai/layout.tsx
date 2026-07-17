import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIでしらべる",
  description:
    "スクリーンショットから「この部品なんて名前？」をAIが判定。用語について質問もできる（お試し版）。",
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
