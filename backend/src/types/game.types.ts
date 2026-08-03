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
};

export type GetTargetsResponse = {
  targets: Target[];
};

export type AttemptResponse = {
  isAttemptValid: boolean;
  targetId?: number;
  isGameEnded: boolean;
};

export type AttemptRequest = {
  targetId: number;
  x: number;
  y: number;
};
