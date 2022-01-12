import type * as MarkdownIt from "markdown-it";
import { parseHatenaNotation } from "./utils";

export const embedPlugin: MarkdownIt.PluginSimple = (md) => {
  md.inline.ruler2.push("markdownItHatena", (state) => {
    const params = parseHatenaNotation(state.src);
    // [:contents] は markdown-it-table-of-contents で対応
    if (params != null && !params.labels.includes("contents")) {
      state.tokens[0].type = "hatena";
    }
    return false;
  });
  md.renderer.rules.hatena = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const params = parseHatenaNotation(token.content);
    if (params?.labels.includes("embed")) {
      return [
        "<iframe",
        `src="https://hatenablog-parts.com/embed?url=${params.url}"`,
        `scrolling="no"`,
        `frameborder="0"`,
        `style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"`,
        `></iframe>`,
      ].join(" ");
    } else {
      return md.renderer.rules.text!(tokens, idx, ...args);
    }
  };
};
