import { PokemonDatabase } from "../data/pokemonDatabase";
import { Pokemon, PokemonDTO } from "../model/pokemonModel";

export class PokemonBusiness {
  constructor(private pokemonDatabase: PokemonDatabase) {}

  async getPokemon(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
    if (!data.page) {
      data.page = 1;
    }
    if (isNaN(Number(data.page))) {
      throw new Error("page must be a number");
    }
    if (!data.limit) {
      data.limit = 10;
    }
    if (isNaN(Number(data.limit))) {
      throw new Error("limit must be a number");
    }
    data.offset = Number(data.limit) * (Number(data.page) - 1);
    return this.pokemonDatabase.getPokemons(data);
  }
  async getPokemonByGen(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
        if (!data.page) {
          data.page = 1;
        }
        if (isNaN(Number(data.page))) {
          throw new Error("page must be a number");
        }
        if (!data.limit) {
          data.limit = 10;
        }
        if (isNaN(Number(data.limit))) {
          throw new Error("limit must be a number");
        }
        data.offset = Number(data.limit) * (Number(data.page) - 1);
    return this.pokemonDatabase.searchByGen(data);
  }
  async getPokemonByType(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
        if (!data.page) {
          data.page = 1;
        }
        if (isNaN(Number(data.page))) {
          throw new Error("page must be a number");
        }
        if (!data.limit) {
          data.limit = 10;
        }
        if (isNaN(Number(data.limit))) {
          throw new Error("limit must be a number");
        }
        data.offset = Number(data.limit) * (Number(data.page) - 1);
    return this.pokemonDatabase.searchByType(data);
  }
  async getPokemonByName(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
    return this.pokemonDatabase.searchByName(data);
  }
}
