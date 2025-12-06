import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: 'p' | 'span' | 'div' | 'label';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?:
    | 'default'
    | 'muted'
    | 'soft'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  italic?: boolean;
  underline?: boolean;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
};

const textColors = {
  default: 'text-[var(--color-text)]',
  muted: 'text-gray-500',
  soft: 'text-gray-400',
  primary: 'text-blue-600',
  secondary: 'text-purple-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
};

const textWeights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const textAligns = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const lineClamps = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
};

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      as: Tag = 'p',
      size = 'md',
      color = 'default',
      weight = 'normal',
      align = 'left',
      italic = false,
      underline = false,
      lineClamp,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClass = textSizes[size];
    const colorClass = textColors[color];
    const weightClass = textWeights[weight];
    const alignClass = textAligns[align];
    const italicClass = italic ? 'italic' : '';
    const underlineClass = underline ? 'underline' : '';
    const lineClampClass = lineClamp ? lineClamps[lineClamp] : '';

    const classes =
      `${sizeClass} ${colorClass} ${weightClass} ${alignClass} ${italicClass} ${underlineClass} ${lineClampClass} ${className}`.trim();

    return (
      <Tag ref={ref as any} className={classes} {...props}>
        {children}
      </Tag>
    );
  }
);

Text.displayName = 'Text';

export default Text;
