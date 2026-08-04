import type { GameWithTargets } from "@/types/game.types.js";

declare global {
  namespace Express {
    interface Request {
      game: GameWithTargets;
    }
  }
}
