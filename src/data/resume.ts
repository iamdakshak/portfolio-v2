export const profile = {
  name: 'Dakshak Nagrale',
  role: 'Frontend Engineer',
  location: 'Nagpur, India',
  email: 'dakshak.nagrale@gmail.com',
  phone: '+91 8600680889',
  linkedin: 'https://linkedin.com/in/dakshak',
  github: 'https://github.com/iamdakshak',
  website: 'https://dakshaknagrale.in',
  resumeUrl: '/Dakshak-Resume.pdf',
} as const;

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  /** A single ultra-terse line — no bullets, no metrics. */
  oneLine: string;
};

export const experiences: Experience[] = [
  {
    company: 'Perforce Software',
    role: 'Senior Frontend Engineer',
    location: 'Remote · India',
    period: '2024 — now',
    oneLine:
      'Leading frontend on Puppet Forge, Puppet CloudOps, and Force UI — the design system that quietly unified three products.',
  },
  {
    company: 'Coditas Technologies',
    role: 'Software Engineer',
    location: 'Pune, India',
    period: '2020 — 2024',
    oneLine:
      'Shipped React, TypeScript, and React Native apps end-to-end across multiple client engagements. Grew from Associate into the team standard-setter.',
  },
];

/** A more granular journey for the visual timeline. */
export type Milestone = {
  year: string;
  /** Picks the marker shape. */
  kind: 'school' | 'job' | 'promotion' | 'award' | 'now';
  title: string;
  /** Short one-line detail. */
  detail: string;
  /** Optional second-line meta (location, org, etc). */
  meta?: string;
};

export const milestones: Milestone[] = [
  {
    year: '2016',
    kind: 'school',
    title: 'Started Computer Engineering',
    detail: 'BE, Computer Technology — graduated with 8.0 CGPA.',
    meta: 'Kavikulguru Institute of Technology, Nagpur',
  },
  {
    year: '2020',
    kind: 'job',
    title: 'First job — Coditas',
    detail:
      'Joined as Associate Software Engineer. Shipped React, React Native and vanilla JS for client engagements.',
    meta: 'Coditas Technologies, Pune',
  },
  {
    year: '2022',
    kind: 'promotion',
    title: 'Promoted to Software Engineer',
    detail:
      'Took ownership of quality, design-system patterns, and mentoring associates on the team.',
  },
  {
    year: '2024',
    kind: 'job',
    title: 'Joined Perforce',
    detail:
      'Senior Frontend Engineer. Leading frontend on Puppet Forge, Puppet CloudOps, and Force UI — the in-house design system three products share.',
    meta: 'Perforce Software · Remote',
  },
  {
    year: '2024',
    kind: 'award',
    title: 'Perforce Hackathon — Winner (India)',
    detail: 'Global Runner-Up.',
  },
  {
    year: '2025',
    kind: 'award',
    title: 'Perforce Jam — Winner (India)',
    detail: 'Global Runner-Up. Two for two.',
  },
  {
    year: 'NOW',
    kind: 'now',
    title: 'Currently shipping',
    detail: 'Building the next things at Perforce. Open to senior roles in \'26.',
  },
];

export type FeaturedProject = {
  /** Stable slug used as React key, also used to pick the cover variant. */
  slug: string;
  name: string;
  /** Where this came from. */
  kind: 'work' | 'personal' | 'meta';
  /** When it shipped (or was last touched). */
  year: string;
  /** One sentence — the elevator pitch. */
  tagline: string;
  /** Two to four sentences — the substance. */
  description: string;
  /** Tech chips. */
  tech: string[];
  /** Optional preview image URL. If absent, the SVG cover variant is used. */
  previewImage?: string;
  /** Optional accent color for the SVG cover. CSS color value. */
  coverAccent?: string;
  /** External links — first one renders as the primary CTA. */
  links?: { label: string; href: string }[];
};

