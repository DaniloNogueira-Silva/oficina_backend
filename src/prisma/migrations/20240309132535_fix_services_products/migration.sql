/*
  Warnings:

  - You are about to drop the column `budgetId` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `budgetId` on the `Services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "budgetId";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "brand",
DROP COLUMN "budgetId";
