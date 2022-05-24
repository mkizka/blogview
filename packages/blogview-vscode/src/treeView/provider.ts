import vscode from "vscode";

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

  async getChildren(element?: vscode.TreeItem) {
    const rootPath =
      vscode.workspace.workspaceFolders &&
      vscode.workspace.workspaceFolders.length > 0
        ? vscode.workspace.workspaceFolders[0].uri
        : undefined;
    if (rootPath == undefined) {
      vscode.window.showInformationMessage(
        "ワークスペースを読み込めませんでした"
      );
      return Promise.resolve([]);
    }
    const files = await vscode.workspace.fs.readDirectory(
      vscode.Uri.joinPath(rootPath, "entry")
    );
    return files.map(
      ([file]) =>
        new EntryTreeItem(vscode.Uri.joinPath(rootPath, "entry", file))
    );
  }
}

class EntryTreeItem extends vscode.TreeItem {
  constructor(uri: vscode.Uri) {
    super(uri.path);
    this.command = {
      title: "",
      command: "blogview.openEntry",
      arguments: [uri],
    };
  }
}
