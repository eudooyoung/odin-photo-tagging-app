import { playerExists } from "@/repositories/game.repository.js";
import type { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const validatePlayerHandler = [
  body("player")
    .trim()
    .notEmpty()
    .withMessage("player must be present")
    .bail()
    .isLength({ max: 20 })
    .withMessage("player must be 20 or less characaters")
    .custom(async (player: string) => {
      const exists = await playerExists(player);
      if (exists) {
        throw new Error("player already in use");
      }
    }),
];

const validatePlayerErrorHandelr: RequestHandler = (
  req,
  res,
  next,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validatePlayer = [
  ...validatePlayerHandler,
  validatePlayerErrorHandelr,
];
