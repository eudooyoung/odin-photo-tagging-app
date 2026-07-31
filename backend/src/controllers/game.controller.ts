import RecordNotFoundError from "@/errors/recordNotFoundError.js";
import { attemptValidator } from "@/lib/attemptValidator.js";
import { randomDigitsGenerator } from "@/lib/randomDigitGenerater.js";
import {
  createGameWithGeeks,
  findGameById,
} from "@/repositories/game.repository.js";
import { findRandomGeeksByIds } from "@/repositories/geek.repository.js";
import type { AttemptRequest } from "@/types/game.types.js";
import type { RequestHandler } from "express";

export const createGame: RequestHandler = async (req, res) => {
  const randomIds = randomDigitsGenerator();
  const geeks = await findRandomGeeksByIds(randomIds);
  const gameId = await createGameWithGeeks(geeks);
  return res.status(201).json({ gameId, geeks });
};

export const createAttempt: RequestHandler = async (req, res) => {
  const { gameId } = req.params;
  const attempt = req.body as AttemptRequest;
  const game = await findGameById(Number(gameId));
  if (!game) {
    throw new RecordNotFoundError("Game not found");
  }
  const targets = game.targets.map(({ geek, isFound }) => ({
    ...geek,
    isFound,
  }));
  const isAttemptValid = attemptValidator(attempt, targets);
  return res.json({ isAttemptValid });
};
