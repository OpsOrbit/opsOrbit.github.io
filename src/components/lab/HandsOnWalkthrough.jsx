import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import CodeBlockPanel from './CodeBlockPanel'

export default function HandsOnWalkthrough({ steps = [], codeLang = 'bash' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ran, setRan] = useState(() => new Set())

  const step = steps[activeIndex]
  const runStep = useCallback(() => {
    setRan((prev) => new Set(prev).add(activeIndex))
  }, [activeIndex])

  if (!steps.length) return null

  return (
    <div className="space-y-5">
      <ol className="flex flex-wrap gap-2" role="list">
        {steps.map((s, i) => {
          const done = ran.has(i)
          const on = i === activeIndex
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`rounded-lg border px-3 py-2 text-left text-[11px] font-bold transition sm:text-xs ${
                  on
                    ? 'border-hub-primary bg-hub-primary/15 text-[var(--hub-text)] ring-1 ring-hub-primary/30'
                    : done
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                      : 'border-[var(--hub-line)] text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]/50 hover:text-[var(--hub-text)]'
                }`}
              >
                <span className="mr-1.5 tabular-nums opacity-70">{i + 1}.</span>
                {s.title.replace(/^\d+\s*·\s*/, '')}
              </button>
            </li>
          )
        })}
      </ol>

      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="space-y-4 rounded-2xl border border-[var(--hub-line)]/90 bg-[var(--hub-card)]/50 p-4 sm:p-5"
      >
        <p className="text-[14px] leading-relaxed text-[var(--hub-sub)]">{step.detail}</p>
        <CodeBlockPanel code={step.command} lang={codeLang} />
        <button
          type="button"
          onClick={runStep}
          className="inline-flex min-h-[42px] items-center justify-center rounded-xl border border-hub-primary/45 bg-hub-primary px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition hover:opacity-95 dark:text-[#0d1117]"
        >
          Run (simulated)
        </button>
        <AnimatePresence>
          {ran.has(activeIndex) ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="overflow-hidden rounded-xl border border-emerald-500/35 bg-[var(--hub-code-bg)]"
            >
              <div className="border-b border-emerald-500/25 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                Simulated output
              </div>
              <pre className="max-h-[min(50vh,320px)] overflow-auto p-4 font-mono text-[11px] leading-relaxed text-[var(--hub-code-text)] sm:text-xs">
                {step.output}
              </pre>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
