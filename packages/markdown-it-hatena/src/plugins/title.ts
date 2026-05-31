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

function date(date: Date) {
  return `
  <div class="date entry-date first">
    <a href="" rel="nofollow">
      <time datetime="${date.toJSON()}" title="${date.toJSON()}">
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

function title(title: string) {
  return `
  <h1 class="entry-title">
    <a href="" class="entry-title-link bookmark">${title}</a>
  </h1>
`.trim();
}

function categories(categories: string[]) {
  return `
  <div class="entry-categories categories">
    ${categories
      .map(
        (category: string) =>
          `<a href="" class="entry-category-link category-${category}">${category}</a>`,
      )
      .join("\n    ")}
  </div>
`.trim();
}

// VSCode 1.122.1 以降の組み込み Markdown プレビューが同名の "front_matter" ブロックルールと
// renderer を後から追加し、blogview が markdown-it-front-matter で設定した文字列 meta を
// {content: string} 形式と誤認して yaml.parse(undefined) で落ちる。token type を独自名に
// 差し替えることで衝突を避けつつ blogview 側の renderer を確実に呼ばせる。
const HATENA_FRONT_MATTER = "hatena_front_matter";

export const titlePlugin: PluginWithOptions<TitlePluginOptions> = (
  md,
  options,
) => {
  const cb = options?.cb || noop;
  md.use(markdownItFrontMatter, (metaRaw: string) => cb(yaml.load(metaRaw)));
  md.core.ruler.after("block", "hatena_front_matter_rename", (state) => {
    for (const token of state.tokens) {
      if (token.type === "front_matter") {
        token.type = HATENA_FRONT_MATTER;
      }
    }
  });
  if (options?.hideTitle) return;
  md.renderer.rules[HATENA_FRONT_MATTER] = (tokens, idx) => {
    const meta = yaml.load(tokens[idx].meta) as BlogMeta;
    return `
<header class="entry-header">
  ${[
    meta.date && date(meta.date),
    meta.title && title(meta.title),
    meta.categories && categories(meta.categories),
  ]
    .filter(Boolean)
    .join("\n  ")}
</header>
`.trim();
  };
};
