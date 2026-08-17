import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { navItems, profile } from '@/data/resume';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-black/[0.06] bg-[color:var(--color-paper-100)]/85 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="container-edge mx-auto flex h-16 max-w-[100rem] items-center justify-between gap-4">
        <a
          href="#hero"
          aria-label="Home"
          data-cursor="hover"
          className="text-[color:var(--color-ink-400)] transition-colors hover:text-[color:var(--color-accent-500)]"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={item.target}
                data-cursor="hover"
                className="rounded-full px-3.5 py-2 text-[13px] text-[color:var(--color-mute-500)] transition-colors hover:text-[color:var(--color-ink-400)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-full text-[color:var(--color-mute-500)] transition-colors hover:bg-black/5 hover:text-[color:var(--color-ink-400)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.07 3.29 9.37 7.86 10.89.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.36 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="hover"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-full text-[color:var(--color-mute-500)] transition-colors hover:bg-black/5 hover:text-[color:var(--color-ink-400)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            className="ml-2 hidden items-center gap-2 rounded-full bg-[color:var(--color-ink-400)] px-4 py-2 text-[13px] text-[color:var(--color-paper-50)] transition-colors hover:bg-[color:var(--color-accent-500)] sm:inline-flex"
          >
            Let's talk
            <span className="text-[10px] opacity-70">↗</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
