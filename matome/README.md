# まとめスライド

動画ごとの「まとめ」PDFスライド。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf` / 編集できる `9-phrases-matome.pptx`） |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html` にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
npm run matome:pptx -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pptx
```

`.pptx` はレイアウトを HTML からそのまま写した編集可能なスライドです。Google ドライブにアップロードすると Google スライドに変換されます（フォントは Google Fonts の Nunito / Zen Maru Gothic を指定）。

フォントは `fonts/` に同梱しています（Nunito と Zen Maru Gothic、SIL Open Font License）。インターネット接続なしでビルドできます。
