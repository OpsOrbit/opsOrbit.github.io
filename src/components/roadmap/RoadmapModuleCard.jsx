import { Fragment, forwardRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { workspaceHashFromLink } from '../../utils/siteHashNavigation'

function renderIntroRemark(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*(.+)\*\*$/)
    if (m) {
      return (
        <strong key={i} className="font-semibold text-[var(--hub-text)]">
          {m[1]}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

const trackLabel = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }

const RoadmapModuleCard = forwardRef(function RoadmapModuleCard(props, ref) {
  const { step, expanded, onToggleExpand, className = '' } = props

  return (
    <motion.article
      ref={ref}
      layout
      initial={false}
      className={`relative overflow-hidden rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] ring-1 ring-black/[0.03] dark:bg-[var(--hub-elevated)] dark:ring-white/[0.06] ${className}`}
    >
      <button
        type="button"
        onClick={() => onToggleExpand?.(step.id)}
        className="flex w-full flex-col gap-2 px-4 py-3.5 text-left transition-colors hover:bg-[var(--hub-tool-dim2)]/50 sm:px-5 sm:py-4"
        aria-expanded={expanded}
        aria-controls={`roadmap-panel-${step.id}`}
        id={`roadmap-trigger-${step.id}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[14px] font-extrabold leading-snug text-[var(--hub-text)] sm:text-[15px]">
                {step.mainTitle}
              </h3>
              {step.track ? (
                <span className="rounded-md bg-[var(--hub-tool-dim)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
                  {trackLabel[step.track] || step.track}
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 text-[11px] font-semibold text-hub-primary sm:text-xs">{step.panelTitle}</p>
          </div>
          <span className="shrink-0 text-[var(--hub-muted)]" aria-hidden>
            {expanded ? '\u25BE' : '\u25B8'}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id={`roadmap-panel-${step.id}`}
            role="region"
            aria-labelledby={`roadmap-trigger-${step.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="overflow-hidden border-t border-[var(--hub-line)]/80"
          >
            <div className="space-y-4 px-4 py-4 sm:px-5">
              {step.topics?.length ? (
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">
                    Topics in this module
                  </p>
                  <ul className="flex flex-wrap gap-1.5" role="list">
                    {step.topics.map((t) => (
                      <li
                        key={t}
                        className="rounded-lg border border-hub-primary/30 bg-hub-primary/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--hub-text)] dark:bg-hub-primary/10"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="rounded-xl border border-hub-line/80 bg-[var(--hub-card)] shadow-sm dark:border-hub-line/60">
                <ul className="divide-y divide-[var(--hub-line)]/70 dark:divide-[var(--hub-line)]/50" role="list">
                  {(step.rows || []).map((row, ri) => (
                    <li key={`${step.id}-row-${ri}`} className="px-3 py-2.5 sm:px-4">
                      <p className="text-left text-[12px] leading-relaxed text-[var(--hub-sub)] sm:text-[13px]">
                        {renderIntroRemark(row.text)}
                      </p>
                      {row.links?.length ? (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {row.links.map((lnk, li) => (
                            <a
                              key={`${step.id}-r${ri}-l${li}-${lnk.type}-${
                                lnk.type === 'commands'
                                  ? lnk.tool
                                  : lnk.type === 'tools'
                                    ? lnk.category || 'all'
                                    : lnk.topic
                              }`}
                              href={workspaceHashFromLink(lnk)}
                              className="inline-flex items-center rounded-md border border-hub-primary/35 bg-hub-primary/5 px-2 py-1 text-[11px] font-semibold text-hub-primary transition-colors hover:bg-hub-primary/12 dark:border-hub-primary/40 dark:bg-hub-primary/10 dark:hover:bg-hub-primary/18"
                            >
                              {lnk.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
})

export default RoadmapModuleCard
