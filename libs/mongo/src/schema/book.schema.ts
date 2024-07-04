import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export const bookCollName = 'books';

@Schema({ collection: bookCollName })
export class Book {
  @Prop({ type: String, required: true })
  name!: string;

  @Prop({ type: String, default: '', required: true })
  describe!: string;

  @Prop({ type: String, required: true })
  breed!: string;

  // 分词之后的结果
  @Prop({ type: String, required: false, select: false })
  t?: string | null;
}

export const BookSchema = SchemaFactory.createForClass(Book);
