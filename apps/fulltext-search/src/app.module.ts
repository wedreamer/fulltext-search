import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongoModule } from '@app/mongo';

@Module({
  imports: [BookModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
