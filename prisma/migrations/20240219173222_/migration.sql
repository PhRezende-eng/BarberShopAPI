/*
  Warnings:

  - The primary key for the `UserEmployee` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UserEmployee" DROP CONSTRAINT "UserEmployee_pkey",
ALTER COLUMN "barber_shop_id" DROP DEFAULT;
DROP SEQUENCE "UserEmployee_barber_shop_id_seq";

-- AddForeignKey
ALTER TABLE "UserEmployee" ADD CONSTRAINT "UserEmployee_barber_shop_id_fkey" FOREIGN KEY ("barber_shop_id") REFERENCES "Barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
