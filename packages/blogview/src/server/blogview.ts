#!/usr/bin/env node

import path from "path";

import express from "express";
import history from "connect-history-api-fallback";

import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";
import { entryRouter } from "./api/entry.js";
import { configRouter } from "./api/config.js";

const dirname = path.dirname(new URL(import.meta.url).pathname);

const main = async () => {
  const app = express();
  app.use(`/api/entry`, entryRouter);
  app.use(`/api/config`, configRouter);
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
