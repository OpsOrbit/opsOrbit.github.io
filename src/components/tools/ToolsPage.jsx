import { useMemo, useState, useRef, useEffect, useCallback } from 'react'
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

const SWIPE_THRESHOLD_PX = 48

function DevOpsLifecycleStrip() {
  const scrollerRef = useRef(null)
  const touchRef = useRef({ x: 0, y: 0 })

  const scrollByStep = useCallback((direction) => {
    const el = scrollerRef.current
    if (!el) return
    const delta = direction * Math.min(200, Math.max(120, el.clientWidth * 0.42))
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }, [])

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY }
  }, [])

  const onTouchEnd = useCallback(
    (e) => {
      const t = e.changedTouches[0]
      const dx = t.clientX - touchRef.current.x
      const dy = t.clientY - touchRef.current.y
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return
      scrollByStep(dx < 0 ? 1 : -1)
    },
    [scrollByStep]
  )

  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)]/80 p-3 pb-2 dark:bg-[var(--hub-elevated)]/30 sm:mb-6 sm:p-4 lg:p-6">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2 sm:mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">
          Where tools sit in the lifecycle
        </p>
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <button
            type="button"
            onClick={() => scrollByStep(-1)}
            className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-text)]"
            aria-label="Previous lifecycle phases"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByStep(1)}
            className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-text)]"
            aria-label="Next lifecycle phases"
          >
            →
          </button>
        </div>
      </div>
      <p className="mb-2 text-[10px] text-[var(--hub-faint)] lg:hidden">Swipe or tap arrows to move along the lifecycle</p>
      <div className="-mx-3 min-w-0 px-3 sm:mx-0 sm:px-0">
        <div
          ref={scrollerRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="hub-inline-scroll scrollbar-hide w-full min-w-0 max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden pb-2 lg:snap-none lg:overflow-x-visible lg:pb-0"
          tabIndex={0}
          role="region"
          aria-label="DevOps lifecycle phases — swipe horizontally or scroll to explore"
        >
          <div
            className="flex w-max min-w-0 flex-nowrap gap-3 lg:w-full lg:max-w-full lg:flex-wrap lg:justify-between lg:gap-2"
            role="list"
          >
            {LIFECYCLE.map((step, i) => (
              <div
                key={step.id}
                className="flex shrink-0 snap-center snap-always items-center gap-2 lg:snap-none lg:min-w-0 lg:flex-1"
                role="listitem"
              >
                <div className="flex min-h-[44px] min-w-[120px] shrink-0 flex-col justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-center dark:bg-[var(--hub-bg)] sm:min-h-0 lg:min-w-0 lg:w-full lg:flex-1">
                  <span className="whitespace-nowrap text-xs font-extrabold text-[var(--hub-text)] sm:text-[11px]">
                    {step.label}
                  </span>
                  <span className="hidden text-[9px] text-[var(--hub-faint)] lg:block">{step.hint}</span>
                </div>
                {i < LIFECYCLE.length - 1 && (
                  <span className="hidden shrink-0 text-[var(--hub-faint)] lg:inline" aria-hidden>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] sm:min-h-0 sm:py-1.5 sm:text-sm ${
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
    <div className="min-w-0 max-w-full overflow-x-hidden">
      <DevOpsLifecycleStrip />

      <DomainNavBar activeCategoryId={activeCategoryId} onSelectCategory={onSelectCategory} />

      <div ref={filterSentinelRef} className="h-px w-full shrink-0" aria-hidden />

      <div
        className={`sticky top-0 z-20 -mx-1 mb-4 border-b border-[var(--hub-line)] bg-[var(--hub-bg)]/95 backdrop-blur-md transition-[padding,box-shadow] duration-200 dark:bg-[var(--hub-bg)]/90 lg:z-[5] ${
          filtersCompact ? 'py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.12)] dark:shadow-black/30 sm:py-2.5' : 'py-3 sm:py-4'
        }`}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
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
          <p className="text-sm text-[var(--hub-sub)] sm:text-base">
            <span className="font-mono font-bold text-[var(--hub-tool)]">{filtered.length}</span>
            <span className="ml-1 break-words">tools in view · {categoryTitle}</span>
          </p>
        </div>
      </div>

      <LayoutGroup id="tools-grid">
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
          className="rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-4 py-12 text-center sm:px-8 sm:py-16"
        >
          <p className="text-sm text-[var(--hub-sub)] sm:text-base">No tools match your search or filters.</p>
          <p className="mt-2 text-xs text-[var(--hub-faint)] sm:text-sm">
            Try clearing filters or searching by name or category.
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
    </div>
  )
}
