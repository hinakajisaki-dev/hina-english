# YouTube ライブのスライド

YouTube の英語ライブで使う「瞬間英作文」のスライド。デザインはサロンの LP（`salon/`）に合わせています。

| フォルダ | 内容 |
| --- | --- |
| `daily-phrases-part2/` | 塊で覚える日常英会話（フレーズ20個・40問）。`daily-phrases-part2.pptx`（Google スライド用）と `daily-phrases-part2.pdf`（確認用）、全46枚 |

## スライドの流れ

1. タイトル（真ん中にタイトルだけ）
2. ラウンドごとに、表紙 → フレーズごとに「問題」→「こたえ」の2枚
3. おわりのあいさつ

「問題」と「こたえ」は上半分（フレーズ・意味・例文・ポイント）が同じで、下のカードだけが変わります。めくると答えが出るように見えます。

## 中身の直し方

スライドの中身は各フォルダの `phrases.md` に書きます。直したら、次のコマンドでスライドを作り直します。

```sh
npm install   # 初回のみ
npm run live -- live/daily-phrases-part2
```

`slides.html`、`.pdf`、`.pptx` が作り直されます。`.pptx` を Google ドライブにアップロードすると、Google スライドに変換されます（英語は DM Sans、日本語は Noto Sans JP、手書き風の英字は Caveat。どれも Google スライドに入っているフォントです）。

`phrases.md` の書き方：

```md
## ROUND 1 気持ち・予定を話す

### I'm thinking of 〇〇ing
後ろの形: ~ing
意味: 〜しようかなと思ってる
例文: [I'm thinking of] moving. | 引っ越そうかなと思ってる
ポイント: of の後ろは「~ing」。まだ迷い中の「〜しようかな」に！
かんたん: 新しいスマホ買おうかなと思ってる → [I'm thinking of] buying a new phone.
中級: 来年留学しようかなと思ってる → [I'm thinking of] studying abroad next year.
```

- `## ROUND 番号 タイトル` でラウンドを、`### フレーズ` でフレーズを始めます
- フレーズの `〇〇` と、英文の `[ ]` で囲んだところはオレンジになります
- 例文は「英語 | 日本語」、問題は「日本語 → 英語」の順に書きます
- 1行に収まらないところは `<br>` で改行します。収まらないまま作ろうとすると、どのスライドのどの文かを表示して止まります（`.pptx` では自動の折り返しを再現できないため）

## 新しい回を作るとき

`daily-phrases-part2/` をフォルダごとコピーして名前を変え、`phrases.md` を書き換えて `npm run live -- live/新しいフォルダ名` を実行します。ファイル名はフォルダ名になります。

フォントは `matome/fonts/` のものを使います。
