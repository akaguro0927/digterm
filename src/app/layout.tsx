import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Noto_Sans_JP, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import CopyGuard from "@/components/CopyGuard";
import GuidedTour from "@/components/GuidedTour";
import AwardCelebration from "@/components/AwardCelebration";
import HelpButton from "@/components/HelpButton";
import AuthProvider from "@/lib/supabase/AuthProvider";
import SupabaseSync from "@/lib/supabase/SupabaseSync";
import MainNav from "@/components/MainNav";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const rounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Co-Cre（コクリ） | フロントエンド用語を実例で覚える図鑑",
    template: "%s | Co-Cre",
  },
  description:
    "「あの部品、名前がわからない」を解決。フロントエンド用語・UI部品名を実例つきで検索・学習できる図鑑アプリ Co-Cre。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${noto.variable} ${rounded.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <CopyGuard />
        <GuidedTour />
        <AwardCelebration />
        <AuthProvider>
        <SupabaseSync />
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
            <Link href="/" className="group flex shrink-0 items-center gap-2.5">
              <Image
                src="/logo_full.png"
                alt="Co-Cre"
                width={601}
                height={135}
                className="h-7 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
                priority
              />
              <span className="hidden border-l border-slate-200 pl-2.5 text-[11px] font-bold leading-tight text-slate-400 md:inline-block">
                フロントエンド<br />用語図鑑
              </span>
            </Link>
            <MainNav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-10 text-center">
            <Image src="/logo_mark.png" alt="Co-Cre" width={397} height={195} className="h-9 w-auto" />
            <p className="font-display text-sm font-bold text-slate-600">
              名前がわかれば、調べられる。調べられれば、作れる。
            </p>
            <HelpButton className="ring-1 ring-slate-200" />
            <div className="text-xs leading-relaxed text-slate-400">
              <p>© 2026 Co-Cre — コンテンツの無断転載を禁じます</p>
              <p className="mt-0.5">プロトタイプ版: 課金は今後のマイルストーンで実装</p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
