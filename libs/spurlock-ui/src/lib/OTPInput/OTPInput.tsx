import {
  forwardRef,
  useRef,
  useState,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
  type ReactNode,
} from 'react';
import { Shield } from 'lucide-react';

/**
 * A One-Time Password (OTP) input component with auto-focus, paste support, validation, and customizable placeholders.
 *
 * @example
 * ```tsx
 * // Default with shield icon
 * <OTPInput
 *   length={6}
 *   label="Enter verification code"
 *   onComplete={(code) => verifyOTP(code)}
 * />
 *
 * // Custom icon placeholder
 * <OTPInput
 *   length={6}
 *   placeholder={<Lock />}
 *   showDefaultIcon={false}
 * />
 *
 * // Text placeholder
 * <OTPInput
 *   length={6}
 *   placeholder="–"
 *   showDefaultIcon={false}
 * />
 * ```
 */
export interface OTPInputProps {
  /**
   * Number of OTP digits/characters
   * @default 6
   */
  length?: number;
  /**
   * Size variant of the input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Label text displayed above the inputs
   */
  label?: string;
  /**
   * Helper text displayed below the inputs (not shown when error is present)
   */
  helperText?: string;
  /**
   * Whether the input is in an error state
   * @default false
   */
  error?: boolean;
  /**
   * Error message displayed below the inputs when error is true
   */
  errorMessage?: string;
  /**
   * Whether to mask the input values (show dots instead of characters)
   * @default false
   */
  masked?: boolean;
  /**
   * Type of characters allowed
   * @default 'numeric'
   */
  type?: 'numeric' | 'alphanumeric' | 'alphabetic';
  /**
   * Whether to disable all inputs
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback fired when all inputs are filled
   */
  onComplete?: (value: string) => void;
  /**
   * Callback fired when the value changes
   */
  onChange?: (value: string) => void;
  /**
   * Default value for the OTP input
   */
  defaultValue?: string;
  /**
   * Controlled value for the OTP input
   */
  value?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      masked = false,
      placeholder,
      showDefaultIcon = true,
      type = 'numeric',
      disabled = false,
      onComplete,
      onChange,
      defaultValue = '',
      value: controlledValue,
      className = '',
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(
      Array(length).fill('')
    );
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Initialize with default value
    useEffect(() => {
      if (defaultValue) {
        const digits = defaultValue.slice(0, length).split('');
        const paddedDigits = [
          ...digits,
          ...Array(length - digits.length).fill(''),
        ];
        setInternalValue(paddedDigits);
      }
    }, [defaultValue, length]);

    // Update internal value when controlled value changes
    useEffect(() => {
      if (isControlled && controlledValue !== undefined) {
        const digits = controlledValue.slice(0, length).split('');
        const paddedDigits = [
          ...digits,
          ...Array(length - digits.length).fill(''),
        ];
        setInternalValue(paddedDigits);
      }
    }, [controlledValue, length, isControlled]);

    const values =
      isControlled && controlledValue !== undefined
        ? [
            ...controlledValue.slice(0, length).split(''),
            ...Array(length).fill(''),
          ].slice(0, length)
        : internalValue;

    // Size-based styling
    const sizeStyles = {
      sm: 'h-10 w-10 text-sm',
      md: 'h-14 w-14 text-lg',
      lg: 'h-16 w-16 text-xl',
    };

    const gapStyles = {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    };

    // Validation based on type
    const isValidChar = (char: string): boolean => {
      if (type === 'numeric') {
        return /^\d$/.test(char);
      }
      if (type === 'alphabetic') {
        return /^[a-zA-Z]$/.test(char);
      }
      if (type === 'alphanumeric') {
        return /^[a-zA-Z0-9]$/.test(char);
      }
      return true;
    };

    // Handle input change
    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.slice(-1); // Get last character

      if (char && !isValidChar(char)) {
        return;
      }

      const newValues = [...values];
      newValues[index] = char;

      if (!isControlled) {
        setInternalValue(newValues);
      }

      const joinedValue = newValues.join('');
      onChange?.(joinedValue);

      // Auto-focus next input
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if all fields are filled
      if (newValues.every((v) => v !== '')) {
        onComplete?.(newValues.join(''));
      }
    };

    // Handle key down events
    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      // Handle backspace
      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          // If current field is empty, focus previous field
          inputRefs.current[index - 1]?.focus();
        } else if (values[index]) {
          // If current field has value, clear it
          const newValues = [...values];
          newValues[index] = '';

          if (!isControlled) {
            setInternalValue(newValues);
          }

          onChange?.(newValues.join(''));
        }
      }
      // Handle arrow keys
      else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
      // Handle Home/End keys
      else if (e.key === 'Home') {
        e.preventDefault();
        inputRefs.current[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        inputRefs.current[length - 1]?.focus();
      }
    };

    // Handle paste event
    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
      const pastedChars = pastedData.split('').filter(isValidChar);

      const newValues = [...values];
      pastedChars.forEach((char, idx) => {
        if (idx < length) {
          newValues[idx] = char;
        }
      });

      if (!isControlled) {
        setInternalValue(newValues);
      }

      onChange?.(newValues.join(''));

      // Focus the next empty field or the last field
      const nextEmptyIndex = newValues.findIndex((v) => v === '');
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[length - 1]?.focus();
      }

      // Check if all fields are filled
      if (newValues.every((v) => v !== '')) {
        onComplete?.(newValues.join(''));
      }
    };

    // Handle focus - select all text
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const borderStyles = error ? 'border-red-500' : 'border-gray-300';

    const focusStyles = error
      ? 'focus:ring-red-500 focus:border-red-500'
      : 'focus:ring-brand-secondary focus:border-brand-secondary';

    const hoverStyles = error ? '' : 'hover:border-gray-400';

    const iconSizeClass =
      size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5';

    const renderPlaceholder = (index: number) => {
      if (values[index]) return null;

      // If placeholder is a string, show it as text
      if (typeof placeholder === 'string') {
        return (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none">
            {placeholder}
          </div>
        );
      }

      // If placeholder is a custom ReactNode, render it
      if (placeholder && placeholder !== true) {
        return (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none">
            {placeholder}
          </div>
        );
      }

      // Show default shield icon if enabled
      if (showDefaultIcon) {
        return (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-muted)] pointer-events-none">
            <Shield className={iconSizeClass} />
          </div>
        );
      }

      return null;
    };

    return (
      <div ref={ref} className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text)] mb-3">
            {label}
          </label>
        )}
        <div className={`flex ${gapStyles[size]} justify-start`}>
          {Array.from({ length }, (_, index) => (
            <div key={index} className="relative">
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type={masked ? 'password' : 'text'}
                inputMode={type === 'numeric' ? 'numeric' : 'text'}
                maxLength={1}
                value={values[index] || ''}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={handleFocus}
                disabled={disabled}
                className={`
                  ${sizeStyles[size]}
                  border-2 ${borderStyles} ${hoverStyles}
                  rounded-md
                  text-center
                  font-semibold
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  ${focusStyles}
                  transition-colors
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  bg-white
                `}
                aria-label={`Digit ${index + 1} of ${length}`}
              />
              {renderPlaceholder(index)}
            </div>
          ))}
        </div>
        {(helperText || errorMessage) && (
          <p
            className={`mt-2 text-sm ${
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

OTPInput.displayName = 'OTPInput';

export default OTPInput;
