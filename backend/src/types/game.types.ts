import type { Geek } from "@/generated/prisma/client.js";

export type CreateGameResponse = {
  gameId: number;
  geeks: Geek[];
};

export type AttemptResponse = {
  isAttemptValid: boolean;
};

export type AttemptRequest = {
  targetId: number;
  x: number;
  y: number;
};

export type Target = Geek & {
  isFound: boolean;
};
