import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRoomDto } from '../dto/book-room.dto';

@Injectable()
export class BookRoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkIn(roomId: string, data: BookRoomDto) {
    await this.validateIfRoomIsAvailable(roomId);

    const room = await this.prismaService.room.update({
      where: { id: roomId },
      data: { available: false },
      select: { price: true },
    });

    await this.prismaService.person.update({
      where: { id: data.personId },
      data: { roomId },
    });

    const days = this.getDays(data.startDate, data.endDate);

    const bookedRoom = await this.prismaService.roomPersonBooking.create({
      data: {
        days,
        startDate: data.startDate,
        endDate: data.endDate,
        personId: data.personId,
        roomId: roomId,
      },
    });

    const totalToPay = this.getTotalToBePaid(Number(room.price), days);

    return { bookedRoom, room, totalToPay };
  }

  async checkOut(roomId: string) {
    await this.prismaService.roomPersonBooking.delete({ where: { roomId } });
    await this.prismaService.room.update({
      where: { id: roomId },
      data: { available: true },
      select: { Person: { select: { id: true } } },
    });

    await this.prismaService.person.update({
      where: { roomId },
      data: { roomId: null },
    });

    return {
      message: `${roomId} has been checked out`,
    };
  }

  getTotalToBePaid(price: number, days: number) {
    return price * days;
  }

  getDays(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.round(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );
    return days;
  }

  async validateIfRoomIsAvailable(roomId: string) {
    const room = await this.prismaService.room.findUnique({
      where: { id: roomId },
      select: {
        available: true,
      },
    });

    if (!room.available) {
      throw new BadRequestException({ message: 'Room is not available' });
    }
  }
}
