import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input, type InputProps } from '../Input/Input';

/**
 * A password input component with toggle visibility functionality.
 * Extends the Input component with a show/hide password button.
 *
 * @example
 * ```tsx
 * <PasswordInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   helperText="Must be at least 8 characters"
 * />
 * ```
 */
export interface PasswordInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
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
   * Whether the input is in an error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message displayed below the input when error is true
   */
  errorMessage?: string;
  /**
   * Whether the password should be visible by default
   * @default false
   */
  defaultVisible?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className = '',
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      defaultVisible = false,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(defaultVisible);

    const toggleVisibility = () => {
      setIsVisible((prev) => !prev);
    };

    const iconSize =
      size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

    const ToggleButton = (
      <button
        type="button"
        onClick={toggleVisibility}
        className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
        aria-label={isVisible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
      >
        {isVisible ? (
          <EyeOff className={iconSize} />
        ) : (
          <Eye className={iconSize} />
        )}
      </button>
    );

    return (
      <Input
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        size={size}
        label={label}
        helperText={helperText}
        error={error}
        errorMessage={errorMessage}
        suffixIcon={ToggleButton}
        className={className}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
