import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRoomDto } from '../dto/book-room.dto';

@Injectable()
export class BookRoomService {
  constructor(private readonly prismaService: PrismaService) {}

  async run(bookId: string, data: BookRoomDto) {}
}
