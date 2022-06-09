import yaml from "js-yaml";
import { BlogMeta } from "markdown-it-hatena";

export function getMetaFromText(content: string) {
  const lines = [];
  let isMeta = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("---")) {
      isMeta = lines.length == 0;
    }
    if (isMeta) lines.push(line);
  }
  const metaText = lines.slice(1).join("\n");
  try {
    const meta = yaml.load(metaText);
    return typeof meta == "object" ? (meta as BlogMeta) : null;
  } catch {
    return null;
  }
}
