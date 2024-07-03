import { Controller, Get } from '@nestjs/common';
import { SubMongoChangeService } from './sub-mongo-change.service';

@Controller()
export class SubMongoChangeController {
  constructor(private readonly subMongoChangeService: SubMongoChangeService) {}

  @Get()
  getHello(): string {
    return this.subMongoChangeService.getHello();
  }
}
