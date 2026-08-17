import { cn } from '@/lib/utils';

type LogoProps = {
  /** Just the cube mark, no wordmark. */
  markOnly?: boolean;
  className?: string;
};

/**
 * Brand mark — an isometric cube wireframe paired with a lowercase
 * "dakshak." wordmark. Cube subtly rotates on hover (CSS only). Hints
 * at the 3D / games side without being literal.
 */
export function Logo({ markOnly, className }: LogoProps) {
  return (
    <span
      className={cn(
        'group inline-flex items-center gap-2.5 align-middle',
        className,
      )}
    >
      <span
        aria-hidden
        className="relative inline-block size-7 transition-transform duration-700 ease-out group-hover:rotate-[-12deg]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-full"
        >
          {/* Top face */}
          <path d="M 12 3 L 3.5 7.5 L 12 12 L 20.5 7.5 Z" />
          {/* Front-left edges */}
          <path d="M 3.5 7.5 L 3.5 16.5 L 12 21 L 12 12" />
          {/* Front-right edges */}
          <path d="M 12 12 L 12 21 L 20.5 16.5 L 20.5 7.5" />
          {/* Inner accent dot */}
          <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </span>
      {!markOnly && (
        <span className="font-display text-[15px] font-medium tracking-tight text-[color:var(--color-ink-400)]">
          dakshak<span className="text-[color:var(--color-accent-500)]">.</span>
        </span>
      )}
    </span>
  );
}
