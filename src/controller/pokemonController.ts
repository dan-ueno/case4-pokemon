import { Request, Response } from "express";
import { PokemonBusiness } from "../business/pokemonBusiness";
import { BaseDatabase } from "../data/baseDatabase";
import { BaseError } from "../error/BaseError";
import { PokemonDTO } from "../model/pokemonModel";

export class CategoryController {
  constructor(private pokemonBusiness: PokemonBusiness) {}
  //as all the queries will be made at the same endpoint, just switching query params, some validations are made at this layer
  async getPokemon(req: Request, res: Response) {
    try {
      const { name, generation, type, page, limit } = req.query;

      const categoryData: PokemonDTO = {
        name: name as string,
        generation: generation as string,
        type1: type as string,
        page: page as string,
        limit: limit as string,
      };

      let getData;
      //order: name > gen > type > all pokemon
      if (name) {
        getData = await this.pokemonBusiness.getPokemonByName(categoryData);
      } else if (generation) {
        getData = await this.pokemonBusiness.getPokemonByGen(categoryData);
      } else if (type) {
        getData = await this.pokemonBusiness.getPokemonByType(categoryData);
      } else {
        getData = await this.pokemonBusiness.getPokemon(categoryData);
      }

      res.status(200).send(getData);
    } catch (error) {
      if (error instanceof BaseError) {
        res.status(error.code).send({ message: error.message });
      } else if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
    } finally {
      await BaseDatabase.destroyConnection();
    }
  }
}
