import { findGameById } from "@/repositories/game.repository.js";
import type { RequestHandler } from "express";

export const gameProvider: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { gameId } = req.params;
  const game = await findGameById(gameId as string);

  req.game = game;
  next();
};
