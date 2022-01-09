import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  //パネルを作成する
  let panelGenerator = vscode.commands.registerCommand(
    "blogview-vscode.preview",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "openPreview",
        "Preview test",
        vscode.ViewColumn.Two,
        { enableScripts: true }
      );

      //エディタの内容を取得、パネルに反映
      const updateWebview = () => {
        panel.webview.html = generatePanelContent();
      };

      //イベントリスナ
      let activeEditor = vscode.window.activeTextEditor;

      //テキストが変動したら更新
      vscode.workspace.onDidChangeTextDocument((event) => {
        if (activeEditor && event.document === activeEditor.document) {
          updateWebview();
        }
      });

      //テキストがセーブされたとき更新
      vscode.workspace.onDidSaveTextDocument((event) => {
        if (activeEditor && event === activeEditor.document) {
          updateWebview();
        }
      });

      //カーソルが移動したら更新
      vscode.window.onDidChangeTextEditorSelection((event) => {
        if (activeEditor && event.textEditor === activeEditor) {
          updateWebview();
        }
      });
    }
  );
  context.subscriptions.push(panelGenerator);
}

function generatePanelContent() {
  let activeEditor = vscode.window.activeTextEditor;
  let text: string = "";
  if (activeEditor) {
    text = activeEditor.document.getText();
  }
  return `<!DOCTYPE html>
  <html lang="jp">
    <head>
      <title>Example Webview</title>
    </head>
    <body>
    ${text}
    </body>
  </html> `;
}

export function deactivate() {}
