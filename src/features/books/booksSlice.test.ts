import type { Book } from '../../types/book';
import booksReducer, {
  borrowBook,
  initialBooksState,
  loadBooks,
  returnBook,
  type BooksState,
} from './booksSlice';

const books: Book[] = [
  {
    id: 'book-1',
    title: 'Sách CNTT 1',
    author: 'Tác giả CNTT 1',
    category: 'CNTT',
    year: 2018,
    total: 2,
    available: 2,
  },
  {
    id: 'book-2',
    title: 'Sách Kinh tế 1',
    author: 'Tác giả Kinh tế 1',
    category: 'Kinh tế',
    year: 2019,
    total: 1,
    available: 0,
  },
];

function stateWithBooks(): BooksState {
  return {
    ...initialBooksState,
    items: books.map((book) => ({ ...book })),
    status: 'succeeded',
  };
}

describe('booksSlice reducer', () => {
  it('chuyển status sang "loading" khi thunk đang pending', () => {
    const state = booksReducer(initialBooksState, loadBooks.pending('req-1', undefined));

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('lưu danh sách sách khi thunk fulfilled', () => {
    const state = booksReducer(initialBooksState, loadBooks.fulfilled(books, 'req-1', undefined));

    expect(state.status).toBe('succeeded');
    expect(state.items).toHaveLength(2);
    expect(state.items[0].title).toBe('Sách CNTT 1');
  });

  it('lưu thông báo lỗi khi thunk rejected', () => {
    const state = booksReducer(
      initialBooksState,
      loadBooks.rejected(new Error('mất kết nối'), 'req-1', undefined, 'API lỗi'),
    );

    expect(state.status).toBe('failed');
    expect(state.error).toBe('API lỗi');
  });

  it('giảm 1 bản khi mượn và tăng 1 bản khi trả', () => {
    const borrowed = booksReducer(stateWithBooks(), borrowBook('book-1'));
    expect(borrowed.items[0].available).toBe(1);

    const returned = booksReducer(borrowed, returnBook('book-1'));
    expect(returned.items[0].available).toBe(2);
  });
});
