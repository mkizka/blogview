import type { PluginWithOptions } from "markdown-it";

import { contentsPlugin } from "./plugins/contents";
import { linkPlugin, LinkPluginOptions } from "./plugins/link";
import { titlePlugin, TitlePluginOptions } from "./plugins/title";

export { BlogMeta } from "./plugins/title";

export type HatenaPluginOptions = LinkPluginOptions & TitlePluginOptions;

export const markdownItHatena: PluginWithOptions<HatenaPluginOptions> = (
  md,
  options
) => {
  md.use(titlePlugin, options).use(linkPlugin, options).use(contentsPlugin);
};
