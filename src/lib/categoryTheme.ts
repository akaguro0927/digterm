import type { Category } from "@/data/terms";
import type { IconName } from "@/components/icons";

// カテゴリごとのビジュアルテーマ（Tailwindはクラス名を静的解析するため文字列を完全な形で持つ）
export interface CategoryTheme {
  icon: IconName;
  label: string;
  tile: string; // アイコンタイルの背景
  tileText: string; // タイル上のアイコン色
  chip: string; // バッジ・チップ
  text: string;
  ring: string; // カードhover時の輪郭
  gradient: string; // 見出し帯など
}

export const categoryTheme: Record<Category, CategoryTheme> = {
  ui: {
    icon: "component",
    label: "UI部品",
    tile: "bg-violet-50",
    tileText: "text-violet-600",
    chip: "bg-violet-100 text-violet-700",
    text: "text-violet-600",
    ring: "hover:ring-violet-300",
    gradient: "from-violet-500 to-purple-500",
  },
  layout: {
    icon: "layout",
    label: "レイアウト",
    tile: "bg-sky-50",
    tileText: "text-sky-600",
    chip: "bg-sky-100 text-sky-700",
    text: "text-sky-600",
    ring: "hover:ring-sky-300",
    gradient: "from-sky-500 to-cyan-500",
  },
  htmlcss: {
    icon: "droplet",
    label: "HTML/CSS",
    tile: "bg-pink-50",
    tileText: "text-pink-600",
    chip: "bg-pink-100 text-pink-700",
    text: "text-pink-600",
    ring: "hover:ring-pink-300",
    gradient: "from-pink-500 to-rose-500",
  },
  dev: {
    icon: "terminal",
    label: "開発用語",
    tile: "bg-emerald-50",
    tileText: "text-emerald-600",
    chip: "bg-emerald-100 text-emerald-700",
    text: "text-emerald-600",
    ring: "hover:ring-emerald-300",
    gradient: "from-emerald-500 to-teal-500",
  },
  backend: {
    icon: "database",
    label: "バックエンド",
    tile: "bg-indigo-50",
    tileText: "text-indigo-600",
    chip: "bg-indigo-100 text-indigo-700",
    text: "text-indigo-600",
    ring: "hover:ring-indigo-300",
    gradient: "from-indigo-500 to-violet-500",
  },
  command: {
    icon: "terminal",
    label: "コマンド",
    tile: "bg-slate-100",
    tileText: "text-slate-700",
    chip: "bg-slate-200 text-slate-700",
    text: "text-slate-700",
    ring: "hover:ring-slate-400",
    gradient: "from-slate-700 to-slate-900",
  },
};

export const levelTheme: Record<number, { label: string; chip: string; dots: string }> = {
  1: { label: "初級", chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dots: "●○○" },
  2: { label: "中級", chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", dots: "●●○" },
  3: { label: "上級", chip: "bg-rose-50 text-rose-700 ring-1 ring-rose-200", dots: "●●●" },
};
