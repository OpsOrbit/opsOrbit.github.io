import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function LabToolbar({
  onCopySummary,
  onRunHandsOn,
  learned,
  onToggleLearned,
  onSaveNotes,
  onScrollNotes,
  className = '',
}) {
  const [flash, setFlash] = useState(null)

  const flashMsg = useCallback((msg) => {
    setFlash(msg)
    window.setTimeout(() => setFlash(null), 1600)
  }, [])

  const handleCopy = useCallback(async () => {
    const ok = await onCopySummary?.()
    flashMsg(ok ? 'Copied overview' : 'Nothing to copy')
  }, [onCopySummary, flashMsg])

  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-[var(--hub-line)]/80 bg-[var(--hub-card)]/70 p-3 shadow-sm dark:bg-[var(--hub-elevated)]/40 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-[12px] font-bold text-[var(--hub-text)] transition hover:border-hub-primary/40 hover:text-hub-primary"
        >
          Copy
        </button>
        <button
          type="button"
          onClick={() => onRunHandsOn?.()}
          className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-hub-primary/35 bg-hub-primary/10 px-3 py-2 text-[12px] font-bold text-hub-primary transition hover:bg-hub-primary/18"
        >
          Run
        </button>
        <button
          type="button"
          onClick={() => onToggleLearned?.()}
          className={`inline-flex min-h-[38px] items-center justify-center rounded-lg border px-3 py-2 text-[12px] font-bold transition ${
            learned
              ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-800 dark:text-emerald-200'
              : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:text-[var(--hub-text)]'
          }`}
        >
          {learned ? 'Learned ✓' : 'Mark as learned'}
        </button>
        <button
          type="button"
          onClick={() => {
            onSaveNotes?.()
            onScrollNotes?.()
            flashMsg('Notes saved')
          }}
          className="inline-flex min-h-[38px] items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-[12px] font-bold text-[var(--hub-text)] transition hover:border-hub-primary/40"
        >
          Save
        </button>
      </div>
      <AnimatePresence>
        {flash ? (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] font-semibold text-hub-primary sm:text-right"
          >
            {flash}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
