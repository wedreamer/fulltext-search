import { Book } from '@app/mongo/schema/book.schema';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('book')
export class BookController {
  constructor(@InjectModel(Book.name) private model: Model<Book>) {}

  @Get('query/:text')
  async query(@Param('text') text: string): Promise<Book[]> {
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
