# CLAUDE.md — Co-Cre（コクリ）

フロントエンド用語・UI部品名を実例つきで学べる「図鑑×問題集」アプリ。サブスクで収益化する。
- 正式名称: **Co-Cre**（旧仮称「コード図鑑」）／ ブランドカラー: 緑 #40DC7E
- ロゴ: `public/logo_full.png`（ワードマーク）, `public/logo_mark.png`（CCシンボル）, `src/app/icon.png`（ファビコン）
- デザイン言語: 紙の図鑑をイメージ（背景 #faf8f2、`card-pop`=2px枠+ベタ影、`btn-3d`=Duolingo式の押せるボタン）。絵文字は使わず `src/components/icons.tsx` のSVGで統一。

## ドキュメント構成（親子MD）
- 親: [docs/00_要件定義書.md](docs/00_要件定義書.md) — 全体像・スコープ・要確認事項はここから読む
- 子: docs/01〜08 に機能・非機能・画面・データ・課金・問題集・技術スタック・ローカル保存/移行の詳細

## 開発ルール
- 仕様に関わる変更をしたら、対応する docs/ の子ドキュメントも更新する
- 用語・UIの文言は日本語（ターゲットは日本の初心者学習者）
- 有料コンテンツの出し分けは必ずサーバー側で判定する（クライアント側で隠すだけは禁止）
- 未決事項は docs/00_要件定義書.md の「要確認事項」表に追記し、勝手に確定しない

## 技術スタック（予定・詳細は docs/07）
Next.js + TypeScript + Tailwind / Supabase（Auth・DB・Storage）/ Stripe / デプロイは Cloud Run または Vercel

## 現在のフェーズ
M1（図鑑プロトタイプ）完了。問題集4モード・実力試験・**学習マップ（/map）**・**ストーリー型すごろく学習（/learn）**・**初回ガイドツアー**を実装済み。
お気に入り／学習記録／既読は**端末ローカル（localStorage）に先行実装**（キー不要・ローカルファースト。詳細は docs/08）。
- **図鑑に表示するのは「実物デモがある用語」だけ**（`src/data/visualTerms.ts`、現在49語。データ自体は124語で、非表示分も詳細ページ直リンクは可）
- 触れる実例（LiveExample）は緑枠＋LIVEバッジで「触れるゾーン」と区別
- 検索はあいまい一致＋「もしかして？」候補（`src/lib/search.ts`）
- クイズ結果に「この回の振り返り（全問）」＋♡保存。実力試験は押した瞬間に○×
- 学習マップ: 必修ロード（`src/data/roadmap.ts`）をDuolingo風の道のりで。達成度は用語詳細の既読（`cocre:seen:v1`）で進む
- オンボーディング: **スポットライト型ガイドツアー**（`GuidedTour.tsx`）。実要素（ヘッダーnavの`data-tour`）を暗転の中で光らせ、矢印付き吹き出しで説明。初回自動＋フッター/ヘルプ（`cocre:open-tutorial`イベント）から再生、`cocre:tour-done:v1`で初回判定

**M2着手中（2026-07-16）**: Supabase接続済み（`.env.local`にURL+anonキー、git管理外）。`@supabase/supabase-js`導入、`src/lib/supabase/client.ts`(getSupabaseClient)・`AuthProvider.tsx`(useAuth)実装。**ログイン/新規登録(/login)・ログアウト(ヘッダーAuthNav)稼働**（メール+パスワード。Google未設定）。接続テスト済み(auth OK)。
- 残: (1)`supabase/schema.sql`をSupabase SQL Editorで実行（profiles等の表がまだ無い）→(2)お気に入り/既読/成績をSupabaseに保存＋初回ログイン時ローカルからマージ移行→(3)M4 Stripe課金。
- service_role(secret)キーはチャット露出のため要再生成。今は未使用。
