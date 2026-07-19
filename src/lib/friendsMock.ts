import { flatNodes, levels, type CourseLevel } from "@/data/journey";

// ⚠️ モック（ダミーの友達）。本番では Supabase の friends/referrals ＋ 相手の進捗を読む。
export interface MockFriend {
  name: string;
  cleared: number; // クリア済みマス数
  tint: string;
}

export const MOCK_FRIENDS: MockFriend[] = [
  { name: "ゆうき", cleared: flatNodes.length, tint: "bg-amber-500" },
  { name: "はると", cleared: 58, tint: "bg-violet-500" },
  { name: "さくら", cleared: 31, tint: "bg-sky-500" },
  { name: "みお", cleared: 9, tint: "bg-rose-500" },
];

// レベルごとのマス数の境界（初級→中級→上級の累積）
function levelBoundaries(): { level: CourseLevel; upTo: number }[] {
  let acc = 0;
  return levels.map((lm) => {
    acc += flatNodes.filter((f) => f.chapter.level === lm.level).length;
    return { level: lm.level, upTo: acc };
  });
}

// クリア数から「今どこにいるか」のラベルを作る
export function progressLabel(cleared: number): string {
  const total = flatNodes.length;
  if (cleared <= 0) return "スタート前";
  if (cleared >= total) return "全コース制覇";
  const bounds = levelBoundaries();
  for (const b of bounds) {
    if (cleared < b.upTo) {
      const lm = levels.find((l) => l.level === b.level)!;
      return `${lm.label} 挑戦中`;
    }
  }
  return "学習中";
}

export function progressPct(cleared: number): number {
  const total = flatNodes.length || 1;
  return Math.round((Math.min(cleared, total) / total) * 100);
}