const DEFAULT_FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'evoting',
    name: 'eVoting',
    kind: 'personal',
    year: '2020',
    tagline: 'A blockchain dApp for tamper-proof elections.',
    description:
      "A decentralized voting application running on a private Ethereum chain — Solidity smart contracts handle registration, ballots, and tallying, with a React + Web3 frontend. Built end-to-end as my final-year deep-dive into where the chain actually adds value (and where it doesn't).",
    tech: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'Truffle'],
    coverAccent: '#1d4ed8',
    links: [
      { label: 'GitHub', href: 'https://github.com/iamdakshak/eVoting' },
    ],
  },
  {
    slug: 'facear',
    name: 'faceAR',
    kind: 'personal',
    year: '2019',
    tagline: 'Real-time facial recognition built in Unity, talking to IBM Watson.',
    description:
      "A Unity 3D experiment that pipes the device camera into IBM Watson Visual Recognition to identify faces on the fly. Mostly an excuse to play with C#, AR, and the Watson SDK end-to-end — and to learn how to wrangle a 3D engine on the side of frontend work.",
    tech: ['Unity', 'C#', 'IBM Watson', 'AR', 'Computer Vision'],
    coverAccent: '#dc2626',
    links: [
      { label: 'GitHub', href: 'https://github.com/iamdakshak/faceAR' },
    ],
  },
  {
    slug: 'portfolio',
    name: 'This Portfolio',
    kind: 'meta',
    year: '2026',
    tagline: 'The site you are currently reading.',
    description:
      "A from-scratch rebuild of dakshaknagrale.in — Vite + React + TypeScript, hand-rolled motion in Framer Motion + Lenis, custom cursor and tilt-card hovers, all on a paper-grain canvas. Lives on GitHub Pages with a hidden admin page for editing projects.",
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind v4', 'Framer Motion', 'Lenis'],
    coverAccent: '#0a0e1f',
    links: [
      { label: 'Live', href: 'https://dakshaknagrale.in' },
      { label: 'GitHub', href: 'https://github.com/iamdakshak/portfolio' },
    ],
  },
];

const STORAGE_KEY = 'portfolio:featuredProjects:v1';

/**
 * Featured projects — reads localStorage overrides if the admin page has saved
 * any, otherwise returns the defaults baked into source.
 */
export function getFeaturedProjects(): FeaturedProject[] {
  if (typeof window === 'undefined') return DEFAULT_FEATURED_PROJECTS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FEATURED_PROJECTS;
    const parsed = JSON.parse(raw) as FeaturedProject[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_FEATURED_PROJECTS;
    }
    return parsed;
  } catch {
    return DEFAULT_FEATURED_PROJECTS;
  }
}

export function saveFeaturedProjects(projects: FeaturedProject[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function resetFeaturedProjects(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export { DEFAULT_FEATURED_PROJECTS };

export type SkillGroup = {
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: 'Core',
    skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js'],
  },
  {
    label: 'UI / systems',
    skills: ['Tailwind', 'Shadcn', 'Radix', 'Framer Motion', 'Storybook', 'Figma'],
  },
  {
    label: 'Data',
    skills: ['GraphQL', 'REST', 'TanStack Query', 'TanStack Router', 'Redux'],
  },
  {
    label: 'Quality',
    skills: ['Jest', 'Vitest', 'Playwright', 'RTL', 'Perfecto'],
  },
  {
    label: 'Platform',
    skills: ['Git', 'Docker', 'Azure', 'Vercel', 'CI/CD', 'AppSignal'],
  },
  {
    label: 'On the side',
    skills: ['Unity / C#', 'WebGL', 'Solidity', 'AI / LLMs'],
  },
];

export const achievements = [
  { title: 'Perforce Hackathon 2024', detail: 'Winner — India · Global Runner-Up' },
  { title: 'Perforce Jam 2025', detail: 'Winner — India · Global Runner-Up' },
];

export const navItems = [
  { label: 'Work', target: '#work' },
  { label: 'About', target: '#about' },
  { label: 'Experience', target: '#experience' },
  { label: 'Stack', target: '#stack' },
  { label: 'Contact', target: '#contact' },
];
