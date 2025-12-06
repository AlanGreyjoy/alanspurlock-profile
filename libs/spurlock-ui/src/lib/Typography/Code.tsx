import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  variant?: 'inline' | 'block';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  language?: string;
  showLineNumbers?: boolean;
}

const codeSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Code = forwardRef<HTMLElement, CodeProps>(
  (
    {
      children,
      variant = 'inline',
      size = 'sm',
      language,
      showLineNumbers = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const sizeClass = codeSizes[size];

    if (variant === 'block') {
      return (
        <div className={`relative rounded-lg ${className}`}>
          {language && (
            <div className="absolute right-3 top-3 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
              {language}
            </div>
          )}
          <pre
            ref={ref as any}
            className={`overflow-x-auto rounded-lg bg-gray-900 p-4 ${sizeClass}`}
            {...props}
          >
            <code className="font-mono text-gray-100">{children}</code>
          </pre>
        </div>
      );
    }

    return (
      <code
        ref={ref as any}
        className={`inline-block rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-800 ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  }
);

Code.displayName = 'Code';

export default Code;
