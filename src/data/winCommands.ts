// Windowsコマンド図鑑のシードデータ。
// フロント学習者が「ターミナル操作こわい」を克服するための実用コマンド集。
// CMD（コマンドプロンプト）と PowerShell の両方を、用途カテゴリでまとめる。

export type CmdCategory =
  | "file"
  | "dir"
  | "network"
  | "system"
  | "dev"
  | "powershell";

export const CMD_CATEGORY_LABELS: Record<CmdCategory, string> = {
  file: "ファイル操作",
  dir: "フォルダ移動",
  network: "ネットワーク",
  system: "システム",
  dev: "開発でよく使う",
  powershell: "PowerShell",
};

export interface WinCommand {
  slug: string;
  name: string; // 実際に打つコマンド（例: cd）
  reading: string; // 読み（検索用）
  category: CmdCategory;
  shell: "cmd" | "ps" | "both";
  summary: string; // 一言で
  description: string; // 何をするか・注意点
  example: string; // 具体例
  exampleNote?: string; // 例の説明
  aliases?: string[];
}

export const winCommands: WinCommand[] = [
  // ============ フォルダ移動 ============
  {
    slug: "cd",
    name: "cd",
    reading: "しーでぃー ちぇんじでぃれくとり いどう",
    category: "dir",
    shell: "both",
    summary: "今いるフォルダ（作業ディレクトリ）を移動する。",
    description:
      "ターミナル操作のいちばん基本。「今どこにいるか」を変える命令。フォルダ名を打つと下へ、`cd ..` で一つ上の階層へ戻る。パスにスペースがあるときは \"...\" で囲む。",
    example: "cd Documents\\my-app",
    exampleNote: "Documents の中の my-app フォルダへ入る。`cd ..` で一つ上へ戻る。",
    aliases: ["change directory", "ちぇんじでぃれくとり"],
  },
  {
    slug: "dir",
    name: "dir",
    reading: "でぃれくとり いちらん ふぁいるいちらん",
    category: "dir",
    shell: "cmd",
    summary: "今のフォルダの中身（ファイル・フォルダ一覧）を表示する。",
    description:
      "「このフォルダに何がある？」を確認する命令。PowerShell や Mac/Linux の `ls` に相当する。`dir /a` で隠しファイルも表示。",
    example: "dir",
    exampleNote: "PowerShell では `ls` や `Get-ChildItem` でも同じことができる。",
    aliases: ["ls", "list"],
  },
  {
    slug: "pushd-popd",
    name: "pushd / popd",
    reading: "ぷっしゅでぃー ぽっぷでぃー",
    category: "dir",
    shell: "both",
    summary: "移動元を覚えたままフォルダを移動し、あとで一発で戻る。",
    description:
      "`pushd フォルダ` で移動しつつ元の場所を記憶。作業が終わったら `popd` で元のフォルダへ瞬時に戻れる。深い階層を行き来するときに便利。",
    example: "pushd C:\\work\\logs\n( 作業する )\npopd",
    exampleNote: "popd で pushd した場所へ戻る。",
  },

  // ============ ファイル操作 ============
  {
    slug: "type",
    name: "type",
    reading: "たいぷ ふぁいるひょうじ ちゅうみ",
    category: "file",
    shell: "cmd",
    summary: "テキストファイルの中身を画面に表示する。",
    description:
      "ファイルを開かずにサッと中身を確認したいときに使う。Mac/Linux の `cat` に相当。PowerShell では `Get-Content`（別名 `cat`）。",
    example: "type package.json",
    aliases: ["cat"],
  },
  {
    slug: "copy",
    name: "copy",
    reading: "こぴー ふくせい",
    category: "file",
    shell: "cmd",
    summary: "ファイルを別の場所や名前でコピーする。",
    description:
      "元ファイルはそのままに複製をつくる。フォルダごとコピーしたいときは `xcopy` や `robocopy` を使う。",
    example: "copy index.html backup.html",
    exampleNote: "index.html を backup.html という名前で複製する。",
  },
  {
    slug: "move",
    name: "move",
    reading: "むーぶ いどう りねーむ",
    category: "file",
    shell: "cmd",
    summary: "ファイルを移動する（名前の変更にも使える）。",
    description:
      "コピーと違い、元ファイルは無くなる。同じフォルダ内で名前だけ変える用途にも使える。",
    example: "move draft.md posts\\published.md",
  },
  {
    slug: "del",
    name: "del",
    reading: "でる さくじょ",
    category: "file",
    shell: "cmd",
    summary: "ファイルを削除する。",
    description:
      "ゴミ箱を経由せず消えるので取り消せない。ワイルドカード（`*`）と組み合わせると一気に消えるので要注意。フォルダごと消すときは `rmdir /s`。",
    example: "del temp.log",
    exampleNote: "PowerShell では `rm` / `Remove-Item`。消す前に必ず対象を確認。",
    aliases: ["rm", "erase"],
  },
  {
    slug: "mkdir",
    name: "mkdir",
    reading: "めいくでぃれくとり ふぉるださくせい",
    category: "file",
    shell: "both",
    summary: "新しいフォルダを作る。",
    description:
      "プロジェクトの入れ物を用意するときの定番。`md` と略しても同じ。途中のフォルダもまとめて作れる。",
    example: "mkdir src\\components",
    aliases: ["md", "make directory"],
  },
  {
    slug: "ren",
    name: "ren",
    reading: "りねーむ なまえへんこう",
    category: "file",
    shell: "cmd",
    summary: "ファイル・フォルダの名前を変える。",
    description:
      "rename の略。移動はせず、名前だけを変更する。",
    example: "ren old-name.txt new-name.txt",
    aliases: ["rename"],
  },

  // ============ ネットワーク ============
  {
    slug: "ping",
    name: "ping",
    reading: "ぴんぐ つうしんかくにん",
    category: "network",
    shell: "both",
    summary: "相手のサーバーと通信できるか＆速さを確認する。",
    description:
      "「ネットにつながってる？」「このサーバー生きてる？」を確かめる基本ツール。応答時間（ms）が返ってくる。",
    example: "ping google.com",
    exampleNote: "Ctrl+C で停止。応答がなければ接続やサーバーに問題あり。",
  },
  {
    slug: "ipconfig",
    name: "ipconfig",
    reading: "あいぴーこんふぃぐ あいぴーあどれす",
    category: "network",
    shell: "cmd",
    summary: "自分のPCのIPアドレスなどネットワーク情報を表示する。",
    description:
      "自分のIPアドレスやゲートウェイを調べるときに。`ipconfig /flushdns` でDNSキャッシュを消すと、ドメインの不調が直ることがある。",
    example: "ipconfig /all",
  },
  {
    slug: "curl",
    name: "curl",
    reading: "かーる りくえすと えーぴーあいたたく",
    category: "network",
    shell: "both",
    summary: "URLにアクセスして、返ってくるデータを取得する。",
    description:
      "ブラウザを使わずにAPIを叩いたり、ページのHTMLを取ってきたりできる。Web開発で挙動確認に大活躍。Windows 10以降は標準搭載。",
    example: "curl https://api.github.com/users/github",
    exampleNote: "APIのレスポンス（JSON）がそのまま表示される。",
  },
  {
    slug: "netstat",
    name: "netstat",
    reading: "ねっとすたっと ぽーとかくにん",
    category: "network",
    shell: "both",
    summary: "今どのポートが使われているかを一覧表示する。",
    description:
      "「ポート3000が使用中で開発サーバーが起動しない」ときに犯人を探せる。`netstat -ano` でプロセスID（PID）付きで表示。",
    example: "netstat -ano | findstr :3000",
    exampleNote: "3000番を使っているPIDが分かる。→ taskkill で終了できる。",
  },

  // ============ システム ============
  {
    slug: "cls",
    name: "cls",
    reading: "くりあ がめんくりあ",
    category: "system",
    shell: "cmd",
    summary: "ターミナル画面の表示をきれいに消す。",
    description:
      "文字でごちゃごちゃした画面をリセットする。中身が消えるわけではなく、表示だけがクリアされる。PowerShell は `clear` / `cls`。",
    example: "cls",
    aliases: ["clear"],
  },
  {
    slug: "tasklist",
    name: "tasklist",
    reading: "たすくりすと ぷろせすいちらん",
    category: "system",
    shell: "both",
    summary: "今動いているプログラム（プロセス）を一覧表示する。",
    description:
      "どのアプリがメモリを食っているか、どのPIDで動いているかを確認できる。",
    example: "tasklist | findstr node",
    exampleNote: "node（Node.js）関連のプロセスだけ絞り込む。",
  },
  {
    slug: "taskkill",
    name: "taskkill",
    reading: "たすくきる ぷろせすしゅうりょう きる",
    category: "system",
    shell: "both",
    summary: "動いているプログラムを強制終了する。",
    description:
      "固まった開発サーバーやポートを占有したプロセスを止める。`/PID 番号 /F` で強制終了。名前指定なら `/IM`。",
    example: "taskkill /PID 12345 /F",
    exampleNote: "netstat で調べたPIDを止める定番の流れ。",
  },
  {
    slug: "echo",
    name: "echo",
    reading: "えこー ひょうじ もじれつ",
    category: "system",
    shell: "both",
    summary: "文字列をそのまま画面に表示する。",
    description:
      "確認や、ファイルへの書き込み（`>` と組み合わせ）に使う。環境変数の中身を見るのにも便利。",
    example: "echo Hello > memo.txt",
    exampleNote: "Hello という内容の memo.txt を作る。",
  },
  {
    slug: "where",
    name: "where",
    reading: "うぇあ ばしょ ぱすかくにん",
    category: "system",
    shell: "cmd",
    summary: "コマンドやプログラムが「どこにあるか」を探す。",
    description:
      "node や git がどのフォルダから実行されているかを確認できる。「コマンドが見つからない」トラブルの調査に。PowerShell は `Get-Command`。",
    example: "where node",
    aliases: ["which"],
  },

  // ============ 開発でよく使う ============
  {
    slug: "git-status",
    name: "git status",
    reading: "ぎっと すてーたす へんこうかくにん",
    category: "dev",
    shell: "both",
    summary: "Gitで、今どのファイルを変更したかを確認する。",
    description:
      "コミット前に「何を変えたか」「まだステージしてないもの」を一覧できる。開発中いちばん打つコマンドと言っても過言ではない。",
    example: "git status",
  },
  {
    slug: "npm-run",
    name: "npm run dev",
    reading: "えぬぴーえむらん かいはつさーばー きどう",
    category: "dev",
    shell: "both",
    summary: "package.json に書かれた開発用サーバーを起動する。",
    description:
      "フロント開発の入り口。`dev` はローカルで動作確認するための開発サーバー。`Ctrl+C` で停止。`npm run build` は本番用の書き出し。",
    example: "npm run dev",
    exampleNote: "起動後 http://localhost:3000 などをブラウザで開く。",
  },
  {
    slug: "code-dot",
    name: "code .",
    reading: "こーど どっと ぶいえすこーど ひらく",
    category: "dev",
    shell: "both",
    summary: "今いるフォルダをVS Codeで開く。",
    description:
      "ターミナルからエディタを一発で立ち上げる。`.`（ドット）は「今のフォルダ」を意味する。VS Codeの `code` コマンドが有効になっている必要がある。",
    example: "code .",
  },
  {
    slug: "npx",
    name: "npx",
    reading: "えぬぴーえっくす いちじじっこう",
    category: "dev",
    shell: "both",
    summary: "インストールせずにパッケージを一度だけ実行する。",
    description:
      "`create-next-app` などのひな形生成ツールを、PCに常駐させずサッと使える。使い捨てツールの実行にぴったり。",
    example: "npx create-next-app@latest my-app",
  },

  // ============ PowerShell ============
  {
    slug: "get-childitem",
    name: "Get-ChildItem",
    reading: "げっとちゃいるどあいてむ いちらん えるえす",
    category: "powershell",
    shell: "ps",
    summary: "フォルダの中身を一覧する（PowerShell版の dir/ls）。",
    description:
      "PowerShellの標準。別名 `ls` や `dir` でも呼べる。`-Recurse` で下の階層まで、`-Filter` で絞り込みできる。",
    example: "Get-ChildItem -Recurse -Filter *.tsx",
    exampleNote: ".tsx ファイルを下の階層まで全部さがす。",
    aliases: ["ls", "dir", "gci"],
  },
  {
    slug: "get-content",
    name: "Get-Content",
    reading: "げっとこんてんつ ちゅうみひょうじ きゃっと",
    category: "powershell",
    shell: "ps",
    summary: "ファイルの中身を表示する（PowerShell版の type/cat）。",
    description:
      "別名 `cat` / `gc`。`-Tail 20` で末尾20行だけ、`-TotalCount 10` で先頭10行だけ表示できる。ログ確認に便利。",
    example: "Get-Content app.log -Tail 20",
    aliases: ["cat", "gc"],
  },
  {
    slug: "select-string",
    name: "Select-String",
    reading: "せれくとすとりんぐ けんさく ぐれっぷ",
    category: "powershell",
    shell: "ps",
    summary: "ファイルの中から文字列を検索する（PowerShell版の grep）。",
    description:
      "「このキーワードがどのファイルの何行目にあるか」を探せる。コードの中から関数名や設定値を追うときに強力。",
    example: "Select-String -Path src\\*.ts -Pattern \"useState\"",
    aliases: ["grep", "sls"],
  },
  {
    slug: "get-command",
    name: "Get-Command",
    reading: "げっとこまんど ばしょ うぇあ",
    category: "powershell",
    shell: "ps",
    summary: "コマンドの実体や場所を調べる（PowerShell版の where/which）。",
    description:
      "`(Get-Command node).Source` で node の実行ファイルの場所が分かる。パス周りのトラブル調査に。",
    example: "Get-Command node",
    aliases: ["gcm", "which"],
  },
];
