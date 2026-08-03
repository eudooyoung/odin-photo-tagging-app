import { attemptValidator } from "@/lib/attemptValidator.js";
import { randomDigitsGenerator } from "@/lib/randomDigitGenerater.js";
import { createGameWithGeeks } from "@/repositories/game.repository.js";
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
  return res.json({ game: req.game });
};

export const getTargets: RequestHandler = (req, res) => {
  return res.json({ targets: req.game.targets });
};

export const createAttempt: RequestHandler = async (req, res) => {
  const { id, targets } = req.game;
  const attempt = req.body as AttemptRequest;
  const isAttemptValid = attemptValidator(attempt, targets);
  let isGameEnded = false;
  if (isAttemptValid) {
    const targetId = await markTargetAsFound({
      gameId: id,
      targetId: attempt.targetId,
    });
    isGameEnded = await hasGameEnded({ gameId: id });
    return res.json({ isAttemptValid, targetId, isGameEnded });
  }

  return res.json({ isAttemptValid, isGameEnded });
};
