function getEntryId(path: string) {
  return path.replace("../../entry/", "").replace(".md", "");
}

export const entries = Object.entries(
  import.meta.globEager("../../entry/*.md")
).reduce((result, [path, { default: entry }]) => {
  const entryId = getEntryId(path);
  result[entryId] = entry;
  return result;
}, {} as { [entryId: string]: string });
