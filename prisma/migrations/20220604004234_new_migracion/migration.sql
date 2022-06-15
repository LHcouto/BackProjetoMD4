/*
  Warnings:

  - You are about to drop the column `favoriteGames_id` on the `game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "game" DROP CONSTRAINT "game_favoriteGames_id_fkey";

-- AlterTable
ALTER TABLE "game" DROP COLUMN "favoriteGames_id";

-- CreateTable
CREATE TABLE "_FavoriteGamesToGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteGamesToGame_AB_unique" ON "_FavoriteGamesToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteGamesToGame_B_index" ON "_FavoriteGamesToGame"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteGamesToGame" ADD CONSTRAINT "_FavoriteGamesToGame_A_fkey" FOREIGN KEY ("A") REFERENCES "FavoriteGames"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteGamesToGame" ADD CONSTRAINT "_FavoriteGamesToGame_B_fkey" FOREIGN KEY ("B") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
