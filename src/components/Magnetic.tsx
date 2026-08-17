import { useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0, 0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </div>
  );
}
