import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  size?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | number;
  textWrap?: boolean;
}

const semanticSizes = {
  h1: 'text-4xl md:text-5xl font-bold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
};

const tshirtSizes = {
  xs: 'text-sm font-medium',
  sm: 'text-base font-medium',
  md: 'text-lg font-semibold',
  lg: 'text-xl md:text-2xl font-semibold',
  xl: 'text-2xl md:text-3xl font-bold',
  '2xl': 'text-3xl md:text-4xl font-bold',
  '3xl': 'text-4xl md:text-5xl font-bold tracking-tight',
};

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    { children, order = 1, size, textWrap = true, className = '', ...props },
    ref
  ) => {
    const Tag = `h${order}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    let sizeClass = '';
    const customStyle: React.CSSProperties = {};

    if (size === undefined) {
      // If no size provided, use the semantic size based on order
      sizeClass = semanticSizes[`h${order}` as keyof typeof semanticSizes];
    } else if (typeof size === 'number') {
      // If size is a number, use it as pixel size
      customStyle.fontSize = `${size}px`;
      sizeClass = 'font-bold';
    } else if (size in semanticSizes) {
      // If size is a semantic size (h1-h6)
      sizeClass = semanticSizes[size as keyof typeof semanticSizes];
    } else if (size in tshirtSizes) {
      // If size is a t-shirt size (xs, sm, md, etc.)
      sizeClass = tshirtSizes[size as keyof typeof tshirtSizes];
    }

    const textWrapClass = textWrap
      ? ''
      : 'whitespace-nowrap overflow-hidden text-ellipsis';

    const classes =
      `${sizeClass} ${textWrapClass} text-[var(--color-text)] ${className}`.trim();

    return (
      <Tag ref={ref} className={classes} style={customStyle} {...props}>
        {children}
      </Tag>
    );
  }
);

Title.displayName = 'Title';

export default Title;
