import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted' | 'accent';
  external?: boolean;
  children: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className = '', variant = 'default', external = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center gap-1 transition-colors duration-200 hover:underline underline-offset-4';

    const variants = {
      default: 'text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]',
      muted: 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
      accent: 'text-[var(--color-accent-dark)] hover:text-[var(--color-accent)]',
    };

    const classes = `${baseStyles} ${variants[variant]} ${className}`;

    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};

    return (
      <a ref={ref} className={classes} {...externalProps} {...props}>
        {children}
        {external && (
          <svg
            className="w-3.5 h-3.5 opacity-60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
