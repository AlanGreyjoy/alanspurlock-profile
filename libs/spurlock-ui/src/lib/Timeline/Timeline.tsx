import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  isValidElement,
  cloneElement,
} from 'react';

// Timeline Container
export interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <div ref={ref} className={`relative ${className}`} {...props}>
        {/* Timeline vertical line with gradient */}
        <div className="absolute left-2 md:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-border)]" />

        <div className="space-y-10 md:space-y-12">{children}</div>
      </div>
    );
  }
);

Timeline.displayName = 'Timeline';

// Timeline Item
export interface TimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The date or period to display (e.g., "June 2024 - Present" or "2024") */
  date?: string;
  /** Year to display separately (optional, can be used with or without date) */
  year?: string;
  /** Icon element (Lucide icon component), emoji string, or custom ReactNode to display in the timeline dot */
  icon?: ReactNode;
  /** Show default dot if no icon provided */
  showDefaultDot?: boolean;
  /** Main content of the timeline item */
  children: ReactNode;
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className = '',
      date,
      year,
      icon,
      showDefaultDot = true,
      children,
      ...props
    },
    ref
  ) => {
    const displayDate = date || year;

    // Helper to render the icon with proper styling
    const renderIcon = () => {
      if (!icon) return null;

      // If it's a string (emoji), render it directly
      if (typeof icon === 'string') {
        return <span className="text-sm">{icon}</span>;
      }

      // If it's a valid React element (like a Lucide icon), clone it with proper sizing
      if (isValidElement(icon)) {
        return cloneElement(icon as React.ReactElement<any>, {
          className: 'w-4 h-4',
          strokeWidth: 2.5,
        });
      }

      // Otherwise, render it as-is
      return icon;
    };

    return (
      <div
        ref={ref}
        className={`relative pl-10 md:pl-24 group ${className}`}
        {...props}
      >
        {/* Timeline dot with optional icon */}
        <div className="absolute left-2 md:left-10 top-4 -translate-x-1/2 z-10">
          {icon ? (
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/50 ring-4 ring-white group-hover:scale-125 transition-transform duration-300 flex items-center justify-center text-white">
              {renderIcon()}
            </div>
          ) : showDefaultDot ? (
            <div className="w-4 h-4 rounded-full bg-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/50 ring-4 ring-white group-hover:scale-125 transition-transform duration-300" />
          ) : null}
        </div>

        {/* Content wrapper */}
        <div className="relative">
          {/* Optional date badge at the top */}
          {displayDate && (
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]">
                {displayDate}
              </span>
            </div>
          )}

          {/* Main content */}
          {children}
        </div>
      </div>
    );
  }
);

TimelineItem.displayName = 'TimelineItem';

export default Timeline;
