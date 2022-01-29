import fs from "fs";
import path from "path";
import { afterEach, describe, expect, it } from "vitest";

import { getOptions, Options } from "./options";

function writeConfig(config: Options, filename?: string) {
  fs.writeFileSync(
    path.join(process.cwd(), filename || "blogview.json"),
    JSON.stringify(config, null, 2)
  );
}

function removeConfig(filename?: string) {
  try {
    fs.rmSync(path.join(process.cwd(), filename || "blogview.json"));
  } catch {}
}

describe("getOptions", () => {
  afterEach(() => {
    removeConfig();
    removeConfig("foo.json");
  });
  it("設定を取得する", () => {
    expect(getOptions()).toEqual({
      entry: "entry",
      styles: [],
      twitter: true,
      youtube: true,
    });
  });
  it("設定ファイルで上書きできる", () => {
    const config = {
      entry: "foo",
      styles: ["a.css", "b.css"],
      twitter: false,
      youtube: false,
    };
    writeConfig(config);
    expect(getOptions()).toEqual(config);
  });
  it("設定ファイルの場所を引数で指定できる", () => {
    const config = {
      entry: "foo",
      styles: ["a.css", "b.css"],
      twitter: false,
      youtube: false,
    };
    writeConfig(config, "foo.json");
    expect(getOptions(["--config", "foo.json"])).toEqual(config);
  });
  it("引数で上書き出来る", () => {
    expect(
      getOptions([
        "--entry",
        "foo",
        "--style",
        "a.css",
        "--style",
        "b.css",
        "--no-twitter",
        "--no-youtube",
      ])
    ).toEqual({
      entry: "foo",
      styles: ["a.css", "b.css"],
      twitter: false,
      youtube: false,
    });
  });
  it("設定ファイルより引数が優先される", () => {
    const config = {
      entry: "foo",
      styles: ["a.css", "b.css"],
      twitter: false,
      youtube: false,
    };
    writeConfig(config);
    expect(getOptions(["--entry", "bar"])).toEqual({
      entry: "bar",
      styles: ["a.css", "b.css"],
      twitter: false,
      youtube: false,
    });
  });
});
