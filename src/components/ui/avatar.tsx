import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', fallback, size = 'md', className }, ref) => {
    const [error, setError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-full overflow-hidden bg-gray-100',
          sizeClasses[size],
          className
        )}
      >
        {src && !error ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
            {fallback || alt.charAt(0).toUpperCase() || '?'}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
