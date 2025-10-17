-- CreateTable
CREATE TABLE "targets" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "targets_pkey" PRIMARY KEY ("id")
);
