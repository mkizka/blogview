import type { PluginSimple } from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";

import {
  HatenaNotation,
  HatenaNotationLink,
  parseHatenaNotation,
} from "../utils/parser";
import { isTwitter, isYouTube } from "../utils/validator";

function renderLink(notation: HatenaNotationLink) {
  return notation.options
    .map((option) => {
      switch (option) {
        case "embed":
          if (isTwitter(notation.url)) {
            return [
              `<blockquote class="twitter-tweet">`,
              `<a href="${notation.url}"></a>`,
              `</blockquote>`,
            ].join("");
          }
          if (isYouTube(notation.url)) {
            const v = new URL(notation.url).searchParams.get("v");
            return [
              `<iframe`,
              `width="560"`,
              `height="315"`,
              `src="https://www.youtube.com/embed/${v}"`,
              `frameborder="0"`,
              `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`,
              `allowfullscreen></iframe>`,
            ].join(" ");
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
