# スライド

動画ごとのスライド（復習用の「まとめ」と、動画の中で映すスライド）。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf` / 編集できる `9-phrases-matome.pptx`）。スライド11枚＋練習問題45問と解答 |
| `lr-pronunciation/` | 発音解説動画「L と R の発音」（`lr-pronunciation-slides.pdf` / 編集できる `lr-pronunciation-slides.pptx`）。動画で映すスライド21枚。舌の位置の断面図（L・ら・R）と正面図、ペア単語のイラストつき。台本は `script.md`、スライド1枚ごとのセリフは `slide-script.md` |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html` にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx

# L と R の発音の動画スライド
npm run matome -- matome/lr-pronunciation/slides.html matome/lr-pronunciation/lr-pronunciation-slides.pdf
npm run matome:pptx -- matome/lr-pronunciation/slides.html matome/lr-pronunciation/lr-pronunciation-slides.pptx
```

`lr-pronunciation/` は、冠詞の動画スライド（ブランチ `claude/amazing-goodall-3xbl6t`）と共通のデザイン `hina.css` を読み込んでいます（サロンと同じ色・カード・フォント）。L はオレンジ、R は青、日本語の「ら」はグレーで色分けしています。

イラストは `illust/*.svg` が元データです。SVG を直したら PNG（`img/`）を書き出し直してから、PDF と PPTX を作り直します。

```sh
npm run illust -- matome/illust matome/img
```

`.pptx` はレイアウトを HTML からそのまま写した編集可能なスライドです。Google ドライブにアップロードすると Google スライドに変換されます（`9-phrases/` は英語 Arial・日本語 Noto Sans JP、`lr-pronunciation/` は英語 DM Sans・日本語 Noto Sans JP を指定。どれも Google スライドで使えるフォントです）。

フォントは `fonts/` に同梱しています（Noto Sans JP、Arial と同じ字幅の Liberation Sans、DM Sans、Caveat。すべて SIL Open Font License）。インターネット接続なしでビルドできます。
