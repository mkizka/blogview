import MarkdownIt from "markdown-it";

export function createMarkdownIt() {
  return new MarkdownIt({ linkify: true, html: true });
}
