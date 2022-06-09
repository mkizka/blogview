import assert from "assert";
import { getMetaFromText } from "./meta";

const contentWithValidMeta = `---
foo: bar
bar:
  - baz
---
text
`;

const contentWithInvalidMeta = `---
foo: bar
bar
  - baz
---
text
`;

const contentWithoutMeta = `---
text
`;

test("getMetaFromText", () => {
  assert.deepStrictEqual(getMetaFromText(contentWithValidMeta), {
    foo: "bar",
    bar: ["baz"],
  });
  assert.equal(getMetaFromText(contentWithInvalidMeta), null);
  assert.equal(getMetaFromText(contentWithoutMeta), null);
});
