import vscode from "vscode";
import yaml from "js-yaml";
import { BlogMeta } from "markdown-it-hatena";

function getMetaFromText(content: string) {
  const lines = [];
  let isMeta = false;
  for (const line of content.split("\n")) {
    if (line.startsWith("---")) {
      isMeta = lines.length == 0;
    }
    if (isMeta) lines.push(line);
  }
  return lines.slice(1).join("\n");
}

export async function getMetaFromFile(uri: vscode.Uri) {
  const content = await vscode.workspace.fs.readFile(uri);
  const metaText = getMetaFromText(content.toString());
  try {
    return yaml.load(metaText) as BlogMeta;
  } catch {
    return null;
  }
}
