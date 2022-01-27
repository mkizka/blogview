import path from "path";
import arg from "arg";

import { loadJson } from "./helper.js";

const optionsDefault = {
  entry: "entry",
  styles: [] as string[],
  twitter: true,
  youtube: true,
};

export const args = arg(
  {
    "--help": Boolean,
    "-h": "--help",
    "--version": Boolean,
    "-v": "--version",
    "--config": String,
    "-c": "--config",
    "--entry": String,
    "-e": "--entry",
    "--style": [String],
    "--no-twitter": Boolean,
    "--no-youtube": Boolean,
  },
  { permissive: true }
);

function removeUndefinedField(obj: unknown) {
  return JSON.parse(JSON.stringify(obj)) as Record<string, any>;
}

const optionsFromArgs = removeUndefinedField({
  entry: args["--entry"],
  styles: args["--style"],
  twitter: args["--no-twitter"] && false,
  youtube: args["--no-youtube"] && false,
});

const optionsFromConfig = loadJson(
  path.join(process.cwd(), args["--config"] || "blogview.json")
);

export function getOptions() {
  return {
    ...optionsDefault,
    ...optionsFromConfig,
    ...optionsFromArgs,
  };
}
