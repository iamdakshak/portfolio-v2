import { useEffect, useRef, useState } from 'react';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Loader } from '@/components/Loader';
import { Navigation } from '@/components/Navigation';
import { Cursor } from '@/components/Cursor';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { AdminPage } from '@/components/AdminPage';

function isAdminRoute() {
  if (typeof window === 'undefined') return false;
  const search = new URLSearchParams(window.location.search);
  return search.has('edit') || window.location.pathname === '/edit';
}

function useFontReadyProgress() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let stopped = false;
    const start = performance.now();

    const tick = (now: number) => {
      if (stopped) return;
      const elapsed = now - start;
      const target = done ? 1 : Math.min(0.92, elapsed / 1200);

      const next =
        progressRef.current + (target - progressRef.current) * 0.18;
      progressRef.current =
        Math.abs(target - next) < 0.001 ? target : next;
      setProgress(progressRef.current);

      if (done && progressRef.current >= 0.999) {
        stopped = true;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [done]);

  useEffect(() => {
    let cancelled = false;
    const ready = () => {
      if (!cancelled) setDone(true);
    };
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        const w = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
        w(ready);
      });
    } else {
      setTimeout(ready, 800);
    }
    const t = setTimeout(ready, 2200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return { progress, done };
}

function Portfolio() {
  const { progress, done } = useFontReadyProgress();

  return (
    <SmoothScroll>
      <Loader progress={progress} done={done} />
      <Cursor />

      <div className="grain" />

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

function App() {
  return isAdminRoute() ? <AdminPage /> : <Portfolio />;
}

export default App;
