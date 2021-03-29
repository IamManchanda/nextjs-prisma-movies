/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slug]` on the table `Movie`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie.slug_unique" ON "Movie"("slug");
