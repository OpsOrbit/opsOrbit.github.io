import { Fragment } from 'react'
import { motion } from 'motion/react'

function ArrowRight() {
  return (
    <motion.span
      className="hidden shrink-0 text-hub-primary sm:flex"
      aria-hidden
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-hub-primary">
        <path
          d="M4 8h16M16 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )
}

function ArrowDown() {
  return (
    <motion.span
      className="flex py-1 text-hub-primary sm:hidden"
      aria-hidden
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
        <path
          d="M8 4v16M4 16l4 4 4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )
}

export default function VisualFlowStrip({ steps = [], className = '' }) {
  if (!steps.length) return null
  return (
    <div
      className={`rounded-2xl border border-hub-primary/25 bg-gradient-to-br from-hub-primary/5 via-[var(--hub-surface)] to-emerald-500/5 p-4 shadow-[var(--hub-shadow-card)] dark:from-hub-primary/10 dark:to-emerald-500/10 sm:p-6 ${className}`}
    >
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-hub-primary">Concept flow</p>
      <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center sm:gap-1">
        {steps.map((s, i) => (
          <Fragment key={s.id || s.label}>
            {i > 0 ? (
              <>
                <ArrowDown />
                <ArrowRight />
              </>
            ) : null}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
              className="w-full max-w-sm rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] px-4 py-3 text-center shadow-sm ring-1 ring-black/[0.03] dark:bg-[var(--hub-elevated)] dark:ring-white/[0.06] sm:w-[min(100%,10rem)]"
            >
              <p className="text-[13px] font-extrabold text-[var(--hub-text)]">{s.label}</p>
              {s.sub ? <p className="mt-1 text-[10px] font-medium leading-snug text-[var(--hub-muted)]">{s.sub}</p> : null}
            </motion.div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
