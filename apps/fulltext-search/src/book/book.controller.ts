import { Book } from '@app/mongo/schema/book.schema';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('book')
export class BookController {
  constructor(@InjectModel(Book.name) private model: Model<Book>) {}

  // `curl  -X GET \
  // 'http://127.0.0.1:3000/book/query?text=%E7%AE%A1%E7%90%86%E5%99%A8' \
  // --header 'Accept: */*' \
  // --header 'User-Agent: Thunder Client (https://www.thunderclient.com)'`
  @Get('query')
  async query(@Query('text') text: string): Promise<Book[]> {
    if (!text) throw new BadRequestException();
    const res = await this.model.find({ $text: { $search: text } });
    return res;
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Book> {
    const res = await this.model.findById(id);
    if (res) return res;
    throw new BadRequestException();
  }
}
