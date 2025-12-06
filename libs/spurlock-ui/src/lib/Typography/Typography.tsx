import { forwardRef, type HTMLAttributes, type ReactNode, type ElementType } from 'react';

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
  ({ as: Tag = 'h2', size = 'lg', className = '', children, ...props }, ref) => {
    const classes = `${headingSizes[size]} text-[var(--color-text)] ${className}`;

    return (
      <Tag ref={ref} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'muted' | 'soft';
  children: ReactNode;
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const textVariants = {
  default: 'text-[var(--color-text)]',
  muted: 'text-[var(--color-text-muted)]',
  soft: 'text-[var(--color-text-soft)]',
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ as: Tag = 'p', size = 'md', variant = 'default', className = '', children, ...props }, ref) => {
    const classes = `${textSizes[size]} ${textVariants[variant]} ${className}`;

    return (
      <Tag ref={ref as any} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default { Heading, Text };
