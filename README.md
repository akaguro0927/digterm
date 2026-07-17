# Co-Cre（コクリ）— フロントエンド用語図鑑

フロントエンドの用語・UI部品名を「実物デモつきの図鑑」で調べ、学び、定着させる学習アプリ。
「名前がわからない部品を調べる」を入口に、すごろく式レッスンと問題集で身につけ、VIP（サブスク）で収益化する。

## 主な機能
- **図鑑**: 146語（うち137語に“触れる”実物デモ）。ひらがな/カタカナ/英語/見た目で検索
- **レッスン**: すごろく式（6章）。読む→テスト8割で前進。「図鑑の必修コース」も内包
- **問題集**: 初心者/中級/上級/実力試験＋**苦手復習（間違いだけ再出題）**
- **ストリーク＋デイリーゴール**（継続の仕組み）
- **AIでしらべる**: スクショ→部品名判定／AIに質問（Geminiキーがあれば本番、無ければモック）
- **VIP会員**: 弱点復習・全レッスン・AI無制限・広告なし（Stripe対応の土台）
- マイページ / プロフィール（資格・経歴）/ お問い合わせ / ハンバーガーメニュー

## 技術スタック
Next.js(App Router) / TypeScript / Tailwind CSS / Supabase(認証・DB) / Stripe(課金) / Google Gemini(AI)

## ローカル開発
```bash
npm install
cp .env.example .env.local   # 値は任意（未設定でもモック/ローカル保存で動く）
npm run dev                  # http://localhost:3000
npm run build                # 本番ビルド
```

## 環境変数
`.env.example` を参照。**すべて未設定でも起動・デプロイできる**（AI=モック / 課金=デモ / 認証=ローカル保存にフォールバック）。本番機能を使うときだけ設定する。
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY`
- `GEMINI_API_KEY`（Google AI Studio の `AIza…` 形式）
- `STRIPE_SECRET_KEY` / `STRIPE_PRICE_ID` / `STRIPE_WEBHOOK_SECRET` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## デプロイ（Vercel）
1. GitHub に push（`.env.local` は含まれない＝秘密は安全）
2. [vercel.com](https://vercel.com) → **Add New → Project** → このリポジトリを Import
3. Framework は **Next.js** が自動検出。そのまま Deploy でOK（env 未設定でも動く）
4. 本番機能を使うときは Vercel の **Settings → Environment Variables** に上記キーを設定して再デプロイ

## ドキュメント
- 📘 [要件定義書](docs/00_要件定義書.md)
- [機能](docs/01_機能要件.md) / [非機能](docs/02_非機能要件.md) / [画面](docs/03_画面設計.md) / [データ](docs/04_データ設計.md) / [課金](docs/05_サブスク課金設計.md) / [問題集](docs/06_問題集設計.md) / [技術](docs/07_技術スタック.md)
