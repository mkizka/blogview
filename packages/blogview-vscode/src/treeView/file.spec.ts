import assert from "assert";
import vscode from "vscode";
import {
  compareVSCodeFile,
  isMarkdownFile,
  VSCodeFile,
  VSCodeMarkdownFile,
} from "./file";

const fileWithDate0101: VSCodeMarkdownFile = {
  type: vscode.FileType.File,
  uri: vscode.Uri.file("./fileWithDate0101.md"),
  meta: {
    date: new Date("2022-01-01"),
  },
};

const fileWithDate0102: VSCodeMarkdownFile = {
  type: vscode.FileType.File,
  uri: vscode.Uri.file("./fileWithDate0102.md"),
  meta: {
    date: new Date("2022-01-02"),
  },
};

const fileDraft: VSCodeMarkdownFile = {
  type: vscode.FileType.File,
  uri: vscode.Uri.file("./fileDraft.md"),
  meta: {
    date: new Date("2022-01-01"),
    draft: true,
  },
};

const fileWithoutDate: VSCodeFile = {
  type: vscode.FileType.File,
  uri: vscode.Uri.file("./fileWithoutDate.md"),
};

const directory: VSCodeFile = {
  type: vscode.FileType.Directory,
  uri: vscode.Uri.file("./directory"),
};

test("isMarkdownFile", () => {
  assert.ok(isMarkdownFile(fileDraft));
  assert.ok(!isMarkdownFile(directory));
});

test("compareVSCodeFile", () => {
  const cases: [VSCodeFile, VSCodeFile, number][] = [
    [directory, fileDraft, -1],
    [directory, fileWithoutDate, -1],
    [directory, fileWithDate0101, -1],
    [fileDraft, fileWithoutDate, 0], // 下書きと日付なしはソートしない
    [fileDraft, fileWithDate0101, -1],
    [fileWithoutDate, fileWithDate0101, -1],
    [fileWithDate0102, fileWithDate0101, -86400000], // 日付比較はミリ秒を返す
  ];
  for (const [a, b, expected] of cases) {
    console.log(a, b, expected);
    assert.equal(compareVSCodeFile(a, b), expected);
  }
});
