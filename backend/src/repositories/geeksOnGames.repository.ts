import { prisma } from "@/lib/prisma.js";

export const markTargetAsFound = async ({
  gameId,
  targetId,
}: {
  gameId: number;
  targetId: number;
}) => {
  const { geekId } = await prisma.geeksOnGames.update({
    where: { geekId_gameId: { geekId: targetId, gameId } },
    data: {
      isFound: true,
    },
    select: {
      geekId: true,
    },
  });
  return geekId;
};

export const hasGameEnded = async ({
  gameId,
}: {
  gameId: number;
}) => {
  const targetsToFind = await prisma.geeksOnGames.count({
    where: { gameId, isFound: false },
  });

  return targetsToFind === 0;
};
