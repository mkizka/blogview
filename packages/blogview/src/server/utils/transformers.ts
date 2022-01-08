import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import remarkExtract from "remark-extract-frontmatter";
import { rehypeHatenaCard } from "rehype-hatena-card";
import yaml from "yaml";

export async function md2html(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHatenaCard)
    .use(rehypeStringify, { allowDangerousHtml: true });
  return (await processor.process(md)).value;
}

export type Frontmatter = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export function md2frontmatter(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtract, { yaml: yaml.parse });
  return processor.processSync(md).data as Frontmatter;
}
