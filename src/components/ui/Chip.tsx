import type { ButtonHTMLAttributes } from 'react';
import { classNames } from './classNames';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active = false, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={classNames('chip', active && 'chip--active', className)}
      {...rest}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
