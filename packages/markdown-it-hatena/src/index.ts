import type { PluginWithOptions } from "markdown-it";
import { contentsPlugin } from "./plugins/contents";
import { linkPlugin, LinkPluginOptions } from "./plugins/link";

export type HatenaPluginOptions = LinkPluginOptions;

export const markdownItHatena: PluginWithOptions<HatenaPluginOptions> = (
  md,
  options
) => {
  md.use(linkPlugin, options).use(contentsPlugin);
};
