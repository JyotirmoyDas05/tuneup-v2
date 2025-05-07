import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

// Common animation presets
export const fadeIn = (element: string | object, delay: number = 0, duration: number = 1) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration,
    delay,
    ease: 'power3.out',
  });
};

export const slideInLeft = (element: string | object, delay: number = 0, duration: number = 1) => {
  return gsap.from(element, {
    opacity: 0,
    x: -60,
    duration,
    delay,
    ease: 'power3.out',
  });
};

export const slideInRight = (element: string | object, delay: number = 0, duration: number = 1) => {
  return gsap.from(element, {
    opacity: 0,
    x: 60,
    duration,
    delay,
    ease: 'power3.out',
  });
};

export const staggerReveal = (elements: string | object, stagger: number = 0.1, delay: number = 0, duration: number = 1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger,
    delay,
    duration,
    ease: 'power3.out',
  });
};

// Function to initialize ScrollSmoother
export const initSmoothScroll = (wrapper: string = '#smooth-wrapper', content: string = '#smooth-content') => {
  if (typeof window !== 'undefined') {
    return ScrollSmoother.create({
      wrapper,
      content,
      smooth: 1.5, // How long the smoothing should take (in seconds)
      effects: true, // Enables the ability to add effects to elements within the smooth scrolling area
      smoothTouch: 0.1, // Less aggressive smoothing for touch devices
    });
  }
  return null;
};

// Function to create scroll-triggered animations
export const createScrollTrigger = (
  trigger: string | object,
  animation: gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTrigger.Vars = {},
) => {
  return ScrollTrigger.create({
    trigger,
    animation,
    start: 'top 80%',
    end: 'bottom 20%',
    markers: process.env.NODE_ENV === 'development',
    toggleActions: 'play none none reverse',
    ...options,
  });
};

// Create a parallax effect
export const createParallax = (element: string | object, speed: number = 0.5) => {
  return gsap.to(element, {
    yPercent: -20 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Export GSAP for direct use
export { gsap, ScrollTrigger, ScrollSmoother };