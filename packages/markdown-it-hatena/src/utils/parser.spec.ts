import { test, expect } from "vitest";
import { HatenaNotation, parseHatenaNotation } from "./parser";

const fixtures: [string, HatenaNotation[]][] = [
  [
    "[https://github.com:embed]",
    [
      {
        type: "link",
        url: "https://github.com",
        options: ["embed"],
        src: "[https://github.com:embed]",
      },
    ],
  ],
  [
    "前後に[https://github.com:embed]文字列",
    [
      {
        type: "text",
        src: "前後に",
      },
      {
        type: "link",
        url: "https://github.com",
        options: ["embed"],
        src: "[https://github.com:embed]",
      },
      {
        type: "text",
        src: "文字列",
      },
    ],
  ],
  // [ ]で囲まれていない記法は現状対応しない
  [
    "https://github.com:embed",
    [
      {
        type: "text",
        src: "https://github.com:embed",
      },
    ],
  ],
];

test("はてな記法のパース", () => {
  for (const [input, expected] of fixtures) {
    expect(parseHatenaNotation(input)).toMatchObject(expected);
  }
});
