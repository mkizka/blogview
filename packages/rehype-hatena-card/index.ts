import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element } from "hast";

function getHatenaParams(text: string) {
  const matched = /\[(?<url>.*?)(?<labels>(:\w+)*)\]/g.exec(text);
  if (matched) {
    return {
      url: matched.groups!.url,
      labels: matched.groups!.labels.split(":").filter(Boolean),
    };
  }
  return null;
}

export const rehypeHatenaCard: Plugin<any, Element, Element> = () => {
  return async (tree) => {
    visit(tree, "element", (node) => {
      node.children = node.children.map((child) => {
        if (child.type == "text") {
          const params = getHatenaParams(child.value);
          if (params?.labels.includes("embed")) {
            return {
              type: "element",
              tagName: "iframe",
              children: [],
              properties: {
                src: `https://hatenablog-parts.com/embed?url=${params.url}`,
                scrolling: "no",
                frameborder: "0",
                style:
                  "display: block; width: 100%; height: 155px; max-width: 500px; margin: 10px 0px;",
              },
            };
          }
        }
        return child;
      });
    });
  };
};
