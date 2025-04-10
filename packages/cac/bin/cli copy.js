#!/usr/bin/env node

import { readPackageJson } from "../utils/package.js";
// import packageJson from "../package.json" assert { type: "json" };
import { cac } from "cac";

const cli = cac();

try {
  // Parse CLI args without running the command
  cli
    .command("rm <dir>", "Remove a dir")
    .option("-r, --recursive", "Remove recursively")
    .action((dir, options) => {
      console.log("remove " + dir + (options.recursive ? " recursively" : ""));
    });

  cli
    .command("dev", "Start dev server")
    .option("--clear-screen", "Clear screen")
    .action((options) => {
      console.log(options.clearScreen);
    });

  cli
    .command("deploy <folder>", "Deploy a folder to AWS")
    .option("--scale [level]", "Scaling level")
    .action((folder, options) => {
      console.log("🚀 ~ .action ~ folder, options:", folder, options);
    });

  // cli
  //   .command("build [project]", "Build a project")
  //   .option("--out <dir>", "Output directory")
  //   .option("--no-config", "Disable config file")
  //   .option("--config <path>", "Use a custom config file")
  //   .action((folder, options) => {
  //     console.log("🚀 ~ .action ~ folder, options:", folder, options);
  //   });
  // cli
  //   .command("build <entry> [...otherFiles]", "Build your app")
  //   .option("--foo", "Foo option")
  //   .action((entry, otherFiles, options) => {
  //     console.log(entry);
  //     console.log(otherFiles);
  //     console.log(options);
  //   });

  cli
    .command("build", "desc")
    .option("--env <env>", "Set envs")
    .example("--env.API_SECRET xxx")
    .action((options) => {
      console.log(options);
    });

  // cli
  //   // Simply omit the command name, just brackets
  //   .command("[...files]", "Build files")
  //   // .option("--minimize", "Minimize output")
  //   .option("--include [..ss]", "Minimize output")
  //   .action((files, options) => {
  //     console.log(files);
  //     console.log(options.include);
  //   });

  cli.help();

  // cli.parse();

  // cli.option("--type <type>", "Choose a project type", {
  //   default: "node",
  // });
  // cli.option("--name <name>", "Provide your name");

  // cli.command("lint [...files]", "Lint files").action((files, options) => {
  //   console.log(files, options);
  // });

  // // Display help message when `-h` or `--help` appears
  // cli.help();
  // // Display version number when `-v` or `--version` appears
  // // It's also used in help message
  // cli.version("0.0.1");

  // const parsed = cli.parse();

  // // console.log(JSON.stringify(parsed, null, 2));
  cli.parse(process.argv, { run: false });
  // Run the command yourself
  // You only need `await` when your command action returns a Promise
  await cli.runMatchedCommand();
} catch (error) {
  // Handle error here..
  // e.g.
  console.error("error", error.stack);
  process.exit(1);
}
// async function setup() {
//   const { name, version, description } = await readPackageJson();
//   console.log("Package name:", name);
//   console.log("Version:", version);
//   console.log("description:", description);
// }

// setup();
