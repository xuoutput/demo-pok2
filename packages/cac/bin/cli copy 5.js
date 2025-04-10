"use strict";
import cac from "../src/index.js";

const cli = cac();
// cli
//   .command(
//     "*",
//     {
//       desc: "default command",
//     },
//     (input, flags) => {
//       console.log(flags);
//     }
//   )
//   .option("hi", {
//     alias: "hey",
//     desc: "say hi",
//     type: "string",
//     default: "wow",
//   });

// cli
//   .command("init", {
//     desc: "Init a project",
//   })
//   .option("force", {
//     alias: "f",
//     desc: "hello there!",
//   });

// initialize your cli program
// const cli = new cac();

// // show usage
// cli.usage("hello cc command name");

// add option
cli.option("n, name", "this is show name", "name defualt 111");
cli.option("m, message", "this is show message", "name defualt message");
cli.option("f, force", "this is force");

// add your very first command
cli.command("ho, hhh", "Say hi!", (input) => {
  console.log(`hi ${input[1] || "boy"}!`);
});
// .option("hi", {
//   alias: "hey",
//   desc: "say hi",
//   type: "string",
//   default: "wow",
// });
// sub command with file
cli.command("init", "Init a project").option("age", {
  desc: "tell me the age",
});
cli.command("nope", { desc: "should not exists" });

// show example
// cli
//   .example("lovely-command init lovely-project")
//   .example("lovely-command gh -p");

// fallback command
cli.command("*", "This is a wildcard command", (input, flag) => {
  console.log("whatever input", input, "flats", flag);
});

// 使用示例
// cli.on("error", (err) => {
//   console.error("[Custom Handler]", err);
// });

// // assert 为 string
// cli.string("m");

// // assert 为 boolean
// cli.boolean('f');

// parse arguments and bootstrap
cli.parse();
