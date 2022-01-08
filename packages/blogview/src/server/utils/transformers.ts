import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import remarkExtract from "remark-extract-frontmatter";
import { rehypeHatenaCard } from "rehype-hatena-card";
import yaml from "yaml";

import { Frontmatter } from "../../common/types";

export async function md2html(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkRehype)
    .use(rehypeHatenaCard)
    .use(rehypeStringify);
  return (await processor.process(md)).value as string;
}

export async function md2frontmatter(md: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(remarkExtract, { yaml: yaml.parse });
  return (await processor.process(md)).data as Frontmatter;
}
