/*
  Warnings:

  - Added the required column `days` to the `RoomPersonBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `RoomPersonBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `RoomPersonBooking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomPersonBooking" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "days" INTEGER NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "room_characteristics" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);
