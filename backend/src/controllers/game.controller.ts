import { attemptValidator } from "@/lib/attemptValidator.js";
import { randomDigitsGenerator } from "@/lib/randomDigitGenerator.js";
import {
  createGameWithGeeks,
  findLeaderboard,
  finishGameWithRecord,
  updateGameWithPlayer,
} from "@/repositories/game.repository.js";
import { findGeeksByRandomIds } from "@/repositories/geek.repository.js";
import {
  hasGameEnded,
  markTargetAsFound,
} from "@/repositories/geeksOnGames.repository.js";
import type {
  AttemptRequest,
  SetPlayerRequest,
} from "@/types/game.types.js";
import { validatePlayer } from "@/validates/player.validate.js";
import type { RequestHandler } from "express";
import { matchedData } from "express-validator";

export const createGame: RequestHandler = async (req, res) => {
  const randomIds = randomDigitsGenerator();
  const geeks = await findGeeksByRandomIds(randomIds);
  const gameId = await createGameWithGeeks(geeks);
  return res.status(201).json({ gameId });
};

export const getGame: RequestHandler = (req, res) => {
  const game = req.game;
  const publicTargets = game.targets.map((target) => ({
    id: target.id,
    name: target.name,
  }));
  const publicGame = { ...game, targets: publicTargets };
  const isGameEnded = game.finishedAt !== null;
  return res.json({ game: publicGame, isGameEnded });
};

export const createAttempt: RequestHandler = async (req, res) => {
  const game = req.game;
  const attempt = req.body as AttemptRequest;
  const isAttemptValid = attemptValidator(attempt, game.targets);
  if (isAttemptValid) {
    // hit
    const targetId = await markTargetAsFound(
      game.id,
      attempt.targetId,
    );
    const isGameEnded = await hasGameEnded(game.id);
    if (isGameEnded) {
      // found all
      const finishedAt = new Date();
      const record = finishedAt.getTime() - game.createdAt.getTime();
      await finishGameWithRecord(game.id, finishedAt, record);
      return res.json({ isAttemptValid, targetId });
    }
    return res.json({ isAttemptValid, targetId });
  }
  // miss
  return res.json({ isAttemptValid });
};

const setPlayerHandler: RequestHandler = async (req, res) => {
  const { id } = req.game;
  const { player }: SetPlayerRequest = matchedData(req);
  await updateGameWithPlayer(id, player);

  res.status(201).end();
};

export const setPlayer = [...validatePlayer, setPlayerHandler];

export const getLeaderboard: RequestHandler = async (req, res) => {
  const leaderboard = await findLeaderboard();
  res.json({ leaderboard });
};
