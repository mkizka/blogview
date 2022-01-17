import type { PluginSimple } from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";

import {
  HatenaNotation,
  HatenaNotationLink,
  parseHatenaNotation,
} from "./utils";

function renderLink(notation: HatenaNotationLink) {
  return notation.options
    .map((option) => {
      switch (option) {
        case "embed":
          if (notation.url.startsWith("https://twitter.com")) {
            return [
              `<div class="twitter-tweet-container">`,
              `<blockquote class="twitter-tweet">`,
              `<a href="${notation.url}"></a>`,
              `</blockquote>`,
              `</div>`,
            ].join("");
          }
          return [
            "<iframe",
            `src="https://hatenablog-parts.com/embed?url=${notation.url}"`,
            `scrolling="no"`,
            `frameborder="0"`,
            `style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"`,
            `></iframe>`,
          ].join(" ");
        case "cite":
          return [
            `<cite class="hatena-citation">`,
            `<a href="${notation.url}">${new URL(notation.url).host}</a>`,
            `</cite>`,
          ].join(" ");
        default:
          return escapeHtml(notation.src);
      }
    })
    .join("");
}

const render = (notation: HatenaNotation) => {
  switch (notation.type) {
    case "link":
      return renderLink(notation);
    case "text":
      return escapeHtml(notation.src);
    default:
      throw new Error();
  }
};

export const linkPlugin: PluginSimple = (md) => {
  md.inline.ruler2.push("markdown-it-hatena--link", (state) => {
    const parsed = parseHatenaNotation(state.src);
    if (parsed.filter((item) => item.type == "link").length >= 1) {
      state.tokens[0].type = "text_with_hatena_link";
    }
    return false;
  });
  md.renderer.rules.text_with_hatena_link = (tokens, idx) => {
    const token = tokens[idx];
    const parsed = parseHatenaNotation(token.content);
    return parsed.map(render).join("");
  };
};
