import type * as MarkdownIt from "markdown-it";
import { contentsPlugin } from "./plugins/contents";
import { linkPlugin } from "./plugins/link";

const markdownItHatena: MarkdownIt.PluginSimple = (md) => {
  md.use(linkPlugin).use(contentsPlugin);
};

export = markdownItHatena;
