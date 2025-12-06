import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface ListProps
  extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children: ReactNode;
  type?: 'ordered' | 'unordered';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  spacing?: 'xs' | 'sm' | 'md' | 'lg';
  withPadding?: boolean;
  icon?: ReactNode;
}

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  icon?: ReactNode;
}

const listSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const listSpacing = {
  xs: 'space-y-0.5',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-3',
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, icon, className = '', ...props }, ref) => {
    if (icon) {
      return (
        <li
          ref={ref}
          className={`flex items-start gap-2 ${className}`}
          {...props}
        >
          <span className="mt-0.5 flex-shrink-0">{icon}</span>
          <span className="flex-1">{children}</span>
        </li>
      );
    }

    return (
      <li ref={ref} className={className} {...props}>
        {children}
      </li>
    );
  }
);

ListItem.displayName = 'List.Item';

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  (
    {
      children,
      type = 'unordered',
      size = 'md',
      spacing = 'sm',
      withPadding = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const Tag = type === 'ordered' ? 'ol' : 'ul';
    const sizeClass = listSizes[size];
    const spacingClass = listSpacing[spacing];
    const paddingClass = withPadding ? 'pl-6' : '';

    const listStyleClass = type === 'ordered' ? 'list-decimal' : 'list-disc';
    const listPosition = withPadding ? 'list-inside' : 'list-outside';

    const baseClasses = `${listStyleClass} ${listPosition} ${sizeClass} ${spacingClass} ${paddingClass} text-[var(--color-text)] ${className}`;

    return (
      <Tag ref={ref as any} className={baseClasses} {...props}>
        {children}
      </Tag>
    );
  }
);

List.displayName = 'List';

// Attach Item as a static property
(List as any).Item = ListItem;

export default List;
