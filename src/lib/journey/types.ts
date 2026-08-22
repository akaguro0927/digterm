import type { IconName } from "@/components/icons";

/** 本文・設問を含まない、一覧と進捗表示だけに使う学習カタログ。 */
export type PublicCourseLevel = "beginner" | "intermediate" | "advanced";
export type PublicChapterAccess = "free" | "vip";

export interface PublicLevel {
  level: PublicCourseLevel;
  label: string;
  eyebrow: string;
  tagline: string;
}

export interface PublicChapter {
  id: string;
  title: string;
  subtitle: string;
  tint: string;
  chip: string;
  level: PublicCourseLevel;
  access: PublicChapterAccess;
}

export interface PublicNode {
  id: string;
  type: "lesson" | "test";
  title: string;
  icon: IconName;
  intro: string;
}

export interface PublicFlatNode {
  node: PublicNode;
  chapter: PublicChapter;
  index: number;
}

export interface PublicJourney {
  levels: PublicLevel[];
  chapters: PublicChapter[];
  flatNodes: PublicFlatNode[];
}
