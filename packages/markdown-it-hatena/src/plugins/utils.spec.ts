import { HatenaNotation, parseHatenaNotation } from "./utils";

const fixtures: [string, HatenaNotation][] = [
  [
    "[https://github.com:embed]",
    { type: "link", url: "https://github.com", options: ["embed"] },
  ],
];

test("はてな記法のパース", () => {
  for (const [input, expected] of fixtures) {
    expect(parseHatenaNotation(input)).toMatchObject(expected);
  }
});
