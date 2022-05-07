/*
  Warnings:

  - You are about to drop the column `person_id` on the `room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id]` on the table `person` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomType` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('SIMPLE', 'DELUXE', 'PREMIUM');

-- DropForeignKey
ALTER TABLE "room" DROP CONSTRAINT "room_person_id_fkey";

-- DropIndex
DROP INDEX "room_person_id_key";

-- AlterTable
ALTER TABLE "person" ADD COLUMN     "room_id" TEXT;

-- AlterTable
ALTER TABLE "room" DROP COLUMN "person_id",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "roomType" "RoomType" NOT NULL;

-- CreateTable
CREATE TABLE "room_characteristics" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "room_characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "person_room_id_key" ON "person"("room_id");

-- AddForeignKey
ALTER TABLE "person" ADD CONSTRAINT "person_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_characteristics" ADD CONSTRAINT "room_characteristics_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
