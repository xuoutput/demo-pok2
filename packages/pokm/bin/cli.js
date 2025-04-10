import cac from "cac";
import { pokemonList } from "../utils/pokemons.js";

const cli = cac("pokm");
/** 添加 help 和 version */
cli.help().version("1.1.1");

/** 添加 gloabl command options */
cli
  .option("-l, --list", "List all pokemons")
  .option("-r, --random", "Show random pokemon")
  .option("-n, --name [name]", "Specify Pokemon by name")
  .option("--id <id>", "Specify Pokemon by id")
  .option("-t, --type [...types]", "Specify Pokemon by type");

cli.command("", "default global command").action((options) => {
  /** -l 的情况 */
  if (options.list) {
    return listPokemons();
  }
  /** -r 的情况 */
  if (options.random) {
    return randomPokemon();
  }
  /** -n 的情况 */
  if (options.name) {
    return getPokemonByName({ name: options.name });
  }
});

cli.parse();

export function listPokemons() {
  const pokemonNameList = pokemonList.map((item) => item.name);
  /** TODO: 改为 table 的形式 */
  console.log("Available Pokémon:\n" + pokemonNameList.join("\n"));
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
