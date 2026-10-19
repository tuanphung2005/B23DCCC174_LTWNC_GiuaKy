import { create } from 'zustand';
import type { CategoryFilter } from '../../types/book';

export interface FiltersState {
  keyword: string;
  category: CategoryFilter;
  setKeyword: (keyword: string) => void;
  setCategory: (category: CategoryFilter) => void;
}

const initialFilters = {
  keyword: '',
  category: 'Tất cả' as CategoryFilter,
};

export const useFiltersStore = create<FiltersState>((set) => ({
  ...initialFilters,
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
}));
