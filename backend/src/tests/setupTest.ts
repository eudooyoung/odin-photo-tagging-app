import { prisma } from "@/lib/prisma.js";
import { afterAll, beforeEach } from "vitest";

beforeEach(async () => {
  await prisma.geeksOnGames.deleteMany();
  await prisma.game.deleteMany();
});

afterAll(async () => {
  await prisma.geeksOnGames.deleteMany();
  await prisma.game.deleteMany();
  await prisma.$disconnect();
});
