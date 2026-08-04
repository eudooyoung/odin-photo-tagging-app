import RecordNotFoundError from "@/errors/recordNotFoundError.js";
import { findGameById } from "@/repositories/game.repository.js";
import type { RequestHandler } from "express";

export const gameProvider: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { gameId } = req.params;
  const game = await findGameById(Number(gameId));
  if (!game) {
    throw new RecordNotFoundError("Game not found");
  }
  const targets = game.targets.map(({ geek, isFound }) => ({
    ...geek,
    isFound,
  }));

  req.game = { ...game, targets };
  next();
};
