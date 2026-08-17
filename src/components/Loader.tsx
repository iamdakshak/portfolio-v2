import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LoaderProps = {
  progress: number;
  done: boolean;
};

export function Loader({ progress, done }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex items-end justify-between bg-[color:var(--color-paper-100)] p-6 sm:p-10"
          aria-hidden={done}
        >
          <div className="grain" />
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <span className="grid size-9 place-items-center rounded-full border border-[color:var(--color-ink-400)]/20 font-mono text-[11px] text-[color:var(--color-ink-400)]">
              DN
            </span>
            <span className="label">Dakshak Nagrale</span>
          </motion.div>

          <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[color:var(--color-mute-500)]">
            <span>Loading</span>
            <span className="tabular-nums text-[color:var(--color-ink-400)]">
              {Math.round(progress * 100)
                .toString()
                .padStart(3, '0')}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
