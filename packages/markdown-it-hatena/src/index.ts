import type { PluginWithOptions } from "markdown-it";
import { contentsPlugin } from "./plugins/contents";
import { linkPlugin, LinkPluginOptions } from "./plugins/link";

type HatenaPluginOptions = {
  link: LinkPluginOptions;
};

export const markdownItHatena: PluginWithOptions<HatenaPluginOptions> = (
  md,
  options
) => {
  md.use(linkPlugin, options?.link).use(contentsPlugin);
};
