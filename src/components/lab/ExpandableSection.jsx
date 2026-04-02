import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function ExpandableSection({
  title,
  defaultOpen = false,
  children,
  className = '',
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[var(--hub-line)]/90 bg-[var(--hub-surface)]/60 shadow-sm dark:bg-[var(--hub-elevated)]/30 ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[var(--hub-tool-dim2)]/40 sm:px-5"
        aria-expanded={open}
      >
        <span className="text-[13px] font-extrabold tracking-tight text-[var(--hub-text)] sm:text-sm">{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="shrink-0 text-[var(--hub-muted)]"
          aria-hidden
        >
          ▾
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="border-t border-[var(--hub-line)]/70"
          >
            <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
