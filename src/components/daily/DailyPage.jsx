import { useState, useMemo, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import { pickDailyConcept, pickDailyCommand, pickDailyQuestion, getLocalDateKey } from '../../utils/dailyPicker'
import { categoryLabelForConcept } from '../../data/conceptsData'

function HighlightCard({ accent, icon, eyebrow, title, children, footer }) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-sm ${accent}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--hub-tool-dim)]/50 via-transparent to-transparent" />
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            {icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--hub-tool)]">{eyebrow}</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--hub-brand)] sm:text-xl">{title}</h2>
            <div className="mt-3 text-sm leading-relaxed text-[var(--hub-text)]">{children}</div>
            {footer ? <div className="mt-4 border-t border-[var(--hub-line)]/80 pt-4">{footer}</div> : null}
          </div>
        </div>
      </div>
    </article>
  )
}

/**
 * @param {{ toolLabel: (t: string) => string }} props
 */
export default function DailyPage({ toolLabel }) {
  const [refreshKey, setRefreshKey] = useState(0)
  const dateKey = useMemo(() => getLocalDateKey(), [])

  const concept = useMemo(() => pickDailyConcept(dateKey, refreshKey), [dateKey, refreshKey])
  const command = useMemo(() => pickDailyCommand(dateKey, refreshKey), [dateKey, refreshKey])
  const question = useMemo(() => pickDailyQuestion(dateKey, refreshKey), [dateKey, refreshKey])

  const [selectedOption, setSelectedOption] = useState(null)
  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
    setSelectedOption(null)
  }, [])

  useEffect(() => {
    setSelectedOption(null)
  }, [question.id])

  const conceptHref = `#/concepts/${concept.categoryId}`
  const commandHref = `#/commands/${command.tool}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-w-0 pb-12"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Learning</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--hub-brand)] sm:text-3xl">Daily</h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">
            Three fresh picks — concept, command, and a quick quiz. Same calendar day uses the same seed until you refresh.
          </p>
          <p className="mt-2 font-mono text-xs text-[var(--hub-muted)]">Session date: {dateKey}</p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] px-4 py-2.5 text-sm font-bold text-[var(--hub-text)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] transition-colors hover:bg-[var(--hub-tool-dim2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
        >
          <span aria-hidden>🔁</span>
          New picks
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <HighlightCard
          accent="ring-1 ring-amber-500/25"
          icon="💡"
          eyebrow="Concept of the Day"
          title={`${concept.icon} ${concept.title}`}
          footer={
            <a
              href={conceptHref}
              className="inline-flex text-sm font-semibold text-[var(--hub-tool)] underline-offset-2 hover:underline"
            >
              Explore in Concepts →
            </a>
          }
        >
          <p className="text-[var(--hub-muted)]">{categoryLabelForConcept(concept.categoryId)}</p>
          <p className="mt-2">{concept.summary[0]}</p>
        </HighlightCard>

        <HighlightCard
          accent="ring-1 ring-sky-500/25"
          icon="⌘"
          eyebrow="Command of the Day"
          title={command.name}
          footer={
            <a
              href={commandHref}
              className="inline-flex text-sm font-semibold text-[var(--hub-tool)] underline-offset-2 hover:underline"
            >
              Open {toolLabel(command.tool)} commands →
            </a>
          }
        >
          <p className="font-mono text-[13px] text-[var(--hub-text)]">{command.command}</p>
          <p className="mt-2 text-[var(--hub-muted)]">{command.description}</p>
        </HighlightCard>

        <HighlightCard
          accent="ring-1 ring-violet-500/25"
          icon="❓"
          eyebrow="Question of the Day"
          title="Quick check"
          footer={
            selectedOption != null ? (
              <p className="text-sm text-[var(--hub-muted)]">
                <span className="font-semibold text-[var(--hub-text)]">Why: </span>
                {question.explanation}
              </p>
            ) : null
          }
        >
          <p className="font-medium">{question.question}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {question.options.map((opt, i) => {
              const chosen = selectedOption === i
              const showResult = selectedOption != null
              const correct = i === question.correctIndex
              let btnClass =
                'w-full rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]'
              if (!showResult) {
                btnClass += ' border-[var(--hub-line)] bg-[var(--hub-card)] hover:border-[var(--hub-tool)]/50'
              } else if (correct) {
                btnClass += ' border-emerald-500/60 bg-emerald-500/10'
              } else if (chosen && !correct) {
                btnClass += ' border-red-500/40 bg-red-500/10'
              } else {
                btnClass += ' border-[var(--hub-line)] opacity-70'
              }
              return (
                <li key={`${question.id}-opt-${i}`}>
                  <button
                    type="button"
                    disabled={selectedOption != null}
                    onClick={() => setSelectedOption(i)}
                    className={btnClass}
                  >
                    <span className="font-mono text-[11px] text-[var(--hub-muted)]">{String.fromCharCode(65 + i)}. </span>
                    {opt}
                  </button>
                </li>
              )
            })}
          </ul>
          {selectedOption != null ? (
            <p className="mt-3 text-sm font-semibold text-[var(--hub-text)]">
              {selectedOption === question.correctIndex ? '✓ Correct!' : '✗ Not quite — see below.'}
            </p>
          ) : (
            <p className="mt-3 text-xs text-[var(--hub-muted)]">Tap an answer to reveal the explanation.</p>
          )}
        </HighlightCard>
      </div>
    </motion.div>
  )
}
