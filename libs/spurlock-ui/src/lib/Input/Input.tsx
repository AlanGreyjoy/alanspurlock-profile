import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Chip, type ChipProps } from '../Chip/Chip';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label */
  label?: string;
  /** Optional helper text */
  helperText?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Chips to display inside the input */
  chips?: Array<{
    id: string;
    label: string;
    variant?: ChipProps['variant'];
    icon?: ReactNode;
  }>;
  /** Callback when a chip is removed */
  onChipRemove?: (chipId: string) => void;
  /** Optional prefix icon */
  prefixIcon?: ReactNode;
  /** Optional suffix icon */
  suffixIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      chips = [],
      onChipRemove,
      prefixIcon,
      suffixIcon,
      id,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-transparent';

    const sizeStyles = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-14 text-lg',
    };

    const borderStyles = error
      ? 'border-red-500 focus-visible:ring-red-500'
      : 'border-brand-primary focus-visible:border-brand-primary focus-visible:ring-brand-primary';

    const wrapperBorderStyles = error
      ? 'border-red-500'
      : 'border-brand-primary';

    const inputClasses = `${baseStyles} ${sizeStyles[size]} ${borderStyles} ${className}`;

    const chipContainerSize = {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    };

    const hasChips = chips.length > 0;

    // Calculate padding for input wrapper
    const getWrapperPadding = () => {
      const horizontalPadding =
        size === 'sm' ? 'px-3' : size === 'md' ? 'px-4' : 'px-5';
      return horizontalPadding;
    };

    // Calculate icon container classes
    const getIconContainerClasses = (isPrefix: boolean) => {
      const base =
        'flex items-center justify-center text-[var(--color-text-muted)] flex-shrink-0';
      const height = size === 'sm' ? 'h-9' : size === 'md' ? 'h-11' : 'h-14';
      return `${base} ${height}`;
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
          >
            {label}
          </label>
        )}
        <div
          className={`relative flex items-center ${getWrapperPadding()} border-2 rounded-md ${wrapperBorderStyles} focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-primary transition-colors`}
        >
          {prefixIcon && (
            <div className={getIconContainerClasses(true)}>{prefixIcon}</div>
          )}
          {hasChips && (
            <div
              className={`flex items-center flex-wrap ${chipContainerSize[size]} flex-shrink-0`}
            >
              {chips.map((chip) => (
                <Chip
                  key={chip.id}
                  variant={chip.variant || 'default'}
                  size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'}
                  removable={!!onChipRemove}
                  onRemove={() => onChipRemove?.(chip.id)}
                  icon={chip.icon}
                >
                  {chip.label}
                </Chip>
              ))}
            </div>
          )}
          {(prefixIcon || hasChips) && <div className="w-2 flex-shrink-0" />}
          <input
            ref={ref}
            id={id}
            className={`${inputClasses} flex-1 min-w-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0`}
            {...props}
          />
          {suffixIcon && (
            <>
              <div className="w-2 flex-shrink-0" />
              <div className={getIconContainerClasses(false)}>{suffixIcon}</div>
            </>
          )}
        </div>
        {(helperText || errorMessage) && (
          <p
            className={`mt-1.5 text-sm ${
              error ? 'text-red-600' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
