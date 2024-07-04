import { NestFactory } from '@nestjs/core';
import { SubMongoChangeModule } from './sub-mongo-change.module';
import { SubMongoChangeService } from './sub-mongo-change.service';

async function bootstrap() {
  const app = await NestFactory.create(SubMongoChangeModule);

  const service = app.get<SubMongoChangeService>(SubMongoChangeService);

  await service.run();
}
bootstrap();
