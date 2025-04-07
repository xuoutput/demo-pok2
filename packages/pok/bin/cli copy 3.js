#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "url";
const program = new Command();

// 以下为模拟数据，实际使用时需替换为真实数据源
const pokemonList = [
  "pikachu",
  "charizard",
  "nidoran-f",
  "nidoran-m",
  "mr-mime",
  "farfetchd",
  "flabebe",
  "type-null",
];
// 定义宝可梦文件存储路径
// 获取当前模块路径
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POKEMON_DIR = path.join(__dirname, "../pokemons");

program
  .name("pok")
  .description("Display Pokémon ASCII art colorscripts")
  .version("1.8.0")
  .option("-l, --list", "List all Pokémon names")
  .option("-r, --random", "Show random Pokémon")
  .option("-n, --name <name>", "Specify Pokémon by name")
  .argument("[pokemonName]", "Pokémon name")
  .action(async (pokemonName, options) => {
    try {
      // 获取所有宝可梦文件名（不带扩展名）
      const files = await fs.readdir(POKEMON_DIR);
      const pokemonList = files
        .filter((file) => path.extname(file) === ".txt")
        .map((file) => path.basename(file, ".txt"));

      const activeOptions = [options.list, options.random, options.name].filter(
        Boolean
      ).length;

      // 校验互斥选项, 确保同时只能使用一个主要功能
      if (activeOptions > 1 || (activeOptions === 1 && pokemonName)) {
        console.error("Error: Cannot combine multiple options/arguments");
        program.help();
        process.exit(1);
      }
      /** -l 的情况 */
      if (options.list) {
        console.log("Available Pokémon:\n" + pokemonList.join("\n"));
        console.log("\nNote: Special names like nidoran-f, mr-mime etc.");
      }
      /** -r 的情况 */
      if (options.random) {
        const randomPokemon =
          pokemonList[Math.floor(Math.random() * pokemonList.length)];
        displayPokemon(randomPokemon);
      }
      /** -n 的情况 */
      if (options.name || pokemonName) {
        const targetName = options.name || pokemonName;

        if (!targetName) {
          program.help();
          return;
        }

        // 检查文件是否存在
        const filePath = path.join(POKEMON_DIR, `${targetName}.txt`);
        if (!(await fs.pathExists(filePath))) {
          throw new Error(`Pokémon "${targetName}" not found`);
        }
        // 读取并显示文件内容
        const content = await fs.readFile(filePath, "utf8");
        console.log(content);

        // if (pokemonList.includes(targetName)) {
        //   displayPokemon(targetName);
        // } else {
        //   console.error(`Error: Pokémon "${targetName}" not found. Use --list`);
        //   process.exit(1);
        // }
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
      console.log("Use --list to see available Pokémon");
      process.exit(1);
    }
  })
  .parse();

// 模拟显示函数
function displayPokemon(name) {
  const colorscript = `
  ╔═══╗
  ║ ${name.toUpperCase()} ║
  ╚═══╝
  `;
  console.log(colorscript);
}
