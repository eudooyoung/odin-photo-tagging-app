import { prisma } from "@/lib/prisma.js";

export const findGeeksByRandomIds = async (ids: number[]) => {
  return await prisma.geek.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};
