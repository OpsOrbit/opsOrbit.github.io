import { useMemo, useState, useCallback } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { filterDevopsTools } from '../../utils/toolsFilter'
import { categoryLabel } from '../../data/toolsData'
import ToolCard from './ToolCard'
import ToolModal from './ToolModal'
import DomainNavBar from './DomainNavBar'
import FilterChip from './FilterChip'
import LifecycleStrip from './LifecycleStrip'
import CompareDock from './CompareDock'
import { useStickyCompact } from '../../hooks/useStickyCompact'

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
  const [lifecycleStage, setLifecycleStage] = useState(/** @type {string | null} */ (null))
  const [selected, setSelected] = useState(null)
  const [compareIds, setCompareIds] = useState(/** @type {string[]} */ ([]))
  const { sentinelRef: filterSentinelRef, compact: filtersCompact } = useStickyCompact()

  const filtered = useMemo(
    () => filterDevopsTools(query, activeCategoryId, chips, lifecycleStage),
    [query, activeCategoryId, chips, lifecycleStage]
  )

  const categoryTitle =
    activeCategoryId === 'all' || !activeCategoryId ? 'All domains' : categoryLabel(activeCategoryId)

  const toggleChip = (key) => {
    setChips((c) => ({ ...c, [key]: !c[key] }))
  }

  const addCompare = useCallback((tool) => {
    setCompareIds((prev) => {
      if (prev.includes(tool.id)) return prev.filter((x) => x !== tool.id)
      if (prev.length >= 2) return [prev[0], tool.id]
      return [...prev, tool.id]
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="tools-workspace min-w-0 max-w-full overflow-x-hidden pb-3"
    >
      <DomainNavBar activeCategoryId={activeCategoryId} onSelectCategory={onSelectCategory} />

      <LifecycleStrip compact selectedId={lifecycleStage} onSelectStage={setLifecycleStage} />

      <div ref={filterSentinelRef} className="h-px w-full shrink-0" aria-hidden />

      <div
        className={`sticky top-0 z-20 -mx-0.5 mb-2 max-w-full overflow-hidden rounded-xl border border-white/10 bg-[var(--hub-bg)]/92 backdrop-blur-md transition-[padding,box-shadow] duration-200 dark:bg-[var(--hub-bg)]/90 lg:z-[5] ${
          filtersCompact
            ? 'py-1.5 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.16)] dark:shadow-black/35 sm:py-2'
            : 'py-2 sm:py-2.5'
        }`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Filters</p>
            <div className="hub-inline-scroll scrollbar-hide mt-1.5 flex w-full max-w-full flex-nowrap gap-1.5 overflow-x-auto overflow-y-hidden pb-0.5 sm:flex-wrap">
              <FilterChip
                active={chips.openSource}
                label="Open source"
                icon="◆"
                onClick={() => toggleChip('openSource')}
              />
              <FilterChip active={chips.paid} label="Paid" icon="◆" onClick={() => toggleChip('paid')} />
              <FilterChip
                active={chips.cloudNative}
                label="Cloud native"
                icon="☁"
                onClick={() => toggleChip('cloudNative')}
              />
            </div>
          </div>
          <p className="text-xs text-[var(--hub-sub)] sm:text-sm">
            <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-300 dark:to-indigo-300">
              {filtered.length}
            </span>
            <span className="ml-1 break-words">tools · {categoryTitle}</span>
          </p>
        </div>
      </div>

      <LayoutGroup id="tools-grid">
        <motion.div layout className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                isFavorite={isFavorite(tool.id)}
                onToggleFavorite={() => toggleFavorite(tool.id)}
                onOpen={() => setSelected(tool)}
                onCompare={addCompare}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-indigo-300/40 bg-gradient-to-br from-white/60 to-indigo-50/30 px-4 py-12 text-center backdrop-blur-sm dark:border-indigo-500/20 dark:from-[var(--hub-card)]/60 dark:to-indigo-950/20 sm:px-8 sm:py-16"
        >
          <p className="text-sm font-medium text-[var(--hub-sub)] sm:text-base">No tools match your search or filters.</p>
          <p className="mt-2 text-xs text-[var(--hub-faint)] sm:text-sm">
            Clear lifecycle, adjust license chips, or try a shorter search.
          </p>
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

      <CompareDock
        ids={compareIds}
        onClear={() => setCompareIds([])}
        onRemove={(id) => setCompareIds((p) => p.filter((x) => x !== id))}
      />
    </motion.div>
  )
}
