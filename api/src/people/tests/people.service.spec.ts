import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { PeopleService } from '../people.service';

describe('PeopleService', () => {
  let service: PeopleService;

  const mockPrismaService = {
    person: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, PeopleService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a person', async () => {
    mockPrismaService.person.create.mockResolvedValue({
      id: 'mockId',
      name: 'John Doe',
      identification: '123456789',
      phoneNumber: '+11234567890',
    });

    const data: CreatePersonDto = {
      name: 'John Doe',
      identification: '123456789',
      phoneNumber: '+11234567890',
    };

    await service.create(data);

    expect(mockPrismaService.person.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('should find all people', async () => {
    mockPrismaService.person.findMany.mockResolvedValue([
      {
        id: 'mockId',
        name: 'John Doe',
        identification: '123456789',
        phoneNumber: '+11234567890',
      },
    ]);

    await service.findAll({});

    expect(mockPrismaService.person.findMany).toHaveBeenCalled();
  });

  it('should find one person', async () => {
    mockPrismaService.person.findUnique.mockResolvedValue({
      id: 'mockId',
      name: 'John Doe',
      identification: '123456789',
      phoneNumber: '+11234567890',
    });

    await service.findOne('mockId');

    expect(mockPrismaService.person.findUnique).toHaveBeenCalledWith({
      where: { id: 'mockId' },
      include: {
        Room: true,
      },
    });
  });

  it('should update a person', async () => {
    mockPrismaService.person.update.mockResolvedValue({
      id: 'mockId',
      name: 'John Doe updated',
      identification: '123456789',
      phoneNumber: '+11234567890',
    });

    const data: UpdatePersonDto = {
      name: 'John Doe updated',
      identification: '123456789',
      phoneNumber: '+11234567890',
    };

    await service.update('mockId', data);

    expect(mockPrismaService.person.update).toHaveBeenCalledWith({
      where: { id: 'mockId' },
      data,
    });
  });

  it('should delete a person', async () => {
    await service.remove('mockId');

    expect(mockPrismaService.person.delete).toHaveBeenCalledWith({
      where: { id: 'mockId' },
    });
  });
});
