---
"blogview": patch
---

サーバー側依存をメジャー更新。Express 4 → 5、connect-history-api-fallback 1 → 2、chokidar 3 → 5、supertest 6 → 7。

- Express 5 の path-to-regexp 8 で `/*` が無効になったため、`router.get("/*", ...)` を `"/*splat"` に変更し `req.params.splat` から取得する形に修正
- chokidar 4+ が glob を受け付けなくなったため、ファイル監視は `entry/` ディレクトリを対象とし `.md` のみ追跡する `ignored` 関数を指定するよう変更
- @types/connect-history-api-fallback が依存する @types/express-serve-static-core を v5 に統一するため、pnpm-workspace.yaml の override を v5 系に更新
