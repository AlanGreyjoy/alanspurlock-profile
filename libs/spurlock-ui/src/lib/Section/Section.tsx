import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className = '', title, subtitle, children, ...props }, ref) => {
    return (
      <section ref={ref} className={`py-8 md:py-12 ${className}`} {...props}>
        {(title || subtitle) && (
          <div className="mb-6 md:mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--color-text-muted)] text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export default Section;
