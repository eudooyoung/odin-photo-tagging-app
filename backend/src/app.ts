import express from "express";
import errorHandler from "./errors/errorHandler.js";
import cors from "cors";
import { gameRouter } from "./routes/game.route.js";

export const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors());

app.use("/games", gameRouter).use(errorHandler);
