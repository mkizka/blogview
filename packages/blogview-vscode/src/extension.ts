import vscode from "vscode";
import type MarkdownIt from "markdown-it";
import { HatenaPluginOptions, markdownItHatena } from "markdown-it-hatena";

import { TreeDataProvider } from "./treeView/provider";
import { newEntry, openEntry } from "./treeView/workspace";

export function getOptions(): HatenaPluginOptions {
  const config = vscode.workspace.getConfiguration("blogview");
  return {
    twitter: config.get<boolean>("enableTwitter")!,
    youtube: config.get<boolean>("enableYoutube")!,
  };
}

const provider = new TreeDataProvider();

export async function activate() {
  const entries = await vscode.workspace.findFiles("entry/**/*.md");
  if (entries.length == 0) {
    return;
  }
  vscode.commands.executeCommand(
    "setContext",
    "blogview-vscode.activated",
    true
  );
  vscode.window.registerTreeDataProvider("blogview", provider);
  vscode.commands.registerCommand("blogview.newEntry", () =>
    newEntry().then(() => provider.refresh())
  );
  vscode.commands.registerCommand("blogview.refreshEntries", () =>
    provider.refresh()
  );
  vscode.commands.registerCommand("blogview.openEntry", (uri: vscode.Uri) =>
    openEntry(uri)
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
