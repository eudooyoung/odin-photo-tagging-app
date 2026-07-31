import type { Geek } from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma.js";

export const createGameWithGeeks = async (geeks: Geek[]) => {
  return prisma.$transaction(async (tx) => {
    const { id } = await tx.game.create({});

    await tx.geeksOnGames.createMany({
      data: geeks.map((randomGeek) => ({
        gameId: id,
        geekId: randomGeek.id,
      })),
    });

    return id;
  });
};
