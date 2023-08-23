-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MASTER_ADMIN', 'ORGANIZATION_ADMIN', 'FRANCHISE_ADMIN', 'COACH_ADMIN', 'CLIENT_ADMIN', 'FINANCE_ADMIN', 'ATHLETE_ADMIN', 'CUSTOM_ADMIN');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    "accessGroupId" TEXT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessGroups" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(50),
    "permissions" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "AccessGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Franchises" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "brand" JSON NOT NULL,
    "address" JSON NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "Franchises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_franchises_franchise" (
    "userId" TEXT NOT NULL,
    "franchiseId" TEXT NOT NULL,

    CONSTRAINT "users_franchises_franchise_pkey" PRIMARY KEY ("userId","franchiseId")
);

-- CreateTable
CREATE TABLE "Coaches" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "position" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportCategories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,

    CONSTRAINT "SportCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sport_categories_franchises_franchise" (
    "sportCategorId" TEXT NOT NULL,
    "franchiseId" TEXT NOT NULL,

    CONSTRAINT "sport_categories_franchises_franchise_pkey" PRIMARY KEY ("sportCategorId","franchiseId")
);

-- CreateTable
CREATE TABLE "Athletes" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "document" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sportCategoryId" TEXT NOT NULL,

    CONSTRAINT "Athletes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(45) NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT NOT NULL,
    "franchiseId" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team_athletes_athlete" (
    "teamId" TEXT NOT NULL,
    "athleteId" TEXT NOT NULL,

    CONSTRAINT "team_athletes_athlete_pkey" PRIMARY KEY ("teamId","athleteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Franchises_name_key" ON "Franchises"("name");

-- CreateIndex
CREATE INDEX "IDX_93b566d522b73cb8bc46e12042" ON "users_franchises_franchise"("userId");

-- CreateIndex
CREATE INDEX "IDX_a5e63f80ca58e7296d5982144f" ON "users_franchises_franchise"("franchiseId");

-- CreateIndex
CREATE UNIQUE INDEX "Coaches_name_key" ON "Coaches"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SportCategories_name_key" ON "SportCategories"("name");

-- CreateIndex
CREATE INDEX "IDX_93b566d522b73cb8bc46f7499c" ON "sport_categories_franchises_franchise"("sportCategorId");

-- CreateIndex
CREATE INDEX "IDX_a5e63f80ca58e7296d5864b88a" ON "sport_categories_franchises_franchise"("franchiseId");

-- CreateIndex
CREATE UNIQUE INDEX "Athletes_name_key" ON "Athletes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Teams_name_key" ON "Teams"("name");

-- CreateIndex
CREATE INDEX "IDX_93b566d522b73cb8bc46f7405b" ON "team_athletes_athlete"("teamId");

-- CreateIndex
CREATE INDEX "IDX_a5e63f80ca58e7296d5864bd2d" ON "team_athletes_athlete"("athleteId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_accessGroupId_fkey" FOREIGN KEY ("accessGroupId") REFERENCES "AccessGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessGroups" ADD CONSTRAINT "AccessGroups_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Franchises" ADD CONSTRAINT "Franchises_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_franchises_franchise" ADD CONSTRAINT "users_franchises_franchise_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_franchises_franchise" ADD CONSTRAINT "users_franchises_franchise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coaches" ADD CONSTRAINT "Coaches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coaches" ADD CONSTRAINT "Coaches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportCategories" ADD CONSTRAINT "SportCategories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sport_categories_franchises_franchise" ADD CONSTRAINT "sport_categories_franchises_franchise_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sport_categories_franchises_franchise" ADD CONSTRAINT "sport_categories_franchises_franchise_sportCategorId_fkey" FOREIGN KEY ("sportCategorId") REFERENCES "SportCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athletes" ADD CONSTRAINT "Athletes_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athletes" ADD CONSTRAINT "Athletes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Athletes" ADD CONSTRAINT "Athletes_sportCategoryId_fkey" FOREIGN KEY ("sportCategoryId") REFERENCES "SportCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_franchiseId_fkey" FOREIGN KEY ("franchiseId") REFERENCES "Franchises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_athletes_athlete" ADD CONSTRAINT "team_athletes_athlete_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "Athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_athletes_athlete" ADD CONSTRAINT "team_athletes_athlete_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
