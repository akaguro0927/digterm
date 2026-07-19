// すごろく学習「道のり」のデータ。キャラ（コクリ）が物語形式で教える lesson マスと、
// 8割で合格の test マスが並ぶ。章を進めると用語が身につき、簡単なサイトが作れるゴールへ。
// ※ 用語データ(terms.ts)とは別に、ここは「読み物＋確認テスト」を持つ。

import type { IconName } from "@/components/icons";

export interface StoryLine {
  text: string;
}

export interface LessonNode {
  id: string;
  type: "lesson";
  title: string;
  icon: IconName;
  intro: string;
  story: StoryLine[];
  takeaways: string[];
  /**
   * このレッスンで出てきた用語の図鑑スラッグ（terms.ts / visualTerms.ts）。
   * 旧「必修コース(roadmap)」の“実物を見る”役割をレッスンに吸収するための導線。
   * まとめ画面から図鑑の実例へジャンプできる。
   */
  relatedSlugs?: string[];
  /**
   * まとめ画面に表示する実コードのサンプル（写経用）。
   * 「読むだけ」で終わらせず、手を動かすきっかけにする。CodeBlock でコピー可。
   */
  codeSample?: string;
  /**
   * レッスンの最後に出す「ミニ練習問題」（1問）。読む→写経→その場で解く、で定着を強める。
   * 章末テストとは別の“軽い自己チェック”。TestQuestion と同じ形。
   */
  practice?: TestQuestion;
}

export interface TestQuestion {
  prompt: string;
  choices: string[];
  answer: number; // 正解の choices index
  explain: string;
}

export interface TestNode {
  id: string;
  type: "test";
  title: string;
  icon: IconName;
  intro: string;
  passRate: number; // 合格ライン（0-1）
  questions: TestQuestion[];
  /**
   * 合格後に表示する「もっと知る（深掘り）」。章のまとめや実務のひとこと。
   * 丸暗記で終わらせず、点を線につなげる役割。
   */
  deepDive?: string;
}

export type JourneyNode = LessonNode | TestNode;

/** 学習の難易度レベル。無料/VIPの出し分けとコース見出しに使う。 */
export type CourseLevel = "beginner" | "intermediate" | "advanced";

/** 章の公開範囲。free=だれでも / vip=VIP会員（または買い切り）限定。 */
export type ChapterAccess = "free" | "vip";

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  tint: string; // ステージ見出しの色
  chip: string; // バッジ色
  level: CourseLevel; // どのコースに属するか
  access: ChapterAccess; // 無料 or VIP限定
}

/** レベルごとの見出しメタ（/learn のコース区切りに使う）。 */
export interface LevelMeta {
  level: CourseLevel;
  label: string; // 例: 「初級コース」
  eyebrow: string; // 例: 「BEGINNER」
  tagline: string; // ひとこと説明
}

export const levels: LevelMeta[] = [
  {
    level: "beginner",
    label: "初級コース",
    eyebrow: "BEGINNER",
    tagline: "用語の名前を知る。だれでも無料でここから。",
  },
  {
    level: "intermediate",
    label: "中級コース",
    eyebrow: "INTERMEDIATE",
    tagline: "手を動かして書く。準備とHTMLの章は無料、続きはVIP。",
  },
  {
    level: "advanced",
    label: "上級コース",
    eyebrow: "ADVANCED",
    tagline: "現場の作り方。ReactやGitなど“作れる人”の道具。VIP限定。",
  },
];

export const chapters: Chapter[] = [
  // ── 初級コース（無料）: 用語の名前を知る ──
  {
    id: "c1",
    title: "はじめの一歩",
    subtitle: "AIとプログラミングって何？",
    tint: "text-amber-600",
    chip: "bg-amber-100 text-amber-700",
    level: "beginner",
    access: "free",
  },
  {
    id: "c2",
    title: "Webページの正体",
    subtitle: "サイトは何でできてる？",
    tint: "text-sky-600",
    chip: "bg-sky-100 text-sky-700",
    level: "beginner",
    access: "free",
  },
  {
    id: "c3",
    title: "ヘッダーの部品たち",
    subtitle: "上のあれ、名前なんだっけ？",
    tint: "text-violet-600",
    chip: "bg-violet-100 text-violet-700",
    level: "beginner",
    access: "free",
  },
  {
    id: "c4",
    title: "よく出る部品たち",
    subtitle: "画面に何度も出る道具箱",
    tint: "text-rose-600",
    chip: "bg-rose-100 text-rose-700",
    level: "beginner",
    access: "free",
  },
  {
    id: "c5",
    title: "きれいに見せる",
    subtitle: "余白・ならべ方・色",
    tint: "text-teal-600",
    chip: "bg-teal-100 text-teal-700",
    level: "beginner",
    access: "free",
  },
  {
    id: "c6",
    title: "サイトを作ってみる",
    subtitle: "ゴールは予約サイト",
    tint: "text-indigo-600",
    chip: "bg-indigo-100 text-indigo-700",
    level: "beginner",
    access: "free",
  },

  // ── 中級コース: 手を動かして書く（b1・m1は無料の橋渡し、m2以降VIP）──
  {
    id: "b1",
    title: "コードを書く準備",
    subtitle: "エディタ・写経・エラー",
    tint: "text-lime-600",
    chip: "bg-lime-100 text-lime-700",
    level: "intermediate",
    access: "free", // 初級→中級の橋渡し（無料）
  },
  {
    id: "m1",
    title: "HTMLを書いてみる",
    subtitle: "タグで“骨組み”を組む",
    tint: "text-orange-600",
    chip: "bg-orange-100 text-orange-700",
    level: "intermediate",
    access: "free", // 中級の入口だけ無料でお試し
  },
  {
    id: "m2",
    title: "CSSで見た目を作る",
    subtitle: "セレクタ・色・ボックス",
    tint: "text-pink-600",
    chip: "bg-pink-100 text-pink-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m3",
    title: "JavaScriptで動かす",
    subtitle: "変数・関数・イベント",
    tint: "text-yellow-600",
    chip: "bg-yellow-100 text-yellow-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m9",
    title: "たくさんをまとめて扱う",
    subtitle: "配列とくり返し",
    tint: "text-lime-600",
    chip: "bg-lime-100 text-lime-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m4",
    title: "データを取ってくる",
    subtitle: "API・JSON・非同期",
    tint: "text-cyan-600",
    chip: "bg-cyan-100 text-cyan-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m10",
    title: "本物のデータで動かす",
    subtitle: "API実践",
    tint: "text-teal-600",
    chip: "bg-teal-100 text-teal-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m5",
    title: "フォームを作る",
    subtitle: "入力→送信→確認の実践",
    tint: "text-fuchsia-600",
    chip: "bg-fuchsia-100 text-fuchsia-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m6",
    title: "状態を整理する",
    subtitle: "開閉・読み込み・リスト",
    tint: "text-teal-600",
    chip: "bg-teal-100 text-teal-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m11",
    title: "消えない保存をする",
    subtitle: "ローカル保存（localStorage）",
    tint: "text-amber-600",
    chip: "bg-amber-100 text-amber-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m7",
    title: "見た目を仕上げる",
    subtitle: "ユーティリティCSS（Tailwind）",
    tint: "text-sky-600",
    chip: "bg-sky-100 text-sky-700",
    level: "intermediate",
    access: "vip",
  },
  {
    id: "m8",
    title: "エラーを直す",
    subtitle: "デバッグの技術",
    tint: "text-rose-600",
    chip: "bg-rose-100 text-rose-700",
    level: "intermediate",
    access: "vip",
  },

  // ── 上級コース: 現場の作り方（すべてVIP限定）──
  {
    id: "a1",
    title: "部品を組み合わせる",
    subtitle: "コンポーネント設計・React",
    tint: "text-blue-600",
    chip: "bg-blue-100 text-blue-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a2",
    title: "道具をそろえる",
    subtitle: "Git・npm・デプロイ",
    tint: "text-slate-600",
    chip: "bg-slate-200 text-slate-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a4",
    title: "テストを書く",
    subtitle: "壊れない安心をつくる",
    tint: "text-green-600",
    chip: "bg-green-100 text-green-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a5",
    title: "速くする",
    subtitle: "パフォーマンス入門",
    tint: "text-red-600",
    chip: "bg-red-100 text-red-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a6",
    title: "だれでも使えるように",
    subtitle: "アクセシビリティ",
    tint: "text-emerald-600",
    chip: "bg-emerald-100 text-emerald-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a7",
    title: "まちがえても戻せる",
    subtitle: "Gitでやり直す実践",
    tint: "text-orange-600",
    chip: "bg-orange-100 text-orange-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a8",
    title: "安全に作る",
    subtitle: "セキュリティ入門",
    tint: "text-rose-600",
    chip: "bg-rose-100 text-rose-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a9",
    title: "まちがいを先に防ぐ",
    subtitle: "型（TypeScript）入門",
    tint: "text-blue-600",
    chip: "bg-blue-100 text-blue-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a10",
    title: "センスに頼らず整える",
    subtitle: "デザインの4原則",
    tint: "text-pink-600",
    chip: "bg-pink-100 text-pink-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a11",
    title: "検索で見つけてもらう",
    subtitle: "SEOの基本",
    tint: "text-green-600",
    chip: "bg-green-100 text-green-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a12",
    title: "裏側を動かす",
    subtitle: "サーバーとデータベース",
    tint: "text-cyan-600",
    chip: "bg-cyan-100 text-cyan-700",
    level: "advanced",
    access: "vip",
  },
  {
    id: "a3",
    title: "AIと組む開発",
    subtitle: "相棒を使いこなす",
    tint: "text-purple-600",
    chip: "bg-purple-100 text-purple-700",
    level: "advanced",
    access: "vip",
  },
];

