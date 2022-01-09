import * as markdownIt from "markdown-it";
import * as remark from "remark";
import * as remarkFrontmatter from "remark-frontmatter";
import * as remarkParseFrontmatter from "remark-parse-frontmatter";

export async function md2html(md: string) {
  return markdownIt().render(md);
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
