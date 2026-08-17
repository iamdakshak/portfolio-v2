import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getFeaturedProjects, type FeaturedProject } from '@/data/resume';
import { Tilt } from '@/components/Tilt';
import { ProjectCover } from '@/components/ProjectCover';

const kindLabel: Record<FeaturedProject['kind'], string> = {
  work: '◉ Work',
  personal: '◎ Personal',
  meta: '✦ Meta',
};

export function Projects() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);

  useEffect(() => {
    setProjects(getFeaturedProjects());

    // React to changes from the admin page in another tab
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio:featuredProjects:v1') {
        setProjects(getFeaturedProjects());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <section id="work" className="relative w-full">
      <div className="container-edge mx-auto max-w-[100rem] py-24 sm:py-36">
        {/* Top row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col gap-3 sm:mb-16 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <span className="label">Selected work — '19 to today</span>
          <span className="max-w-md text-sm text-[color:var(--color-mute-400)] sm:text-right">
            Side projects I built to learn something. Day-job work lives a
            section below.
          </span>
        </motion.div>

        {/* Project grid */}
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{
                duration: 0.85,
                delay: Math.min(i * 0.07, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-5"
              data-cursor="hover"
            >
              {/* Visual cover */}
              <Tilt className="block" max={6} lift={4}>
                <a
                  href={p.links?.[0]?.href ?? '#'}
                  target={p.links?.[0]?.href ? '_blank' : undefined}
                  rel={p.links?.[0]?.href ? 'noreferrer noopener' : undefined}
                  className="group relative block aspect-[8/5] overflow-hidden rounded-2xl border border-black/[0.08] bg-[color:var(--color-paper-200)] shadow-[0_30px_60px_-30px_rgba(10,14,31,0.18)]"
                >
                  <ProjectCover project={p} />

                  {/* Hover overlay */}
                  <div className="pointer-events-none absolute inset-0 flex items-end justify-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-paper-50)]/90 px-4 py-1.5 text-xs text-[color:var(--color-ink-400)] backdrop-blur-sm">
                      Visit
                      <span>↗</span>
                    </span>
                  </div>
                </a>
              </Tilt>

              {/* Meta + content */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mute-500)]">
                  <span
                    className={
                      p.kind === 'work'
                        ? 'rounded-full bg-[color:var(--color-ink-400)] px-2.5 py-1 text-[color:var(--color-paper-50)]'
                        : p.kind === 'meta'
                          ? 'rounded-full border border-[color:var(--color-accent-500)]/40 px-2.5 py-1 text-[color:var(--color-accent-500)]'
                          : 'rounded-full border border-[color:var(--color-ink-400)]/20 px-2.5 py-1 text-[color:var(--color-ink-400)]'
                    }
                  >
                    {kindLabel[p.kind]}
                  </span>
                  <span>{p.year}</span>
                </div>

                <h3 className="font-display text-3xl leading-[1] text-[color:var(--color-ink-400)] sm:text-4xl">
                  {p.name}
                </h3>

                <p className="text-base leading-relaxed text-[color:var(--color-ink-200)]">
                  {p.tagline}
                </p>

                <p className="text-sm leading-relaxed text-[color:var(--color-mute-500)]">
                  {p.description}
                </p>

                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-mute-400)]">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                {p.links && p.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.links.map((l, li) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className={
                          li === 0
                            ? 'inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-ink-400)] px-3.5 py-1.5 text-xs text-[color:var(--color-paper-50)] transition-colors hover:bg-[color:var(--color-accent-500)]'
                            : 'inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-ink-400)]/20 bg-[color:var(--color-paper-50)] px-3.5 py-1.5 text-xs text-[color:var(--color-ink-400)] transition-colors hover:border-[color:var(--color-accent-500)] hover:text-[color:var(--color-accent-500)]'
                        }
                      >
                        {l.label}
                        <span className="text-[10px] opacity-70">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footnote / hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 max-w-2xl text-sm text-[color:var(--color-mute-400)]"
        >
          More to come — I keep this list short on purpose. The latest things I
          ship at work (Puppet Forge, CloudOps, Force UI) live in the timeline
          below.
        </motion.p>
      </div>
    </section>
  );
}
