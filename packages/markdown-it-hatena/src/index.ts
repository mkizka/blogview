import type { PluginWithOptions } from "markdown-it";
import { contentsPlugin } from "./plugins/contents";
import { linkPlugin, LinkPluginOptions } from "./plugins/link";

const markdownItHatena: PluginWithOptions<LinkPluginOptions> = (
  md,
  options
) => {
  md.use(linkPlugin, options).use(contentsPlugin);
};

export = markdownItHatena;
