/*
  Warnings:

  - Added the required column `author` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "author" TEXT NOT NULL;
