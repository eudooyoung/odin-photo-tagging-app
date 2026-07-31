import express from "express";
import errorHandler from "./errors/errorHandler.js";
import flash from "express-flash";
import { session } from "./config/session.config.js";
import { geekRouter } from "./routes/geek.route.js";
import { gameRouter } from "./routes/game.route.js";

export const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(session)
  .use(flash());

app.use("/geeks", geekRouter).use("/games", gameRouter).use(errorHandler);
