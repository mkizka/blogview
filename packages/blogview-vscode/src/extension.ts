import vscode from "vscode";
import type MarkdownIt from "markdown-it";
import { HatenaPluginOptions, markdownItHatena } from "markdown-it-hatena";

import { TreeDataProvider } from "./treeView/provider";

export function getOptions(): HatenaPluginOptions {
  const config = vscode.workspace.getConfiguration("blogview");
  return {
    twitter: config.get<boolean>("enableTwitter")!,
    youtube: config.get<boolean>("enableYoutube")!,
  };
}

const provider = new TreeDataProvider();

export function activate() {
  console.log("blogview activated");
  vscode.window.registerTreeDataProvider("blogview", provider);
  vscode.commands.registerCommand("blogview.refreshEntry", () =>
    provider.refresh()
  );
  vscode.workspace.onDidSaveTextDocument(() => provider.refresh());
  vscode.workspace.onDidCreateFiles(() => provider.refresh());
  vscode.workspace.onDidDeleteFiles(() => provider.refresh());
  vscode.workspace.onDidRenameFiles(() => provider.refresh());
  return {
    extendMarkdownIt(md: MarkdownIt) {
      return md.use(markdownItHatena, getOptions());
    },
  };
}
