import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from '../people.controller';
import { PeopleService } from '../people.service';

describe('PeopleController', () => {
  let controller: PeopleController;

  const mockPeopleService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    })
      .overrideProvider(PeopleService)
      .useValue(mockPeopleService)
      .compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
