-- CreateTable
CREATE TABLE "RoomPersonBooking" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "RoomPersonBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomPersonBooking_roomId_key" ON "RoomPersonBooking"("roomId");

-- CreateIndex
CREATE UNIQUE INDEX "RoomPersonBooking_personId_key" ON "RoomPersonBooking"("personId");

-- AddForeignKey
ALTER TABLE "RoomPersonBooking" ADD CONSTRAINT "RoomPersonBooking_personId_fkey" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomPersonBooking" ADD CONSTRAINT "RoomPersonBooking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
