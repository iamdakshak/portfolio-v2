import { createElement, useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

const SCRIPT_SRC =
  'https://unpkg.com/@splinetool/viewer/build/spline-viewer.js';

let scriptPromise: Promise<void> | null = null;

function loadSplineScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (customElements.get('spline-viewer')) return resolve();
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-spline-viewer]`,
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Spline viewer failed to load')),
      );
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = SCRIPT_SRC;
    script.dataset.splineViewer = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Spline viewer failed to load'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type Props = {
  url: string;
  className?: string;
  minViewportWidth?: number;
};

export function SplineCharacter({
  url,
  className,
  minViewportWidth = 1024,
}: Props) {
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mq = window.matchMedia(`(min-width: ${minViewportWidth}px)`);
    const update = () => setShouldMount(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [minViewportWidth]);

  useEffect(() => {
    if (!shouldMount) return;
    let cancelled = false;
    loadSplineScript()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        /* decorative — fail silently */
      });
    return () => {
      cancelled = true;
    };
  }, [shouldMount]);

  if (!shouldMount || !ready) return null;

  const fadeMask =
    'radial-gradient(ellipse at center, black 56%, transparent 92%)';

  return (
    <div
      className={className}
      aria-hidden
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
        filter: 'drop-shadow(0 28px 36px rgba(10,14,31,0.18))',
      }}
    >
      {createElement('spline-viewer', {
        url,
        'events-target': 'global',
        loading: 'lazy',
        style: { width: '100%', height: '100%', display: 'block' },
      })}
    </div>
  );
}
