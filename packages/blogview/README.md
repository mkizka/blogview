# blogview

Markdown のプレビューと Live Reload 対応 CLI

[zenn-cli](https://github.com/zenn-dev/zenn-editor)の実装をとても参考にしています

## インストール

```
npm i -g blogview
```

## 使い方

`entry`ディレクトリ下に Markdown ファイルを配置して、以下のコマンドを実行

```
$ blogview
```

## 設定ファイルの例

blogview.json というファイルに設定を記述出来ます。設定はコマンドライン引数で上書き出来ます。

```jsonc
{
  // Markdownファイルを配置するディレクトリを指定 CLIでは -e, --entry
  "entry": "entry",
  // プレビューに適用するCSSファイルを指定　CLIでは --style
  "styles": ["style.css"],
  // プレビューでツイート埋め込みを変換するかどうか CLIでは --no-twitter
  "twitter": true,
  // プレビューでYouTube埋め込みを変換するかどうか CLIでは --no-twitter
  "youtube": false
}
```

設定ファイルのパスはコマンドライン引数で指定することも出来ます。

```
$ blogview -c blogview.json
```
