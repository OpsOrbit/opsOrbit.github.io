import { motion } from 'motion/react'

export default function RoadmapProgressBar({ completed, total, className = '' }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-semibold text-[var(--hub-muted)] sm:text-xs">
        <span>Modules</span>
        <span className="tabular-nums text-[var(--hub-text)]">
          {completed}/{total} complete
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--hub-line)]/80 dark:bg-[var(--hub-elevated)]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-hub-primary to-emerald-400 dark:from-hub-primary dark:to-green-400"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
