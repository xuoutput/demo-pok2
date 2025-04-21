#!/usr/bin/env node

// @ts-check
const fs = require("fs");
const path = require("path");
const argv = require("minimist")(process.argv.slice(2));
const { prompt } = require("enquirer");

const cwd = process.cwd();
console.log("🚀 ~ cwd:", cwd);

const renameFiles = {
  _gitignore: ".gitignore",
};

async function init() {
  let targetDir = argv._[0];
  // console.log("🚀 ~ init ~ targetDir:", targetDir, "argv", argv);
  if (!targetDir) {
    /**
     * @type {{ name: string }}
     */
    const { name } = await prompt({
      type: "input",
      name: "name",
      message: `Project name:`,
      initial: "vite-project",
    });
    targetDir = name;
  }
  /** 可以多级目录输入 */
  // console.log("targetDir", targetDir);
  // 完整目标路径拼接（支持多级目录）
  const root = path.join(cwd, targetDir);
  console.log(`Scaffolding project in ${root}...`);

  // 检查目录存在性
  if (!fs.existsSync(root)) {
    // 递归创建多级目录（关键参数 recursive: true）
    fs.mkdirSync(root, { recursive: true });
  } else {
    // 检查目录是否非空
    const existing = fs.readdirSync(root);
    console.log("🚀 ~ init ~ existing:", existing);
    if (existing.length) {
      /**
       * @type {{ yes: boolean }}
       */
      const { yes } = await prompt({
        type: "confirm",
        name: "yes",
        initial: "Y",
        message:
          `Target directory ${targetDir} is not empty.\n` +
          `Remove existing files and continue?`,
      });
      if (yes) {
        emptyDir(root);
      } else {
        return;
      }
    }
  }

  // determine template
  let template = argv.t || argv.template;
  /** INFO: 可能无选项值, 是 true 的 bug, 后面拼接会成为 template-true, 也没有校验是否在 choices 中 */
  if (!template) {
    /**
     * @type {{ t: string }}
     */
    const { t } = await prompt({
      type: "select",
      name: "t",
      message: `Select a template:`,
      choices: ["vanilla", "vue", "vue-ts", "react", "react-ts"],
    });
    template = t;
  }
  const templateDir = path.join(__dirname, `template-${template}`);

  const write = (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  console.log("🚀 ~ init ~ files:", files);
  /** 除了 package.json 的都复制过去 */
  for (const file of files.filter((f) => f !== "package.json")) {
    write(file);
  }

  /** package.json 的 name 调整后再复制过去 */
  const pkg = require(path.join(templateDir, `package.json`));
  pkg.name = path.basename(root);
  write("package.json", JSON.stringify(pkg, null, 2));

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log(`  npm install (or \`yarn\`)`);
  console.log(`  npm run dev (or \`yarn dev\`)`);
  console.log();
}

function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

init().catch((e) => {
  console.error(e);
});
