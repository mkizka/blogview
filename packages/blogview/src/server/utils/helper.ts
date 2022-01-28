import fs from "fs";
import path from "path";

export function loadJson(filepath: string) {
  try {
    const text = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(text) as Record<string, any>;
  } catch (e) {
    return null;
  }
}

const dirname = path.dirname(new URL(import.meta.url).pathname);

const pkgRootDir = path.join(dirname, "..", "..", "..");

export function pkgPath(filepath: string) {
  return path.join(pkgRootDir, filepath);
}
