/*
  Warnings:

  - You are about to drop the column `external_urls` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `href` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uri` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "external_urls",
DROP COLUMN "href",
DROP COLUMN "uri";
