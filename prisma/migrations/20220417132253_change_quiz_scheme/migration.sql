/*
  Warnings:

  - Made the column `title` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
