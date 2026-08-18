import type { Game, Geek } from "@/generated/prisma/client.js";

export type CreateGameResponse = {
  publicId: string;
};

export type Target = Geek & {
  isFound: boolean;
};

export type GameWithTargets = Game & {
  targets: Target[];
};

export type PublicTarget = Pick<Target, "id" | "name" | "isFound">;

export type GameWithPublicTargets = Game & {
  targets: PublicTarget[];
};

export type GetGameResponse = {
  game: Omit<GameWithPublicTargets, "id">;
};

export type AttemptResponse = {
  isAttemptValid: boolean;
};

export type AttemptRequest = {
  targetId: number;
  x: number;
  y: number;
};

export type SetPlayerRequest = {
  player: string;
};

export type GetLeaderboardResponse = {
  leaderboard: { rank: number; player: string; record: number }[];
};
