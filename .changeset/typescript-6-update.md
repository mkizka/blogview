---
"markdown-it-hatena": patch
"blogview": patch
---

TypeScript 5 → 6、@types/node 22 → 25 に更新。`contents.ts` で `require()` していたプラグイン読み込みを `import` 文に書き換え (TypeScript 6 ではデフォルトで `require` 型が利用できないため)。
