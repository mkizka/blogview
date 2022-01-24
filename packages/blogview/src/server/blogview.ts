#!/usr/bin/env node
import cac from "cac";

import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";
import { createApp, AppOptions } from "./api/app.js";

const cli = cac();

cli.option("-c, --config <path>", "設定ファイルを指定", {
  default: "blogview.json",
});

cli //
  .command("")
  .action(async (options: AppOptions) => {
    const app = createApp(options);
    const server = await startServer(app, port);
    await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
  });

cli.help();

cli.parse();
