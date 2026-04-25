import { motion } from 'motion/react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'commands', label: 'Commands' },
  { id: 'hands-on', label: 'Hands-on' },
  { id: 'visual', label: 'Visual' },
  { id: 'notes', label: 'Notes' },
]

export default function LabTabBar({ activeId, onChange, className = '' }) {
  return (
    <div
      className={`flex max-w-full flex-wrap items-stretch gap-1 rounded-xl border border-[var(--hub-line)]/90 bg-[var(--hub-card)]/80 p-1 shadow-sm dark:bg-[var(--hub-elevated)]/50 ${className}`}
      role="tablist"
      aria-label="Lab sections"
    >
      {TABS.map((t) => {
        const on = t.id === activeId
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={on}
            id={`lab-tab-${t.id}`}
            onClick={() => onChange(t.id)}
            className={`relative min-h-[34px] min-w-[5.3rem] flex-1 rounded-lg px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary sm:min-h-0 sm:flex-none sm:px-4 sm:text-[12px] ${
              on
                ? 'text-[var(--hub-text)]'
                : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]/80 hover:text-[var(--hub-text)]'
            }`}
          >
            {on ? (
              <motion.span
                layoutId="lab-tab-pill"
                className="absolute inset-0 rounded-lg bg-[var(--hub-tool-dim)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            ) : null}
            <span className="relative z-[1]">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
