import fs from "fs";
import path from "path";

export function loadJson(filepath: string) {
  const text = fs.readFileSync(filepath, "utf-8");
  try {
    return JSON.parse(text) as Record<string, any>;
  } catch (e) {
    return null;
  }
}

export const dirname = path.dirname(new URL(import.meta.url).pathname);
