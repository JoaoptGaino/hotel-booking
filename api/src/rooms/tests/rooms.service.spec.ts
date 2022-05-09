import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from '../services/rooms.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomDto } from '../dto/create-room.dto';
import { UpdateRoomDto } from '../dto/update-room.dto';

describe('RoomsService', () => {
  let service: RoomsService;

  const mockPrismaService = {
    room: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<RoomsService>(RoomsService);
  });

  it('should create a room', async () => {
    mockPrismaService.room.create.mockResolvedValue({
      id: 'mockId',
      number: '101A',
      roomType: 'SIMPLE',
      price: 100,
      RoomCharacteristics: [
        {
          name: 'Wi-Fi',
        },
      ],
    });

    const data: CreateRoomDto = {
      number: '101A',
      roomType: 'SIMPLE',
      price: 100,
      roomCharacteristics: [
        {
          name: 'Wi-Fi',
        },
      ],
    };

    await service.create(data);

    expect(mockPrismaService.room.create).toHaveBeenCalledWith({
      data: {
        number: '101A',
        roomType: 'SIMPLE',
        price: 100,
        RoomCharacteristics: {
          createMany: {
            data: [
              {
                name: 'Wi-Fi',
              },
            ],
          },
        },
      },
      include: { RoomCharacteristics: true },
    });
  });

  it('should find all rooms', async () => {
    mockPrismaService.room.findMany.mockResolvedValue([
      {
        id: 'mockId',
        number: '101A',
        roomType: 'SIMPLE',
        price: 100,
        RoomCharacteristics: [
          {
            name: 'Wi-Fi',
          },
        ],
      },
    ]);

    await service.findAll({});

    expect(mockPrismaService.room.findMany).toHaveBeenCalled();
  });

  it('should find one room', async () => {
    mockPrismaService.room.findUnique.mockResolvedValue({
      id: 'mockId',
      number: '101A',
      roomType: 'SIMPLE',
      price: 100,
      RoomCharacteristics: [
        {
          name: 'Wi-Fi',
        },
      ],
    });

    await service.findOne('mockId');

    expect(mockPrismaService.room.findUnique).toHaveBeenCalledWith({
      where: { id: 'mockId' },
      include: { RoomCharacteristics: true, Person: true },
    });
  });

  it('should update a room', async () => {
    mockPrismaService.room.update.mockResolvedValue({
      id: 'mockId',
      number: '101A',
      roomType: 'SIMPLE',
      price: 250,
      RoomCharacteristics: [
        {
          name: 'Wi-Fi',
        },
      ],
    });

    const data: UpdateRoomDto = {
      number: '101A',
      roomType: 'SIMPLE',
      price: 250,
      roomCharacteristics: [
        {
          name: 'Wi-Fi',
        },
      ],
    };

    await service.update('mockId', data);

    expect(mockPrismaService.room.update).toHaveBeenCalledWith({
      where: { id: 'mockId' },
      data: {
        number: '101A',
        roomType: 'SIMPLE',
        price: 250,
        roomCharacteristics: [
          {
            name: 'Wi-Fi',
          },
        ],
      },
      include: { RoomCharacteristics: true },
    });
  });

  it('should delete a room', async () => {
    service.remove('mockId');

    expect(mockPrismaService.room.delete).toHaveBeenCalledWith({
      where: { id: 'mockId' },
    });
  });
});
