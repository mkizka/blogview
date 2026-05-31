import { test, expect } from "vitest";

import { titlePlugin } from "./title";
import { createMarkdownIt } from "../utils/md";

const md = createMarkdownIt().use(titlePlugin);

const title = "title: タイトル";
const date = "date: 2021-12-30T15:32:03.000Z";
const categories = "categories: [カテゴリ1, カテゴリ2]";

test("タイトルを描画", () => {
  const rendered = md.render(`---\n${title}\n---`);
  expect(rendered).toMatchSnapshot();
});

test("日付を描画", () => {
  const rendered = md.render(`---\n${date}\n---`);
  expect(rendered).toMatchSnapshot();
});

test("カテゴリを描画", () => {
  const rendered = md.render(`---\n${categories}\n---`);
  expect(rendered).toMatchSnapshot();
});

test("ヘッダ全て描画", () => {
  const rendered = md.render(`---\n${title}\n${date}\n${categories}\n---`);
  expect(rendered).toMatchSnapshot();
});

// VSCode 1.122.1 以降は extendMarkdownIt の後に renderer.rules.front_matter を後勝ちで
// 上書きする。token type を独自名にしていないと文字列 meta が VSCode 側 renderer に
// 流れ込み yaml.parse(undefined) で「Cannot read properties of undefined」が出る。
test("VSCode 組み込み front_matter プラグインと共存できる", () => {
  const vscodeLikeMd = createMarkdownIt().use(titlePlugin);
  vscodeLikeMd.renderer.rules.front_matter = (tokens, idx) => {
    const meta = tokens[idx].meta as unknown as { content: string };
    return `<vscode>${meta.content.length}</vscode>`;
  };
  const rendered = vscodeLikeMd.render(`---\n${title}\n---`);
  expect(rendered).toContain('<header class="entry-header">');
  expect(rendered).not.toContain("<vscode>");
});
