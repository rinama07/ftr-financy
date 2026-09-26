/*
  Warnings:

  - A unique constraint covering the columns `[description]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,description]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transactions_description_key" ON "transactions"("description");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_userId_description_key" ON "transactions"("userId", "description");
