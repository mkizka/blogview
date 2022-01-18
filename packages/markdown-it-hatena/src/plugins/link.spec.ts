import cheerio from "cheerio";

import { linkPlugin } from "./link";
import { createMarkdownIt } from "../utils/md";

const md = createMarkdownIt().use(linkPlugin);

test("埋め込み記法[{url}:embed]の対応", () => {
  const src = "[https://github.com:embed]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(1);
});

test("複数記法の組み合わせの対応", () => {
  const src = "[https://github.com:cite:embed]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(1);
  expect($("cite").length).toBe(1);
});

test("対応していない記法はそのまま出力する", () => {
  const src = "[https://github.com:foo]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(0);
  expect($("p").text()).toBe(src);
});

test("そのまま出力するときはエスケープする", () => {
  const src = "foo & bar";
  const rendered = md.render(src);
  expect(rendered).toBe("<p>foo &amp; bar</p>\n");
});
