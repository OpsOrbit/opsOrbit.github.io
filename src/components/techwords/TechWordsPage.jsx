import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import {
  TECH_WORD_CATEGORIES,
  TECH_WORDS,
  categoryLabelForTechWord,
} from '../../data/techWordsData'
import { filterTechWords } from '../../utils/techWordsFilter'
import { useTechWordRecent } from '../../hooks/useTechWordRecent'
import WorkspaceHero from '../workspace/WorkspaceHero'
import FilterChip from '../tools/FilterChip'
import { EssentialTermsStrip, FoundationConceptChain } from './TechWordsDiscoverSections'
import { useStickyCompact } from '../../hooks/useStickyCompact'

const CAT_ICONS = {
  all: '✦',
  networking: '🌐',
  cloud: '☁️',
  devops: '∞',
  kubernetes: '☸️',
  security: '🛡',
  cicd: '⚡',
  linux: '🐧',
  general: '📘',
}

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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-br from-white/95 via-indigo-50/30 to-violet-50/20 shadow-[0_8px_32px_-12px_rgba(79,70,229,0.15)] backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-200 dark:border-white/10 dark:from-[var(--hub-card)] dark:via-indigo-950/20 dark:to-violet-950/10 dark:shadow-black/30 ${
        open
          ? 'border-indigo-400/50 ring-2 ring-cyan-400/25'
          : 'border-[var(--hub-line)]/80 hover:border-indigo-400/40 hover:shadow-[0_12px_40px_-8px_rgba(99,102,241,0.2)]'
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
            <span className="rounded-md border border-indigo-200/60 bg-indigo-50/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-950/50 dark:text-cyan-200/90">
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
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 *   isFavorite: (id: string) => boolean
 *   toggleFavorite: (id: string) => void
 * }} props
 */
export default function TechWordsPage({
  query,
  activeCategoryId,
  onSelectCategory,
  isFavorite,
  toggleFavorite,
}) {
  const { recentIds, recordView } = useTechWordRecent()
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [explainBeginner, setExplainBeginner] = useState(false)
  const { sentinelRef, compact } = useStickyCompact()

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-w-0 max-w-full overflow-x-hidden pb-4"
    >
      <WorkspaceHero
        eyebrow="Technical dictionary"
        title="Tech words"
        description="Concise definitions, real examples, and bookmarking — use the search bar under the header to find terms. Toggle beginner explanations when available."
      >
        <label className="mt-5 flex max-w-xl cursor-pointer items-center gap-2 rounded-xl border border-indigo-200/40 bg-indigo-50/40 px-3 py-2 text-sm font-semibold text-[var(--hub-muted)] dark:border-indigo-500/20 dark:bg-indigo-950/30">
          <input
            type="checkbox"
            checked={explainBeginner}
            onChange={(e) => setExplainBeginner(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--hub-border2)] text-indigo-600 focus:ring-indigo-500"
          />
          <span>Explain like beginner (when available)</span>
        </label>
      </WorkspaceHero>

      <EssentialTermsStrip onPickTerm={scrollToTerm} />
      <FoundationConceptChain onPickTerm={scrollToTerm} />

      <div ref={sentinelRef} className="h-px w-full shrink-0 lg:hidden" aria-hidden />

      <div
        className={`sticky top-0 z-30 -mx-1 mb-5 rounded-2xl border border-white/10 bg-[var(--hub-bg)]/90 backdrop-blur-lg transition-[padding,box-shadow] duration-200 dark:border-white/5 dark:bg-[var(--hub-bg)]/88 sm:-mx-0 sm:mb-6 lg:hidden ${
          compact ? 'py-2 shadow-[0_12px_40px_-8px_rgba(79,70,229,0.18)] dark:shadow-black/40 sm:py-2.5' : 'space-y-3 py-3 sm:px-1 sm:py-4'
        }`}
      >
        <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Category</p>
        <div className="hub-inline-scroll scrollbar-hide flex gap-2 overflow-x-auto overflow-y-hidden pb-1">
          {TECH_WORD_CATEGORIES.map((c) => {
            const active = activeCategoryId === c.id || (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all'))
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

      <div className="lg:grid lg:grid-cols-[min(14rem,34%)_1fr] lg:items-start lg:gap-8">
        <aside className="mb-6 hidden lg:sticky lg:top-24 lg:mb-0 lg:block lg:self-start" aria-label="Filter by category">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Categories</p>
          <nav className="flex flex-col gap-1 rounded-2xl border border-white/20 bg-[var(--hub-surface)]/95 p-2 shadow-[0_8px_30px_-12px_rgba(79,70,229,0.15)] backdrop-blur-md dark:border-white/10 dark:bg-[var(--hub-elevated)]/80">
            {TECH_WORD_CATEGORIES.map((c) => {
              const active = activeCategoryId === c.id || (c.id === 'all' && (!activeCategoryId || activeCategoryId === 'all'))
              const icon = CAT_ICONS[c.id] || '◇'
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onSelectCategory(c.id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-cyan-400/30'
                      : 'text-[var(--hub-muted)] hover:bg-indigo-50/80 hover:text-[var(--hub-text)] dark:hover:bg-white/5'
                  }`}
                  aria-pressed={active}
                >
                  <span className="text-base" aria-hidden>
                    {icon}
                  </span>
                  {c.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          {recentTerms.length > 0 ? (
            <section className="mb-6 rounded-2xl border border-indigo-200/40 bg-gradient-to-r from-indigo-50/50 to-cyan-50/30 p-3 dark:border-indigo-500/20 dark:from-indigo-950/40 dark:to-cyan-950/20">
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
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-cyan-300 dark:to-indigo-300">
                {filtered.length}
              </span>
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
              className="rounded-2xl border border-dashed border-indigo-300/50 bg-gradient-to-br from-white/80 to-indigo-50/40 px-6 py-12 text-center text-sm text-[var(--hub-sub)] dark:border-indigo-500/30 dark:from-[var(--hub-card)]/80 dark:to-indigo-950/30"
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
    </motion.div>
  )
}
