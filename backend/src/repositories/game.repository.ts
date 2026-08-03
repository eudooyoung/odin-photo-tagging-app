import type { Geek } from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma.js";

export const createGameWithGeeks = async (geeks: Geek[]) => {
  const { id } = await prisma.game.create({
    data: {
      targets: {
        create: geeks.map((geek) => ({
          geek: {
            connect: {
              id: geek.id,
            },
          },
        })),
      },
    },
  });
  return id;

  /*   return prisma.$transaction(async (tx) => {
    const { id } = await tx.game.create({ data: {} });

    await tx.geeksOnGames.createMany({
      data: geeks.map((geek) => ({
        gameId: id,
        geekId: geek.id,
      })),
    });

    return id;
  }); */
};

export const findGameById = async (id: number) => {
  return await prisma.game.findUnique({
    where: { id },
    include: {
      targets: {
        include: {
          geek: true,
        },
      },
    },
  });
};

export const endGame = async (id: number) => {
  await prisma.game.update({
    where: { id },
    data: {
      finishedAt: new Date(),
    },
  });
};
