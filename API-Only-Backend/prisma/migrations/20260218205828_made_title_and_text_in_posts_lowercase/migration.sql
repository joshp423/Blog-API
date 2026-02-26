/*
  Warnings:

  - You are about to drop the column `Text` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `text` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "Text",
DROP COLUMN "Title",
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
