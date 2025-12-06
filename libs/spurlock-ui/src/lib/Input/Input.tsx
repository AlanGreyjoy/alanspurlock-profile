import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Chip, type ChipProps } from '../Chip/Chip';

/**
 * A flexible input component that supports labels, helper text, error states, icons, and chips.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="you@example.com"
 *   error={!!errors.email}
 *   errorMessage={errors.email}
 * />
 * ```
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size variant of the input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Helper text displayed below the input (not shown when error is present)
   */
  helperText?: string;
  /**
   * Whether the input is in an error state. Changes border color to red.
   * @default false
   */
  error?: boolean;
  /**
   * Error message displayed below the input when error is true
   */
  errorMessage?: string;
  /**
   * Array of chip objects to display inside the input (useful for tags/skills)
   */
  chips?: Array<{
    id: string;
    label: string;
    variant?: ChipProps['variant'];
    icon?: ReactNode;
  }>;
  /**
   * Callback fired when a chip's remove button is clicked
   */
  onChipRemove?: (chipId: string) => void;
  /**
   * Icon or element displayed at the start of the input
   */
  prefixIcon?: ReactNode;
  /**
   * Icon or element displayed at the end of the input
   */
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
    // Input element styles (no border - wrapper handles that)
    const inputStyles =
      'w-full p-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0';

    const sizeStyles = {
      sm: 'h-9 text-sm',
      md: 'h-11 text-base',
      lg: 'h-14 text-lg',
    };

    const wrapperBorderStyles = error
      ? 'border-red-500'
      : 'border-brand-primary';

    const wrapperFocusStyles = error
      ? 'focus-within:ring-red-500'
      : 'focus-within:ring-brand-primary';

    const inputClasses = `${inputStyles} ${sizeStyles[size]} ${className}`;

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
          className={`relative flex items-center ${getWrapperPadding()} border-2 rounded-md ${wrapperBorderStyles} focus-within:ring-2 focus-within:ring-offset-2 ${wrapperFocusStyles} transition-colors`}
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
            className={`${inputClasses} flex-1 min-w-0`}
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
