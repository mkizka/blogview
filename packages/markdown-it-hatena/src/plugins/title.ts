import { PluginWithOptions } from "markdown-it";
import markdownItFrontMatter from "markdown-it-front-matter";
import yaml from "js-yaml";

export type BlogMeta = {
  categories?: string[];
  date?: Date;
  draft?: boolean;
  id?: string;
  title?: string;
};

export type TitlePluginOptions = {
  hideTitle?: boolean;
  cb?: (meta: unknown) => void;
};

function noop() {}

function date(date: BlogMeta["date"]) {
  if (!date) return "";
  return `
<div class="date entry-date first">
  <a href="" rel="nofollow">
    <time datetime="${date}" title="${date}">
      <span class="date-year">${date.getFullYear()}</span>
      <span class="hyphen">-</span>
      <span class="date-month">${date.getMonth() + 1}</span>
      <span class="hyphen">-</span>
      <span class="date-day">${date.getDate()}</span>
    </time>
  </a>
</div>
`.trim();
}

function title(title: BlogMeta["title"]) {
  if (!title) return "";
  return `
<h1 class="entry-title">
  <a href="" class="entry-title-link bookmark">${title}</a>
</h1>
`.trim();
}

function categories(categories: BlogMeta["categories"]) {
  if (!categories) return "";
  return `
<div class="entry-categories categories">
  ${categories
    .map(
      (category: string) =>
        `<a href="" class="entry-category-link category-${category}">${category}</a>`
    )
    .join("\n")}
</div>
`.trim();
}

export const titlePlugin: PluginWithOptions<TitlePluginOptions> = (
  md,
  options
) => {
  const cb = options?.cb || noop;
  md.use(markdownItFrontMatter, (metaRaw) => cb(yaml.load(metaRaw)));
  if (options?.hideTitle) return;
  md.renderer.rules.front_matter = (tokens, idx) => {
    const meta = yaml.load(tokens[idx].meta) as BlogMeta;
    return `
<header class="entry-header">
  ${date(meta.date)}
  ${title(meta.title)}
  ${categories(meta.categories)}
</header>
`.trim();
  };
};
