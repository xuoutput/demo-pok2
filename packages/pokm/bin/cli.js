import cac from "cac";
import { pokemonList } from "../utils/pokemons.js";
import Table from "cli-table3";

const cli = cac("pokm");
/** 添加 help 和 version */
cli.help().version("1.1.1");

/** 添加 gloabl command options */
cli
  .option("-l, --list [count]", "List all pokemons")
  .option("-r, --random", "Show random pokemon")
  .option("-n, --name <name>", "Specify Pokemon by name")
  .option("--fuzzy", "Specify fuzzy Pokemon by name")
  .option("--id <id>", "Specify Pokemon by id")
  .option("-t, --type [...types]", "Specify Pokemon by type");

cli.command("", "default global command").action((options) => {
  /**
   * -l 的情况
   * - 区分 boolean, number, string 的情况
   */
  if (options.list) {
    if (typeof options.list === "boolean") {
      return listPokemons({ pokemonList });
    }
    if (typeof options.list === "number" && options.list > 0) {
      return listPokemons({ pokemonList, count: options.list });
    }
    console.error(`Error: Pokémon list count`);
  }
  /** -r 的情况 */
  if (options.random) {
    return randomPokemon();
  }
  /** -n 的情况 */
  if (options.name) {
    if (typeof options.name === "string") {
      if (typeof options.fuzzy === "boolean") {
        return fuzzySearchByName({ name: options.name });
      }
      return getPokemonByName({ name: options.name });
    }
    /** INFO: 也可以不用, 在 getPokemonByName 也有兜底的 */
    console.error(`Error: Pokémon name type`);
  }
  /** --id 的情况 */
  if (options.id) {
    if (typeof options.id === "number" && options.id > 0 && options.id <= 151) {
      return getPokemonById({ id: options.id });
    }
    console.error(`Error: Pokémon id type`);
  }
  /**
   * -t 的情况, 但需要调整源数据结构, 如果为了效率, 尤其是有多 type 的情况下
   * 然后如果要组合结果, 模糊的 --name 或 random, 不借助数据库, 自己实现
   */
});

cli.parse();

export function listPokemons({ pokemonList, count } = {}) {
  const pokemonNameList = pokemonList
    .map(({ id, name }) => [`${id}`, name])
    .slice(0, count);

  const table = new Table({
    head: ["id", "name"],
    colWidths: [10, 30],
  });
  table.push(...pokemonNameList);

  console.log("Available Pokémon:\n");
  console.log(table.toString());
  console.log("\nNote: Special names like nidoran-f, mr-mime etc.");
}

export function randomPokemon() {
  const randomPokemon =
    pokemonList[Math.floor(Math.random() * pokemonList.length)];
  displayPokemon(randomPokemon);
}

function displayPokemon(pokemon) {
  console.log(pokemon.name);
}

function getPokemonByName({ name }) {
  const pokemon = pokemonList.find((item) => item.name === name);
  if (pokemon) {
    displayPokemon(pokemon);
  } else {
    console.error(`Error: Pokémon "${name}" not found. Use --list`);
    process.exit(1);
  }
}

function fuzzySearchByName({ name }) {
  // 处理搜索关键词：去除首尾空格 + 转为小写
  const searchTerm = name.trim().toLowerCase();

  // 空关键词时返回全部列表（根据需求可改为返回空数组）
  if (!searchTerm) return "empty name";

  const filterdList = pokemonList.filter((pokemon) => {
    // 将 Pokémon 名称转为小写后检查是否包含关键词
    return pokemon.name.toLowerCase().includes(searchTerm);
  });
  /**
   * 使用 table 展示
   * TODO: 合并精确搜索和模糊, 
   * TODO: 增加数量控制, 但 -n 被当做 name 而不是 count
   * 增加 --fuzzy boolean 字段
   */
  listPokemons({ pokemonList: filterdList });
}

function getPokemonById({ id } = {}) {
  const pokemon = pokemonList.find((item) => item.id === id);
  if (pokemon) {
    displayPokemon(pokemon);
  } else {
    console.error(`Error: Pokémon "${id}" not found. Use --list`);
    process.exit(1);
  }
}
