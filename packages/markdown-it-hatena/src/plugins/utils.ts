import UrlRegex from "url-regex";

const urlRegex = new RegExp(UrlRegex().source, "i");

type HatenaNotationBase = {
  type: string;
  src: string;
};

export type HatenaNotationLink = HatenaNotationBase & {
  type: "link";
  url: string;
  options: string[];
};

export type PlainText = HatenaNotationBase & {
  type: "text";
};

export type HatenaNotation = HatenaNotationLink | PlainText;

export function parseHatenaNotation(text: string): HatenaNotation[] {
  const result = [""];
  for (const char of text) {
    switch (char) {
      case "[":
        result.push(char);
        break;
      case "]":
        result[result.length - 1] += char;
        result.push("");
        break;
      default:
        result[result.length - 1] += char;
        break;
    }
  }
  return result.filter(Boolean).map(parse);
}

function parse(src: string): HatenaNotation {
  // [ ]で囲まれているもののみはてな記法として扱う
  if (src.startsWith("[") && src.endsWith("]")) {
    const innerText = src.slice(1, src.length - 1);
    const splitted = innerText.split(":");
    // https://help.hatenablog.com/entry/editor/advlink
    const maybeUrl = splitted.slice(0, 2).join(":"); // "https://"が区切られてしまっているため
    if (urlRegex.test(maybeUrl)) {
      return {
        type: "link",
        url: maybeUrl,
        options: splitted.slice(2),
        src,
      };
    }
  }
  return {
    type: "text",
    src,
  };
}
