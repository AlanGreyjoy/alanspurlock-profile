import { forwardRef, type ImgHTMLAttributes } from 'react';

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** The source URL for the avatar image */
  src: string;
  /** Alternative text for the image */
  alt: string;
  /** The shape variant of the avatar */
  variant?: 'circle' | 'square' | 'rounded';
  /** The size of the avatar */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Optional fallback to show when image fails to load */
  fallback?: string;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (
    {
      className = '',
      src,
      alt,
      variant = 'circle',
      size = 'md',
      fallback,
      onError,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'object-cover border-2 border-gray-200 shadow-md';

    const variants = {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded-lg',
    };

    const sizes = {
      xs: 'w-8 h-8',
      sm: 'w-12 h-12',
      md: 'w-16 h-16',
      lg: 'w-24 h-24',
      xl: 'w-32 h-32',
      '2xl': 'w-40 h-40',
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
      if (fallback) {
        e.currentTarget.src = fallback;
      }
      onError?.(e);
    };

    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={classes}
        onError={handleError}
        {...props}
      />
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
