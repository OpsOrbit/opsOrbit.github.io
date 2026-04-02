import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import CodeBlockPanel from './CodeBlockPanel'

/**
 * @param {{ handsOn: { title: string, detail: string, command: string, output: string }[], codeLang?: string }} props
 */
export default function LabHandsOnPanel({ handsOn = [], codeLang = 'bash', className = '' }) {
  const [revealed, setRevealed] = useState({})
  const [runningIdx, setRunningIdx] = useState(null)

  const runStep = useCallback((idx) => {
    setRunningIdx(idx)
    window.setTimeout(() => {
      setRunningIdx(null)
      setRevealed((r) => ({ ...r, [idx]: true }))
    }, 650)
  }, [])

  if (!handsOn.length) return null

  return (
    <div className={`space-y-4 ${className}`}>
      <p className="text-[13px] leading-relaxed text-[var(--hub-sub)]">
        Step through a simulated terminal. <strong className="font-semibold text-[var(--hub-text)]">Run (simulated)</strong>{' '}
        plays a short animation — nothing executes on your machine.
      </p>
      <ol className="list-none space-y-4 pl-0">
        {handsOn.map((step, idx) => {
          const cmdLang =
            step.command?.trim().startsWith('#') || step.command?.includes('Topic:')
              ? 'bash'
              : codeLang
          const isRunning = runningIdx === idx
          const showOutput = Boolean(revealed[idx])

          return (
            <li key={step.title}>
              <motion.div
                layout
                className="overflow-hidden rounded-xl border border-[var(--hub-line)]/90 bg-[var(--hub-surface)]/70 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-[var(--hub-elevated)]/35"
              >
                <div className="border-b border-[var(--hub-line)]/70 bg-[var(--hub-tool-dim)]/25 px-4 py-3 sm:px-5">
                  <span className="text-[12px] font-extrabold tracking-tight text-[var(--hub-text)] sm:text-sm">
                    {step.title}
                  </span>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--hub-sub)]">{step.detail}</p>
                </div>
                <div className="space-y-3 p-4 sm:p-5">
                  <CodeBlockPanel code={step.command} lang={cmdLang} />
                  <button
                    type="button"
                    onClick={() => runStep(idx)}
                    disabled={isRunning}
                    className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3.5 py-2 text-[12px] font-bold text-[var(--hub-text)] shadow-sm transition hover:border-hub-primary/45 hover:text-hub-primary disabled:cursor-wait disabled:opacity-70 dark:bg-[var(--hub-elevated)]/80"
                  >
                    {isRunning ? 'Running…' : 'Run (simulated)'}
                  </button>
                  <AnimatePresence>
                    {showOutput ? (
                      <motion.pre
                        key="out"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="overflow-x-auto rounded-lg border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] p-4 font-mono text-[11px] leading-relaxed text-[var(--hub-code-text)] sm:text-[12px]"
                        role="status"
                      >
                        {step.output}
                      </motion.pre>
                    ) : null}
                  </AnimatePresence>
                </div>
              </motion.div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
