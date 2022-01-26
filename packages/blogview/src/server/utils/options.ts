import fs from "fs";
import path from "path";
import arg from "arg";

const args = arg(
  {
    "--help": Boolean,
    "-h": "--help",
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

function loadJson(filepath: string) {
  const text = fs.readFileSync(filepath, "utf-8");
  try {
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
}

export function getOptions() {
  const configPath = path.join(
    process.cwd(),
    args["--config"] || "blogview.json"
  );
  return {
    entry: args["--entry"] || "entry",
    styles: args["--style"] || [],
    twitter: !args["--no-twitter"],
    youtube: !args["--no-youtube"],
    ...(loadJson(configPath) as {}),
  };
}
