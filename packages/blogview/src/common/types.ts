export type Frontmatter = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export type EntryResponse = {
  html: string;
  meta: Frontmatter;
};

export type EntryAllResponse = {
  slug: string;
  meta: Frontmatter;
}[];
