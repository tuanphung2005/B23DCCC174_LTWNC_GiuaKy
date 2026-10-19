import type { Book } from '../../../types/book';
import { BookItem } from './BookItem';

export interface BookListProps {
  books: readonly Book[];
  borrowedIds: ReadonlySet<string>;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

export function BookList({ books, borrowedIds, onBorrow, onReturn }: BookListProps) {
  if (books.length === 0) {
    return <p className="state">Không tìm thấy cuốn sách nào phù hợp.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          isBorrowed={borrowedIds.has(book.id)}
          onBorrow={onBorrow}
          onReturn={onReturn}
        />
      ))}
    </ul>
  );
}
