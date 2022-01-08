import fs from "fs";
import path from "path";

import express from "express";
import history from "connect-history-api-fallback";

import { md2frontmatter, md2html } from "./utils/transformers.js";
import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";
import { EntryAllResponse, EntryResponse } from "../common/types.js";

const dirname = path.dirname(new URL(import.meta.url).pathname);
const entryDir = path.join(process.cwd(), "entry");

export async function getEntry(
  req: express.Request,
  res: express.Response<EntryResponse>
) {
  const entry = fs.readFileSync(
    path.join(entryDir, `${req.params.slug}.md`),
    "utf-8"
  );
  const meta = await md2frontmatter(entry);
  const html = await md2html(entry);
  res.json({ html, meta });
}

export async function getEntryAll(
  _: express.Request,
  res: express.Response<EntryAllResponse>
) {
  const entryFiles = fs.readdirSync(entryDir);
  const entryMetaPromises = entryFiles.map(async (entryFile) => {
    const entryRaw = fs.readFileSync(path.join(entryDir, entryFile), "utf-8");
    return {
      slug: entryFile.split(".")[0],
      meta: await md2frontmatter(entryRaw),
    };
  });
  const entryMetas = await Promise.all(entryMetaPromises);
  const sortedEntryMetas = entryMetas.sort(
    (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
  res.json(sortedEntryMetas);
}

const main = async () => {
  const app = express();
  app.get(`/api/entry`, getEntryAll);
  app.get(`/api/entry/:slug`, getEntry);
  app.use(history());
  app.use(
    express.static(path.join(dirname, "..", "client"), {
      setHeaders: (res) => {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
      },
    })
  );
  const server = await startServer(app, port);
  await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
};

main();
