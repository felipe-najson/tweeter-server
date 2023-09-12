-- CreateTable
CREATE TABLE "_UserRetweets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserRetweets_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserRetweets_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserRetweets_AB_unique" ON "_UserRetweets"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRetweets_B_index" ON "_UserRetweets"("B");
