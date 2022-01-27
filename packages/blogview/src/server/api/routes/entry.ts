import fs from "fs";
import path from "path";
import type express from "express";
import { Router } from "express";

import MarkdownIt from "markdown-it";
import { markdownItHatena, HatenaPluginOptions } from "markdown-it-hatena";
import markdownItFrontMatter from "markdown-it-front-matter";
import yaml from "js-yaml";

import {
  BlogMeta,
  EntryAllResponse,
  EntryResponse,
} from "../../../common/types.js";

export type EntryRouterOptions = HatenaPluginOptions & {
  entry: string;
};

function readRelativeDir(dir: string) {
  try {
    return fs.readdirSync(path.join(process.cwd(), dir), "utf-8");
  } catch {
    return [];
  }
}

function readRelativeFile(...filepath: string[]) {
  try {
    return fs.readFileSync(path.join(process.cwd(), ...filepath), "utf-8");
  } catch {
    return null;
  }
}

function renderHatenaMarkdown(text: string, options: HatenaPluginOptions) {
  let meta: BlogMeta = {};
  const html = new MarkdownIt({ linkify: true, html: true })
    .use(markdownItHatena, options)
    .use(markdownItFrontMatter, (metaRaw) => {
      meta = yaml.load(metaRaw) as BlogMeta;
    })
    .render(text);
  return { html, meta };
}

export function entryRouter(options: EntryRouterOptions) {
  const router = Router();
  router.get(
    "/",
    async (_: express.Request, res: express.Response<EntryAllResponse>) => {
      const entryFiles = readRelativeDir(options.entry);
      const entryMetaPromises = entryFiles.map(async (entryFile) => {
        const entryRaw = readRelativeFile(options.entry, entryFile)!;
        return {
          slug: entryFile.split(".")[0],
          meta: renderHatenaMarkdown(entryRaw, options).meta,
        };
      });
      const entryMetas = await Promise.all(entryMetaPromises);
      const sortedEntryMetas = entryMetas.sort(
        (a, b) =>
          new Date(b.meta.date!).getTime() - new Date(a.meta.date!).getTime()
      );
      res.json(sortedEntryMetas);
    }
  );
  router.get(
    "/:slug",
    async (req: express.Request, res: express.Response<EntryResponse>) => {
      const entry = readRelativeFile(options.entry, `${req.params.slug}.md`);
      if (entry != null) {
        res.json(renderHatenaMarkdown(entry, options));
      } else {
        res.status(404).send();
      }
    }
  );
  return router;
}
