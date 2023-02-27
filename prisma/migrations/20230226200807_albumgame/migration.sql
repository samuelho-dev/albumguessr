/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Leaderboard" ALTER COLUMN "score" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "images",
DROP COLUMN "points";
