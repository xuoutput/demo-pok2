import { intro, outro, confirm, select, text } from "@clack/prompts";
import { pokemonList } from "../utils/pokemons.js";
import { listPokemons, randomPokemon, getPokemonById } from "./cli.js";

/** TODO: 后续可以优化为类似 lazygit 这种 */
export async function getInteractiveOptions() {
  intro("Welcome pokm interactive mode");
  const optionType = await select({
    message: "Pick a option.",
    options: [
      { value: "list", label: "List all" },
      { value: "random", label: "Random" },
      // { value: "name", label: "By name" },
      { value: "id", label: "By Id" },
    ],
  });
  if (optionType === "list") {
    const count = await text({
      message: "How many pokemons do you wan?",
      initialValue: "151",
      validate(value) {
        if (value <= 0 && value > 151) return `Value [1, 151]!`;
      },
    });
    listPokemons({ pokemonList, count: Number(count) });
  }
  if (optionType === "random") {
    randomPokemon();
  }
  // if (optionType === "name") {
  // }
  if (optionType === "random") {
    randomPokemon();
  }
  if (optionType === "id") {
    const id = await text({
      message: "Enter Id in [1, 151]?",
      initialValue: "1",
      validate(value) {
        if (value <= 0 && value > 151) return `Value [1, 151]!`;
      },
    });
    getPokemonById({ id: Number(id) });
  }

  /** 是否继续, 而不是一次性的 */
  const shouleAgain = await confirm({
    message: "Do you want to search again?",
  });
  if (shouleAgain) {
    await getInteractiveOptions();
  }
  outro("Bye~~~");
  return {};
}
