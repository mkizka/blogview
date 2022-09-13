import vscode from "vscode";
import crypto from "crypto";
// @ts-ignore
import template from "./fixtures/template.md";

const templateText = new TextEncoder().encode(template);

export function getWorkspaceFolderUri() {
  if (
    vscode.workspace.workspaceFolders &&
    vscode.workspace.workspaceFolders.length > 0
  ) {
    return vscode.workspace.workspaceFolders[0].uri;
  }
  throw new Error("ワークスペースが取得できませんでした");
}

export async function openEntry(uri: vscode.Uri) {
  const doc = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(doc, vscode.ViewColumn.One, true);
}

export async function newEntry() {
  const entryId = crypto.randomBytes(5).toString("hex");
  const workspaceUri = getWorkspaceFolderUri();
  const target = vscode.Uri.joinPath(workspaceUri, `entry/${entryId}.md`);
  // TODO: ユーザー指定のテンプレートが使えるようにする
  await vscode.workspace.fs.writeFile(target, templateText);
}
