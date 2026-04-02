import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Sticky-style action row: Copy primary snippet, jump to hands-on, mark learned, save notes.
 */
export default function LabTopicToolbar({
  copyText = '',
  onRunSimulated,
  learned = false,
  onToggleLearned,
  onSaveNotes,
  saveDisabled = false,
  className = '',
}) {
  const [copied, setCopied] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  const copy = useCallback(async () => {
    const t = copyText?.trim()
    if (!t) return
    try {
      await navigator.clipboard.writeText(t)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [copyText])

  const save = useCallback(() => {
    if (saveDisabled) return
    onSaveNotes?.()
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 2000)
  }, [onSaveNotes, saveDisabled])

  const hasCopy = Boolean(copyText?.trim())

  return (
    <div
      className={`flex flex-wrap items-center gap-2 rounded-xl border border-[var(--hub-line)]/80 bg-[var(--hub-card)]/60 p-2 shadow-sm dark:bg-[var(--hub-elevated)]/40 ${className}`}
      role="toolbar"
      aria-label="Topic actions"
    >
      <button
        type="button"
        onClick={copy}
        disabled={!hasCopy}
        className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-text)] transition hover:border-hub-primary/45 hover:text-hub-primary disabled:cursor-not-allowed disabled:opacity-40 dark:bg-[var(--hub-elevated)]/80 sm:text-[12px]"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 dark:text-emerald-400">
              Copied
            </motion.span>
          ) : (
            <motion.span key="d" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <button
        type="button"
        onClick={onRunSimulated}
        className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-text)] transition hover:border-hub-primary/45 hover:text-hub-primary dark:bg-[var(--hub-elevated)]/80 sm:text-[12px]"
      >
        Run
      </button>
      <button
        type="button"
        onClick={() => onToggleLearned?.()}
        className={`rounded-lg border px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition sm:text-[12px] ${
          learned
            ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
            : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-text)] hover:border-hub-primary/45 hover:text-hub-primary dark:bg-[var(--hub-elevated)]/80'
        }`}
      >
        {learned ? 'Learned ✓' : 'Mark learned'}
      </button>
      <button
        type="button"
        onClick={save}
        disabled={saveDisabled}
        className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-text)] transition hover:border-hub-primary/45 hover:text-hub-primary disabled:opacity-40 dark:bg-[var(--hub-elevated)]/80 sm:text-[12px]"
      >
        <AnimatePresence mode="wait">
          {savedFlash ? (
            <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 dark:text-emerald-400">
              Saved
            </motion.span>
          ) : (
            <motion.span key="n" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Save
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
