import markdownIt from "markdown-it";
import remark from "remark";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import markdownItHatena from "@mkizka/markdown-it-hatena";

export async function md2html(md: string) {
  return markdownIt({ linkify: true, html: true })
    .use(markdownItHatena)
    .render(md);
}

export type BlogMeta = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export async function md2meta(md: string) {
  // @ts-ignore
  const processor = remark().use(remarkFrontmatter).use(remarkParseFrontmatter);
  // @ts-ignore
  return (await processor.process(md)).data.frontmatter as BlogMeta;
}
