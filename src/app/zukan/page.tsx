import type { Metadata } from "next";
import ZukanBrowser from "@/components/ZukanBrowser";
import AdSlot from "@/components/AdSlot";
import { CATEGORY_LABELS, type Category } from "@/data/terms";

export const metadata: Metadata = {
  title: "用語図鑑",
  description: "フロントエンド用語・UI部品名を実例つきで検索できる図鑑。",
};

export default async function ZukanPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initialCategory =
    category && category in CATEGORY_LABELS ? (category as Category) : "all";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="animate-fade-up">
        <p className="font-display text-xs font-bold tracking-widest text-brand-500">ZUKAN</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">用語図鑑</h1>
        <p className="mt-2 text-sm text-slate-500">
          名前がうろ覚えでもOK。ひらがな・カタカナ・英語・「見た目の記憶」どれでも検索できます。No.001から順にめくるのもおすすめ。
        </p>
      </div>
      <AdSlot className="mt-6" />
      <ZukanBrowser initialCategory={initialCategory} />
    </div>
  );
}
