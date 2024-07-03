// Import your models here

import getModels from '@app/mongo/getModel';
import { Book } from '@app/mongo/schema/book.schema';

export async function up(): Promise<void> {
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  await bookModel.create<Book>([
    {
      name: 'name1',
      describe: 'describe1',
      breed: 'breed',
    },
    {
      name: 'name2',
      describe: 'describe3',
      breed: 'breed1',
    },
  ]);
}

export async function down(): Promise<void> {
  // Write migration here
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  await bookModel.findByIdAndDelete<Book>([
    {
      name: 'name1',
      describe: 'describe1',
      breed: 'breed',
    },
    {
      name: 'name2',
      describe: 'describe3',
      breed: 'breed1',
    },
  ]);
}
