import fs from "fs";
import path from "path";

import express from "express";
import history from "connect-history-api-fallback";

import { md2frontmatter, md2html } from "./utils/transformers.js";
import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";

const dirname = path.dirname(new URL(import.meta.url).pathname);
const entryDir = path.join(process.cwd(), "entry");

export async function getEntry(req: express.Request, res: express.Response) {
  const entry = fs.readFileSync(
    path.join(entryDir, `${req.params.slug}.md`),
    "utf-8"
  );
  const meta = await md2frontmatter(entry);
  const html = await md2html(entry);
  res.json({ html, meta });
}

export async function getEntryAll(req: express.Request, res: express.Response) {
  const entryDir = path.join(process.cwd(), "entry");
  const entries = fs.readdirSync(entryDir);
  const entry = fs.readFileSync(
    path.join(process.cwd(), "entry", entries[0]),
    "utf-8"
  );
  const html = await md2html(entry);
  res.json({ article: html });
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
