import React from 'react';
import { Button } from '../../../components/ui/Button';
import type { Book } from '../../../types/book';
import { BookInfo } from './BookInfo';

export interface BookItemProps {
  book: Readonly<Book>;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
  onReturn: (id: string) => void;
}

function BookItemComponent({ book, isBorrowed, onBorrow, onReturn }: BookItemProps) {
  const outOfStock = book.available === 0;

  return (
    <li className="book" data-testid={`book-${book.id}`}>
      <div className="book__body">
        <BookInfo title={book.title} author={book.author} year={book.year} />

        <span className="badge">{book.category}</span>

        <span className={outOfStock ? 'stock stock--empty' : 'stock'}>
          {outOfStock ? 'Hết bản' : `Còn ${book.available}/${book.total} bản`}
        </span>
      </div>

      {isBorrowed ? (
        <Button variant="ghost" onClick={() => onReturn(book.id)}>
          Trả
        </Button>
      ) : (
        <Button disabled={outOfStock} onClick={() => onBorrow(book.id)}>
          Mượn
        </Button>
      )}
    </li>
  );
}

export const BookItem = React.memo(BookItemComponent);
