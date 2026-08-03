import {
  createAttempt,
  createGame,
  getGame,
  getTargets,
} from "@/controllers/game.controller.js";
import { gameProvider } from "@/middlewares/gameProvider.js";
import { Router } from "express";

export const gameRouter = Router();

gameRouter.post("/", createGame);

gameRouter
  .use("/:gameId", gameProvider)
  .get("/:gameId", getGame)
  .get("/:gameId/targets", getTargets)
  .post("/:gameId/attempts", createAttempt);
