const chipBase =
  'inline-flex min-h-8 max-w-full shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-left text-[10px] font-bold uppercase leading-snug tracking-wide shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] active:scale-[0.98] sm:text-sm'
const chipIdle =
  'border-[var(--hub-border2)] bg-[var(--hub-surface)]/90 text-[var(--hub-tool)] backdrop-blur-sm hover:border-indigo-400/45 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-violet-50/40 dark:bg-[var(--hub-elevated)]/50 dark:hover:from-indigo-950/40 dark:hover:to-violet-950/20'
const chipActive =
  'border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-cyan-400/40 dark:from-indigo-500 dark:to-violet-600'

/**
 * Sticky LAB topic strip — same role as `CommandsToolChipBar` / Tools `DomainNavBar` (no sidebar).
 * @param {{
 *   guides: { id: string, title: string }[]
 *   activeId: string
 *   onSelectTopic: (id: string) => void
 *   isTopicLearned?: (id: string) => boolean
 * }} props
 */
export default function LabTopicChipBar({ guides, activeId, onSelectTopic, isTopicLearned }) {
  const firstId = guides[0]?.id
  const current = guides.find((g) => g.id === activeId) ?? guides[0]

  const pickTopic = (id) => {
    if (id === activeId) {
      if (firstId && id !== firstId) onSelectTopic(firstId)
      return
    }
    onSelectTopic(id)
  }

  if (guides.length === 0) {
    return (
      <div className="lab-topic-chip-bar mb-2 rounded-xl border border-indigo-200/40 bg-[var(--hub-surface)]/95 p-3 text-sm text-[var(--hub-sub)] shadow-[0_10px_24px_-12px_rgba(79,70,229,0.2)] ring-1 ring-indigo-500/15 dark:border-indigo-500/20 dark:bg-[var(--hub-elevated)]/88">
        No topics match your search. Try different keywords.
      </div>
    )
  }

  return (
    <div className="lab-topic-chip-bar mb-2 max-w-full overflow-hidden rounded-xl border border-indigo-200/40 bg-[var(--hub-surface)]/95 p-2 shadow-[0_8px_20px_-14px_rgba(79,70,229,0.2)] ring-1 ring-indigo-500/15 backdrop-blur-md dark:border-indigo-500/20 dark:bg-[var(--hub-elevated)]/88 dark:shadow-black/30 dark:ring-indigo-400/20 sm:p-2.5">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold sm:text-sm" aria-label="Lab location">
          <button
            type="button"
            onClick={() => firstId && onSelectTopic(firstId)}
            className="shrink-0 rounded-md px-1 py-0.5 text-[var(--hub-muted)] underline-offset-2 transition-colors hover:text-[var(--hub-text)] hover:underline"
          >
            Lab
          </button>
          {current ? (
            <>
              <span className="shrink-0 text-[var(--hub-muted)]" aria-hidden>
                ›
              </span>
              <span className="min-w-0 truncate text-[var(--hub-text)]">{current.title}</span>
            </>
          ) : null}
        </div>
        {activeId && firstId && activeId !== firstId ? (
          <button
            type="button"
            onClick={() => onSelectTopic(firstId)}
            className="shrink-0 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-bg)]/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)] transition-colors hover:border-indigo-400/50 hover:text-[var(--hub-text)] dark:bg-[var(--hub-bg)]/40"
            aria-label="Back to first topic"
          >
            ✕ Clear
          </button>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-wrap justify-start gap-1.5 sm:justify-center sm:gap-2">
        {guides.map((g) => {
          const active = g.id === activeId
          const learned = isTopicLearned?.(g.id)
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => pickTopic(g.id)}
              className={`${chipBase} ${active ? chipActive : chipIdle}`}
              aria-pressed={active}
            >
              {isTopicLearned ? (
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    learned ? 'bg-emerald-400 shadow-[0_0_0_2px_rgba(52,211,153,0.35)]' : 'bg-[var(--hub-line)]'
                  }`}
                  aria-hidden
                />
              ) : null}
              <span className="min-w-0 max-w-[14rem] truncate sm:max-w-[18rem]">{g.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
