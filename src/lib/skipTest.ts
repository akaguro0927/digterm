import { flatNodes, type CourseLevel, type TestQuestion } from "@/data/journey";

// 飛び級テスト：そのレベル全体の章末テストから横断的に出題する（＝単一章より少し難しい）。
export const SKIP_PASS = 0.9; // 合格ライン（9割）——通常テスト(8割)より少し厳しく
export const SKIP_COUNT = 10; // 出題数

// そのレベルに含まれる全ノードid（合格時にまとめてクリア扱いにする）
export function levelNodeIds(level: CourseLevel): string[] {
  return flatNodes.filter((f) => f.chapter.level === level).map((f) => f.node.id);
}

// そのレベルの章末テスト問題を全部集める
export function levelTestQuestions(level: CourseLevel): TestQuestion[] {
  const qs: TestQuestion[] = [];
  for (const f of flatNodes) {
    if (f.chapter.level === level && f.node.type === "test") {
      qs.push(...f.node.questions);
    }
  }
  return qs;
}

// フィッシャー–イェーツで並べ替え（出題順をランダムに）
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
