import Cac from "../cac.js";

export default () => (cli: Cac) => {
  cli.on("parsed", (command) => {
    if (command && command.command.examples) {
      cli.extraHelp({
        title: "EXAMPLES",
        body: command.command.examples.join("\n"),
      });
    }
  });
};
