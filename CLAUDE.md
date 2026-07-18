# CLAUDE.md — Co-Cre（コクリ）

フロントエンド用語・UI部品名を実例つきで学べる「図鑑×問題集」アプリ。サブスクで収益化する。
- 正式名称: **Co-Cre**（旧仮称「コード図鑑」）／ ブランドカラー: 緑 #40DC7E
- ロゴ: `public/logo_full.png`（ワードマーク）, `public/logo_mark.png`（CCシンボル）, `src/app/icon.png`（ファビコン）
- デザイン言語: 紙の図鑑をイメージ（背景 #faf8f2、`card-pop`=2px枠+ベタ影、`btn-3d`=Duolingo式の押せるボタン）。絵文字は使わず `src/components/icons.tsx` のSVGで統一。

## ドキュメント構成（親子MD）
- 親: [docs/00_要件定義書.md](docs/00_要件定義書.md) — 全体像・スコープ・要確認事項はここから読む
- 子: docs/01〜08 に機能・非機能・画面・データ・課金・問題集・技術スタック・ローカル保存/移行の詳細
- **[docs/09_開発進捗ログ.md](docs/09_開発進捗ログ.md)**: 直近の実装の完了リストと、次にやる候補（バックログ）。作業の続きはここを見る／更新する

## 開発ルール
- 仕様に関わる変更をしたら、対応する docs/ の子ドキュメントも更新する
- 用語・UIの文言は日本語（ターゲットは日本の初心者学習者）
- 有料コンテンツの出し分けは必ずサーバー側で判定する（クライアント側で隠すだけは禁止）
- 未決事項は docs/00_要件定義書.md の「要確認事項」表に追記し、勝手に確定しない

## 技術スタック（予定・詳細は docs/07）
Next.js + TypeScript + Tailwind / Supabase（Auth・DB・Storage）/ Stripe / デプロイは Cloud Run または Vercel

## 現在のフェーズ
M1（図鑑プロトタイプ）完了。問題集4モード・実力試験・**ストーリー型すごろく学習（/learn）**・**初回ガイドツアー**を実装済み。
- **学習は3レベルのコース制**（`src/data/journey.ts`・現在29章/117ノード=レッスン87+テスト30）: 初級 c1〜c6（無料）／中級 b1・m1（無料お試し）＋m2〜m11（VIP）／上級 a1〜a11・a3（VIP）。章に `level`・`access` を持ち、ロックは `isChapterAccessible()`／`useHasPaidAccess()` で判定（詳細は docs/05）。中上級コンテンツがVIPの主軸。**章の並びは `chapters` 配列の順で決まる**（id順ではない。例: 中級は …m3→m9→m4→m10→m5→m6→m11→m7→m8、上級は a1→a2→a4→a5→a6→a7→a8→a9→a10→a11→a3）。**a3(AI)が全体の最終章**。章を挿入したら前章テストの `deepDive`（次章への橋渡し文）を更新すること。
- 各レッスンは `story`(物語)＋`takeaways`＋任意の `codeSample`(写経・CodeBlock)＋`practice`(ミニ1問)＋`relatedSlugs`(図鑑への相互リンク)。テストは `deepDive`(合格後の深掘り)を持ち、合格で `awards.ts` のバッジ獲得（TestViewが差分表示）。コース目次は `/curriculum`。
- **story本文の図鑑リンクは自動**（`src/lib/linkify.tsx` の `linkifyStory`）：誤検出防止のため対象を各レッスンの `relatedSlugs` に限定し、用語名（nameJa＋aliases）が本文に出た最初の1回だけ図鑑へ（新タブ）リンクする。手動でリンクを埋め込む必要はない。`MascotTeacher.lines` は `ReactNode[]`。
- **旧「図鑑の必修コース(roadmap)」は廃止**し、各レッスン末尾の「図鑑で実物を見る」（`LessonNode.relatedSlugs`）に吸収。図鑑詳細ページ→レッスンの逆リンクは `lessonForSlug()`。`/map` は `/learn` へリダイレクト。
- 買い切り(`lifetime`)は**型・課金設計のみ先行**（`plan.ts`／docs/05）。UI・Stripe実装はコンテンツ拡充後。
お気に入り／学習記録／既読は**端末ローカル（localStorage）に先行実装**（キー不要・ローカルファースト。詳細は docs/08）。
- **図鑑に表示するのは「実物デモがある用語」だけ**（`src/data/visualTerms.ts`）。**現在298語すべてにデモ実装済み＝デモ100%**（2026-07-19）。デモは `LiveExample.tsx` の `demos` レジストリに slug→図解Reactで定義し、`visualTerms.ts` の `VISUAL_SLUGS` に slug を追記して連動させる。新語を足したら両方に追加すること。
- 触れる実例（LiveExample）は緑枠＋LIVEバッジで「触れるゾーン」と区別
- 検索はあいまい一致＋「もしかして？」候補（`src/lib/search.ts`）
- クイズ結果に「この回の振り返り（全問）」＋♡保存。実力試験は押した瞬間に○×
- 学習マップ: 必修ロード（`src/data/roadmap.ts`）をDuolingo風の道のりで。達成度は用語詳細の既読（`cocre:seen:v1`）で進む
- オンボーディング: **スポットライト型ガイドツアー**（`GuidedTour.tsx`）。実要素（ヘッダーnavの`data-tour`）を暗転の中で光らせ、矢印付き吹き出しで説明。初回自動＋フッター/ヘルプ（`cocre:open-tutorial`イベント）から再生、`cocre:tour-done:v1`で初回判定

**M2着手中（2026-07-16）**: Supabase接続済み（`.env.local`にURL+anonキー、git管理外）。`@supabase/supabase-js`導入、`src/lib/supabase/client.ts`(getSupabaseClient)・`AuthProvider.tsx`(useAuth)実装。**ログイン/新規登録(/login)・ログアウト(ヘッダーAuthNav)稼働**（メール+パスワード。Google未設定）。接続テスト済み(auth OK)。
- **同期実装済み**: お気に入り・クイズ成績・**すごろく進捗(journey_progress)・既読(seen_terms)** を `SupabaseSync.tsx` でログイン時マージ＋以降フック同期（`userStore`のRemoteHook経由）。テーブル未作成でも失敗はswallowするので動作は壊れない。
- 残: (1)`supabase/schema.sql`をSupabase SQL Editorで実行（journey_progress/seen_terms を追加済み。profiles等の表がまだ無い環境は要実行）→(2)M4 Stripe課金（サブスク＋買い切りlifetime）。
- service_role(secret)キーはチャット露出のため要再生成。今は未使用。
