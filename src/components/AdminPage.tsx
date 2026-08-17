import { useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_FEATURED_PROJECTS,
  getFeaturedProjects,
  resetFeaturedProjects,
  saveFeaturedProjects,
  type FeaturedProject,
} from '@/data/resume';

const PASS_KEY = 'portfolio:admin:authed:v1';

const EMPTY_PROJECT: FeaturedProject = {
  slug: '',
  name: '',
  kind: 'personal',
  year: '',
  tagline: '',
  description: '',
  tech: [],
  links: [],
};

function getEnvPass() {
  // Set in .env.local as VITE_ADMIN_PASS=...
  const v = import.meta.env.VITE_ADMIN_PASS;
  return typeof v === 'string' && v.length > 0 ? v : null;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function AdminPage() {
  const envPass = useMemo(getEnvPass, []);
  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(PASS_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pass, setPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [editing, setEditing] = useState<FeaturedProject | null>(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    setProjects(getFeaturedProjects());
  }, []);

  const onSubmitPass = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const expected = envPass ?? 'admin';
    if (pass === expected) {
      setAuthed(true);
      try {
        sessionStorage.setItem(PASS_KEY, '1');
      } catch {
        /* ignore */
      }
    } else {
      setError('Wrong passphrase.');
    }
  };

  const onLogout = () => {
    setAuthed(false);
    try {
      sessionStorage.removeItem(PASS_KEY);
    } catch {
      /* ignore */
    }
  };

  const persist = (next: FeaturedProject[]) => {
    setProjects(next);
    saveFeaturedProjects(next);
  };

  const onStartNew = () =>
    setEditing({ ...EMPTY_PROJECT, slug: `project-${Date.now()}` });

  const onEdit = (p: FeaturedProject) => setEditing({ ...p });

  const onDelete = (slug: string) => {
    if (!confirm('Delete this project?')) return;
    persist(projects.filter((p) => p.slug !== slug));
  };

  const onSave = () => {
    if (!editing) return;
    if (!editing.name.trim()) {
      alert('Name is required.');
      return;
    }
    const slug = editing.slug.trim() || slugify(editing.name);
    const cleaned: FeaturedProject = {
      ...editing,
      slug,
      tech: editing.tech.map((t) => t.trim()).filter(Boolean),
      links: (editing.links ?? [])
        .map((l) => ({ label: l.label.trim(), href: l.href.trim() }))
        .filter((l) => l.label && l.href),
    };
    const exists = projects.findIndex((p) => p.slug === slug);
    const next = [...projects];
    if (exists >= 0) next[exists] = cleaned;
    else next.push(cleaned);
    persist(next);
    setEditing(null);
  };

  const onResetDefaults = () => {
    if (!confirm('Reset to default projects? This wipes local edits.')) return;
    resetFeaturedProjects();
    setProjects(DEFAULT_FEATURED_PROJECTS);
  };

  const exportJson = JSON.stringify(projects, null, 2);

  if (!authed) {
    return (
      <Shell title="Admin / Edit">
        <form
          onSubmit={onSubmitPass}
          className="mx-auto mt-20 flex max-w-md flex-col gap-5"
        >
          <h1 className="font-display text-4xl text-[color:var(--color-ink-400)]">
            Locked.
          </h1>
          <p className="text-sm text-[color:var(--color-mute-500)]">
            {envPass
              ? 'Enter the admin passphrase to continue.'
              : 'No VITE_ADMIN_PASS set in env — defaulting to "admin" for now. Set one in .env.local for real use.'}
          </p>
          <input
            type="password"
            autoFocus
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Passphrase"
            className="rounded-lg border border-black/15 bg-[color:var(--color-paper-50)] px-4 py-3 text-base outline-none focus:border-[color:var(--color-accent-500)]"
          />
          {error && (
            <span className="font-mono text-xs uppercase tracking-wider text-[color:var(--color-accent-500)]">
              {error}
            </span>
          )}
          <button
            type="submit"
            className="rounded-full bg-[color:var(--color-ink-400)] px-6 py-3 text-sm text-[color:var(--color-paper-50)] transition-colors hover:bg-[color:var(--color-accent-500)]"
          >
            Unlock
          </button>
          <a
            href="?"
            className="text-center text-xs text-[color:var(--color-mute-400)] underline-anim"
          >
            ← Back to portfolio
          </a>
        </form>
      </Shell>
    );
  }

  return (
    <Shell title="Admin / Edit projects">
      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-10">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onStartNew}
            className="rounded-full bg-[color:var(--color-ink-400)] px-5 py-2.5 text-sm text-[color:var(--color-paper-50)] transition-colors hover:bg-[color:var(--color-accent-500)]"
          >
            + Add project
          </button>
          <button
            onClick={() => setShowJson((v) => !v)}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm text-[color:var(--color-ink-400)] transition-colors hover:border-[color:var(--color-accent-500)]"
          >
            {showJson ? 'Hide' : 'Show'} JSON export
          </button>
          <button
            onClick={onResetDefaults}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm text-[color:var(--color-mute-500)] transition-colors hover:border-[color:var(--color-accent-500)] hover:text-[color:var(--color-accent-500)]"
          >
            Reset to defaults
          </button>
          <span className="ml-auto text-xs text-[color:var(--color-mute-400)]">
            Saved to localStorage on this browser.{' '}
            <a
              href="?"
              className="underline-anim text-[color:var(--color-ink-400)]"
            >
              View live →
            </a>
          </span>
          <button
            onClick={onLogout}
            className="rounded-full px-3 py-1 text-xs text-[color:var(--color-mute-400)] hover:text-[color:var(--color-ink-400)]"
          >
            Lock
          </button>
        </div>

        {/* JSON export */}
        {showJson && (
          <div className="flex flex-col gap-2">
            <span className="label">JSON — paste into resume.ts → DEFAULT_FEATURED_PROJECTS</span>
            <textarea
              readOnly
              value={exportJson}
              className="min-h-[280px] resize-y rounded-lg border border-black/15 bg-[color:var(--color-paper-50)] p-4 font-mono text-xs leading-relaxed"
            />
            <button
              onClick={() => navigator.clipboard?.writeText(exportJson)}
              className="self-start rounded-full bg-[color:var(--color-ink-400)] px-4 py-1.5 text-xs text-[color:var(--color-paper-50)]"
            >
              Copy to clipboard
            </button>
          </div>
        )}

        {/* Project list */}
        <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-black/[0.08]">
          {projects.length === 0 && (
            <div className="bg-[color:var(--color-paper-50)] p-10 text-center text-sm text-[color:var(--color-mute-500)]">
              No projects yet. Click <strong>+ Add project</strong>.
            </div>
          )}
          {projects.map((p) => (
            <div
              key={p.slug}
              className="grid items-center gap-4 bg-[color:var(--color-paper-50)] p-5 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-mute-500)]">
                  <span>{p.kind}</span>
                  <span>·</span>
                  <span>{p.year}</span>
                  <span>·</span>
                  <span>{p.slug}</span>
                </div>
                <div className="mt-1 font-display text-2xl text-[color:var(--color-ink-400)]">
                  {p.name || <em className="text-red-500">untitled</em>}
                </div>
                <div className="mt-1 text-sm text-[color:var(--color-mute-500)]">
                  {p.tagline}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(p)}
                  className="rounded-full border border-black/15 px-4 py-1.5 text-xs hover:border-[color:var(--color-accent-500)]"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.slug)}
                  className="rounded-full border border-black/15 px-4 py-1.5 text-xs text-red-600 hover:border-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editor modal */}
        {editing && (
          <ProjectEditor
            project={editing}
            onChange={setEditing}
            onCancel={() => setEditing(null)}
            onSave={onSave}
          />
        )}
      </div>
    </Shell>
  );
}

