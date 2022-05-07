import { Person, Room, RoomCharacteristics, RoomType } from '.prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';

export class RoomEntity {
  id: string;
  number: string;
  available: boolean;
  roomType: RoomType;

  @Transform(({ value }: { value: Decimal }) => value.toNumber())
  price: Decimal;

  person: Person;

  roomCharacteristics: RoomCharacteristics[];

  createdAt: Date;
  updatedAt: Date;

  constructor(
    data: Room,
    roomCharacteristics: RoomCharacteristics[],
    person?: Person,
  ) {
    this.id = data.id;
    this.number = data.number;
    this.person = person;
    this.available = data.available;
    this.roomType = data.roomType;
    this.price = data.price;

    this.roomCharacteristics = roomCharacteristics;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
