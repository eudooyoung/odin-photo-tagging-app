-- DropForeignKey
ALTER TABLE "GeeksOnGames" DROP CONSTRAINT "GeeksOnGames_gameId_fkey";

-- AddForeignKey
ALTER TABLE "GeeksOnGames" ADD CONSTRAINT "GeeksOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