// 章ごとのノード（章の順に並べる）
export const nodesByChapter: Record<string, JourneyNode[]> = {
  c1: [
    {
      id: "c1-l1",
      type: "lesson",
      title: "コンピュータはバカ正直",
      icon: "monitor",
      intro: "まずは相手を知ろう",
      story: [
        { text: "こんにちは！ぼく、コクリ。いっしょに「作る力」を身につけていこう！" },
        { text: "さいしょに大事な話。コンピュータって、じつはすごく“バカ正直”なんだ。" },
        { text: "言われたことを、言われたとおりに、一字一句そのままやる。気をきかせてはくれない。" },
        { text: "だから「思ったとおりに動かない！」ときは、たいてい“こっちの指示ミス”。コンピュータは悪くないんだ。" },
        { text: "つまり——うまく指示する練習をすれば、だれでも動かせるってこと！" },
      ],
      takeaways: ["コンピュータは指示どおりにしか動かない", "動かない時は“指示の書き方”を直せばいい"],
    },
    {
      id: "c1-l2",
      type: "lesson",
      title: "プログラミング＝指示書づくり",
      icon: "code",
      intro: "むずかしくないよ",
      story: [
        { text: "じゃあ「プログラミング」って何だと思う？" },
        { text: "かんたんに言うと、コンピュータへの“指示書”を書くこと。" },
        { text: "日本語じゃなくて、コンピュータがわかる言葉（プログラミング言語）で書くんだ。" },
        { text: "「ボタンが押されたら、メッセージを出す」——こういう手順を、順番に並べていくだけ。" },
        { text: "最初は“単語”を知るところから。単語がわかれば、指示書も読めるようになるよ。" },
      ],
      takeaways: ["プログラミング＝コンピュータへの指示書", "まずは単語（用語）を知るのが近道"],
    },
    {
      id: "c1-l3",
      type: "lesson",
      title: "AIは、きみの相棒",
      icon: "zap",
      intro: "上手に使うコツ",
      story: [
        { text: "最近よく聞く「AI」。これは何者だと思う？" },
        { text: "AIは、たくさんの例から“パターン”を学んで、それっぽく答えてくれる仕組みなんだ。" },
        { text: "コードを書くのも手伝ってくれる。「こういうの作りたい」と言えば、下書きを出してくれる。" },
        { text: "でも、その答えが正しいか見抜くには“自分の理解”がいる。丸投げだと、まちがいに気づけない。" },
        { text: "だからこの図鑑で基礎をつけよう。AIを“相棒”として使いこなせるようになる！" },
      ],
      takeaways: ["AIは例から学んで手伝ってくれる相棒", "基礎があるとAIを正しく使いこなせる"],
    },
    {
      id: "c1-test",
      type: "test",
      title: "アウトプットテスト①",
      icon: "pencil",
      intro: "8割で合格！つまずいたらレッスンに戻ってOK",
      passRate: 0.8,
      questions: [
        {
          prompt: "コンピュータの性質として正しいのは？",
          choices: ["気をきかせて察してくれる", "指示どおりにしか動かない", "まちがいを勝手に直す", "疲れると気まぐれになる"],
          answer: 1,
          explain: "コンピュータは指示どおりにしか動きません。だから指示の書き方が大事。",
        },
        {
          prompt: "「プログラミング」を一言でいうと？",
          choices: ["コンピュータへの指示書を書くこと", "絵をかくこと", "電源を入れること", "タイピングを速くすること"],
          answer: 0,
          explain: "コンピュータがわかる言葉で“指示書”を書くのがプログラミング。",
        },
        {
          prompt: "思ったとおりに動かないとき、まず疑うのは？",
          choices: ["コンピュータの気分", "自分の指示（書き方）", "その日の天気", "モニターの色"],
          answer: 1,
          explain: "たいていは指示のミス。書き方を見直せば直せます。",
        },
        {
          prompt: "AIの説明として正しいのは？",
          choices: ["何でも必ず100%正しい", "たくさんの例からパターンを学ぶ", "ただの電卓と同じ", "感情で気ままに動く"],
          answer: 1,
          explain: "AIは大量の例からパターンを学び、それっぽく答えます。",
        },
        {
          prompt: "AIを上手に使うために大事なのは？",
          choices: ["ぜんぶ丸投げする", "自分も基礎を理解しておく", "とにかく速くタイプする", "高いPCを買う"],
          answer: 1,
          explain: "基礎があると、AIの答えの正しさを見抜けます。",
        },
      ],
    },
  ],
  c2: [
    {
      id: "c2-l1",
      type: "lesson",
      title: "ページは3人チーム",
      icon: "layout",
      intro: "HTML / CSS / JavaScript",
      story: [
        { text: "つぎはWebページの中身をのぞいてみよう。" },
        { text: "じつはページは“3人のチーム”でできてるんだ。" },
        { text: "HTML＝骨組み。見出し・文章・ボタンなど「何があるか」を決める担当。" },
        { text: "CSS＝見た目。色・大きさ・並べ方で「どう見えるか」を決める担当。" },
        { text: "JavaScript＝動き。「押したら開く」みたいな「どう動くか」の担当。" },
        { text: "この3つがわかると、どんなサイトも“分解”して見えるようになるよ！" },
      ],
      takeaways: ["HTML=骨組み / CSS=見た目 / JS=動き", "サイトはこの3担当でできている"],
      relatedSlugs: ["frontend", "backend", "dom"],
    },
    {
      id: "c2-l2",
      type: "lesson",
      title: "部品には名前がある",
      icon: "component",
      intro: "名前を知ると一気にラク",
      story: [
        { text: "ページの上にある「押せる四角」、なんて呼ぶ？——そう、ボタン。" },
        { text: "画面に重なって出る小窓は？——モーダル。" },
        { text: "シュッと出て数秒で消える通知は？——トースト。" },
        { text: "こういう“部品の名前”を知ってると、調べるのも作るのも一気にラクになる。" },
        { text: "図鑑にはこの実物がいっぱい。テストのあと、さっそくのぞいてみよう！" },
      ],
      takeaways: ["UI部品にはそれぞれ名前がある", "名前を知る＝調べる・作るの第一歩"],
      relatedSlugs: ["button", "modal", "toast"],
    },
    {
      id: "c2-test",
      type: "test",
      title: "アウトプットテスト②",
      icon: "pencil",
      intro: "8割で合格！ここを越えたら図鑑デビュー",
      passRate: 0.8,
      questions: [
        {
          prompt: "HTMLの役割は？",
          choices: ["見た目を整える", "骨組み（何があるか）", "動きをつける", "音を鳴らす"],
          answer: 1,
          explain: "HTMLはページの骨組み。見出しやボタンなど「何があるか」を決めます。",
        },
        {
          prompt: "CSSの役割は？",
          choices: ["骨組みを作る", "色や大きさ（見た目）", "データを保存する", "サーバーと通信する"],
          answer: 1,
          explain: "CSSは見た目担当。色・大きさ・並べ方を決めます。",
        },
        {
          prompt: "JavaScriptの役割は？",
          choices: ["見た目だけ", "動き（押したら開く等）", "骨組みだけ", "印刷だけ"],
          answer: 1,
          explain: "JavaScriptは動き担当。押したら開くなどの動作をつけます。",
        },
        {
          prompt: "画面に重なって出る小窓の名前は？",
          choices: ["トースト", "モーダル", "ボタン", "タブ"],
          answer: 1,
          explain: "重なって出て、閉じるまで操作をブロックする小窓＝モーダル。",
        },
        {
          prompt: "シュッと出て数秒で消える通知は？",
          choices: ["モーダル", "ドロワー", "トースト", "カルーセル"],
          answer: 2,
          explain: "さりげなく出て自動で消える通知＝トースト。",
        },
      ],
    },
  ],
  c3: [
    {
      id: "c3-l1",
      type: "lesson",
      title: "ヘッダーの正体",
      icon: "layout",
      intro: "上に居すわるあの帯",
      story: [
        { text: "ここからは、画面の“上のあれ”の名前を覚えていこう！" },
        { text: "まず、ページの一番上にある帯——あれを「ヘッダー」って呼ぶんだ。" },
        { text: "ヘッダーの左にある、お店の看板みたいなマーク。あれが「ロゴ」。押すとトップに戻れることが多いよ。" },
        { text: "ロゴのとなりに並ぶ「ホーム」「図鑑」みたいなリンク集。あれが「ナビゲーション（ナビ）」。行き先の案内板だね。" },
        { text: "サイト全体で共通のナビは「グローバルナビ」とも呼ぶよ。どのページでも同じ場所にいる、頼れる案内係。" },
      ],
      takeaways: ["上の帯＝ヘッダー / 看板マーク＝ロゴ", "行き先リンク集＝ナビゲーション"],
      relatedSlugs: ["header", "footer"],
    },
    {
      id: "c3-l2",
      type: "lesson",
      title: "三本線とくるくる",
      icon: "sliders",
      intro: "名前がわからない代表選手",
      story: [
        { text: "スマホでよく見る「三本線」のボタン、押したことある？" },
        { text: "あれは「ハンバーガーメニュー」！線が3本＝バンズと具に見えるからその名前なんだ。" },
        { text: "押すと横からスッと出てくるメニューは「ドロワー（引き出し）」。せまい画面でリンクを隠しておく道具だよ。" },
        { text: "読み込み中に出る、くるくる回るやつ。あれは「スピナー（ローディング）」。“いま準備中だよ”の合図なんだ。" },
        { text: "名前を知らないと調べようがない。でも名前がわかれば一発で検索できる。これがこの図鑑のねらいだよ！" },
      ],
      takeaways: ["三本線＝ハンバーガーメニュー / 横から出る＝ドロワー", "くるくる回る＝スピナー（読み込み中）"],
      relatedSlugs: ["hamburger-menu", "drawer", "spinner"],
    },
    {
      id: "c3-l3",
      type: "lesson",
      title: "検索バーと小さなボタン",
      icon: "search",
      intro: "ヘッダーの右がわ",
      story: [
        { text: "ヘッダーの右のほうも見てみよう。" },
        { text: "文字を打って探す細長い入力欄。あれが「検索バー」。虫めがねマークが目印だね。" },
        { text: "文字のない、絵だけの小さなボタンは「アイコンボタン」。ベルや人型など、ひと目で意味が伝わるのが強み。" },
        { text: "アイコンの右上につく赤い丸や数字は「バッジ」。“お知らせ3件！”みたいに件数を教えてくれる。" },
        { text: "丸い顔写真マークは「アバター」。ログイン中のユーザーを表すよ。押すとメニューが出ることが多い。" },
      ],
      takeaways: ["探す欄＝検索バー / 絵だけのボタン＝アイコンボタン", "右上の赤丸＝バッジ / 丸い顔＝アバター"],
      relatedSlugs: ["badge", "avatar"],
    },
    {
      id: "c3-test",
      type: "test",
      title: "アウトプットテスト③",
      icon: "pencil",
      intro: "8割で合格！ヘッダーの部品名クイズ",
      passRate: 0.8,
      questions: [
        {
          prompt: "ページ最上部の帯の名前は？",
          choices: ["フッター", "ヘッダー", "サイドバー", "モーダル"],
          answer: 1,
          explain: "ページ最上部の帯＝ヘッダー。ロゴやナビが並ぶ場所です。",
        },
        {
          prompt: "スマホでよく見る「三本線」のボタンは？",
          choices: ["ドロワー", "タブ", "ハンバーガーメニュー", "スピナー"],
          answer: 2,
          explain: "三本線＝ハンバーガーメニュー。押すとメニューが開きます。",
        },
        {
          prompt: "読み込み中の「くるくる回るやつ」は？",
          choices: ["スピナー", "バッジ", "ロゴ", "アバター"],
          answer: 0,
          explain: "くるくる回る読み込み中の表示＝スピナー（ローディング）。",
        },
        {
          prompt: "アイコンの右上につく赤い丸（件数表示）は？",
          choices: ["アバター", "バッジ", "トースト", "ナビ"],
          answer: 1,
          explain: "件数や未読を示す小さな丸・数字＝バッジ。",
        },
        {
          prompt: "サイトの行き先リンク集の呼び名は？",
          choices: ["ロゴ", "フッター", "ナビゲーション", "ドロワー"],
          answer: 2,
          explain: "「ホーム」「図鑑」などの行き先リンク集＝ナビゲーション。",
        },
      ],
    },
  ],
  c4: [
    {
      id: "c4-l1",
      type: "lesson",
      title: "重なって出る仲間",
      icon: "bell",
      intro: "モーダル・トースト・ツールチップ",
      story: [
        { text: "次は、画面に“ふわっと重なって出る”部品たち。似てるけど役割がちがうよ。" },
        { text: "画面の真ん中にドンと出て、閉じるまで先に進めない小窓。あれが「モーダル」。大事な確認に使う。" },
        { text: "画面のすみにシュッと出て、数秒で自動で消える通知。あれが「トースト」。トースターからパンが出る感じ！" },
        { text: "アイコンにマウスを乗せると出る、小さな吹き出し説明。あれが「ツールチップ」。“これ何？”に答えてくれる。" },
        { text: "ボタンの近くにペロッと開く小メニューは「ポップオーバー」。ちょい足しの選択肢を出すのに便利だよ。" },
      ],
      takeaways: ["真ん中で操作を止める＝モーダル / 自動で消える通知＝トースト", "乗せると出る説明＝ツールチップ"],
      relatedSlugs: ["modal", "toast", "tooltip", "popover"],
    },
    {
      id: "c4-l2",
      type: "lesson",
      title: "切り替えて省スペース",
      icon: "component",
      intro: "タブ・アコーディオン・カルーセル",
      story: [
        { text: "せまい画面にたくさん見せたい。そんな時に活躍する部品たち。" },
        { text: "「概要／レビュー／地図」みたいに、上の見出しで中身を切り替えるやつ。あれが「タブ」。" },
        { text: "見出しを押すとパカッと開いて説明が出る、閉じるとしまえるやつ。あれが「アコーディオン」。よくある質問（FAQ）でおなじみ。" },
        { text: "画像が横にスライドして次々入れ替わるやつ。あれが「カルーセル（スライダー）」。トップの主役バナーによく使う。" },
        { text: "どれも“場所を節約して、たくさん見せる”ための工夫なんだ。" },
      ],
      takeaways: ["見出しで切り替え＝タブ / 開閉できる＝アコーディオン", "横にスライド＝カルーセル"],
      relatedSlugs: ["tab", "accordion", "carousel"],
    },
    {
      id: "c4-l3",
      type: "lesson",
      title: "入力まわりの道具",
      icon: "user",
      intro: "入力欄・チェック・トグル",
      story: [
        { text: "予約や登録に欠かせない、入力まわりの部品を覚えよう。" },
        { text: "文字を打ち込む欄は「入力欄（テキストフィールド）」。何を書くかは「ラベル」で示すよ。" },
        { text: "四角にチェックを入れる、複数選べるやつは「チェックボックス」。1つだけ選ぶ丸いのは「ラジオボタン」。" },
        { text: "オン・オフをパチッと切り替えるスイッチは「トグル」。通知オンとかで見るよね。" },
        { text: "選択肢が下に開くやつは「プルダウン（セレクト）」。都道府県を選ぶ時なんかに便利。" },
      ],
      takeaways: ["文字入力＝入力欄 / 複数選択＝チェックボックス・1つ＝ラジオ", "オンオフ＝トグル / 一覧から選ぶ＝プルダウン"],
      relatedSlugs: ["text-field", "checkbox", "radio-button", "toggle-switch", "select"],
    },
    {
      id: "c4-test",
      type: "test",
      title: "アウトプットテスト④",
      icon: "pencil",
      intro: "8割で合格！よく出る部品クイズ",
      passRate: 0.8,
      questions: [
        {
          prompt: "閉じるまで操作できない、真ん中に出る小窓は？",
          choices: ["トースト", "モーダル", "ツールチップ", "タブ"],
          answer: 1,
          explain: "閉じるまで先に進めない中央の小窓＝モーダル。",
        },
        {
          prompt: "すみに出て数秒で消える通知は？",
          choices: ["トースト", "モーダル", "アコーディオン", "バッジ"],
          answer: 0,
          explain: "自動で消える控えめな通知＝トースト。",
        },
        {
          prompt: "見出しを押すと開閉して中身が出るのは？",
          choices: ["カルーセル", "タブ", "アコーディオン", "ドロワー"],
          answer: 2,
          explain: "パカッと開閉する部品＝アコーディオン。FAQでよく使います。",
        },
        {
          prompt: "オン・オフを切り替えるスイッチ部品は？",
          choices: ["チェックボックス", "ラジオボタン", "プルダウン", "トグル"],
          answer: 3,
          explain: "オンオフをパチッと切り替える＝トグル。",
        },
        {
          prompt: "画像が横にスライドして入れ替わるのは？",
          choices: ["カルーセル", "モーダル", "スピナー", "タブ"],
          answer: 0,
          explain: "横に流れて入れ替わる＝カルーセル（スライダー）。",
        },
      ],
    },
  ],
  c5: [
    {
      id: "c5-l1",
      type: "lesson",
      title: "余白がいのち",
      icon: "sliders",
      intro: "マージンとパディング",
      story: [
        { text: "見た目をキレイにする一番のコツ、なんだと思う？——じつは「余白」なんだ。" },
        { text: "部品の“外がわ”のすき間を「マージン」。部品どうしの間かくを作るよ。" },
        { text: "部品の“内がわ”のすき間を「パディング」。文字と枠の間に空気を入れる感じ。" },
        { text: "ぎゅうぎゅうだと読みにくい。余白をたっぷりとると、それだけで“ちゃんとして見える”んだ。" },
        { text: "プロっぽさは、じつは余白で決まる。まよったら“もう少し空ける”が正解なことが多いよ。" },
      ],
      takeaways: ["外のすき間＝マージン / 内のすき間＝パディング", "余白をとると読みやすく、上品に見える"],
      relatedSlugs: ["margin", "padding"],
    },
    {
      id: "c5-l2",
      type: "lesson",
      title: "ならべる魔法",
      icon: "layout",
      intro: "Flexとグリッド、中央ぞろえ",
      story: [
        { text: "部品を思いどおりに“ならべる”方法も、名前で覚えよう。" },
        { text: "横一列や縦一列に、いい感じに並べるしくみが「Flexbox（フレックス）」。ボタンを横に等間かんで並べるのが得意。" },
        { text: "碁ばんの目のように、縦横きっちり並べるのが「グリッド」。カードを3列×2段、みたいなレイアウトにぴったり。" },
        { text: "「中央ぞろえ（センタリング）」は、真ん中にそろえること。ロゴやタイトルでよく使うね。" },
        { text: "並べ方に名前があると、AIにも「Flexで横に並べて」と正確にお願いできるよ。" },
      ],
      takeaways: ["一列にいい感じ＝Flexbox / 格子状＝グリッド", "真ん中ぞろえ＝センタリング"],
      relatedSlugs: ["flexbox", "grid-layout"],
    },
    {
      id: "c5-l3",
      type: "lesson",
      title: "色と読みやすさ",
      icon: "droplet",
      intro: "配色・コントラスト",
      story: [
        { text: "最後は色の話。色は“気分”だけじゃなく“読みやすさ”も左右するんだ。" },
        { text: "サイトで使う色の組み合わせを「配色（カラーパレット）」。主役の色は「メインカラー」、差し色は「アクセントカラー」。" },
        { text: "文字と背景の明るさの差を「コントラスト」。差が小さいと読みにくい。白地に黒文字が読みやすいのはこのため。" },
        { text: "色は使いすぎない。2〜3色にしぼると、まとまって見えるよ。" },
        { text: "見やすさ＝やさしさ。だれでも読める配色を心がけよう。" },
      ],
      takeaways: ["色の組み合わせ＝配色 / 主役＝メイン・差し色＝アクセント", "明るさの差＝コントラスト（大きいほど読みやすい）"],
      relatedSlugs: ["color-code", "color-swatch", "accessibility"],
    },
    {
      id: "c5-test",
      type: "test",
      title: "アウトプットテスト⑤",
      icon: "pencil",
      intro: "8割で合格！レイアウトと見た目クイズ",
      passRate: 0.8,
      questions: [
        {
          prompt: "部品の“外がわ”のすき間は？",
          choices: ["パディング", "マージン", "ボーダー", "グリッド"],
          answer: 1,
          explain: "部品の外側のすき間＝マージン。部品どうしの間かくです。",
        },
        {
          prompt: "部品の“内がわ”のすき間は？",
          choices: ["マージン", "パディング", "コントラスト", "フレックス"],
          answer: 1,
          explain: "枠と中身の間の内側のすき間＝パディング。",
        },
        {
          prompt: "碁ばんの目のように縦横きっちり並べるのは？",
          choices: ["Flexbox", "グリッド", "カルーセル", "タブ"],
          answer: 1,
          explain: "縦横の格子状に並べる＝グリッド。",
        },
        {
          prompt: "文字と背景の明るさの差の名前は？",
          choices: ["配色", "マージン", "コントラスト", "アクセント"],
          answer: 2,
          explain: "明るさの差＝コントラスト。大きいほど読みやすくなります。",
        },
        {
          prompt: "見た目をキレイにする一番のコツは？",
          choices: ["色をたくさん使う", "文字を大きくする", "余白をたっぷりとる", "線で囲む"],
          answer: 2,
          explain: "余白をたっぷりとると、それだけで整って見えます。",
        },
      ],
    },
  ],
  c6: [
    {
      id: "c6-l1",
      type: "lesson",
      title: "まず設計図をかく",
      icon: "image",
      intro: "ワイヤーフレーム",
      story: [
        { text: "いよいよ仕上げ！サイト作りは、いきなり作らず“設計図”から始めるんだ。" },
        { text: "どこに何を置くかを、ざっくり四角で描いたラフ図を「ワイヤーフレーム」って呼ぶよ。" },
        { text: "たとえば予約サイトなら——上にヘッダー、真ん中に日付を選ぶフォーム、下にボタン。まず配置を決める。" },
        { text: "色や飾りはあとまわし。まず“骨組み”を決めると、迷わず作れるんだ。" },
        { text: "料理でいうと段どりメモ。設計図があると、AIにも作りたい形を伝えやすいよ。" },
      ],
      takeaways: ["作る前にラフ図＝ワイヤーフレーム", "配置→骨組み→飾り、の順で作るとラク"],
      relatedSlugs: ["wireframe"],
    },
    {
      id: "c6-l2",
      type: "lesson",
      title: "スマホにも対応する",
      icon: "monitor",
      intro: "レスポンシブ",
      story: [
        { text: "いまはスマホで見る人がとても多い。だから“両対応”が当たり前なんだ。" },
        { text: "画面のはばに合わせて、レイアウトが自動で変わるしくみを「レスポンシブ」って呼ぶよ。" },
        { text: "パソコンでは横3列のカードが、スマホでは縦1列に——みたいに、いい感じに折り返る。" },
        { text: "「ここから先はスマホ向け」と切り替える境目を「ブレークポイント」。よく使う節目の幅があるんだ。" },
        { text: "スマホでも見やすいか、必ず確かめよう。使う人の多くはスマホだからね。" },
      ],
      takeaways: ["画面はばで自動変化＝レスポンシブ", "切り替えの境目＝ブレークポイント"],
      relatedSlugs: ["responsive"],
    },
    {
      id: "c6-l3",
      type: "lesson",
      title: "予約サイトを組む",
      icon: "wrench",
      intro: "ここまでの部品を合体！",
      story: [
        { text: "さあ、覚えた部品を合体させて“予約サイト”を組み立てよう！" },
        { text: "上に【ヘッダー】（ロゴ＋ナビ）。真ん中に【入力欄】で名前、【プルダウン】で日付、【トグル】で通知の希望。" },
        { text: "「予約する」【ボタン】を押したら、【モーダル】で「この内容でOK？」と確認する。" },
        { text: "送信中は【スピナー】。完了したら【トースト】で「予約できました！」とお知らせ。" },
        { text: "ぜんぶ、ここまで覚えた名前ばかり。部品の名前がわかれば、サイトはこうして組み上がるんだ。すごいでしょ？" },
      ],
      takeaways: ["サイト＝覚えた部品の組み合わせ", "名前がわかると、作る手順もイメージできる"],
      relatedSlugs: ["button", "form", "modal", "spinner", "toast"],
    },
    {
      id: "c6-test",
      type: "test",
      title: "卒業テスト",
      icon: "pencil",
      intro: "8割で合格！ここを越えたら“作れる人”デビュー",
      passRate: 0.8,
      questions: [
        {
          prompt: "作る前に配置を決めるラフ図は？",
          choices: ["カルーセル", "ワイヤーフレーム", "コントラスト", "アバター"],
          answer: 1,
          explain: "配置を先に決めるラフ図＝ワイヤーフレーム。",
        },
        {
          prompt: "画面はばに合わせてレイアウトが変わるしくみは？",
          choices: ["レスポンシブ", "モーダル", "グリッド", "トグル"],
          answer: 0,
          explain: "はばに合わせて自動で変化＝レスポンシブ。スマホ対応の基本です。",
        },
        {
          prompt: "予約内容を「これでOK？」と確認するのに向くのは？",
          choices: ["トースト", "スピナー", "モーダル", "バッジ"],
          answer: 2,
          explain: "はっきり確認させたいとき＝モーダル。閉じるまで先に進みません。",
        },
        {
          prompt: "送信が終わったことをさりげなく知らせるなら？",
          choices: ["モーダル", "トースト", "ハンバーガーメニュー", "タブ"],
          answer: 1,
          explain: "さりげなく自動で消える完了通知＝トースト。",
        },
        {
          prompt: "サイト作りで最初にやると迷わないのは？",
          choices: ["いきなり色をつける", "設計図をかく", "文字を全部書く", "画像を集める"],
          answer: 1,
          explain: "まず設計図（ワイヤーフレーム）。配置→骨組み→飾りの順が近道です。",
        },
      ],
    },
  ],

  // ══════════════ 中級コース ══════════════
  // b1: コードを書く準備（初級→中級の橋渡し・無料）
  b1: [
    {
      id: "b1-l1",
      type: "lesson",
      title: "コードはどこに書く？",
      icon: "monitor",
      intro: "エディタとファイル",
      story: [
        { text: "初級おつかれさま！ここからは“自分で書く”世界。まず「どこに書くの？」に答えるよ。" },
        { text: "コードは「エディタ」という専用のメモ帳みたいな道具に書く。定番は VS Code（無料）だよ。" },
        { text: "書いたものは「ファイル」に保存する。名前の最後の .html や .css で“種類”が決まるんだ。" },
        { text: "たとえば index.html を作ってブラウザで開くと、書いたHTMLがページとして表示される。これが第一歩。" },
        { text: "むずかしそう？だいじょうぶ。“ファイルに書いて、ブラウザで開く”——まずはこれだけ覚えればOK！" },
      ],
      takeaways: ["コードはエディタ（VS Code等）に書く", "保存先=ファイル。.html/.css で種類が決まる", "index.htmlをブラウザで開くと表示される"],
      practice: {
        prompt: "HTMLを書いたファイルの名前として正しいのは？",
        choices: ["index.html", "index.jpg", "index.mp3", "index.zip"],
        answer: 0,
        explain: ".html がHTMLファイルの拡張子。ブラウザで開くと表示されます。",
      },
      codeSample: `<!-- index.html という名前で保存して、ブラウザで開いてみよう -->
<!DOCTYPE html>
<html>
  <body>
    <h1>はじめてのページ</h1>
    <p>これがぼくの一歩目！</p>
  </body>
</html>`,
    },
    {
      id: "b1-l2",
      type: "lesson",
      title: "写経から始めよう",
      icon: "pencil",
      intro: "完璧に理解しなくていい",
      story: [
        { text: "「全部わかってから書く」——これ、じつは遠回り。逆なんだ。" },
        { text: "おすすめは「写経」。お手本のコードをそのまま真似して打って、まず動かしてみる。" },
        { text: "動いたら、数字や文字をちょっとだけ変えてみる。変えると何が変わる？——これが一番の勉強。" },
        { text: "コピペじゃなく“手で打つ”のがコツ。打つとタグの形やスペルが体にしみこむんだ。" },
        { text: "わからない所があっても止まらない。動かす→少し変える、をくり返せば、あとから理解が追いついてくるよ。" },
      ],
      takeaways: ["まず真似して打つ=写経", "動かしてから少しずつ変える", "コピペより“手打ち”で身につく"],
      practice: {
        prompt: "初心者の学び方として一番おすすめなのは？",
        choices: ["全部理解してから書く", "写経して動かし、少し変える", "眺めるだけ", "暗記だけする"],
        answer: 1,
        explain: "真似して打つ→動かす→少し変える、が一番身につきます。",
      },
    },
    {
      id: "b1-l3",
      type: "lesson",
      title: "エラーは敵じゃない",
      icon: "zap",
      intro: "赤い文字にビビらない",
      story: [
        { text: "コードを書くと、必ず「エラー」に出会う。でも安心して。エラーは敵じゃないんだ。" },
        { text: "エラーメッセージは“どこが変か”を教えてくれる道案内。無視せず、まず読んでみよう（英語ならAIに訳してもらってOK）。" },
        { text: "初級で「動かない時は指示の書き方を直す」と習ったね。エラーはその“直す場所”のヒントなんだ。" },
        { text: "つまずいたら、エラー文をそのままAIに貼って「これ何？どう直す？」と聞くのが最速。" },
        { text: "プロでも1日に何度もエラーを出す。エラーの数だけ上手くなる。こわがらず、どんどん出していこう！" },
      ],
      takeaways: ["エラー＝直す場所の道案内", "まずメッセージを読む（AI翻訳でOK）", "エラー文をAIに貼って聞くのが最速"],
      practice: {
        prompt: "エラーメッセージが出た。最初にやるべきは？",
        choices: ["すぐ閉じる", "メッセージを読む／AIに貼って聞く", "PCを買い替える", "見なかったことにする"],
        answer: 1,
        explain: "エラーは道案内。読むか、そのままAIに貼って聞くのが最速です。",
      },
    },
    {
      id: "b1-test",
      type: "test",
      title: "橋渡しテスト",
      icon: "pencil",
      intro: "8割で合格！“書く”マインドの確認",
      passRate: 0.8,
      deepDive:
        "プロも最初は写経から。大事なのは「完璧に理解してから進む」じゃなく「動かしながら慣れる」こと。エラーは上達の回数券だと思って、どんどん出していこう。次の章から、いよいよ本物のHTMLを書いていくよ。",
      questions: [
        {
          prompt: "コードを書くための道具は？",
          choices: ["表計算ソフト", "エディタ（VS Code等）", "電卓", "カメラ"],
          answer: 1,
          explain: "コードはエディタに書きます。定番は無料の VS Code。",
        },
        {
          prompt: "ファイル名の最後（.html など）が決めるのは？",
          choices: ["色", "ファイルの種類", "作った日", "作者"],
          answer: 1,
          explain: "拡張子（.html/.css 等）でファイルの種類が決まります。",
        },
        {
          prompt: "初心者におすすめの学び方は？",
          choices: ["全部理解してから書く", "写経して動かし、少し変える", "読むだけ", "暗記だけ"],
          answer: 1,
          explain: "まず真似して打って動かす“写経”→少し変える、が近道です。",
        },
        {
          prompt: "エラーが出たときの正しい態度は？",
          choices: ["こわいので閉じる", "メッセージを読む/AIに聞く", "PCを再起動し続ける", "見なかったことにする"],
          answer: 1,
          explain: "エラーは道案内。読むか、そのままAIに貼って聞くのが最速です。",
        },
        {
          prompt: "コピペと手打ち、身につくのは？",
          choices: ["コピペ", "手で打つ（写経）", "どちらも同じ", "打たない"],
          answer: 1,
          explain: "手で打つとタグの形やスペルが体にしみこみます。",
        },
      ],
    },
  ],

  // m1: HTMLを書いてみる（無料お試し・フル実装）
  m1: [
    {
      id: "m1-l1",
      type: "lesson",
      title: "タグは“ふせん”",
      icon: "code",
      intro: "HTMLの書き方の基本",
      story: [
        { text: "ここからは中級！いよいよ“自分の手で書く”練習に入るよ。" },
        { text: "初級で「HTML＝骨組み」って覚えたね。じゃあ実際どう書くの？" },
        { text: "HTMLは、文章に“ふせん（タグ）”を貼って「これは見出し」「これは段落」と意味づけしていくんだ。" },
        { text: "たとえば見出しは <h1>タイトル</h1>。前と後ろで <h1> と </h1> ではさむ。これが“開くタグ”と“閉じるタグ”。" },
        { text: "段落なら <p>本文</p>。この「はさむ」の形さえ覚えれば、HTMLの半分は読めたも同然だよ！" },
      ],
      takeaways: ["HTMLはタグで意味づけする", "<h1>…</h1> のように開いて閉じる", "見出し=h1〜h6 / 段落=p"],
      practice: {
        prompt: "段落（本文）を表すタグはどれ？",
        choices: ["<h1>", "<p>", "<img>", "<ul>"],
        answer: 1,
        explain: "段落は <p>。見出しは <h1>〜<h6> です。",
      },
      relatedSlugs: ["semantic-html", "dom"],
      codeSample: `<h1>今日のごはん</h1>
<p>カレーを作りました。</p>
<h2>材料</h2>
<p>にんじん、じゃがいも、玉ねぎ。</p>`,
    },
    {
      id: "m1-l2",
      type: "lesson",
      title: "リンクと画像",
      icon: "image",
      intro: "属性でくわしく指定する",
      story: [
        { text: "タグには“くわしい情報”をくっつけられる。それが「属性」だよ。" },
        { text: "リンクは <a href=\"行き先\">文字</a>。href（エイチレフ）に飛び先のURLを書くんだ。" },
        { text: "画像は <img src=\"画像の場所\" alt=\"説明\">。srcに画像の場所、altに“見えない人用の説明”。" },
        { text: "imgには閉じるタグがない。こういう“1個で完結するタグ”もあるんだ。" },
        { text: "属性は「タグへの追加オーダー」。href=行き先、src=画像、と役割で覚えよう。" },
      ],
      takeaways: ["属性=タグへの追加情報", "リンク=a href / 画像=img src", "altは画像の代わりの説明文"],
      practice: {
        prompt: "リンクの飛び先を指定する属性は？",
        choices: ["src", "href", "alt", "class"],
        answer: 1,
        explain: "<a href=\"…\"> で飛び先を指定します。画像の場所は src。",
      },
      relatedSlugs: ["dom"],
      codeSample: `<!-- リンク -->
<a href="https://example.com">サイトへ行く</a>

<!-- 画像（閉じタグなし） -->
<img src="cat.jpg" alt="ねこの写真">`,
    },
    {
      id: "m1-l3",
      type: "lesson",
      title: "入れ子とリスト",
      icon: "component",
      intro: "タグの中にタグを入れる",
      story: [
        { text: "HTMLはタグの中にタグを入れられる。これを「入れ子（ネスト）」って言うよ。" },
        { text: "たとえば箇条書きは、<ul> の中に <li>（項目）を並べる形。" },
        { text: "<ul><li>りんご</li><li>みかん</li></ul>——これで「・りんご ・みかん」の箇条書きになる。" },
        { text: "入れ子のときは、外で開いたら外で閉じる。順番を守るのが大事（重ならないように）。" },
        { text: "この“箱の中に箱”の考え方は、このあとのCSSでもずっと使うよ。" },
      ],
      takeaways: ["タグの中にタグ=入れ子（ネスト）", "箇条書き=ul の中に li", "開いた順と逆に閉じる"],
      practice: {
        prompt: "箇条書きの正しい書き方は？",
        choices: ["<li>の中に<ul>", "<ul>の中に<li>", "<p>の中に<li>", "<ul>だけ並べる"],
        answer: 1,
        explain: "<ul>（外）の中に <li>（項目）を入れます。",
      },
      relatedSlugs: ["dom", "card"],
      codeSample: `<ul>
  <li>りんご</li>
  <li>みかん</li>
  <li>ばなな</li>
</ul>`,
    },
    {
      id: "m1-test",
      type: "test",
      title: "中級テスト①",
      icon: "pencil",
      intro: "8割で合格！ここまでが中級の無料お試し",
      passRate: 0.8,
      deepDive:
        "HTMLは「意味づけ」が仕事。見た目はCSS、動きはJSに任せて、HTMLは“何があるか”だけを正しく書くのがコツ。見出しは大きくしたいからh1、ではなく「これは見出しだから」h1を使う——この考え方（セマンティック）が、検索エンジンや読み上げにもやさしいページを作るよ。",
      questions: [
        {
          prompt: "見出しを表すタグは？",
          choices: ["<p>", "<h1>", "<img>", "<a>"],
          answer: 1,
          explain: "見出しは <h1>〜<h6>。段落は <p> です。",
        },
        {
          prompt: "リンクの飛び先を指定する属性は？",
          choices: ["src", "alt", "href", "id"],
          answer: 2,
          explain: "リンク <a> の飛び先は href に書きます。",
        },
        {
          prompt: "画像タグ <img> の説明として正しいのは？",
          choices: ["閉じタグが必要", "srcに画像の場所を書く", "文字を表示する", "リンクを作る"],
          answer: 1,
          explain: "<img src=\"…\"> で画像の場所を指定。閉じタグは不要な単独タグです。",
        },
        {
          prompt: "箇条書きの正しい入れ子は？",
          choices: ["<li>の中に<ul>", "<ul>の中に<li>", "<p>の中に<h1>", "<a>の中に<img>だけ"],
          answer: 1,
          explain: "箇条書きは <ul>（外）の中に <li>（項目）を並べます。",
        },
        {
          prompt: "「入れ子」を正しく説明しているのは？",
          choices: ["タグを使わないこと", "タグの中にタグを入れること", "タグを閉じないこと", "属性のこと"],
          answer: 1,
          explain: "タグの中にタグを入れる構造＝入れ子（ネスト）です。",
        },
      ],
    },
  ],

  // m2〜m4 は VIP限定。器＋導入レッスンを用意（本文は今後拡充）。
  m2: [
    {
      id: "m2-l1",
      type: "lesson",
      title: "セレクタで狙う",
      icon: "droplet",
      intro: "CSSはどこに効かせる？",
      story: [
        { text: "中級の続きへようこそ。ここからは見た目＝CSSを“書く”練習だよ。" },
        { text: "CSSは「どの部品に」「どんな見た目を」の2点セット。“どの部品に”を指すのが「セレクタ」。" },
        { text: "たとえば h1 { color: green; } なら「すべての h1 を緑に」という意味。" },
        { text: "特定の部品だけ狙うには「クラス」を使う。HTMLで class=\"box\" と付けて、CSSで .box { … } と書く。" },
        { text: "セレクタ＝狙いを定める照準。次のレッスンで“何を指定できるか”を見ていくよ。" },
      ],
      takeaways: ["CSS=セレクタ+スタイルのセット", "全体を狙う=タグ名 / 一部を狙う=.クラス", "HTMLのclassとCSSの.名前が対応する"],
      practice: {
        prompt: "class=\"box\" の部品だけを狙うCSSは？",
        choices: [".box { … }", "#box { … }", "box { … }", "*box { … }"],
        answer: 0,
        explain: "クラスは先頭に . をつけて .box と書きます。",
      },
      relatedSlugs: ["flexbox"],
      codeSample: `/* すべての h1 を緑に */
h1 { color: green; }

/* class="box" の部品だけに効く */
.box { background: #f0f0f0; }`,
    },
    {
      id: "m2-l2",
      type: "lesson",
      title: "色と大きさの単位",
      icon: "droplet",
      intro: "何をどれだけ、を数字で",
      story: [
        { text: "見た目を作るには「色」と「大きさ」を指定できるようになろう。" },
        { text: "色は color（文字色）と background（背景色）。green のような名前でも、#40dc7e のようなカラーコードでもOK。" },
        { text: "大きさの単位は、まず px（ピクセル）。font-size: 16px なら「文字を16ピクセルに」。" },
        { text: "もうひとつ rem。これは「基準の文字サイズの何倍か」。1rem=だいたい16px。全体を一気に拡大縮小しやすいのが強み。" },
        { text: "% は「親の何割か」。width: 50% なら親の半分。単位を使い分けると、崩れにくい見た目が作れるよ。" },
      ],
      takeaways: ["色=color(文字)/background(背景)", "px=そのままの大きさ / rem=基準の何倍", "%=親のサイズに対する割合"],
      relatedSlugs: ["color-code", "rem-em"],
      practice: {
        prompt: "文字の色を指定するプロパティは？",
        choices: ["background", "color", "border", "width"],
        answer: 1,
        explain: "文字色は color、背景色は background です。",
      },
      codeSample: `.title {
  color: #40dc7e;   /* 文字色 */
  font-size: 24px;  /* 大きさ */
}
.wrap {
  width: 50%;       /* 親の半分 */
}`,
    },
    {
      id: "m2-l3",
      type: "lesson",
      title: "ボックスモデル",
      icon: "layout",
      intro: "すべての部品は“箱”",
      story: [
        { text: "CSSでいちばん大事な考え方が「ボックスモデル」。じつは部品はぜんぶ“箱”なんだ。" },
        { text: "箱は4つの層でできてる。中身（content）→ 内側の余白（padding）→ 枠線（border）→ 外側の余白（margin）。" },
        { text: "初級で覚えた margin と padding、これがここで効いてくる。padding は箱の“内ポケット”、margin は箱どうしの“間かく”。" },
        { text: "「なんかズレる」「思ったより大きい」の原因は、たいていこの箱の余白と枠。箱で考えると原因が見える。" },
        { text: "width で幅、height で高さ。箱のサイズと余白をあやつれれば、レイアウトの半分は勝ちだよ。" },
      ],
      takeaways: ["部品はぜんぶ箱（ボックス）", "中身→padding→border→margin の順の層", "ズレの原因は余白と枠を疑う"],
      practice: {
        prompt: "箱の“内側”の余白は？",
        choices: ["margin", "padding", "border", "width"],
        answer: 1,
        explain: "内側の余白は padding。外側の間かくは margin です。",
      },
      relatedSlugs: ["box-model", "margin", "padding"],
      codeSample: `.card {
  padding: 16px;              /* 内側の余白 */
  border: 2px solid #ddd;     /* 枠線 */
  margin: 24px;               /* 外側の間かく */
}`,
    },
    {
      id: "m2-test",
      type: "test",
      title: "中級テスト②",
      icon: "pencil",
      intro: "8割で合格！CSSの基本チェック",
      passRate: 0.8,
      deepDive:
        "CSSでつまずく人の9割は「ボックスモデル」でつまずく。逆に、余白（margin/padding）と枠（border）を箱でイメージできれば、レイアウトの悩みは激減する。うまくいかない時はブラウザの検証ツール（右クリック→検証）で、その箱の余白を色で見られるよ。プロも毎日使う道具。",
      questions: [
        {
          prompt: "特定の部品だけ狙うときに使うのは？",
          choices: ["タグ名だけ", "クラス（.名前）", "改行", "コメント"],
          answer: 1,
          explain: "一部だけ狙うにはクラス。HTMLで class=\"box\"、CSSで .box { … }。",
        },
        {
          prompt: "背景の色を指定するプロパティは？",
          choices: ["color", "background", "border", "margin"],
          answer: 1,
          explain: "文字色は color、背景色は background です。",
        },
        {
          prompt: "「基準の文字サイズの何倍か」を表す単位は？",
          choices: ["px", "rem", "%", "pt"],
          answer: 1,
          explain: "rem は基準サイズの倍率。px はそのままの大きさです。",
        },
        {
          prompt: "ボックスモデルで“箱の内側の余白”は？",
          choices: ["margin", "border", "padding", "content"],
          answer: 2,
          explain: "内側の余白＝padding。外側の間かくは margin です。",
        },
        {
          prompt: "レイアウトが“なんかズレる”とき、まず疑うのは？",
          choices: ["色の名前", "余白（margin/padding）と枠", "文字の内容", "画像の枚数"],
          answer: 1,
          explain: "ズレの原因は箱の余白と枠が定番。ボックスで考えると見えてきます。",
        },
      ],
    },
  ],
  m3: [
    {
      id: "m3-l1",
      type: "lesson",
      title: "変数は“名前つきの箱”",
      icon: "zap",
      intro: "JavaScriptで動きをつける",
      story: [
        { text: "ここからは動き＝JavaScript。“考えて動く”部分を書けるようになろう。" },
        { text: "まず「変数」。データを一時的に入れておく“名前つきの箱”のことだよ。" },
        { text: "let count = 0; なら「count という箱に 0 を入れた」。あとで count = count + 1 で増やせる。" },
        { text: "ボタンが押されたら count を増やす——こういう“状態”を持てるのが動きの正体。" },
        { text: "初級で覚えた「JS=動き」を、ここで実際に書けるようにしていくよ。" },
      ],
      takeaways: ["変数=名前つきのデータの箱", "letで箱を用意して値を入れる", "値を変えられるから“動き”が作れる"],
      relatedSlugs: ["variable"],
      practice: {
        prompt: "「データを入れておく名前つきの箱」は？",
        choices: ["関数", "変数", "属性", "タグ"],
        answer: 1,
        explain: "名前つきの箱＝変数。let などで用意します。",
      },
      codeSample: `let count = 0;   // countという箱に0を入れる
count = count + 1;  // 1を足す → count は 1 に
console.log(count); // 1 と表示`,
    },
    {
      id: "m3-l2",
      type: "lesson",
      title: "関数はまとめ技",
      icon: "code",
      intro: "手順に名前をつける",
      story: [
        { text: "同じ手順を何回も書くのは面倒。そこで「関数」＝“手順のまとめ”に名前をつけて使い回すんだ。" },
        { text: "function greet() { … } と書くと、greet という名前の手順ができる。呼ぶときは greet() でOK。" },
        { text: "関数には材料を渡せる。これが「引数（ひきすう）」。greet(\"あやと\") のように名前を渡して、中で使う。" },
        { text: "計算した答えを外に返すのが「戻り値（return）」。関数＝材料を入れたら答えが返る“自販機”みたいなもの。" },
        { text: "処理を関数にまとめると、読みやすく・直しやすくなる。プロのコードは関数だらけだよ。" },
      ],
      takeaways: ["関数=手順に名前をつけて使い回す", "材料=引数 / 答え=戻り値(return)", "まとめると読みやすく直しやすい"],
      relatedSlugs: ["function", "argument", "return-value", "variable"],
      practice: {
        prompt: "関数が答えを外に返すのに使うのは？",
        choices: ["return", "let", "click", "class"],
        answer: 0,
        explain: "計算結果を返すのは return（戻り値）です。",
      },
      codeSample: `function greet(name) {
  return "こんにちは、" + name + "さん！";
}
greet("あやと"); // → "こんにちは、あやとさん！"`,
    },
    {
      id: "m3-l3",
      type: "lesson",
      title: "イベントと条件分岐",
      icon: "zap",
      intro: "押したら動く、を作る",
      story: [
        { text: "いよいよ“動き”の核心。ユーザーの操作に反応するのが「イベント」だよ。" },
        { text: "「ボタンがクリックされたら◯◯する」——これを addEventListener(\"click\", …) で登録する。" },
        { text: "反応の中で「もし〜なら」を分けたいときは「条件分岐（if）」。if (点数 >= 80) { 合格 } else { もう一回 } みたいに。" },
        { text: "初級のテストで見た“8割で合格”も、中身はこの if の判定なんだ。もう仕組みがわかるね。" },
        { text: "変数＋関数＋イベント＋if。この4つがそろうと、ちょっとした動きは自分で書けるようになるよ！" },
      ],
      takeaways: ["操作への反応=イベント（click等）", "登録は addEventListener", "「もし〜なら」=条件分岐(if/else)"],
      practice: {
        prompt: "「もし80点以上なら合格」のように分けるのは？",
        choices: ["変数", "条件分岐(if)", "関数", "コメント"],
        answer: 1,
        explain: "条件で処理を分けるのは if（条件分岐）です。",
      },
      relatedSlugs: ["button", "toggle-switch"],
      codeSample: `button.addEventListener("click", () => {
  if (score >= 80) {
    alert("合格！");
  } else {
    alert("もう一回！");
  }
});`,
    },
    {
      id: "m3-test",
      type: "test",
      title: "中級テスト③",
      icon: "pencil",
      intro: "8割で合格！JavaScriptの基本チェック",
      passRate: 0.8,
      deepDive:
        "変数・関数・イベント・条件分岐。この4つは、どんな言語でも共通の“プログラミングの背骨”なんだ。だからここを越えれば、PythonでもSwiftでも入り口はぐっとラクになる。まずは console.log() で「今どうなってる？」を確認しながら書くクセをつけると、動きが手に取るようにわかるよ。",
      questions: [
        {
          prompt: "データを入れておく“名前つきの箱”は？",
          choices: ["関数", "変数", "イベント", "タグ"],
          answer: 1,
          explain: "データを入れる名前つきの箱＝変数。let などで用意します。",
        },
        {
          prompt: "手順に名前をつけて使い回すしくみは？",
          choices: ["変数", "関数", "属性", "セレクタ"],
          answer: 1,
          explain: "手順のまとめ＝関数。呼ぶときは 名前() で実行します。",
        },
        {
          prompt: "関数に渡す“材料”のことを何という？",
          choices: ["戻り値", "引数", "イベント", "クラス"],
          answer: 1,
          explain: "関数に渡す材料＝引数。答えを返すのが戻り値(return)です。",
        },
        {
          prompt: "「クリックされたら動く」を登録するのは？",
          choices: ["addEventListener", "background", "margin", "return"],
          answer: 0,
          explain: "操作への反応（イベント）は addEventListener で登録します。",
        },
        {
          prompt: "「もし80点以上なら合格」のように処理を分けるのは？",
          choices: ["ループ", "条件分岐(if)", "変数", "コメント"],
          answer: 1,
          explain: "条件で処理を分ける＝条件分岐(if/else)です。",
        },
      ],
    },
  ],

  // m9: たくさんをまとめて扱う（中級・VIP）——配列とくり返し
  m9: [
    {
      id: "m9-l1",
      type: "lesson",
      title: "ならびの箱＝配列",
      icon: "component",
      intro: "複数をまとめて持つ",
      story: [
        { text: "変数は“1つの箱”だったね。でも「果物を3つ」みたいに“たくさん”を持ちたいことがある。" },
        { text: "そこで「配列（はいれつ）」。[ ] の中に、値をカンマで区切って並べて、まとめて1つの変数に入れる。" },
        { text: "取り出すときは“番号”を使う。ただし数え始めは0番から。fruits[0] が1個目、fruits[1] が2個目だよ。" },
        { text: "「0から数える」はプログラミングの世界のクセ。最初はとまどうけど、すぐ慣れる。" },
        { text: "カートの中身、todoリスト、検索結果——世の中の“一覧”はだいたい配列でできているんだ。" },
      ],
      takeaways: ["配列=[ ]で複数をまとめて持つ", "取り出しは番号（0番から数える）", "世の中の“一覧”はだいたい配列"],
      relatedSlugs: ["array", "variable"],
      practice: {
        prompt: "配列 fruits = [\"りんご\", \"みかん\"] の1個目を取り出すのは？",
        choices: ["fruits[0]", "fruits[1]", "fruits(1)", "fruits.first"],
        answer: 0,
        explain: "配列は0番から数えるので、1個目は fruits[0] です。",
      },
      codeSample: `const fruits = ["りんご", "みかん", "ばなな"];
fruits[0]; // "りんご"（0番目）
fruits.length; // 3（個数）`,
    },
    {
      id: "m9-l2",
      type: "lesson",
      title: "くり返しで全部処理",
      icon: "sliders",
      intro: "手作業をまかせる",
      story: [
        { text: "配列の全部に同じことをしたい。100件を手で書く…なんてしなくていい。" },
        { text: "「くり返し（ループ）」の出番。for を使うと、1件ずつ自動で処理してくれる。" },
        { text: "「配列のぜんぶに対して、これをやって」と一度書けば、3件でも1000件でも同じコードでいける。" },
        { text: "配列のforEachも便利。「1件ずつ取り出して、こうして」を、すっきり書ける書き方だよ。" },
        { text: "くり返しは、コンピュータの一番の得意技。“めんどうな繰り返しは機械に任せる”のがプログラミングの醍醐味だ。" },
      ],
      takeaways: ["同じ処理のくり返し=ループ（for）", "配列×ループで一覧をまとめて処理", "件数が増えてもコードは1回書くだけ"],
      relatedSlugs: ["loop", "array"],
      practice: {
        prompt: "配列の全部に同じ処理をするのに使うのは？",
        choices: ["くり返し（for）", "条件分岐（if）", "変数", "コメント"],
        answer: 0,
        explain: "同じ処理のくり返しは for などのループで書きます。",
      },
      codeSample: `const fruits = ["りんご", "みかん"];
for (const f of fruits) {
  console.log(f); // 1件ずつ表示
}`,
    },
    {
      id: "m9-l3",
      type: "lesson",
      title: "選ぶ・つくり変える",
      icon: "search",
      intro: "配列の便利ワザ",
      story: [
        { text: "配列は、ただ並べるだけじゃない。“選ぶ”“作り変える”ができると一気に実戦的になる。" },
        { text: "末尾に足すのは push。買い物カゴに商品を追加、みたいな操作だね。" },
        { text: "「条件に合うものだけ選ぶ」のが filter。例：値段が1000円以下の商品だけ取り出す、みたいに。" },
        { text: "「全部を別の形に変える」のが map。例：商品の配列から“名前だけ”の配列を作る、とか。" },
        { text: "filter（選ぶ）と map（作り変える）。この2つが使えると、一覧を扱うコードがぐっとプロっぽくなるよ。" },
      ],
      takeaways: ["末尾に追加=push", "条件で選ぶ=filter", "別の形に作り変える=map"],
      relatedSlugs: ["array", "loop"],
      practice: {
        prompt: "「条件に合う要素だけ取り出す」のは？",
        choices: ["push", "filter", "map", "length"],
        answer: 1,
        explain: "条件で選ぶのは filter。別の形に変えるのは map です。",
      },
      codeSample: `const nums = [1, 2, 3, 4];
nums.filter((n) => n % 2 === 0); // [2, 4]（偶数だけ）
nums.map((n) => n * 2);          // [2, 4, 6, 8]（2倍に）`,
    },
    {
      id: "m9-test",
      type: "test",
      title: "中級テスト（配列）",
      icon: "pencil",
      intro: "8割で合格！配列とくり返しチェック",
      passRate: 0.8,
      deepDive:
        "配列とくり返しは、データを扱う全ての土台。この先で出てくる「APIで取った一覧を表示」「状態のリスト管理」も、中身は配列×ループなんだ。filter と map に慣れると、for を書かずに“選ぶ・作り変える”がスッと書けるようになる。ここを押さえた君は、もう“たくさんのデータ”を怖がらない。",
      questions: [
        {
          prompt: "複数のデータを“ならび”で持つのは？",
          choices: ["配列", "変数1つ", "関数", "コメント"],
          answer: 0,
          explain: "複数をまとめて持つのが配列（[ ]）です。",
        },
        {
          prompt: "配列の1個目を取り出すには？",
          choices: ["arr[1]", "arr[0]", "arr.first", "arr(1)"],
          answer: 1,
          explain: "配列は0番から数えるので、1個目は arr[0] です。",
        },
        {
          prompt: "同じ処理を全要素にくり返すのは？",
          choices: ["for（ループ）", "if", "return", "let"],
          answer: 0,
          explain: "くり返しは for などのループで書きます。",
        },
        {
          prompt: "配列の末尾に要素を足すのは？",
          choices: ["push", "filter", "map", "length"],
          answer: 0,
          explain: "末尾への追加は push。選ぶは filter、変えるは map です。",
        },
        {
          prompt: "「条件に合うものだけ選ぶ」のは？",
          choices: ["map", "filter", "push", "for"],
          answer: 1,
          explain: "条件で選ぶのは filter。別の形に変えるのは map です。",
        },
      ],
    },
  ],

  m4: [
    {
      id: "m4-l1",
      type: "lesson",
      title: "サーバーに“お願い”する",
      icon: "wrench",
      intro: "APIとデータのやりとり",
      story: [
        { text: "中級の仕上げは「データのやりとり」。天気や商品一覧を“外から取ってくる”話だよ。" },
        { text: "初級で「API＝注文の窓口」と覚えたね。ここではその窓口に実際にお願いする。" },
        { text: "お願いして返ってくるデータの多くは「JSON」という形式。名前と値がセットで並んだ、機械が読みやすい書き方。" },
        { text: "返事はすぐ来ないこともある。だから“待ってから続きをやる”＝「非同期」という考え方が出てくる。" },
        { text: "ここまで来ると、外のデータを使った“本物っぽいアプリ”に近づくよ。" },
      ],
      takeaways: ["APIにお願いしてデータを取る", "やりとりの形式=JSON（名前と値の組）", "返事を待つしくみ=非同期"],
      practice: {
        prompt: "外部からデータを取り寄せる“窓口”は？",
        choices: ["CSS", "API", "margin", "class"],
        answer: 1,
        explain: "データを取り寄せる窓口＝API。返事の多くはJSONです。",
      },
      relatedSlugs: ["api", "backend"],
    },
    {
      id: "m4-l2",
      type: "lesson",
      title: "JSONの読み方",
      icon: "component",
      intro: "名前と値の組でできてる",
      story: [
        { text: "APIから返ってくる JSON、ちょっと読めるようになろう。じつは規則はシンプルだよ。" },
        { text: "基本は「名前：値」の組。{ \"name\": \"あやと\", \"age\": 20 } なら、名前があやと・年齢が20。" },
        { text: "{ } は“ひとまとまり（オブジェクト）”。1人分の情報をまとめる箱だと思えばいい。" },
        { text: "[ ] は“ならび（配列）”。[ { 商品1 }, { 商品2 } ] のように、同じ形のデータを何個も並べる。" },
        { text: "JavaScriptの変数・オブジェクトとそっくり。だから取ってきたJSONは、そのままコードで使いやすいんだ。" },
      ],
      takeaways: ["JSON=「名前：値」の組", "{ }=ひとまとまり（オブジェクト）", "[ ]=同じ形の並び（配列）"],
      relatedSlugs: ["json"],
      practice: {
        prompt: "同じ形のデータを何個も並べる記号は？",
        choices: ["{ }", "[ ]", "( )", "< >"],
        answer: 1,
        explain: "並び（配列）は [ ]。ひとまとまりは { } です。",
      },
      codeSample: `{
  "name": "あやと",
  "age": 20,
  "hobbies": ["コード", "散歩"]
}`,
    },
    {
      id: "m4-l3",
      type: "lesson",
      title: "待つ・失敗にそなえる",
      icon: "sliders",
      intro: "非同期とエラー処理",
      story: [
        { text: "外からデータを取るのは“時間がかかる”作業。だから「待ってから続きをやる」書き方がいるんだ。" },
        { text: "「取ってくる間は待つ」を素直に書けるのが await。await のあいだ、他の処理は止めずに待てる。" },
        { text: "待っている間、画面には「スピナー（読み込み中）」を出すと親切。初級で覚えたあの部品だね。" },
        { text: "通信は失敗することもある（電波が悪い等）。だから「うまくいかなかったら」の分岐＝エラー処理も用意する。" },
        { text: "取得中→成功→失敗、の3つを考えられると、一気に“ちゃんとしたアプリ”っぽくなるよ。" },
      ],
      takeaways: ["時間がかかる処理=非同期（await で待つ）", "待機中はスピナーを出すと親切", "失敗にそなえてエラー処理も書く"],
      practice: {
        prompt: "時間がかかる処理を「待ってから続ける」のは？",
        choices: ["await（非同期）", "return", "if", "let"],
        answer: 0,
        explain: "待ってから続ける＝非同期。await で素直に書けます。",
      },
      relatedSlugs: ["async", "spinner", "toast"],
      codeSample: `try {
  const res = await fetch("/api/weather"); // 待つ
  const data = await res.json();           // JSONに変換
  console.log(data);
} catch (e) {
  console.log("取得に失敗しました");        // 失敗にそなえる
}`,
    },
    {
      id: "m4-test",
      type: "test",
      title: "中級テスト（データ取得）",
      icon: "pencil",
      intro: "8割で合格！API・JSON・非同期チェック",
      passRate: 0.8,
      deepDive:
        "API・JSON・非同期がわかると、天気・地図・SNSなど“外のデータ”を使ったアプリが作れる。世の中のWebサービスはほぼこのAPIのやりとりでできているんだ。ここまでは“考え方”。次の章では、実際に本物のAPIを叩いて画面に出す“実践”をやってみよう！",
      questions: [
        {
          prompt: "外部からデータを取り寄せる“窓口”は？",
          choices: ["CSS", "API", "margin", "セレクタ"],
          answer: 1,
          explain: "データを取り寄せる窓口＝API。返事の多くはJSON形式です。",
        },
        {
          prompt: "JSONの基本の形は？",
          choices: ["名前：値の組", "色コードだけ", "画像だけ", "タグの入れ子"],
          answer: 0,
          explain: "JSONは「名前：値」の組み合わせでできています。",
        },
        {
          prompt: "同じ形のデータを何個も並べるのに使う記号は？",
          choices: ["{ }", "[ ]", "( )", "< >"],
          answer: 1,
          explain: "並び（配列）は [ ]。ひとまとまり（オブジェクト）は { } です。",
        },
        {
          prompt: "時間がかかる処理を「待ってから続ける」しくみは？",
          choices: ["同期", "非同期（await）", "条件分岐", "変数"],
          answer: 1,
          explain: "待ってから続ける＝非同期。await で素直に書けます。",
        },
        {
          prompt: "データ取得中に画面に出すとよい部品は？",
          choices: ["モーダル", "スピナー", "ハンバーガーメニュー", "アバター"],
          answer: 1,
          explain: "読み込み中はスピナーで“準備中”を伝えると親切です。",
        },
      ],
    },
  ],

  // m10: 本物のデータで動かす（中級・VIP）——API実践
  m10: [
    {
      id: "m10-l1",
      type: "lesson",
      title: "APIを叩いてみる",
      icon: "wrench",
      intro: "実際に取ってくる",
      story: [
        { text: "前の章で“考え方”はわかったね。ここからは実際に本物のAPIを使って手を動かそう。" },
        { text: "APIを呼ぶことを、現場では「APIを叩く」なんて言う。fetch でお願いして、返事（データ）を受け取る。" },
        { text: "たとえば無料の天気APIや、猫の画像API。URLを fetch するだけで、本物のデータが返ってくる。" },
        { text: "返ってきたら .json() でJSONに変換。中級で読んだ「名前：値」の形が、そのまま手に入るよ。" },
        { text: "自分のコードに“世界のデータ”が流れ込む瞬間は、ちょっと感動する。まずは1つ叩いてみよう！" },
      ],
      takeaways: ["APIを呼ぶ=「叩く」", "fetch(URL)でお願いする", "返事は .json() でJSONに変換"],
      relatedSlugs: ["fetch", "api", "async", "json"],
      practice: {
        prompt: "取ってきた返事をJSONに変換するのは？",
        choices: ["res.json()", "res.color()", "res.push()", "res.git()"],
        answer: 0,
        explain: "fetch の返事は res.json() でJSON（名前:値）に変換します。",
      },
      codeSample: `const res = await fetch("https://api.example.com/weather");
const data = await res.json();
console.log(data.temperature); // 取れたデータを使う`,
    },
    {
      id: "m10-l2",
      type: "lesson",
      title: "取った一覧を表示",
      icon: "component",
      intro: "配列×くり返しの出番",
      story: [
        { text: "APIは“一覧”を返すことが多い。商品10件、投稿20件、みたいにね。" },
        { text: "その正体は配列。m9で習った配列とくり返しが、ここでフルに効いてくる。" },
        { text: "取ってきた配列を map で回して、1件ずつ画面のカードに変換する——これが一覧表示の王道パターン。" },
        { text: "「データを取る→配列を回す→部品に流し込む」。この流れは、どんなアプリでも繰り返し出てくる基本形だよ。" },
        { text: "中級で学んだ“部品・配列・くり返し・データ取得”が、ここで1本につながる。集大成の実感がわくはず。" },
      ],
      takeaways: ["APIの返事はたいてい配列", "map で1件ずつ画面に変換", "取る→回す→部品に流す が王道"],
      relatedSlugs: ["array", "loop", "card"],
      practice: {
        prompt: "取ってきた配列を1件ずつ画面用に変換するのは？",
        choices: ["map", "fetch", "commit", "await"],
        answer: 0,
        explain: "配列を別の形（カード等）に変換するのは map です。",
      },
      codeSample: `const items = await (await fetch("/api/items")).json();
items.map((item) => \`<div class="card">\${item.name}</div>\`);`,
    },
    {
      id: "m10-l3",
      type: "lesson",
      title: "うまくいかない時にそなえる",
      icon: "sliders",
      intro: "読み込み中・エラー・空",
      story: [
        { text: "本物のAPIを使うと、“いつも成功”とは限らない。だから3つの状態に備えるんだ。" },
        { text: "①読み込み中：取ってくる間はスピナーを出す。初級で覚えたあの部品だね。" },
        { text: "②失敗：通信エラーもある。try/catchで受け止めて、「取得に失敗しました」とやさしく伝える。" },
        { text: "③空っぽ：データが0件のことも。「まだありません」と出せば、画面が真っ白で不安、を防げる。" },
        { text: "「成功だけ考える」から「3つの状態を考える」へ。ここを押さえると、一気に“本物のアプリ”になるよ。" },
      ],
      takeaways: ["読み込み中はスピナー", "失敗はtry/catchでやさしく伝える", "0件のときの表示も用意する"],
      relatedSlugs: ["spinner", "toast", "async"],
      practice: {
        prompt: "APIを使うとき、成功のほかに備えるべき状態は？",
        choices: ["読み込み中・失敗・空っぽ", "色と大きさ", "太字と斜体", "何もない"],
        answer: 0,
        explain: "読み込み中・失敗・0件の3つに備えると本物のアプリになります。",
      },
    },
    {
      id: "m10-test",
      type: "test",
      title: "実践テスト（API）",
      icon: "pencil",
      intro: "8割で合格！API実践チェック",
      passRate: 0.8,
      deepDive:
        "「データを取る→配列を回す→部品に流す→3つの状態に備える」。この一連の流れは、SNSも通販もニュースアプリも、中身は全部これ。つまり君はもう、世の中のWebサービスの“心臓部”を書けるということ。中級で積み上げた部品・配列・非同期が、ここで見事に合流した。あとはこれを組み合わせるだけだ！",
      questions: [
        {
          prompt: "APIにお願いして返事を受け取るのは？",
          choices: ["fetch", "commit", "margin", "hover"],
          answer: 0,
          explain: "fetch(URL) でお願いし、返事を受け取ります。",
        },
        {
          prompt: "返事をJSONに変換するのは？",
          choices: ["res.json()", "res.push()", "res.map()", "res.git()"],
          answer: 0,
          explain: "res.json() でJSON（名前:値）に変換します。",
        },
        {
          prompt: "取ってきた配列を1件ずつ画面用に変えるのは？",
          choices: ["map", "filter", "fetch", "await"],
          answer: 0,
          explain: "別の形に変換するのは map。選ぶのは filter です。",
        },
        {
          prompt: "読み込み中に画面へ出すとよい部品は？",
          choices: ["スピナー", "モーダル", "ヘッダー", "アバター"],
          answer: 0,
          explain: "読み込み中はスピナーで“準備中”を伝えます。",
        },
        {
          prompt: "APIを使うとき備えるべき3状態は？",
          choices: ["読み込み中・失敗・空っぽ", "赤・青・緑", "大・中・小", "朝・昼・夜"],
          answer: 0,
          explain: "読み込み中・失敗・0件の3つに備えるのが実践のコツです。",
        },
      ],
    },
  ],

  // m5: フォームを作る（中級・実践・VIP）——初級c6の予約サイトを“コードで”組む
  m5: [
    {
      id: "m5-l1",
      type: "lesson",
      title: "フォームの部品",
      icon: "user",
      intro: "入力を受け取る箱",
      story: [
        { text: "ここからは中級の実践編！ユーザーから情報を受け取る「フォーム」を作るよ。" },
        { text: "全体を <form> で囲む。この中に入力欄やボタンを入れていくんだ。" },
        { text: "文字を打つ欄は <input>。<label> とセットにすると「何を書く欄か」がはっきりする。" },
        { text: "required をつけると「未入力では送れない」必須項目になる。かんたんなチェックはHTMLだけでもできる。" },
        { text: "初級で名前を覚えた入力欄・ラベル・ボタン。それを“実際に書く”のがこの章のゴールだよ。" },
      ],
      takeaways: ["フォーム全体=<form>で囲む", "入力欄=<input> / 見出し=<label>", "required=必須（未入力だと送れない）"],
      practice: {
        prompt: "「未入力では送れない」必須項目にする属性は？",
        choices: ["value", "required", "type", "name"],
        answer: 1,
        explain: "required をつけると必須項目になります。",
      },
      relatedSlugs: ["form", "text-field", "button"],
      codeSample: `<form>
  <label>お名前
    <input type="text" required>
  </label>
  <button type="submit">送信</button>
</form>`,
    },
    {
      id: "m5-l2",
      type: "lesson",
      title: "送信を受け取る",
      icon: "zap",
      intro: "JSでフォームを動かす",
      story: [
        { text: "フォームは、送信ボタンを押すとページが“再読み込み”されるのが標準の動き。" },
        { text: "でも今どきのアプリは、再読み込みせず自分で処理したい。そこで e.preventDefault() で標準動作を止める。" },
        { text: "止めたうえで、入力された値を取り出す。input.value で「いま打たれている文字」が取れるよ。" },
        { text: "取った値が空じゃないか、形式は正しいかを確かめるのが「バリデーション（入力チェック）」。" },
        { text: "中級で習ったイベントと条件分岐が、ここで全部つながる。フォームは総合演習なんだ。" },
      ],
      takeaways: ["送信時の標準動作=preventDefaultで止める", "入力値は input.value で取る", "入力チェック=バリデーション"],
      practice: {
        prompt: "入力された文字を取り出すのは？",
        choices: ["input.color", "input.value", "input.size", "input.href"],
        answer: 1,
        explain: "いま打たれている文字は input.value で取れます。",
      },
      relatedSlugs: ["form", "toast"],
      codeSample: `form.addEventListener("submit", (e) => {
  e.preventDefault();          // 再読み込みを止める
  const name = input.value;    // 入力値を取る
  if (name === "") {
    alert("お名前を入力してね");  // バリデーション
    return;
  }
  alert(name + "さん、送信しました！");
});`,
    },
    {
      id: "m5-l3",
      type: "lesson",
      title: "予約フォームを組む",
      icon: "wrench",
      intro: "初級のゴールをコードで",
      story: [
        { text: "仕上げ！初級の最後に“部品の名前”で組んだ予約サイトを、今度は“コード”で組み立てよう。" },
        { text: "名前は入力欄、日付は日付入力、通知の希望はチェックボックス、送信はボタン。部品をformに並べる。" },
        { text: "送信されたら、preventDefaultで止めて、値をまとめて「この内容でOK？」と確認を出す。" },
        { text: "OKなら「予約できました！」とトーストで知らせる。初級で覚えたモーダル・トーストが、ここで実物になる。" },
        { text: "名前を知る（初級）→書ける（中級）。この章で“ひとつの機能を最後まで作る”体験ができたね。すごい成長だ！" },
      ],
      takeaways: ["部品をformに並べて機能にする", "送信→確認→完了の流れを作る", "初級で知った部品が、コードで動く実物になる"],
      practice: {
        prompt: "送信完了をさりげなく知らせるのに向くのは？",
        choices: ["モーダル", "トースト", "スピナー", "ヘッダー"],
        answer: 1,
        explain: "自動で消える完了通知＝トースト。確認はモーダルが向きます。",
      },
      relatedSlugs: ["form", "checkbox", "modal", "toast"],
      codeSample: `<form id="reserve">
  <label>お名前 <input type="text" name="name" required></label>
  <label>日付 <input type="date" name="date" required></label>
  <label><input type="checkbox" name="notify"> 通知を受け取る</label>
  <button type="submit">予約する</button>
</form>`,
    },
    {
      id: "m5-test",
      type: "test",
      title: "実践テスト（フォーム）",
      icon: "pencil",
      intro: "8割で合格！フォーム総合チェック",
      passRate: 0.8,
      deepDive:
        "フォームは「HTML（部品）＋CSS（見た目）＋JS（送信処理）」が全部乗る総合演習。ここを自分で組めたら、問い合わせ・ログイン・予約など“実際のサービスの入口”が作れるということ。実務では送信後にサーバーへ保存するけど、その一歩手前まで、もう君は書けるようになったよ。",
      questions: [
        {
          prompt: "フォーム全体を囲むタグは？",
          choices: ["<div>", "<form>", "<input>", "<label>"],
          answer: 1,
          explain: "入力部品をまとめる全体＝<form>で囲みます。",
        },
        {
          prompt: "「未入力では送れない」必須項目にする属性は？",
          choices: ["required", "value", "href", "src"],
          answer: 0,
          explain: "required をつけると必須項目になります。",
        },
        {
          prompt: "送信時の“ページ再読み込み”を止めるには？",
          choices: ["return true", "e.preventDefault()", "console.log()", "alert()"],
          answer: 1,
          explain: "標準の送信動作は e.preventDefault() で止められます。",
        },
        {
          prompt: "入力された文字を取り出すのは？",
          choices: ["input.value", "input.color", "input.size", "input.href"],
          answer: 0,
          explain: "いま打たれている文字は input.value で取得します。",
        },
        {
          prompt: "入力が正しいか確かめることを何という？",
          choices: ["デプロイ", "バリデーション", "レスポンシブ", "コミット"],
          answer: 1,
          explain: "入力チェック＝バリデーション。空や形式ちがいを防ぎます。",
        },
      ],
    },
  ],

  // m6: 状態を整理する（中級・VIP）——Reactの state への橋渡し
  m6: [
    {
      id: "m6-l1",
      type: "lesson",
      title: "状態ってなに？",
      icon: "sliders",
      intro: "画面の“今の様子”",
      story: [
        { text: "アプリを作っていると必ず出てくるのが「状態（ステート）」という考え方。" },
        { text: "状態＝画面の“今の様子”のこと。「メニューは開いてる？」「読み込み中？」「エラー？」——これ全部が状態だ。" },
        { text: "たとえばモーダルは「開いてる／閉じてる」の2つの状態を持つ。今どっちかを覚えておく必要がある。" },
        { text: "中級で習った変数は、この状態を持つための箱。isOpen という変数に true/false を入れて管理するんだ。" },
        { text: "「今どうなってる？」を変数で持つ——これが状態管理の第一歩。上級のReactでも同じ考え方を使うよ。" },
      ],
      takeaways: ["状態=画面の“今の様子”", "開閉・読み込み中・エラーなどが状態", "状態は変数で持って管理する"],
      relatedSlugs: ["modal", "spinner"],
      practice: {
        prompt: "「状態」の説明として正しいのは？",
        choices: ["画面の見た目の色", "画面の“今の様子”（開閉・読込中など）", "ファイルの名前", "タグの種類"],
        answer: 1,
        explain: "状態＝今どうなっているか。開閉・読み込み中・エラーなどを指します。",
      },
      codeSample: `let isOpen = false;   // メニューは閉じている

function toggle() {
  isOpen = !isOpen;   // 押すたびに開閉を反転
}`,
    },
    {
      id: "m6-l2",
      type: "lesson",
      title: "フラグとリスト",
      icon: "component",
      intro: "状態の2大パターン",
      story: [
        { text: "状態には、よく出る“形”がある。まず覚えたいのが「フラグ」と「リスト」の2つ。" },
        { text: "フラグは true / false の2択。「表示する？」「送信済み？」みたいなON/OFFを1つの変数で持つ。" },
        { text: "リストは配列。「カートの中身」「todoの一覧」みたいに“ならび”で持つ状態だね。中級で習った [ ] だ。" },
        { text: "リストは、追加（push）や削除で中身が変わる。変わったら画面も更新する——ここが状態管理の勘所。" },
        { text: "フラグで“切り替え”、リストで“ならび”。この2つで、たいていの画面の状態は表せるよ。" },
      ],
      takeaways: ["フラグ=true/falseの2択の状態", "リスト=配列で持つ“ならび”の状態", "状態が変わったら画面も更新する"],
      relatedSlugs: ["list-group", "empty-state"],
      practice: {
        prompt: "「表示する／しない」を1つで持つのに向くのは？",
        choices: ["フラグ(true/false)", "リスト(配列)", "画像", "リンク"],
        answer: 0,
        explain: "ON/OFFの2択はフラグ。ならびで持つならリスト（配列）です。",
      },
      codeSample: `let submitted = false;        // フラグ
let cart = ["りんご", "みかん"]; // リスト（配列）

cart.push("ばなな");           // リストに追加`,
    },
    {
      id: "m6-l3",
      type: "lesson",
      title: "状態は1か所に",
      icon: "layout",
      intro: "散らばると壊れる",
      story: [
        { text: "状態管理でいちばん大事なコツ。それは「状態を1か所にまとめる」こと。" },
        { text: "同じ情報をあちこちにコピーして持つと、片方だけ更新し忘れて“ズレ”が起きる。バグの温床だ。" },
        { text: "だから「本物の状態は1つ」と決めて、画面はそれを見て表示する。これを“信頼できる唯一の情報源”という。" },
        { text: "たとえばカートの中身は1つの配列にまとめ、合計金額はそこから計算する。二重に持たないのがコツ。" },
        { text: "この考え方が、上級のReact（state）にそのままつながる。状態を制する者がアプリを制すよ。" },
      ],
      takeaways: ["状態は1か所にまとめる", "コピーして二重に持つとズレる", "画面は“唯一の状態”を見て表示する"],
      practice: {
        prompt: "状態管理で“バグの温床”になりやすいのは？",
        choices: ["状態を1か所にまとめる", "同じ情報を二重に持つ", "変数を使う", "配列を使う"],
        answer: 1,
        explain: "同じ情報を二重に持つと更新忘れでズレます。1か所にまとめましょう。",
      },
    },
    {
      id: "m6-test",
      type: "test",
      title: "中級テスト（状態管理）",
      icon: "pencil",
      intro: "8割で合格！状態の考え方チェック",
      passRate: 0.8,
      deepDive:
        "「状態を1か所に、変わったら画面を更新」——これは規模が大きくなるほど効いてくる、モダン開発の背骨。ReactやVueなどの人気ツールは、この“状態→画面”の更新を自動でやってくれる仕組みなんだ。つまり中級で状態の考え方を押さえた君は、上級のReactにスッと入っていける。いい流れだ！",
      questions: [
        {
          prompt: "「状態」とは何のこと？",
          choices: ["画面の今の様子", "ファイルの拡張子", "色の名前", "タグの一覧"],
          answer: 0,
          explain: "状態＝画面の今の様子（開閉・読み込み中・エラーなど）です。",
        },
        {
          prompt: "ON/OFFの2択の状態を持つのに向くのは？",
          choices: ["リスト", "フラグ(true/false)", "画像", "リンク"],
          answer: 1,
          explain: "2択はフラグ。ならびで持つならリスト（配列）です。",
        },
        {
          prompt: "「カートの中身」のような“ならび”を持つのは？",
          choices: ["フラグ", "リスト(配列)", "色", "見出し"],
          answer: 1,
          explain: "ならびはリスト（配列 [ ]）で持ちます。",
        },
        {
          prompt: "状態管理のコツとして正しいのは？",
          choices: ["同じ情報を何か所にも持つ", "状態は1か所にまとめる", "状態は使わない", "毎回コピーする"],
          answer: 1,
          explain: "状態は1か所に。二重に持つと更新忘れでズレます。",
        },
        {
          prompt: "状態が変わったら、次にすべきは？",
          choices: ["何もしない", "画面を更新して合わせる", "ファイルを消す", "リロードを禁止する"],
          answer: 1,
          explain: "状態→画面の更新で、表示を最新に保ちます。",
        },
      ],
    },
  ],

  // m11: 消えない保存をする（中級・VIP）——localStorage
  m11: [
    {
      id: "m11-l1",
      type: "lesson",
      title: "閉じても消えない保存",
      icon: "component",
      intro: "localStorageの基本",
      story: [
        { text: "作ったアプリ、ページを閉じたら入力が全部消えた——それ、保存していないからなんだ。" },
        { text: "変数や状態は“その場かぎり”。ページを閉じると消える。残したいなら「保存」が必要だよ。" },
        { text: "一番かんたんな保存が「localStorage」。ブラウザに“メモ”を残せる仕組みで、閉じても消えない。" },
        { text: "setItem(名前, 値) で保存、getItem(名前) で読み出し。名前をつけた箱にメモを貼る感覚だね。" },
        { text: "じつはこのCo-Creも、お気に入りや学習の進捗を localStorage に保存してるんだ。君はもうその仕組みを知った！" },
      ],
      takeaways: ["変数は閉じると消える→保存が必要", "localStorage=閉じても消えない保存", "setItemで保存 / getItemで読み出し"],
      relatedSlugs: ["local-storage", "state"],
      practice: {
        prompt: "ページを閉じても消えないようにデータを残すのは？",
        choices: ["変数", "localStorage", "コメント", "console.log"],
        answer: 1,
        explain: "localStorage ならブラウザに保存され、閉じても消えません。",
      },
      codeSample: `localStorage.setItem("name", "あやと"); // 保存
localStorage.getItem("name");           // 読み出し → "あやと"`,
    },
    {
      id: "m11-l2",
      type: "lesson",
      title: "オブジェクトも保存する",
      icon: "code",
      intro: "JSONに変換して保存",
      story: [
        { text: "localStorageに保存できるのは“文字”だけ。でも配列やオブジェクトも残したいよね。" },
        { text: "そこで中級で習った JSON の出番。保存するときは JSON.stringify で“文字”に変換する。" },
        { text: "読み出すときは逆に JSON.parse で“元のオブジェクト”に戻す。行きは stringify、帰りは parse。" },
        { text: "たとえばtodoの配列を保存→次に開いたときに読み出して復元。これで“続きから使えるアプリ”になる。" },
        { text: "「文字にして保存、戻して使う」。この往復を覚えれば、たいていのデータは保存できるよ。" },
      ],
      takeaways: ["保存できるのは文字だけ", "保存時=JSON.stringify（文字に変換）", "読み出し時=JSON.parse（元に戻す）"],
      relatedSlugs: ["local-storage", "json", "array"],
      practice: {
        prompt: "配列やオブジェクトを保存する前に必要なのは？",
        choices: ["JSON.stringifyで文字に変換", "色をつける", "コミット", "デプロイ"],
        answer: 0,
        explain: "保存できるのは文字だけ。JSON.stringify で文字に変換します。",
      },
      codeSample: `const todos = ["買い物", "掃除"];
localStorage.setItem("todos", JSON.stringify(todos)); // 保存
const saved = JSON.parse(localStorage.getItem("todos")); // 復元`,
    },
    {
      id: "m11-l3",
      type: "lesson",
      title: "保存の使いどころ",
      icon: "sliders",
      intro: "得意・不得意を知る",
      story: [
        { text: "便利なlocalStorageだけど、なんでも保存すればいいわけじゃない。得意・不得意がある。" },
        { text: "得意：ダークモードの設定、入力の下書き、かんたんな進捗。“その端末で覚えておけばいい”もの。" },
        { text: "不得意：他の端末とも共有したいデータ。localStorageはその端末だけなので、スマホとPCでは別々になる。" },
        { text: "そして大事な注意：パスワードなど秘密の情報は保存しない。誰でも見られる場所だから危険なんだ（a8の回収）。" },
        { text: "「端末ごとの軽いメモはlocalStorage、共有や本気の保存はサーバー（DB）」。この使い分けが分かれば一人前だよ。" },
      ],
      takeaways: ["端末ごとの軽い保存に向く", "共有したいデータはサーバー(DB)へ", "秘密の情報は保存しない（危険）"],
      relatedSlugs: ["local-storage", "backend"],
      practice: {
        prompt: "localStorageに保存してはいけないものは？",
        choices: ["ダークモード設定", "パスワードなど秘密の情報", "入力の下書き", "表示件数"],
        answer: 1,
        explain: "誰でも見られる場所なので、秘密の情報は保存しません。",
      },
    },
    {
      id: "m11-test",
      type: "test",
      title: "中級テスト（保存）",
      icon: "pencil",
      intro: "8割で合格！ローカル保存チェック",
      passRate: 0.8,
      deepDive:
        "「閉じても続きから使える」——これがあるだけで、アプリはぐっと“ちゃんとしたもの”に感じられる。localStorageは手軽な第一歩。もっと本格的に、他の端末とも共有したくなったら、サーバーのデータベースへ進む。実はこのCo-Creも、まずlocalStorageで作って、ログイン時にサーバー同期する二段構えなんだ。次は見た目の仕上げへ進もう！",
      questions: [
        {
          prompt: "閉じても消えない保存に使うのは？",
          choices: ["localStorage", "変数", "コメント", "console.log"],
          answer: 0,
          explain: "localStorage ならブラウザに残り、閉じても消えません。",
        },
        {
          prompt: "保存＝setItem に対して、読み出しは？",
          choices: ["getItem", "putItem", "readItem", "loadItem"],
          answer: 0,
          explain: "localStorage.getItem(名前) で読み出します。",
        },
        {
          prompt: "配列を保存する前に必要な変換は？",
          choices: ["JSON.stringify", "JSON.parse", "map", "filter"],
          answer: 0,
          explain: "保存時は JSON.stringify で文字に変換します。",
        },
        {
          prompt: "読み出した文字を元のオブジェクトに戻すのは？",
          choices: ["JSON.parse", "JSON.stringify", "push", "fetch"],
          answer: 0,
          explain: "読み出し時は JSON.parse で元に戻します。",
        },
        {
          prompt: "localStorageに保存してはいけないのは？",
          choices: ["設定や下書き", "パスワードなどの秘密", "表示件数", "ダークモード"],
          answer: 1,
          explain: "誰でも見られるので、秘密の情報は保存しません。",
        },
      ],
    },
  ],

  // m7: 見た目を仕上げる（中級・VIP）——ユーティリティCSS（Tailwind）
  m7: [
    {
      id: "m7-l1",
      type: "lesson",
      title: "クラスで見た目を組む",
      icon: "droplet",
      intro: "ユーティリティCSSとは",
      story: [
        { text: "中級の仕上げは、今どきの“速い見た目の作り方”。ユーティリティCSSを知ろう。" },
        { text: "m2ではCSSを別ファイルに書いたよね。ユーティリティCSSは、あらかじめ用意された小さなクラスを組み合わせて作る方式。" },
        { text: "代表格が「Tailwind CSS」。p-4（内側の余白）、text-center（中央ぞろえ）みたいな“部品クラス”を並べるだけ。" },
        { text: "1クラス＝1つの役割。<div class=\"p-4 text-center bg-white\"> のように、HTMLに直接“見た目のレシピ”を書ける。" },
        { text: "CSSファイルを行ったり来たりせず、その場で見た目が決まる。だから速い。このアプリもTailwindで作られているよ。" },
      ],
      takeaways: ["用意された小クラスを組み合わせる方式", "代表=Tailwind（p-4, text-center など）", "1クラス=1役割。HTMLに直接書ける"],
      relatedSlugs: ["tailwind", "flexbox", "padding"],
      practice: {
        prompt: "ユーティリティCSS（Tailwind）の特徴は？",
        choices: ["巨大な1枚絵を描く", "小さなクラスを組み合わせて作る", "画像だけで作る", "JSでしか書けない"],
        answer: 1,
        explain: "p-4 や text-center のような小クラスを組み合わせて見た目を作ります。",
      },
      codeSample: `<!-- 余白・中央ぞろえ・背景・角丸をクラスで指定 -->
<div class="p-4 text-center bg-white rounded-xl">
  こんにちは
</div>`,
    },
    {
      id: "m7-l2",
      type: "lesson",
      title: "よく使うクラス",
      icon: "sliders",
      intro: "これだけ覚えれば戦える",
      story: [
        { text: "Tailwindのクラスは多いけど、よく使うのは一部。パターンで覚えよう。" },
        { text: "余白は p（padding）と m（margin）。p-4 で内側、m-2 で外側。数字が大きいほど広い。m2で習ったボックスモデルそのままだ。" },
        { text: "色は text-（文字）と bg-（背景）。text-slate-600、bg-brand-500 のように「役割-色-濃さ」で書く。" },
        { text: "横ならびは flex と gap。<div class=\"flex gap-3\"> でFlexboxが一発。初級で習ったflexが、クラス1つで使える。" },
        { text: "角丸は rounded、影は shadow。この“余白・色・flex・角丸/影”を押さえれば、たいていの見た目は組めるよ。" },
      ],
      takeaways: ["余白=p-（内）/ m-（外）", "色=text-（文字）/ bg-（背景）", "横ならび=flex + gap / 角丸=rounded"],
      relatedSlugs: ["flexbox", "margin", "grid-layout"],
      practice: {
        prompt: "Tailwindで「内側の余白」を付けるクラスは？",
        choices: ["m-4", "p-4", "flex", "text-center"],
        answer: 1,
        explain: "内側の余白は p-（padding）。外側は m-（margin）です。",
      },
      codeSample: `<button class="flex gap-2 px-4 py-2 bg-brand-500 text-white rounded-full">
  送信する
</button>`,
    },
    {
      id: "m7-l3",
      type: "lesson",
      title: "反応する見た目",
      icon: "monitor",
      intro: "レスポンシブとhover",
      story: [
        { text: "最後は“状況に応じて変わる”見た目。これもクラスの接頭辞でできる。" },
        { text: "画面幅で変えたいときは sm: md: lg: を頭につける。md:flex なら「中くらいの画面以上でだけflex」。初級のレスポンシブだ。" },
        { text: "たとえば class=\"grid md:grid-cols-3\" で、スマホは1列・PCは3列、みたいに一発で切り替わる。" },
        { text: "マウスを乗せたときの変化は hover:。hover:bg-brand-600 で「乗せたら濃くなる」。押した感じは active:。" },
        { text: "接頭辞で“いつ効くか”を指定する——この考え方がわかれば、動きのある見た目もクラスだけで作れるよ。" },
      ],
      takeaways: ["画面幅=sm: md: lg: の接頭辞", "マウス乗せ=hover: / 押下=active:", "接頭辞で「いつ効くか」を指定する"],
      relatedSlugs: ["responsive", "grid-layout"],
      practice: {
        prompt: "「中くらいの画面以上でだけ3列」にする書き方は？",
        choices: ["grid-cols-3", "md:grid-cols-3", "hover:grid-cols-3", "bg-3"],
        answer: 1,
        explain: "md: の接頭辞で「その画面幅以上でだけ効く」を指定します。",
      },
      codeSample: `<!-- スマホ=1列 / PC=3列、hoverで浮く -->
<div class="grid gap-4 md:grid-cols-3">
  <div class="p-4 bg-white rounded-xl hover:-translate-y-1">カード</div>
</div>`,
    },
    {
      id: "m7-test",
      type: "test",
      title: "中級テスト（Tailwind）",
      icon: "pencil",
      intro: "8割で合格！ユーティリティCSSチェック",
      passRate: 0.8,
      deepDive:
        "ユーティリティCSSは「クラスを見れば見た目がわかる」のが強み。慣れると、頭の中のデザインをそのまま高速で形にできる。最初は呪文みたいに見えるけど、p=padding、m=margin、bg=background…と“略語”を覚えるだけ。さあ中級もいよいよ大詰め。最後は、作る人の必須スキル——「エラーを直す」デバッグを身につけて、中級を完走しよう！",
      questions: [
        {
          prompt: "ユーティリティCSS（Tailwind）の作り方は？",
          choices: ["小さなクラスを組み合わせる", "画像を並べる", "JSだけで書く", "手描きする"],
          answer: 0,
          explain: "用意された小クラス（p-4 等）を組み合わせて見た目を作ります。",
        },
        {
          prompt: "背景色を付けるクラスの頭は？",
          choices: ["text-", "bg-", "p-", "flex"],
          answer: 1,
          explain: "背景は bg-、文字色は text- です。",
        },
        {
          prompt: "横ならび（Flexbox）にするクラスは？",
          choices: ["flex", "grid-rows", "hidden", "rounded"],
          answer: 0,
          explain: "flex で横ならび。間隔は gap- で付けます。",
        },
        {
          prompt: "「画面が中くらい以上のときだけ効く」接頭辞は？",
          choices: ["hover:", "md:", "active:", "dark:"],
          answer: 1,
          explain: "md: など画面幅の接頭辞で、その幅以上でだけ効きます。",
        },
        {
          prompt: "マウスを乗せたときの見た目を変える接頭辞は？",
          choices: ["hover:", "p-", "bg-", "sm:"],
          answer: 0,
          explain: "hover: で「乗せたとき」の見た目を指定します。",
        },
      ],
    },
  ],

  // m8: デバッグの技術（中級・VIP）——エラーと友だちになる
  m8: [
    {
      id: "m8-l1",
      type: "lesson",
      title: "エラーを読む",
      icon: "search",
      intro: "赤い文字は道案内",
      story: [
        { text: "中級の締めは、作る人の必須スキル「デバッグ（不具合直し）」。まずはエラーの読み方から。" },
        { text: "エラーが出ると赤い文字がドンと出る。ビビるよね。でも中身は“どこで・何が・なぜ”を教えてくれる案内なんだ。" },
        { text: "特に大事なのが「行番号」。「◯行目でエラー」と書いてあることが多い。まずそこを見にいこう。" },
        { text: "英語で書かれていても大丈夫。そのままAIに貼って「これ何？」と聞けば、日本語で教えてくれる。" },
        { text: "エラーは“止められた”んじゃなく“ヒントをもらった”。読む習慣がつくと、直す速さが段違いになるよ。" },
      ],
      takeaways: ["エラーは「どこで・何が・なぜ」の案内", "まず行番号を見る", "英語ならAIに貼って訳してもらう"],
      relatedSlugs: ["debug", "console"],
      practice: {
        prompt: "エラーが出たとき、まず見るべき手がかりは？",
        choices: ["文字の色", "行番号", "画面の明るさ", "時刻"],
        answer: 1,
        explain: "「◯行目でエラー」の行番号がまず見るべき手がかりです。",
      },
    },
    {
      id: "m8-l2",
      type: "lesson",
      title: "console.logで確かめる",
      icon: "code",
      intro: "中身を“のぞく”",
      story: [
        { text: "「エラーは出ないのに、思った通り動かない」——これもよくある。そんな時の必殺技を教えるよ。" },
        { text: "console.log() だ。変数の中身を画面裏（コンソール）に表示して“今どうなってる？”を確かめる方法。" },
        { text: "怪しい所に console.log(値) を置いて、期待した中身が入っているかを見る。ズレていればそこが原因。" },
        { text: "「ここまでは動いてる？」の確認にも使える。処理の途中に置いて、どこまで進んだかを追うんだ。" },
        { text: "プロも毎日使う超基本ワザ。“推測せず、のぞいて確かめる”——これがデバッグの王道だよ。" },
      ],
      takeaways: ["console.log()で変数の中身を確認", "怪しい所に置いて“ズレ”を探す", "どこまで動いたかの確認にも使える"],
      relatedSlugs: ["console", "debug"],
      practice: {
        prompt: "変数の中身を確かめて不具合を探す基本ワザは？",
        choices: ["console.log()", "margin", "git push", "await"],
        answer: 0,
        explain: "console.log() で中身をのぞき、期待とのズレを探します。",
      },
      codeSample: `let total = price * count;
console.log(total); // 中身を確認 → 期待通り？`,
    },
    {
      id: "m8-l3",
      type: "lesson",
      title: "原因を絞り込む",
      icon: "sliders",
      intro: "切り分けの考え方",
      story: [
        { text: "バグ直しがうまい人は、直し方じゃなく“絞り込み方”がうまいんだ。" },
        { text: "コツは「切り分け」。あやしい部分を半分ずつ試して、原因のある側をどんどん狭めていく。" },
        { text: "一度に1つだけ変える、も鉄則。あちこち同時にいじると、何が効いたか分からなくなる。" },
        { text: "「最小再現」も強力。問題が起きる一番小さいコードを作ると、原因がむき出しになる。" },
        { text: "それでも詰まったら、状況とエラーをAIや仲間に共有。“ひとりで抱えない”のも立派な技術だよ。" },
      ],
      takeaways: ["半分ずつ試して原因を絞る（切り分け）", "一度に1つだけ変える", "最小再現／詰まったら人やAIに聞く"],
      relatedSlugs: ["debug"],
      practice: {
        prompt: "バグの原因を絞るときの鉄則は？",
        choices: ["一度にたくさん変える", "一度に1つだけ変える", "全部消す", "放置する"],
        answer: 1,
        explain: "一度に1つだけ変えると、何が原因か切り分けられます。",
      },
    },
    {
      id: "m8-test",
      type: "test",
      title: "中級テスト（デバッグ）",
      icon: "pencil",
      intro: "8割で合格！デバッグの技術チェック",
      passRate: 0.8,
      deepDive:
        "「動かない」は失敗じゃなく、開発のふつうの一部。プロは1日に何度もエラーを出して、その都度直しながら前に進む。エラーを読む・console.logでのぞく・切り分ける——この3つがあれば、たいていの不具合は自力で追える。中級コース、これで本当に完走！名前を知り、書けて、直せるようになった君は、もう立派な作り手だ。",
      questions: [
        {
          prompt: "エラーメッセージは何を教えてくれる？",
          choices: ["天気", "どこで何が起きたか", "今の時刻", "おすすめの色"],
          answer: 1,
          explain: "エラーは「どこで・何が・なぜ」の道案内。まず行番号を見ます。",
        },
        {
          prompt: "変数の中身を確かめる基本ワザは？",
          choices: ["console.log()", "padding", "commit", "flex"],
          answer: 0,
          explain: "console.log() で中身をのぞき、期待とのズレを探します。",
        },
        {
          prompt: "原因を絞り込むときの鉄則は？",
          choices: ["同時に何か所も変える", "一度に1つだけ変える", "全部書き直す", "電源を切る"],
          answer: 1,
          explain: "一度に1つだけ変えると、何が効いたか切り分けられます。",
        },
        {
          prompt: "英語のエラーで詰まったら？",
          choices: ["あきらめる", "そのままAIに貼って聞く", "画面を閉じる", "無視する"],
          answer: 1,
          explain: "エラー文をAIに貼れば、意味も直し方も教えてくれます。",
        },
        {
          prompt: "デバッグの心構えとして正しいのは？",
          choices: ["エラーは恥ずかしい", "推測せず、のぞいて確かめる", "見なかったことにする", "勘で直す"],
          answer: 1,
          explain: "推測せず console.log 等で確かめるのがデバッグの王道です。",
        },
      ],
    },
  ],

  // ══════════════ 上級コース（すべてVIP限定）══════════════
  a1: [
    {
      id: "a1-l1",
      type: "lesson",
      title: "部品を“再利用”する",
      icon: "component",
      intro: "コンポーネントとReact",
      story: [
        { text: "上級へようこそ。ここからは“現場の作り方”に近づくよ。" },
        { text: "同じボタンを何十個も手で書くのは大変。そこで「コンポーネント」＝“部品を1回作って使い回す”考え方が出てくる。" },
        { text: "Reactは、この部品化を得意にした人気の道具。ボタンやカードを部品にして、必要な場所に置いていく。" },
        { text: "部品に渡す設定を「props（プロップス）」、部品が持つ状態を「state（ステート）」と呼ぶよ。" },
        { text: "“部品の組み合わせでUIを作る”——初級で見た世界を、コードで実現するのが上級だよ。" },
      ],
      takeaways: ["コンポーネント=作って使い回す部品", "Reactは部品化が得意な道具", "設定=props / 状態=state"],
      practice: {
        prompt: "「作って使い回す部品」のことを何という？",
        choices: ["セレクタ", "コンポーネント", "配列", "スピナー"],
        answer: 1,
        explain: "作って使い回す部品＝コンポーネント。Reactが得意です。",
      },
      relatedSlugs: ["component", "button", "card"],
      codeSample: `// Button という部品を1回つくる
function Button() {
  return <button>送信</button>;
}

// 好きな場所に置いて使い回す
<Button />
<Button />`,
    },
    {
      id: "a1-l2",
      type: "lesson",
      title: "propsで中身を渡す",
      icon: "sliders",
      intro: "同じ部品で違う表示",
      story: [
        { text: "コンポーネントの真価は「1個作って、中身だけ変えて使い回す」ところにあるよ。" },
        { text: "その“中身の設定”を渡すのが props（プロップス）。部品への注文書みたいなものだね。" },
        { text: "たとえば <Button label=\"送信\" /> と <Button label=\"キャンセル\" />。同じButton部品に、labelだけ変えて渡してる。" },
        { text: "商品カードなら、名前・値段・画像を props で渡せば、同じCardで何十商品でも表示できる。" },
        { text: "初級で「サイト＝部品の組み合わせ」と言ったよね。props はその“組み合わせ”を柔軟にする鍵なんだ。" },
      ],
      takeaways: ["props=部品に渡す設定（注文書）", "同じ部品でも props で中身が変わる", "一覧表示は「同じ部品×違うprops」"],
      practice: {
        prompt: "部品に“外から渡す設定”は？",
        choices: ["state", "props", "return", "margin"],
        answer: 1,
        explain: "外から渡す設定＝props。部品自身が持つ状態は state。",
      },
      relatedSlugs: ["props", "card", "button"],
      codeSample: `function Button({ label }) {
  return <button>{label}</button>;
}

// 同じ部品に、labelだけ変えて渡す
<Button label="送信" />
<Button label="キャンセル" />`,
    },
    {
      id: "a1-l3",
      type: "lesson",
      title: "stateで状態を持つ",
      icon: "zap",
      intro: "変わったら描き直す",
      story: [
        { text: "props が“外から渡される設定”なら、state は“部品が自分で持つ状態”だよ。" },
        { text: "中級の「状態を整理する」で、状態は変数で持って、変わったら画面を更新する、と習ったね。覚えてる？" },
        { text: "Reactのすごいところは、その“状態→画面の更新”を自動でやってくれること。state を変えれば、画面が勝手に追従する。" },
        { text: "つまり中級で手作業だった更新が、上級のReactでは自動に。カウンターも、モーダルの開閉も、state ひとつで書ける。" },
        { text: "props（外からの設定）と state（自分の状態）。この2つの使い分けが、Reactの一番の山場だよ。" },
      ],
      takeaways: ["state=部品が自分で持つ状態（中級で習った状態のReact版）", "Reactはstate→画面の更新を自動でやる", "props=外から / state=自分で、を使い分ける"],
      practice: {
        prompt: "Reactで state が変わるとどうなる？",
        choices: ["何も起きない", "画面が自動で描き直される", "エラーになる", "保存される"],
        answer: 1,
        explain: "state が変わると、その部分が自動で再描画されます。",
      },
      relatedSlugs: ["state", "modal", "accordion"],
      codeSample: `function Counter() {
  const [count, setCount] = useState(0); // 状態を持つ
  return (
    <button onClick={() => setCount(count + 1)}>
      {count} 回
    </button>
  );
}`,
    },
    {
      id: "a1-test",
      type: "test",
      title: "上級テスト①",
      icon: "pencil",
      intro: "8割で合格！コンポーネントの考え方チェック",
      passRate: 0.8,
      deepDive:
        "「同じものは1回だけ書いて使い回す」——これはコードの世界の黄金ルール（DRY: Don't Repeat Yourself）。props と state の使い分けに慣れると、複雑なUIも“小さな部品の組み合わせ”に分解して考えられるようになる。実はこの図鑑アプリ自身も、たくさんのReactコンポーネントでできているんだよ。",
      questions: [
        {
          prompt: "「作って使い回す部品」のことを何という？",
          choices: ["コンポーネント", "セレクタ", "スピナー", "配列"],
          answer: 0,
          explain: "作って使い回す部品＝コンポーネント。Reactが得意にしています。",
        },
        {
          prompt: "部品に“外から渡す設定”は？",
          choices: ["state", "props", "margin", "JSON"],
          answer: 1,
          explain: "外から渡す設定＝props。注文書のようなものです。",
        },
        {
          prompt: "部品が“自分で持つ状態”は？",
          choices: ["props", "state", "border", "関数"],
          answer: 1,
          explain: "部品自身が持つ状態＝state。変わると画面が描き直されます。",
        },
        {
          prompt: "Reactで state が変わるとどうなる？",
          choices: ["何も起きない", "画面が自動で描き直される", "エラーになる", "サーバーが落ちる"],
          answer: 1,
          explain: "state が変わると、その部分が自動で再描画されます。",
        },
        {
          prompt: "同じCard部品で違う商品を並べたい。変えるのは？",
          choices: ["部品そのものを毎回作り直す", "渡す props（名前・値段など）", "CSSの色だけ", "ファイル名"],
          answer: 1,
          explain: "同じ部品に違う props を渡せば、一覧表示ができます。",
        },
      ],
    },
  ],
  a2: [
    {
      id: "a2-l1",
      type: "lesson",
      title: "変更を記録する（Git）",
      icon: "wrench",
      intro: "開発の道具と流儀",
      story: [
        { text: "最後は、作る人みんなが使う“道具と流儀”の話。" },
        { text: "コードの変更履歴を記録する道具が「Git」。“いつでも過去に戻れるセーブ機能”みたいなものだよ。" },
        { text: "「npm」は、他の人が作った便利な部品（ライブラリ）を取り寄せて使う仕組み。" },
        { text: "作ったサイトをネットに公開することを「デプロイ」って言う。ここまで来たら“世に出せる”。" },
        { text: "道具を知ると、AIやチームと同じ言葉で話せる。これで“作れる人”の入口に立てたね！" },
      ],
      takeaways: ["Git=変更履歴のセーブ", "npm=便利な部品を取り寄せる仕組み", "デプロイ=ネットに公開すること"],
      practice: {
        prompt: "コードの変更履歴を記録する道具は？",
        choices: ["npm", "Git", "CSS", "JSON"],
        answer: 1,
        explain: "変更履歴のセーブ＝Git。過去に戻れるのが強みです。",
      },
      codeSample: `# 変更をセーブ（コミット）する基本の流れ
git add .
git commit -m "ボタンの色を変えた"

# 便利な部品を取り寄せる
npm install`,
    },
    {
      id: "a2-l2",
      type: "lesson",
      title: "みんなで作る（GitHub）",
      icon: "user",
      intro: "チーム開発の入口",
      story: [
        { text: "Gitで“セーブ”できるようになったら、次はそれを“みんなで共有”する話。" },
        { text: "そのための置き場が「GitHub」。コードをネット上に置いて、チームで同じものを触れるようにする。" },
        { text: "コード一式の置き場を「リポジトリ（リポ）」と呼ぶよ。プロジェクトごとに1つ作るのが基本。" },
        { text: "「この変更を取り込んで」とお願いするのが「プルリクエスト（PR）」。仲間がチェックしてからマージする。" },
        { text: "GitHubはAIや採用でも見られる“作品置き場”。学んだことを置いていくと、それ自体がポートフォリオになるよ。" },
      ],
      takeaways: ["GitHub=コードの共有・保管場所", "コード一式の置き場=リポジトリ", "変更のお願い=プルリクエスト(PR)"],
      practice: {
        prompt: "「この変更を取り込んで」とお願いするのは？",
        choices: ["デプロイ", "プルリクエスト", "コミット", "リセット"],
        answer: 1,
        explain: "変更の取り込み依頼＝プルリクエスト(PR)です。",
      },
    },
    {
      id: "a2-l3",
      type: "lesson",
      title: "本番に出す（デプロイ）",
      icon: "monitor",
      intro: "世界に公開するまで",
      story: [
        { text: "最後の仕上げ。作ったものを“世界に見せる”＝デプロイの流れを知ろう。" },
        { text: "自分のPCで動かすのが「開発環境」、みんなが使うのが「本番環境」。この2つは分けて考える。" },
        { text: "公開する置き場（ホスティング）に上げると、URLができて誰でもアクセスできる。VercelやCloud Runなどが定番。" },
        { text: "パスワードやAPIキーは、コードに直接書かず「環境変数」に逃がす。GitHubに秘密を上げないための大事なマナー。" },
        { text: "設計→部品→組み立て→公開。ここまで来たら、もう“作れる人”の仲間入り。おつかれさま、そしてスタートだ！" },
      ],
      takeaways: ["自分用=開発環境 / みんな用=本番環境", "公開する置き場=ホスティング（Vercel等）", "秘密のキーは環境変数に逃がす（コードに書かない）"],
      practice: {
        prompt: "パスワードやAPIキーの正しい扱いは？",
        choices: ["コードに直接書く", "環境変数に逃がす", "URLに載せる", "画像にする"],
        answer: 1,
        explain: "秘密の情報は環境変数へ。コードに書いてGitHubに上げないこと。",
      },
      relatedSlugs: ["hosting", "environment-variable", "responsive", "wireframe"],
      codeSample: `# ❌ コードに直接書かない（GitHubに秘密が漏れる）
const apiKey = "sk-1234...";

# ⭕ 環境変数に逃がして読み込む
const apiKey = process.env.API_KEY;`,
    },
    {
      id: "a2-test",
      type: "test",
      title: "上級テスト②",
      icon: "pencil",
      intro: "8割で合格！開発の道具チェック",
      passRate: 0.8,
      deepDive:
        "Git・GitHub・デプロイまで来たら、もう「作って世に出す」一周を知ったことになる。GitHubに小さな作品を置いていけば、それがそのままポートフォリオ（実績集）になるよ。次は、プロが必ずやる“テストを書く”を学ぼう。壊れない安心を手に入れて、最後のAI章へ進もう！",
      questions: [
        {
          prompt: "コードの変更履歴を記録する道具は？",
          choices: ["npm", "Git", "JSON", "CSS"],
          answer: 1,
          explain: "変更履歴のセーブ＝Git。過去に戻れるのが強みです。",
        },
        {
          prompt: "コードをネットで共有・保管する場所は？",
          choices: ["GitHub", "スピナー", "モーダル", "パディング"],
          answer: 0,
          explain: "コードの共有・保管場所＝GitHub。置き場の単位がリポジトリです。",
        },
        {
          prompt: "「この変更を取り込んで」とお願いするのは？",
          choices: ["デプロイ", "プルリクエスト", "レスポンシブ", "トグル"],
          answer: 1,
          explain: "変更の取り込み依頼＝プルリクエスト(PR)。レビューしてマージします。",
        },
        {
          prompt: "作ったサイトをネットに公開することを何という？",
          choices: ["デプロイ", "インストール", "ログイン", "リセット"],
          answer: 0,
          explain: "本番に出して公開すること＝デプロイです。",
        },
        {
          prompt: "パスワードやAPIキーの正しい扱いは？",
          choices: ["コードに直接書く", "環境変数に逃がす", "画像にする", "URLに載せる"],
          answer: 1,
          explain: "秘密の情報は環境変数へ。コードに書いてGitHubに上げないのがマナーです。",
        },
      ],
    },
  ],

  // a4: テストを書く（上級・VIP）——a2の次・a3の前
  a4: [
    {
      id: "a4-l1",
      type: "lesson",
      title: "なぜテストを書く？",
      icon: "check",
      intro: "手動確認の限界",
      story: [
        { text: "ここからは“プロが必ずやること”——テストを書く話をするよ。" },
        { text: "小さいうちは、作ったら自分でクリックして確認できる。でも機能が増えると、毎回全部を手で確かめるのは無理。" },
        { text: "しかも「Aを直したらBが壊れてた」——これがよく起きる。人の目だけだと見落とす。" },
        { text: "そこで「テスト」。“この入力ならこの結果になるはず”をコードで書いておき、自動でチェックさせるんだ。" },
        { text: "テストは疲れないし、見落とさない“見張り番”。書いておくと、安心して開発を進められるよ。" },
      ],
      takeaways: ["手動確認は機能が増えると限界", "直した所が別を壊す事故が起きる", "テスト=自動でチェックする見張り番"],
      practice: {
        prompt: "テストを書く一番の目的は？",
        choices: ["見た目を良くする", "自動でチェックして壊れを防ぐ", "速く公開する", "色を増やす"],
        answer: 1,
        explain: "テストは自動の見張り番。手動確認の限界を補い、壊れを防ぎます。",
      },
    },
    {
      id: "a4-l2",
      type: "lesson",
      title: "テストの基本形",
      icon: "code",
      intro: "入力→期待する結果",
      story: [
        { text: "テストの中身はシンプル。「ある入力を渡したら、期待どおりの結果になるか」を確かめるだけ。" },
        { text: "中級で作った greet(\"あやと\") を例にすると——“こんにちは、あやとさん！”が返るはず、と書く。" },
        { text: "この“はず”をチェックするのが expect（期待する）や assert（断言する）という書き方だよ。" },
        { text: "結果が期待どおりなら「通る（pass）」、ちがえば「落ちる（fail）」。落ちたら、そこにバグがあるサイン。" },
        { text: "つまりテストは“正解つきの練習問題”をコードにしたもの。この図鑑のテストと考え方は同じなんだ。" },
      ],
      takeaways: ["テスト=入力→期待する結果を確認", "期待の確認=expect / assert", "合えばpass・ちがえばfail（バグ発見）"],
      practice: {
        prompt: "テストの基本の形は？",
        choices: ["色を変える", "入力→期待する結果を確認する", "画像を貼る", "URLを開く"],
        answer: 1,
        explain: "「この入力ならこの結果のはず」を確認するのがテストです。",
      },
      codeSample: `// greet("あやと") は「こんにちは、あやとさん！」を返すはず
expect(greet("あやと")).toBe("こんにちは、あやとさん！");`,
    },
    {
      id: "a4-l3",
      type: "lesson",
      title: "安心して直せる",
      icon: "wrench",
      intro: "テストがある強み",
      story: [
        { text: "テストの本当のありがたみは、“あとで直すとき”に出てくる。" },
        { text: "コードを整理したり機能を足したりすると、うっかり別の場所を壊すことがある（これをデグレという）。" },
        { text: "でもテストがあれば、壊した瞬間にテストが「落ちた！」と教えてくれる。公開前に気づける。" },
        { text: "だから「テストがある＝安心して大胆に直せる」。プロが機能追加を怖がらずにできるのはこのおかげ。" },
        { text: "最初は全部にテストを書かなくていい。“大事な処理から少しずつ”でOK。習慣にしていこう。" },
      ],
      takeaways: ["直したとき別を壊す事故=デグレ", "テストが落ちて即気づける", "テストがあると安心して直せる"],
      relatedSlugs: ["ci", "git"],
      practice: {
        prompt: "テストがあると嬉しいのはどんなとき？",
        choices: ["色を選ぶとき", "あとでコードを直すとき", "画像を探すとき", "ログインするとき"],
        answer: 1,
        explain: "直した所が別を壊しても、テストが落ちて即気づけます。",
      },
    },
    {
      id: "a4-test",
      type: "test",
      title: "上級テスト（テスト）",
      icon: "pencil",
      intro: "8割で合格！テストの考え方チェック",
      passRate: 0.8,
      deepDive:
        "テストを書けるようになると、一気に“チームで働ける人”に近づく。実務では、変更するたびにテストが自動で走って、壊れていないかを見張ってくれる（これをCIという）。次は“速さ”の話。作ったものを軽く・速くする工夫を学んで、仕上げの質を上げよう。ラストのAI章はもうすぐだ！",
      questions: [
        {
          prompt: "手動確認の弱点は？",
          choices: ["速すぎる", "機能が増えると全部は確かめきれない", "無料すぎる", "楽しすぎる"],
          answer: 1,
          explain: "機能が増えると手動では限界。だから自動テストが要ります。",
        },
        {
          prompt: "テストの基本の形は？",
          choices: ["入力→期待する結果を確認", "色→大きさを変える", "画像→貼る", "URL→開く"],
          answer: 0,
          explain: "「この入力ならこの結果のはず」を確認するのがテストです。",
        },
        {
          prompt: "「期待どおりか」を確認する書き方は？",
          choices: ["expect / assert", "margin / padding", "href / src", "let / const"],
          answer: 0,
          explain: "expect（期待する）や assert（断言する）で確認します。",
        },
        {
          prompt: "直した所が別を壊す事故を何という？",
          choices: ["デプロイ", "デグレ（リグレッション）", "コミット", "ホスティング"],
          answer: 1,
          explain: "デグレ（リグレッション）。テストがあると即気づけます。",
        },
        {
          prompt: "テストの始め方として現実的なのは？",
          choices: ["最初から全部に書く", "大事な処理から少しずつ", "一生書かない", "他人に丸投げ"],
          answer: 1,
          explain: "大事な処理から少しずつ。習慣にしていくのがコツです。",
        },
      ],
    },
  ],

  // a5: パフォーマンス入門（上級・VIP）——a4の次・a3の前
  a5: [
    {
      id: "a5-l1",
      type: "lesson",
      title: "なぜ速さが大事？",
      icon: "zap",
      intro: "遅いと人は去る",
      story: [
        { text: "作れるようになったら、次は“速く動くか”も気にしよう。速さはユーザーへの思いやりなんだ。" },
        { text: "ページの表示が遅いと、人は待てずに離れてしまう。「3秒待たされると多くの人が去る」なんて言われるほど。" },
        { text: "重くなる犯人の代表は“大きすぎる画像”と“取ってくるデータの量”。ここを軽くするだけで体感がぐっと変わる。" },
        { text: "速さは、見た目の派手さより効く“縁の下のUX”。速いだけで「なんか使いやすい」と感じてもらえる。" },
        { text: "「動けばOK」の一歩先へ。速さを意識できると、ぐっとプロっぽくなるよ。" },
      ],
      takeaways: ["遅いページは離脱される", "重い原因の代表=画像とデータ量", "速さは“縁の下のUX”＝思いやり"],
      relatedSlugs: ["spinner", "responsive"],
      practice: {
        prompt: "ページが重くなる代表的な原因は？",
        choices: ["大きすぎる画像やデータ量", "クラス名の長さ", "コメントの数", "変数名"],
        answer: 0,
        explain: "大きな画像や取得データ量が重さの主犯。まずここを軽くします。",
      },
    },
    {
      id: "a5-l2",
      type: "lesson",
      title: "軽くする基本",
      icon: "sliders",
      intro: "画像と読み込みの工夫",
      story: [
        { text: "軽くする定番ワザを覚えよう。むずかしくないよ。" },
        { text: "まず画像。表示サイズに合わせて縮める＆軽い形式（WebPなど）にするだけで、何倍も軽くなることがある。" },
        { text: "次に「遅延読み込み（lazy）」。画面に出るまで画像を読み込まない。最初の表示がぐっと速くなる。" },
        { text: "データも“必要な分だけ”。一覧は最初の20件だけ取って、続きはスクロールで——という工夫（ページング）が効く。" },
        { text: "全部いっぺんに読まない。これが軽さの合言葉。待たせる所には、初級で習ったスピナーを出すと親切だね。" },
      ],
      takeaways: ["画像は縮める＆軽い形式に", "遅延読み込み(lazy)で初速を上げる", "データは必要な分だけ取る（ページング）"],
      relatedSlugs: ["spinner", "carousel"],
      practice: {
        prompt: "「画面に出るまで画像を読み込まない」工夫は？",
        choices: ["遅延読み込み(lazy)", "環境変数", "プルリクエスト", "バリデーション"],
        answer: 0,
        explain: "遅延読み込み(lazy)で最初の表示を速くできます。",
      },
    },
    {
      id: "a5-l3",
      type: "lesson",
      title: "測ってから直す",
      icon: "search",
      intro: "推測より計測",
      story: [
        { text: "パフォーマンスで一番大事な心得——「推測で直さない。まず測る」。" },
        { text: "“たぶんここが遅い”は、たいてい外れる。感覚じゃなく、道具で計測してから手を入れるんだ。" },
        { text: "ブラウザには計測ツールがある（Chromeの Lighthouse など）。点数と“遅い原因”を教えてくれる。" },
        { text: "測ると「一番効くのはどこか」がわかる。小さな所を頑張るより、大きなボトルネックを1つ直す方が効く。" },
        { text: "測る→一番重い所を直す→また測る。この繰り返し。テストの章と同じで、“確かめてから進む”が上級の作法だよ。" },
      ],
      takeaways: ["推測で直さず、まず計測する", "計測ツール=Lighthouse など", "一番重いボトルネックから直す"],
      relatedSlugs: ["lazy-loading", "skeleton-loader", "loading-bar"],
      practice: {
        prompt: "パフォーマンス改善の正しい順序は？",
        choices: ["勘で直す", "まず計測してボトルネックを直す", "全部書き直す", "何もしない"],
        answer: 1,
        explain: "推測より計測。測って一番重い所から直すのが効きます。",
      },
    },
    {
      id: "a5-test",
      type: "test",
      title: "上級テスト（速さ）",
      icon: "pencil",
      intro: "8割で合格！パフォーマンスの考え方チェック",
      passRate: 0.8,
      deepDive:
        "速さは、目立たないけど確実に効く“プロの気配り”。画像を軽く、必要な分だけ読み、測ってから直す——この3つを意識するだけで、作るものの質がワンランク上がる。次は“だれでも使える”をつくるアクセシビリティ。速さと同じで、目立たないけど大事な思いやりだ。ラストのAI章はその先にあるよ！",
      questions: [
        {
          prompt: "ページが遅いと起きることは？",
          choices: ["ユーザーが離脱しやすい", "自動で速くなる", "SEOが上がる", "何も起きない"],
          answer: 0,
          explain: "遅いと人は待てずに離れます。速さはUXそのものです。",
        },
        {
          prompt: "重くなる代表的な原因は？",
          choices: ["変数名の長さ", "画像やデータの量", "コメント", "クラス名"],
          answer: 1,
          explain: "大きな画像や取得データ量が主犯。まずここを軽くします。",
        },
        {
          prompt: "「画面に出るまで読み込まない」工夫は？",
          choices: ["遅延読み込み(lazy)", "コミット", "デプロイ", "バリデーション"],
          answer: 0,
          explain: "遅延読み込み(lazy)で初速を上げられます。",
        },
        {
          prompt: "改善するとき最初にやるべきは？",
          choices: ["勘で直す", "計測する", "全部消す", "公開する"],
          answer: 1,
          explain: "推測より計測。測ってから一番重い所を直します。",
        },
        {
          prompt: "計測に使う道具の例は？",
          choices: ["Lighthouse", "Git", "npm", "JSON"],
          answer: 0,
          explain: "Chromeの Lighthouse などで点数と遅い原因がわかります。",
        },
      ],
    },
  ],

  // a6: アクセシビリティ（上級・VIP）——a5の次・a3の前
  a6: [
    {
      id: "a6-l1",
      type: "lesson",
      title: "だれでも使えるように",
      icon: "user",
      intro: "アクセシビリティとは",
      story: [
        { text: "上級も後半戦。ここでは“みんなが使える”をつくる「アクセシビリティ」を学ぼう。" },
        { text: "アクセシビリティ（a11y）とは、目が見えにくい人、マウスが使えない人など、いろんな人が使えるようにする工夫のこと。" },
        { text: "たとえば、目が不自由な人は「スクリーンリーダー」で画面を“読み上げ”て使う。だから画像には説明（alt）が要る。" },
        { text: "マウスが使えない人は「キーボードだけ」で操作する。Tabキーで移動できるかは大事なチェックポイント。" },
        { text: "特別なことじゃない。“使える人を増やす”のは、結局みんなにとって使いやすいサイトになるんだ。" },
      ],
      takeaways: ["アクセシビリティ=だれでも使える工夫", "読み上げ（スクリーンリーダー）に対応する", "キーボードだけでも操作できるように"],
      relatedSlugs: ["accessibility"],
      practice: {
        prompt: "アクセシビリティの説明として正しいのは？",
        choices: ["見た目を派手にすること", "いろんな人が使えるようにする工夫", "速く動かすこと", "色を減らすこと"],
        answer: 1,
        explain: "目や手が不自由な人も含め、だれでも使えるようにする工夫です。",
      },
    },
    {
      id: "a6-l2",
      type: "lesson",
      title: "基本の3つ",
      icon: "check",
      intro: "まず押さえる勘どころ",
      story: [
        { text: "アクセシビリティで、まず押さえたい基本を3つ紹介するよ。ぜんぶ既習の“回収”だ。" },
        { text: "①画像のaltテキスト。中級で習ったね。読み上げソフトはalt を読むから、意味のある説明を書く。" },
        { text: "②フォームのラベル。入力欄に <label> を結びつけると、「何を入れる欄か」が読み上げでも伝わる。" },
        { text: "③色のコントラスト。初級で習った“明るさの差”。薄い色どうしだと、見えにくい人には読めない。" },
        { text: "そして土台はセマンティックHTML。見出しはh1、ボタンはbutton——正しいタグを使うだけで、ぐっと親切になる。" },
      ],
      takeaways: ["画像=altテキスト / 入力欄=label", "色のコントラストを十分に取る", "正しいタグ(セマンティックHTML)が土台"],
      relatedSlugs: ["accessibility", "form", "button"],
      practice: {
        prompt: "読み上げソフトのために画像に付けるものは？",
        choices: ["altテキスト", "背景色", "角丸", "影"],
        answer: 0,
        explain: "画像の意味を伝える alt テキストが、読み上げ対応の基本です。",
      },
      codeSample: `<img src="cat.jpg" alt="ひなたぼっこする三毛猫">

<label>お名前
  <input type="text" name="name">
</label>`,
    },
    {
      id: "a6-l3",
      type: "lesson",
      title: "みんなにやさしい設計",
      icon: "layout",
      intro: "フォーカスとキーボード",
      story: [
        { text: "仕上げに、“操作のしやすさ”の工夫を見ていこう。" },
        { text: "キーボードで操作すると、今どこを選んでいるかを示す枠（フォーカスリング）が出る。これを消さないのが大事。" },
        { text: "Tabキーだけでボタンやリンクを順に選べるか、実際に試してみよう。マウスなしで一周できたら合格。" },
        { text: "足りない情報は「ARIA」という属性で補える（例: aria-label）。ただし使いすぎず、まず正しいHTMLが先。" },
        { text: "アクセシビリティは特別な人のためだけじゃない。片手がふさがった時も、その配慮に助けられる。みんなのためなんだ。" },
      ],
      takeaways: ["フォーカスリングは消さない", "キーボード（Tab）だけで操作できるか試す", "ARIAで補える（が、正しいHTMLが先）"],
      relatedSlugs: ["accessibility", "button"],
      practice: {
        prompt: "キーボード操作のしやすさで大事なのは？",
        choices: ["フォーカスの枠を消す", "Tabだけで操作でき、フォーカスが見える", "マウス必須にする", "文字を消す"],
        answer: 1,
        explain: "Tabで順に選べて、今どこかが見える（フォーカス）ことが大切です。",
      },
    },
    {
      id: "a6-test",
      type: "test",
      title: "上級テスト（a11y）",
      icon: "pencil",
      intro: "8割で合格！だれでも使える設計チェック",
      passRate: 0.8,
      deepDive:
        "アクセシビリティは「一部の人のため」に見えて、実は全員のため。字幕は音を出せない場所で、コントラストは屋外の強い光の下で、みんなを助ける。しかも正しいタグ・altテキスト・十分なコントラストといった基本は、そのままSEOや使いやすさの向上にもつながる。やさしさが品質になる——いい話だろう？次は、失敗しても戻せる“やり直しの技術”。Gitを実践で使いこなそう！",
      questions: [
        {
          prompt: "アクセシビリティとは？",
          choices: ["派手な見た目", "だれでも使えるようにする工夫", "速さ", "安さ"],
          answer: 1,
          explain: "目や手が不自由な人も含め、だれもが使えるようにする工夫です。",
        },
        {
          prompt: "読み上げソフトのために画像へ付けるのは？",
          choices: ["altテキスト", "影", "角丸", "余白"],
          answer: 0,
          explain: "画像の意味を伝える alt テキストが基本です。",
        },
        {
          prompt: "薄い色どうしで問題になるのは？",
          choices: ["コントラスト不足で読めない", "速度が落ちる", "容量が増える", "何も起きない"],
          answer: 0,
          explain: "コントラスト（明るさの差）が小さいと見えにくい人が読めません。",
        },
        {
          prompt: "キーボード操作で大事なのは？",
          choices: ["フォーカスを消す", "Tabで操作でき、今どこか見える", "マウス必須", "文字を消す"],
          answer: 1,
          explain: "Tabだけで操作でき、フォーカスが見えることが大切です。",
        },
        {
          prompt: "アクセシビリティの土台になるのは？",
          choices: ["正しいタグ（セマンティックHTML）", "派手なアニメ", "大量の色", "長いコメント"],
          answer: 0,
          explain: "見出しはh1、ボタンはbutton…正しいタグが土台です。",
        },
      ],
    },
  ],

  // a7: まちがえても戻せる（上級・VIP）——Gitでやり直す実践
  a7: [
    {
      id: "a7-l1",
      type: "lesson",
      title: "保存してあれば怖くない",
      icon: "check",
      intro: "コミットは命綱",
      story: [
        { text: "上級a2でGitを知ったね。ここではその実践——「まちがえても戻す」を身につけよう。" },
        { text: "Gitの一番の安心は「セーブしてあれば、いつでも戻れる」こと。そのセーブが“コミット”だよ。" },
        { text: "だから、うまくいったら小さくこまめにコミット。「動いた」ポイントを残しておくのがコツ。" },
        { text: "こまめに保存してあれば、次の挑戦で壊しても平気。直前のコミットに戻せばいいだけだからね。" },
        { text: "「怖くて手が出せない」を消してくれるのがGit。大胆に試せるのは、戻せる安心があるからなんだ。" },
      ],
      takeaways: ["コミット=戻れるセーブポイント", "うまくいったら小さくこまめに保存", "戻せるから大胆に試せる"],
      relatedSlugs: ["git"],
      practice: {
        prompt: "Gitで「戻れるセーブポイント」を作る操作は？",
        choices: ["コミット", "デプロイ", "デバッグ", "リロード"],
        answer: 0,
        explain: "変更を記録するコミットが、戻れるセーブポイントになります。",
      },
      codeSample: `git add .
git commit -m "ボタンの色を変更（ここまで動く）"`,
    },
    {
      id: "a7-l2",
      type: "lesson",
      title: "1つ前に戻す",
      icon: "sliders",
      intro: "やり直しの基本",
      story: [
        { text: "作業中「あ、さっきの方がよかった」——よくある。そんな時の戻し方だよ。" },
        { text: "まだコミットしていない変更は、git restore で“最後のセーブの状態”に戻せる。書きかけを捨てる感じ。" },
        { text: "「保存（ステージ）まではしたけど、やっぱりやめる」も戻せる。段階ごとに取り消せるのがGitの安心。" },
        { text: "大事なのは、戻す前に“今どうなってる？”を git status で確認するクセ。慌てて戻すと必要な変更まで消える。" },
        { text: "迷ったら、まずコミットして退避してから試す。Gitは「消す前に一手間」で、たいてい救われるよ。" },
      ],
      takeaways: ["未保存の変更=git restoreで戻せる", "戻す前に git status で確認", "迷ったら一度コミットして退避"],
      relatedSlugs: ["git", "debug"],
      practice: {
        prompt: "戻す操作の前に確認するのによいのは？",
        choices: ["git status で現状確認", "いきなり全部消す", "PCを再起動", "電源を切る"],
        answer: 0,
        explain: "git status で今の状態を確認してから戻すと事故を防げます。",
      },
      codeSample: `git status            # 今どうなってる？を確認
git restore index.html # 書きかけを最後の保存に戻す`,
    },
    {
      id: "a7-l3",
      type: "lesson",
      title: "過去を見て・戻る",
      icon: "search",
      intro: "履歴は時間旅行",
      story: [
        { text: "Gitのすごさは「過去に行ける」こと。履歴を使った戻し方を覚えよう。" },
        { text: "git log で、これまでのコミット（セーブの履歴）を一覧で見られる。「いつ・何をした」が並ぶんだ。" },
        { text: "「この時点に戻りたい」が見つかったら、そのコミットを指定して状態を戻せる。まさに時間旅行だね。" },
        { text: "すでに公開した変更を“なかったこと”にするなら git revert。打ち消すコミットを新しく足す、安全なやり方だよ。" },
        { text: "履歴があるから、失敗しても必ず戻れる。Gitは“やり直しのきく人生”をコードにくれる道具なんだ。" },
      ],
      takeaways: ["git log で履歴（セーブ一覧）を見る", "特定の時点に戻れる＝時間旅行", "公開済みの打ち消し=git revert（安全）"],
      relatedSlugs: ["git"],
      practice: {
        prompt: "これまでのコミット履歴を一覧で見る操作は？",
        choices: ["git log", "git push", "npm install", "console.log"],
        answer: 0,
        explain: "git log でセーブの履歴（いつ何をしたか）を一覧できます。",
      },
    },
    {
      id: "a7-test",
      type: "test",
      title: "上級テスト（Git実践）",
      icon: "pencil",
      intro: "8割で合格！やり直しの技術チェック",
      passRate: 0.8,
      deepDive:
        "「戻せる」という安心は、上達の最大のエンジンになる。失敗を恐れず大胆に試せるからだ。プロも日々コミットして、行き詰まったら戻り、また進む。Gitに強くなるほど開発は怖くなくなる。次は“守り”の話——作ったものを攻撃から守る「セキュリティ」を学ぼう。安全に作れてこそ、本物のプロだ！",
      questions: [
        {
          prompt: "「戻れるセーブポイント」を作る操作は？",
          choices: ["コミット", "デプロイ", "npm install", "リロード"],
          answer: 0,
          explain: "変更を記録するコミットが、戻れる地点になります。",
        },
        {
          prompt: "まだ保存していない書きかけを元に戻すには？",
          choices: ["git restore", "git push", "git clone", "npm start"],
          answer: 0,
          explain: "未保存の変更は git restore で最後の保存状態に戻せます。",
        },
        {
          prompt: "これまでの履歴を一覧で見る操作は？",
          choices: ["git log", "git commit", "git add", "console.log"],
          answer: 0,
          explain: "git log でコミット履歴（いつ何をしたか）が見られます。",
        },
        {
          prompt: "公開済みの変更を安全に打ち消すには？",
          choices: ["git revert（打ち消しコミット）", "PCを捨てる", "ファイルを手で消す", "無視する"],
          answer: 0,
          explain: "git revert は打ち消すコミットを足す、安全なやり直し方です。",
        },
        {
          prompt: "戻す前にやるとよいことは？",
          choices: ["git status で現状確認", "いきなり全消し", "再起動", "電源オフ"],
          answer: 0,
          explain: "git status で状態を確認してから戻すと事故を防げます。",
        },
      ],
    },
  ],

  // a8: 安全に作る（上級・VIP）——セキュリティ入門
  a8: [
    {
      id: "a8-l1",
      type: "lesson",
      title: "なぜ狙われる？",
      icon: "user",
      intro: "守るのは作り手の責任",
      story: [
        { text: "作れるようになったら、必ず考えたいのが「セキュリティ（安全）」。" },
        { text: "Webサービスには、名前・メール・パスワード・お金の情報が集まる。だから悪い人に狙われるんだ。" },
        { text: "「小さな個人サイトだから大丈夫」は油断。自動のプログラムが、世界中のサイトを片っぱしから試してくる。" },
        { text: "もし情報が漏れたら、困るのは使ってくれた人たち。守るのは、作り手であるぼくらの責任なんだ。" },
        { text: "こわがらせたいわけじゃない。基本を押さえれば、ちゃんと守れる。次からその“基本”を学ぼう。" },
      ],
      takeaways: ["Webには大事な情報が集まる＝狙われる", "小さくても自動攻撃の対象になる", "利用者を守るのは作り手の責任"],
      relatedSlugs: ["xss", "https"],
      practice: {
        prompt: "セキュリティについて正しい考え方は？",
        choices: ["小さいサイトは狙われない", "作り手が利用者を守る責任がある", "見た目だけ整えればよい", "気にしなくてよい"],
        answer: 1,
        explain: "小さくても狙われます。利用者を守るのは作り手の責任です。",
      },
    },
    {
      id: "a8-l2",
      type: "lesson",
      title: "秘密の守り方",
      icon: "code",
      intro: "パスワードとキー",
      story: [
        { text: "まず守るべきは“秘密の情報”。パスワードとAPIキーの扱い方だよ。" },
        { text: "パスワードは、そのままの文字で保存しちゃダメ。漏れたら即アウト。“ハッシュ化”して読めない形で保存する。" },
        { text: "APIキーやパスワードをコードに直接書くのも禁物。a2で習った通り“環境変数”に逃がすんだったね。" },
        { text: "通信も守る。URLが https（鍵マーク）なら、途中を盗み見されにくい。今は https が当たり前だよ。" },
        { text: "「秘密は、そのまま持たない・そのまま送らない」。これだけで多くの事故は防げるんだ。" },
      ],
      takeaways: ["パスワードはハッシュ化して保存（生で持たない）", "キーは環境変数へ（コードに書かない）", "通信はhttpsで守る"],
      relatedSlugs: ["hash", "https", "environment-variable"],
      practice: {
        prompt: "パスワードの保存方法として正しいのは？",
        choices: ["そのままの文字で保存", "ハッシュ化して保存", "画面に表示する", "URLに載せる"],
        answer: 1,
        explain: "パスワードはハッシュ化して、読めない形で保存します。",
      },
    },
    {
      id: "a8-l3",
      type: "lesson",
      title: "入力を信用しない",
      icon: "sliders",
      intro: "悪意ある入力を防ぐ",
      story: [
        { text: "セキュリティの合言葉、それは「ユーザーの入力を、そのまま信用しない」。" },
        { text: "入力欄に、悪意あるコードを打ち込む攻撃がある（XSSなど）。表示にそのまま使うと、悪いコードが動いてしまう。" },
        { text: "防ぐ基本は“エスケープ”。入力された記号を無害な文字に変換して、コードとして動かないようにする。" },
        { text: "中級で習ったバリデーション（入力チェック）も味方。想定外の入力は、受け取る前にはじく。" },
        { text: "あと、使っている部品（ライブラリ）は最新に保つ。古いと、見つかった穴を突かれる。更新も立派な防御だよ。" },
      ],
      takeaways: ["入力はそのまま信用しない（XSS対策）", "表示前にエスケープ＋バリデーション", "ライブラリは最新に保つ"],
      relatedSlugs: ["xss", "validation", "form", "api"],
      practice: {
        prompt: "ユーザーの入力を扱うときの心得は？",
        choices: ["そのまま信用して表示する", "エスケープ＆チェックしてから使う", "全部拒否する", "気にしない"],
        answer: 1,
        explain: "入力は信用せず、エスケープとバリデーションをしてから使います。",
      },
    },
    {
      id: "a8-test",
      type: "test",
      title: "上級テスト（セキュリティ）",
      icon: "pencil",
      intro: "8割で合格！安全に作るための基本チェック",
      passRate: 0.8,
      deepDive:
        "セキュリティは「完璧」より「基本を外さない」が大事。パスワードはハッシュ化、キーは環境変数、通信はhttps、入力は信用しない、部品は最新に——この基本だけで、ありがちな事故の多くは防げる。やさしさが品質だったように、安全もまた、使う人への思いやりだ。次は“まちがいを先に防ぐ”型（TypeScript）。地味だけどプロを支える最後のピースだよ。",
      questions: [
        {
          prompt: "小さなサイトのセキュリティについて正しいのは？",
          choices: ["狙われないので不要", "自動攻撃の対象になり得る", "見た目だけでよい", "運まかせ"],
          answer: 1,
          explain: "小さくても自動攻撃の対象。作り手が守る責任があります。",
        },
        {
          prompt: "パスワードの正しい保存は？",
          choices: ["そのまま保存", "ハッシュ化して保存", "画面に表示", "URLに載せる"],
          answer: 1,
          explain: "ハッシュ化して、読めない形で保存します。",
        },
        {
          prompt: "APIキーやパスワードのコード上の扱いは？",
          choices: ["直接書く", "環境変数に逃がす", "画像にする", "コメントに書く"],
          answer: 1,
          explain: "秘密はコードに書かず、環境変数へ逃がします。",
        },
        {
          prompt: "ユーザーの入力を表示するときは？",
          choices: ["そのまま表示", "エスケープしてから表示", "無視する", "全部拒否"],
          answer: 1,
          explain: "そのまま信用せず、エスケープしてから扱います（XSS対策）。",
        },
        {
          prompt: "通信を守るために使うのは？",
          choices: ["http", "https（鍵マーク）", "ftp", "なし"],
          answer: 1,
          explain: "https なら通信の中身を盗み見されにくくなります。",
        },
      ],
    },
  ],

  // a9: まちがいを先に防ぐ（上級・VIP）——型（TypeScript）入門
  a9: [
    {
      id: "a9-l1",
      type: "lesson",
      title: "型ってなに？",
      icon: "check",
      intro: "データの“種類”の約束",
      story: [
        { text: "上級もあと少し。ここでは、大きなアプリを支える「型（TypeScript）」を学ぼう。" },
        { text: "型とは、データの“種類”のこと。「これは数値」「これは文字列」という約束を、コードに書いておく。" },
        { text: "ふつうのJavaScriptは自由で、数値のつもりの箱に文字を入れてもエラーにならない。便利だけど、事故のもと。" },
        { text: "TypeScriptは「この箱は数値だけ」と決めておける。約束を破ると、書いた瞬間に赤線で教えてくれる。" },
        { text: "つまり型は“うっかりミスの見張り番”。動かす前に、まちがいを先に防げるんだ。" },
      ],
      takeaways: ["型=データの種類の約束（数値・文字列など）", "JSは自由すぎて事故のもと", "TypeScriptは約束破りを即警告"],
      relatedSlugs: ["typescript", "variable"],
      practice: {
        prompt: "「型」を書いておく一番のメリットは？",
        choices: ["見た目が派手になる", "種類ちがいのミスを先に防げる", "速くなる", "色が増える"],
        answer: 1,
        explain: "型はデータの種類の約束。ミスを実行前に警告してくれます。",
      },
      codeSample: `let age: number = 20;   // ageは数値だけ
age = "twenty";         // ← 型エラー！すぐ気づける`,
    },
    {
      id: "a9-l2",
      type: "lesson",
      title: "関数を型で守る",
      icon: "code",
      intro: "引数と戻り値に型",
      story: [
        { text: "型がいちばん効くのは、中級で習った「関数」まわりだよ。" },
        { text: "引数に型をつけると「ここには数値を渡してね」と決められる。まちがえて文字を渡すと即エラー。" },
        { text: "戻り値にも型をつけられる。「この関数は数値を返す」とわかると、受け取る側も安心して使える。" },
        { text: "しかもエディタが賢くなる。型があると「次に何が書けるか」を候補で出してくれて、タイピングが速く正確に。" },
        { text: "型は“縛り”じゃなく“ガードレール”。外れそうになると教えてくれるから、むしろ自由に速く走れるんだ。" },
      ],
      takeaways: ["引数・戻り値に型をつけて守る", "受け取る側も安心して使える", "エディタの補完が賢くなる"],
      relatedSlugs: ["typescript", "function"],
      practice: {
        prompt: "関数の引数に型をつけると？",
        choices: ["渡す値の種類ちがいを防げる", "色が変わる", "遅くなる", "何も起きない"],
        answer: 0,
        explain: "引数の型で、まちがった種類の値を渡すミスを防げます。",
      },
      codeSample: `function add(a: number, b: number): number {
  return a + b;
}
add(2, "3"); // ← 型エラー！`,
    },
    {
      id: "a9-l3",
      type: "lesson",
      title: "大きくなるほど効く",
      icon: "layout",
      intro: "型のありがたみ",
      story: [
        { text: "「小さいうちは型なしでいい」と思うかも。でも、育つほど型はありがたくなる。" },
        { text: "コードが増えると、どこで何を渡していたか忘れる。型があれば、忘れても機械が覚えていてくれる。" },
        { text: "上級で習ったリファクタ（整理し直し）も、型があると安心。壊すと赤線が出るから、大胆に直せる。" },
        { text: "チーム開発でも、型は“共通のルール”になる。人によって渡すデータがバラバラ、を防いでくれる。" },
        { text: "テストと同じで、型も“安心して進むための土台”。ちなみにこのアプリも、ぜんぶTypeScriptで書かれているよ。" },
      ],
      takeaways: ["規模が育つほど型が助けになる", "型があるとリファクタも安心", "チームの共通ルールになる"],
      relatedSlugs: ["typescript", "debug"],
      practice: {
        prompt: "型（TypeScript）が特に役立つのは？",
        choices: ["1行の使い捨て", "大きなアプリ・チーム開発", "画像編集", "動画再生"],
        answer: 1,
        explain: "規模が大きい・チームで作るほど、型の安心が効いてきます。",
      },
    },
    {
      id: "a9-test",
      type: "test",
      title: "上級テスト（型）",
      icon: "pencil",
      intro: "8割で合格！型の考え方チェック",
      passRate: 0.8,
      deepDive:
        "型は「書く手間が少し増える代わりに、あとで泣かない」投資。テスト・型・アクセシビリティ…上級で学んだのは、どれも“安心して長く作り続ける”ための土台だ。派手じゃないけど、プロと初心者を分けるのはこういう地味な基本の積み重ね。次は少し目線を変えて、“見た目”の話。センスに頼らず整えるデザインの4原則を学ぼう！",
      questions: [
        {
          prompt: "「型」とは何のこと？",
          choices: ["データの種類の約束", "画面の色", "ファイル名", "通信速度"],
          answer: 0,
          explain: "型はデータの種類（数値・文字列など）の約束です。",
        },
        {
          prompt: "TypeScriptの一番のメリットは？",
          choices: ["実行前にミスに気づける", "派手になる", "無料になる", "速く動く"],
          answer: 0,
          explain: "型のおかげで、種類ちがいのミスを実行前に警告できます。",
        },
        {
          prompt: "関数の引数に型をつけると？",
          choices: ["渡す値のミスを防げる", "色が変わる", "消える", "遅くなる"],
          answer: 0,
          explain: "引数の型で、まちがった種類を渡すミスを防げます。",
        },
        {
          prompt: "型が特に効くのはどんな時？",
          choices: ["使い捨ての1行", "大きなアプリ・チーム開発", "画像を見る", "音を鳴らす"],
          answer: 1,
          explain: "規模が大きい・チームで作るほど型の安心が効きます。",
        },
        {
          prompt: "TypeScriptは最終的にどうなって動く？",
          choices: ["JavaScriptに変換して動く", "そのまま動く", "画像になる", "動かない"],
          answer: 0,
          explain: "TypeScriptはJavaScriptに変換されてから動きます。",
        },
      ],
    },
  ],

  // a10: センスに頼らず整える（上級・VIP）——デザインの4原則
  a10: [
    {
      id: "a10-l1",
      type: "lesson",
      title: "近くにまとめる（近接）",
      icon: "layout",
      intro: "関係あるものは近くに",
      story: [
        { text: "「なんかダサい…」を卒業しよう。デザインには“センス”じゃなく“ルール”がある。まず1つ目。" },
        { text: "「近接」——関係のあるものは近づけ、関係ないものは離す。ただそれだけ。" },
        { text: "たとえば見出しと本文。見出しは、そのすぐ下の本文に近づける。上の段落から離すと「どれの見出しか」が伝わる。" },
        { text: "初級で習った余白（margin）が主役だよ。余白でグループを作る、という感覚。" },
        { text: "バラバラに見えるページは、たいてい近接がバラバラ。近づける・離すを意識するだけで、ぐっと整って見える。" },
      ],
      takeaways: ["関係あるもの=近く / ないもの=離す", "余白でグループを作る（近接）", "見出しは“下の本文”に近づける"],
      relatedSlugs: ["margin", "wireframe"],
      practice: {
        prompt: "「近接」の考え方として正しいのは？",
        choices: ["全部を等間隔にする", "関係あるものを近づける", "余白をなくす", "色で分ける"],
        answer: 1,
        explain: "関係あるものは近く、ないものは離す。余白でグループを作ります。",
      },
    },
    {
      id: "a10-l2",
      type: "lesson",
      title: "そろえる（整列）",
      icon: "sliders",
      intro: "見えない線に沿わせる",
      story: [
        { text: "2つ目のルールは「整列」。要素を“見えない線”にそろえるだけで、一気にプロっぽくなる。" },
        { text: "文字や画像の左端をピシッとそろえる。バラバラの位置に置くと、それだけで素人っぽく見えるんだ。" },
        { text: "中央ぞろえより、左ぞろえの方が読みやすいことが多い。迷ったらまず左でそろえてみよう。" },
        { text: "初級で習ったFlexboxやグリッドは、まさに“そろえる”ための道具。ルールと道具がつながるね。" },
        { text: "「なんか散らかって見える」の正体は、たいてい整列不足。線を意識するだけで解決するよ。" },
      ],
      takeaways: ["要素は見えない線にそろえる（整列）", "迷ったら左ぞろえ", "Flex/グリッドがそろえる道具"],
      relatedSlugs: ["flexbox", "grid-layout"],
      practice: {
        prompt: "「整列」で散らかりを防ぐには？",
        choices: ["バラバラに置く", "見えない線にそろえる", "色を増やす", "余白をなくす"],
        answer: 1,
        explain: "要素を見えない線にそろえると、整って見えます。",
      },
    },
    {
      id: "a10-l3",
      type: "lesson",
      title: "くり返す・目立たせる",
      icon: "droplet",
      intro: "反復と対比",
      story: [
        { text: "残り2つのルールをまとめて。「反復」と「対比」だよ。" },
        { text: "反復＝同じルールをくり返す。見出しは全部同じ色・大きさ、ボタンは全部同じ形。統一感が信頼感になる。" },
        { text: "m7のTailwindやa1のコンポーネントは、この反復を自然に作れる道具でもあるんだ。" },
        { text: "対比＝大事なものは思いきり目立たせる。大きく・濃く・太く。中途半端が一番ダメ。差はハッキリつける。" },
        { text: "近接・整列・反復・対比。この4つを意識するだけで、“なんとなく”が“理由のある見た目”に変わるよ。" },
      ],
      takeaways: ["反復=同じルールをくり返す（統一感）", "対比=大事なものは思いきり目立たせる", "4原則=近接・整列・反復・対比"],
      relatedSlugs: ["tailwind", "component"],
      practice: {
        prompt: "「対比」で大事な要素を伝えるには？",
        choices: ["少しだけ変える", "思いきり目立たせる（大きく・濃く）", "全部同じにする", "隠す"],
        answer: 1,
        explain: "対比は中途半端が禁物。差はハッキリつけて目立たせます。",
      },
    },
    {
      id: "a10-test",
      type: "test",
      title: "上級テスト（デザイン）",
      icon: "pencil",
      intro: "8割で合格！デザイン4原則チェック",
      passRate: 0.8,
      deepDive:
        "近接・整列・反復・対比。この4つは、有名なデザイン本でも“デザインの基本”として紹介される王道ルール。センスがなくても、このルールに沿うだけで「なんか良い」が作れる。エンジニアがこれを知っていると、AIに「ここは対比を強めて」と的確に指示もできる。次は、作ったものを“届ける”話。検索で見つけてもらうSEOの基本を学ぼう！",
      questions: [
        {
          prompt: "関係あるものを近づけ、ないものを離すのは？",
          choices: ["近接", "対比", "反復", "整列"],
          answer: 0,
          explain: "近接。余白でグループを作る考え方です。",
        },
        {
          prompt: "要素を見えない線にそろえるのは？",
          choices: ["近接", "整列", "反復", "対比"],
          answer: 1,
          explain: "整列。左ぞろえなどで散らかりを防ぎます。",
        },
        {
          prompt: "同じルールをくり返して統一感を出すのは？",
          choices: ["反復", "対比", "近接", "整列"],
          answer: 0,
          explain: "反復。見出しやボタンの見た目をそろえます。",
        },
        {
          prompt: "大事なものを思いきり目立たせるのは？",
          choices: ["近接", "整列", "反復", "対比"],
          answer: 3,
          explain: "対比。差はハッキリつけるのがコツです。",
        },
        {
          prompt: "デザインの4原則に“ない”ものは？",
          choices: ["近接", "整列", "反復", "圧縮"],
          answer: 3,
          explain: "4原則は近接・整列・反復・対比。圧縮は含みません。",
        },
      ],
    },
  ],

  // a11: 検索で見つけてもらう（上級・VIP）——SEOの基本
  a11: [
    {
      id: "a11-l1",
      type: "lesson",
      title: "SEOってなに？",
      icon: "search",
      intro: "見つけてもらう工夫",
      story: [
        { text: "どんなに良いサイトも、見つけてもらえなければ無いのと同じ。そこで大事なのが「SEO」。" },
        { text: "SEOとは、Googleなどで検索したときに、上のほうに出てもらうための工夫のこと。" },
        { text: "検索エンジンは、世界中のページを読んで「この検索にはこのページが役立つ」と順番をつけている。" },
        { text: "だから“検索エンジンにも人にも分かりやすいページ”を作ると、上位に出やすくなるんだ。" },
        { text: "小手先のテクニックより、「ちゃんと役立つ中身を、正しく伝える」——これがSEOの本質だよ。" },
      ],
      takeaways: ["SEO=検索で上位に出す工夫", "検索エンジンが役立つ順に並べる", "本質は“役立つ中身を正しく伝える”"],
      relatedSlugs: ["seo"],
      practice: {
        prompt: "SEOの本質に近いのは？",
        choices: ["小手先で順位を上げる", "役立つ中身を正しく伝える", "色を派手にする", "画像を増やす"],
        answer: 1,
        explain: "役立つ中身を、検索エンジンにも人にも分かりやすく伝えるのが本質です。",
      },
    },
    {
      id: "a11-l2",
      type: "lesson",
      title: "中身で伝える",
      icon: "book-open",
      intro: "タイトルと見出し",
      story: [
        { text: "検索エンジンに“何のページか”を伝える基本を押さえよう。ぜんぶ既習の回収だよ。" },
        { text: "まずページの「タイトル（titleタグ）」。検索結果に大きく出る看板。内容を的確に短く。" },
        { text: "「説明文（meta description）」も。検索結果でタイトルの下に出る紹介文。クリックしたくなる一言を。" },
        { text: "そして見出しの構造。a6で習ったセマンティックHTML——h1は1つ、その下にh2…と正しく積む。" },
        { text: "検索エンジンは、この“見出しの骨組み”を読んで内容を理解する。正しいタグ＝そのままSEOなんだ。" },
      ],
      takeaways: ["titleタグ=検索結果の看板", "meta description=紹介文", "正しい見出し構造(h1→h2)で内容を伝える"],
      relatedSlugs: ["seo", "semantic-html"],
      practice: {
        prompt: "検索結果に大きく出る“看板”になるのは？",
        choices: ["titleタグ", "背景色", "画像のsize", "コメント"],
        answer: 0,
        explain: "ページのタイトル（titleタグ）が検索結果の看板になります。",
      },
      codeSample: `<title>フロントエンド用語図鑑 | Co-Cre</title>
<meta name="description" content="UI部品の名前を実例つきで学べる図鑑">`,
    },
    {
      id: "a11-l3",
      type: "lesson",
      title: "速さ・スマホ・信頼",
      icon: "monitor",
      intro: "土台も評価される",
      story: [
        { text: "中身だけじゃなく、“サイトの土台”もSEOに効く。ここも全部、上級で習ったことの回収だ。" },
        { text: "表示の速さ（a5）。遅いサイトは検索でも不利。速いページは人にも検索エンジンにも好かれる。" },
        { text: "スマホ対応（レスポンシブ）。今は検索の多くがスマホ。スマホで見やすいかは重要な評価ポイント。" },
        { text: "信頼も大事。他の良いサイトからリンクされる（被リンク）と「信頼できる」と評価されやすい。" },
        { text: "結局、速くて・見やすくて・役に立つ。“いいサイト”を作ることが、最強のSEO。近道はないんだ。" },
      ],
      takeaways: ["表示速度・スマホ対応もSEOに効く", "良いサイトからのリンク=信頼", "結局“いいサイト”が最強のSEO"],
      relatedSlugs: ["seo", "responsive"],
      practice: {
        prompt: "SEOで有利になる土台として正しいのは？",
        choices: ["表示が速く・スマホで見やすい", "色が多い", "文字が小さい", "画像だけ"],
        answer: 0,
        explain: "速さ・スマホ対応（レスポンシブ）も検索評価に効きます。",
      },
    },
    {
      id: "a11-test",
      type: "test",
      title: "上級テスト（SEO）",
      icon: "pencil",
      intro: "8割で合格！SEOの基本チェック",
      passRate: 0.8,
      deepDive:
        "SEOは「作ったものを、必要な人に届ける」ための技術。そして気づいたかな——SEOの中身は、セマンティックHTML・速さ・レスポンシブ…と、上級で学んできたことの総まとめなんだ。ここまでは“画面（フロント）”の話が中心だった。次はいよいよ“画面の裏側”——サーバーとデータベースをのぞいて、Webの全体像を完成させよう！",
      questions: [
        {
          prompt: "SEOとは？",
          choices: ["検索で見つけてもらう工夫", "画像編集", "動画配信", "課金の仕組み"],
          answer: 0,
          explain: "検索で上位に出て、見つけてもらうための工夫です。",
        },
        {
          prompt: "検索結果の“看板”になるのは？",
          choices: ["titleタグ", "背景色", "余白", "影"],
          answer: 0,
          explain: "ページのタイトル（titleタグ）が看板になります。",
        },
        {
          prompt: "内容の理解を助ける見出しの書き方は？",
          choices: ["正しい構造(h1→h2)で積む", "全部h1にする", "見出しを使わない", "画像で書く"],
          answer: 0,
          explain: "セマンティックHTML。h1は1つ、その下にh2…と正しく積みます。",
        },
        {
          prompt: "土台としてSEOに効くのは？",
          choices: ["速さ・スマホ対応", "色の数", "文字の小ささ", "広告の量"],
          answer: 0,
          explain: "表示速度やレスポンシブ（スマホ対応）も評価されます。",
        },
        {
          prompt: "結局いちばん強いSEOは？",
          choices: ["小手先のテク", "速くて見やすく役立つ“いいサイト”", "文字を隠す", "リンクを買う"],
          answer: 1,
          explain: "役に立つ良いサイトを正しく作ることが最強のSEOです。",
        },
      ],
    },
  ],

  // a12: 裏側を動かす（上級・VIP）——サーバー/DB/認証。図鑑のbackendカテゴリを学習動線に載せる
  a12: [
    {
      id: "a12-l1",
      type: "lesson",
      title: "サーバーってなに？",
      icon: "monitor",
      intro: "画面の裏側をのぞく",
      story: [
        { text: "上級もいよいよ大詰め。ここでは“画面の裏側”をのぞくよ。ボタンを押したデータは、どこへ行くと思う？" },
        { text: "その行き先が「サーバー」。ネットの向こうでずっと待ち構えている、お店の店員さんみたいな存在だ。" },
        { text: "きみのブラウザが「これください」とお願い（リクエスト）を送ると、サーバーが「はいどうぞ」と返事（レスポンス）を返す。この往復でWebは動いている。" },
        { text: "サーバーの“受付窓口”のことをエンドポイントと呼ぶ。「予約一覧はこの窓口」「登録はこっちの窓口」みたいに、用途ごとにURLが分かれているんだ。" },
        { text: "ちなみに練習用の場所（開発環境）と本番のお店（本番環境）は分けて使う。試すのは開発、公開は本番。まぜないのが安全だよ。" },
      ],
      takeaways: [
        "サーバー＝リクエストに応えて返す、ネット向こうの相手",
        "Webはリクエスト↔レスポンスの往復で動く",
        "エンドポイント＝用途ごとの受付窓口（URL）",
      ],
      relatedSlugs: ["server", "request-response", "endpoint", "environment"],
      practice: {
        prompt: "ブラウザがサーバーに送る「お願い」を何という？",
        choices: ["レスポンス", "リクエスト", "データベース", "エンドポイント"],
        answer: 1,
        explain: "お願い＝リクエスト。それに対する返事がレスポンスです。",
      },
      codeSample: `// ブラウザからサーバーの窓口（エンドポイント）へお願いする
const res = await fetch("/api/reservations"); // リクエスト
const data = await res.json();                 // レスポンスを受け取る`,
    },
    {
      id: "a12-l2",
      type: "lesson",
      title: "データをしまう場所",
      icon: "database",
      intro: "データベースとSQL",
      story: [
        { text: "サーバーは受け取ったデータを、どこにしまうと思う？——そう、「データベース」だ。" },
        { text: "データベースは、超きっちりした表計算ソフトみたいなもの。行と列で、予約もユーザーも整理してしまっておける。" },
        { text: "そのデータベースに「4人以上の予約を出して」とお願いする専用の言葉が「SQL」。SELECT … WHERE … と書くと、ほしい行だけ取り出せる。" },
        { text: "でもSQLを毎回手で書くのは大変。そこで「ORM」という道具を使うと、いつものプログラミング言語のまま、データベースを操作できるんだ。" },
        { text: "まとめると——サーバーが受付、データベースが倉庫、SQL/ORMが倉庫番への指示。この分担が“裏側”の基本形だよ。" },
      ],
      takeaways: [
        "データベース＝データを行と列で保存する倉庫",
        "SQL＝データベースにお願いする専用の言葉",
        "ORM＝プログラミング言語のままDBを操作する道具",
      ],
      relatedSlugs: ["database", "sql", "orm"],
      practice: {
        prompt: "データベースからほしいデータを取り出す専用の言葉は？",
        choices: ["HTML", "SQL", "CSS", "JSON"],
        answer: 1,
        explain: "SQL。SELECT … WHERE … で、ほしい行だけ取り出せます。",
      },
      codeSample: `-- SQL: 予約テーブルから「4人以上」の予約だけ取り出す
SELECT name, people FROM reservations
WHERE people >= 4;`,
    },
    {
      id: "a12-l3",
      type: "lesson",
      title: "本人だけ安全に通す",
      icon: "lock",
      intro: "認証・認可・門番たち",
      story: [
        { text: "最後は“安全”の話。ログインが必要なサイト、あるよね。あの裏側をのぞこう。" },
        { text: "「あなたは誰？」を確かめるのが認証（ログイン）。成功すると、サーバーは“通行証”を発行する。これがトークン（JWT）やセッションだ。次からは通行証を見せれば、いちいちログインし直さなくていい。" },
        { text: "似た言葉に認可があるけど、これは別もの。認証＝「誰か」を確認、認可＝「何をしていいか」の許可。管理者だけ削除ボタンを押せる、みたいなのが認可だね。" },
        { text: "プログラム同士がやりとりするときは、合言葉のAPIキーを使う。別のサイトからのアクセスを許すか決めるCORSという門番もいる。どれも安全のための仕組みだ。" },
        { text: "ちなみに「支払いが完了したら自動で通知」みたいに、出来事が起きた瞬間に相手へ知らせる仕組みをWebhookという。裏側は、こういう部品の組み合わせで動いているんだ。" },
      ],
      takeaways: [
        "認証＝誰かを確認 / 認可＝何をしていいかの許可",
        "ログイン後の通行証＝トークン（JWT）やセッション",
        "APIキー・CORSは安全の門番、Webhookは出来事の自動通知",
      ],
      relatedSlugs: ["authentication", "jwt", "session", "authorization", "api-key", "cors", "webhook"],
      practice: {
        prompt: "「誰か」を確認するのが認証。「何をしていいか」の許可は？",
        choices: ["認可", "認証", "セッション", "CORS"],
        answer: 0,
        explain: "認可＝何をしていいかの許可。認証（誰か確認）とセットでよく使います。",
      },
    },
    {
      id: "a12-test",
      type: "test",
      title: "上級テスト（サーバー編）",
      icon: "pencil",
      intro: "8割で合格！サーバーとデータベースのチェック",
      passRate: 0.8,
      deepDive:
        "おつかれさま。これで“画面の裏側”までイメージできるようになった。フロント（見た目）→中身（サーバー・DB）→安全（認証）と、Webの全体像が一周つながったね。さあ、本当の最終章。ここまで積んだ基礎を武器に、AIという相棒との組み方を身につけて、全コース制覇だ！",
      questions: [
        {
          prompt: "サーバーとブラウザのやりとりの基本は？",
          choices: ["リクエストとレスポンスの往復", "コピーとペースト", "保存と印刷", "拡大と縮小"],
          answer: 0,
          explain: "お願い（リクエスト）と返事（レスポンス）の往復でWebは動きます。",
        },
        {
          prompt: "データを行と列で保存しておく倉庫は？",
          choices: ["データベース", "ブラウザ", "エディタ", "モーダル"],
          answer: 0,
          explain: "データベース。予約やユーザーを整理して保存しておきます。",
        },
        {
          prompt: "データベースにほしいデータをお願いする言葉は？",
          choices: ["SQL", "HTML", "CSS", "URL"],
          answer: 0,
          explain: "SQL。SELECT … WHERE … でほしい行だけ取り出せます。",
        },
        {
          prompt: "ログインに成功したあと、もらう“通行証”は？",
          choices: ["トークン（JWT）やセッション", "パスワード", "エラー文", "背景色"],
          answer: 0,
          explain: "トークン（JWT）やセッション。次からはこれを見せれば本人と分かります。",
        },
        {
          prompt: "「何をしていいか」の許可を決めるのは？",
          choices: ["認可", "認証", "リクエスト", "エンドポイント"],
          answer: 0,
          explain: "認可。認証（誰か確認）とは別で、権限の許可を指します。",
        },
      ],
    },
  ],

  // a3: AIと組む開発（上級・VIP）——このアプリの締めくくり
  a3: [
    {
      id: "a3-l1",
      type: "lesson",
      title: "AIは最強の相棒",
      icon: "zap",
      intro: "上手な頼み方",
      story: [
        { text: "最終章！いまや開発はAIと二人三脚の時代。その使いこなし方を身につけよう。" },
        { text: "AIに頼むときのコツは「具体的に」。“いい感じにして”より、“緑のボタンを中央に、押すと確認モーダルを出して”のように。" },
        { text: "初級で覚えた部品の名前が、ここで武器になる。「モーダルで」「トーストで」と言えば、AIに正確に伝わる。" },
        { text: "コードの下書き、エラーの原因さがし、書き方の相談——AIはぜんぶ手伝ってくれる“超優秀な相棒”だ。" },
        { text: "つまり、用語を知っているほどAIをうまく操れる。この図鑑で学んできたこと全部が、ここで効いてくるんだ。" },
      ],
      takeaways: ["AIへの指示は具体的に（部品名で伝える）", "用語を知るほどAIを正確に動かせる", "下書き・原因さがし・相談に使える相棒"],
      practice: {
        prompt: "AIに頼むときのコツは？",
        choices: ["あいまいに頼む", "部品名などで具体的に頼む", "一度に全部頼む", "頼まない"],
        answer: 1,
        explain: "具体的に頼むほど正確に伝わる。用語を知っていると強いです。",
      },
      codeSample: `# よくない頼み方
「いい感じのフォーム作って」

# 伝わる頼み方（部品名で具体的に）
「名前と日付の入力欄があるフォームを作って。
 送信したら確認モーダルを出して、
 OKならトーストで『予約完了』と表示して」`,
    },
    {
      id: "a3-l2",
      type: "lesson",
      title: "AIの答えを見抜く",
      icon: "search",
      intro: "丸投げの落とし穴",
      story: [
        { text: "AIは便利。でも“いつも正しい”わけじゃない。ここが一番大事なところ。" },
        { text: "AIはそれっぽい答えを自信満々に出すけど、たまに間違える（これを俗に“ハルシネーション”という）。" },
        { text: "だから受け取ったコードは、必ず自分で動かして確かめる。“動いた＝正しい”を自分の目で確認する。" },
        { text: "「なぜこう書くの？」と理由を聞き返すのも有効。説明できないコードは、そのまま使わないのが安全。" },
        { text: "見抜く力の正体は“基礎”。この図鑑でつけた土台があるから、AIの間違いに気づける。丸投げ卒業だ。" },
      ],
      takeaways: ["AIも間違える（自信満々でも疑う）", "もらったコードは動かして確かめる", "見抜く力の正体＝自分の基礎"],
      practice: {
        prompt: "AIが出したコードへの正しい態度は？",
        choices: ["必ず正しいので丸ごと使う", "動かして自分で確かめる", "見ずに公開する", "全部消す"],
        answer: 1,
        explain: "AIも間違えます。動かして確かめ、理由を理解して使いましょう。",
      },
      relatedSlugs: ["api"],
    },
    {
      id: "a3-l3",
      type: "lesson",
      title: "AIと作る進め方",
      icon: "wrench",
      intro: "対話でつくる",
      story: [
        { text: "実際にAIとどう作るか、進め方のコツをまとめよう。" },
        { text: "①大きく頼まず“小さく”頼む。「全部作って」より「まずボタンだけ」。少しずつ積む方が失敗しにくい。" },
        { text: "②エラーが出たら、エラー文をそのまま貼って「どう直す？」。原因さがしはAIの得意技。" },
        { text: "③“何を作るか（設計）”は自分で決める。AIは作る手伝い、方向を決めるのは君だ。" },
        { text: "頼む→試す→直す、を対話でくり返す。これが今の作り方。基礎×AIで、作れるものが一気に広がるよ！" },
      ],
      takeaways: ["小さく頼んで積み上げる", "エラー文は貼って原因を聞く", "設計（何を作るか）は自分で決める"],
      practice: {
        prompt: "AIと作るときの進め方でよいのは？",
        choices: ["一度に全部頼む", "小さく頼んで積み上げる", "エラーは無視する", "設計も丸投げ"],
        answer: 1,
        explain: "小さく頼んで試す→直すの反復が安全。設計は自分で決めます。",
      },
    },
    {
      id: "a3-test",
      type: "test",
      title: "最終卒業テスト",
      icon: "trophy",
      intro: "8割で合格！これが最後のマス",
      passRate: 0.8,
      deepDive:
        "おめでとう、全コース制覇だ！「用語を知る（初級）→書ける（中級）→現場とAIで作る（上級）」の一周を、君はやりきった。ここから先は、作りたいものを作りながら伸ばすフェーズ。基礎という土台があれば、AIという相棒と一緒に、どんどん遠くまで行ける。ようこそ、“作る人”の世界へ。これがゴールで、本当のスタートだ！",
      questions: [
        {
          prompt: "AIに頼むときのコツは？",
          choices: ["あいまいに頼む", "具体的に（部品名などで）頼む", "一度に全部頼む", "頼まない"],
          answer: 1,
          explain: "具体的に頼むほど正確に伝わる。用語を知っていると強いです。",
        },
        {
          prompt: "AIが出したコードへの正しい態度は？",
          choices: ["必ず正しいので丸ごと使う", "動かして自分で確かめる", "見ずに公開する", "全部消す"],
          answer: 1,
          explain: "AIも間違えます。動かして確かめ、理由を理解して使いましょう。",
        },
        {
          prompt: "AIの間違いに気づくために一番大事なのは？",
          choices: ["高いPC", "自分の基礎", "速いネット", "運"],
          answer: 1,
          explain: "見抜く力の正体は基礎。土台があるから間違いに気づけます。",
        },
        {
          prompt: "AIと作るときの進め方でよいのは？",
          choices: ["一度に全部頼む", "小さく頼んで積み上げる", "エラーは無視", "設計もAIに丸投げ"],
          answer: 1,
          explain: "小さく頼んで試す→直すの反復が安全。設計は自分で決めます。",
        },
        {
          prompt: "エラーが出たときAIへの一番早い頼み方は？",
          choices: ["エラー文をそのまま貼って聞く", "スクショを撮るだけ", "あきらめる", "PCを買い替える"],
          answer: 0,
          explain: "エラー文を貼って「どう直す？」が最速。原因さがしはAIの得意技です。",
        },
      ],
    },
  ],
};

