// すごろく学習で獲得できる「賞（アワード）」。クリアしたノードに応じて達成判定する。
import type { IconName } from "@/components/icons";

// 進捗判定に必要なのはノードIDだけ。本文・設問を含む journey.ts をクライアントへ
// 巻き込まないよう、賞の判定用メタデータはここに固定する。
const CHAPTER_NODE_IDS: Record<string, readonly string[]> = {
  c1: ["c1-l1", "c1-l2", "c1-l3", "c1-test"],
  c2: ["c2-l1", "c2-l2", "c2-test"],
  c3: ["c3-l1", "c3-l2", "c3-l3", "c3-test"],
  c4: ["c4-l1", "c4-l2", "c4-l3", "c4-test"],
  c5: ["c5-l1", "c5-l2", "c5-l3", "c5-test"],
  c6: ["c6-l1", "c6-l2", "c6-l3", "c6-test"],
  b1: ["b1-l1", "b1-l2", "b1-l3", "b1-test"],
  m1: ["m1-l1", "m1-l2", "m1-l3", "m1-test"],
  m2: ["m2-l1", "m2-l2", "m2-l3", "m2-test"],
  m3: ["m3-l1", "m3-l2", "m3-l3", "m3-test"],
  m9: ["m9-l1", "m9-l2", "m9-l3", "m9-test"],
  m4: ["m4-l1", "m4-l2", "m4-l3", "m4-test"],
  m10: ["m10-l1", "m10-l2", "m10-l3", "m10-test"],
  m5: ["m5-l1", "m5-l2", "m5-l3", "m5-test"],
  m6: ["m6-l1", "m6-l2", "m6-l3", "m6-test"],
  m11: ["m11-l1", "m11-l2", "m11-l3", "m11-test"],
  m7: ["m7-l1", "m7-l2", "m7-l3", "m7-test"],
  m8: ["m8-l1", "m8-l2", "m8-l3", "m8-test"],
  a1: ["a1-l1", "a1-l2", "a1-l3", "a1-test"],
  a2: ["a2-l1", "a2-l2", "a2-l3", "a2-test"],
  a4: ["a4-l1", "a4-l2", "a4-l3", "a4-test"],
  a5: ["a5-l1", "a5-l2", "a5-l3", "a5-test"],
  a6: ["a6-l1", "a6-l2", "a6-l3", "a6-test"],
  a7: ["a7-l1", "a7-l2", "a7-l3", "a7-test"],
  a8: ["a8-l1", "a8-l2", "a8-l3", "a8-test"],
  a9: ["a9-l1", "a9-l2", "a9-l3", "a9-test"],
  a10: ["a10-l1", "a10-l2", "a10-l3", "a10-test"],
  a11: ["a11-l1", "a11-l2", "a11-l3", "a11-test"],
  a12: ["a12-l1", "a12-l2", "a12-l3", "a12-test"],
  a3: ["a3-l1", "a3-l2", "a3-l3", "a3-test"],
};
const ALL_NODE_IDS = Object.values(CHAPTER_NODE_IDS).flat();

export interface Award {
  id: string;
  title: string;
  desc: string;
  icon: IconName;
  tint: string; // 獲得時のタイル色
  earned: (cleared: readonly string[]) => boolean;
}

function chapterDone(chapterId: string, cleared: readonly string[]): boolean {
  const ids = CHAPTER_NODE_IDS[chapterId] ?? [];
  return ids.length > 0 && ids.every((id) => cleared.includes(id));
}

function chaptersDone(ids: string[], cleared: readonly string[]): boolean {
  return ids.every((id) => chapterDone(id, cleared));
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
    id: "beginner-clear",
    title: "初級コース制覇",
    desc: "初級コース（第1〜6章）を全クリア",
    icon: "flag",
    tint: "bg-emerald-100 text-emerald-600",
    earned: (c) => chaptersDone(["c1", "c2", "c3", "c4", "c5", "c6"], c),
  },
  // ── 中級 ──
  {
    id: "bridge",
    title: "準備OK",
    desc: "「コードを書く準備」をクリア",
    icon: "flag",
    tint: "bg-lime-100 text-lime-600",
    earned: (c) => chapterDone("b1", c),
  },
  {
    id: "html-writer",
    title: "HTMLが書ける",
    desc: "中級「HTMLを書いてみる」をクリア",
    icon: "code",
    tint: "bg-orange-100 text-orange-600",
    earned: (c) => chapterDone("m1", c),
  },
  {
    id: "css-writer",
    title: "見た目が作れる",
    desc: "中級「CSSで見た目を作る」をクリア",
    icon: "droplet",
    tint: "bg-pink-100 text-pink-600",
    earned: (c) => chapterDone("m2", c),
  },
  {
    id: "js-writer",
    title: "動きが作れる",
    desc: "中級「JavaScriptで動かす」をクリア",
    icon: "zap",
    tint: "bg-yellow-100 text-yellow-600",
    earned: (c) => chapterDone("m3", c),
  },
  {
    id: "form-builder",
    title: "フォーム職人",
    desc: "中級「フォームを作る」をクリア",
    icon: "user",
    tint: "bg-fuchsia-100 text-fuchsia-600",
    earned: (c) => chapterDone("m5", c),
  },
  {
    id: "intermediate-clear",
    title: "中級コース制覇",
    desc: "中級コース（準備〜デバッグ）を全クリア",
    icon: "component",
    tint: "bg-cyan-100 text-cyan-600",
    earned: (c) => chaptersDone(["b1", "m1", "m2", "m3", "m9", "m4", "m10", "m5", "m6", "m11", "m7", "m8"], c),
  },
  // ── 上級 ──
  {
    id: "react-dev",
    title: "部品で作れる",
    desc: "上級「部品を組み合わせる」をクリア",
    icon: "component",
    tint: "bg-blue-100 text-blue-600",
    earned: (c) => chapterDone("a1", c),
  },
  {
    id: "server-dev",
    title: "裏側もわかる",
    desc: "上級「サーバーとデータベース」をクリア",
    icon: "database",
    tint: "bg-cyan-100 text-cyan-600",
    earned: (c) => chapterDone("a12", c),
  },
  {
    id: "ai-buddy",
    title: "AIを使いこなす",
    desc: "上級「AIと組む開発」をクリア",
    icon: "zap",
    tint: "bg-purple-100 text-purple-600",
    earned: (c) => chapterDone("a3", c),
  },
  {
    id: "advanced-clear",
    title: "上級コース制覇",
    desc: "上級コース（React〜AI）を全クリア",
    icon: "wrench",
    tint: "bg-indigo-100 text-indigo-600",
    earned: (c) => chaptersDone(["a1", "a2", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a3"], c),
  },
  {
    id: "complete",
    title: "全コース制覇",
    desc: "すべてのマスをクリア（初級〜上級）",
    icon: "trophy",
    tint: "bg-brand-100 text-brand-600",
    earned: (c) => ALL_NODE_IDS.length > 0 && ALL_NODE_IDS.every((id) => c.includes(id)),
  },
];

export function earnedAwards(cleared: readonly string[]): Award[] {
  return awards.filter((a) => a.earned(cleared));
}
