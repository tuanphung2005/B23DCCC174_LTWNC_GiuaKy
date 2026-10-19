import type { Middleware } from '@reduxjs/toolkit';
import { borrowBook, borrowRejected } from '../../features/books/booksSlice';
import { MAX_BORROW_LIMIT } from '../../features/borrowed/borrowedSlice';
import type { RootState } from '../rootReducer';

export const borrowLimitMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    if (!borrowBook.match(action)) {
      return next(action);
    }

    if (store.getState().borrowed.ids.length >= MAX_BORROW_LIMIT) {
      return store.dispatch(
        borrowRejected(`Mỗi sinh viên chỉ được mượn tối đa ${MAX_BORROW_LIMIT} cuốn cùng lúc.`),
      );
    }

    return next(action);
  };
