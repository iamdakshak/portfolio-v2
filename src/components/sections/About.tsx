import { motion } from 'framer-motion';

const facts = [
  { k: 'Now', v: 'Senior FE @ Perforce' },
  { k: 'Years in', v: '5+ shipping' },
  { k: 'Day-job', v: 'Forge · CloudOps · Force UI' },
  { k: 'Open to', v: 'Senior roles · Contract' },
  { k: 'Reading', v: 'Designing Data-Intensive Apps' },
  { k: 'Tinkering with', v: 'Three.js · Unity · Solidity' },
];

export function About() {
  return (
    <section id="about" className="relative w-full bg-[color:var(--color-paper-50)]">
      <div className="container-edge mx-auto max-w-[100rem] py-24 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-baseline justify-between sm:mb-16"
        >
          <span className="label">A few notes about me</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-mute-400)]">
            ◎ —— ◎
          </span>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-8"
          >
            {/* Big "why" headline — his actual words */}
            <p className="text-balance text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.25] text-[color:var(--color-ink-400)]">
              Frontend felt like <span className="hl-italic">impact</span>{' '}
              — and I've been chasing that feedback loop ever since.
            </p>

            {/* The "why" story */}
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[color:var(--color-mute-500)] sm:text-lg">
              The first time I shipped something where I could see the
              difference instantly — change a layout, tweak an interaction,
              make a flow obvious — it clicked. Frontend sits at the
              intersection of <span className="hl">engineering</span>,{' '}
              <span className="hl">design</span>, and{' '}
              <span className="hl">psychology</span>, which is way more
              interesting than just making things work.
            </p>

            {/* The unhinged confession — his voice */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-mute-500)] sm:text-lg">
              Off-page, I overthink tiny UX in everyday life. Why is this
              button here? Why did this app make me do three clicks instead
              of one? I notice weird interaction patterns in apps, websites,
              even <span className="hl-italic">ATMs</span> — and mentally
              redesign them for fun.{' '}
              <span className="text-[color:var(--color-mute-400)] italic">
                (Yes, I know how that sounds.)
              </span>
            </p>

            {/* Day-job context */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-mute-500)] sm:text-lg">
              Day-job: I lead frontend on{' '}
              <span className="hl">Puppet Forge</span>,{' '}
              <span className="hl">Puppet CloudOps</span>, and{' '}
              <span className="hl">Force UI</span> at Perforce. Before that,
              four years at Coditas shipping client work in React and React
              Native. Two-time Perforce Hackathon winner — for what it's
              worth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4"
          >
            <ul className="flex flex-col gap-px overflow-hidden rounded-xl bg-black/[0.08]">
              {facts.map((f) => (
                <li
                  key={f.k}
                  className="flex items-baseline justify-between bg-[color:var(--color-paper-50)] px-5 py-4 text-sm"
                >
                  <span className="label">{f.k}</span>
                  <span className="text-[color:var(--color-ink-400)]">
                    {f.v}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
