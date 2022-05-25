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
  async loadTitleToLabel() {
    const meta = await getMeta(this.resourceUri!);
    if (meta != null) {
      this.label = meta.title;
    }
  }
}

type VSCodeFile = {
  uri: vscode.Uri;
  type: vscode.FileType;
};

function isMaybeEntryFile(file: VSCodeFile) {
  return file.type == vscode.FileType.File && file.uri.path.endsWith(".md");
}

function getCollapsibleState(type: vscode.FileType) {
  return type == vscode.FileType.Directory
    ? vscode.TreeItemCollapsibleState.Collapsed
    : vscode.TreeItemCollapsibleState.None;
}

export async function createEntryTreeItem(file: VSCodeFile) {
  const state = getCollapsibleState(file.type);
  const item = new EntryTreeItem(file.uri, state);
  if (isMaybeEntryFile(file)) {
    await item.loadTitleToLabel();
  }
  return item;
}
