import { prisma } from "@/lib/prisma.js";

export const markTargetAsFound = async (
  gameId: number,
  geekId: number,
) => {
  const result = await prisma.geeksOnGames.update({
    where: { geekId_gameId: { geekId, gameId } },
    data: {
      isFound: true,
    },
    select: {
      geekId: true,
    },
  });
  return result.geekId;
};

export const hasGameEnded = async (gameId: number) => {
  const targetsToFind = await prisma.geeksOnGames.count({
    where: { gameId, isFound: false },
  });

  return targetsToFind === 0;
};
