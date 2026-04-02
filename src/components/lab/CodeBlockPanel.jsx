import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { highlightCode } from '../../utils/simpleSyntaxHighlight'

export default function CodeBlockPanel({ code, lang = 'bash', className = '' }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    if (!code?.trim()) return
    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [code])

  if (!code?.trim()) return null

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--hub-line)]/60 bg-black/[0.15] px-3 py-2 dark:bg-white/[0.04]">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--hub-muted)]">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-[var(--hub-line)]/80 bg-[var(--hub-surface)]/90 px-2.5 py-1 text-[11px] font-bold text-[var(--hub-text)] transition hover:border-hub-primary/50 hover:text-hub-primary dark:bg-[var(--hub-elevated)]/90"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-emerald-600 dark:text-emerald-400"
              >
                Copied
              </motion.span>
            ) : (
              <motion.span key="cp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-left font-mono text-[12px] leading-relaxed sm:text-[13px]">
        <code>{highlightCode(code.trim(), lang)}</code>
      </pre>
    </div>
  )
}
