import path from "path";
import arg from "arg";

import { loadJson } from "./helper.js";

export const optionsDefault = {
  entry: "entry",
  styles: [] as string[],
  twitter: true,
  youtube: true,
};

function removeUndefinedField(obj: unknown) {
  return JSON.parse(JSON.stringify(obj)) as Record<string, any>;
}

export type Options = typeof optionsDefault;

export function getOptions(argv?: string[]) {
  const args = arg(
    {
      "--config": String,
      "-c": "--config",
      "--entry": String,
      "-e": "--entry",
      "--style": [String],
      "--no-twitter": Boolean,
      "--no-youtube": Boolean,
    },
    { permissive: true, argv }
  );

  const optionsFromArgs = removeUndefinedField({
    entry: args["--entry"],
    styles: args["--style"],
    twitter: args["--no-twitter"] && false,
    youtube: args["--no-youtube"] && false,
  });

  const optionsFromConfig = loadJson(
    path.join(process.cwd(), args["--config"] || "blogview.json")
  );

  return {
    ...optionsDefault,
    ...optionsFromConfig,
    ...optionsFromArgs,
  };
}
