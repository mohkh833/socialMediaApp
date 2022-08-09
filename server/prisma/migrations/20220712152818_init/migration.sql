/*
  Warnings:

  - You are about to drop the column `textSearch` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_textSearch_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "textSearch";
