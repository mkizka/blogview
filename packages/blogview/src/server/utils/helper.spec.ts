import fs from "fs";
import { expect, test } from "vitest";
import { loadJson, pkgPath } from "./helper";

test("pkgPath: パッケージのルートからファイルパスを取る", () => {
  const root = pkgPath(".");
  const rootFiles = fs.readdirSync(root);
  expect(rootFiles).include("package.json");
});

test("loadJson: JSONファイルを読み込み、ファイルが無いかパースエラーならnullを返す", () => {
  expect(loadJson(pkgPath("package.json"))).not.toBeNull();
  expect(loadJson(pkgPath("no-exist.json"))).toBeNull();
});
