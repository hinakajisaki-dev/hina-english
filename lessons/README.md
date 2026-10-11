# Hina English レッスンアプリ

個人レッスンの生徒が使うアプリです。生徒ごとに、先生が中身を入れます。

| 生徒の画面 | 内容 |
| --- | --- |
| 単語カード | タップでめくる。「覚えた」「もう一回」で仕分け |
| 今日のフレーズ | 毎日 1 つ、ホームに表示。音声つき |
| 発音 | お手本を聞いて、マイクに向かって読む。聞き取れなかった単語が赤くなり、点数が出る |
| 文法 | 選択肢か、答えを入力する問題。解説つき |
| 日記 | 英語で書くと、AI が添削（直したところの説明は日本語）。先生のコメントも表示 |

先生ページでは、生徒の追加、教材の追加・編集、日記と AI 添削の確認、コメントの記入ができます。画面はスマホにもパソコンにも合わせてあります。

- 生徒：`https://（アプリのURL）/` を開いて、レッスンコードを入れる
- 先生：`https://（アプリのURL）/teacher` を開いて、パスワードを入れる

## 料金

| 項目 | 月額 |
| --- | --- |
| Cloudflare（アプリの置き場所とデータベース） | ¥0（無料プラン） |
| AI 添削（Claude Opus 5.5） | 生徒 6 人が毎日 1 回で、¥1,200 くらい |

AI は Anthropic に前払いでチャージして使います。月の上限も決められるので、使いすぎの心配はありません。アプリ側でも、生徒 1 人が 1 日に添削できるのは 3 回までにしてあります（`wrangler.jsonc` の `DAILY_AI_LIMIT`）。

## 公開する手順（最初の 1 回だけ）

Cloudflare は、GitHub の `main` ブランチに入ったものを公開します。先にこの変更を `main` にマージしてください。

### 1. Anthropic の API キーを作る