// すべてのノードを章の順に平坦化（前提: 章順 → 章内のノード順）
export interface FlatNode {
  node: JourneyNode;
  chapter: Chapter;
  index: number; // 全体の通し番号
}

export const flatNodes: FlatNode[] = chapters.flatMap((chapter) =>
  (nodesByChapter[chapter.id] ?? []).map((node) => ({ node, chapter, index: 0 }))
).map((fn, i) => ({ ...fn, index: i }));

export const totalNodes = flatNodes.length;

export function getFlatNode(id: string): FlatNode | undefined {
  return flatNodes.find((f) => f.node.id === id);
}

/** 前提: 直前のノードがクリア済みなら解放（先頭は常に解放） */
export function isUnlocked(id: string, cleared: readonly string[]): boolean {
  const i = flatNodes.findIndex((f) => f.node.id === id);
  if (i <= 0) return true;
  return cleared.includes(flatNodes[i - 1].node.id);
}

/** 次に進むべきノードのid（未クリアの先頭）。全部終わっていれば null */
export function nextNodeId(cleared: readonly string[]): string | null {
  const f = flatNodes.find((fn) => !cleared.includes(fn.node.id));
  return f ? f.node.id : null;
}

// ── コースレベル（初級/中級/上級）まわりのヘルパー ──

