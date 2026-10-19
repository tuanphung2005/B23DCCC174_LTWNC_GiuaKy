import type { ButtonHTMLAttributes } from 'react';
import { classNames } from './classNames';

export type ButtonVariant = 'primary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        'btn',
        variant === 'ghost' && 'btn--ghost',
        size === 'sm' && 'btn--sm',
        className,
      )}
      {...rest}
    />
  );
}
