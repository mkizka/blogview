import MarkdownIt from "markdown-it";
import { HatenaPluginOptions, markdownItHatena } from "markdown-it-hatena";
import markdownItFrontMatter from "markdown-it-front-matter";
import yaml from "js-yaml";

import { BlogMeta } from "../../common/types";

type RenderMarkdownResult = {
  html: string;
  meta: BlogMeta;
};

export function renderMarkdown(
  text: string,
  options: HatenaPluginOptions
): RenderMarkdownResult {
  let meta: BlogMeta = {};
  const html = new MarkdownIt({ linkify: true, html: true })
    .use(markdownItHatena, options)
    .use(markdownItFrontMatter, (metaRaw) => {
      meta = yaml.load(metaRaw) as BlogMeta;
    })
    .render(text);
  return { html, meta };
}
