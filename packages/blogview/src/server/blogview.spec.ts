import { beforeEach, describe, expect, it, vi } from "vitest";

import { blogview } from "./blogview";
import * as show from "./utils/show.js";
import * as server from "./utils/server.js";

describe("blogview", () => {
  beforeEach(() => {
    console.log = vi.fn();
    process.argv = process.argv.slice(0, 2); // 引数を初期化
  });
  it("コマンドライン引数に--helpが含まれるとヘルプを表示", () => {
    const spy = vi.spyOn(show, "showHelp");
    process.argv[2] = "--help";
    blogview();
    expect(spy).toBeCalled();
  });
  it("コマンドライン引数に--versionが含まれるとバージョンを表示", () => {
    const spy = vi.spyOn(show, "showVersion");
    process.argv[2] = "--version";
    blogview();
    expect(spy).toBeCalled();
  });
  it("引数が無ければサーバーを起動", async () => {
    const spy1 = vi.spyOn(server, "startServer");
    const spy2 = vi.spyOn(server, "startLocalChangesWatcher");
    await blogview();
    expect(spy1).toBeCalled();
    expect(spy2).toBeCalled();
  });
});
