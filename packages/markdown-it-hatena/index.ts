import type * as MarkdownIt from "markdown-it";
import { contentsPlugin } from "./src/contents";
import { embedPlugin } from "./src/embed";

const markdownItHatena: MarkdownIt.PluginSimple = (md) => {
  md.use(embedPlugin).use(contentsPlugin);
};

export = markdownItHatena;
