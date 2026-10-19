import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Book } from '../../../types/book';
import { BookItem, type BookItemProps } from './BookItem';

const book: Book = {
  id: 'book-1',
  title: 'Sách CNTT 1',
  author: 'Tác giả CNTT 1',
  category: 'CNTT',
  year: 2020,
  total: 4,
  available: 2,
};

function renderBookItem(props: Partial<BookItemProps> = {}) {
  const onBorrow = jest.fn();
  const onReturn = jest.fn();

  render(
    <BookItem
      book={book}
      isBorrowed={false}
      onBorrow={onBorrow}
      onReturn={onReturn}
      {...props}
    />,
  );

  return { onBorrow, onReturn };
}

describe('<BookItem />', () => {
  it('hiển thị đúng thông tin của một cuốn sách', () => {
    renderBookItem();

    expect(screen.getByText('Sách CNTT 1')).toBeInTheDocument();
    expect(screen.getByText(/Tác giả CNTT 1/)).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText('Còn 2/4 bản')).toBeInTheDocument();
  });

  it('gọi onBorrow với đúng id khi bấm nút "Mượn"', async () => {
    const user = userEvent.setup();
    const { onBorrow } = renderBookItem();

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledWith('book-1');
  });

  it('vô hiệu hoá nút "Mượn" khi sách đã hết bản', async () => {
    const user = userEvent.setup();
    const { onBorrow } = renderBookItem({ book: { ...book, available: 0 } });

    const borrowButton = screen.getByRole('button', { name: 'Mượn' });
    expect(borrowButton).toBeDisabled();
    expect(screen.getByText('Hết bản')).toBeInTheDocument();

    await user.click(borrowButton);
    expect(onBorrow).not.toHaveBeenCalled();
  });
});
