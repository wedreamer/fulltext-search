import { Injectable } from '@nestjs/common';

@Injectable()
export class SubMongoChangeService {
  getHello(): string {
    return 'Hello World!';
  }
}
