import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン / 新規登録",
  description: "Co-Cre にログインして、お気に入りや学習の記録を複数の端末で同期しましょう。",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
