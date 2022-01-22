#!/usr/bin/env node
import cac from "cac";

import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";
import { createApp } from "./api/app.js";

const cli = cac();

cli //
  .command("")
  .action(async () => {
    const app = createApp();
    const server = await startServer(app, port);
    await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
  });

cli.help();

cli.parse();