/* -------------------------------- subviews -------------------------------- */

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-[color:var(--color-paper-100)] py-12">
      <div className="grain" />
      <div className="container-edge mx-auto max-w-7xl">
        <header className="flex items-center justify-between">
          <a href="?" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full border border-[color:var(--color-ink-400)]/20 font-mono text-[11px]">
              DN
            </span>
            <span className="label">{title}</span>
          </a>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-mute-400)]">
            ?edit=1
          </span>
        </header>
        {children}
      </div>
    </div>
  );
}

type EditorProps = {
  project: FeaturedProject;
  onChange: (next: FeaturedProject) => void;
  onCancel: () => void;
  onSave: () => void;
};

function ProjectEditor({ project, onChange, onCancel, onSave }: EditorProps) {
  const set = <K extends keyof FeaturedProject>(
    k: K,
    v: FeaturedProject[K],
  ) => onChange({ ...project, [k]: v });

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 sm:p-10"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="w-full max-w-3xl rounded-2xl bg-[color:var(--color-paper-50)] p-6 shadow-2xl sm:p-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-[color:var(--color-ink-400)]">
            {project.name || 'New project'}
          </h2>
          <button
            onClick={onCancel}
            className="text-sm text-[color:var(--color-mute-500)] hover:text-[color:var(--color-ink-400)]"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <input
              type="text"
              value={project.name}
              onChange={(e) => set('name', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Slug (used as key)">
            <input
              type="text"
              value={project.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder={slugify(project.name) || 'auto'}
              className={inputCls}
            />
          </Field>
          <Field label="Kind">
            <select
              value={project.kind}
              onChange={(e) =>
                set('kind', e.target.value as FeaturedProject['kind'])
              }
              className={inputCls}
            >
              <option value="personal">personal</option>
              <option value="work">work</option>
              <option value="meta">meta</option>
            </select>
          </Field>
          <Field label="Year">
            <input
              type="text"
              value={project.year}
              onChange={(e) => set('year', e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Tagline (one sentence)" wide>
            <input
              type="text"
              value={project.tagline}
              onChange={(e) => set('tagline', e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field label="Description" wide>
            <textarea
              value={project.description}
              onChange={(e) => set('description', e.target.value)}
              rows={5}
              className={`${inputCls} resize-y`}
            />
          </Field>

          <Field label="Tech (comma-separated)" wide>
            <input
              type="text"
              value={project.tech.join(', ')}
              onChange={(e) =>
                set(
                  'tech',
                  e.target.value.split(',').map((s) => s.trim()),
                )
              }
              className={inputCls}
            />
          </Field>

          <Field label="Preview image URL (optional)">
            <input
              type="text"
              value={project.previewImage ?? ''}
              onChange={(e) => set('previewImage', e.target.value || undefined)}
              placeholder="/images/foo.jpg"
              className={inputCls}
            />
          </Field>
          <Field label="Cover accent color (optional)">
            <input
              type="text"
              value={project.coverAccent ?? ''}
              onChange={(e) => set('coverAccent', e.target.value || undefined)}
              placeholder="#1d4ed8"
              className={inputCls}
            />
          </Field>

          <div className="sm:col-span-2">
            <span className="label">Links</span>
            <div className="mt-3 flex flex-col gap-3">
              {(project.links ?? []).map((l, i) => (
                <div
                  key={i}
                  className="grid items-center gap-2 sm:grid-cols-[1fr_2fr_auto]"
                >
                  <input
                    placeholder="Label"
                    value={l.label}
                    onChange={(e) => {
                      const next = [...(project.links ?? [])];
                      next[i] = { ...next[i], label: e.target.value };
                      set('links', next);
                    }}
                    className={inputCls}
                  />
                  <input
                    placeholder="https://…"
                    value={l.href}
                    onChange={(e) => {
                      const next = [...(project.links ?? [])];
                      next[i] = { ...next[i], href: e.target.value };
                      set('links', next);
                    }}
                    className={inputCls}
                  />
                  <button
                    onClick={() => {
                      const next = [...(project.links ?? [])];
                      next.splice(i, 1);
                      set('links', next);
                    }}
                    className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-red-600 hover:border-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  set('links', [
                    ...(project.links ?? []),
                    { label: '', href: '' },
                  ])
                }
                className="self-start rounded-full border border-black/15 px-4 py-1.5 text-xs hover:border-[color:var(--color-accent-500)]"
              >
                + Add link
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-full border border-black/15 px-5 py-2.5 text-sm text-[color:var(--color-mute-500)] hover:text-[color:var(--color-ink-400)]"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="rounded-full bg-[color:var(--color-ink-400)] px-6 py-2.5 text-sm text-[color:var(--color-paper-50)] transition-colors hover:bg-[color:var(--color-accent-500)]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  'rounded-lg border border-black/15 bg-[color:var(--color-paper-50)] px-4 py-2.5 text-sm outline-none focus:border-[color:var(--color-accent-500)]';

function Field({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
