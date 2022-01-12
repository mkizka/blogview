import type * as MarkdownIt from "markdown-it";
import { embedPlugin } from "./src/embed";

const markdownItHatena: MarkdownIt.PluginSimple = (md) => {
  md.use(embedPlugin);
};

export = markdownItHatena;
