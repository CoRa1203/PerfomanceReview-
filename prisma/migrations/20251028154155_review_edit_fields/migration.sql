/*
  Warnings:

  - You are about to drop the column `performance` on the `feedbacks` table. All the data in the column will be lost.
  - You are about to drop the column `performance` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" DROP COLUMN "performance",
ADD COLUMN     "perfomance" INTEGER;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "performance",
ADD COLUMN     "isEnd" BOOLEAN,
ADD COLUMN     "perfomance" INTEGER;
