import type { Geek } from "@/generated/prisma/client.js";

export type CreateGameResponse = {
  gameId: number;
  geeks: Geek[];
};
