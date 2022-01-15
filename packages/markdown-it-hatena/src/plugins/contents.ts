import type { PluginSimple } from "markdown-it";

export const contentsPlugin: PluginSimple = (md) => {
  md.use(require("markdown-it-anchor"));
  md.use(require("markdown-it-table-of-contents"), {
    markerPattern: /^\[:contents\]/i,
    includeLevel: [1, 2, 3, 4, 5, 6],
  });
};
