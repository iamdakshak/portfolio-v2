import { motion } from 'framer-motion';
import { skillGroups, achievements } from '@/data/resume';

export function Skills() {
  return (
    <section id="stack" className="relative w-full bg-[color:var(--color-paper-50)]">
      <div className="container-edge mx-auto max-w-[100rem] py-24 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-baseline justify-between sm:mb-16"
        >
          <span className="label">Things I reach for</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-mute-400)]">
            ◎ —— ◎
          </span>
        </motion.div>

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tabular-nums text-[color:var(--color-mute-400)]">
                  /{(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="label">{g.label}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {g.skills.map((s) => (
                  <li
                    key={s}
                    data-cursor="hover"
                    className="text-[17px] text-[color:var(--color-ink-300)] transition-colors hover:text-[color:var(--color-accent-500)] sm:text-lg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Recognition strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-24 grid gap-8 border-t border-black/[0.08] pt-12 md:grid-cols-12"
        >
          <div className="md:col-span-5">
            <span className="label">A nice thing that happened</span>
            <p className="mt-4 text-balance text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight text-[color:var(--color-ink-400)]">
              Two-time <span className="hl">Perforce Hackathon</span> winner
              (India) and Global Runner-Up.
            </p>
          </div>
          <ul className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mute-500)] md:col-span-7">
            {achievements.map((a) => (
              <li key={a.title} className="flex items-baseline gap-3">
                <span className="text-[color:var(--color-accent-500)]">✦</span>
                <span>
                  <span className="text-[color:var(--color-ink-400)]">
                    {a.title}
                  </span>
                  <span className="ml-2 text-[color:var(--color-mute-400)] normal-case tracking-normal">
                    — {a.detail}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
