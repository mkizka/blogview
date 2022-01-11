import { BlogMeta } from "@mkizka/blogview-utils";

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
