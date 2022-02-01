import path from "path";
import Mocha from "mocha";
import glob from "glob";

async function globby(pattern: string) {
  return new Promise<string[]>((resolve) => {
    glob(pattern, (_, matches) => resolve(matches));
  });
}

export async function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: "tdd",
    color: true,
  });
  const files = await globby(path.join(__dirname, "../dist-test/**/*.spec.js"));
  for (const file of files) {
    mocha.addFile(file);
  }
  await new Promise<void>((resolve, reject) => {
    mocha.run((failures) => {
      if (failures > 0) {
        reject(new Error(`${failures} tests failed.`));
      }
      resolve();
    });
  });
}
