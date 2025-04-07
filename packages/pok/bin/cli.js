"use strict";
import cac from "../src/index.js";

const cli = cac();
// Add a default command
const defaultCommand = cli.command(
  "*",
  {
    desc: "The default command",
  },
  (input, flags) => {
    if (flags.age) {
      console.log(`${input[0]} is ${flags.age} years old`);
    }
  }
);

defaultCommand.option("age", {
  desc: "tell me the age",
});
cli.extraHelp("dddde extra help");
// Add a sub command
cli
  .command(
    "bob",
    {
      desc: "Command for bob",
    },
    (input, flags) => {
      console.log("This is a command dedicated to bob!", input, flags);
    }
  )
  .option("force", { desc: "ffforce", alias: "f" });

cli.use((cli) => console.log("cli", cli));

cli.command(
  "ho",
  {
    desc: "Say hi!",
    alias: "hhh",
  },
  (input, flags) => {
    console.log("🚀 ~ input, flags:", input, flags);
  }
);
// Bootstrap the CLI app
cli.parse();
