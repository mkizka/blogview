import { contentsPlugin } from "./contents";
import { createMarkdownIt } from "./utils";

const md = createMarkdownIt().use(contentsPlugin);

const contents = `[:contents]
# 見出し1
## 見出し2
### 見出し3
#### 見出し4
##### 見出し5
###### 見出し6
`;

test("目次記法[:contents]の対応", () => {
  expect(md.render(contents)).toMatchSnapshot();
});
