// すごろく学習で獲得できる「賞（アワード）」。クリアしたノードに応じて達成判定する。
import type { IconName } from "@/components/icons";
import { nodesByChapter, flatNodes } from "@/data/journey";

export interface Award {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  tint: string; // 獲得時のタイル色
  earned: (cleared: readonly string[]) => boolean;
}

function chapterDone(chapterId: string, cleared: readonly string[]): boolean {
  const ns = nodesByChapter[chapterId] ?? [];
  return ns.length > 0 && ns.every((n) => cleared.includes(n.id));
}

export const awards: Award[] = [
  {
    id: "first-step",
    title: "はじめの一歩",
    desc: "最初のレッスンをクリア",
    icon: "flag",
    tint: "bg-emerald-100 text-emerald-600",
    earned: (c) => c.includes("c1-l1"),
  },
  {
    id: "first-test",
    title: "はじめての合格",
    desc: "アウトプットテストに合格",
    icon: "check",
    tint: "bg-sky-100 text-sky-600",
    earned: (c) => c.includes("c1-test") || c.includes("c2-test"),
  },
  {
    id: "ch1",
    title: "AIのきほんマスター",
    desc: "第1章をすべてクリア",
    icon: "zap",
    tint: "bg-amber-100 text-amber-600",
    earned: (c) => chapterDone("c1", c),
  },
  {
    id: "ch2",
    title: "Webはかせ",
    desc: "第2章をすべてクリア",
    icon: "layout",
    tint: "bg-violet-100 text-violet-600",
    earned: (c) => chapterDone("c2", c),
  },
  {
    id: "ch3",
    title: "ヘッダー博士",
    desc: "第3章をすべてクリア",
    icon: "search",
    tint: "bg-violet-100 text-violet-600",
    earned: (c) => chapterDone("c3", c),
  },
  {
    id: "ch4",
    title: "部品マスター",
    desc: "第4章をすべてクリア",
    icon: "component",
    tint: "bg-rose-100 text-rose-600",
    earned: (c) => chapterDone("c4", c),
  },
  {
    id: "ch5",
    title: "デザインの目",
    desc: "第5章をすべてクリア",
    icon: "droplet",
    tint: "bg-teal-100 text-teal-600",
    earned: (c) => chapterDone("c5", c),
  },
  {
    id: "ch6",
    title: "サイトが作れる人",
    desc: "第6章をすべてクリア",
    icon: "wrench",
    tint: "bg-indigo-100 text-indigo-600",
    earned: (c) => chapterDone("c6", c),
  },
  {
    id: "complete",
    title: "道のり制覇",
    desc: "すべてのマスをクリア",
    icon: "trophy",
    tint: "bg-brand-100 text-brand-600",
    earned: (c) => flatNodes.length > 0 && flatNodes.every((f) => c.includes(f.node.id)),
  },
];

export function earnedAwards(cleared: readonly string[]): Award[] {
  return awards.filter((a) => a.earned(cleared));
}
