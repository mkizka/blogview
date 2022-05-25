import vscode from "vscode";

import { createEntryTreeItem } from "./treeItem";

export class TreeDataProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  private _onDidChangeTreeData =
    new vscode.EventEmitter<vscode.TreeItem | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: vscode.TreeItem) {
    return element;
  }

  getChildren(element?: vscode.TreeItem) {
    const rootUri = getWorkspaceFolderUri();
    if (rootUri == null) {
      vscode.window.showInformationMessage(
        "ワークスペースを取得できませんでした。"
      );
      return null;
    }
    // ルートではentryディレクトリ、子要素では
    // 要素自身のresourceUriを使ってファイルを取得する
    const targetUri =
      element?.resourceUri != undefined
        ? element.resourceUri
        : vscode.Uri.joinPath(rootUri, "entry");
    return getChildEntryTreeItems(targetUri);
  }
}

function getWorkspaceFolderUri() {
  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
  ) {
    return vscode.workspace.workspaceFolders[0].uri;
  }
  return null;
}

async function getChildEntryTreeItems(targetUri: vscode.Uri) {
  const files = await vscode.workspace.fs.readDirectory(targetUri);
  const promises = files.map(async ([filename, type]) => {
    const uri = vscode.Uri.joinPath(targetUri, filename);
    const state =
      type == vscode.FileType.Directory
        ? vscode.TreeItemCollapsibleState.Collapsed
        : vscode.TreeItemCollapsibleState.None;
    return createEntryTreeItem(uri, state);
  });
  return Promise.all(promises);
}
