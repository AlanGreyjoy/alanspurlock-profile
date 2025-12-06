import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { forwardRef, useId } from 'react';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Custom className */
  className?: string;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className = '', label, size = 'md', id, ...props }, ref) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const iconSizes = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  const baseStyles =
    'flex items-center justify-center rounded border-2 border-gray-300 bg-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary data-[state=checked]:text-white hover:border-gray-400';

  const checkboxClasses = `${baseStyles} ${sizeClasses[size]} ${className}`;

  const checkbox = (
    <CheckboxPrimitive.Root
      ref={ref}
      id={checkboxId}
      className={checkboxClasses}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <Check className={iconSizes[size]} strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );

  if (label) {
    return (
      <label
        htmlFor={checkboxId}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        {checkbox}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </label>
    );
  }

  return checkbox;
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
