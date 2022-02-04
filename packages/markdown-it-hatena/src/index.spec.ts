import fs from "fs";
import path from "path";
import { expect, test } from "vitest";
import markdownItAnchor from "markdown-it-anchor";

import { markdownItHatena } from "./index";
import { createMarkdownIt } from "./utils/md";

test("変換のスナップショット", () => {
  const entry = fs.readFileSync(
    path.join(__dirname, "../fixtures/hatena.md"),
    "utf-8"
  );
  const html = createMarkdownIt().use(markdownItHatena).render(entry);
  expect(html).toMatchSnapshot();
});

test("はてな記法以外に影響を与えない(anchor除く)", () => {
  const entry = fs.readFileSync(
    path.join(__dirname, "../fixtures/no-hatena.md"),
    "utf-8"
  );
  const hatenaHtml = createMarkdownIt().use(markdownItHatena).render(entry);
  const normalHtml = createMarkdownIt().use(markdownItAnchor).render(entry);
  expect(hatenaHtml).toBe(normalHtml);
});
