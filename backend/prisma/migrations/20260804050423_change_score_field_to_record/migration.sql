/*
  Warnings:

  - You are about to drop the column `score` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "score",
ADD COLUMN     "record" INTEGER;
