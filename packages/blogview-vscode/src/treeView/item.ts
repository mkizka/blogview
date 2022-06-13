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
    this.iconPath =
      file.type == vscode.FileType.Directory
        ? new vscode.ThemeIcon("folder")
        : new vscode.ThemeIcon("symbol-file");
    if (isMarkdownFile(file) && file.meta != null) {
      this.label = file.meta.title;
      this.description = file.meta.date?.toLocaleDateString();
      if (file.meta.draft) {
        this.iconPath = new vscode.ThemeIcon("pencil");
      }
    }
  }
}
