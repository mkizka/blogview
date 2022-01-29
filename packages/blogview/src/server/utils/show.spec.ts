import { test, expect, vi } from "vitest";
import { helpText, showHelp, showVersion } from "./show";

test("showHelp > ヘルプを表示", () => {
  console.log = vi.fn();
  showHelp();
  expect(console.log).toHaveBeenCalledWith(helpText);
});

test("showVersion > バージョンを表示", () => {
  console.log = vi.fn();
  showVersion();
  expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/^v[\d\.]+/));
});
