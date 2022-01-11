import fs from "fs";
import path from "path";
import type * as express from "express";
import { Router } from "express";
import { md2meta, md2html } from "@mkizka/blogview-utils";

import { EntryAllResponse, EntryResponse } from "../../common/types.js";

const entryDir = path.join(process.cwd(), "entry");
const entryRouter = Router();

entryRouter.get(
  "/",
  async (_: express.Request, res: express.Response<EntryAllResponse>) => {
    const entryFiles = fs.readdirSync(entryDir);
    const entryMetaPromises = entryFiles.map(async (entryFile) => {
      const entryRaw = fs.readFileSync(path.join(entryDir, entryFile), "utf-8");
      return {
        slug: entryFile.split(".")[0],
        meta: await md2meta(entryRaw),
      };
    });
    const entryMetas = await Promise.all(entryMetaPromises);
    const sortedEntryMetas = entryMetas.sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
    res.json(sortedEntryMetas);
  }
);

entryRouter.get(
  "/:slug",
  async (req: express.Request, res: express.Response<EntryResponse>) => {
    const entry = fs.readFileSync(
      path.join(entryDir, `${req.params.slug}.md`),
      "utf-8"
    );
    const meta = await md2meta(entry);
    const html = await md2html(entry);
    res.json({ html, meta });
  }
);

export { entryRouter };
