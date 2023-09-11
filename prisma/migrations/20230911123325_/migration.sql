/*
  Warnings:

  - You are about to drop the column `likes` on the `Tweet` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_UserLikes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserLikes_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserLikes_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserBookmarks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserBookmarks_A_fkey" FOREIGN KEY ("A") REFERENCES "Tweet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserBookmarks_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tweet" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Tweet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tweet" ("content", "createdAt", "id", "userId") SELECT "content", "createdAt", "id", "userId" FROM "Tweet";
DROP TABLE "Tweet";
ALTER TABLE "new_Tweet" RENAME TO "Tweet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikes_AB_unique" ON "_UserLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikes_B_index" ON "_UserLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBookmarks_AB_unique" ON "_UserBookmarks"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBookmarks_B_index" ON "_UserBookmarks"("B");
