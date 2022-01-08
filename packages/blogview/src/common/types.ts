export type Frontmatter = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export type Entry = {
  html: string;
  meta: Frontmatter;
};
