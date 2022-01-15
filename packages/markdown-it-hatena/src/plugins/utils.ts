import UrlRegex from "url-regex";

const urlRegex = UrlRegex({ exact: true });

export type HatenaNotationLink = {
  type: "link";
  url: string;
  options: string[];
};

export type HatenaNotationContents = {
  type: "contents";
};

export type HatenaNotation = HatenaNotationLink | HatenaNotationContents;

export function parseHatenaNotation(text: string): HatenaNotation | null {
  const innerText =
    text.startsWith("[") && text.endsWith("]")
      ? text.slice(1, text.length - 1)
      : text;
  const splitted = innerText.split(":");
  // https://help.hatenablog.com/entry/editor/advlink
  const maybeUrl = splitted.slice(0, 2).join(":");
  if (
    maybeUrl.match("^https?://") &&
    urlRegex.test(maybeUrl) // :で区切られてしまっているため
  ) {
    return {
      type: "link",
      url: maybeUrl,
      options: splitted.slice(2),
    };
  }
  if (text == "[:contents]") {
    return {
      type: "contents",
    };
  }
  return null;
}
