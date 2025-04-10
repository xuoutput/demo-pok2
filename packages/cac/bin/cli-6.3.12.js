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

cli
  .command("rm <dir>")
  .option("-r, --recursive", "Remove recursively")
  .action((dir, options) => {
    console.log("remove " + dir + (options.recursive ? " recursively" : ""));
  });

cli.help();
cli.version("0.0.0");

cli.command(" [...dd]", "fallback").action((dd, options) => {
  console.log("fallback => ", dd, options);
});

// cli.outputHelp(true)

cli.parse();

// console.log(JSON.stringify(parsed, null, 2));
