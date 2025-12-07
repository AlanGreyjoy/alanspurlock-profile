import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

export interface HorizontalCardProps extends HTMLAttributes<HTMLDivElement> {
  /** URL of the image to display */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Title of the card */
  title: ReactNode;
  /** Subtitle or role description */
  subtitle?: ReactNode;
  /** Main description/content */
  description?: ReactNode;
  /** Array of tags/technologies to display */
  tags?: string[];
  /** Footer content (e.g., "Learn More →") */
  footer?: ReactNode;
  /** Variant style */
  variant?: 'default' | 'feature';
  /** Whether to show hover effects */
  hoverable?: boolean;
  /** Image container background gradient */
  imageBackground?: string;
}

export const HorizontalCard = forwardRef<HTMLDivElement, HorizontalCardProps>(
  (
    {
      className = '',
      imageSrc,
      imageAlt = '',
      title,
      subtitle,
      description,
      tags = [],
      footer,
      variant = 'feature',
      hoverable = true,
      imageBackground = 'bg-gradient-to-br from-[#00d1b2]/10 to-[#ff0055]/10',
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'transition-all duration-300 rounded-2xl overflow-hidden';

    const variants = {
      default: 'bg-white border border-gray-200',
      feature: 'bg-white border border-gray-100 shadow-sm',
    };

    const hoverStyles = hoverable
      ? 'hover:shadow-xl hover:-translate-y-2 cursor-pointer'
      : '';

    const classes = `${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`;

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          {imageSrc && (
            <div
              className={`w-full md:w-2/5 h-64 md:h-auto ${imageBackground} flex items-center justify-center overflow-hidden`}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            {title && (
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-[#ff0055] transition-colors">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="text-gray-500 mb-4 font-medium text-lg md:text-xl">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6 line-clamp-3">
                {description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {footer && (
              <div className="text-[#ff0055] font-bold text-lg group-hover:translate-x-2 transition-transform inline-block">
                {footer}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    );
  }
);

HorizontalCard.displayName = 'HorizontalCard';

export default HorizontalCard;

