import {
  createAttempt,
  createGame,
  createScore,
  getGame,
} from "@/controllers/game.controller.js";
import { gameProvider } from "@/middlewares/gameProvider.js";
import { Router } from "express";

export const gameRouter = Router();

gameRouter.post("/", createGame);

gameRouter
  .use("/:gameId", gameProvider)
  .get("/:gameId", getGame)
  .post("/:gameId/attempts", createAttempt)
  .post("/:gameId/scores", createScore);
