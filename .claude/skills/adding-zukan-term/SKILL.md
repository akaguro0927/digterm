---
name: adding-zukan-term
description: Co-Cre（図鑑）に用語・デモ・レッスンを追加する時の手順。片方だけ直すと図鑑に出ない/デモが空になる連動ファイルの組み合わせを示す。用語追加・デモ追加・コマンド追加・章やレッスンの挿入をする前に読む。
when_to_use: 図鑑に新しい用語を足す／LiveExampleのデモを作る／コマンドを追加する／journeyに章やレッスンを挿入する。
---

# 用語・デモ・レッスンの追加手順

前提と全体像は [CLAUDE.md](../../CLAUDE.md)。仕様に関わる変更をしたら `docs/` の該当子ドキュメントも更新する。

## 用語を1つ足す（**3ファイルが連動する。1つ抜けると出ない**）

1. `src/data/terms.ts` … 用語の定義（`nameJa`・`aliases` など）
2. `src/components/LiveExample.tsx` の `demos` レジストリ（1764行目付近）… `slug` → 図解Reactを追加
3. `src/data/visualTerms.ts` の `VISUAL_SLUGS`（6行目）… slug を追記

**図鑑に表示されるのは「実物デモがある用語」だけ**なので、`VISUAL_SLUGS` に入れ忘れると画面に出ない。逆に `demos` を書かずに `VISUAL_SLUGS` に入れると空になる。**現在413語すべてデモ実装済み＝デモ100%を維持する。**

カテゴリは6つ: UI / レイアウト / HTML・CSS / 開発 / バックエンド / コマンド。

## コマンドを足す（1行で済む）

`LiveExample.tsx` の `COMMAND_DEMOS`（4725行目付近）に `slug: { cmd, out }` を1行追加するだけ。共通の `TerminalDemo` に流し込まれる（4877行目付近のループ）。`VISUAL_SLUGS` への追記は必要。

※ Windows/PowerShell早見表の `/commands`（`src/data/winCommands.ts`）は**別物**。役割が違う（図鑑統合版 vs フラット早見表）ので混ぜない。

## レッスン・章を足す（`src/data/journey.ts`）

- **章の並びは `chapters` 配列の順で決まる**（id順ではない）。`a3`(AI)が全体の最終章。
- 章には `level`（初級/中級/上級）と `access` を持たせる。ロック判定は `isChapterAccessible()` / `useHasPaidAccess()`。
- **章を挿入したら、前の章のテストの `deepDive`（次章への橋渡し文）を更新する。**
- レッスンは `story` ＋ `takeaways` ＋任意の `codeSample` ＋ `practice` ＋ `relatedSlugs`。
- **story本文の図鑑リンクは自動**（`src/lib/linkify.tsx` の `linkifyStory`）。対象は `relatedSlugs` に限定され、用語名が本文に出た最初の1回だけリンクされる。**手でリンクを埋め込まない。**
- `MascotTeacher.lines` は `ReactNode[]`。

## 守ること

- 文言は日本語（対象は日本の初心者学習者）
- **絵文字は使わない** → `src/components/icons.tsx` のSVGで統一
- デザイン: 背景 `#faf8f2`、`card-pop`（2px枠＋ベタ影）、`btn-3d`。触れる実例は緑枠＋LIVEバッジ
- **有料コンテンツの出し分けは必ずサーバー側で判定する**（クライアントで隠すだけは禁止）
- 未決事項は `docs/00_要件定義書.md` の「要確認事項」に追記し、**勝手に確定しない**
- 実装が一区切りしたら `docs/09_開発進捗ログ.md` を更新する
