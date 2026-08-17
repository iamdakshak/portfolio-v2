import { motion } from 'framer-motion';
import { profile } from '@/data/resume';
import { Magnetic } from '@/components/Magnetic';

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.07 3.29 9.37 7.86 10.89.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55C20.21 21.36 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.42v6.32zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 7.5 L 12 14 L 21.5 7.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden>
      <path d="M18.244 2H21.5l-7.522 8.6L23 22h-7.07l-5.39-7.05L4.5 22H1.243l8.04-9.18L1 2h7.244l4.91 6.49L18.244 2zm-1.243 18h1.836L7.064 4H5.13L17.001 20z" />
    </svg>
  );
}

const links = [
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    display: profile.email,
    icon: <MailIcon />,
    external: false,
  },
  {
    label: 'GitHub',
    href: profile.github,
    display: profile.github.replace('https://', ''),
    icon: <GithubIcon />,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    display: profile.linkedin.replace('https://', ''),
    icon: <LinkedinIcon />,
    external: true,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/iamdakshak',
    display: 'x.com/iamdakshak',
    icon: <XIcon />,
    external: true,
  },
];

const audience = [
  'A founder polishing a product',
  'A team untangling frontend chaos',
  'An engineer who cares about doing it properly',
  'A recruiter sick of copy-paste profiles',
  'Someone who just landed here out of curiosity',
];

export function Contact() {
  return (
    <section id="contact" className="relative w-full">
      <div className="container-edge mx-auto max-w-[100rem] py-24 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex items-baseline justify-between sm:mb-16"
        >
          <span className="label">Say hi</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-mute-400)]">
            ✦ ——
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance text-[color:var(--color-ink-400)] text-[clamp(2rem,5.2vw,4.5rem)]"
        >
          Building something real?
          <br />
          <span className="hl-italic">Let's talk.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Magnetic strength={0.2}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink-400)] px-7 py-4 text-base text-[color:var(--color-paper-50)] transition-all hover:bg-[color:var(--color-accent-500)]"
            >
              {profile.email}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Magnetic>
          <span className="text-sm text-[color:var(--color-mute-500)]">
            Usually replies within a day.
          </span>
        </motion.div>

        {/* Especially-if list — his audience answer, distilled */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-16 max-w-2xl"
        >
          <span className="label">Especially if you're —</span>
          <ul className="mt-5 flex flex-col gap-2.5">
            {audience.map((line) => (
              <li
                key={line}
                className="flex items-baseline gap-3 text-base text-[color:var(--color-ink-200)] sm:text-lg"
              >
                <span className="text-[color:var(--color-accent-500)]">→</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm text-[color:var(--color-mute-500)]">
            If you care about building good products, we'll probably get
            along.
          </p>
        </motion.div>

        {/* Social / direct-link list — icon · label · URL · arrow per row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-20 flex flex-col gap-px overflow-hidden rounded-2xl border border-black/[0.08] bg-black/[0.06]"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noreferrer noopener' : undefined}
              data-cursor="hover"
              className="group flex items-center gap-4 bg-[color:var(--color-paper-100)] px-5 py-4 transition-colors hover:bg-[color:var(--color-paper-50)] sm:gap-6 sm:px-7 sm:py-5"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[color:var(--color-paper-50)] text-[color:var(--color-ink-400)] transition-colors group-hover:bg-[color:var(--color-ink-400)] group-hover:text-[color:var(--color-paper-50)] sm:size-11">
                {l.icon}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute-500)]">
                  {l.label}
                </span>
                <span className="mt-0.5 truncate text-base text-[color:var(--color-ink-400)] transition-colors group-hover:text-[color:var(--color-accent-500)] sm:text-lg">
                  {l.display}
                </span>
              </span>
              <span className="font-mono text-xs text-[color:var(--color-mute-400)] transition-all group-hover:translate-x-1 group-hover:text-[color:var(--color-accent-500)]">
                ↗
              </span>
            </a>
          ))}
        </motion.div>

        {/* Footer — t-shirt line as quiet signature */}
        <div className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-black/[0.08] pt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-mute-500)] sm:flex-row sm:items-baseline">
          <span>© {new Date().getFullYear()} Dakshak Nagrale</span>
          <span className="normal-case tracking-normal italic text-[color:var(--color-mute-400)]">
            Out of Claude tokens. Still pretending I know what I'm doing.
          </span>
          <span>
            <a
              href="?edit=1"
              data-cursor="hover"
              className="opacity-50 hover:opacity-100"
              title="Admin"
            >
              ◉
            </a>
            {' '}React · TS · Vite
          </span>
        </div>
      </div>
    </section>
  );
}
