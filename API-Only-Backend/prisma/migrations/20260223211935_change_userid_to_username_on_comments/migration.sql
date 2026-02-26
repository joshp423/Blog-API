/*
  Warnings:

  - You are about to drop the column `userid` on the `Comments` table. All the data in the column will be lost.
  - Added the required column `username` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userid_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "userid",
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
