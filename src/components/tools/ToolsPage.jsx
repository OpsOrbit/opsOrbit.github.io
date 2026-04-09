import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { filterDevopsTools } from '../../utils/toolsFilter'
import { categoryLabel } from '../../data/toolsData'
import { DEVOPS_TOOLS } from '../../data/toolsData'
import ToolCard from './ToolCard'
import ToolModal from './ToolModal'
import DomainNavBar from './DomainNavBar'
import FilterChip from './FilterChip'
import LifecycleStrip from './LifecycleStrip'
import { RecommendedStack, TopToolsStrip } from './ToolsDiscoverSections'
import CompareDock from './CompareDock'
import WorkspaceHero from '../workspace/WorkspaceHero'

/**
 * @param {{
 *   query: string
 *   onQueryChange?: (q: string) => void
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 *   isFavorite: (id: string) => boolean
 *   toggleFavorite: (id: string) => void
 * }} props
 */
export default function ToolsPage({
  query,
  onQueryChange,
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
  const [filtersCompact, setFiltersCompact] = useState(false)
  const filterSentinelRef = useRef(null)

  useEffect(() => {
    const el = filterSentinelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        setFiltersCompact(!entry.isIntersecting)
      },
      { root: null, rootMargin: '0px 0px -1px 0px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const filtered = useMemo(
    () => filterDevopsTools(query, activeCategoryId, chips, lifecycleStage),
    [query, activeCategoryId, chips, lifecycleStage]
  )

  const categoryTitle =
    activeCategoryId === 'all' || !activeCategoryId ? 'All domains' : categoryLabel(activeCategoryId)

  const toggleChip = (key) => {
    setChips((c) => ({ ...c, [key]: !c[key] }))
  }

  const pickToolById = useCallback((id) => {
    const t = DEVOPS_TOOLS.find((x) => x.id === id)
    if (t) setSelected(t)
  }, [])

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
      className="tools-workspace min-w-0 max-w-full overflow-x-hidden pb-4"
    >
      <WorkspaceHero
        eyebrow="DevOps tools encyclopedia"
        title="Explore & compare"
        description="Curated tools across the SDLC — filter by lifecycle stage, domain, and license. Built for learning."
      >
        {onQueryChange ? (
          <div className="relative mt-5 max-w-xl">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400 dark:text-cyan-400/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search tools, categories, use cases…"
              className="h-12 w-full rounded-2xl border border-white/40 bg-white/70 pl-11 pr-4 text-sm text-[var(--hub-text)] shadow-inner outline-none ring-cyan-500/0 transition-[box-shadow,border-color] placeholder:text-[var(--hub-muted)] focus:border-indigo-400/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(99,102,241,0.25)] dark:border-white/10 dark:bg-[var(--hub-surface)]/80 dark:focus:shadow-[0_0_0_3px_rgba(34,211,238,0.2)]"
              aria-label="Search tools"
            />
          </div>
        ) : null}
      </WorkspaceHero>

      <TopToolsStrip onPickTool={pickToolById} />
      <RecommendedStack onPickTool={pickToolById} />

      <LifecycleStrip selectedId={lifecycleStage} onSelectStage={setLifecycleStage} />

      <DomainNavBar activeCategoryId={activeCategoryId} onSelectCategory={onSelectCategory} />

      <div ref={filterSentinelRef} className="h-px w-full shrink-0" aria-hidden />

      <div
        className={`sticky top-0 z-20 -mx-1 mb-4 rounded-2xl border border-white/10 bg-[var(--hub-bg)]/90 backdrop-blur-lg transition-[padding,box-shadow] duration-200 dark:bg-[var(--hub-bg)]/88 lg:z-[5] ${
          filtersCompact
            ? 'py-2 shadow-[0_12px_40px_-8px_rgba(79,70,229,0.18)] dark:shadow-black/40 sm:py-2.5'
            : 'py-3 sm:py-4'
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Filters</p>
            <div className="hub-inline-scroll scrollbar-hide mt-2 flex w-full max-w-full flex-nowrap gap-2 overflow-x-auto overflow-y-hidden pb-1 sm:flex-wrap">
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
          <p className="text-sm text-[var(--hub-sub)] sm:text-base">
            <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-300 dark:to-indigo-300">
              {filtered.length}
            </span>
            <span className="ml-1 break-words">tools · {categoryTitle}</span>
          </p>
        </div>
      </div>

      <LayoutGroup id="tools-grid">
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
