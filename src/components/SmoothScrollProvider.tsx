'use client';

import React, { useEffect, useRef } from 'react';
import { initSmoothScroll } from '@/lib/animation/gsap';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll
    const smoother = initSmoothScroll('#smooth-wrapper', '#smooth-content');
    
    // Clean up on unmount
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef} className="overflow-hidden">
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScrollProvider; 