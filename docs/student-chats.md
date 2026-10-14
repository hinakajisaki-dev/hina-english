# 生徒ごとのチャット

先生は、生徒1人に1つ、Claude のチャットを持つ（「〇〇さん」）. そのチャットで、その生徒だけの内容（授業メモ・単語・発音・文法の問題・日記のテーマ）を作って、アプリに直接入れる. 先生ページを開かなくていい.

生徒がこのチャットを見たり、書きこんだりすることはない. 1つのチャットは、その生徒の内容だけをさわる（ほかの生徒の内容は見ない・変えない）.

## はじめに（先生が1回だけ）

1. パスワード生成ツールなどで、長い文字列（40文字以上）を作る. チャットには貼らない
2. Cloudflare の Worker（`hina-coaching`）→「Settings」→「Variables and Secrets」→「Add」. 種類は「Secret」、名前は `TEACHER_API_TOKEN`、値は 1 の文字列. 保存（Deploy）
3. Claude の環境の設定（セッションのタイトルのところの環境メニュー →「Edit」）
   - 環境変数に `HINA_TEACHER_TOKEN=`（1 の文字列）を足す
   - ネットワークの「Allowed domains」に `hina-coaching.hinakajisaki.workers.dev` を足す
4. 設定のあとに作ったチャットから使える

つながらないときにチャットに出るメッセージ：

| メッセージ | 直すところ |
| --- | --- |
| HINA_TEACHER_TOKEN がありません | 3 の環境変数. 直したら新しいチャットを作る |
| アプリにつながりません | 3 のネットワーク（Allowed domains）. 直したら新しいチャットを作る |
| アプリ側に TEACHER_API_TOKEN がありません | 2. Build のほうではなく、Settings の Variables and Secrets に入れて Deploy |
| アプリ側の TEACHER_API_TOKEN が短すぎます | 2 の値（32文字以上） |
| トークンがちがいます | 2 と 3 が同じ文字列か（前後のスペースや改行は気にしなくていい） |

文字列を知られたときは、2 と 3 の値を新しいものに変える. `TEACHER_API_TOKEN` を消すと、チャットからはアプリを変えられなくなる（先生ページはそのまま使える）.

## チャットがすること

アプリを変えるのは `lessons/scripts/teacher.mjs` だけ. アプリのコードは変えない（必要なら、先生に「アプリのチャットで頼んでください」と伝える）. git の commit や push もしない.

```sh
cd lessons
node scripts/teacher.mjs show なおみ                     # いま入っているもの（番号つき）
node scripts/teacher.mjs add なおみ vocab --week 2 words.txt
node scripts/teacher.mjs note なおみ --day 2026-10-12 --title "When I 〜" memo.md
node scripts/teacher.mjs publish なおみ 5
```

| コマンド | すること |
| --- | --- |
| `students` | 生徒の名前の一覧 |
| `show 名前` | その生徒の単語（Week ごと）・発音・文法・日記のテーマと授業メモ. `[12]` が番号 |
| `add 名前 vocab --week 2 ファイル` | 単語を足す. 1行に `単語 \| 意味 \| 例文（なくてもOK）` |
| `add 名前 pron ファイル` | 発音の文. `読む文 \| コツ（なくてもOK）` |
| `add 名前 grammar ファイル` | 文法の問題. `問題（空欄は ___ ） \| 答え \| 選択肢を / で区切る（なくてもOK） \| 解説（なくてもOK）` |
| `add 名前 topic ファイル` | 日記のテーマ. 1行に1つ |
| `edit-item 名前 番号 "新しい1行"` | 1つ直す |
| `delete-item 名前 番号` | 1つ消す |
| `note 名前 --day 日付 --title タイトル ファイル` | 授業メモを下書きで入れる（`--publish` をつけると公開） |
| `note-show 名前 番号` | 授業メモの本文を見る |
| `note-update 名前 番号 [--day 日付] [--title タイトル] [ファイル]` | 授業メモを直す（公開中なら、すぐ生徒の画面も変わる） |
| `publish 名前 番号` / `unpublish 名前 番号` | 生徒に見せる / 見せるのをやめる |
| `delete-note 名前 番号` | 授業メモを消す |

ファイルを `-` にすると、標準入力から読む.

## 決まり

- 最初に `show` で、いま入っているものを確かめる
- 入れる前に、入れる内容を先生に見せて OK をもらう. 公開（`publish`、`--publish`）と削除は、先生が「公開して」「消して」と言ったときだけ
- 単語は Week を先生に確かめる（全員共通の単語帳のあとに、その生徒の単語として加わる）
- 授業メモの整理のルールと本文の書き方は `docs/lesson-notes.md`
- いまは生徒の画面に授業メモを出していない（`lessons/public/course.js` の `NOTES_FOR_STUDENTS`）. 公開しても生徒にはまだ見えないことを、先生に伝える
- 入れたあとは、何を入れたか（番号）を先生に短く伝える
