import path from "path";

import { dirname, loadJson } from "./helper.js";

const helpText = `
Usage: blogview [options]

Options:
  -h, --help    ヘルプを表示
  -v, --version バージョン名を表示
  -c, --config  設定ファイルのパスを指定(デフォルト: blogview.json)
  -e, --entry   Markdownファイルのディレクトリ指定(デフォルト: entry)
  --style       CSSファイルのパスを複数指定(デフォルト: [])
  --no-twitter  ツイート埋め込みを変換しない
  --no-youtube  YouTube埋め込みを変換しない

Details: https://github.com/mkizka/blogview#readme
`.trim();

export function showHelp() {
  console.log(helpText);
}

export function showVersion() {
  const pkg = loadJson(path.join(dirname, "..", "..", "..", "package.json"))!;
  console.log(`v${pkg.version}`);
}
