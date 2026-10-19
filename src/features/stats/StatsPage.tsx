import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CATEGORIES } from '../../types/book';
import { countBooksByCategory, selectAllBooks, selectBooksError, selectBorrowedIds } from '../books/booksSelectors';
import { loadBooks } from '../books/booksSlice';

function StatsPage() {
  const dispatch = useAppDispatch();
  const books = useAppSelector(selectAllBooks);
  const error = useAppSelector(selectBooksError);
  const borrowedIds = useAppSelector(selectBorrowedIds);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(loadBooks({ shouldFail: new URLSearchParams(window.location.search).has('fail') }));
    }
  }, [books.length, dispatch]);

  const categoryCounts = useMemo(() => countBooksByCategory(books), [books]);

  return (
    <section className="page">
      <h1 className="page__title">Thống kê thư viện</h1>

      {error ? (
        <div className="alert alert--error" role="alert">
          {error}
        </div>
      ) : books.length === 0 ? (
        <p className="state">Chưa có dữ liệu sách.</p>
      ) : (
        <>
          <p className="stats-borrowed">
            Sách đang mượn: <strong>{borrowedIds.length}</strong>
          </p>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Thể loại</th>
                <th scope="col">Số đầu sách</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((category) => (
                <tr key={category}>
                  <th scope="row">{category}</th>
                  <td>{categoryCounts[category]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}

export default StatsPage;
