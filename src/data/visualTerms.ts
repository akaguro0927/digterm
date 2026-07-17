// 「実物デモ（視覚的な説明）がある用語」のslug一覧。
// 図鑑には視覚説明のある用語だけを表示する方針のため、ここを唯一の定義とする。
// ※ src/components/LiveExample.tsx の `demos` オブジェクトのキーと一致させること
//   （デモを増やしたら、この配列にも slug を追加する）。

export const VISUAL_SLUGS: readonly string[] = [
  // UI部品
  "button", "modal", "toast", "accordion", "carousel", "hamburger-menu",
  "breadcrumb", "tab", "dropdown", "pagination", "tooltip", "checkbox",
  "radio-button", "toggle-switch", "badge", "spinner", "skeleton-screen",
  "placeholder", "fab", "avatar", "tag", "progress-bar", "search-bar", "drawer",
  // レイアウト
  "header", "footer", "sidebar", "hero-section", "card", "grid-layout",
  "global-navigation", "first-view", "cta", "form", "section", "wrapper",
  // HTML/CSS
  "flexbox", "margin", "padding", "hover", "z-index", "border-radius",
  "box-shadow", "transition", "responsive",
  // 開発用語（図解）
  "api", "dom", "frontend", "backend",
  // 2026-07-17 追加バッチ（既存用語にデモを実装）
  "stepper", "rating", "segmented-control", "popover", "kebab-menu", "banner",
  "bottom-sheet", "lightbox", "date-picker", "range-slider", "divider", "gradient",
  "opacity", "aspect-ratio", "display", "transform", "color-code", "line-height",
  "empty-state", "notification", "overflow", "css-animation",
  // 2026-07-17 バックエンド新カテゴリ（図解デモつき）
  "server", "database", "sql", "authentication", "jwt", "endpoint",
  "session", "request-response",
  // バックエンド拡充（+6）
  "authorization", "cors", "api-key", "environment", "webhook", "orm",
  // 2026-07-17b フロント用語デモ追加バッチ（+15）
  "context-menu", "breakpoint", "box-model", "sticky-header", "viewport",
  "rem-em", "font-family", "whitespace", "gutter", "semantic-html",
  "z-pattern", "pseudo-class", "pseudo-element", "masonry", "bento-grid",
  // 2026-07-17c 追加（+4）
  "validation", "event", "http-status", "favicon",
  // 2026-07-17d 図解デモ追加（+5）
  "markup", "json", "console", "cache", "cookie",
  // 2026-07-17 バッチ3（残りのデモ化 +12）
  "media-query", "position", "infinite-scroll", "lazy-loading", "not-found-page",
  "wireframe", "mockup", "lp", "accessibility", "css-variable", "specificity", "rest-api",
  // 2026-07-17 バッチ4（+8）
  "vendor-prefix", "ssr-csr", "local-storage", "environment-variable", "cdn", "bundler", "npm", "reset-css",
  // 2026-07-17 新規UI用語（+8）
  "timeline", "chip", "data-table", "blockquote", "stat-card", "floating-label", "command-palette", "kbd",
  // 2026-07-18 新規UI用語（+7）
  "alert", "snackbar", "bottom-navigation", "split-button", "like-button", "dropdown-menu", "file-upload",
  // 2026-07-18b フォーム・データ表示など（+10）
  "text-field", "select", "autocomplete", "color-picker", "calendar",
  "notification-bell", "status-dot", "countdown", "price-tag", "bar-chart",
  // 2026-07-18c データ表示・操作など（+9）
  "qr-code", "kanban", "drag-and-drop", "back-to-top", "coupon",
  "gauge", "donut-chart", "video-player", "link-text",
  // 2026-07-18d 視覚・操作（+10）
  "gallery", "thumbnail", "toolbar", "mega-menu", "animation",
  "hover-effect", "review-star", "comment-box", "tag-input", "sort-button",
  // 2026-07-18e オーバーレイ・ボタン類（+10）
  "overlay", "close-button", "share-button", "bookmark-button", "follow-button",
  "tree-view", "callout", "ribbon", "text-shadow", "heading",
  // 2026-07-18f 入力・表示（+8）
  "transition-effect", "collapse", "watermark", "multi-select",
  "time-picker", "scrollbar", "speed-dial", "paragraph",
];

const set = new Set(VISUAL_SLUGS);

/** その用語に実物デモ（視覚説明）があるか */
export function hasVisual(slug: string): boolean {
  return set.has(slug);
}
