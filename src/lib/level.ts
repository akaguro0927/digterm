// XP・レベル・称号。新しい保存はせず、既存の学習データ（既読/クリア/クイズ/お気に入り）から計算する。

export const XP = {
  seen: 3, // 用語を1つ読む
  cleared: 12, // すごろくのマスを1つクリア
  quizCorrect: 2, // クイズ1問正解
  fav: 1, // お気に入り1件
};

export function computeXp(seen: number, cleared: number, quizCorrect: number, fav: number): number {
  return seen * XP.seen + cleared * XP.cleared + quizCorrect * XP.quizCorrect + fav * XP.fav;
}

// 称号（到達レベルの下限）
const TITLES: { min: number; name: string }[] = [
  { min: 1, name: "見習い" },
  { min: 3, name: "かけだし" },
  { min: 5, name: "初級エンジニア" },
  { min: 8, name: "中級エンジニア" },
  { min: 12, name: "上級エンジニア" },
  { min: 16, name: "フロントマスター" },
];

export interface LevelInfo {
  level: number;
  title: string;
  xp: number;
  inLevel: number; // 今のレベル内で貯めたXP
  need: number; // 次のレベルに必要なXP（このレベルぶん）
  pct: number; // 0-100
  toNext: number; // 次まで残りXP
}

const STEP = 60; // レベルLに上がるのに STEP*L のXPが要る（だんだん重くなる）

export function levelInfo(xp: number): LevelInfo {
  let level = 1;
  let floor = 0;
  while (xp >= floor + STEP * level) {
    floor += STEP * level;
    level += 1;
  }
  const need = STEP * level;
  const inLevel = xp - floor;
  const title = [...TITLES].reverse().find((t) => level >= t.min)?.name ?? "見習い";
  return {
    level,
    title,
    xp,
    inLevel,
    need,
    pct: need > 0 ? Math.round((inLevel / need) * 100) : 0,
    toNext: need - inLevel,
  };
}
