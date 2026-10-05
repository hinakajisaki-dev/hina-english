# インスタストーリー

ストーリー用の縦長画像（1080×1920）。

| フォルダ | 内容 |
| --- | --- |
| `techlab-interview/` | 株式会社Tech Lab 社員インタビュー（採用統括部長 篠原 里菜さん）。`01.png`〜`04.png` の4枚（表紙／入社理由／エンジニアのみなさんへ／こんな方と働きたい）。元記事は [Green](https://www.green-japan.com/company/11060/interview) |
| `techlab-casual/` | 同じインタビューのカジュアル版（エンジニア採用向け）。`01.png`〜`04.png` の4枚（はじめまして／ぶっちゃけ質問①②／カジュアル面談へ）。方眼の背景、テープで貼った写真、チャット風のQ&A、手書き風のメモ。写真は Green の Tech Lab ページのもの（スライドの丸い印は消してあります） |

上から約250px（アカウント名などが重なる）と下から約330px（返信欄が重なる）には文字を置いていません。どちらも4枚目の下向きの矢印の下に、Instagram のリンクスタンプを置いてください。

## 画像の作り直し方

文章は各フォルダの `story.html` にあります。直したら次のコマンドで PNG を作り直します。

```sh
npm install   # 初回のみ
npm run story -- insta-story/techlab-interview/story.html
npm run story -- insta-story/techlab-casual/story.html
```

文字が返信欄の位置まではみ出すと、ビルドはエラーで止まります。

`techlab-interview/` の写真は `photo.jpg`（Green のインタビュー記事の写真）を、1枚目と、2・4枚目の丸いアイコンで切り抜き位置を変えて使っています。差し替えるときは同じ名前で上書きして作り直してください。

`techlab-interview/` のデザインは Green の記事ページに合わせています（生成りの背景、チャコールの文字、写真のテーブルから取った木目色のアクセント、字間を広めにとった細めの書体）。

フォントは同梱しています（`fonts/` の Noto Sans JP 400・500、Lato、Zen Maru Gothic、Yomogi と、`matome/fonts/` の Noto Sans JP 700。どれも SIL Open Font License）。絵文字はパソコンに入っている Noto Color Emoji で描かれます。
