import type * as MarkdownIt from "markdown-it";

export function activate() {
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(require("markdown-it-hatena"));
    },
  };
}
