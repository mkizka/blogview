import type { PluginSimple } from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
// @ts-expect-error markdown-it-table-of-contents は型定義を持たない
import markdownItToc from "markdown-it-table-of-contents";

export const contentsPlugin: PluginSimple = (md) => {
  md.use(markdownItAnchor);
  md.use(markdownItToc, {
    markerPattern: /^\[:contents\]/i,
    includeLevel: [1, 2, 3, 4, 5, 6],
  });
};
