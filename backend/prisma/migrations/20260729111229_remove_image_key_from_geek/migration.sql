/*
  Warnings:

  - You are about to drop the column `imageKey` on the `Geek` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Geek_imageKey_key";

-- AlterTable
ALTER TABLE "Geek" DROP COLUMN "imageKey";
