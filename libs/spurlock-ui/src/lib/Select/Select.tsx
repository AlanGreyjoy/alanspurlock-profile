import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { forwardRef } from 'react';

/**
 * A flexible select component built on Radix UI with support for single selection,
 * multiple sizes, labels, helper text, and error states.
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 * />
 * ```
 */

export interface SelectOption {
  /** Value of the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
}

export interface SelectGroupOption {
  /** Group label */
  label: string;
  /** Options in this group */
  options: SelectOption[];
}

export interface SelectProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    'children'
  > {
  /** Custom className for the trigger */
  className?: string;
  /** Size variant of the select */
  size?: 'sm' | 'md' | 'lg';
  /** Label text displayed above the select */
  label?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Whether the select is in an error state */
  error?: boolean;
  /** Error message displayed below the select when error is true */
  errorMessage?: string;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Array of options or grouped options */
  options?: SelectOption[] | SelectGroupOption[];
  /** ID for the select trigger */
  id?: string;
}

export const Select = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectProps
>(
  (
    {
      className = '',
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      placeholder = 'Select an option...',
      options = [],
      id,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'h-9 text-sm px-3',
      md: 'h-11 text-base px-4',
      lg: 'h-14 text-lg px-5',
    };

    const borderStyles = error ? 'border-red-500' : 'border-gray-300';

    const focusStyles = error
      ? 'focus:ring-red-500 focus:border-red-500'
      : 'focus:ring-brand-secondary focus:border-brand-secondary';

    const triggerStyles = `flex items-center justify-between w-full rounded-md border-2 ${borderStyles} bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusStyles} disabled:cursor-not-allowed disabled:opacity-50 hover:border-gray-400 ${sizeStyles[size]} ${className}`;

    const isGroupedOptions = (
      opts: SelectOption[] | SelectGroupOption[]
    ): opts is SelectGroupOption[] => {
      return opts.length > 0 && 'options' in opts[0];
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
        <SelectPrimitive.Root {...props}>
          <SelectPrimitive.Trigger ref={ref} id={id} className={triggerStyles}>
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon className="ml-2">
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="overflow-hidden bg-white rounded-md border-2 border-gray-300 shadow-lg z-50 w-[var(--radix-select-trigger-width)]"
              position="popper"
              sideOffset={5}
            >
              <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                <ChevronUp className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>

              <SelectPrimitive.Viewport className="p-1">
                {isGroupedOptions(options)
                  ? options.map((group, idx) => (
                      <SelectPrimitive.Group key={idx}>
                        <SelectPrimitive.Label className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase">
                          {group.label}
                        </SelectPrimitive.Label>
                        {group.options.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectPrimitive.Group>
                    ))
                  : (options as SelectOption[]).map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
              </SelectPrimitive.Viewport>

              <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                <ChevronDown className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

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

Select.displayName = 'Select';

// SelectItem sub-component
interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  children: React.ReactNode;
}

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={`relative flex items-center px-8 py-2 text-sm rounded cursor-pointer select-none outline-none focus:bg-brand-secondary focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 focus:hover:bg-brand-secondary ${className}`}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-2 flex items-center justify-center">
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = 'SelectItem';

export default Select;
