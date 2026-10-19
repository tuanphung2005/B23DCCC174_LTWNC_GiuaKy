export const CATEGORIES = ['CNTT', 'Kinh tế', 'Ngoại ngữ'] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_FILTERS = ['Tất cả', ...CATEGORIES] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export interface Book {
  id: string;
  title: string;
  author: string;
  category: Category;
  year: number;
  total: number;
  available: number;
}

export type CategoryCounts = Record<Category, number>;
