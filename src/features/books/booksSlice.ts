import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks, type FetchBooksOptions } from '../../api/booksApi';
import type { Book } from '../../types/book';
import { isApiSuccess } from '../../utils/guards';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BooksState {
  items: Book[];
  status: RequestStatus;
  error: string | null;
  warning: string | null;
}

export const initialBooksState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
  warning: null,
};

export const loadBooks = createAsyncThunk<Book[], FetchBooksOptions | undefined, { rejectValue: string }>(
  'books/loadBooks',
  async (options, { rejectWithValue }) => {
    const response = await fetchBooks(options);

    if (isApiSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialBooksState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book && book.available > 0) {
        book.available -= 1;
      }
      state.warning = null;
    },
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (book && book.available < book.total) {
        book.available += 1;
      }
      state.warning = null;
    },
    borrowRejected(state, action: PayloadAction<string>) {
      state.warning = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.warning = null;
      })
      .addCase(loadBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Đã xảy ra lỗi không xác định.';
      });
  },
});

export const { borrowBook, returnBook, borrowRejected } = booksSlice.actions;

export default booksSlice.reducer;
