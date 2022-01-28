import { describe, expect, it } from "vitest";
import { getOptions } from "./options";

describe("getOptions", () => {
  it("設定を取得する", () => {
    expect(getOptions()).toMatchObject({
      entry: "entry",
      styles: [],
      twitter: true,
      youtube: true,
    });
  });
  it("引数で上書き出来る", () => {
    expect(getOptions(["--entry", "custom"])).toMatchObject({
      entry: "custom",
      styles: [],
      twitter: true,
      youtube: true,
    });
    expect(getOptions(["--style", "a.css", "--style", "b.css"])).toMatchObject({
      entry: "entry",
      styles: ["a.css", "b.css"],
      twitter: true,
      youtube: true,
    });
    expect(getOptions(["--no-twitter"])).toMatchObject({
      entry: "entry",
      styles: [],
      twitter: false,
      youtube: true,
    });
    expect(getOptions(["--no-youtube"])).toMatchObject({
      entry: "entry",
      styles: [],
      twitter: true,
      youtube: false,
    });
  });
});
