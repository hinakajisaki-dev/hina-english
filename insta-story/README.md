# インスタストーリー

ストーリー用の縦長画像（1080×1920）。

| フォルダ | 内容 |
| --- | --- |
| `techlab-interview/` | 株式会社Tech Lab 社員インタビュー（採用統括部長 篠原 里菜さん）。`01.png`〜`06.png` の6枚。元記事は [Green](https://www.green-japan.com/company/11060/interview) |

上から約250px（アカウント名などが重なる）と下から約330px（返信欄が重なる）には文字を置いていません。6枚目の「↓ 求人はリンクから」の下に、Instagram のリンクスタンプを置いてください。

## 画像の作り直し方

文章は各フォルダの `story.html` にあります。直したら次のコマンドで PNG を作り直します。

```sh
npm install   # 初回のみ
npm run story -- insta-story/techlab-interview/story.html
```

文字が返信欄の位置まではみ出すと、ビルドはエラーで止まります。

1枚目の丸の中はマイクのアイコンです。本人の写真を `photo.jpg` という名前で `story.html` と同じフォルダに置いて作り直すと、写真に差し替わります。

フォントは同梱しています（日本語は `matome/fonts/` の Noto Sans JP、英数字は `fonts/` の Space Grotesk。どちらも SIL Open Font License）。
