"use strict";
import cac from "../dist/index.js";

const cli = cac();

cli.option("--type [type]", "Choose a project type", {
  default: "node",
});
cli.option("--name <name>", "Provide your name");

cli.command("lint [...files]", "Lint files").action((files, options) => {
  console.log("lint action => ", files, options);
});

cli.help();
cli.version("0.0.0");

cli.command("", "fallback").action((options) => {
  console.log("fallback => ", options);
});

cli.parse();