1. [console.anthropic.com](https://console.anthropic.com) にログイン
2. 「Billing」でクレジットを購入（まずは $10 ほどで十分です）
3. 「Limits」で、月の使用上限を設定（例：$15）
4. 「API Keys」→「Create Key」でキーを作り、コピーしておく（一度しか表示されません）

### 2. Cloudflare でアプリを作る

1. [dash.cloudflare.com](https://dash.cloudflare.com) で無料アカウントを作る
2. 「Workers & Pages」→「Create application」→「Import a repository」
3. GitHub をつないで、`hinakajisaki-dev/hina-english` を選ぶ
4. 設定をこうする
   - プロジェクト名：`hina-lessons`（`wrangler.jsonc` の `name` と同じにする）
   - ルートディレクトリ（Root directory / Path）：`lessons`
   - ビルドコマンド：空のまま
   - デプロイコマンド：`npx wrangler deploy`（最初から入っています）
5. 「Save and Deploy」。初回のデプロイで、データベース（D1 の `hina-lessons`）も自動で作られます

### 3. パスワードと API キーを入れる

1. できた Worker（`hina-lessons`）を開いて「Settings」→「Variables and Secrets」→「Add」
2. 種類は「Secret」にして、次の 2 つを追加
   - `TEACHER_PASSWORD`：先生ページのパスワード（長めに。生徒には教えない）
   - `ANTHROPIC_API_KEY`：手順 1 でコピーしたキー
3. 保存（Deploy）

### 4. 開いてみる

`https://hina-lessons.（あなたのアカウント名）.workers.dev/teacher` を開いて、パスワードでログインします。URL は Worker のページに表示されています。

Cloudflare の画面のボタン名は、変わることがあります。見つからないときは Claude に聞いてください。

## 生徒を追加する

1. 先生ページの「生徒を追加」に名前を入れる
2. 「招待メッセージをコピー」を押して、LINE などで生徒に送る（URL とレッスンコードが入っています）
3. 生徒は URL を開いて、コードを入れるだけ。一度入れば、次からは自動で入れます

iPhone は Safari の共有ボタン →「ホーム画面に追加」で、アプリのようにアイコンから開けます。

コードを知られてしまったときは、生徒の「設定・コード」で「新しいコードにする」を押してください。古いコードは使えなくなります。

## 教材を入れる

生徒のページの各タブで、1 行に 1 つずつ入れます。区切りは `|` です。スプレッドシートの列をそのままコピーして貼りつけても大丈夫です。

| タブ | 1 行の書き方 | 例 |
| --- | --- | --- |
| 単語 | 単語 \| 意味 \| 例文 | `borrow \| 借りる \| Can I borrow your pen?` |
| フレーズ | フレーズ \| 意味 \| メモ | `It slipped my mind. \| うっかり忘れてた` |
| 発音 | 読む文 \| コツ | `Three free throws. \| th は舌を軽くかむ` |
| 文法 | 問題 \| 答え \| 選択肢 \| 解説 | `I ___ to Osaka. \| went \| go / went / gone \| 過去形` |
| 日記のテーマ | テーマ | `週末にしたこと` |

- 例文・メモ・コツ・選択肢・解説は、なくても大丈夫です
- 文法の問題の空欄は `___`（アンダーバー 2 つ以上）。選択肢は `/` で区切ります。選択肢がないと、生徒が答えを入力する問題になります
- 「今日のフレーズ」と「今日のテーマ」は、毎日リストの中から順番に変わります

## AI 添削について

- 先生ページの「設定・コード」にある「AI へのメモ」は、添削のときに AI に伝わります（例：「英検 3 級くらい。過去形を練習中」）。生徒には見えません
- 使う AI は `wrangler.jsonc` の `AI_MODEL` です。いまは一番かしこい `claude-opus-5-5`。安くしたいときは `claude-sonnet-5-5`（約半額）や `claude-haiku-5-5`（約 40 分の 1）に変えられます
- 1 日の上限を超えたり、AI がエラーになったりしても、日記は保存されます。先生ページでは読めます
- 日記の文章は、添削のために Anthropic（米国）に送られます。生徒にも伝えておきましょう。データは Cloudflare のデータベースに保存されます

## 発音チェックについて

ブラウザに入っている音声認識を使うので、無料です。iPhone は Safari、Android とパソコンは Chrome で使えます。動かないときは、ブラウザのマイクの許可と、iPhone の「音声入力」がオンになっているかを確認してください。使えないブラウザでは、お手本の音声だけが使えます。

## うまくいかないとき

| こんなとき | 確認すること |
| --- | --- |
| 先生ページで「TEACHER_PASSWORD がまだ設定されていません」 | 手順 3 のシークレットが入っているか |
| 生徒の添削で「AI の設定に問題があります」 | `ANTHROPIC_API_KEY` が正しいか、Anthropic のクレジットが残っているか |
| デプロイでデータベースのエラー | Cloudflare の「Storage & Databases」→「D1」で `hina-lessons` を作り、その ID を `wrangler.jsonc` の `d1_databases` に `"database_id"` として書く |

## ファイル

| ファイル | 内容 |
| --- | --- |
| `public/index.html`、`student.js`、`student.css` | 生徒の画面 |
| `public/teacher.html`、`teacher.js`、`teacher.css` | 先生ページ |
| `public/common.js`、`app.css` | 両方で使う部品と色 |
| `src/worker.js` | サーバー（ログイン、教材、日記） |
| `src/ai.js` | AI 添削 |
| `src/db.js` | データベースの表 |
| `wrangler.jsonc` | Cloudflare の設定 |

## 手元で動かす（開発用）

```sh
cd lessons
npm install
printf 'TEACHER_PASSWORD=test\nANTHROPIC_API_KEY=sk-ant-...\n' > .dev.vars
npm run dev   # http://localhost:8787
```

データは `.wrangler/` の中のローカルのデータベースに入ります（本番とは別）。
