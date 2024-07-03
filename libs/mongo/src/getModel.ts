import mongoose, { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { AppModule } from 'apps/fulltext-search/src/app.module';

const getModels = async () => {
  // In case you using mongoose 6
  // https://mongoosejs.com/docs/guide.html#strictQuery
  const app = await NestFactory.create(AppModule);
  const bookModel = app.get<Model<Book>>(getModelToken(Book.name));
  // {
  //   provide: getModelToken(Cat.name),
  //   useValue: catModel,
  // },

  // Return models that will be used in migration methods
  return {
    mongoose,
    bookModel,
  };
};

export default getModels;