/** レベルごとに章をまとめて返す（/learn のコース見出しに使う）。 */
export function chaptersByLevel(level: CourseLevel): Chapter[] {
  return chapters.filter((c) => c.level === level);
}

/** 章がそのレベルの何番目か（例: 上級 6/11章）。レッスン詳細の現在地表示に使う。 */
export interface ChapterPosition {
  level: CourseLevel;
  levelLabel: string;
  index: number; // 1始まり
  total: number;
}

export function chapterPositionInLevel(chapterId: string): ChapterPosition | null {
  const chap = chapters.find((c) => c.id === chapterId);
  if (!chap) return null;
  const sameLevel = chapters.filter((c) => c.level === chap.level);
  const index = sameLevel.findIndex((c) => c.id === chapterId) + 1;
  const lm = levels.find((l) => l.level === chap.level);
  return { level: chap.level, levelLabel: lm?.label ?? "", index, total: sameLevel.length };
}

/**
 * この章がいま開けるか（アクセス判定）。
 * free の章は常に開ける。vip の章は VIP会員 or 買い切り所持者のみ。
 * ※本番では必ずサーバー側でも判定すること（クライアントは表示制御のみ）。
 */
export function isChapterAccessible(chapter: Chapter, hasPaidAccess: boolean): boolean {
  return chapter.access === "free" || hasPaidAccess;
}

