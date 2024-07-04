import { Logger, Module } from '@nestjs/common';
import { SubMongoChangeService } from './sub-mongo-change.service';
import { MongoModule } from '@app/mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@app/mongo/schema/book.schema';

@Module({
  imports: [
    MongoModule,
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [SubMongoChangeService, Logger],
})
export class SubMongoChangeModule {}
