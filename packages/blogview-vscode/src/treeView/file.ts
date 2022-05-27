import vscode from "vscode";
import path from "path";
import { BlogMeta } from "markdown-it-hatena";

export type VSCodeFile = {
  type: vscode.FileType;
  uri: vscode.Uri;
};

export type VSCodeMarkdownFile = {
  type: vscode.FileType.File;
  uri: vscode.Uri;
  meta: BlogMeta | null;
};

export function isMarkdownFile(file: VSCodeFile): file is VSCodeMarkdownFile {
  return file.type == vscode.FileType.File && file.uri.path.endsWith(".md");
}

function isPublished(meta: BlogMeta) {
  return meta.draft == undefined || !meta.draft;
}

function getPublishedDate(file: VSCodeFile) {
  const meta = isMarkdownFile(file) ? file.meta : null;
  return meta != null && isPublished(meta) ? meta.date : undefined;
}

// 優先順位：ディレクトリ → 日付が無いファイル → 下書きファイル → 日付が最近のファイル
export function compareVSCodeFile(a: VSCodeFile, b: VSCodeFile) {
  const aDate = getPublishedDate(a);
  const bDate = getPublishedDate(b);
  // 日付比較出来れば日付を比較して返す
  if (aDate != undefined && bDate != undefined) {
    return bDate.getTime() - aDate.getTime();
  }
  // 両方に日付が無いファイル同士ははディレクトリを優先
  if (aDate == undefined && bDate == undefined) {
    return b.type - a.type;
  }
  // いずれかのみに日付があれば日付が無い方を返す
  return aDate == undefined ? -1 : 1;
}
