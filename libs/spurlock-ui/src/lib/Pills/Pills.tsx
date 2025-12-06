import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Badge, type BadgeProps } from '../Badge/Badge';

// Pills Container
export interface PillsProps extends HTMLAttributes<HTMLDivElement> {
  /** Optional label to display above the pills */
  label?: string;
  /** Array of items to display as pills (strings or objects with label and optional props) */
  items?: (
    | string
    | { label: string; variant?: BadgeProps['variant']; icon?: ReactNode }
  )[];
  /** Variant to apply to all pills (can be overridden per item) */
  variant?: BadgeProps['variant'];
  /** Size to apply to all pills */
  size?: BadgeProps['size'];
  /** Custom gap between pills */
  gap?: 'xs' | 'sm' | 'md' | 'lg';
  /** Custom render function for each item */
  renderItem?: (
    item:
      | string
      | { label: string; variant?: BadgeProps['variant']; icon?: ReactNode },
    index: number
  ) => ReactNode;
  /** Children to render instead of items (for full custom control) */
  children?: ReactNode;
}

export const Pills = forwardRef<HTMLDivElement, PillsProps>(
  (
    {
      className = '',
      label,
      items = [],
      variant = 'secondary',
      size = 'sm',
      gap = 'sm',
      renderItem,
      children,
      ...props
    },
    ref
  ) => {
    const gaps = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    };

    const renderPillItem = (
      item:
        | string
        | { label: string; variant?: BadgeProps['variant']; icon?: ReactNode },
      index: number
    ) => {
      if (renderItem) {
        return renderItem(item, index);
      }

      if (typeof item === 'string') {
        return (
          <Badge
            key={index}
            variant={variant}
            size={size}
            className="hover:scale-110 hover:shadow-md transition-all cursor-default"
          >
            {item}
          </Badge>
        );
      }

      return (
        <Badge
          key={index}
          variant={item.variant || variant}
          size={size}
          className="hover:scale-110 hover:shadow-md transition-all cursor-default"
        >
          {item.icon && <span className="mr-1.5">{item.icon}</span>}
          {item.label}
        </Badge>
      );
    };

    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <div className="mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-soft)]">
              {label}
            </span>
          </div>
        )}
        <div className={`flex flex-wrap ${gaps[gap]}`}>
          {children || items.map((item, index) => renderPillItem(item, index))}
        </div>
      </div>
    );
  }
);

Pills.displayName = 'Pills';

// Individual Pill component (basically a styled Badge)
export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeProps['variant'];
  size?: BadgeProps['size'];
  icon?: ReactNode;
  children: ReactNode;
}

export const Pill = forwardRef<HTMLSpanElement, PillProps>(
  (
    {
      variant = 'secondary',
      size = 'sm',
      icon,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        className={`hover:scale-110 hover:shadow-md transition-all cursor-default ${className}`}
        {...props}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {children}
      </Badge>
    );
  }
);

Pill.displayName = 'Pill';

export default Pills;
