#!/usr/bin/env node
import { readPackageJson } from "../utils/package.js";

async function setup() {
  const packegeJson = await readPackageJson();
  const { name, description, version } = packegeJson;

  const HELP_MESSAGE = `${name} ${version}
${description}

Usage: 
--help    Help documentation
--version Installed package version`;

  const options = process.argv.slice(2);
  if (options.includes("--version")) {
    console.log(version);
  } else {
    console.log(HELP_MESSAGE);
  }
}

setup();
