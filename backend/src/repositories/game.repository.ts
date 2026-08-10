import RecordNotFoundError from "@/errors/recordNotFoundError.js";
import type { Geek } from "@/generated/prisma/client.js";
import { prisma } from "@/lib/prisma.js";

export const createGameWithGeeks = async (geeks: Geek[]) => {
  const { publicId: gameId } = await prisma.game.create({
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
  return gameId;

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

export const findGameById = async (id: string) => {
  const game = await prisma.game.findUnique({
    where: { publicId: id },
    include: {
      targets: {
        include: {
          geek: true,
        },
      },
    },
  });
  if (!game) {
    throw new RecordNotFoundError("Game not found");
  }
  const targets = game.targets.map(({ geek, isFound }) => ({
    ...geek,
    isFound,
  }));

  return { ...game, targets };
};

export const finishGameWithRecord = async (
  id: number,
  finishedAt: Date,
  record: number,
) => {
  await prisma.game.update({
    where: { id },
    data: {
      finishedAt,
      record,
    },
  });
};

export const playerExists = async (player: string) => {
  const count = await prisma.game.count({ where: { player } });
  return count !== 0;
};

export const updateGameWithPlayer = async (
  id: number,
  player: string,
) => {
  await prisma.game.update({
    where: { id },
    data: {
      player,
    },
  });
};

export const findLeaderboard = async () => {
  return prisma.game.findMany({
    where: {
      finishedAt: {
        not: null,
      },
    },
    select: {
      player: true,
      record: true,
    },
    orderBy: {
      record: "asc",
    },
    take: 10,
  });
};
