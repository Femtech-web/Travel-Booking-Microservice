/*
  Warnings:

  - Changed the type of `passwordUpdatedAt` on the `Credentials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `Credentials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Credentials" DROP COLUMN "passwordUpdatedAt",
ADD COLUMN     "passwordUpdatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
