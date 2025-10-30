/*
  Warnings:

  - You are about to drop the column `date` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "performance" INTEGER,
ADD COLUMN     "potential" INTEGER;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "date",
ADD COLUMN     "dateEnd" TIMESTAMP(3),
ADD COLUMN     "dateRes" TIMESTAMP(3),
ADD COLUMN     "dateStart" TIMESTAMP(3),
ADD COLUMN     "performance" INTEGER,
ADD COLUMN     "potential" INTEGER;
