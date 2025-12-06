import { type HTMLAttributes, type ReactNode } from 'react';

export interface HighlightProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  highlight: string | string[];
  caseSensitive?: boolean;
  variant?: 'yellow' | 'blue' | 'green' | 'red' | 'purple';
  highlightClassName?: string;
}

const variantStyles = {
  yellow: 'bg-yellow-200 text-gray-900',
  blue: 'bg-blue-200 text-gray-900',
  green: 'bg-green-200 text-gray-900',
  red: 'bg-red-200 text-gray-900',
  purple: 'bg-purple-200 text-gray-900',
};

export const Highlight: React.FC<HighlightProps> = ({
  children,
  highlight,
  caseSensitive = false,
  variant = 'yellow',
  highlightClassName = '',
  className = '',
  ...props
}) => {
  const highlightClass = `${variantStyles[variant]} px-1 rounded ${highlightClassName}`;

  const highlightTerms = Array.isArray(highlight) ? highlight : [highlight];

  if (highlightTerms.length === 0 || !children) {
    return (
      <span className={className} {...props}>
        {children}
      </span>
    );
  }

  // Create a regex pattern to match all highlight terms
  const pattern = highlightTerms
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  const regex = new RegExp(`(${pattern})`, caseSensitive ? 'g' : 'gi');

  const parts = children.split(regex);

  return (
    <span className={className} {...props}>
      {parts.map((part, index) => {
        const shouldHighlight = highlightTerms.some((term) =>
          caseSensitive
            ? part === term
            : part.toLowerCase() === term.toLowerCase()
        );

        if (shouldHighlight) {
          return (
            <mark key={index} className={highlightClass}>
              {part}
            </mark>
          );
        }

        return part;
      })}
    </span>
  );
};

Highlight.displayName = 'Highlight';

export default Highlight;
