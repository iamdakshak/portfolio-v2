import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

let enginePromise: Promise<void> | null = null;

function ensureEngine() {
  if (!enginePromise) {
    enginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }
  return enginePromise;
}

export function ParticlesField({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    ensureEngine().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: 'transparent' },
      fpsLimit: 60,
      detectRetina: true,
      smooth: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: true, mode: 'grab' },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 170,
            links: { opacity: 0.55, color: '#1d4ed8' },
          },
        },
      },
      particles: {
        number: {
          value: 70,
          density: { enable: true, width: 1600, height: 900 },
        },
        color: { value: '#0a0e1f' },
        links: {
          enable: true,
          distance: 140,
          color: '#0a0e1f',
          opacity: 0.18,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.55,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        opacity: {
          value: { min: 0.2, max: 0.55 },
          animation: {
            enable: true,
            speed: 0.4,
            sync: false,
            startValue: 'random',
          },
        },
        size: { value: { min: 1, max: 2.4 } },
        shape: { type: 'circle' },
      },
    }),
    [],
  );

  if (reducedMotion || !ready) return null;

  return (
    <Particles
      id="hero-particles"
      options={options}
      className={className}
    />
  );
}
