# blogview

Markdown のプレビューと Live Reload 対応 CLI

[zenn-cli](https://github.com/zenn-dev/zenn-editor)の実装をとても参考にしています

## インストール

```
npm install @mkizka/blogview
```

## 使い方

`entry`ディレクトリ下に Markdown ファイルを配置して、以下のコマンドを実行

```
$ blogview
```

現在のディレクトリに`blogview.json`というファイルを置くと、プレビューに使用する CSS を指定出来ます

```json
{
  "styles": ["style.css"]
}
```
