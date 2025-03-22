'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AvatarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const AvatarRoot = React.forwardRef<HTMLDivElement, AvatarRootProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    const sizes = {
      xs: 'h-6 w-6',
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md transition-all duration-300 hover:scale-110 hover:shadow-lg',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AvatarRoot.displayName = 'AvatarRoot'

interface AvatarImageProps extends Omit<React.ComponentPropsWithoutRef<typeof Image>, 'src'> {
  src?: string | null
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = '', ...props }, ref) => {
    const [hasError, setHasError] = useState(false)

    if (!src || hasError) {
      return null
    }

    return (
      <div className="absolute inset-0">
        <Image
          ref={ref}
          src={src}
          alt={alt}
          className={cn('h-full w-full object-cover transition-opacity duration-300', className)}
          fill
          sizes="100%"
          onError={() => setHasError(true)}
          {...props}
        />
      </div>
    )
  }
)

AvatarImage.displayName = 'AvatarImage'

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-gray-800 font-medium animate-in fade-in-75 zoom-in-95 transition-all duration-300',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AvatarFallback.displayName = 'AvatarFallback'

// Export the components
export { AvatarRoot as Root, AvatarImage as Image, AvatarFallback as Fallback }
