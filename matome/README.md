# まとめスライド

動画ごとの「まとめ」PDFスライド。

| フォルダ | 内容 |
| --- | --- |
| `9-phrases/` | 日常英会話フレーズ 9選（`9-phrases-matome.pdf`） |

## PDF の作り直し方

スライドの中身は各フォルダの `slides.html` にあります。文章を直したら、次のコマンドで PDF を作り直します。

```sh
npm install                      # 初回のみ
npx playwright install chromium  # 初回のみ
npm run matome -- matome/9-phrases/slides.html matome/9-phrases/9-phrases-matome.pdf
```

フォントは `fonts/` に同梱しています（Nunito と Zen Maru Gothic、SIL Open Font License）。インターネット接続なしでビルドできます。
