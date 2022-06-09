import vscode from "vscode";
import { getMetaFromText } from "./meta";

import { EntryTreeItem } from "./item";
import { compareVSCodeFile, isMarkdownFile, VSCodeFile } from "./file";

function getWorkspaceFolderUri() {
  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
  ) {
    return vscode.workspace.workspaceFolders[0].uri;
  }
  return null;
}

async function readDirectory(targetUri: vscode.Uri) {
  const files = await vscode.workspace.fs.readDirectory(targetUri);
  return files.map(([filename, type]) => {
    const uri = vscode.Uri.joinPath(targetUri, filename);
    return { uri, type };
  });
}

async function getChildEntryTreeItems(targetUri: vscode.Uri) {
  const files = await readDirectory(targetUri);
  const promises = files.map(async (file: VSCodeFile) => {
    if (isMarkdownFile(file)) {
      const content = await vscode.workspace.fs
        .readFile(file.uri)
        .then(new TextDecoder().decode);
      file.meta = getMetaFromText(content);
    }
    return file;
  });
  const filesWithMeta = await Promise.all(promises);
  return filesWithMeta
    .sort(compareVSCodeFile)
    .map((file) => new EntryTreeItem(file));
}

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
