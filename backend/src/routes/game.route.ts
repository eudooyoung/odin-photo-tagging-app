import {
  createAttempt,
  createGame,
  setPlayer,
  getGame,
  getLeaderboard,
} from "@/controllers/game.controller.js";
import { gameProvider } from "@/middlewares/gameProvider.js";
import { Router } from "express";

export const gameRouter = Router();

gameRouter.get("/leaderboard", getLeaderboard).post("/", createGame);

gameRouter
  .use("/:gameId", gameProvider)
  .get("/:gameId", getGame)
  .post("/:gameId/attempts", createAttempt)
  .patch("/:gameId/player", setPlayer);
