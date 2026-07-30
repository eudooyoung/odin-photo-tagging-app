-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "player" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeeksOnGames" (
    "geekId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "isFound" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GeeksOnGames_pkey" PRIMARY KEY ("geekId","gameId")
);

-- AddForeignKey
ALTER TABLE "GeeksOnGames" ADD CONSTRAINT "GeeksOnGames_geekId_fkey" FOREIGN KEY ("geekId") REFERENCES "Geek"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeeksOnGames" ADD CONSTRAINT "GeeksOnGames_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
