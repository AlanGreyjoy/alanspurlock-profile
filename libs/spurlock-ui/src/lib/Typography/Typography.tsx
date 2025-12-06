import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  children: ReactNode;
}

const headingSizes = {
  xs: 'text-sm font-medium',
  sm: 'text-base font-medium',
  md: 'text-lg font-semibold',
  lg: 'text-xl md:text-2xl font-semibold',
  xl: 'text-2xl md:text-3xl font-bold',
  '2xl': 'text-3xl md:text-4xl font-bold',
  '3xl': 'text-4xl md:text-5xl font-bold tracking-tight',
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { as: Tag = 'h2', size = 'lg', className = '', children, ...props },
    ref
  ) => {
    const classes = `${headingSizes[size]} text-[var(--color-text)] ${className}`;

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
