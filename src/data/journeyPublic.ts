// このファイルは scripts/generateJourneyPublic.cjs が journey.ts から生成する。手編集禁止。
import type { PublicChapter, PublicFlatNode, PublicLevel, PublicNode } from "@/lib/journey/types";

export const levels: PublicLevel[] = [
  {
    "level": "beginner",
    "label": "初級コース",
    "eyebrow": "BEGINNER",
    "tagline": "用語の名前を知る。だれでも無料でここから。"
  },
  {
    "level": "intermediate",
    "label": "中級コース",
    "eyebrow": "INTERMEDIATE",
    "tagline": "手を動かして書く。準備とHTMLの章は無料、続きはVIP。"
  },
  {
    "level": "advanced",
    "label": "上級コース",
    "eyebrow": "ADVANCED",
    "tagline": "現場の作り方。ReactやGitなど“作れる人”の道具。VIP限定。"
  }
];
export const chapters: PublicChapter[] = [
  {
    "id": "c1",
    "title": "はじめの一歩",
    "subtitle": "AIとプログラミングって何？",
    "tint": "text-amber-600",
    "chip": "bg-amber-100 text-amber-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "c2",
    "title": "Webページの正体",
    "subtitle": "サイトは何でできてる？",
    "tint": "text-sky-600",
    "chip": "bg-sky-100 text-sky-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "c3",
    "title": "ヘッダーの部品たち",
    "subtitle": "上のあれ、名前なんだっけ？",
    "tint": "text-violet-600",
    "chip": "bg-violet-100 text-violet-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "c4",
    "title": "よく出る部品たち",
    "subtitle": "画面に何度も出る道具箱",
    "tint": "text-rose-600",
    "chip": "bg-rose-100 text-rose-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "c5",
    "title": "きれいに見せる",
    "subtitle": "余白・ならべ方・色",
    "tint": "text-teal-600",
    "chip": "bg-teal-100 text-teal-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "c6",
    "title": "サイトを作ってみる",
    "subtitle": "ゴールは予約サイト",
    "tint": "text-indigo-600",
    "chip": "bg-indigo-100 text-indigo-700",
    "level": "beginner",
    "access": "free"
  },
  {
    "id": "b1",
    "title": "コードを書く準備",
    "subtitle": "エディタ・写経・エラー",
    "tint": "text-lime-600",
    "chip": "bg-lime-100 text-lime-700",
    "level": "intermediate",
    "access": "free"
  },
  {
    "id": "m1",
    "title": "HTMLを書いてみる",
    "subtitle": "タグで“骨組み”を組む",
    "tint": "text-orange-600",
    "chip": "bg-orange-100 text-orange-700",
    "level": "intermediate",
    "access": "free"
  },
  {
    "id": "m2",
    "title": "CSSで見た目を作る",
    "subtitle": "セレクタ・色・ボックス",
    "tint": "text-pink-600",
    "chip": "bg-pink-100 text-pink-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m3",
    "title": "JavaScriptで動かす",
    "subtitle": "変数・関数・イベント",
    "tint": "text-yellow-600",
    "chip": "bg-yellow-100 text-yellow-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m9",
    "title": "たくさんをまとめて扱う",
    "subtitle": "配列とくり返し",
    "tint": "text-lime-600",
    "chip": "bg-lime-100 text-lime-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m4",
    "title": "データを取ってくる",
    "subtitle": "API・JSON・非同期",
    "tint": "text-cyan-600",
    "chip": "bg-cyan-100 text-cyan-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m10",
    "title": "本物のデータで動かす",
    "subtitle": "API実践",
    "tint": "text-teal-600",
    "chip": "bg-teal-100 text-teal-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m5",
    "title": "フォームを作る",
    "subtitle": "入力→送信→確認の実践",
    "tint": "text-fuchsia-600",
    "chip": "bg-fuchsia-100 text-fuchsia-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m6",
    "title": "状態を整理する",
    "subtitle": "開閉・読み込み・リスト",
    "tint": "text-teal-600",
    "chip": "bg-teal-100 text-teal-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m11",
    "title": "消えない保存をする",
    "subtitle": "ローカル保存（localStorage）",
    "tint": "text-amber-600",
    "chip": "bg-amber-100 text-amber-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m7",
    "title": "見た目を仕上げる",
    "subtitle": "ユーティリティCSS（Tailwind）",
    "tint": "text-sky-600",
    "chip": "bg-sky-100 text-sky-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "m8",
    "title": "エラーを直す",
    "subtitle": "デバッグの技術",
    "tint": "text-rose-600",
    "chip": "bg-rose-100 text-rose-700",
    "level": "intermediate",
    "access": "vip"
  },
  {
    "id": "a1",
    "title": "部品を組み合わせる",
    "subtitle": "コンポーネント設計・React",
    "tint": "text-blue-600",
    "chip": "bg-blue-100 text-blue-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a2",
    "title": "道具をそろえる",
    "subtitle": "Git・npm・デプロイ",
    "tint": "text-slate-600",
    "chip": "bg-slate-200 text-slate-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a4",
    "title": "テストを書く",
    "subtitle": "壊れない安心をつくる",
    "tint": "text-green-600",
    "chip": "bg-green-100 text-green-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a5",
    "title": "速くする",
    "subtitle": "パフォーマンス入門",
    "tint": "text-red-600",
    "chip": "bg-red-100 text-red-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a6",
    "title": "だれでも使えるように",
    "subtitle": "アクセシビリティ",
    "tint": "text-emerald-600",
    "chip": "bg-emerald-100 text-emerald-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a7",
    "title": "まちがえても戻せる",
    "subtitle": "Gitでやり直す実践",
    "tint": "text-orange-600",
    "chip": "bg-orange-100 text-orange-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a8",
    "title": "安全に作る",
    "subtitle": "セキュリティ入門",
    "tint": "text-rose-600",
    "chip": "bg-rose-100 text-rose-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a9",
    "title": "まちがいを先に防ぐ",
    "subtitle": "型（TypeScript）入門",
    "tint": "text-blue-600",
    "chip": "bg-blue-100 text-blue-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a10",
    "title": "センスに頼らず整える",
    "subtitle": "デザインの4原則",
    "tint": "text-pink-600",
    "chip": "bg-pink-100 text-pink-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a11",
    "title": "検索で見つけてもらう",
    "subtitle": "SEOの基本",
    "tint": "text-green-600",
    "chip": "bg-green-100 text-green-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a12",
    "title": "裏側を動かす",
    "subtitle": "サーバーとデータベース",
    "tint": "text-cyan-600",
    "chip": "bg-cyan-100 text-cyan-700",
    "level": "advanced",
    "access": "vip"
  },
  {
    "id": "a3",
    "title": "AIと組む開発",
    "subtitle": "相棒を使いこなす",
    "tint": "text-purple-600",
    "chip": "bg-purple-100 text-purple-700",
    "level": "advanced",
    "access": "vip"
  }
];
export const flatNodes: PublicFlatNode[] = [
  {
    "node": {
      "id": "c1-l1",
      "type": "lesson",
      "title": "コンピュータはバカ正直",
      "icon": "monitor",
      "intro": "まずは相手を知ろう"
    },
    "chapter": {
      "id": "c1",
      "title": "はじめの一歩",
      "subtitle": "AIとプログラミングって何？",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 0
  },
  {
    "node": {
      "id": "c1-l2",
      "type": "lesson",
      "title": "プログラミング＝指示書づくり",
      "icon": "code",
      "intro": "むずかしくないよ"
    },
    "chapter": {
      "id": "c1",
      "title": "はじめの一歩",
      "subtitle": "AIとプログラミングって何？",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 1
  },
  {
    "node": {
      "id": "c1-l3",
      "type": "lesson",
      "title": "AIは、きみの相棒",
      "icon": "zap",
      "intro": "上手に使うコツ"
    },
    "chapter": {
      "id": "c1",
      "title": "はじめの一歩",
      "subtitle": "AIとプログラミングって何？",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 2
  },
  {
    "node": {
      "id": "c1-test",
      "type": "test",
      "title": "アウトプットテスト①",
      "icon": "pencil",
      "intro": "8割で合格！つまずいたらレッスンに戻ってOK"
    },
    "chapter": {
      "id": "c1",
      "title": "はじめの一歩",
      "subtitle": "AIとプログラミングって何？",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 3
  },
  {
    "node": {
      "id": "c2-l1",
      "type": "lesson",
      "title": "ページは3人チーム",
      "icon": "layout",
      "intro": "HTML / CSS / JavaScript"
    },
    "chapter": {
      "id": "c2",
      "title": "Webページの正体",
      "subtitle": "サイトは何でできてる？",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 4
  },
  {
    "node": {
      "id": "c2-l2",
      "type": "lesson",
      "title": "部品には名前がある",
      "icon": "component",
      "intro": "名前を知ると一気にラク"
    },
    "chapter": {
      "id": "c2",
      "title": "Webページの正体",
      "subtitle": "サイトは何でできてる？",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 5
  },
  {
    "node": {
      "id": "c2-test",
      "type": "test",
      "title": "アウトプットテスト②",
      "icon": "pencil",
      "intro": "8割で合格！ここを越えたら図鑑デビュー"
    },
    "chapter": {
      "id": "c2",
      "title": "Webページの正体",
      "subtitle": "サイトは何でできてる？",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 6
  },
  {
    "node": {
      "id": "c3-l1",
      "type": "lesson",
      "title": "ヘッダーの正体",
      "icon": "layout",
      "intro": "上に居すわるあの帯"
    },
    "chapter": {
      "id": "c3",
      "title": "ヘッダーの部品たち",
      "subtitle": "上のあれ、名前なんだっけ？",
      "tint": "text-violet-600",
      "chip": "bg-violet-100 text-violet-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 7
  },
  {
    "node": {
      "id": "c3-l2",
      "type": "lesson",
      "title": "三本線とくるくる",
      "icon": "sliders",
      "intro": "名前がわからない代表選手"
    },
    "chapter": {
      "id": "c3",
      "title": "ヘッダーの部品たち",
      "subtitle": "上のあれ、名前なんだっけ？",
      "tint": "text-violet-600",
      "chip": "bg-violet-100 text-violet-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 8
  },
  {
    "node": {
      "id": "c3-l3",
      "type": "lesson",
      "title": "検索バーと小さなボタン",
      "icon": "search",
      "intro": "ヘッダーの右がわ"
    },
    "chapter": {
      "id": "c3",
      "title": "ヘッダーの部品たち",
      "subtitle": "上のあれ、名前なんだっけ？",
      "tint": "text-violet-600",
      "chip": "bg-violet-100 text-violet-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 9
  },
  {
    "node": {
      "id": "c3-test",
      "type": "test",
      "title": "アウトプットテスト③",
      "icon": "pencil",
      "intro": "8割で合格！ヘッダーの部品名クイズ"
    },
    "chapter": {
      "id": "c3",
      "title": "ヘッダーの部品たち",
      "subtitle": "上のあれ、名前なんだっけ？",
      "tint": "text-violet-600",
      "chip": "bg-violet-100 text-violet-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 10
  },
  {
    "node": {
      "id": "c4-l1",
      "type": "lesson",
      "title": "重なって出る仲間",
      "icon": "bell",
      "intro": "モーダル・トースト・ツールチップ"
    },
    "chapter": {
      "id": "c4",
      "title": "よく出る部品たち",
      "subtitle": "画面に何度も出る道具箱",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 11
  },
  {
    "node": {
      "id": "c4-l2",
      "type": "lesson",
      "title": "切り替えて省スペース",
      "icon": "component",
      "intro": "タブ・アコーディオン・カルーセル"
    },
    "chapter": {
      "id": "c4",
      "title": "よく出る部品たち",
      "subtitle": "画面に何度も出る道具箱",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 12
  },
  {
    "node": {
      "id": "c4-l3",
      "type": "lesson",
      "title": "入力まわりの道具",
      "icon": "user",
      "intro": "入力欄・チェック・トグル"
    },
    "chapter": {
      "id": "c4",
      "title": "よく出る部品たち",
      "subtitle": "画面に何度も出る道具箱",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 13
  },
  {
    "node": {
      "id": "c4-test",
      "type": "test",
      "title": "アウトプットテスト④",
      "icon": "pencil",
      "intro": "8割で合格！よく出る部品クイズ"
    },
    "chapter": {
      "id": "c4",
      "title": "よく出る部品たち",
      "subtitle": "画面に何度も出る道具箱",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 14
  },
  {
    "node": {
      "id": "c5-l1",
      "type": "lesson",
      "title": "余白がいのち",
      "icon": "sliders",
      "intro": "マージンとパディング"
    },
    "chapter": {
      "id": "c5",
      "title": "きれいに見せる",
      "subtitle": "余白・ならべ方・色",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 15
  },
  {
    "node": {
      "id": "c5-l2",
      "type": "lesson",
      "title": "ならべる魔法",
      "icon": "layout",
      "intro": "Flexとグリッド、中央ぞろえ"
    },
    "chapter": {
      "id": "c5",
      "title": "きれいに見せる",
      "subtitle": "余白・ならべ方・色",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 16
  },
  {
    "node": {
      "id": "c5-l3",
      "type": "lesson",
      "title": "色と読みやすさ",
      "icon": "droplet",
      "intro": "配色・コントラスト"
    },
    "chapter": {
      "id": "c5",
      "title": "きれいに見せる",
      "subtitle": "余白・ならべ方・色",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 17
  },
  {
    "node": {
      "id": "c5-test",
      "type": "test",
      "title": "アウトプットテスト⑤",
      "icon": "pencil",
      "intro": "8割で合格！レイアウトと見た目クイズ"
    },
    "chapter": {
      "id": "c5",
      "title": "きれいに見せる",
      "subtitle": "余白・ならべ方・色",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 18
  },
  {
    "node": {
      "id": "c6-l1",
      "type": "lesson",
      "title": "まず設計図をかく",
      "icon": "image",
      "intro": "ワイヤーフレーム"
    },
    "chapter": {
      "id": "c6",
      "title": "サイトを作ってみる",
      "subtitle": "ゴールは予約サイト",
      "tint": "text-indigo-600",
      "chip": "bg-indigo-100 text-indigo-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 19
  },
  {
    "node": {
      "id": "c6-l2",
      "type": "lesson",
      "title": "スマホにも対応する",
      "icon": "monitor",
      "intro": "レスポンシブ"
    },
    "chapter": {
      "id": "c6",
      "title": "サイトを作ってみる",
      "subtitle": "ゴールは予約サイト",
      "tint": "text-indigo-600",
      "chip": "bg-indigo-100 text-indigo-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 20
  },
  {
    "node": {
      "id": "c6-l3",
      "type": "lesson",
      "title": "予約サイトを組む",
      "icon": "wrench",
      "intro": "ここまでの部品を合体！"
    },
    "chapter": {
      "id": "c6",
      "title": "サイトを作ってみる",
      "subtitle": "ゴールは予約サイト",
      "tint": "text-indigo-600",
      "chip": "bg-indigo-100 text-indigo-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 21
  },
  {
    "node": {
      "id": "c6-test",
      "type": "test",
      "title": "卒業テスト",
      "icon": "pencil",
      "intro": "8割で合格！ここを越えたら“作れる人”デビュー"
    },
    "chapter": {
      "id": "c6",
      "title": "サイトを作ってみる",
      "subtitle": "ゴールは予約サイト",
      "tint": "text-indigo-600",
      "chip": "bg-indigo-100 text-indigo-700",
      "level": "beginner",
      "access": "free"
    },
    "index": 22
  },
  {
    "node": {
      "id": "b1-l1",
      "type": "lesson",
      "title": "コードはどこに書く？",
      "icon": "monitor",
      "intro": "エディタとファイル"
    },
    "chapter": {
      "id": "b1",
      "title": "コードを書く準備",
      "subtitle": "エディタ・写経・エラー",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 23
  },
  {
    "node": {
      "id": "b1-l2",
      "type": "lesson",
      "title": "写経から始めよう",
      "icon": "pencil",
      "intro": "完璧に理解しなくていい"
    },
    "chapter": {
      "id": "b1",
      "title": "コードを書く準備",
      "subtitle": "エディタ・写経・エラー",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 24
  },
  {
    "node": {
      "id": "b1-l3",
      "type": "lesson",
      "title": "エラーは敵じゃない",
      "icon": "zap",
      "intro": "赤い文字にビビらない"
    },
    "chapter": {
      "id": "b1",
      "title": "コードを書く準備",
      "subtitle": "エディタ・写経・エラー",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 25
  },
  {
    "node": {
      "id": "b1-test",
      "type": "test",
      "title": "橋渡しテスト",
      "icon": "pencil",
      "intro": "8割で合格！“書く”マインドの確認"
    },
    "chapter": {
      "id": "b1",
      "title": "コードを書く準備",
      "subtitle": "エディタ・写経・エラー",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 26
  },
  {
    "node": {
      "id": "m1-l1",
      "type": "lesson",
      "title": "タグは“ふせん”",
      "icon": "code",
      "intro": "HTMLの書き方の基本"
    },
    "chapter": {
      "id": "m1",
      "title": "HTMLを書いてみる",
      "subtitle": "タグで“骨組み”を組む",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 27
  },
  {
    "node": {
      "id": "m1-l2",
      "type": "lesson",
      "title": "リンクと画像",
      "icon": "image",
      "intro": "属性でくわしく指定する"
    },
    "chapter": {
      "id": "m1",
      "title": "HTMLを書いてみる",
      "subtitle": "タグで“骨組み”を組む",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 28
  },
  {
    "node": {
      "id": "m1-l3",
      "type": "lesson",
      "title": "入れ子とリスト",
      "icon": "component",
      "intro": "タグの中にタグを入れる"
    },
    "chapter": {
      "id": "m1",
      "title": "HTMLを書いてみる",
      "subtitle": "タグで“骨組み”を組む",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 29
  },
  {
    "node": {
      "id": "m1-test",
      "type": "test",
      "title": "中級テスト①",
      "icon": "pencil",
      "intro": "8割で合格！ここまでが中級の無料お試し"
    },
    "chapter": {
      "id": "m1",
      "title": "HTMLを書いてみる",
      "subtitle": "タグで“骨組み”を組む",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "intermediate",
      "access": "free"
    },
    "index": 30
  },
  {
    "node": {
      "id": "m2-l1",
      "type": "lesson",
      "title": "セレクタで狙う",
      "icon": "droplet",
      "intro": "CSSはどこに効かせる？"
    },
    "chapter": {
      "id": "m2",
      "title": "CSSで見た目を作る",
      "subtitle": "セレクタ・色・ボックス",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 31
  },
  {
    "node": {
      "id": "m2-l2",
      "type": "lesson",
      "title": "色と大きさの単位",
      "icon": "droplet",
      "intro": "何をどれだけ、を数字で"
    },
    "chapter": {
      "id": "m2",
      "title": "CSSで見た目を作る",
      "subtitle": "セレクタ・色・ボックス",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 32
  },
  {
    "node": {
      "id": "m2-l3",
      "type": "lesson",
      "title": "ボックスモデル",
      "icon": "layout",
      "intro": "すべての部品は“箱”"
    },
    "chapter": {
      "id": "m2",
      "title": "CSSで見た目を作る",
      "subtitle": "セレクタ・色・ボックス",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 33
  },
  {
    "node": {
      "id": "m2-test",
      "type": "test",
      "title": "中級テスト②",
      "icon": "pencil",
      "intro": "8割で合格！CSSの基本チェック"
    },
    "chapter": {
      "id": "m2",
      "title": "CSSで見た目を作る",
      "subtitle": "セレクタ・色・ボックス",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 34
  },
  {
    "node": {
      "id": "m3-l1",
      "type": "lesson",
      "title": "変数は“名前つきの箱”",
      "icon": "zap",
      "intro": "JavaScriptで動きをつける"
    },
    "chapter": {
      "id": "m3",
      "title": "JavaScriptで動かす",
      "subtitle": "変数・関数・イベント",
      "tint": "text-yellow-600",
      "chip": "bg-yellow-100 text-yellow-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 35
  },
  {
    "node": {
      "id": "m3-l2",
      "type": "lesson",
      "title": "関数はまとめ技",
      "icon": "code",
      "intro": "手順に名前をつける"
    },
    "chapter": {
      "id": "m3",
      "title": "JavaScriptで動かす",
      "subtitle": "変数・関数・イベント",
      "tint": "text-yellow-600",
      "chip": "bg-yellow-100 text-yellow-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 36
  },
  {
    "node": {
      "id": "m3-l3",
      "type": "lesson",
      "title": "イベントと条件分岐",
      "icon": "zap",
      "intro": "押したら動く、を作る"
    },
    "chapter": {
      "id": "m3",
      "title": "JavaScriptで動かす",
      "subtitle": "変数・関数・イベント",
      "tint": "text-yellow-600",
      "chip": "bg-yellow-100 text-yellow-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 37
  },
  {
    "node": {
      "id": "m3-test",
      "type": "test",
      "title": "中級テスト③",
      "icon": "pencil",
      "intro": "8割で合格！JavaScriptの基本チェック"
    },
    "chapter": {
      "id": "m3",
      "title": "JavaScriptで動かす",
      "subtitle": "変数・関数・イベント",
      "tint": "text-yellow-600",
      "chip": "bg-yellow-100 text-yellow-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 38
  },
  {
    "node": {
      "id": "m9-l1",
      "type": "lesson",
      "title": "ならびの箱＝配列",
      "icon": "component",
      "intro": "複数をまとめて持つ"
    },
    "chapter": {
      "id": "m9",
      "title": "たくさんをまとめて扱う",
      "subtitle": "配列とくり返し",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 39
  },
  {
    "node": {
      "id": "m9-l2",
      "type": "lesson",
      "title": "くり返しで全部処理",
      "icon": "sliders",
      "intro": "手作業をまかせる"
    },
    "chapter": {
      "id": "m9",
      "title": "たくさんをまとめて扱う",
      "subtitle": "配列とくり返し",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 40
  },
  {
    "node": {
      "id": "m9-l3",
      "type": "lesson",
      "title": "選ぶ・つくり変える",
      "icon": "search",
      "intro": "配列の便利ワザ"
    },
    "chapter": {
      "id": "m9",
      "title": "たくさんをまとめて扱う",
      "subtitle": "配列とくり返し",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 41
  },
  {
    "node": {
      "id": "m9-test",
      "type": "test",
      "title": "中級テスト（配列）",
      "icon": "pencil",
      "intro": "8割で合格！配列とくり返しチェック"
    },
    "chapter": {
      "id": "m9",
      "title": "たくさんをまとめて扱う",
      "subtitle": "配列とくり返し",
      "tint": "text-lime-600",
      "chip": "bg-lime-100 text-lime-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 42
  },
  {
    "node": {
      "id": "m4-l1",
      "type": "lesson",
      "title": "サーバーに“お願い”する",
      "icon": "wrench",
      "intro": "APIとデータのやりとり"
    },
    "chapter": {
      "id": "m4",
      "title": "データを取ってくる",
      "subtitle": "API・JSON・非同期",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 43
  },
  {
    "node": {
      "id": "m4-l2",
      "type": "lesson",
      "title": "JSONの読み方",
      "icon": "component",
      "intro": "名前と値の組でできてる"
    },
    "chapter": {
      "id": "m4",
      "title": "データを取ってくる",
      "subtitle": "API・JSON・非同期",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 44
  },
  {
    "node": {
      "id": "m4-l3",
      "type": "lesson",
      "title": "待つ・失敗にそなえる",
      "icon": "sliders",
      "intro": "非同期とエラー処理"
    },
    "chapter": {
      "id": "m4",
      "title": "データを取ってくる",
      "subtitle": "API・JSON・非同期",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 45
  },
  {
    "node": {
      "id": "m4-test",
      "type": "test",
      "title": "中級テスト（データ取得）",
      "icon": "pencil",
      "intro": "8割で合格！API・JSON・非同期チェック"
    },
    "chapter": {
      "id": "m4",
      "title": "データを取ってくる",
      "subtitle": "API・JSON・非同期",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 46
  },
  {
    "node": {
      "id": "m10-l1",
      "type": "lesson",
      "title": "APIを叩いてみる",
      "icon": "wrench",
      "intro": "実際に取ってくる"
    },
    "chapter": {
      "id": "m10",
      "title": "本物のデータで動かす",
      "subtitle": "API実践",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 47
  },
  {
    "node": {
      "id": "m10-l2",
      "type": "lesson",
      "title": "取った一覧を表示",
      "icon": "component",
      "intro": "配列×くり返しの出番"
    },
    "chapter": {
      "id": "m10",
      "title": "本物のデータで動かす",
      "subtitle": "API実践",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 48
  },
  {
    "node": {
      "id": "m10-l3",
      "type": "lesson",
      "title": "うまくいかない時にそなえる",
      "icon": "sliders",
      "intro": "読み込み中・エラー・空"
    },
    "chapter": {
      "id": "m10",
      "title": "本物のデータで動かす",
      "subtitle": "API実践",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 49
  },
  {
    "node": {
      "id": "m10-test",
      "type": "test",
      "title": "実践テスト（API）",
      "icon": "pencil",
      "intro": "8割で合格！API実践チェック"
    },
    "chapter": {
      "id": "m10",
      "title": "本物のデータで動かす",
      "subtitle": "API実践",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 50
  },
  {
    "node": {
      "id": "m5-l1",
      "type": "lesson",
      "title": "フォームの部品",
      "icon": "user",
      "intro": "入力を受け取る箱"
    },
    "chapter": {
      "id": "m5",
      "title": "フォームを作る",
      "subtitle": "入力→送信→確認の実践",
      "tint": "text-fuchsia-600",
      "chip": "bg-fuchsia-100 text-fuchsia-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 51
  },
  {
    "node": {
      "id": "m5-l2",
      "type": "lesson",
      "title": "送信を受け取る",
      "icon": "zap",
      "intro": "JSでフォームを動かす"
    },
    "chapter": {
      "id": "m5",
      "title": "フォームを作る",
      "subtitle": "入力→送信→確認の実践",
      "tint": "text-fuchsia-600",
      "chip": "bg-fuchsia-100 text-fuchsia-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 52
  },
  {
    "node": {
      "id": "m5-l3",
      "type": "lesson",
      "title": "予約フォームを組む",
      "icon": "wrench",
      "intro": "初級のゴールをコードで"
    },
    "chapter": {
      "id": "m5",
      "title": "フォームを作る",
      "subtitle": "入力→送信→確認の実践",
      "tint": "text-fuchsia-600",
      "chip": "bg-fuchsia-100 text-fuchsia-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 53
  },
  {
    "node": {
      "id": "m5-test",
      "type": "test",
      "title": "実践テスト（フォーム）",
      "icon": "pencil",
      "intro": "8割で合格！フォーム総合チェック"
    },
    "chapter": {
      "id": "m5",
      "title": "フォームを作る",
      "subtitle": "入力→送信→確認の実践",
      "tint": "text-fuchsia-600",
      "chip": "bg-fuchsia-100 text-fuchsia-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 54
  },
  {
    "node": {
      "id": "m6-l1",
      "type": "lesson",
      "title": "状態ってなに？",
      "icon": "sliders",
      "intro": "画面の“今の様子”"
    },
    "chapter": {
      "id": "m6",
      "title": "状態を整理する",
      "subtitle": "開閉・読み込み・リスト",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 55
  },
  {
    "node": {
      "id": "m6-l2",
      "type": "lesson",
      "title": "フラグとリスト",
      "icon": "component",
      "intro": "状態の2大パターン"
    },
    "chapter": {
      "id": "m6",
      "title": "状態を整理する",
      "subtitle": "開閉・読み込み・リスト",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 56
  },
  {
    "node": {
      "id": "m6-l3",
      "type": "lesson",
      "title": "状態は1か所に",
      "icon": "layout",
      "intro": "散らばると壊れる"
    },
    "chapter": {
      "id": "m6",
      "title": "状態を整理する",
      "subtitle": "開閉・読み込み・リスト",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 57
  },
  {
    "node": {
      "id": "m6-test",
      "type": "test",
      "title": "中級テスト（状態管理）",
      "icon": "pencil",
      "intro": "8割で合格！状態の考え方チェック"
    },
    "chapter": {
      "id": "m6",
      "title": "状態を整理する",
      "subtitle": "開閉・読み込み・リスト",
      "tint": "text-teal-600",
      "chip": "bg-teal-100 text-teal-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 58
  },
  {
    "node": {
      "id": "m11-l1",
      "type": "lesson",
      "title": "閉じても消えない保存",
      "icon": "component",
      "intro": "localStorageの基本"
    },
    "chapter": {
      "id": "m11",
      "title": "消えない保存をする",
      "subtitle": "ローカル保存（localStorage）",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 59
  },
  {
    "node": {
      "id": "m11-l2",
      "type": "lesson",
      "title": "オブジェクトも保存する",
      "icon": "code",
      "intro": "JSONに変換して保存"
    },
    "chapter": {
      "id": "m11",
      "title": "消えない保存をする",
      "subtitle": "ローカル保存（localStorage）",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 60
  },
  {
    "node": {
      "id": "m11-l3",
      "type": "lesson",
      "title": "保存の使いどころ",
      "icon": "sliders",
      "intro": "得意・不得意を知る"
    },
    "chapter": {
      "id": "m11",
      "title": "消えない保存をする",
      "subtitle": "ローカル保存（localStorage）",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 61
  },
  {
    "node": {
      "id": "m11-test",
      "type": "test",
      "title": "中級テスト（保存）",
      "icon": "pencil",
      "intro": "8割で合格！ローカル保存チェック"
    },
    "chapter": {
      "id": "m11",
      "title": "消えない保存をする",
      "subtitle": "ローカル保存（localStorage）",
      "tint": "text-amber-600",
      "chip": "bg-amber-100 text-amber-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 62
  },
  {
    "node": {
      "id": "m7-l1",
      "type": "lesson",
      "title": "クラスで見た目を組む",
      "icon": "droplet",
      "intro": "ユーティリティCSSとは"
    },
    "chapter": {
      "id": "m7",
      "title": "見た目を仕上げる",
      "subtitle": "ユーティリティCSS（Tailwind）",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 63
  },
  {
    "node": {
      "id": "m7-l2",
      "type": "lesson",
      "title": "よく使うクラス",
      "icon": "sliders",
      "intro": "これだけ覚えれば戦える"
    },
    "chapter": {
      "id": "m7",
      "title": "見た目を仕上げる",
      "subtitle": "ユーティリティCSS（Tailwind）",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 64
  },
  {
    "node": {
      "id": "m7-l3",
      "type": "lesson",
      "title": "反応する見た目",
      "icon": "monitor",
      "intro": "レスポンシブとhover"
    },
    "chapter": {
      "id": "m7",
      "title": "見た目を仕上げる",
      "subtitle": "ユーティリティCSS（Tailwind）",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 65
  },
  {
    "node": {
      "id": "m7-test",
      "type": "test",
      "title": "中級テスト（Tailwind）",
      "icon": "pencil",
      "intro": "8割で合格！ユーティリティCSSチェック"
    },
    "chapter": {
      "id": "m7",
      "title": "見た目を仕上げる",
      "subtitle": "ユーティリティCSS（Tailwind）",
      "tint": "text-sky-600",
      "chip": "bg-sky-100 text-sky-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 66
  },
  {
    "node": {
      "id": "m8-l1",
      "type": "lesson",
      "title": "エラーを読む",
      "icon": "search",
      "intro": "赤い文字は道案内"
    },
    "chapter": {
      "id": "m8",
      "title": "エラーを直す",
      "subtitle": "デバッグの技術",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 67
  },
  {
    "node": {
      "id": "m8-l2",
      "type": "lesson",
      "title": "console.logで確かめる",
      "icon": "code",
      "intro": "中身を“のぞく”"
    },
    "chapter": {
      "id": "m8",
      "title": "エラーを直す",
      "subtitle": "デバッグの技術",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 68
  },
  {
    "node": {
      "id": "m8-l3",
      "type": "lesson",
      "title": "原因を絞り込む",
      "icon": "sliders",
      "intro": "切り分けの考え方"
    },
    "chapter": {
      "id": "m8",
      "title": "エラーを直す",
      "subtitle": "デバッグの技術",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 69
  },
  {
    "node": {
      "id": "m8-test",
      "type": "test",
      "title": "中級テスト（デバッグ）",
      "icon": "pencil",
      "intro": "8割で合格！デバッグの技術チェック"
    },
    "chapter": {
      "id": "m8",
      "title": "エラーを直す",
      "subtitle": "デバッグの技術",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "intermediate",
      "access": "vip"
    },
    "index": 70
  },
  {
    "node": {
      "id": "a1-l1",
      "type": "lesson",
      "title": "部品を“再利用”する",
      "icon": "component",
      "intro": "コンポーネントとReact"
    },
    "chapter": {
      "id": "a1",
      "title": "部品を組み合わせる",
      "subtitle": "コンポーネント設計・React",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 71
  },
  {
    "node": {
      "id": "a1-l2",
      "type": "lesson",
      "title": "propsで中身を渡す",
      "icon": "sliders",
      "intro": "同じ部品で違う表示"
    },
    "chapter": {
      "id": "a1",
      "title": "部品を組み合わせる",
      "subtitle": "コンポーネント設計・React",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 72
  },
  {
    "node": {
      "id": "a1-l3",
      "type": "lesson",
      "title": "stateで状態を持つ",
      "icon": "zap",
      "intro": "変わったら描き直す"
    },
    "chapter": {
      "id": "a1",
      "title": "部品を組み合わせる",
      "subtitle": "コンポーネント設計・React",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 73
  },
  {
    "node": {
      "id": "a1-test",
      "type": "test",
      "title": "上級テスト①",
      "icon": "pencil",
      "intro": "8割で合格！コンポーネントの考え方チェック"
    },
    "chapter": {
      "id": "a1",
      "title": "部品を組み合わせる",
      "subtitle": "コンポーネント設計・React",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 74
  },
  {
    "node": {
      "id": "a2-l1",
      "type": "lesson",
      "title": "変更を記録する（Git）",
      "icon": "wrench",
      "intro": "開発の道具と流儀"
    },
    "chapter": {
      "id": "a2",
      "title": "道具をそろえる",
      "subtitle": "Git・npm・デプロイ",
      "tint": "text-slate-600",
      "chip": "bg-slate-200 text-slate-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 75
  },
  {
    "node": {
      "id": "a2-l2",
      "type": "lesson",
      "title": "みんなで作る（GitHub）",
      "icon": "user",
      "intro": "チーム開発の入口"
    },
    "chapter": {
      "id": "a2",
      "title": "道具をそろえる",
      "subtitle": "Git・npm・デプロイ",
      "tint": "text-slate-600",
      "chip": "bg-slate-200 text-slate-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 76
  },
  {
    "node": {
      "id": "a2-l3",
      "type": "lesson",
      "title": "本番に出す（デプロイ）",
      "icon": "monitor",
      "intro": "世界に公開するまで"
    },
    "chapter": {
      "id": "a2",
      "title": "道具をそろえる",
      "subtitle": "Git・npm・デプロイ",
      "tint": "text-slate-600",
      "chip": "bg-slate-200 text-slate-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 77
  },
  {
    "node": {
      "id": "a2-test",
      "type": "test",
      "title": "上級テスト②",
      "icon": "pencil",
      "intro": "8割で合格！開発の道具チェック"
    },
    "chapter": {
      "id": "a2",
      "title": "道具をそろえる",
      "subtitle": "Git・npm・デプロイ",
      "tint": "text-slate-600",
      "chip": "bg-slate-200 text-slate-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 78
  },
  {
    "node": {
      "id": "a4-l1",
      "type": "lesson",
      "title": "なぜテストを書く？",
      "icon": "check",
      "intro": "手動確認の限界"
    },
    "chapter": {
      "id": "a4",
      "title": "テストを書く",
      "subtitle": "壊れない安心をつくる",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 79
  },
  {
    "node": {
      "id": "a4-l2",
      "type": "lesson",
      "title": "テストの基本形",
      "icon": "code",
      "intro": "入力→期待する結果"
    },
    "chapter": {
      "id": "a4",
      "title": "テストを書く",
      "subtitle": "壊れない安心をつくる",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 80
  },
  {
    "node": {
      "id": "a4-l3",
      "type": "lesson",
      "title": "安心して直せる",
      "icon": "wrench",
      "intro": "テストがある強み"
    },
    "chapter": {
      "id": "a4",
      "title": "テストを書く",
      "subtitle": "壊れない安心をつくる",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 81
  },
  {
    "node": {
      "id": "a4-test",
      "type": "test",
      "title": "上級テスト（テスト）",
      "icon": "pencil",
      "intro": "8割で合格！テストの考え方チェック"
    },
    "chapter": {
      "id": "a4",
      "title": "テストを書く",
      "subtitle": "壊れない安心をつくる",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 82
  },
  {
    "node": {
      "id": "a5-l1",
      "type": "lesson",
      "title": "なぜ速さが大事？",
      "icon": "zap",
      "intro": "遅いと人は去る"
    },
    "chapter": {
      "id": "a5",
      "title": "速くする",
      "subtitle": "パフォーマンス入門",
      "tint": "text-red-600",
      "chip": "bg-red-100 text-red-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 83
  },
  {
    "node": {
      "id": "a5-l2",
      "type": "lesson",
      "title": "軽くする基本",
      "icon": "sliders",
      "intro": "画像と読み込みの工夫"
    },
    "chapter": {
      "id": "a5",
      "title": "速くする",
      "subtitle": "パフォーマンス入門",
      "tint": "text-red-600",
      "chip": "bg-red-100 text-red-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 84
  },
  {
    "node": {
      "id": "a5-l3",
      "type": "lesson",
      "title": "測ってから直す",
      "icon": "search",
      "intro": "推測より計測"
    },
    "chapter": {
      "id": "a5",
      "title": "速くする",
      "subtitle": "パフォーマンス入門",
      "tint": "text-red-600",
      "chip": "bg-red-100 text-red-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 85
  },
  {
    "node": {
      "id": "a5-test",
      "type": "test",
      "title": "上級テスト（速さ）",
      "icon": "pencil",
      "intro": "8割で合格！パフォーマンスの考え方チェック"
    },
    "chapter": {
      "id": "a5",
      "title": "速くする",
      "subtitle": "パフォーマンス入門",
      "tint": "text-red-600",
      "chip": "bg-red-100 text-red-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 86
  },
  {
    "node": {
      "id": "a6-l1",
      "type": "lesson",
      "title": "だれでも使えるように",
      "icon": "user",
      "intro": "アクセシビリティとは"
    },
    "chapter": {
      "id": "a6",
      "title": "だれでも使えるように",
      "subtitle": "アクセシビリティ",
      "tint": "text-emerald-600",
      "chip": "bg-emerald-100 text-emerald-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 87
  },
  {
    "node": {
      "id": "a6-l2",
      "type": "lesson",
      "title": "基本の3つ",
      "icon": "check",
      "intro": "まず押さえる勘どころ"
    },
    "chapter": {
      "id": "a6",
      "title": "だれでも使えるように",
      "subtitle": "アクセシビリティ",
      "tint": "text-emerald-600",
      "chip": "bg-emerald-100 text-emerald-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 88
  },
  {
    "node": {
      "id": "a6-l3",
      "type": "lesson",
      "title": "みんなにやさしい設計",
      "icon": "layout",
      "intro": "フォーカスとキーボード"
    },
    "chapter": {
      "id": "a6",
      "title": "だれでも使えるように",
      "subtitle": "アクセシビリティ",
      "tint": "text-emerald-600",
      "chip": "bg-emerald-100 text-emerald-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 89
  },
  {
    "node": {
      "id": "a6-test",
      "type": "test",
      "title": "上級テスト（a11y）",
      "icon": "pencil",
      "intro": "8割で合格！だれでも使える設計チェック"
    },
    "chapter": {
      "id": "a6",
      "title": "だれでも使えるように",
      "subtitle": "アクセシビリティ",
      "tint": "text-emerald-600",
      "chip": "bg-emerald-100 text-emerald-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 90
  },
  {
    "node": {
      "id": "a7-l1",
      "type": "lesson",
      "title": "保存してあれば怖くない",
      "icon": "check",
      "intro": "コミットは命綱"
    },
    "chapter": {
      "id": "a7",
      "title": "まちがえても戻せる",
      "subtitle": "Gitでやり直す実践",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 91
  },
  {
    "node": {
      "id": "a7-l2",
      "type": "lesson",
      "title": "1つ前に戻す",
      "icon": "sliders",
      "intro": "やり直しの基本"
    },
    "chapter": {
      "id": "a7",
      "title": "まちがえても戻せる",
      "subtitle": "Gitでやり直す実践",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 92
  },
  {
    "node": {
      "id": "a7-l3",
      "type": "lesson",
      "title": "過去を見て・戻る",
      "icon": "search",
      "intro": "履歴は時間旅行"
    },
    "chapter": {
      "id": "a7",
      "title": "まちがえても戻せる",
      "subtitle": "Gitでやり直す実践",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 93
  },
  {
    "node": {
      "id": "a7-test",
      "type": "test",
      "title": "上級テスト（Git実践）",
      "icon": "pencil",
      "intro": "8割で合格！やり直しの技術チェック"
    },
    "chapter": {
      "id": "a7",
      "title": "まちがえても戻せる",
      "subtitle": "Gitでやり直す実践",
      "tint": "text-orange-600",
      "chip": "bg-orange-100 text-orange-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 94
  },
  {
    "node": {
      "id": "a8-l1",
      "type": "lesson",
      "title": "なぜ狙われる？",
      "icon": "user",
      "intro": "守るのは作り手の責任"
    },
    "chapter": {
      "id": "a8",
      "title": "安全に作る",
      "subtitle": "セキュリティ入門",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 95
  },
  {
    "node": {
      "id": "a8-l2",
      "type": "lesson",
      "title": "秘密の守り方",
      "icon": "code",
      "intro": "パスワードとキー"
    },
    "chapter": {
      "id": "a8",
      "title": "安全に作る",
      "subtitle": "セキュリティ入門",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 96
  },
  {
    "node": {
      "id": "a8-l3",
      "type": "lesson",
      "title": "入力を信用しない",
      "icon": "sliders",
      "intro": "悪意ある入力を防ぐ"
    },
    "chapter": {
      "id": "a8",
      "title": "安全に作る",
      "subtitle": "セキュリティ入門",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 97
  },
  {
    "node": {
      "id": "a8-test",
      "type": "test",
      "title": "上級テスト（セキュリティ）",
      "icon": "pencil",
      "intro": "8割で合格！安全に作るための基本チェック"
    },
    "chapter": {
      "id": "a8",
      "title": "安全に作る",
      "subtitle": "セキュリティ入門",
      "tint": "text-rose-600",
      "chip": "bg-rose-100 text-rose-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 98
  },
  {
    "node": {
      "id": "a9-l1",
      "type": "lesson",
      "title": "型ってなに？",
      "icon": "check",
      "intro": "データの“種類”の約束"
    },
    "chapter": {
      "id": "a9",
      "title": "まちがいを先に防ぐ",
      "subtitle": "型（TypeScript）入門",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 99
  },
  {
    "node": {
      "id": "a9-l2",
      "type": "lesson",
      "title": "関数を型で守る",
      "icon": "code",
      "intro": "引数と戻り値に型"
    },
    "chapter": {
      "id": "a9",
      "title": "まちがいを先に防ぐ",
      "subtitle": "型（TypeScript）入門",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 100
  },
  {
    "node": {
      "id": "a9-l3",
      "type": "lesson",
      "title": "大きくなるほど効く",
      "icon": "layout",
      "intro": "型のありがたみ"
    },
    "chapter": {
      "id": "a9",
      "title": "まちがいを先に防ぐ",
      "subtitle": "型（TypeScript）入門",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 101
  },
  {
    "node": {
      "id": "a9-test",
      "type": "test",
      "title": "上級テスト（型）",
      "icon": "pencil",
      "intro": "8割で合格！型の考え方チェック"
    },
    "chapter": {
      "id": "a9",
      "title": "まちがいを先に防ぐ",
      "subtitle": "型（TypeScript）入門",
      "tint": "text-blue-600",
      "chip": "bg-blue-100 text-blue-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 102
  },
  {
    "node": {
      "id": "a10-l1",
      "type": "lesson",
      "title": "近くにまとめる（近接）",
      "icon": "layout",
      "intro": "関係あるものは近くに"
    },
    "chapter": {
      "id": "a10",
      "title": "センスに頼らず整える",
      "subtitle": "デザインの4原則",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 103
  },
  {
    "node": {
      "id": "a10-l2",
      "type": "lesson",
      "title": "そろえる（整列）",
      "icon": "sliders",
      "intro": "見えない線に沿わせる"
    },
    "chapter": {
      "id": "a10",
      "title": "センスに頼らず整える",
      "subtitle": "デザインの4原則",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 104
  },
  {
    "node": {
      "id": "a10-l3",
      "type": "lesson",
      "title": "くり返す・目立たせる",
      "icon": "droplet",
      "intro": "反復と対比"
    },
    "chapter": {
      "id": "a10",
      "title": "センスに頼らず整える",
      "subtitle": "デザインの4原則",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 105
  },
  {
    "node": {
      "id": "a10-test",
      "type": "test",
      "title": "上級テスト（デザイン）",
      "icon": "pencil",
      "intro": "8割で合格！デザイン4原則チェック"
    },
    "chapter": {
      "id": "a10",
      "title": "センスに頼らず整える",
      "subtitle": "デザインの4原則",
      "tint": "text-pink-600",
      "chip": "bg-pink-100 text-pink-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 106
  },
  {
    "node": {
      "id": "a11-l1",
      "type": "lesson",
      "title": "SEOってなに？",
      "icon": "search",
      "intro": "見つけてもらう工夫"
    },
    "chapter": {
      "id": "a11",
      "title": "検索で見つけてもらう",
      "subtitle": "SEOの基本",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 107
  },
  {
    "node": {
      "id": "a11-l2",
      "type": "lesson",
      "title": "中身で伝える",
      "icon": "book-open",
      "intro": "タイトルと見出し"
    },
    "chapter": {
      "id": "a11",
      "title": "検索で見つけてもらう",
      "subtitle": "SEOの基本",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 108
  },
  {
    "node": {
      "id": "a11-l3",
      "type": "lesson",
      "title": "速さ・スマホ・信頼",
      "icon": "monitor",
      "intro": "土台も評価される"
    },
    "chapter": {
      "id": "a11",
      "title": "検索で見つけてもらう",
      "subtitle": "SEOの基本",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 109
  },
  {
    "node": {
      "id": "a11-test",
      "type": "test",
      "title": "上級テスト（SEO）",
      "icon": "pencil",
      "intro": "8割で合格！SEOの基本チェック"
    },
    "chapter": {
      "id": "a11",
      "title": "検索で見つけてもらう",
      "subtitle": "SEOの基本",
      "tint": "text-green-600",
      "chip": "bg-green-100 text-green-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 110
  },
  {
    "node": {
      "id": "a12-l1",
      "type": "lesson",
      "title": "サーバーってなに？",
      "icon": "monitor",
      "intro": "画面の裏側をのぞく"
    },
    "chapter": {
      "id": "a12",
      "title": "裏側を動かす",
      "subtitle": "サーバーとデータベース",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 111
  },
  {
    "node": {
      "id": "a12-l2",
      "type": "lesson",
      "title": "データをしまう場所",
      "icon": "database",
      "intro": "データベースとSQL"
    },
    "chapter": {
      "id": "a12",
      "title": "裏側を動かす",
      "subtitle": "サーバーとデータベース",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 112
  },
  {
    "node": {
      "id": "a12-l3",
      "type": "lesson",
      "title": "本人だけ安全に通す",
      "icon": "lock",
      "intro": "認証・認可・門番たち"
    },
    "chapter": {
      "id": "a12",
      "title": "裏側を動かす",
      "subtitle": "サーバーとデータベース",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 113
  },
  {
    "node": {
      "id": "a12-test",
      "type": "test",
      "title": "上級テスト（サーバー編）",
      "icon": "pencil",
      "intro": "8割で合格！サーバーとデータベースのチェック"
    },
    "chapter": {
      "id": "a12",
      "title": "裏側を動かす",
      "subtitle": "サーバーとデータベース",
      "tint": "text-cyan-600",
      "chip": "bg-cyan-100 text-cyan-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 114
  },
  {
    "node": {
      "id": "a3-l1",
      "type": "lesson",
      "title": "AIは最強の相棒",
      "icon": "zap",
      "intro": "上手な頼み方"
    },
    "chapter": {
      "id": "a3",
      "title": "AIと組む開発",
      "subtitle": "相棒を使いこなす",
      "tint": "text-purple-600",
      "chip": "bg-purple-100 text-purple-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 115
  },
  {
    "node": {
      "id": "a3-l2",
      "type": "lesson",
      "title": "AIの答えを見抜く",
      "icon": "search",
      "intro": "丸投げの落とし穴"
    },
    "chapter": {
      "id": "a3",
      "title": "AIと組む開発",
      "subtitle": "相棒を使いこなす",
      "tint": "text-purple-600",
      "chip": "bg-purple-100 text-purple-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 116
  },
  {
    "node": {
      "id": "a3-l3",
      "type": "lesson",
      "title": "AIと作る進め方",
      "icon": "wrench",
      "intro": "対話でつくる"
    },
    "chapter": {
      "id": "a3",
      "title": "AIと組む開発",
      "subtitle": "相棒を使いこなす",
      "tint": "text-purple-600",
      "chip": "bg-purple-100 text-purple-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 117
  },
  {
    "node": {
      "id": "a3-test",
      "type": "test",
      "title": "最終卒業テスト",
      "icon": "trophy",
      "intro": "8割で合格！これが最後のマス"
    },
    "chapter": {
      "id": "a3",
      "title": "AIと組む開発",
      "subtitle": "相棒を使いこなす",
      "tint": "text-purple-600",
      "chip": "bg-purple-100 text-purple-700",
      "level": "advanced",
      "access": "vip"
    },
    "index": 118
  }
];
export const nodesByChapter: Record<string, PublicNode[]> = {
  "c1": [
    {
      "id": "c1-l1",
      "type": "lesson",
      "title": "コンピュータはバカ正直",
      "icon": "monitor",
      "intro": "まずは相手を知ろう"
    },
    {
      "id": "c1-l2",
      "type": "lesson",
      "title": "プログラミング＝指示書づくり",
      "icon": "code",
      "intro": "むずかしくないよ"
    },
    {
      "id": "c1-l3",
      "type": "lesson",
      "title": "AIは、きみの相棒",
      "icon": "zap",
      "intro": "上手に使うコツ"
    },
    {
      "id": "c1-test",
      "type": "test",
      "title": "アウトプットテスト①",
      "icon": "pencil",
      "intro": "8割で合格！つまずいたらレッスンに戻ってOK"
    }
  ],
  "c2": [
    {
      "id": "c2-l1",
      "type": "lesson",
      "title": "ページは3人チーム",
      "icon": "layout",
      "intro": "HTML / CSS / JavaScript"
    },
    {
      "id": "c2-l2",
      "type": "lesson",
      "title": "部品には名前がある",
      "icon": "component",
      "intro": "名前を知ると一気にラク"
    },
    {
      "id": "c2-test",
      "type": "test",
      "title": "アウトプットテスト②",
      "icon": "pencil",
      "intro": "8割で合格！ここを越えたら図鑑デビュー"
    }
  ],
  "c3": [
    {
      "id": "c3-l1",
      "type": "lesson",
      "title": "ヘッダーの正体",
      "icon": "layout",
      "intro": "上に居すわるあの帯"
    },
    {
      "id": "c3-l2",
      "type": "lesson",
      "title": "三本線とくるくる",
      "icon": "sliders",
      "intro": "名前がわからない代表選手"
    },
    {
      "id": "c3-l3",
      "type": "lesson",
      "title": "検索バーと小さなボタン",
      "icon": "search",
      "intro": "ヘッダーの右がわ"
    },
    {
      "id": "c3-test",
      "type": "test",
      "title": "アウトプットテスト③",
      "icon": "pencil",
      "intro": "8割で合格！ヘッダーの部品名クイズ"
    }
  ],
  "c4": [
    {
      "id": "c4-l1",
      "type": "lesson",
      "title": "重なって出る仲間",
      "icon": "bell",
      "intro": "モーダル・トースト・ツールチップ"
    },
    {
      "id": "c4-l2",
      "type": "lesson",
      "title": "切り替えて省スペース",
      "icon": "component",
      "intro": "タブ・アコーディオン・カルーセル"
    },
    {
      "id": "c4-l3",
      "type": "lesson",
      "title": "入力まわりの道具",
      "icon": "user",
      "intro": "入力欄・チェック・トグル"
    },
    {
      "id": "c4-test",
      "type": "test",
      "title": "アウトプットテスト④",
      "icon": "pencil",
      "intro": "8割で合格！よく出る部品クイズ"
    }
  ],
  "c5": [
    {
      "id": "c5-l1",
      "type": "lesson",
      "title": "余白がいのち",
      "icon": "sliders",
      "intro": "マージンとパディング"
    },
    {
      "id": "c5-l2",
      "type": "lesson",
      "title": "ならべる魔法",
      "icon": "layout",
      "intro": "Flexとグリッド、中央ぞろえ"
    },
    {
      "id": "c5-l3",
      "type": "lesson",
      "title": "色と読みやすさ",
      "icon": "droplet",
      "intro": "配色・コントラスト"
    },
    {
      "id": "c5-test",
      "type": "test",
      "title": "アウトプットテスト⑤",
      "icon": "pencil",
      "intro": "8割で合格！レイアウトと見た目クイズ"
    }
  ],
  "c6": [
    {
      "id": "c6-l1",
      "type": "lesson",
      "title": "まず設計図をかく",
      "icon": "image",
      "intro": "ワイヤーフレーム"
    },
    {
      "id": "c6-l2",
      "type": "lesson",
      "title": "スマホにも対応する",
      "icon": "monitor",
      "intro": "レスポンシブ"
    },
    {
      "id": "c6-l3",
      "type": "lesson",
      "title": "予約サイトを組む",
      "icon": "wrench",
      "intro": "ここまでの部品を合体！"
    },
    {
      "id": "c6-test",
      "type": "test",
      "title": "卒業テスト",
      "icon": "pencil",
      "intro": "8割で合格！ここを越えたら“作れる人”デビュー"
    }
  ],
  "b1": [
    {
      "id": "b1-l1",
      "type": "lesson",
      "title": "コードはどこに書く？",
      "icon": "monitor",
      "intro": "エディタとファイル"
    },
    {
      "id": "b1-l2",
      "type": "lesson",
      "title": "写経から始めよう",
      "icon": "pencil",
      "intro": "完璧に理解しなくていい"
    },
    {
      "id": "b1-l3",
      "type": "lesson",
      "title": "エラーは敵じゃない",
      "icon": "zap",
      "intro": "赤い文字にビビらない"
    },
    {
      "id": "b1-test",
      "type": "test",
      "title": "橋渡しテスト",
      "icon": "pencil",
      "intro": "8割で合格！“書く”マインドの確認"
    }
  ],
  "m1": [
    {
      "id": "m1-l1",
      "type": "lesson",
      "title": "タグは“ふせん”",
      "icon": "code",
      "intro": "HTMLの書き方の基本"
    },
    {
      "id": "m1-l2",
      "type": "lesson",
      "title": "リンクと画像",
      "icon": "image",
      "intro": "属性でくわしく指定する"
    },
    {
      "id": "m1-l3",
      "type": "lesson",
      "title": "入れ子とリスト",
      "icon": "component",
      "intro": "タグの中にタグを入れる"
    },
    {
      "id": "m1-test",
      "type": "test",
      "title": "中級テスト①",
      "icon": "pencil",
      "intro": "8割で合格！ここまでが中級の無料お試し"
    }
  ],
  "m2": [
    {
      "id": "m2-l1",
      "type": "lesson",
      "title": "セレクタで狙う",
      "icon": "droplet",
      "intro": "CSSはどこに効かせる？"
    },
    {
      "id": "m2-l2",
      "type": "lesson",
      "title": "色と大きさの単位",
      "icon": "droplet",
      "intro": "何をどれだけ、を数字で"
    },
    {
      "id": "m2-l3",
      "type": "lesson",
      "title": "ボックスモデル",
      "icon": "layout",
      "intro": "すべての部品は“箱”"
    },
    {
      "id": "m2-test",
      "type": "test",
      "title": "中級テスト②",
      "icon": "pencil",
      "intro": "8割で合格！CSSの基本チェック"
    }
  ],
  "m3": [
    {
      "id": "m3-l1",
      "type": "lesson",
      "title": "変数は“名前つきの箱”",
      "icon": "zap",
      "intro": "JavaScriptで動きをつける"
    },
    {
      "id": "m3-l2",
      "type": "lesson",
      "title": "関数はまとめ技",
      "icon": "code",
      "intro": "手順に名前をつける"
    },
    {
      "id": "m3-l3",
      "type": "lesson",
      "title": "イベントと条件分岐",
      "icon": "zap",
      "intro": "押したら動く、を作る"
    },
    {
      "id": "m3-test",
      "type": "test",
      "title": "中級テスト③",
      "icon": "pencil",
      "intro": "8割で合格！JavaScriptの基本チェック"
    }
  ],
  "m9": [
    {
      "id": "m9-l1",
      "type": "lesson",
      "title": "ならびの箱＝配列",
      "icon": "component",
      "intro": "複数をまとめて持つ"
    },
    {
      "id": "m9-l2",
      "type": "lesson",
      "title": "くり返しで全部処理",
      "icon": "sliders",
      "intro": "手作業をまかせる"
    },
    {
      "id": "m9-l3",
      "type": "lesson",
      "title": "選ぶ・つくり変える",
      "icon": "search",
      "intro": "配列の便利ワザ"
    },
    {
      "id": "m9-test",
      "type": "test",
      "title": "中級テスト（配列）",
      "icon": "pencil",
      "intro": "8割で合格！配列とくり返しチェック"
    }
  ],
  "m4": [
    {
      "id": "m4-l1",
      "type": "lesson",
      "title": "サーバーに“お願い”する",
      "icon": "wrench",
      "intro": "APIとデータのやりとり"
    },
    {
      "id": "m4-l2",
      "type": "lesson",
      "title": "JSONの読み方",
      "icon": "component",
      "intro": "名前と値の組でできてる"
    },
    {
      "id": "m4-l3",
      "type": "lesson",
      "title": "待つ・失敗にそなえる",
      "icon": "sliders",
      "intro": "非同期とエラー処理"
    },
    {
      "id": "m4-test",
      "type": "test",
      "title": "中級テスト（データ取得）",
      "icon": "pencil",
      "intro": "8割で合格！API・JSON・非同期チェック"
    }
  ],
  "m10": [
    {
      "id": "m10-l1",
      "type": "lesson",
      "title": "APIを叩いてみる",
      "icon": "wrench",
      "intro": "実際に取ってくる"
    },
    {
      "id": "m10-l2",
      "type": "lesson",
      "title": "取った一覧を表示",
      "icon": "component",
      "intro": "配列×くり返しの出番"
    },
    {
      "id": "m10-l3",
      "type": "lesson",
      "title": "うまくいかない時にそなえる",
      "icon": "sliders",
      "intro": "読み込み中・エラー・空"
    },
    {
      "id": "m10-test",
      "type": "test",
      "title": "実践テスト（API）",
      "icon": "pencil",
      "intro": "8割で合格！API実践チェック"
    }
  ],
  "m5": [
    {
      "id": "m5-l1",
      "type": "lesson",
      "title": "フォームの部品",
      "icon": "user",
      "intro": "入力を受け取る箱"
    },
    {
      "id": "m5-l2",
      "type": "lesson",
      "title": "送信を受け取る",
      "icon": "zap",
      "intro": "JSでフォームを動かす"
    },
    {
      "id": "m5-l3",
      "type": "lesson",
      "title": "予約フォームを組む",
      "icon": "wrench",
      "intro": "初級のゴールをコードで"
    },
    {
      "id": "m5-test",
      "type": "test",
      "title": "実践テスト（フォーム）",
      "icon": "pencil",
      "intro": "8割で合格！フォーム総合チェック"
    }
  ],
  "m6": [
    {
      "id": "m6-l1",
      "type": "lesson",
      "title": "状態ってなに？",
      "icon": "sliders",
      "intro": "画面の“今の様子”"
    },
    {
      "id": "m6-l2",
      "type": "lesson",
      "title": "フラグとリスト",
      "icon": "component",
      "intro": "状態の2大パターン"
    },
    {
      "id": "m6-l3",
      "type": "lesson",
      "title": "状態は1か所に",
      "icon": "layout",
      "intro": "散らばると壊れる"
    },
    {
      "id": "m6-test",
      "type": "test",
      "title": "中級テスト（状態管理）",
      "icon": "pencil",
      "intro": "8割で合格！状態の考え方チェック"
    }
  ],
  "m11": [
    {
      "id": "m11-l1",
      "type": "lesson",
      "title": "閉じても消えない保存",
      "icon": "component",
      "intro": "localStorageの基本"
    },
    {
      "id": "m11-l2",
      "type": "lesson",
      "title": "オブジェクトも保存する",
      "icon": "code",
      "intro": "JSONに変換して保存"
    },
    {
      "id": "m11-l3",
      "type": "lesson",
      "title": "保存の使いどころ",
      "icon": "sliders",
      "intro": "得意・不得意を知る"
    },
    {
      "id": "m11-test",
      "type": "test",
      "title": "中級テスト（保存）",
      "icon": "pencil",
      "intro": "8割で合格！ローカル保存チェック"
    }
  ],
  "m7": [
    {
      "id": "m7-l1",
      "type": "lesson",
      "title": "クラスで見た目を組む",
      "icon": "droplet",
      "intro": "ユーティリティCSSとは"
    },
    {
      "id": "m7-l2",
      "type": "lesson",
      "title": "よく使うクラス",
      "icon": "sliders",
      "intro": "これだけ覚えれば戦える"
    },
    {
      "id": "m7-l3",
      "type": "lesson",
      "title": "反応する見た目",
      "icon": "monitor",
      "intro": "レスポンシブとhover"
    },
    {
      "id": "m7-test",
      "type": "test",
      "title": "中級テスト（Tailwind）",
      "icon": "pencil",
      "intro": "8割で合格！ユーティリティCSSチェック"
    }
  ],
  "m8": [
    {
      "id": "m8-l1",
      "type": "lesson",
      "title": "エラーを読む",
      "icon": "search",
      "intro": "赤い文字は道案内"
    },
    {
      "id": "m8-l2",
      "type": "lesson",
      "title": "console.logで確かめる",
      "icon": "code",
      "intro": "中身を“のぞく”"
    },
    {
      "id": "m8-l3",
      "type": "lesson",
      "title": "原因を絞り込む",
      "icon": "sliders",
      "intro": "切り分けの考え方"
    },
    {
      "id": "m8-test",
      "type": "test",
      "title": "中級テスト（デバッグ）",
      "icon": "pencil",
      "intro": "8割で合格！デバッグの技術チェック"
    }
  ],
  "a1": [
    {
      "id": "a1-l1",
      "type": "lesson",
      "title": "部品を“再利用”する",
      "icon": "component",
      "intro": "コンポーネントとReact"
    },
    {
      "id": "a1-l2",
      "type": "lesson",
      "title": "propsで中身を渡す",
      "icon": "sliders",
      "intro": "同じ部品で違う表示"
    },
    {
      "id": "a1-l3",
      "type": "lesson",
      "title": "stateで状態を持つ",
      "icon": "zap",
      "intro": "変わったら描き直す"
    },
    {
      "id": "a1-test",
      "type": "test",
      "title": "上級テスト①",
      "icon": "pencil",
      "intro": "8割で合格！コンポーネントの考え方チェック"
    }
  ],
  "a2": [
    {
      "id": "a2-l1",
      "type": "lesson",
      "title": "変更を記録する（Git）",
      "icon": "wrench",
      "intro": "開発の道具と流儀"
    },
    {
      "id": "a2-l2",
      "type": "lesson",
      "title": "みんなで作る（GitHub）",
      "icon": "user",
      "intro": "チーム開発の入口"
    },
    {
      "id": "a2-l3",
      "type": "lesson",
      "title": "本番に出す（デプロイ）",
      "icon": "monitor",
      "intro": "世界に公開するまで"
    },
    {
      "id": "a2-test",
      "type": "test",
      "title": "上級テスト②",
      "icon": "pencil",
      "intro": "8割で合格！開発の道具チェック"
    }
  ],
  "a4": [
    {
      "id": "a4-l1",
      "type": "lesson",
      "title": "なぜテストを書く？",
      "icon": "check",
      "intro": "手動確認の限界"
    },
    {
      "id": "a4-l2",
      "type": "lesson",
      "title": "テストの基本形",
      "icon": "code",
      "intro": "入力→期待する結果"
    },
    {
      "id": "a4-l3",
      "type": "lesson",
      "title": "安心して直せる",
      "icon": "wrench",
      "intro": "テストがある強み"
    },
    {
      "id": "a4-test",
      "type": "test",
      "title": "上級テスト（テスト）",
      "icon": "pencil",
      "intro": "8割で合格！テストの考え方チェック"
    }
  ],
  "a5": [
    {
      "id": "a5-l1",
      "type": "lesson",
      "title": "なぜ速さが大事？",
      "icon": "zap",
      "intro": "遅いと人は去る"
    },
    {
      "id": "a5-l2",
      "type": "lesson",
      "title": "軽くする基本",
      "icon": "sliders",
      "intro": "画像と読み込みの工夫"
    },
    {
      "id": "a5-l3",
      "type": "lesson",
      "title": "測ってから直す",
      "icon": "search",
      "intro": "推測より計測"
    },
    {
      "id": "a5-test",
      "type": "test",
      "title": "上級テスト（速さ）",
      "icon": "pencil",
      "intro": "8割で合格！パフォーマンスの考え方チェック"
    }
  ],
  "a6": [
    {
      "id": "a6-l1",
      "type": "lesson",
      "title": "だれでも使えるように",
      "icon": "user",
      "intro": "アクセシビリティとは"
    },
    {
      "id": "a6-l2",
      "type": "lesson",
      "title": "基本の3つ",
      "icon": "check",
      "intro": "まず押さえる勘どころ"
    },
    {
      "id": "a6-l3",
      "type": "lesson",
      "title": "みんなにやさしい設計",
      "icon": "layout",
      "intro": "フォーカスとキーボード"
    },
    {
      "id": "a6-test",
      "type": "test",
      "title": "上級テスト（a11y）",
      "icon": "pencil",
      "intro": "8割で合格！だれでも使える設計チェック"
    }
  ],
  "a7": [
    {
      "id": "a7-l1",
      "type": "lesson",
      "title": "保存してあれば怖くない",
      "icon": "check",
      "intro": "コミットは命綱"
    },
    {
      "id": "a7-l2",
      "type": "lesson",
      "title": "1つ前に戻す",
      "icon": "sliders",
      "intro": "やり直しの基本"
    },
    {
      "id": "a7-l3",
      "type": "lesson",
      "title": "過去を見て・戻る",
      "icon": "search",
      "intro": "履歴は時間旅行"
    },
    {
      "id": "a7-test",
      "type": "test",
      "title": "上級テスト（Git実践）",
      "icon": "pencil",
      "intro": "8割で合格！やり直しの技術チェック"
    }
  ],
  "a8": [
    {
      "id": "a8-l1",
      "type": "lesson",
      "title": "なぜ狙われる？",
      "icon": "user",
      "intro": "守るのは作り手の責任"
    },
    {
      "id": "a8-l2",
      "type": "lesson",
      "title": "秘密の守り方",
      "icon": "code",
      "intro": "パスワードとキー"
    },
    {
      "id": "a8-l3",
      "type": "lesson",
      "title": "入力を信用しない",
      "icon": "sliders",
      "intro": "悪意ある入力を防ぐ"
    },
    {
      "id": "a8-test",
      "type": "test",
      "title": "上級テスト（セキュリティ）",
      "icon": "pencil",
      "intro": "8割で合格！安全に作るための基本チェック"
    }
  ],
  "a9": [
    {
      "id": "a9-l1",
      "type": "lesson",
      "title": "型ってなに？",
      "icon": "check",
      "intro": "データの“種類”の約束"
    },
    {
      "id": "a9-l2",
      "type": "lesson",
      "title": "関数を型で守る",
      "icon": "code",
      "intro": "引数と戻り値に型"
    },
    {
      "id": "a9-l3",
      "type": "lesson",
      "title": "大きくなるほど効く",
      "icon": "layout",
      "intro": "型のありがたみ"
    },
    {
      "id": "a9-test",
      "type": "test",
      "title": "上級テスト（型）",
      "icon": "pencil",
      "intro": "8割で合格！型の考え方チェック"
    }
  ],
  "a10": [
    {
      "id": "a10-l1",
      "type": "lesson",
      "title": "近くにまとめる（近接）",
      "icon": "layout",
      "intro": "関係あるものは近くに"
    },
    {
      "id": "a10-l2",
      "type": "lesson",
      "title": "そろえる（整列）",
      "icon": "sliders",
      "intro": "見えない線に沿わせる"
    },
    {
      "id": "a10-l3",
      "type": "lesson",
      "title": "くり返す・目立たせる",
      "icon": "droplet",
      "intro": "反復と対比"
    },
    {
      "id": "a10-test",
      "type": "test",
      "title": "上級テスト（デザイン）",
      "icon": "pencil",
      "intro": "8割で合格！デザイン4原則チェック"
    }
  ],
  "a11": [
    {
      "id": "a11-l1",
      "type": "lesson",
      "title": "SEOってなに？",
      "icon": "search",
      "intro": "見つけてもらう工夫"
    },
    {
      "id": "a11-l2",
      "type": "lesson",
      "title": "中身で伝える",
      "icon": "book-open",
      "intro": "タイトルと見出し"
    },
    {
      "id": "a11-l3",
      "type": "lesson",
      "title": "速さ・スマホ・信頼",
      "icon": "monitor",
      "intro": "土台も評価される"
    },
    {
      "id": "a11-test",
      "type": "test",
      "title": "上級テスト（SEO）",
      "icon": "pencil",
      "intro": "8割で合格！SEOの基本チェック"
    }
  ],
  "a12": [
    {
      "id": "a12-l1",
      "type": "lesson",
      "title": "サーバーってなに？",
      "icon": "monitor",
      "intro": "画面の裏側をのぞく"
    },
    {
      "id": "a12-l2",
      "type": "lesson",
      "title": "データをしまう場所",
      "icon": "database",
      "intro": "データベースとSQL"
    },
    {
      "id": "a12-l3",
      "type": "lesson",
      "title": "本人だけ安全に通す",
      "icon": "lock",
      "intro": "認証・認可・門番たち"
    },
    {
      "id": "a12-test",
      "type": "test",
      "title": "上級テスト（サーバー編）",
      "icon": "pencil",
      "intro": "8割で合格！サーバーとデータベースのチェック"
    }
  ],
  "a3": [
    {
      "id": "a3-l1",
      "type": "lesson",
      "title": "AIは最強の相棒",
      "icon": "zap",
      "intro": "上手な頼み方"
    },
    {
      "id": "a3-l2",
      "type": "lesson",
      "title": "AIの答えを見抜く",
      "icon": "search",
      "intro": "丸投げの落とし穴"
    },
    {
      "id": "a3-l3",
      "type": "lesson",
      "title": "AIと作る進め方",
      "icon": "wrench",
      "intro": "対話でつくる"
    },
    {
      "id": "a3-test",
      "type": "test",
      "title": "最終卒業テスト",
      "icon": "trophy",
      "intro": "8割で合格！これが最後のマス"
    }
  ]
};
export const totalNodes = flatNodes.length;

export function getFlatNode(id: string) { return flatNodes.find((item) => item.node.id === id); }
export function isChapterAccessible(chapter: PublicChapter, hasPaid: boolean) { return chapter.access === "free" || hasPaid; }
export function isUnlocked(id: string, cleared: readonly string[]) { const index = flatNodes.findIndex((item) => item.node.id === id); return index <= 0 || cleared.includes(flatNodes[index - 1].node.id); }
export function nextNodeId(cleared: readonly string[]) { return flatNodes.find((item) => !cleared.includes(item.node.id))?.node.id ?? null; }
export function chaptersByLevel(level: PublicChapter["level"]) { return chapters.filter((chapter) => chapter.level === level); }
export function levelProgressList(cleared: readonly string[]) { const done = new Set(cleared); return levels.map((level) => { const nodes = flatNodes.filter((item) => item.chapter.level === level.level); const complete = nodes.filter((item) => done.has(item.node.id)).length; return { ...level, done: complete, total: nodes.length, pct: nodes.length ? Math.round((complete / nodes.length) * 100) : 0 }; }); }
