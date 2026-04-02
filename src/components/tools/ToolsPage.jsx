import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { filterDevopsTools } from '../../utils/toolsFilter'
import { categoryLabel } from '../../data/toolsData'
import ToolCard from './ToolCard'
import ToolModal from './ToolModal'
import DomainNavBar from './DomainNavBar'

const LIFECYCLE = [
  { id: 'plan', label: 'Plan', hint: 'Issues & design' },
  { id: 'code', label: 'Code', hint: 'SCM & review' },
  { id: 'build', label: 'Build', hint: 'CI & artifacts' },
  { id: 'test', label: 'Test', hint: 'Quality & security' },
  { id: 'release', label: 'Release', hint: 'Deploy & config' },
  { id: 'operate', label: 'Operate', hint: 'Run & observe' },
  { id: 'monitor', label: 'Monitor', hint: 'SLOs & incidents' },
]

function DevOpsLifecycleStrip() {
  return (
    <div className="mb-6 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)]/80 p-4 dark:bg-[var(--hub-elevated)]/30">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">
        Where tools sit in the lifecycle
      </p>
      <div className="flex flex-wrap items-stretch justify-between gap-2">
        {LIFECYCLE.map((step, i) => (
          <div key={step.id} className="flex min-w-0 flex-1 items-center gap-1 sm:min-w-[4.5rem]">
            <div className="flex min-w-0 flex-1 flex-col rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2 py-2 text-center dark:bg-[var(--hub-bg)]">
              <span className="text-[11px] font-extrabold text-[var(--hub-text)]">{step.label}</span>
              <span className="hidden text-[9px] text-[var(--hub-faint)] sm:block">{step.hint}</span>
            </div>
            {i < LIFECYCLE.length - 1 && (
              <span className="hidden shrink-0 text-[var(--hub-faint)] sm:inline" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function FilterChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
        active
          ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
          : 'border-[var(--hub-line)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-border2)]'
      }`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}

/**
 * @param {{
 *   query: string
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 *   isFavorite: (id: string) => boolean
 *   toggleFavorite: (id: string) => void
 * }} props
 */
export default function ToolsPage({
  query,
  activeCategoryId,
  onSelectCategory,
  isFavorite,
  toggleFavorite,
}) {
  const [chips, setChips] = useState({
    openSource: false,
    paid: false,
    cloudNative: false,
  })
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () => filterDevopsTools(query, activeCategoryId, chips),
    [query, activeCategoryId, chips]
  )

  const categoryTitle =
    activeCategoryId === 'all' || !activeCategoryId
      ? 'All domains'
      : categoryLabel(activeCategoryId)

  const toggleChip = (key) => {
    setChips((c) => ({ ...c, [key]: !c[key] }))
  }

  return (
    <div className="min-w-0">
      <DevOpsLifecycleStrip />

      <DomainNavBar activeCategoryId={activeCategoryId} onSelectCategory={onSelectCategory} />

      <div className="sticky top-0 z-[5] -mx-1 mb-4 border-b border-[var(--hub-line)] bg-[var(--hub-bg)]/90 py-3 backdrop-blur-md dark:bg-[var(--hub-bg)]/85">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Filters</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip
                active={chips.openSource}
                label="Open source"
                onClick={() => toggleChip('openSource')}
              />
              <FilterChip active={chips.paid} label="Paid" onClick={() => toggleChip('paid')} />
              <FilterChip
                active={chips.cloudNative}
                label="Cloud native"
                onClick={() => toggleChip('cloudNative')}
              />
            </div>
          </div>
          <p className="text-sm text-[var(--hub-sub)]">
            <span className="font-mono font-bold text-[var(--hub-tool)]">{filtered.length}</span>
            <span className="ml-1">tools in view · {categoryTitle}</span>
          </p>
        </div>
      </div>

      <LayoutGroup id="tools-grid">
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={() => toggleFavorite(tool.id)}
                onOpen={() => setSelected(tool)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-16 text-center"
        >
          <p className="text-base text-[var(--hub-sub)]">No tools match your search or filters.</p>
          <p className="mt-2 text-sm text-[var(--hub-faint)]">Try clearing filters or searching by name or category.</p>
        </motion.div>
      )}

      {selected ? (
        <ToolModal
          key={selected.id}
          tool={selected}
          isFavorite={isFavorite(selected.id)}
          onToggleFavorite={() => toggleFavorite(selected.id)}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  )
}
