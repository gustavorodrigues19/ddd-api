-- CreateTable
CREATE TABLE "Tenants" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "domain" VARCHAR(45) NOT NULL,
    "planId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_name_key" ON "Tenants"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_document_key" ON "Tenants"("document");

-- CreateIndex
CREATE UNIQUE INDEX "Plans_name_key" ON "Plans"("name");

-- AddForeignKey
ALTER TABLE "Tenants" ADD CONSTRAINT "Tenants_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
