import type { RootState } from '../../app/rootReducer';
import type { Book, CategoryCounts, CategoryFilter } from '../../types/book';
import type { BooksState } from './booksSlice';

export const selectAllBooks = (state: RootState): Book[] => state.books.items;
export const selectBooksStatus = (state: RootState): BooksState['status'] => state.books.status;
export const selectBooksError = (state: RootState): string | null => state.books.error;
export const selectBorrowWarning = (state: RootState): string | null => state.books.warning;
export const selectBorrowedIds = (state: RootState): string[] => state.borrowed.ids;

export function filterBooks(
  books: readonly Book[],
  keyword: string,
  category: CategoryFilter,
): Book[] {
  const normalizedKeyword = keyword.trim().toLowerCase();

  return books.filter((book) => {
    if (category !== 'Tất cả' && book.category !== category) {
      return false;
    }
    if (normalizedKeyword.length === 0) {
      return true;
    }
    return (
      book.title.toLowerCase().includes(normalizedKeyword) ||
      book.author.toLowerCase().includes(normalizedKeyword)
    );
  });
}

export function countBooksByCategory(books: readonly Book[]): CategoryCounts {
  const counts: CategoryCounts = { CNTT: 0, 'Kinh tế': 0, 'Ngoại ngữ': 0 };

  books.forEach((book) => {
    counts[book.category] += 1;
  });

  return counts;
}
