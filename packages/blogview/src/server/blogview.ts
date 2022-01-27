#!/usr/bin/env node

import { port } from "../common/config.js";
import { createApp } from "./api/app.js";
import { getOptions } from "./utils/options.js";
import { startServer, startLocalChangesWatcher } from "./utils/server.js";

async function main() {
  const options = getOptions();
  console.log(options);
  const app = createApp(options);
  const server = await startServer(app, port);
  await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
}

main();
