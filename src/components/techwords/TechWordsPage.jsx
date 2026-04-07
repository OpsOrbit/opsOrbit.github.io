import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import {
  TECH_WORD_CATEGORIES,
  TECH_WORDS,
  categoryLabelForTechWord,
} from '../../data/techWordsData'
import { filterTechWords } from '../../utils/techWordsFilter'
import { useTechWordRecent } from '../../hooks/useTechWordRecent'

const pillBase =
  'shrink-0 rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] sm:text-sm'

function TechWordCard({
  term,
  expanded,
  onToggleExpand,
  isFavorite,
  onToggleFavorite,
  explainBeginner,
  onRecordView,
}) {
  const open = expanded
  const cardRef = useRef(null)

  useEffect(() => {
    if (open) onRecordView?.(term.id)
  }, [open, term.id, onRecordView])

  const copySnippet = useCallback(() => {
    if (!term.snippet) return
    navigator.clipboard.writeText(term.snippet).catch(() => {})
  }, [term.snippet])

  return (
    <motion.article
      ref={cardRef}
      id={`techword-${term.id}`}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22 }}
      className={`group flex flex-col overflow-hidden rounded-2xl border bg-[var(--hub-card)] shadow-[var(--hub-shadow-card)] transition-[border-color,box-shadow] duration-200 dark:bg-[var(--hub-elevated)]/40 ${
        open
          ? 'border-[var(--hub-tool)] ring-1 ring-[var(--hub-tool)]/25'
          : 'border-[var(--hub-line)] hover:border-[var(--hub-tool)]/45 hover:shadow-[var(--hub-shadow-card-hover)]'
      }`}
    >
      <div className="flex min-w-0 items-start gap-3 p-4 sm:p-5">
        <button
          type="button"
          onClick={() => onToggleExpand(term.id)}
          className="min-w-0 flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)]"
          aria-expanded={open}
        >
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-extrabold text-[var(--hub-text)] sm:text-xl">{term.term}</h3>
            <span className="rounded-md border border-[var(--hub-border2)] bg-[var(--hub-tool-dim2)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">
              {categoryLabelForTechWord(term.categoryId)}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--hub-sub)]">{term.shortDefinition}</p>
          <span className="mt-2 inline-flex text-[11px] font-bold text-[var(--hub-brand)]">
            {open ? 'Show less ▴' : 'Details ▾'}
          </span>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite(term.id)
          }}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-lg transition-colors ${
            isFavorite
              ? 'border-amber-400/50 bg-amber-400/10 text-amber-600 dark:text-amber-300'
              : 'border-[var(--hub-border2)] text-[var(--hub-muted)] hover:border-[var(--hub-tool)] hover:text-[var(--hub-text)]'
          }`}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove bookmark' : 'Bookmark term'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-[var(--hub-line)]/80"
          >
            <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
              {explainBeginner && term.beginnerExplanation ? (
                <section>
                  <h4 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-brand)]">
                    Explain like beginner
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--hub-text)]">{term.beginnerExplanation}</p>
                </section>
              ) : null}
              <section>
                <h4 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
                  Why we use it
                </h4>
                <p className="text-sm leading-relaxed text-[var(--hub-text)]">{term.whyWeUseIt}</p>
              </section>
              <section>
                <h4 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
                  Where it is used
                </h4>
                <p className="text-sm leading-relaxed text-[var(--hub-sub)]">{term.whereUsed}</p>
              </section>
              <section>
                <h4 className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
                  Example
                </h4>
                <p className="text-sm leading-relaxed text-[var(--hub-text)]">{term.example}</p>
              </section>
              {term.snippet ? (
                <div className="rounded-xl border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-code-text)]">
                      Snippet
                    </span>
                    <button
                      type="button"
                      onClick={copySnippet}
                      className="rounded-md border border-[var(--hub-tool)]/40 bg-[var(--hub-surface)] px-2 py-1 text-[10px] font-bold uppercase text-[var(--hub-tool)] hover:bg-[var(--hub-tool-dim)]"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="overflow-x-auto font-mono text-[12px] leading-relaxed text-[var(--hub-code-text)]">
                    {term.snippet}
                  </pre>
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  )
}

/**
 * @param {{
 *   query: string
 *   onQueryChange: (q: string) => void
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 *   isFavorite: (id: string) => boolean
 *   toggleFavorite: (id: string) => void
 * }} props
 */
export default function TechWordsPage({
  query,
  onQueryChange,
  activeCategoryId,
  onSelectCategory,
  isFavorite,
  toggleFavorite,
}) {
  const { recentIds, recordView } = useTechWordRecent()
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [explainBeginner, setExplainBeginner] = useState(false)

  const filtered = useMemo(
    () => filterTechWords(query, activeCategoryId),
    [query, activeCategoryId]
  )

  const recentTerms = useMemo(() => {
    const byId = Object.fromEntries(TECH_WORDS.map((t) => [t.id, t]))
    return recentIds.map((id) => byId[id]).filter(Boolean)
  }, [recentIds])

  const toggleExpand = useCallback((id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const scrollToTerm = useCallback((id) => {
    setExpandedIds((prev) => new Set(prev).add(id))
    requestAnimationFrame(() => {
      document.getElementById(`techword-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  return (
    <div className="min-w-0 max-w-full overflow-x-hidden pb-4">
      <div className="sticky top-0 z-30 -mx-1 mb-5 space-y-3 border-b border-[var(--hub-line)] bg-[var(--hub-bg)]/95 py-3 backdrop-blur-md dark:bg-[var(--hub-bg)]/92 sm:-mx-0 sm:mb-6 sm:border-0 sm:bg-transparent sm:py-0 sm:backdrop-blur-none dark:sm:bg-transparent">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--hub-muted)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.3}
            aria-hidden
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            enterKeyHint="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search terms, examples, categories…"
            className="h-12 w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)] py-2 pl-9 pr-3 text-sm text-[var(--hub-text)] shadow-sm outline-none transition-[border-color,box-shadow] focus:border-[var(--hub-tool)] focus:shadow-[0_0_0_3px_var(--hub-tool-dim)] dark:bg-[var(--hub-elevated)]"
            aria-label="Search tech dictionary"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--hub-muted)]">
          <input
            type="checkbox"
            checked={explainBeginner}
            onChange={(e) => setExplainBeginner(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--hub-border2)] text-[var(--hub-tool)] focus:ring-[var(--hub-tool)]"
          />
          <span>Explain like beginner (when available)</span>
        </label>

        <div className="lg:hidden">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Category</p>
          <div className="hub-inline-scroll scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            {TECH_WORD_CATEGORIES.map((c) => {
              const active = activeCategoryId === c.id || (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all'))
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCategory(c.id)}
                  className={`${pillBase} ${
                    active
                      ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                      : 'border-[var(--hub-line)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-border2)]'
                  }`}
                  aria-pressed={active}
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[min(13rem,32%)_1fr] lg:items-start lg:gap-8">
        <aside className="mb-6 hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:self-start" aria-label="Filter by category">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Categories</p>
          <nav className="flex flex-col gap-1 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-2 dark:bg-[var(--hub-elevated)]/40">
            {TECH_WORD_CATEGORIES.map((c) => {
              const active = activeCategoryId === c.id || (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all'))
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCategory(c.id)}
                  className={`rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                    active
                      ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                      : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                  }`}
                  aria-pressed={active}
                >
                  {c.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          {recentTerms.length > 0 ? (
            <section className="mb-6 rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-surface)]/60 p-3 dark:bg-[var(--hub-elevated)]/20">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                Recently viewed
              </p>
              <div className="flex flex-wrap gap-2">
                {recentTerms.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => scrollToTerm(t.id)}
                    className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-bg)] px-2.5 py-1.5 text-left text-xs font-semibold text-[var(--hub-text)] transition-colors hover:border-[var(--hub-tool)]"
                  >
                    {t.term}
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-[var(--hub-sub)]">
              <span className="font-mono font-bold text-[var(--hub-tool)]">{filtered.length}</span>
              <span className="ml-1">terms</span>
              {activeCategoryId && activeCategoryId !== 'all' ? (
                <span className="text-[var(--hub-muted)]"> · {categoryLabelForTechWord(activeCategoryId)}</span>
              ) : null}
            </p>
          </div>

          {filtered.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-6 py-12 text-center text-sm text-[var(--hub-sub)]"
            >
              No terms match your search or category. Try clearing filters or different keywords.
            </motion.p>
          ) : (
            <LayoutGroup id="techwords-grid">
              <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filtered.map((t) => (
                    <TechWordCard
                      key={t.id}
                      term={t}
                      expanded={expandedIds.has(t.id)}
                      onToggleExpand={toggleExpand}
                      isFavorite={isFavorite(t.id)}
                      onToggleFavorite={toggleFavorite}
                      explainBeginner={explainBeginner}
                      onRecordView={recordView}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}
        </div>
      </div>
    </div>
  )
}
