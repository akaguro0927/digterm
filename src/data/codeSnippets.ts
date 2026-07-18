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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
    <path d="M10 21a2 2 0 0 0 4 0"/>
  </svg>
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

  modal: `<style>
.overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.4);
  display: grid; place-items: center;
}
.modal { width: 280px; background: #fff; border-radius: 12px; padding: 20px; }
.modal button {
  margin-top: 12px; padding: 8px 16px; border: none;
  border-radius: 8px; background: #1fc866; color: #fff; font-weight: bold; cursor: pointer;
}
</style>

<div class="overlay">
  <div class="modal">
    <h3>削除しますか？</h3>
    <p>この操作は取り消せません。</p>
    <button>削除する</button>
  </div>
</div>`,

  toast: `<style>
.toast {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  background: #1f2937; color: #fff; padding: 10px 18px;
  border-radius: 999px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,.2);
}
</style>

<div class="toast">保存しました</div>`,

  tab: `<!-- ラジオボタンだけでJSなしのタブ -->
<style>
.tabs input { display: none; }
.tabs label {
  display: inline-block; padding: 8px 14px; cursor: pointer; color: #666;
}
.tabs input:checked + label {
  color: #1fc866; border-bottom: 2px solid #1fc866;
}
</style>

<div class="tabs">
  <input type="radio" name="t" id="t1" checked><label for="t1">概要</label>
  <input type="radio" name="t" id="t2"><label for="t2">レビュー</label>
</div>`,

  "text-field": `<style>
.field { display: flex; flex-direction: column; gap: 4px; font-size: 14px; }
.field input {
  padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px;
}
.field input:focus { outline: none; border-color: #1fc866; }
</style>

<label class="field">
  お名前
  <input type="text" placeholder="山田 太郎">
</label>`,

  checkbox: `<style>
.check { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
.check input { width: 18px; height: 18px; accent-color: #1fc866; }
</style>

<label class="check">
  <input type="checkbox" checked>
  利用規約に同意する
</label>`,

  "toggle-switch": `<style>
.switch { position: relative; display: inline-block; width: 46px; height: 26px; }
.switch input { display: none; }
.slider {
  position: absolute; inset: 0; background: #cbd5e1;
  border-radius: 999px; transition: .2s;
}
.slider::before {
  content: ""; position: absolute; width: 20px; height: 20px;
  left: 3px; top: 3px; background: #fff; border-radius: 50%; transition: .2s;
}
.switch input:checked + .slider { background: #1fc866; }
.switch input:checked + .slider::before { transform: translateX(20px); }
</style>

<label class="switch">
  <input type="checkbox" checked>
  <span class="slider"></span>
</label>`,

  alert: `<style>
.alert {
  padding: 12px 14px; border-radius: 8px; font-size: 14px;
  background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca;
}
</style>

<div class="alert">
  <strong>エラー：</strong>入力に誤りがあります。
</div>`,

  divider: `<style>
.divider { display: flex; align-items: center; gap: 12px; color: #9ca3af; font-size: 13px; }
.divider::before, .divider::after {
  content: ""; flex: 1; height: 1px; background: #e5e7eb;
}
</style>

<div class="divider">または</div>`,

  rating: `<style>
.stars { font-size: 22px; letter-spacing: 2px; }
.stars .on { color: #f59e0b; }
.stars .off { color: #d1d5db; }
</style>

<div class="stars">
  <span class="on">★</span><span class="on">★</span><span class="on">★</span><span class="off">★</span><span class="off">★</span>
</div>`,

  "stat-card": `<style>
.stat {
  width: 160px; padding: 16px; background: #fff; border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}
.stat .label { font-size: 13px; color: #6b7280; }
.stat .value { font-size: 28px; font-weight: bold; color: #111827; }
.stat .up { font-size: 12px; color: #1fc866; }
</style>

<div class="stat">
  <div class="label">今月の売上</div>
  <div class="value">¥128,000</div>
  <div class="up">▲ 12%</div>
</div>`,

  "skeleton-loader": `<style>
.skel { width: 220px; }
.skel div {
  height: 12px; border-radius: 6px; margin-bottom: 8px;
  background: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200% 100%; animation: shimmer 1.2s infinite;
}
.skel .short { width: 60%; }
@keyframes shimmer { to { background-position: -200% 0; } }
</style>

<div class="skel">
  <div></div><div></div><div class="short"></div>
</div>`,

  "segmented-control": `<style>
.seg { display: inline-flex; background: #f1f5f9; border-radius: 999px; padding: 3px; }
.seg button {
  border: none; background: none; padding: 6px 16px;
  border-radius: 999px; font-size: 13px; cursor: pointer; color: #475569;
}
.seg button.active { background: #fff; color: #111827; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
</style>

<div class="seg">
  <button class="active">日</button>
  <button>週</button>
  <button>月</button>
</div>`,

  select: `<style>
.field { display: flex; flex-direction: column; gap: 4px; font-size: 14px; }
.field select {
  padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff;
}
</style>

<label class="field">
  都道府県
  <select>
    <option>東京都</option>
    <option>大阪府</option>
    <option>福岡県</option>
  </select>
</label>`,

  "radio-button": `<style>
.radios label { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; }
.radios input { width: 18px; height: 18px; accent-color: #1fc866; }
</style>

<div class="radios">
  <label><input type="radio" name="plan" checked>無料プラン</label>
  <label><input type="radio" name="plan">VIPプラン</label>
</div>`,

  "range-slider": `<style>
.range { width: 220px; accent-color: #1fc866; }
</style>

<input class="range" type="range" min="0" max="100" value="60">`,

  banner: `<style>
.banner {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: #1fc866; color: #fff; font-size: 14px;
}
.banner button {
  border: none; background: rgba(255,255,255,.2); color: #fff;
  padding: 6px 12px; border-radius: 6px; cursor: pointer;
}
</style>

<div class="banner">
  <span>いまなら初月無料キャンペーン中！</span>
  <button>詳しく</button>
</div>`,

  "price-tag": `<style>
.price .cur { font-size: 14px; color: #6b7280; }
.price .num { font-size: 32px; font-weight: bold; color: #111827; }
.price .unit { font-size: 13px; color: #6b7280; }
.price .old { font-size: 13px; color: #9ca3af; text-decoration: line-through; margin-left: 6px; }
</style>

<div class="price">
  <span class="cur">¥</span><span class="num">980</span><span class="unit">/月</span>
  <span class="old">¥1,480</span>
</div>`,

  kbd: `<style>
kbd {
  font-family: monospace; font-size: 13px;
  background: #f3f4f6; border: 1px solid #d1d5db; border-bottom-width: 2px;
  border-radius: 6px; padding: 2px 7px;
}
</style>

保存するには <kbd>Ctrl</kbd> + <kbd>S</kbd>`,

  callout: `<style>
.callout {
  padding: 14px 16px; background: #eff6ff;
  border-left: 4px solid #3b82f6; border-radius: 8px;
  font-size: 14px; color: #1e3a8a;
}
</style>

<div class="callout">
  <strong>ヒント：</strong>ショートカットを使うと速く操作できます。
</div>`,

  "back-to-top": `<style>
.totop {
  position: fixed; right: 20px; bottom: 20px;
  width: 44px; height: 44px; border-radius: 50%;
  background: #1fc866; color: #fff; border: none; cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,.2); font-size: 18px;
}
</style>

<a href="#top"><button class="totop">↑</button></a>`,

  "close-button": `<style>
.close {
  width: 32px; height: 32px; border-radius: 50%;
  border: none; background: #f1f5f9; color: #475569;
  font-size: 18px; cursor: pointer;
}
.close:hover { background: #e2e8f0; }
</style>

<button class="close" aria-label="閉じる">×</button>`,

  "list-group": `<style>
.list {
  list-style: none; margin: 0; padding: 0; width: 220px;
  border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden;
}
.list li { padding: 12px 14px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
.list li:last-child { border-bottom: none; }
</style>

<ul class="list">
  <li>プロフィール</li>
  <li>お知らせ</li>
  <li>設定</li>
</ul>`,

  "link-text": `<style>
.link { color: #1fc866; text-decoration: none; }
.link:hover { text-decoration: underline; }
</style>

くわしくは <a class="link" href="#">こちら</a> をご覧ください。`,

  heading: `<style>
h1 { font-size: 28px; margin: 0 0 4px; color: #111827; }
.lead { color: #6b7280; font-size: 14px; margin: 0; }
</style>

<h1>ページの見出し</h1>
<p class="lead">補足のリード文がここに入ります。</p>`,

  "empty-state": `<style>
.empty { text-align: center; padding: 32px; color: #9ca3af; }
.empty .circle {
  width: 56px; height: 56px; margin: 0 auto 12px;
  border-radius: 50%; background: #f3f4f6;
}
.empty p { margin: 0; font-size: 14px; }
</style>

<div class="empty">
  <div class="circle"></div>
  <p>まだ何もありません</p>
</div>`,

  notification: `<style>
.notif {
  display: flex; gap: 10px; width: 260px; padding: 12px;
  background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.notif .dot { width: 8px; height: 8px; margin-top: 6px; border-radius: 50%; background: #1fc866; }
.notif .title { font-size: 14px; font-weight: bold; }
.notif .time { font-size: 12px; color: #9ca3af; }
</style>

<div class="notif">
  <span class="dot"></span>
  <div>
    <div class="title">新しいコメントが届きました</div>
    <div class="time">たった今</div>
  </div>
</div>`,

  snackbar: `<style>
.snack {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  width: 300px; padding: 12px 16px; background: #1f2937; color: #fff;
  border-radius: 8px; font-size: 14px;
}
.snack button { border: none; background: none; color: #6ee7b7; font-weight: bold; cursor: pointer; }
</style>

<div class="snack">
  <span>削除しました</span>
  <button>元に戻す</button>
</div>`,

  "split-button": `<style>
.split { display: inline-flex; }
.split .main, .split .more {
  border: none; background: #1fc866; color: #fff; padding: 8px 14px; cursor: pointer;
}
.split .main { border-radius: 8px 0 0 8px; font-weight: bold; }
.split .more { border-radius: 0 8px 8px 0; border-left: 1px solid rgba(255,255,255,.3); }
</style>

<div class="split">
  <button class="main">保存</button>
  <button class="more">▾</button>
</div>`,

  "like-button": `<style>
.like {
  display: inline-flex; align-items: center; gap: 6px;
  border: 1px solid #fecaca; background: #fef2f2; color: #ef4444;
  padding: 6px 12px; border-radius: 999px; font-size: 14px; cursor: pointer;
}
</style>

<button class="like">♥ 128</button>`,

  "file-upload": `<style>
.drop {
  width: 260px; padding: 28px; text-align: center;
  border: 2px dashed #cbd5e1; border-radius: 12px; color: #6b7280; font-size: 14px;
}
.drop input { display: none; }
.drop label { color: #1fc866; font-weight: bold; cursor: pointer; }
</style>

<div class="drop">
  ここにドラッグ、または
  <label for="f">ファイルを選択</label>
  <input id="f" type="file">
</div>`,

  "char-counter": `<style>
.counter { width: 240px; }
.counter textarea { width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px; }
.counter .num { text-align: right; font-size: 12px; color: #9ca3af; }
</style>

<div class="counter">
  <textarea rows="2">こんにちは</textarea>
  <div class="num">5 / 140</div>
</div>`,

  "required-mark": `<style>
.label { font-size: 14px; font-weight: bold; }
.req { color: #ef4444; margin-left: 4px; font-size: 12px; }
</style>

<label class="label">メールアドレス<span class="req">必須</span></label>`,

  "error-message": `<style>
.err-field input { border: 1px solid #ef4444; border-radius: 8px; padding: 8px 10px; width: 220px; }
.err-msg { margin-top: 4px; color: #ef4444; font-size: 12px; }
</style>

<div class="err-field">
  <input type="email" value="bad-email">
  <p class="err-msg">正しいメールアドレスを入力してください</p>
</div>`,

  "status-dot": `<style>
.status { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; }
.status .dot { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; }
</style>

<span class="status"><span class="dot"></span>オンライン</span>`,

  thumbnail: `<style>
.thumbs { display: flex; gap: 8px; }
.thumbs img {
  width: 56px; height: 56px; object-fit: cover; border-radius: 8px;
  border: 2px solid transparent; cursor: pointer;
}
.thumbs img.active { border-color: #1fc866; }
</style>

<div class="thumbs">
  <img class="active" src="1.jpg" alt="">
  <img src="2.jpg" alt="">
  <img src="3.jpg" alt="">
</div>`,

  toolbar: `<style>
.toolbar {
  display: inline-flex; gap: 2px; background: #f8fafc;
  border: 1px solid #e2e8f0; border-radius: 8px; padding: 4px;
}
.toolbar button {
  border: none; background: none; width: 32px; height: 32px;
  border-radius: 6px; cursor: pointer;
}
.toolbar button:hover { background: #e2e8f0; }
</style>

<div class="toolbar">
  <button style="font-weight:bold">B</button>
  <button style="font-style:italic">I</button>
  <button style="text-decoration:underline">U</button>
</div>`,
};
