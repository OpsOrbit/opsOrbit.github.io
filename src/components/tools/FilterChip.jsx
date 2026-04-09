import { motion } from 'motion/react'

/**
 * @param {{ active: boolean, label: string, onClick: () => void, icon?: string }} props
 */
export default function FilterChip({ active, label, onClick, icon }) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      className={`relative min-h-11 overflow-hidden rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] sm:min-h-0 sm:py-1.5 sm:text-[13px] ${
        active
          ? 'border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 dark:from-indigo-500 dark:to-violet-600 dark:shadow-indigo-900/40'
          : 'border-[var(--hub-line)] bg-[var(--hub-surface)]/80 text-[var(--hub-muted)] backdrop-blur-sm hover:border-indigo-300/50 hover:bg-white/90 dark:border-[var(--hub-border2)] dark:hover:border-indigo-500/30'
      }`}
      aria-pressed={active}
    >
      {active ? (
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/10" />
      ) : null}
      <span className="relative z-[1] inline-flex items-center gap-1.5">
        {icon ? <span aria-hidden>{icon}</span> : null}
        {label}
      </span>
    </motion.button>
  )
}
