import vscode from "vscode";
import type MarkdownIt from "markdown-it";
import { HatenaPluginOptions, markdownItHatena } from "markdown-it-hatena";

export function getOptions(): HatenaPluginOptions {
  const config = vscode.workspace.getConfiguration("blogview");
  return {
    twitter: config.get<boolean>("enableTwitter")!,
    youtube: config.get<boolean>("enableYoutube")!,
  };
}

export function activate() {
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markdownItHatena, getOptions());
    },
  };
}
