'use client'
import React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'solid' | 'subtle' | 'outline'
type BadgeSize = 'sm' | 'md' | 'lg'
type BadgeColorScheme = 'gray' | 'red' | 'green' | 'blue' | 'yellow' | 'purple'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  colorScheme?: BadgeColorScheme
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'solid', size = 'md', colorScheme = 'gray', ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center rounded-full font-medium transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg'

    // Size variations
    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'text-md px-3 py-1'
    }

    // Color variations based on color scheme
    const colorStyles = {
      solid: {
        gray: 'bg-gray-900 text-gray-50',
        red: 'bg-red-500 text-white',
        green: 'bg-green-500 text-white',
        blue: 'bg-blue-500 text-white',
        yellow: 'bg-yellow-500 text-white',
        purple: 'bg-purple-500 text-white'
      },
      subtle: {
        gray: 'bg-gray-100 text-gray-800',
        red: 'bg-red-100 text-red-800',
        green: 'bg-green-100 text-green-800',
        blue: 'bg-blue-100 text-blue-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        purple: 'bg-purple-100 text-purple-800'
      },
      outline: {
        gray: 'border border-gray-200 text-gray-800',
        red: 'border border-red-200 text-red-800',
        green: 'border border-green-200 text-green-800',
        blue: 'border border-blue-200 text-blue-800',
        yellow: 'border border-yellow-200 text-yellow-800',
        purple: 'border border-purple-200 text-purple-800'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          colorStyles[variant][colorScheme],
          className
        )}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
