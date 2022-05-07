import { Person, Room } from '.prisma/client';

export class PersonEntity {
  id: string;
  name: string;
  identification: string;
  phoneNumber: string;

  roomId: string;

  room: Room;

  constructor(person: Person, room?: Room) {
    this.id = person.id;
    this.name = person.name;
    this.identification = person.identification;
    this.phoneNumber = person.phoneNumber;

    this.room = room;
  }
}
