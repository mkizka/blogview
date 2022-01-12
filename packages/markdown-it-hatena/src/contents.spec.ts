import * as MarkdownIt from "markdown-it";
import { contentsPlugin } from "./contents";

const md = new MarkdownIt().use(contentsPlugin);

const contents = `[:contents]
# 見出し1
## 見出し2
### 見出し3
`;

test("目次記法[:contents]の対応", () => {
  expect(md.render(contents)).toMatchSnapshot();
});
