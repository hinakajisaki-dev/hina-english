# まとめスライド

動画ごとの「まとめ」PDFスライド。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf` / 編集できる `9-phrases-matome.pptx`）。スライド11枚＋練習問題45問と解答 |
| `study-guide/` | 毎日25分の英語の勉強メニュー（`study-guide.pdf`）。A4 2枚。単語・文法・モデリングのやり方と、中学文法30日の単元リスト。サロンLPと同じ色とフォント |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html`（study-guide は `guide.html`）にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx
npm run matome -- matome/study-guide/guide.html matome/study-guide/study-guide.pdf
```

ページの大きさは各 HTML の `@page` で決まります（スライドは 1280×720、study-guide は A4）。

`.pptx` はレイアウトを HTML からそのまま写した編集可能なスライドです。Google ドライブにアップロードすると Google スライドに変換されます（英語は Arial、日本語は Noto Sans JP を指定）。

フォントは `fonts/` に同梱しています（Noto Sans JP、Arial と同じ字幅の Liberation Sans、study-guide 用の DM Sans と Caveat。どれも SIL Open Font License）。インターネット接続なしでビルドできます。
