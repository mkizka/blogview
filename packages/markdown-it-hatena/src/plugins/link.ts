import type { PluginSimple } from "markdown-it";
import escapeHTML from "escape-html";

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
          return [
            "<iframe",
            `src="https://hatenablog-parts.com/embed?url=${notation.url}"`,
            `scrolling="no"`,
            `frameborder="0"`,
            `style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"`,
            `></iframe>`,
          ].join(" ");
        default:
          return escapeHTML(notation.src);
      }
    })
    .join();
}

const render = (notation: HatenaNotation) => {
  switch (notation.type) {
    case "link":
      return renderLink(notation);
    case "text":
      return escapeHTML(notation.src);
    default:
      throw new Error();
  }
};

export const linkPlugin: PluginSimple = (md) => {
  md.renderer.rules.text = (tokens, idx) => {
    const token = tokens[idx];
    return parseHatenaNotation(token.content).map(render).join();
  };
};
