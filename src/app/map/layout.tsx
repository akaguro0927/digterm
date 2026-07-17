import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学習マップ",
  description: "フロントエンドの最低限おさえたい知識を、順番にたどって身につける学習マップ。達成度も一目でわかります。",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
