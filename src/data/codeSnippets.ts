// 図鑑デモの「この見た目のコード」。初心者がHTML/CSSに入門できるよう、
// コピペして動く最小の例を用意する（デモがある用語の一部に対応）。
// キーは terms.ts の slug。

export const codeSnippets: Record<string, string> = {
  button: `<style>
.btn {
  background: #1fc866; color: #fff;
  padding: 10px 20px; border: none;
  border-radius: 8px; font-weight: bold; cursor: pointer;
}
.btn:hover { filter: brightness(1.05); }
</style>

<button class="btn">送信する</button>`,

  card: `<style>
.card {
  width: 220px; background: #fff; border-radius: 12px;
  overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.card img { width: 100%; height: 110px; object-fit: cover; }
.card .body { padding: 12px; }
</style>

<div class="card">
  <img src="photo.jpg" alt="">
  <div class="body">
    <h3>商品名</h3>
    <p>かんたんな説明テキスト</p>
  </div>
</div>`,

  flexbox: `<style>
.row { display: flex; gap: 8px; }
.row > div {
  flex: 1; padding: 16px;
  background: #e0f2fe; text-align: center;
}
</style>

<div class="row">
  <div>A</div>
  <div>B</div>
  <div>C</div>
</div>`,

  "grid-layout": `<style>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.grid > div { padding: 20px; background: #ede9fe; text-align: center; }
</style>

<div class="grid">
  <div>1</div><div>2</div><div>3</div>
  <div>4</div><div>5</div><div>6</div>
</div>`,

  badge: `<style>
.badge { position: relative; display: inline-block; font-size: 22px; }
.badge .count {
  position: absolute; top: -6px; right: -8px;
  background: #ef4444; color: #fff; font-size: 11px; font-weight: bold;
  min-width: 18px; height: 18px; line-height: 18px;
  border-radius: 9px; text-align: center;
}
</style>

<span class="badge">
  🔔
  <span class="count">3</span>
</span>`,

  tooltip: `<style>
.tip { position: relative; display: inline-block; border-bottom: 1px dotted #888; }
.tip .text {
  visibility: hidden; position: absolute; bottom: 130%; left: 50%;
  transform: translateX(-50%);
  background: #333; color: #fff; padding: 4px 8px;
  border-radius: 6px; font-size: 12px; white-space: nowrap;
}
.tip:hover .text { visibility: visible; }
</style>

<span class="tip">
  ヘルプ
  <span class="text">これは説明です</span>
</span>`,

  breadcrumb: `<style>
.crumb { display: flex; gap: 6px; font-size: 13px; color: #666; }
.crumb a { color: #1fc866; text-decoration: none; }
</style>

<nav class="crumb">
  <a href="/">ホーム</a> ›
  <a href="/list">商品一覧</a> ›
  <span>詳細</span>
</nav>`,

  avatar: `<style>
.avatar {
  width: 48px; height: 48px; border-radius: 50%;
  object-fit: cover; border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.2);
}
</style>

<img class="avatar" src="user.jpg" alt="ユーザー">`,

  spinner: `<style>
.spinner {
  width: 32px; height: 32px;
  border: 4px solid #e5e7eb; border-top-color: #1fc866;
  border-radius: 50%; animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>

<div class="spinner"></div>`,

  "progress-bar": `<style>
.bar { height: 10px; background: #e5e7eb; border-radius: 5px; overflow: hidden; }
.bar > span { display: block; height: 100%; width: 60%; background: #1fc866; }
</style>

<div class="bar"><span></span></div>`,

  blockquote: `<style>
blockquote {
  margin: 0; padding: 8px 16px;
  border-left: 4px solid #1fc866;
  background: #f0fdf4; color: #555; font-style: italic;
}
</style>

<blockquote>名前がわかれば、調べられる。</blockquote>`,

  accordion: `<!-- JavaScript不要。details / summary だけで開閉できる -->
<details>
  <summary>よくある質問：料金は？</summary>
  <p>無料で使えます。VIPは月額です。</p>
</details>`,

  header: `<style>
.header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 20px; background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.08);
}
.header nav a { margin-left: 16px; text-decoration: none; color: #333; }
</style>

<header class="header">
  <strong>ロゴ</strong>
  <nav>
    <a href="#">ホーム</a>
    <a href="#">図鑑</a>
  </nav>
</header>`,

  footer: `<style>
.footer {
  padding: 24px; background: #1f2937; color: #cbd5e1;
  text-align: center; font-size: 13px;
}
.footer a { color: #93c5fd; }
</style>

<footer class="footer">
  © 2026 Co-Cre　<a href="#">規約</a>・<a href="#">プライバシー</a>
</footer>`,

  chip: `<style>
.chip {
  display: inline-flex; align-items: center; gap: 4px;
  background: #eff6ff; color: #1d4ed8;
  padding: 4px 10px; border-radius: 999px; font-size: 13px;
}
.chip button { border: none; background: none; color: #60a5fa; cursor: pointer; }
</style>

<span class="chip">React <button>×</button></span>`,

  pagination: `<style>
.pager { display: flex; gap: 4px; }
.pager a {
  padding: 6px 10px; border: 1px solid #ddd; border-radius: 6px;
  text-decoration: none; color: #333; font-size: 13px;
}
.pager a.active { background: #1fc866; color: #fff; border-color: #1fc866; }
</style>

<nav class="pager">
  <a href="#">‹</a>
  <a href="#" class="active">1</a>
  <a href="#">2</a>
  <a href="#">3</a>
  <a href="#">›</a>
</nav>`,

  "hamburger-menu": `<style>
.hamburger {
  width: 28px; display: flex; flex-direction: column; gap: 5px; cursor: pointer;
}
.hamburger span { height: 3px; background: #333; border-radius: 2px; }
</style>

<div class="hamburger">
  <span></span><span></span><span></span>
</div>`,
};
