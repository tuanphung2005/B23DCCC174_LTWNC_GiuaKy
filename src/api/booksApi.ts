import type { ApiResponse } from '../types/api';
import type { Book } from '../types/book';
import { SEED_BOOKS } from './seedBooks';

const API_LATENCY_MS = 500;

export interface FetchBooksOptions {
  shouldFail?: boolean;
}

export function fetchBooks(options: FetchBooksOptions = {}): Promise<ApiResponse<Book[]>> {
  const { shouldFail = false } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({
          ok: false,
          error: 'Không thể kết nối tới máy chủ thư viện. Vui lòng thử lại sau.',
        });
        return;
      }

      resolve({ ok: true, data: SEED_BOOKS.map((book) => ({ ...book })) });
    }, API_LATENCY_MS);
  });
}
