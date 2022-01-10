import type { PluginSimple } from "markdown-it";

function getHatenaParams(text: string) {
  const matched = /\[(?<url>.*?)(?<labels>(:\w+)*)\]/g.exec(text);
  if (matched) {
    return {
      url: matched.groups!.url,
      labels: matched.groups!.labels.split(":").filter(Boolean),
    };
  }
  return null;
}

const markdownItHatena: PluginSimple = (md) => {
  const { text: defaultTextRenderer } = md.renderer.rules;
  md.renderer.rules.text = (tokens, idx, ...args) => {
    const token = tokens[idx];
    const params = getHatenaParams(token.content);
    if (params?.labels.includes("embed")) {
      return `<iframe
          src="https://hatenablog-parts.com/embed?url=${params.url}"
          scrolling="no"
          frameborder="0"
          style="display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;"
        ></iframe>`;
    } else {
      return defaultTextRenderer(tokens, idx, ...args);
    }
  };
};

export default markdownItHatena;
