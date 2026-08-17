import type { FeaturedProject } from '@/data/resume';

type CoverProps = {
  project: FeaturedProject;
};

/**
 * Renders a custom SVG cover for a project when no preview image is set.
 * Each variant is a deliberate visual — chain blocks for eVoting, face mesh
 * for faceAR, typographic flourish for the portfolio meta-card. Accepts an
 * accent color override per project so the user can re-skin without code.
 */
export function ProjectCover({ project }: CoverProps) {
  if (project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={`${project.name} preview`}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
    );
  }

  switch (project.slug) {
    case 'evoting':
      return <EVotingCover accent={project.coverAccent ?? '#1d4ed8'} />;
    case 'facear':
      return <FaceARCover accent={project.coverAccent ?? '#dc2626'} />;
    case 'portfolio':
      return <PortfolioCover accent={project.coverAccent ?? '#0a0e1f'} />;
    default:
      return <GenericCover project={project} />;
  }
}

/* ------------------------------ eVoting cover ------------------------------ */

function EVotingCover({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="ev-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="1" />
          <stop offset="100%" stopColor="#0a0e1f" stopOpacity="1" />
        </linearGradient>
        <pattern
          id="ev-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="800" height="500" fill="url(#ev-bg)" />
      <rect width="800" height="500" fill="url(#ev-grid)" />

      {/* Linked block chain */}
      <g transform="translate(80, 200)">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${i * 130}, 0)`}>
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              rx="8"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.2"
            />
            <text
              x="50"
              y="58"
              fontFamily="JetBrains Mono, monospace"
              fontSize="14"
              fill="rgba(255,255,255,0.6)"
              textAnchor="middle"
            >
              {`#${(i + 1).toString().padStart(2, '0')}`}
            </text>
            {i < 4 && (
              <line
                x1="100"
                y1="50"
                x2="130"
                y2="50"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            )}
          </g>
        ))}
      </g>

      <text
        x="60"
        y="80"
        fontFamily="JetBrains Mono, monospace"
        fontSize="13"
        fontWeight="500"
        fill="rgba(255,255,255,0.6)"
        letterSpacing="2"
      >
        01 — TAMPER-PROOF
      </text>

      <text
        x="60"
        y="430"
        fontFamily="Bricolage Grotesque, sans-serif"
        fontSize="80"
        fontWeight="500"
        fill="white"
        letterSpacing="-2"
      >
        eVoting
      </text>
    </svg>
  );
}

/* ------------------------------ faceAR cover ------------------------------ */

function FaceARCover({ accent }: { accent: string }) {
  // A pseudo face mesh — generated coordinates roughly forming an oval mesh.
  const dots: { x: number; y: number; r: number }[] = [];
  const cx = 540;
  const cy = 250;
  for (let i = 0; i < 80; i += 1) {
    const angle = (i / 80) * Math.PI * 2;
    const radius = 120 + Math.sin(i * 0.7) * 35;
    dots.push({
      x: cx + Math.cos(angle) * radius * 1.05,
      y: cy + Math.sin(angle) * radius * 1.25,
      r: 1.8 + (i % 5 === 0 ? 1.2 : 0),
    });
  }
  // Inner mesh dots
  for (let i = 0; i < 30; i += 1) {
    const angle = (i / 30) * Math.PI * 2;
    const radius = 60 + Math.cos(i * 0.9) * 20;
    dots.push({
      x: cx + Math.cos(angle) * radius * 0.95,
      y: cy + Math.sin(angle) * radius * 1.1,
      r: 1.6,
    });
  }

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="fa-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#fa-bg)" />

      {/* Crosshair grid */}
      <g stroke="rgba(10,14,31,0.12)" strokeWidth="1">
        <line x1="0" y1="250" x2="800" y2="250" strokeDasharray="2 6" />
        <line x1="540" y1="0" x2="540" y2="500" strokeDasharray="2 6" />
      </g>

      {/* Face mesh dots */}
      <g fill="rgba(10,14,31,0.85)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>

      {/* Mesh connector lines (selected) */}
      <g stroke="rgba(10,14,31,0.18)" strokeWidth="1" fill="none">
        {dots.slice(0, 80).map((d, i) => {
          const next = dots[(i + 1) % 80];
          return (
            <line
              key={`l-${i}`}
              x1={d.x}
              y1={d.y}
              x2={next.x}
              y2={next.y}
            />
          );
        })}
      </g>

      {/* Bracket reticle */}
      <g stroke={accent} strokeWidth="2" fill="none">
        <path d="M 380 90 L 360 90 L 360 110" />
        <path d="M 700 90 L 720 90 L 720 110" />
        <path d="M 380 410 L 360 410 L 360 390" />
        <path d="M 700 410 L 720 410 L 720 390" />
      </g>

      <text
        x="60"
        y="80"
        fontFamily="JetBrains Mono, monospace"
        fontSize="13"
        fontWeight="500"
        fill={accent}
        letterSpacing="2"
      >
        02 — REAL-TIME · UNITY
      </text>

      <text
        x="60"
        y="430"
        fontFamily="Bricolage Grotesque, sans-serif"
        fontSize="80"
        fontWeight="500"
        fill="#0a0e1f"
        letterSpacing="-2"
      >
        faceAR
      </text>
    </svg>
  );
}

/* ----------------------------- Portfolio cover ----------------------------- */

function PortfolioCover({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="pf-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f1e8" />
          <stop offset="100%" stopColor="#ede5d4" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="url(#pf-bg)" />

      {/* Massive DN monogram */}
      <text
        x="400"
        y="320"
        textAnchor="middle"
        fontFamily="Bricolage Grotesque, sans-serif"
        fontSize="320"
        fontWeight="500"
        fill={accent}
        letterSpacing="-12"
      >
        DN
      </text>

      {/* Caption stripes */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgba(10,14,31,0.5)" letterSpacing="2">
        <text x="40" y="50">/03 — META</text>
        <text x="760" y="50" textAnchor="end">VITE · REACT · TS</text>
        <text x="40" y="475">DAKSHAKNAGRALE.IN</text>
        <text x="760" y="475" textAnchor="end">2026 EDITION</text>
      </g>

      {/* Cropmarks corners */}
      <g stroke={accent} strokeWidth="1.4" fill="none">
        <path d="M 40 70 L 40 90 M 40 90 L 60 90" />
        <path d="M 760 70 L 760 90 M 760 90 L 740 90" />
        <path d="M 40 460 L 40 440 M 40 440 L 60 440" />
        <path d="M 760 460 L 760 440 M 760 440 L 740 440" />
      </g>
    </svg>
  );
}

/* ------------------------------- Generic cover ----------------------------- */

function GenericCover({ project }: { project: FeaturedProject }) {
  const accent = project.coverAccent ?? '#1d4ed8';
  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="gn-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#gn-bg)" />
      <text
        x="60"
        y="430"
        fontFamily="Bricolage Grotesque, sans-serif"
        fontSize="80"
        fontWeight="500"
        fill="white"
        letterSpacing="-2"
      >
        {project.name}
      </text>
    </svg>
  );
}
