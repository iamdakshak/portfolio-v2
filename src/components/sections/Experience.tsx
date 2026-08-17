import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { milestones, type Milestone } from '@/data/resume';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);

  // Scroll-tied progress for the rail fill — the colored line grows as
  // the user reads down the timeline.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 65%', 'end 35%'],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative w-full">
      <div className="container-edge mx-auto max-w-[100rem] py-24 sm:py-36">
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-12 flex items-baseline justify-between sm:mb-16"
        >
          <span className="label">The path so far</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-mute-400)]">
            {milestones.length} milestones · '16 → now
          </span>
        </motion.div>

        {/* Timeline */}
        <div ref={railRef} className="relative">
          {/* The rail — base + scroll-tied fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[68px] top-2 h-[calc(100%-1rem)] w-px bg-black/[0.08] sm:left-[120px]"
          >
            <motion.div
              style={{ scaleY: fillScale, transformOrigin: 'top' }}
              className="absolute inset-0 origin-top bg-[color:var(--color-accent-500)]"
            />
          </div>

          <ol className="flex flex-col gap-12 sm:gap-16">
            {milestones.map((m, i) => (
              <MilestoneRow key={`${m.year}-${m.title}`} milestone={m} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function MilestoneRow({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{ duration: 0.7, delay: Math.min(index * 0.05, 0.2), ease: easeOut }}
      className="relative grid grid-cols-[55px_30px_1fr] items-start gap-x-4 sm:grid-cols-[100px_40px_1fr] sm:gap-x-8"
    >
      {/* Year */}
      <div className="pt-1 text-right">
        <div
          className={
            milestone.kind === 'now'
              ? 'font-display text-base font-medium text-[color:var(--color-accent-500)] sm:text-lg'
              : 'font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-mute-500)] sm:text-[12px]'
          }
        >
          {milestone.year}
        </div>
      </div>

      {/* Marker on the rail */}
      <div className="relative pt-1.5">
        <Marker kind={milestone.kind} />
      </div>

      {/* Content */}
      <div className="min-w-0 pb-2">
        <h3 className="font-display text-balance text-[20px] leading-tight text-[color:var(--color-ink-400)] sm:text-2xl">
          {milestone.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[color:var(--color-ink-200)] sm:text-base">
          {milestone.detail}
        </p>
        {milestone.meta && (
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mute-400)]">
            {milestone.meta}
          </div>
        )}
      </div>
    </motion.li>
  );
}

function Marker({ kind }: { kind: Milestone['kind'] }) {
  const base =
    'relative z-10 grid size-5 place-items-center rounded-full bg-[color:var(--color-paper-100)] ring-2';

  switch (kind) {
    case 'school':
      return (
        <span
          className={`${base} ring-[color:var(--color-mute-400)]`}
          aria-label="education"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--color-mute-400)]" />
        </span>
      );
    case 'job':
      return (
        <span
          className={`${base} ring-[color:var(--color-ink-400)]`}
          aria-label="job"
        >
          <span className="size-2 rounded-full bg-[color:var(--color-ink-400)]" />
        </span>
      );
    case 'promotion':
      return (
        <span
          className={`${base} ring-[color:var(--color-ink-400)]`}
          aria-label="promotion"
        >
          <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
            <path
              d="M 6 1 L 11 6 L 6 11 L 1 6 Z"
              fill="var(--color-ink-400)"
            />
          </svg>
        </span>
      );
    case 'award':
      return (
        <span
          className={`${base} ring-[color:var(--color-accent-500)]`}
          aria-label="award"
        >
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden>
            <path
              d="M 6 0 L 7.4 4.6 L 12 6 L 7.4 7.4 L 6 12 L 4.6 7.4 L 0 6 L 4.6 4.6 Z"
              fill="var(--color-accent-500)"
            />
          </svg>
        </span>
      );
    case 'now':
      return (
        <span
          className="relative z-10 grid size-6 place-items-center rounded-full bg-[color:var(--color-accent-500)] ring-2 ring-[color:var(--color-paper-100)] shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent-500)_18%,transparent)]"
          aria-label="now"
        >
          <span className="size-1.5 rounded-full bg-[color:var(--color-paper-50)]" />
        </span>
      );
  }
}
