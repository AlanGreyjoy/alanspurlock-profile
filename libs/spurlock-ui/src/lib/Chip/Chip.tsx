import { X } from 'lucide-react';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface ChipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'onClick'> {
  /** Variant style */
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'accent';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the chip can be removed */
  removable?: boolean;
  /** Callback when remove button is clicked */
  onRemove?: () => void;
  /** Optional icon to display before the content */
  icon?: ReactNode;
  /** Chip content */
  children: ReactNode;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'md',
      removable = false,
      onRemove,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center font-medium rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

    const variants = {
      default:
        'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]',
      primary: 'bg-brand-primary text-white hover:bg-brand-primary/90',
      secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90',
      accent: 'bg-[var(--color-accent-light)] text-[var(--color-accent-dark)]',
      outline:
        'bg-transparent border border-[var(--color-border)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
      lg: 'px-4 py-1.5 text-base gap-2',
    };

    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    const removeButtonSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <span ref={ref} className={classes} {...props}>
        {icon && (
          <span className={`flex-shrink-0 ${iconSizes[size]}`}>{icon}</span>
        )}
        <span className="flex-1">{children}</span>
        {removable && (
          <button
            type="button"
            onClick={handleRemove}
            className={`flex-shrink-0 ml-1 rounded-full hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 transition-colors ${removeButtonSizes[size]}`}
            aria-label="Remove chip"
          >
            <X className={removeButtonSizes[size]} strokeWidth={2.5} />
          </button>
        )}
      </span>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
