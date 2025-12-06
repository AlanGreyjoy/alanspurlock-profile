import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md';
  children: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

    const variants = {
      default: 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
      primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
      secondary: 'bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]',
      accent: 'bg-[var(--color-accent-light)] text-[var(--color-accent-dark)]',
      outline: 'bg-transparent border border-[var(--color-border)] text-[var(--color-text-muted)]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
