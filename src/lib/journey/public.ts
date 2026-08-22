import "server-only";

import { flatNodes, levels } from "@/data/journey";
import type { PublicJourney } from "@/lib/journey/types";

/**
 * journey.tsを読むのはサーバーだけ。クライアントへは道のりを描く最小限の項目だけ渡す。
 * story / codeSample / practice / テスト設問・正解・解説は絶対にここへ含めない。
 */
export function getPublicJourney(): PublicJourney {
  const chapters = new Map<string, PublicJourney["chapters"][number]>();
  const publicNodes = flatNodes.map(({ node, chapter, index }) => {
    let publicChapter = chapters.get(chapter.id);
    if (!publicChapter) {
      publicChapter = {
        id: chapter.id,
        title: chapter.title,
        subtitle: chapter.subtitle,
        tint: chapter.tint,
        chip: chapter.chip,
        level: chapter.level,
        access: chapter.access,
      };
      chapters.set(chapter.id, publicChapter);
    }
    return {
      node: { id: node.id, type: node.type, title: node.title, icon: node.icon, intro: node.intro },
      chapter: publicChapter,
      index,
    };
  });

  return {
    levels: levels.map((level) => ({ ...level })),
    chapters: [...chapters.values()],
    flatNodes: publicNodes,
  };
}
