# Blogview

VSCode ではてなブログ記事を書くための Markdown プレビュー拡張です。

一部のはてな記法がプレビューに反映されます。

![](https://cdn-ak.f.st-hatena.com/images/fotolife/m/mkizka/20220118/20220118161117.png)

## 使い方

拡張機能をインストールするだけで動作します。

## 対応している記法

markdown-it-hatena の README を参照してください。

https://github.com/mkizka/blogview/tree/main/packages/markdown-it-hatena#readme

## テンプレート

この拡張機能を含めた、VSCode ではてなブログ記事を書くためのテンプレートを公開しています。

https://github.com/mkizka/blogview-template#readme

## プレビューに「このドキュメントで一部のコンテンツが無効になっています」と表示される場合

埋め込み(`:embed`)記法などを使用する場合に一部プレビューに表示されない要素があります。

1. プレビューに表示される「このドキュメントで一部のコンテンツが無効になっています」をクリック
2. セキュリティ設定を「無効にする」

とすると表示されます。セキュリティ設定については[公式ドキュメント](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview-security)も参照してください。
