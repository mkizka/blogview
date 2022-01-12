import { parseHatenaNotation } from "./utils";

test("はてな記法のパース", () => {
  const parsed = parseHatenaNotation("[https://github.com:embed]");
  expect(parsed).toMatchObject({
    url: "https://github.com",
    labels: ["embed"],
  });
});

test("複数記法のパース", () => {
  const parsed = parseHatenaNotation("[https://github.com:embed:cite]");
  expect(parsed).toMatchObject({
    url: "https://github.com",
    labels: ["embed", "cite"],
  });
});

test("パース出来なければnullを返す", () => {
  const parsed = parseHatenaNotation("https://github.com:embed");
  expect(parsed).toBeNull();
});
