import { Test, TestingModule } from '@nestjs/testing';
import { SubMongoChangeController } from './sub-mongo-change.controller';
import { SubMongoChangeService } from './sub-mongo-change.service';

describe('SubMongoChangeController', () => {
  let subMongoChangeController: SubMongoChangeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubMongoChangeController],
      providers: [SubMongoChangeService],
    }).compile();

    subMongoChangeController = app.get<SubMongoChangeController>(SubMongoChangeController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(subMongoChangeController.getHello()).toBe('Hello World!');
    });
  });
});
