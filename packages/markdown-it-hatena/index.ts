import type * as MarkdownIt from "markdown-it";

function parseHatenaNotation(text: string) {
  const matched = /^\[(?<url>.*?)(?<labels>(:\w+)*)\]$/g.exec(text);
  if (matched) {
    return {
      url: matched.groups!.url,
      labels: matched.groups!.labels.split(":").filter(Boolean),
    };
  }
  return null;
}

function isHatenaNotation(text: string) {
  return parseHatenaNotation(text) != null;
}

const markdownItHatena: MarkdownIt.PluginSimple = (md) => {
  md.inline.ruler2.push("markdownItHatena", (state) => {
    if (isHatenaNotation(state.src)) {
      state.tokens[0].type = "hatena";
    }
    return false;
  });
  md.renderer.rules.hatena = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const params = parseHatenaNotation(token.content);
    if (params?.labels.includes("embed")) {
      return `<iframe
          src="https://hatenablog-parts.com/embed?url=${params.url}"
          scrolling="no"
          frameborder="0"
          style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"
        ></iframe>`;
    } else {
      return md.renderer.rules.text!(tokens, idx, ...args);
    }
  };
};

export = markdownItHatena;
