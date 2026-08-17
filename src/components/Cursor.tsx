import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !prefersReducedMotion();
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: cursor.x, y: cursor.y };
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest(
        'a, button, input, [role="button"], [data-cursor="hover"]',
      );
      hovering = !!isInteractive;
      targetScale = hovering ? 2.4 : 1;
    };

    const tick = () => {
      ringPos.x += (cursor.x - ringPos.x) * 0.18;
      ringPos.y += (cursor.y - ringPos.y) * 0.18;
      scale += (targetScale - scale) * 0.18;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${cursor.x - 3}px, ${cursor.y - 3}px, 0)`;
        dot.current.style.opacity = hovering ? '0' : '1';
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x - 18}px, ${ringPos.y - 18}px, 0) scale(${scale})`;
        ring.current.style.background = hovering
          ? 'var(--color-accent-500)'
          : 'transparent';
        ring.current.style.borderColor = hovering
          ? 'var(--color-accent-500)'
          : 'rgba(10, 10, 10, 0.5)';
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] size-1.5 rounded-full bg-[color:var(--color-ink-400)] transition-opacity duration-200"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[200] size-9 rounded-full border transition-colors duration-300"
      />
    </>
  );
}
