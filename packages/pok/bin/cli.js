#!/usr/bin/env node
const { description, name, version } = require("../package.json");

const options = process.argv.slice(2);

const HELP_MESSAGE = `${name} ${version}
${description}

Usage: 
--help    Help documentation
--version Installed package version`;

if (options.includes("--version")) {
  console.log(version);
} else {
  console.log(HELP_MESSAGE);
}
