import vscode from "vscode";
import type MarkdownIt from "markdown-it";
import { markdownItHatena } from "markdown-it-hatena";

export function activate() {
  const config = vscode.workspace.getConfiguration("blogview");
  const options = {
    link: {
      twitter: config.get("enableTwitter"),
      youtube: config.get("enableYoutube"),
    },
  };
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markdownItHatena, options);
    },
  };
}
