import "server-only";

import { flatNodes, isChapterAccessible, type CourseLevel, type TestQuestion } from "@/data/journey";

export interface ServedQuestion extends TestQuestion { nodeId: string; }

export function skipQuestionSet(level: CourseLevel, hasPaid: boolean) {
  const nodes = flatNodes.filter((item) => item.chapter.level === level && isChapterAccessible(item.chapter, hasPaid));
  if (flatNodes.some((item) => item.chapter.level === level && !isChapterAccessible(item.chapter, hasPaid))) return null;
  return { nodeIds: nodes.map((item) => item.node.id), questions: nodes.flatMap((item) => item.node.type === "test" ? item.node.questions.map((question) => ({ ...question, nodeId: item.node.id })) : []) };
}

export function marathonQuestionSet(level: CourseLevel | "all", hasPaid: boolean): ServedQuestion[] {
  return flatNodes.flatMap((item) => {
    if (item.node.type !== "test" || (level !== "all" && item.chapter.level !== level)) return [];
    if (!isChapterAccessible(item.chapter, hasPaid)) return [];
    return item.node.questions.map((question) => ({ ...question, nodeId: item.node.id }));
  });
}
