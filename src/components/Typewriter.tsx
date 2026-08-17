import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

type TypewriterProps = {
  text: string;
  /** Delay before typing starts (ms). */
  delay?: number;
  /** Per-character speed (ms). */
  speed?: number;
  /** Show a blinking caret while typing. */
  caret?: boolean;
};

/**
 * Types `text` character-by-character after `delay`. Respects
 * prefers-reduced-motion (renders the full text immediately).
 * The full string is exposed to assistive tech via aria-label so
 * screen readers don't read every keystroke.
 */
export function Typewriter({
  text,
  delay = 0,
  speed = 65,
  caret = true,
}: TypewriterProps) {
  const reduce =
    typeof window !== 'undefined' && prefersReducedMotion();
  const [shown, setShown] = useState(reduce ? text : '');
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      if (cancelled) return;
      let i = 0;
      intervalId = window.setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, delay);
    return () => {
      cancelled = true;
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [text, delay, speed, reduce]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{shown}</span>
      {caret && !done && (
        <span
          aria-hidden
          className="inline-block ml-[0.04em] -mb-[0.06em] h-[0.78em] w-[0.06em] bg-current animate-pulse align-baseline"
        />
      )}
    </span>
  );
}
