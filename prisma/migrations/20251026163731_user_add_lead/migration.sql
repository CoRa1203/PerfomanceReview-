/*
  Warnings:

  - The values [chief] on the enum `typeAuthor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "typeAuthor_new" AS ENUM ('self', 'colleague', 'lead');
ALTER TABLE "feedbacks" ALTER COLUMN "typeAuthor" TYPE "typeAuthor_new" USING ("typeAuthor"::text::"typeAuthor_new");
ALTER TYPE "typeAuthor" RENAME TO "typeAuthor_old";
ALTER TYPE "typeAuthor_new" RENAME TO "typeAuthor";
DROP TYPE "public"."typeAuthor_old";
COMMIT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "leadId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
