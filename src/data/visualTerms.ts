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
  // 2026-07-18g フォーム・通知など（+10）
  "otp-input", "password-toggle", "action-sheet", "confirm-dialog", "step-indicator",
  "radio-card", "toast-stack", "search-history", "loading-bar", "chip-filter",
  // 2026-07-18h 表示・入力の細部（+10）
  "progress-ring", "avatar-stack", "read-more", "char-counter", "required-mark",
  "error-message", "rating-input", "switch-list", "sticky-cta", "badge-dot",
  // 2026-07-18i チャット・情報表示（+10）
  "chat-bubble", "typing-indicator", "cookie-banner", "announcement-bar", "dark-mode-toggle",
  "relative-time", "code-inline", "highlight-mark", "key-value-list", "view-count",
  // 2026-07-18j LP・メディア（+10）
  "quantity-stepper", "pricing-table", "testimonial", "social-icons", "loading-dots",
  "password-strength", "copy-button", "audio-player", "table-of-contents", "reading-progress",
  // 2026-07-18k グラフ・LP・状態（+10）
  "line-chart", "sparkline", "comparison-table", "feature-list", "coach-mark",
  "filter-panel", "back-button", "color-swatch", "offline-banner", "tag-cloud",
  // 2026-07-18l グラフ・状態・編集（+10）
  "area-chart", "heatmap", "checklist", "map-pin", "skeleton-loader",
  "maintenance-page", "currency-input", "onboarding-slides", "inline-edit", "list-group",
  // 2026-07-18m ログイン・EC・通知（+10）
  "social-login", "or-divider", "newsletter-signup", "logo-cloud", "rating-summary",
  "cart-summary", "avatar-upload", "notification-panel", "metric-row", "coupon-input",
  // 2026-07-18n SNS・EC・ゲーム（+10）
  "poll", "leaderboard", "receipt", "ticket", "hashtag",
  "wishlist", "profile-header", "points-badge", "pull-quote", "order-tracking",
  // 2026-07-19 概念用語の図解デモ（+23：すごろく中上級の用語を図鑑にも）
  "variable", "state", "git", "hash", "typescript", "fetch", "async", "deploy",
  "hosting", "array", "loop", "function", "argument", "return-value", "component",
  "props", "tailwind", "https", "xss", "ci", "seo", "ogp", "debug",
  // 2026-07-19b 残りの概念語（+4）でデモ100%達成
  "class", "framework", "library", "ux",
  // 2026-07-22 新カテゴリ「コマンド」バッチ1（シェル/Git/npm +45・共通ターミナルデモ）
  "cd", "ls", "pwd", "mkdir", "rm", "cp", "mv", "cat", "touch", "echo",
  "clear", "grep", "find", "head", "tail", "less", "chmod", "curl", "code-cmd", "exit",
  "git-init", "git-clone", "git-status", "git-add", "git-commit", "git-push", "git-pull",
  "git-branch", "git-checkout", "git-merge", "git-log", "git-diff", "git-stash",
  "git-remote", "git-fetch", "git-reset",
  "npm-install", "npm-init", "npm-run", "npm-start", "npm-build", "npx", "node-run",
  "npm-uninstall", "npm-update",
  // 2026-07-22 コマンド バッチ2（ネットワーク/Docker/プロセス/テキスト処理/Git追加 +43）
  "ssh", "ping", "scp", "wget", "yarn", "pnpm", "pip-install", "python-run",
  "docker-run", "docker-ps", "docker-build", "docker-compose",
  "ps", "kill", "top", "whoami", "history", "sudo", "which", "export-cmd", "alias", "source",
  "wc", "sort", "uniq", "diff", "tar", "zip-cmd", "unzip", "ln", "tree", "open-cmd",
  "git-rebase", "git-cherry-pick", "git-tag", "git-config", "git-revert", "git-restore",
  "pipe", "redirect", "env-cmd", "cron",
  // 2026-07-22 コマンド バッチ3（開発ツールCLI/パッケージ管理/Git補助/診断 +28）
  "vercel", "gh", "eslint", "prettier", "tsc-cmd", "vite", "jest", "vitest", "playwright-cmd",
  "make", "brew", "apt", "choco", "winget", "nvm", "npm-list", "npm-audit",
  "git-clean", "git-blame", "git-show", "git-bisect",
  "netstat", "lsof", "df", "du", "man", "help-cmd", "traceroute",
];

const set = new Set(VISUAL_SLUGS);

/** その用語に実物デモ（視覚説明）があるか */
export function hasVisual(slug: string): boolean {
  return set.has(slug);
}
