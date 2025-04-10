"use strict";
import sleep from "then-sleep";
import cac from "../index.js";

const cli = new cac(
  `
  Usage:
    node example.js create <filename> -m [content]
    
  Commands:
    c, create           Create a file with specific content
    
  Options:
    -m, --message       File content
    -h, --help          Print help (You are here!)
`,
  {
    alias: {
      m: "message",
      h: "help",
    },
  }
);

cli.command("c, create", function* () {
  const fileName = this.input[1];
  const content = this.flags.message;
  // yield fs.createFile(fileName, "hello");
  console.log("Done!", fileName, content);
});

cli.command("init", function () {
  console.log(this);
});

cli.command("run", function* () {
  console.log("running...");
  yield sleep(2000);
  console.log("bye");
});

cli.command("*", function () {
  console.log("everything else");
});

cli.parse();
