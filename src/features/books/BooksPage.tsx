import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Button } from '../../components/ui/Button';
import { useDebounce } from '../../hooks/useDebounce';
import { useFiltersStore } from '../filters/useFiltersStore';
import {
  filterBooks,
  selectAllBooks,
  selectBooksError,
  selectBooksStatus,
  selectBorrowWarning,
  selectBorrowedIds,
} from './booksSelectors';
import { borrowBook, loadBooks, returnBook } from './booksSlice';
import { BookList } from './components/BookList';
import { BooksToolbar } from './components/BooksToolbar';
import { BorrowedList } from './components/BorrowedList';

function BooksPage() {
  const dispatch = useAppDispatch();

  const books = useAppSelector(selectAllBooks);
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const warning = useAppSelector(selectBorrowWarning);
  const borrowedIds = useAppSelector(selectBorrowedIds);

  const keyword = useFiltersStore((state) => state.keyword);
  const category = useFiltersStore((state) => state.category);
  const setKeyword = useFiltersStore((state) => state.setKeyword);
  const setCategory = useFiltersStore((state) => state.setCategory);

  const debouncedKeyword = useDebounce(keyword, 300);

  const reload = useCallback(() => {
    dispatch(loadBooks({ shouldFail: new URLSearchParams(window.location.search).has('fail') }));
  }, [dispatch]);

  useEffect(() => {
    reload();
  }, [reload]);

  const visibleBooks = useMemo(
    () => filterBooks(books, debouncedKeyword, category),
    [books, debouncedKeyword, category],
  );

  const borrowedIdSet = useMemo(() => new Set(borrowedIds), [borrowedIds]);

  const borrowedBooks = useMemo(
    () => books.filter((book) => borrowedIdSet.has(book.id)),
    [books, borrowedIdSet],
  );

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch],
  );

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch],
  );

  const isLoading = status === 'idle' || status === 'loading';

  return (
    <section className="page">
      <h1 className="page__title">Tra cứu &amp; mượn sách</h1>

      <BooksToolbar
        keyword={keyword}
        category={category}
        onKeywordChange={setKeyword}
        onCategoryChange={setCategory}
      />

      {warning && (
        <div className="alert alert--warning" role="alert">
          {warning}
        </div>
      )}

      {isLoading && <p className="state">Đang tải...</p>}

      {!isLoading && error && (
        <div className="alert alert--error" role="alert">
          <span>{error}</span>
          <Button size="sm" onClick={reload}>
            Thử lại
          </Button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="page__columns">
          <div className="page__main">
            <BookList
              books={visibleBooks}
              borrowedIds={borrowedIdSet}
              onBorrow={handleBorrow}
              onReturn={handleReturn}
            />
          </div>

          <div className="page__side">
            <BorrowedList books={borrowedBooks} onReturn={handleReturn} />
          </div>
        </div>
      )}
    </section>
  );
}

export default BooksPage;
