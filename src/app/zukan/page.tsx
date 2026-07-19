import type { Metadata } from "next";
import Link from "next/link";
import ZukanBrowser from "@/components/ZukanBrowser";
import AdSlot from "@/components/AdSlot";
import { Icon } from "@/components/icons";
import { CATEGORY_LABELS, type Category } from "@/data/terms";
import { flatNodes, levels } from "@/data/journey";
import { normalize, type LessonIndexItem } from "@/lib/search";

export const metadata: Metadata = {
  title: "用語図鑑",
  description: "フロントエンド用語・UI部品名を実例つきで検索できる図鑑。",
};

// レッスン横断検索用の軽量索引（サーバー側で1回だけ作る。journey本体は
// クライアントに渡さず、この正規化済みテキストだけを ZukanBrowser へ prop で渡す）。
const lessonIndex: LessonIndexItem[] = flatNodes
  .filter((f) => f.node.type === "lesson")
  .map((f) => {
    const levelLabel = levels.find((l) => l.level === f.chapter.level)?.label ?? "";
    const node = f.node as Extract<typeof f.node, { type: "lesson" }>;
    const blob = normalize(
      [node.title, f.chapter.title, f.chapter.subtitle, node.intro, ...node.takeaways]
        .filter(Boolean)
        .join(" "),
    );
    return { nodeId: node.id, title: node.title, chapterTitle: f.chapter.title, levelLabel, blob };
  });

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
      <Link
        href="/flashcards"
        className="group mt-6 flex items-center gap-3 rounded-2xl border-2 border-violet-100 bg-violet-50/50 p-4 transition hover:border-violet-200"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-violet-500">
          <Icon name="book" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold text-slate-800">フラッシュカードで暗記する</p>
          <p className="text-[11px] text-slate-500">表で名前、めくって意味。「覚えた／まだ」でサクサク確認</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-violet-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
          はじめる
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </Link>

      {/* 学習の道のりへの導線（図鑑→レッスン） */}
      <Link
        href="/learn"
        className="group mt-3 flex items-center gap-3 rounded-2xl border-2 border-brand-100 bg-brand-50/50 p-4 transition hover:border-brand-200"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600">
          <Icon name="flag" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold text-slate-800">物語で学ぶ「学習の道のり」</p>
          <p className="text-[11px] text-slate-500">用語をただ調べるだけじゃなく、順番に読んで→テストで身につける。無料で書き始められる</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-500 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-105">
          はじめる
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </Link>

      {/* Windowsコマンド図鑑への導線 */}
      <Link
        href="/commands"
        className="group mt-3 flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-emerald-300">
          <Icon name="terminal" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-extrabold text-slate-800">Windowsコマンド図鑑</p>
          <p className="text-[11px] text-slate-500">「黒い画面」がこわい人へ。cd・dir・ping など開発で使うコマンドを実例つきで</p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-white transition group-hover:brightness-110">
          ひらく
          <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </Link>

      <AdSlot className="mt-4" />
      <ZukanBrowser initialCategory={initialCategory} lessons={lessonIndex} />
    </div>
  );
}
