import express from "express";
import { PokemonBusiness } from "../business/pokemonBusiness";
import { CategoryController } from "../controller/pokemonController";
import { PokemonDatabase } from "../data/pokemonDatabase";

export const pokemonRouter = express.Router();

const pokemonDatabase = new PokemonDatabase();
const pokemonBusiness = new PokemonBusiness(pokemonDatabase);
const pokemonController = new CategoryController(pokemonBusiness);
//there's no reason to make a router to just one entity, but whatever, easier to implement others on a next time lol
pokemonRouter.get("/", (req, res) => pokemonController.getPokemon(req, res));
