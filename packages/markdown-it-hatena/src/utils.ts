export function parseHatenaNotation(text: string) {
  const matched = /^\[(?<url>.*?)(?<labels>(:\w+)*)\]$/g.exec(text);
  if (matched) {
    return {
      url: matched.groups!.url,
      labels: matched.groups!.labels.split(":").filter(Boolean),
    };
  }
  return null;
}
