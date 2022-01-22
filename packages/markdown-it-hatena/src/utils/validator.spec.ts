import { test, expect } from "vitest";
import { isTwitter, isYouTube } from "./validator";

const fixturesTwitter: [string, boolean][] = [
  ["https://twitter.com/screen_name/status/12345", true],
  ["https://twitter.com/screen_name", false],
  ["https://twitter.com", false],
];

const fixturesYouTube: [string, boolean][] = [
  ["https://www.youtube.com/watch?v=12345", true],
  ["https://www.youtube.com", false],
];

test("TwitterのURL判定", () => {
  for (const [input, expected] of fixturesTwitter) {
    expect(isTwitter(input)).toBe(expected);
  }
});

test("YouTubeのURL判定", () => {
  for (const [input, expected] of fixturesYouTube) {
    expect(isYouTube(input)).toBe(expected);
  }
});
