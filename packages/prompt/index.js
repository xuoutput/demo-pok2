// Run `npm start` to start the demo
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
  group,
  multiselect,
  log,
} from "@clack/prompts";
import { setTimeout as sleep } from "node:timers/promises";
// import color from "picocolors";

async function main() {
  console.log();

  // log.info("Info!");
  // log.success("Success!");
  // log.step("Step!");
  // log.warn("Warn!");
  // log.error("Error!");
  // log.message("Hello, World", { symbol: "~" });

  // const groupRes = await group(
  //   {
  //     name: () => text({ message: "What is your name?" }),
  //     age: () => text({ message: "What is your age?" }),
  //     color: ({ results }) =>
  //       multiselect({
  //         message: `What is your favorite color ${results.name}?`,
  //         options: [
  //           { value: "red", label: "Red" },
  //           { value: "green", label: "Green" },
  //           { value: "blue", label: "Blue" },
  //         ],
  //       }),
  //   },
  //   {
  //     // On Cancel callback that wraps the group
  //     // So if the user cancels one of the prompts in the group this function will be called
  //     onCancel: ({ results }) => {
  //       console.log("cancel results", results);
  //       cancel("Operation group cancelled. result");
  //       process.exit(0);
  //     },
  //   }
  // );

  // console.log(groupRes.name, groupRes.age, groupRes.color);

  // intro(color.inverse(" create-my-app "));
  // intro("Welcome create-my-app ");

  const name = await text({
    message: "What is your name?",
    // placeholder: "", //会影响 validate 的校验, 绝了
    initialValue: "42",
    validate(value) {
      if (!value) return `Value is required!`;
    },
  });

  if (isCancel(name)) {
    cancel("Operation name cancelled");
    return process.exit(0);
  }

  const shouldContinue = await confirm({
    message: "Do you want to continue?",
  });

  if (isCancel(shouldContinue)) {
    cancel("Operation continue cancelled");
    return process.exit(0);
  }

  const projectType = await select({
    message: "Pick a project type.",
    options: [
      { value: "ts", label: "TypeScript" },
      { value: "js", label: "JavaScript" },
      { value: "coffee", label: "CoffeeScript", hint: "oh no" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation project cancelled");
    return process.exit(0);
  }

  const s = spinner();
  s.start("Installing via npm");

  await sleep(3000);

  s.stop("Installed via npm");

  // outro("You're all set!");

  await sleep(1000);
}

main().catch(console.error);
