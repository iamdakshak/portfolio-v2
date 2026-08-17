import { useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

type TiltProps = {
  children: ReactNode;
  className?: string;
  /** Max degrees of rotation. */
  max?: number;
  /** Pop the card slightly forward on hover. */
  lift?: number;
};

export function Tilt({
  children,
  className,
  max = 8,
  lift = 6,
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${lift}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
