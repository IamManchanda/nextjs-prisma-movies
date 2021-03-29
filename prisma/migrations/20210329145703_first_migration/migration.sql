-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
