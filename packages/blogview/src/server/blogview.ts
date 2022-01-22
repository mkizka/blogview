#!/usr/bin/env node
import { startLocalChangesWatcher, startServer } from "./utils/server.js";
import { port } from "../common/config.js";
import { createApp } from "./api/app.js";

const main = async () => {
  const app = createApp();
  const server = await startServer(app, port);
  await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
};

main();
