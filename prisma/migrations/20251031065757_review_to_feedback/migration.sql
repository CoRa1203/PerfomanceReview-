-- AlterTable
ALTER TABLE "feedbacks" ADD COLUMN     "reviewId" INTEGER,
ALTER COLUMN "result" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "coefficient" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "feedbacks" ADD CONSTRAINT "feedbacks_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;
