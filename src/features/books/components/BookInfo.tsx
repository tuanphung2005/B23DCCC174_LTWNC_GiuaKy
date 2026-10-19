import type { Book } from '../../../types/book';

export interface BookInfoProps extends Pick<Book, 'title' | 'author'> {
  year?: number;
}

export function BookInfo({ title, author, year }: BookInfoProps) {
  return (
    <div className="book-info">
      <h3 className="book-info__title">{title}</h3>
      <p className="book-info__meta">{year === undefined ? author : `${author} · ${year}`}</p>
    </div>
  );
}
