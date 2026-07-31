import {
  createAttempt,
  createGame,
} from "@/controllers/game.controller.js";
import { Router } from "express";

export const gameRouter = Router();

gameRouter
  .post("/", createGame)
  .post("/:gameId/attempts", createAttempt);
