import { Button } from '../../../components/ui/Button';
import type { Book } from '../../../types/book';
import { BookInfo } from './BookInfo';

export interface BorrowedListProps {
  books: readonly Book[];
  onReturn: (id: string) => void;
}

export function BorrowedList({ books, onReturn }: BorrowedListProps) {
  return (
    <section className="panel">
      <h2 className="panel__title">Sách bạn đang mượn ({books.length})</h2>

      {books.length === 0 ? (
        <p className="state">Bạn chưa mượn cuốn sách nào.</p>
      ) : (
        <ul className="borrowed-list">
          {books.map((book) => (
            <li className="borrowed" key={book.id} data-testid={`borrowed-${book.id}`}>
              <BookInfo title={book.title} author={book.author} />
              <Button variant="ghost" onClick={() => onReturn(book.id)}>
                Trả
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
