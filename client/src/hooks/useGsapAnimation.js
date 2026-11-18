import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Reusable hook to create safe, clean GSAP timelines with automatic cleanup
 */
export function useGsapAnimation(animationCallback, dependencies = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (typeof animationCallback === 'function') {
        animationCallback();
      }
    }, containerRef);

    return () => ctx.revert();
  }, dependencies);

  return containerRef;
}

