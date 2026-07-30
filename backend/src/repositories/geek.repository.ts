import { prisma } from "@/lib/prisma.js";

export const findAllGeeks = async () => {
  return prisma.geek.findMany();
};
