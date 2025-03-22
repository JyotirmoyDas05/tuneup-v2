import { useEffect } from "react";

// Use a more generic approach with Element to catch all HTML element types
export function useMousePosition<T extends Element>(
  ref: React.RefObject<T | null>,
  callback?: ({ x, y }: { x: number; y: number }) => void,
) {
  useEffect(() => {
    // Skip if ref or ref.current is null
    if (!ref || !ref.current) return;

    const handleMouseMove = (event: Event) => {
      const mouseEvent = event as MouseEvent;
      const { clientX, clientY } = mouseEvent;
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

      callback?.({ x: clientX - left, y: clientY - top });
    };

    const handleTouchMove = (event: Event) => {
      const touchEvent = event as TouchEvent;
      const { clientX, clientY } = touchEvent.touches[0];
      const { top, left } = ref.current?.getBoundingClientRect() || {
        top: 0,
        left: 0,
      };

      callback?.({ x: clientX - left, y: clientY - top });
    };

    // Add event listeners safely
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("touchmove", handleTouchMove);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [ref, callback]);
} 