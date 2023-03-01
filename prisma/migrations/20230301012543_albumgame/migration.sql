/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_user_id_key" ON "Leaderboard"("user_id");
