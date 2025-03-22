'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = 'md', type, ...props }, ref) => {
    const sizes = {
      xs: 'h-7 px-2 text-xs',
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-11 px-5 text-lg',
      xl: 'h-12 px-6 text-xl'
    }
    
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-md border-2 border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-primary/70 focus:shadow-lg hover:shadow-md shadow-sm',
          sizes[inputSize],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input } 