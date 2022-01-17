export type BlogMeta = {
  categories: string[];
  date: string;
  draft: boolean;
  id: string;
  title: string;
};

export type EntryResponse = {
  html: string;
  meta: BlogMeta;
};

export type EntryAllResponse = {
  slug: string;
  meta: BlogMeta;
}[];

export type ConfigResponse = {
  styles: string[];
};
