import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import * as remarkExtract from "remark-extract-frontmatter";
import { rehypeHatenaEmbed } from "@mkizka/rehype-hatena-embed";
import { parse as yaml } from "yaml";

export async function md2html(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeHatenaEmbed)
    .use(rehypeStringify);
  return (await processor.process(md)).value as string;
}

export type BlogMeta = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export async function md2meta(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtract, { yaml });
  return (await processor.process(md)).data as BlogMeta;
}
