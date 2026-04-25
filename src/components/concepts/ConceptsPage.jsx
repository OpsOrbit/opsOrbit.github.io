import { Fragment, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CONCEPT_CATEGORIES, CONCEPTS, categoryLabelForConcept } from '../../data/conceptsData'
import { filterConcepts } from '../../utils/conceptsFilter'
import Modal from '../ui/Modal'
import FilterChip from '../tools/FilterChip'

const CAT_ICONS = {
  all: '✦',
  networking: '🌐',
  security: '🛡',
  backend: '⚙️',
  devops: '∞',
  cloud: '☁️',
}

function FlowDiagram({ flow, accent = true }) {
  return (
    <div className="w-full min-w-0 space-y-0">
      {flow.map((node, i) => (
        <div key={node.id}>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.22 }}
            className={`rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3 ${
              accent
                ? 'border-indigo-300/50 bg-gradient-to-br from-indigo-50/90 to-violet-50/50 shadow-sm dark:border-indigo-500/25 dark:from-indigo-950/60 dark:to-violet-950/40'
                : 'border-[var(--hub-line)] bg-[var(--hub-surface)] dark:bg-[var(--hub-elevated)]/80'
            }`}
          >
            <p className="text-sm font-bold text-[var(--hub-text)]">{node.label}</p>
            {node.hint ? <p className="mt-0.5 text-[11px] text-[var(--hub-muted)]">{node.hint}</p> : null}
          </motion.div>
          {i < flow.length - 1 ? (
            <div className="flex justify-center py-1.5 text-lg font-bold text-indigo-500 dark:text-cyan-400/90" aria-hidden>
              ↓
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

/** Compact horizontal flow preview on cards */
function FlowDiagramRow({ flow }) {
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] sm:text-xs">
      {flow.map((node, i) => (
        <Fragment key={node.id}>
          {i > 0 ? (
            <span className="font-bold text-indigo-500 dark:text-cyan-400" aria-hidden>
              →
            </span>
          ) : null}
          <span className="rounded-lg border border-indigo-300/40 bg-indigo-50/80 px-2 py-1 font-semibold text-[var(--hub-text)] dark:border-indigo-500/30 dark:bg-indigo-950/50">
            {node.label}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

/**
 * @param {{
 *   query: string
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 * }} props
 */
export default function ConceptsPage({ query, activeCategoryId, onSelectCategory }) {
  const filtered = useMemo(() => filterConcepts(query, activeCategoryId), [query, activeCategoryId])
  const [flowConceptId, setFlowConceptId] = useState(/** @type {string | null} */ (null))

  const flowConcept = useMemo(
    () => (flowConceptId ? CONCEPTS.find((c) => c.id === flowConceptId) : null),
    [flowConceptId]
  )

  const categoryTitle =
    activeCategoryId === 'all' || !activeCategoryId ? 'All concepts' : categoryLabelForConcept(activeCategoryId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="concepts-workspace min-w-0 max-w-full overflow-x-hidden pb-6"
    >
      <div className="mb-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Category</p>
        <div className="hub-inline-scroll scrollbar-hide flex flex-wrap gap-2">
          {CONCEPT_CATEGORIES.map((c) => {
            const active =
              activeCategoryId === c.id || (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all'))
            return (
              <FilterChip
                key={c.id}
                active={active}
                label={c.label}
                icon={CAT_ICONS[c.id] || '◇'}
                onClick={() => onSelectCategory(c.id)}
              />
            )
          })}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-[var(--hub-sub)]">
          <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-300 dark:to-indigo-300">
            {filtered.length}
          </span>
          <span className="ml-1">concepts</span>
          <span className="text-[var(--hub-muted)]"> · {categoryTitle}</span>
        </p>
      </div>

      {filtered.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-indigo-300/50 bg-gradient-to-br from-white/80 to-indigo-50/40 px-6 py-12 text-center text-sm text-[var(--hub-sub)] dark:border-indigo-500/30 dark:from-[var(--hub-card)]/80 dark:to-indigo-950/30"
        >
          No concepts match. Try another category or clear the search.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col overflow-hidden rounded-xl border border-white/25 bg-gradient-to-br from-white/95 via-indigo-50/25 to-violet-50/20 p-4 shadow-[0_8px_32px_-12px_rgba(79,70,229,0.18)] backdrop-blur-xl transition-shadow hover:shadow-[0_12px_40px_-8px_rgba(99,102,241,0.25)] dark:border-white/10 dark:from-[var(--hub-card)] dark:via-indigo-950/20 dark:to-violet-950/15"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden>
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-extrabold tracking-tight text-[var(--hub-text)]">{c.title}</h3>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-cyan-400/90">
                      {categoryLabelForConcept(c.categoryId)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  {c.summary.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-[var(--hub-sub)]">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-4 border-t border-[var(--hub-line)]/60 pt-3">
                  <FlowDiagramRow flow={c.flow} />
                </div>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFlowConceptId(c.id)}
                  className="mt-4 w-full rounded-xl border border-indigo-400/40 bg-gradient-to-r from-indigo-600/90 to-violet-600/90 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-500/20"
                >
                  View flow
                </motion.button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal
        open={flowConcept != null}
        onClose={() => setFlowConceptId(null)}
        title={flowConcept ? `${flowConcept.icon} ${flowConcept.title}` : ''}
        titleId="concept-flow-title"
        panelClassName="max-w-lg sm:max-w-xl"
      >
        {flowConcept ? (
          <div className="p-4">
            <p className="mb-4 text-sm leading-relaxed text-[var(--hub-sub)]">{flowConcept.summary.join(' ')}</p>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">Step-by-step flow</p>
            <FlowDiagram flow={flowConcept.flow} />
          </div>
        ) : null}
      </Modal>

    </motion.div>
  )
}
