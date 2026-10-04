# スライド

動画ごとのスライド（復習用の「まとめ」と、動画の中で映すスライド）。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf` / 編集できる `9-phrases-matome.pptx`）。スライド11枚＋練習問題45問と解答 |
| `a-the/` | モヤモヤ文法スッキリ解説① a と the の違い（`a-the-slides.pdf` / 編集できる `a-the-slides.pptx`）。台本に沿って動画で映すスライド46枚。クイズは問題ページと答えページが交互、説明は1枚ずつ項目が増えるページあり |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html` にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx

# a と the の動画スライド
npm run matome -- matome/a-the/slides.html matome/a-the/a-the-slides.pdf
npm run matome:pptx -- matome/a-the/slides.html matome/a-the/a-the-slides.pptx
```

`.pptx` はレイアウトを HTML からそのまま写した編集可能なスライドです。Google ドライブにアップロードすると Google スライドに変換されます（英語は Arial、日本語は Noto Sans JP を指定）。

フォントは `fonts/` に同梱しています（Noto Sans JP と、Arial と同じ字幅の Liberation Sans。どちらも SIL Open Font License）。インターネット接続なしでビルドできます。
