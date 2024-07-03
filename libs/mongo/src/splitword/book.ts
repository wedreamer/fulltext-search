import { Book } from '../schema/book.schema';
import { cut } from '@node-rs/jieba';

const bookSplitWord = async (book: Book): Promise<string> => {
  const allWords = [book.name, book.describe, book.breed];
  return cut(allWords.join(' ')).join('');
};

export default bookSplitWord;
