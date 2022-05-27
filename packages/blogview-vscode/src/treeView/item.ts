import vscode from "vscode";

import { isMarkdownFile, VSCodeFile } from "./file";

function getCollapsibleState(type: vscode.FileType) {
  return type == vscode.FileType.Directory
    ? vscode.TreeItemCollapsibleState.Collapsed
    : vscode.TreeItemCollapsibleState.None;
}

export class EntryTreeItem extends vscode.TreeItem {
  constructor(file: VSCodeFile) {
    super(file.uri, getCollapsibleState(file.type));
    this.command = {
      title: "",
      command: "blogview.openEntry",
      arguments: [file.uri],
    };
    if (isMarkdownFile(file) && file.meta != null) {
      this.label = file.meta.title;
      this.description = file.meta.draft
        ? "下書き"
        : file.meta.date?.toLocaleDateString();
    }
  }
}
