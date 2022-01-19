# markdown-it-hatena

はてな記法を変換する Markdown-it プラグイン

## インストール

```
npm install markdown-it-hatena
```

## 対応状況

- `:embed`
- `:contents`
- `:cite`

## 実装について

- はてなブログの Markdown 記法で使えるもののみ変換する
- API を叩くなどの必要があるものは変換しない ... `:title`など
- 変換しない記法はそのまま出力する
