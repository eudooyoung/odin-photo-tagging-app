import { findGameByPublicId } from "@/repositories/game.repository.js";
import type { RequestHandler } from "express";

export const gameProvider: RequestHandler = async (req, res, next) => {
  const { gameId: publicId } = req.params;
  const game = await findGameByPublicId(publicId as string);

  req.game = game;
  next();
};
