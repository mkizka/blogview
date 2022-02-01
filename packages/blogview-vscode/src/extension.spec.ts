import * as assert from "assert";
import { getOptions } from "./extension";

suite("拡張機能のテスト", () => {
  test("オプションの取得", () => {
    const options = getOptions();
    assert.deepStrictEqual(options, {
      twitter: true,
      youtube: true,
    });
  });
});
