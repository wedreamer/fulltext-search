import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { Book, BookSchema } from '@app/mongo/schema/book.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
})
export class BookModule {}
