import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

const getInitialPrefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(QUERY).matches;
};

const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPrefersReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handler = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
};

export default usePrefersReducedMotion;
