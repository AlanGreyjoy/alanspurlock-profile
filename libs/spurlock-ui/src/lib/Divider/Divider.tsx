import { forwardRef, type HTMLAttributes } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  variant?: 'default' | 'soft';
  spacing?: 'sm' | 'md' | 'lg';
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className = '', variant = 'default', spacing = 'md', ...props }, ref) => {
    const variants = {
      default: 'border-[var(--color-border)]',
      soft: 'border-[var(--color-border-soft)]',
    };

    const spacings = {
      sm: 'my-4',
      md: 'my-6',
      lg: 'my-8',
    };

    const classes = `border-t ${variants[variant]} ${spacings[spacing]} ${className}`;

    return <hr ref={ref} className={classes} {...props} />;
  }
);

Divider.displayName = 'Divider';

export default Divider;
