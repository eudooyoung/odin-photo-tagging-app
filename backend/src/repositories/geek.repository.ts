import { prisma } from "@/lib/prisma.js";

export const findAllGeeks = async () => {
  return await prisma.geek.findMany();
};

export const findRandomGeeksByIds = async (ids: number[]) => {
  return await prisma.geek.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};
