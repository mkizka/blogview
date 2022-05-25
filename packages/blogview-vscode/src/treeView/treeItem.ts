import vscode from "vscode";

import { getMeta } from "./meta";

class EntryTreeItem extends vscode.TreeItem {
  constructor(
    resourceUri: vscode.Uri,
    collapsibleState?: vscode.TreeItemCollapsibleState
  ) {
    super(resourceUri, collapsibleState);
    this.command = {
      title: "",
      command: "blogview.openEntry",
      arguments: [resourceUri],
    };
  }
}

export async function createEntryTreeItem(
  resourceUri: vscode.Uri,
  collapsibleState?: vscode.TreeItemCollapsibleState
) {
  const item = new EntryTreeItem(resourceUri, collapsibleState);
  if (resourceUri.path.endsWith(".md")) {
    const meta = await getMeta(resourceUri);
    if (meta != null) {
      item.label = meta.title;
    }
  }
  return item;
}
