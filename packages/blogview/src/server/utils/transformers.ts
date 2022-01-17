import markdownIt from "markdown-it";
import remark from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import markdownItHatena from "@mkizka/markdown-it-hatena";

import { BlogMeta } from "../../common/types";

export async function md2html(md: string) {
  return markdownIt({ linkify: true, html: true })
    .use(markdownItHatena)
    .render(md);
}

export async function md2meta(md: string) {
  const processor = remark().use(remarkFrontmatter).use(remarkParseFrontmatter);
  const data = (await processor.process(md)).data as { frontmatter: BlogMeta };
  return data.frontmatter;
}
