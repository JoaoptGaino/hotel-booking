import { Prisma } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getPaginationQueryData } from '../common/dto/pagination-query.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { FindAllPeopleDto } from './dto/find-all-people.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonEntity } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreatePersonDto) {
    const person = await this.prismaService.person.create({ data });

    return new PersonEntity(person);
  }

  async findAll({
    identification,
    name,
    phoneNumber,
    roomId,
    ...query
  }: FindAllPeopleDto) {
    const where: Prisma.PersonWhereInput = {
      name: { contains: name, mode: 'insensitive' },
      identification: { contains: identification, mode: 'insensitive' },
      phoneNumber: { contains: phoneNumber, mode: 'insensitive' },
      Room: { id: roomId },
    };

    const totalCount = await this.prismaService.person.count({
      where,
    });

    const people = await this.prismaService.person.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: { Room: true },
    });

    const entities = people.map(
      ({ Room, ...person }) => new PersonEntity(person, Room),
    );

    return {
      totalCount,
      data: entities,
    };
  }

  async findOne(id: string) {
    const entity = await this.prismaService.person.findUnique({
      where: { id },
      include: { Room: true },
    });

    if (!entity) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    const { Room, ...person } = entity;
    return new PersonEntity(person, Room);
  }

  async update(id: string, data: UpdatePersonDto) {
    const person = await this.prismaService.person.update({
      where: { id },
      data,
    });

    return new PersonEntity(person);
  }

  async remove(id: string) {
    await this.prismaService.person.delete({ where: { id } });

    return {
      message: `Person with id ${id} removed`,
    };
  }
}
