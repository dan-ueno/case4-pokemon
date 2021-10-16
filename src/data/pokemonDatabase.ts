import { Pokemon, PokemonDTO } from "../model/pokemonModel";
import { BaseDatabase } from "./baseDatabase";

export class PokemonDatabase extends BaseDatabase {
  static TABLE_NAME = "pokemon_table";

  async getPokemons(data: PokemonDTO): Promise<Pokemon[]> {
    const limit = Number(data.limit);
    const offset = Number(data.offset);
    let result;
    try {
      result = await this.getConnection()
        .select("*")
        .from(PokemonDatabase.TABLE_NAME)
        .limit(limit)
        .offset(offset);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      if (result instanceof Array) {
        return result.map((category: any) => {
          return Pokemon.toPokemonModel(category);
        });
      }
      return [];
    }
  }

  async searchByName(data: PokemonDTO): Promise<Pokemon> {
    const name = data.name;
    let result: any;
    try {
      result = await this.getConnection()
        .select("*")
        .from(PokemonDatabase.TABLE_NAME)
        .where({ name });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      return Pokemon.toPokemonModel(result[0]);
    }
  }

  async searchByGen(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
    const generation = Number(data.generation);
    const limit = Number(data.limit);
    const offset = Number(data.offset);
    let result: any;
    try {
      result = await this.getConnection()
        .select("*")
        .from(PokemonDatabase.TABLE_NAME)
        .where({ generation })
        .limit(limit)
        .offset(offset);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      if (result instanceof Array) {
        return result.map((poke) => {
          return Pokemon.toPokemonModel(poke);
        });
      }
      return Pokemon.toPokemonModel(result[0]);
    }
  }

  async searchByType(data: PokemonDTO): Promise<Pokemon | Pokemon[]> {
    const type1 = data.type1;
    const type2 = data.type1;
    const limit = Number(data.limit);
    const offset = Number(data.offset);
    let result: any;
    try {
      result = await this.getConnection()
        .select("*")
        .from(PokemonDatabase.TABLE_NAME)
        .where({ type1 })
        .orWhere({ type2 })
        .limit(limit)
        .offset(offset);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      if (result instanceof Array) {
        return result.map((poke) => {
          return Pokemon.toPokemonModel(poke);
        });
      }
      return Pokemon.toPokemonModel(result[0]);
    }
  }
}
