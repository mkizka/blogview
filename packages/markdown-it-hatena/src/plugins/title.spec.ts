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
