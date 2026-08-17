import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/utils';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return <>{children}</>;
}
