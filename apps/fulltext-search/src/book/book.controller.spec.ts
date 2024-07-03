import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { MongoModule } from '@app/mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@app/mongo/schema/book.schema';

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongoModule,
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
      ],
      controllers: [BookController],
    }).compile();

    controller = module.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
