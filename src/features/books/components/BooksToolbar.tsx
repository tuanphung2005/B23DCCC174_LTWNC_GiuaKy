import { Chip } from '../../../components/ui/Chip';
import { CATEGORY_FILTERS, type CategoryFilter } from '../../../types/book';

export interface BooksToolbarProps {
  keyword: string;
  category: CategoryFilter;
  onKeywordChange: (keyword: string) => void;
  onCategoryChange: (category: CategoryFilter) => void;
}

export function BooksToolbar({
  keyword,
  category,
  onKeywordChange,
  onCategoryChange,
}: BooksToolbarProps) {
  return (
    <div className="toolbar">
      <div className="field">
        <label htmlFor="book-search">Tìm kiếm theo tên sách hoặc tác giả</label>
        <input
          id="book-search"
          type="search"
          className="input"
          placeholder="Ví dụ: Sách CNTT 1, Tác giả CNTT 1..."
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
      </div>

      <div className="field">
        <span className="field__label">Thể loại</span>
        <div className="chips" role="group" aria-label="Lọc theo thể loại">
          {CATEGORY_FILTERS.map((option) => (
            <Chip
              key={option}
              active={option === category}
              onClick={() => onCategoryChange(option)}
            >
              {option}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
