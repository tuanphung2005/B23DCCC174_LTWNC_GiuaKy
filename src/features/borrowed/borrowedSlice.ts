import { createSlice } from '@reduxjs/toolkit';
import { borrowBook, returnBook } from '../books/booksSlice';

export const MAX_BORROW_LIMIT = 3;

export interface BorrowedState {
  ids: string[];
}

const initialBorrowedState: BorrowedState = {
  ids: [],
};

const borrowedSlice = createSlice({
  name: 'borrowed',
  initialState: initialBorrowedState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(borrowBook, (state, action) => {
        state.ids.push(action.payload);
      })
      .addCase(returnBook, (state, action) => {
        state.ids = state.ids.filter((id) => id !== action.payload);
      });
  },
});

export default borrowedSlice.reducer;
