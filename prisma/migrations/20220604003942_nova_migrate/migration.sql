/*
  Warnings:

  - Added the required column `favoriteGames_id` to the `game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "game" ADD COLUMN     "favoriteGames_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FavoriteGames" (
    "id" TEXT NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "FavoriteGames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteGames_profile_id_key" ON "FavoriteGames"("profile_id");

-- AddForeignKey
ALTER TABLE "game" ADD CONSTRAINT "game_favoriteGames_id_fkey" FOREIGN KEY ("favoriteGames_id") REFERENCES "FavoriteGames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteGames" ADD CONSTRAINT "FavoriteGames_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
