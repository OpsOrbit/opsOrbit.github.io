import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * Accessible overlay dialog: backdrop click, Escape, focus return.
 */
export default function Modal({ open, onClose, title, titleId, children, className = '', panelClassName = '' }) {
  const panelRef = useRef(null)
  const prevActive = useRef(null)

  useEffect(() => {
    if (!open) return
    prevActive.current = document.activeElement
    const t = window.setTimeout(() => {
      const el = panelRef.current?.querySelector?.('[data-modal-initial-focus]')
      el?.focus?.()
    }, 0)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose?.()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      try {
        prevActive.current?.focus?.()
      } catch {
        /* noop */
      }
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="presentation"
          className={`fixed inset-0 z-[220] flex items-end justify-center p-0 sm:items-center sm:p-4 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
            aria-label="Close dialog"
            onClick={() => onClose?.()}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={`relative z-10 flex max-h-[min(90dvh,680px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-2xl dark:border-[var(--hub-line)] sm:rounded-2xl ${panelClassName}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          >
            {title ? (
              <div className="flex shrink-0 items-center justify-between border-b border-[var(--hub-line)] px-4 py-3">
                <h2 id={titleId} className="text-base font-semibold text-[var(--hub-text)]">
                  {title}
                </h2>
                <button
                  type="button"
                  className="rounded-lg px-2 py-1 text-sm font-medium text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]"
                  onClick={() => onClose?.()}
                >
                  Close
                </button>
              </div>
            ) : null}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
