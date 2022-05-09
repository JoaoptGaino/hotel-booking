import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getPaginationQueryData } from '../../common/dto/pagination-query.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { FindAllRoomsDto } from '../dto/find-all-rooms.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';
import { RoomEntity } from '../entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateRoomDto) {
    const createdRoom = await this.prismaService.room.create({
      data: {
        number: data.number,
        roomType: data.roomType,
        price: data.price,
        RoomCharacteristics: {
          createMany: { data: data.roomCharacteristics },
        },
      },
      include: { RoomCharacteristics: true },
    });

    return new RoomEntity(createdRoom, createdRoom.RoomCharacteristics);
  }

  async findAll({ number, ...query }: FindAllRoomsDto) {
    const where: Prisma.RoomWhereInput = {
      number: { contains: number, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.room.count({ where });

    const rooms = await this.prismaService.room.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: { Person: true, RoomCharacteristics: true },
    });

    const entities = rooms.map(
      ({ Person, RoomCharacteristics, ...room }) =>
        new RoomEntity(room, RoomCharacteristics, Person),
    );

    return {
      totalCount,
      data: entities,
    };
  }

  async findOne(id: string) {
    const entity = await this.prismaService.room.findUnique({
      where: { id },
      include: { Person: true, RoomCharacteristics: true },
    });

    if (!entity) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }

    const { Person, RoomCharacteristics, ...room } = entity;
    return new RoomEntity(room, RoomCharacteristics, Person);
  }

  async update(id: string, data: UpdateRoomDto) {
    const updatedRoom = await this.prismaService.room.update({
      where: { id },
      data,
      include: { RoomCharacteristics: true },
    });

    return new RoomEntity(updatedRoom, updatedRoom.RoomCharacteristics);
  }

  async remove(id: string) {
    await this.prismaService.room.delete({ where: { id } });

    return {
      message: `Room with id ${id} has been deleted`,
    };
  }
}
