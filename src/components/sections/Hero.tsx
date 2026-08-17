import { motion } from 'framer-motion';
import { Magnetic } from '@/components/Magnetic';
import { Typewriter } from '@/components/Typewriter';
import { ParticlesField } from '@/components/ParticlesField';
import { SplineCharacter } from '@/components/SplineCharacter';

const easeOut = [0.22, 1, 0.36, 1] as const;

const tickerItems = [
  'TypeScript',
  'React',
  'Next.js',
  'Tailwind',
  'GraphQL',
  'Design Systems',
  'Performance',
  'Accessibility',
  'Storybook',
  'Playwright',
  'Vite',
  'Unity',
  'WebGL',
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh w-full flex-col overflow-hidden pt-28 sm:pt-36"
    >
      <ParticlesField className="pointer-events-none absolute inset-0 z-0" />

      <SplineCharacter
        url="https://prod.spline.design/FVZWbQH2B6ndj9UU/scene.splinecode"
        className="pointer-events-none absolute top-1/2 right-4 z-[5] hidden aspect-square w-[34vw] max-w-[460px] -translate-y-1/2 lg:right-8 lg:block xl:max-w-[520px]"
      />

      <div className="container-edge relative z-10 mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center pb-12">
        {/* Headline — "I am" fades in, then "Dakshak." types out */}
        <h1 className="font-display text-[color:var(--color-ink-400)] text-[clamp(2.25rem,7.5vw,6.25rem)]">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35, ease: easeOut }}
            className="block"
          >
            I am{' '}
            <Typewriter text="Dakshak." delay={750} speed={75} />
          </motion.span>
        </h1>

        {/* Manifesto line — kicks in once the typing is done */}
        <h2 className="mt-4 font-display text-balance text-[color:var(--color-mute-400)] italic text-[clamp(1.5rem,4.5vw,3.5rem)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 1.85, ease: easeOut }}
              className="block"
            >
              I build the parts of the internet
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 2, ease: easeOut }}
              className="block"
            >
              <span className="text-[color:var(--color-ink-400)]">
                people actually touch.
              </span>
            </motion.span>
          </span>
        </h2>

        {/* Body — reuses his "messy ideas / half-baked / we'll figure it out" framing */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.4, ease: easeOut }}
          className="mt-10 max-w-2xl text-balance text-base leading-relaxed text-[color:var(--color-mute-500)] sm:text-[17px]"
        >
          Senior Frontend Engineer turning{' '}
          <span className="hl">messy ideas</span>,{' '}
          <span className="hl">half-baked designs</span>, and{' '}
          <span className="hl">"we'll figure it out later"</span> into fast,
          smooth, production-ready interfaces. Currently doing that at{' '}
          <span className="hl">Perforce</span>.
        </motion.p>

        {/* Tiny aside — confession that lands his voice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.6, ease: easeOut }}
          className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--color-mute-400)]"
        >
          P.S. Yes, I open DevTools on random sites for fun.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 2.7, ease: easeOut }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.25}>
            <a
              href="#work"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink-400)] px-6 py-3.5 text-sm text-[color:var(--color-paper-50)] transition-all hover:bg-[color:var(--color-accent-500)]"
            >
              See my work
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              aria-label="Open resume in a new tab"
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-ink-400)]/80 px-6 py-3.5 text-sm text-[color:var(--color-ink-400)] transition-all hover:border-[color:var(--color-accent-500)] hover:bg-[color:var(--color-accent-500)] hover:text-[color:var(--color-paper-50)]"
            >
              Resume
              <span className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden">
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[120%]"
                >
                  <path
                    d="M8 1.5v8.5M4.5 6.5L8 10l3.5-3.5M2.75 13.5h10.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  className="absolute -translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                >
                  <path
                    d="M8 1.5v8.5M4.5 6.5L8 10l3.5-3.5M2.75 13.5h10.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Magnetic>
          <a
            href="#contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-full px-2 py-3.5 text-sm text-[color:var(--color-mute-500)] transition-colors hover:text-[color:var(--color-ink-400)]"
          >
            <span className="underline-anim">Or just say hi</span>
            <span className="text-xs opacity-60 transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* Bottom marquee */}
      <div className="relative z-10 border-y border-black/[0.08] bg-[color:var(--color-paper-50)]/50 py-4">
        <div className="flex w-full overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center gap-12 whitespace-nowrap pl-12 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-mute-500)]">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="flex items-center gap-12">
                <span>{item}</span>
                <span aria-hidden className="text-[color:var(--color-accent-500)]">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
