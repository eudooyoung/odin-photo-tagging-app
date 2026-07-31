import { randomDigitsGenerator } from "@/lib/randomDigitGenerater.js";
import { createGameWithGeeks } from "@/repositories/game.repository.js";
import { findRandomGeeksByIds } from "@/repositories/geek.repository.js";
import type { RequestHandler } from "express";

export const createGame: RequestHandler = async (req, res) => {
  const randomIds = randomDigitsGenerator();
  const geeks = await findRandomGeeksByIds(randomIds);
  const gameId = await createGameWithGeeks(geeks);
  res.status(201).json({ gameId, geeks });
};