/** ノードidから、そのノードが有料ロック中か（=VIP章なのに未課金）を返す。 */
export function isNodeLocked(id: string, hasPaidAccess: boolean): boolean {
  const f = getFlatNode(id);
  if (!f) return false;
  return !isChapterAccessible(f.chapter, hasPaidAccess);
}

/** レベル（初級/中級/上級）ごとの進捗。マイページのコース別進捗バーに使う。 */
export interface LevelProgress {
  level: CourseLevel;
  label: string;
  eyebrow: string;
  done: number;
  total: number;
  pct: number; // 0-100
}

/**
 * 用語slugを扱うレッスンを1つ返す（図鑑→レッスンの逆リンク用）。
 * relatedSlugs に含む最初のレッスンを返す。無ければ null。
 */
export interface LessonRef {
  nodeId: string;
  lessonTitle: string;
  chapterTitle: string;
}

export function lessonForSlug(slug: string): LessonRef | null {
  const f = flatNodes.find((fn) => fn.node.type === "lesson" && (fn.node.relatedSlugs ?? []).includes(slug));
  if (!f) return null;
  return { nodeId: f.node.id, lessonTitle: f.node.title, chapterTitle: f.chapter.title };
}

export function levelProgressList(cleared: readonly string[]): LevelProgress[] {
  const set = new Set(cleared);
  return levels.map((lm) => {
    const nodes = flatNodes.filter((f) => f.chapter.level === lm.level);
    const done = nodes.filter((f) => set.has(f.node.id)).length;
    const total = nodes.length;
    return {
      level: lm.level,
      label: lm.label,
      eyebrow: lm.eyebrow,
      done,
      total,
      pct: total > 0 ? Math.round((done / total) * 100) : 0,
    };
  });
}
