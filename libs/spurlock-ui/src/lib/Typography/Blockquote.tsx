import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface BlockquoteProps extends HTMLAttributes<HTMLQuoteElement> {
  children: ReactNode;
  attribution?: string;
  icon?: ReactNode;
  variant?: 'info' | 'default' | 'warning' | 'success';
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    border: 'border-l-blue-600',
  },
  default: {
    container: 'bg-gray-50 border-gray-200',
    icon: 'text-gray-600',
    border: 'border-l-gray-600',
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    border: 'border-l-yellow-600',
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    border: 'border-l-green-600',
  },
};

const InfoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 16V12M12 8H12.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProps>(
  (
    { children, attribution, icon, variant = 'info', className = '', ...props },
    ref
  ) => {
    const styles = variantStyles[variant];
    const IconComponent = icon || <InfoIcon />;

    return (
      <blockquote
        ref={ref}
        className={`rounded-lg border ${styles.container} ${styles.border} border-l-4 p-4 ${className}`}
        {...props}
      >
        <div className="flex gap-3">
          <div className={`mt-1 ${styles.icon}`}>{IconComponent}</div>
          <div className="flex-1">
            <div className="text-[var(--color-text)] leading-relaxed">
              {children}
            </div>
            {attribution && (
              <cite className="mt-2 block text-sm italic text-[var(--color-text-muted)] not-italic">
                – {attribution}
              </cite>
            )}
          </div>
        </div>
      </blockquote>
    );
  }
);

Blockquote.displayName = 'Blockquote';

export default Blockquote;
