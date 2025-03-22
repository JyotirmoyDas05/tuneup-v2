import {
  type ElementType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
  createContext,
  forwardRef,
  useContext,
} from 'react'
import { cn } from '@/lib/utils'

// This is a simplified version of the style context
// that doesn't rely on styled-system
// It allows us to maintain compatibility with existing component code

type StyleContextType = Record<string, unknown>;

export const createStyleContext = () => {
  const StyleContext = createContext<StyleContextType | null>(null)

  // Simplified utility function to replace the original
  const withProvider = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    _slot: string,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = forwardRef<T, P>((props, ref) => {
      return <Component {...props} ref={ref} className={props.className} />
    })
    
    const displayName = 
      typeof Component === 'string' 
        ? Component 
        : (Component as any).displayName || (Component as any).name || 'StyledComponent'
    
    StyledComponent.displayName = displayName
    return StyledComponent
  }

  // Simplified utility function to replace the original
  const withContext = <T, P extends { className?: string | undefined }>(
    Component: ElementType,
    _slot: string,
  ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> => {
    const StyledComponent = forwardRef<T, P>((props, ref) => {
      return <Component {...props} ref={ref} className={cn(props.className)} />
    })
    
    const displayName = 
      typeof Component === 'string' 
        ? Component 
        : (Component as any).displayName || (Component as any).name || 'StyledComponent'
    
    StyledComponent.displayName = displayName
    return StyledComponent
  }

  return {
    StyleContext,
    withProvider,
    withContext,
  }
}
