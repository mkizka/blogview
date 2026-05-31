---
"blogview": patch
---

クライアント側を React 19、react-router-dom 7、react-helmet-async 3 に更新。`react-dom` の `render` API は `react-dom/client` の `createRoot` に置き換え、削除された型 `React.VFC` を `React.FC` に変更。react-router-dom 7 が `moduleResolution: bundler` 以上を要求するため tsconfig.client.json を更新。
