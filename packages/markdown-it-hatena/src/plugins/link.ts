import type { PluginSimple } from "markdown-it";
import { HatenaNotationLink, parseHatenaNotation } from "./utils";

type Transformers = {
  [key: string]: (url: string) => string;
};

const renderers: Transformers = {
  embed: (url: string) =>
    [
      "<iframe",
      `src="https://hatenablog-parts.com/embed?url=${url}"`,
      `scrolling="no"`,
      `frameborder="0"`,
      `style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"`,
      `></iframe>`,
    ].join(" "),
};

export const linkPlugin: PluginSimple = (md) => {
  md.inline.ruler2.push("markdown-it-hatena--url", (state) => {
    const hatenaNotation = parseHatenaNotation(state.src);
    if (hatenaNotation != null && hatenaNotation.type == "link") {
      state.tokens[0].type = `hatena_url`;
    }
    return false;
  });
  md.renderer.rules.hatena_url = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const { url, options } = parseHatenaNotation(
      token.content
    ) as HatenaNotationLink;
    const supportedOptions = options.filter((option) =>
      Object.keys(renderers).includes(option)
    );
    if (supportedOptions.length == 0) {
      return md.renderer.rules.text!(tokens, idx, ...args);
    }
    return supportedOptions.map((option) => renderers[option](url)).join("");
  };
};
