import { Book, bookCollName } from '../schema/book.schema';
import bookSplitWord, { watchBookFields } from './book';

export type collName = string;
export type allModel = Book;

// collname -> watcher fields, splitword
export const watchInfo: Record<
  collName,
  {
    modelName: string;
    watchFields: (keyof allModel)[];
    splitword: (val: allModel) => Promise<string>;
  }
> = {
  [bookCollName]: {
    modelName: Book.name,
    watchFields: watchBookFields,
    splitword: bookSplitWord,
  },
};
