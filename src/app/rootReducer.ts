import { combineReducers } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import borrowedReducer from '../features/borrowed/borrowedSlice';

export const rootReducer = combineReducers({
  books: booksReducer,
  borrowed: borrowedReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
