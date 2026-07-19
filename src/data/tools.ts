import type { IconName } from "@/components/icons";

// ⚠️ 時点依存コンテンツ（docs/11 に登録）。固有名詞・おすすめは古くなるので LAST_UPDATED を必ず更新すること。
// 公式URLは安定。affiliateUrl を入れると各カードのボタンがアフィリエイトリンクに切り替わる（未設定なら公式サイトへ）。
export const TOOLS_LAST_UPDATED = "2026-07-19";

export type CostTag = "free" | "freemium" | "paid";

export interface Tool {
  name: string;
  tagline: string;
  icon: IconName;
  cost: CostTag;
  ja: boolean; // 日本語が快適に使えるか
  strengths: string[];
  officialUrl: string;
  affiliateUrl?: string; // オーナーが用意したら入れる（優先してリンクされる）
  recommended?: boolean; // 「まずはこれ」バッジ
}

export interface ToolGroup {
  key: string;
  title: string;
  lead: string;
  tools: Tool[];
}

export const COST_LABEL: Record<CostTag, string> = {
  free: "無料",
  freemium: "無料枠あり",
  paid: "有料",
};

export const TOOL_GROUPS: ToolGroup[] = [
  {
    key: "editor",
    title: "コードを書く道具（エディタ）",
    lead: "まず1つ入れるならエディタ。文章でいうノートのようなもの。",
    tools: [
      {
        name: "VS Code",
        tagline: "世界で一番使われている無料エディタ",
        icon: "monitor",
        cost: "free",
        ja: true,
        strengths: ["無料でずっと使える", "拡張機能が豊富", "日本語化できる", "情報・チュートリアルが多い"],
        officialUrl: "https://code.visualstudio.com/",
        recommended: true,
      },
      {
        name: "Cursor",
        tagline: "AIが最初から組み込まれたエディタ（VS Codeベース）",
        icon: "zap",
        cost: "freemium",
        ja: true,
        strengths: ["AIに相談しながら書ける", "VS Codeの操作感そのまま", "無料枠あり"],
        officialUrl: "https://www.cursor.com/",
      },
    ],
  },
  {
    key: "chat",
    title: "相談・下書きにつかうAI（対話型）",
    lead: "「こういうの作りたい」を相談したり、コードの下書き・エラーの相談に。",
    tools: [
      {
        name: "ChatGPT",
        tagline: "万能な対話AIの定番（OpenAI）",
        icon: "message",
        cost: "freemium",
        ja: true,
        strengths: ["日本語が自然", "無料枠あり", "使い方の情報が多い"],
        officialUrl: "https://chatgpt.com/",
        recommended: true,
      },
      {
        name: "Claude",
        tagline: "長文とコードに強い対話AI（Anthropic）",
        icon: "book-open",
        cost: "freemium",
        ja: true,
        strengths: ["長い文章・コードの扱いが得意", "説明がていねい", "無料枠あり"],
        officialUrl: "https://claude.ai/",
      },
      {
        name: "Gemini",
        tagline: "Google連携が強い対話AI",
        icon: "search",
        cost: "freemium",
        ja: true,
        strengths: ["Googleのサービスと相性が良い", "無料枠あり"],
        officialUrl: "https://gemini.google.com/",
      },
    ],
  },
  {
    key: "assist",
    title: "コードを直接手伝ってもらう（補完・エージェント）",
    lead: "エディタの中で書きながら補完してもらう／作業そのものを任せる、一歩進んだ使い方。",
    tools: [
      {
        name: "GitHub Copilot",
        tagline: "エディタの中でコードを補完してくれる相棒",
        icon: "code",
        cost: "freemium",
        ja: true,
        strengths: ["書いている途中に続きを提案", "VS Codeに入れられる", "学生は無料になる場合あり"],
        officialUrl: "https://github.com/features/copilot",
      },
      {
        name: "Claude Code",
        tagline: "ターミナルで動くエージェント型（このアプリもこれで開発）",
        icon: "terminal",
        cost: "paid",
        ja: true,
        strengths: ["複数ファイルの作業を任せられる", "調べて直すまで一気にやる"],
        officialUrl: "https://www.claude.com/product/claude-code",
      },
    ],
  },
];

// 初心者向けの「まずこの組み合わせ」
export const STARTER_PICK = {
  title: "迷ったら、まずこの2つ",
  body: "「VS Code（エディタ）」＋「対話AIを1つ（ChatGPT か Claude）」。この2つがあれば、書く・相談するの両方ができる。慣れてきたら Copilot などを足していこう。",
};
