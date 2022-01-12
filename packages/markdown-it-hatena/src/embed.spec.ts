import * as MarkdownIt from "markdown-it";
import cheerio from "cheerio";
import { embedPlugin } from "./embed";

const md = new MarkdownIt().use(embedPlugin);

test("埋め込み記法(:embed)の対応", () => {
  const src = "[https://github.com:embed]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  console.log(rendered);
  expect($("iframe").length).toBe(1);
});

test("複数記法の組み合わせの対応", () => {
  const src = "[https://github.com:cite:embed]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(1);
});

test("対応していない記法はそのまま出力する", () => {
  const src = "[https://github.com:foo]";
  const rendered = md.render(src);
  const $ = cheerio.load(rendered);
  expect($("iframe").length).toBe(0);
  expect($("p").text()).toBe(src);
});
