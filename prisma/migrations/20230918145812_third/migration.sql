-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "background" TEXT NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2021/11/08/17/09/iceberg-6779681_1280.jpg'
);
INSERT INTO "new_User" ("birthDate", "createdAt", "description", "email", "id", "image", "name", "password", "username") SELECT "birthDate", "createdAt", "description", "email", "id", "image", "name", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
