import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-lg transition-all duration-250';

    const variants = {
      default: 'bg-[var(--color-surface)] border border-[var(--color-border-soft)]',
      elevated: 'bg-[var(--color-surface-elevated)] shadow-[var(--shadow-md)] border border-[var(--color-border-soft)]',
      outline: 'bg-transparent border border-[var(--color-border)]',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const classes = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
