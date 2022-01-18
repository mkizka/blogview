export function isTwitter(url: string) {
  return /^https:\/\/twitter\.com\/\S+?\/status/.test(url);
}

export function isYouTube(url: string) {
  return /^https:\/\/www\.youtube\.com\/watch/.test(url);
}
