import * as MarkdownIt from "markdown-it";
import cheerio from "cheerio";
import * as markdownItHatena from "./index";

const md = new MarkdownIt().use(markdownItHatena);

test("test", () => {
  const result = md.render("[https://twitter.com:embed]");
  const $ = cheerio.load(result);
  expect($("iframe").length).toBe(1);
});
