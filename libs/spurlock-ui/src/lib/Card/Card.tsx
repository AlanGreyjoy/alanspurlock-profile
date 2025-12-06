import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline' | 'feature';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', padding = 'md', border = false, children, ...props }, ref) => {
    const baseStyles = 'transition-all duration-250';

    // Default radius is rounded-lg, but feature uses rounded-2xl
    const radius = variant === 'feature' ? 'rounded-2xl' : 'rounded-lg';

    const variants = {
      default: 'bg-[var(--color-surface)] border border-[var(--color-border-soft)]',
      elevated: 'bg-[var(--color-surface-elevated)] shadow-[var(--shadow-md)] border border-[var(--color-border-soft)]',
      outline: 'bg-transparent border border-[var(--color-border)]',
      feature: 'bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };

    const borderStyle = border ? 'border-2 border-brand-primary' : '';

    const classes = `${baseStyles} ${radius} ${variants[variant]} ${paddings[padding]} ${borderStyle} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
