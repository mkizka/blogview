import type { PluginSimple } from "markdown-it";
import { contentsPlugin } from "./plugins/contents";
import { linkPlugin } from "./plugins/link";

const markdownItHatena: PluginSimple = (md) => {
  md.use(linkPlugin).use(contentsPlugin);
};

export = markdownItHatena;
