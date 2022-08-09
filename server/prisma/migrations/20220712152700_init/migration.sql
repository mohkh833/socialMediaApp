-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "textSearch" TSVECTOR;

-- CreateIndex
CREATE INDEX "Post_textSearch_idx" ON "Post"("textSearch");
