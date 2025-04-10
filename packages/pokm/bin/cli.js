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
  .option("--id <id>", "Specify Pokemon by id")
  .option("-t, --type [...types]", "Specify Pokemon by type");

cli.command("", "default global command").action((options) => {
  /**
   * -l 的情况
   * - 区分 boolean, number, string 的情况
   */
  if (options.list) {
    if (typeof options.list === "boolean") {
      return listPokemons();
    }
    if (typeof options.list === "number" && options.list > 0) {
      return listPokemons({ count: options.list });
    }
    console.error(`Error: Pokémon list count`);
  }
  /** -r 的情况 */
  if (options.random) {
    return randomPokemon();
  }
  /** -n 的情况 */
  if (options.name) {
    return getPokemonByName({ name: options.name });
  }
  /** --id 的情况 */
  if (options.id) {
    if (typeof options.id === "number" && options.id > 0 && options.id <= 151) {
      return getPokemonById({ id: options.id });
    }
    console.error(`Error: Pokémon id type`);
  }
});

cli.parse();

export function listPokemons({ count } = {}) {
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

function getPokemonById({ id } = {}) {
  const pokemon = pokemonList.find((item) => item.id === id);
  if (pokemon) {
    displayPokemon(pokemon);
  } else {
    console.error(`Error: Pokémon "${id}" not found. Use --list`);
    process.exit(1);
  }
}
