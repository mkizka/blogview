# blogview
MarkdownのプレビューとLive Reload対応CLI

## インストール
```
npm install @mkizka/blogview
```

## 使い方
`entry`ディレクトリ下にMarkdownファイルを配置して、以下のコマンドを実行

```
$ blogview
```

現在のディレクトリに`blogview.json`というファイルを置くと、プレビューに使用するCSSを指定出来ます

```json
// blogview.json
{
  "styles": ["style.css"]
}
```
