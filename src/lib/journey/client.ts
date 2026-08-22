import type { PublicChapter, PublicCourseLevel, PublicFlatNode, PublicJourney } from "@/lib/journey/types";

export function isPublicChapterAccessible(chapter: PublicChapter, hasPaid: boolean): boolean {
  return chapter.access === "free" || hasPaid;
}

export function nextPublicNodeId(nodes: readonly PublicFlatNode[], cleared: readonly string[]): string | null {
  return nodes.find((item) => !cleared.includes(item.node.id))?.node.id ?? null;
}

export function publicNodeIsUnlocked(nodes: readonly PublicFlatNode[], id: string, cleared: readonly string[]): boolean {
  const index = nodes.findIndex((item) => item.node.id === id);
  return index <= 0 || cleared.includes(nodes[index - 1].node.id);
}

export function publicChaptersForLevel(journey: PublicJourney, level: PublicCourseLevel): PublicChapter[] {
  return journey.chapters.filter((chapter) => chapter.level === level);
}

export function publicLevelProgress(journey: PublicJourney, cleared: readonly string[]) {
  const done = new Set(cleared);
  return journey.levels.map((level) => {
    const nodes = journey.flatNodes.filter((item) => item.chapter.level === level.level);
    const completed = nodes.filter((item) => done.has(item.node.id)).length;
    return { ...level, done: completed, total: nodes.length, pct: nodes.length ? Math.round((completed / nodes.length) * 100) : 0 };
  });
}
