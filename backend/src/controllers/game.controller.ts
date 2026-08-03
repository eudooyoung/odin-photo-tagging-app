import BadRequestError from "@/errors/badRequestError.js";
import { attemptValidator } from "@/lib/attemptValidator.js";
import { randomDigitsGenerator } from "@/lib/randomDigitGenerater.js";
import {
  createGameWithGeeks,
  endGame,
} from "@/repositories/game.repository.js";
import { findGeeksByRandomIds } from "@/repositories/geek.repository.js";
import {
  hasGameEnded,
  markTargetAsFound,
} from "@/repositories/geeksOnGames.repository.js";
import type { AttemptRequest } from "@/types/game.types.js";
import type { RequestHandler } from "express";

export const createGame: RequestHandler = async (req, res) => {
  const randomIds = randomDigitsGenerator();
  const geeks = await findGeeksByRandomIds(randomIds);
  const gameId = await createGameWithGeeks(geeks);
  return res.status(201).json({ gameId });
};

export const getGame: RequestHandler = (req, res) => {
  const game = req.game;
  const isGameEnded = game.finishedAt !== null;
  return res.json({ game, isGameEnded });
};

export const createAttempt: RequestHandler = async (req, res) => {
  const game = req.game;
  const attempt = req.body as AttemptRequest;
  const isAttemptValid = attemptValidator(attempt, game.targets);
  if (isAttemptValid) {
    const targetId = await markTargetAsFound(
      game.id,
      attempt.targetId,
    );
    const isGameEnded = await hasGameEnded(game.id);
    if (isGameEnded) {
      await endGame(game.id);
    }
    return res.json({ isAttemptValid, targetId });
  }

  return res.json({ isAttemptValid });
};

export const createScore: RequestHandler = (req, res) => {
  const { createdAt, finishedAt } = req.game;
  if (!finishedAt) {
    throw new BadRequestError("Game has not ended yet");
  }
  console.log(finishedAt.getTime() - createdAt.getTime());
  res.status(201).end();
};
