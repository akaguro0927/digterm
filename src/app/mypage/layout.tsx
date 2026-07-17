import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "マイページ",
  description: "お気に入りに登録した用語と、クイズ・実力試験の学習記録をまとめて確認できます。",
};

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
