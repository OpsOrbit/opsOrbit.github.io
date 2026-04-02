import { Fragment } from 'react'
import { motion } from 'motion/react'

/**
 * Horizontal flow: e.g. Dockerfile → Image → Container
 * @param {{ visualFlow: { id: string, label: string, sub?: string }[] }} props
 */
export default function LabFlowDiagram({ visualFlow = [], className = '' }) {
  if (!visualFlow.length) return null

  return (
    <div
      className={`rounded-2xl border border-[var(--hub-line)]/90 bg-gradient-to-br from-[var(--hub-card)]/90 to-[var(--hub-surface)]/40 p-5 shadow-sm dark:from-[var(--hub-elevated)]/50 dark:to-[var(--hub-surface)]/20 sm:p-7 ${className}`}
      role="img"
      aria-label="Concept flow diagram"
    >
      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
        Flow
      </p>
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-2">
        {visualFlow.map((step, i) => (
          <Fragment key={step.id}>
            {i > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.06 + i * 0.05 }}
                className="flex h-8 shrink-0 items-center justify-center text-lg font-black text-[var(--hub-tool)] sm:h-auto sm:px-2"
                aria-hidden
              >
                <span className="sm:hidden">↓</span>
                <span className="hidden sm:inline">→</span>
              </motion.div>
            ) : null}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 380, damping: 28 }}
              className="w-full max-w-[280px] sm:w-[min(100%,200px)] sm:max-w-none"
            >
              <div className="h-full rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)]/90 px-4 py-3.5 text-center shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-hub-primary/35 hover:shadow-md dark:bg-[var(--hub-elevated)]/60 sm:px-5">
                <span className="block text-[13px] font-extrabold tracking-tight text-[var(--hub-text)]">
                  {step.label}
                </span>
                {step.sub ? (
                  <span className="mt-1 block text-[11px] leading-snug text-[var(--hub-muted)]">{step.sub}</span>
                ) : null}
              </div>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
