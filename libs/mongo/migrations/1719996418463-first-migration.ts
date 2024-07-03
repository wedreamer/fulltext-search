// Import your models here

import getModels from '@app/mongo/getModel';
import { Book } from '@app/mongo/schema/book.schema';
import bookSplitWord from '@app/mongo/splitword/book';

export async function up(): Promise<void> {
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  const books = await Promise.all(
    (
      [
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
      ] as Book[]
    ).map(async (item) => {
      item.t = await bookSplitWord(item);
      return item;
    }),
  );
  await bookModel.create<Book>(books);
}

export async function down(): Promise<void> {
  // Write migration here
  // Write migration here
  const { bookModel } = await getModels();
  // Write migration here
  await Promise.all(
    [
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
    ].map(async (item) => {
      await bookModel.deleteOne(item);
    }),
  );
}
