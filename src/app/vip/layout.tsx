import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VIP会員",
  description: "Co-Cre VIP会員でできること。広告なし・全レッスン・弱点復習・AIでしらべる無制限。",
};

export default function VipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
