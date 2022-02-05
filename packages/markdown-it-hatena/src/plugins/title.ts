import { PluginWithOptions } from "markdown-it";
import markdownItFrontMatter from "markdown-it-front-matter";
import yaml from "js-yaml";

export type TitlePluginOptions = {
  hideTitle?: boolean;
  cb?: (meta: unknown) => void;
};

function noop() {}

export const titlePlugin: PluginWithOptions<TitlePluginOptions> = (
  md,
  options
) => {
  const cb = options?.cb || noop;
  md.use(markdownItFrontMatter, (metaRaw) => cb(yaml.load(metaRaw)));
  if (options?.hideTitle) return;
  md.renderer.rules.front_matter = (tokens, idx) => {
    const meta = yaml.load(tokens[idx].meta) as any;
    return `
<header class="entry-header">
  <div class="date entry-date first">
    <a href="" rel="nofollow">
      <time datetime="${meta.date}" title="${meta.date}">
        <span class="date-year">${new Date(meta.date).getFullYear()}</span>
        <span class="hyphen">-</span>
        <span class="date-month">${new Date(meta.date).getMonth() + 1}</span>
        <span class="hyphen">-</span>
        <span class="date-day">${new Date(meta.date).getDate()}</span>
      </time>
    </a>
  </div>
  <h1 class="entry-title">
    <a href="" class="entry-title-link bookmark">${meta.title}</a>
  </h1>
  <div class="entry-categories categories">
    ${meta.categories
      .map(
        (category: string) =>
          `<a href="" class="entry-category-link category-${category}">${category}</a>`
      )
      .join("\n")}
  </div>
</header>
`.trim();
  };
};
