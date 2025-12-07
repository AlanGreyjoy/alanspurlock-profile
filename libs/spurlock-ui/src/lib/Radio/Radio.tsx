import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { forwardRef } from 'react';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /** Custom className */
  className?: string;
  /** Radio items */
  items: RadioItemConfig[];
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'filled' | 'outline';
}

export interface RadioItemConfig {
  /** Value for the radio item */
  value: string;
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface RadioItemProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    'id'
  > {
  /** Label text */
  label?: string;
  /** Description text */
  description?: string;
  /** Label position */
  labelPosition?: 'left' | 'right';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'filled' | 'outline';
}

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { className = '', items, size = 'md', variant = 'filled', ...props },
    ref
  ) => {
    return (
      <RadioGroupPrimitive.Root
        ref={ref}
        className={`flex flex-col gap-3 ${className}`}
        {...props}
      >
        {items.map((item) => (
          <RadioItem
            key={item.value}
            value={item.value}
            label={item.label}
            description={item.description}
            labelPosition={item.labelPosition}
            size={size}
            variant={variant}
            disabled={item.disabled}
          />
        ))}
      </RadioGroupPrimitive.Root>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export const RadioItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(
  (
    {
      className = '',
      label,
      description,
      labelPosition = 'right',
      size = 'md',
      variant = 'filled',
      value,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const indicatorSizes = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    const baseStyles =
      'rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50';

    const variantStyles = {
      filled:
        'border-gray-300 bg-white hover:border-gray-400 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary',
      outline:
        'border-gray-300 bg-transparent hover:border-gray-400 data-[state=checked]:border-brand-primary data-[state=checked]:bg-transparent',
    };

    const indicatorVariantStyles = {
      filled: 'bg-white',
      outline: 'bg-brand-primary',
    };

    const radioClasses = `${baseStyles} ${variantStyles[variant]} ${sizeClasses[size]} ${className}`;

    const radio = (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        className={radioClasses}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div
            className={`rounded-full ${indicatorSizes[size]} ${indicatorVariantStyles[variant]}`}
          />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
    );

    if (label || description) {
      const labelContent = (
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-gray-700">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      );

      return (
        <label
          className={`flex items-start gap-2 cursor-pointer select-none ${
            labelPosition === 'left' ? 'flex-row-reverse justify-end' : ''
          }`}
        >
          {radio}
          {labelContent}
        </label>
      );
    }

    return radio;
  }
);

RadioItem.displayName = 'RadioItem';

export default RadioGroup;

