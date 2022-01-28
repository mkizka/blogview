#!/usr/bin/env node

import arg from "arg";

import { port } from "../common/config.js";
import { createApp } from "./api/app.js";
import { showHelp, showVersion } from "./utils/show.js";
import { getOptions } from "./utils/options.js";
import { startServer, startLocalChangesWatcher } from "./utils/server.js";

const args = arg(
  {
    "--help": Boolean,
    "-h": "--help",
    "--version": Boolean,
    "-v": "--version",
  },
  { permissive: true }
);

if (args["--help"]) {
  showHelp();
  process.exit(0);
}

if (args["--version"]) {
  showVersion();
  process.exit(0);
}

(async function () {
  const options = getOptions();
  const app = createApp(options);
  const server = await startServer(app, port);
  await startLocalChangesWatcher(server, `${process.cwd()}/entry/*.md`);
})();
