import type { Game, Geek } from "@/generated/prisma/client.js";

export type CreateGameResponse = {
  gameId: number;
};

export type Target = Geek & {
  isFound: boolean;
};

export type GameWithTargets = Game & {
  targets: Target[];
};

export type GetGameResponse = {
  game: GameWithTargets;
  isGameEnded: boolean;
};

export type AttemptResponse = {
  isAttemptValid: boolean;
  targetId?: number;
};

export type AttemptRequest = {
  targetId: number;
  x: number;
  y: number;
};
