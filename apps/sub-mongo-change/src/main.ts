import { NestFactory } from '@nestjs/core';
import { SubMongoChangeModule } from './sub-mongo-change.module';

async function bootstrap() {
  const app = await NestFactory.create(SubMongoChangeModule);
  await app.listen(3001);
}
bootstrap();
