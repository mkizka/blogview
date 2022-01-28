import { test, expect } from "vitest";
import cheerio from "cheerio";

import { linkPlugin } from "./link";
import { createMarkdownIt } from "../utils/md";

const md = createMarkdownIt();

test("埋め込み記法[{url}:embed]の対応", () => {
  const src = "[https://github.com:embed]";
  const rendered = md.use(linkPlugin).render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(1);
  expect($("iframe").attr("src")).toBe(
    "https://hatenablog-parts.com/embed?url=https%3A%2F%2Fgithub.com"
  );
});

test("Twitter埋め込みの対応", () => {
  const src = "[https://twitter.com/screen_name/status/12345:embed]";
  const rendered = md.use(linkPlugin, { twitter: true }).render(src);
  const $ = cheerio.load(rendered);
  expect($("blockquote").attr("class")).toBe("twitter-tweet");
});

test("設定がfalseのときはTwitter埋め込みしない", () => {
  const src = "[https://twitter.com/screen_name/status/12345:embed]";
  const rendered = md.use(linkPlugin, { twitter: false }).render(src);
  const $ = cheerio.load(rendered);
  expect($("blockquote").attr("class")).not.toBe("twitter-tweet");
});

test("YouTube埋め込みの対応", () => {
  const src = "[https://www.youtube.com/watch?v=12345:embed]";
  const rendered = md.use(linkPlugin, { youtube: true }).render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").attr("src")).toBe("https://www.youtube.com/embed/12345");
});

test("設定がfalseのときはYouTube埋め込みしない", () => {
  const src = "[https://www.youtube.com/watch?v=12345:embed]";
  const rendered = md.use(linkPlugin, { youtube: false }).render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").attr("src")).not.toBe(
    "https://www.youtube.com/embed/12345"
  );
});

test("複数記法の組み合わせの対応", () => {
  const src = "[https://github.com:cite:embed]";
  const rendered = md.use(linkPlugin).render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(1);
  expect($("cite").length).toBe(1);
});

test("対応していない記法はそのまま出力する", () => {
  const src = "[https://github.com:foo]";
  const rendered = md.use(linkPlugin).render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(0);
  expect($("p").text()).toBe(src);
});

test("そのまま出力するときはエスケープする", () => {
  const src = "foo & bar";
  const rendered = md.use(linkPlugin).render(src);
  expect(rendered).toBe("<p>foo &amp; bar</p>\n");
});
