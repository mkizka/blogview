---
"markdown-it-hatena": patch
"blogview": patch
---

依存ライブラリ markdown-it を 12 から 14 系に更新。markdown-it 14 では linkify が `[url:embed]` 内の URL を先にトークン分割するため、linkPlugin の ruler2 で全トークンを単一の `text_with_hatena_link` トークンに置き換えるよう修正。
