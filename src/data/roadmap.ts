// 学習マップ「必修ロード」の順路（最低限おさえたい知識を順番に）。
// slug は terms.ts の実データを指す。存在しない slug は LearningMap 側で除外する。

export interface RoadmapStage {
  title: string;
  subtitle: string;
  slugs: string[];
}

export const roadmap: RoadmapStage[] = [
  {
    title: "全体像をつかむ",
    subtitle: "そもそもWebはどう動いている？",
    slugs: ["frontend", "backend", "api", "dom"],
  },
  {
    title: "UIの超基本",
    subtitle: "まず名前を知りたい定番部品",
    slugs: ["button", "form", "modal", "toast"],
  },
  {
    title: "画面の骨組み",
    subtitle: "ページを組み立てるパーツ",
    slugs: ["header", "footer", "hamburger-menu", "card", "grid-layout"],
  },
  {
    title: "CSSの土台",
    subtitle: "配置と余白の考え方",
    slugs: ["flexbox", "margin", "padding", "responsive"],
  },
  {
    title: "仕上げの部品",
    subtitle: "使いこなせると一人前",
    slugs: ["tab", "accordion", "tooltip", "spinner", "toggle-switch"],
  },
];

// マップに載る全 slug（順路どおり）
export const roadmapSlugs: string[] = roadmap.flatMap((s) => s.slugs);
