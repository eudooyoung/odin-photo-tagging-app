/*
  Warnings:

  - A unique constraint covering the columns `[imageKey]` on the table `Geek` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageKey` to the `Geek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE geek_id_seq;
ALTER TABLE "Geek" ADD COLUMN     "imageKey" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('geek_id_seq');
ALTER SEQUENCE geek_id_seq OWNED BY "Geek"."id";

-- CreateIndex
CREATE UNIQUE INDEX "Geek_imageKey_key" ON "Geek"("imageKey");
