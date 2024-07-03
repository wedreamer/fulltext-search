import { Module } from '@nestjs/common';
import { SubMongoChangeController } from './sub-mongo-change.controller';
import { SubMongoChangeService } from './sub-mongo-change.service';

@Module({
  imports: [],
  controllers: [SubMongoChangeController],
  providers: [SubMongoChangeService],
})
export class SubMongoChangeModule {}
