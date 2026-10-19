import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('chỉ cập nhật giá trị sau khi hết 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'cle' },
    });

    rerender({ value: 'clean' });
    expect(result.current).toBe('cle');

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(result.current).toBe('clean');
  });
});
