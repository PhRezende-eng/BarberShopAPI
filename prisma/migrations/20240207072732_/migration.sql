-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('A', 'E');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "profile" "Profile" NOT NULL DEFAULT 'E',
    "password" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserADM" (
    "work_days" TEXT[],
    "work_hours" INTEGER[],
    "user_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserEmployee" (
    "barber_shop_id" SERIAL NOT NULL,
    "work_days" TEXT[],
    "work_hours" INTEGER[],
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "UserEmployee_pkey" PRIMARY KEY ("barber_shop_id")
);

-- CreateTable
CREATE TABLE "Barbershop" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "opening_day" TEXT[],
    "opening_hours" INTEGER[],

    CONSTRAINT "Barbershop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "barbershop_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "client_name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" INTEGER NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserADM_user_id_key" ON "UserADM"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserEmployee_user_id_key" ON "UserEmployee"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_email_key" ON "Barbershop"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_user_id_key" ON "Schedule"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_access_token_key" ON "Token"("access_token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_refresh_token_key" ON "Token"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_user_id_key" ON "Token"("user_id");

-- AddForeignKey
ALTER TABLE "UserADM" ADD CONSTRAINT "UserADM_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserEmployee" ADD CONSTRAINT "UserEmployee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Barbershop" ADD CONSTRAINT "Barbershop_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
