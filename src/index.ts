import app from "./app";
import { pokemonRouter } from "./router/pokemonRouter";

app.use("/", pokemonRouter);
