import { Book } from '../schema/book.schema';
import { cut } from '@node-rs/jieba';

export const watchBookFields: (keyof Book)[] = ['name', 'describe', 'breed'];

const bookSplitWord = async (book: Book): Promise<string> => {
  const allWords = [book.name, book.describe, book.breed];
  return cut(allWords.join(' ')).join(' ');
};

export default bookSplitWord;
