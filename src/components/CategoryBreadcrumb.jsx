export default function CategoryBreadcrumb({
  toolLabel,
  browseKey,
  toolFilter,
  onBackToCategories,
  onBackToAllTools,
  query,
}) {
  if (!browseKey) return null

  const showAllToolsBack = toolFilter !== 'all'

  return (
    <nav className="mb-8 flex flex-col gap-3 text-sm" aria-label="Category path">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBackToCategories}
          className="min-h-[48px] rounded-lg border border-hub-line bg-hub-bg px-4 py-2.5 font-medium leading-snug text-hub-text transition-all duration-200 hover:border-hub-primary/40 hover:bg-hub-elevated active:scale-[0.99] active:bg-hub-elevated/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-bg dark:bg-hub-elevated/60"
        >
          ← Back to {toolLabel(browseKey.tool)} modules
        </button>
        {showAllToolsBack && (
          <button
            type="button"
            onClick={onBackToAllTools}
            className="min-h-[48px] rounded-lg border border-hub-line bg-hub-surface px-4 py-2.5 font-medium leading-snug text-hub-sub transition-all duration-200 hover:border-hub-primary/40 hover:bg-hub-elevated hover:text-hub-text active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-bg dark:bg-hub-elevated/40"
          >
            ← All tools
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex min-h-[48px] items-center rounded-lg bg-hub-primary/10 px-4 py-2.5 text-sm font-medium leading-snug text-hub-primary dark:bg-hub-primary/20 dark:text-emerald-200/90">
          {toolLabel(browseKey.tool)}
          <span className="mx-1.5 text-hub-muted">·</span>
          {browseKey.category}
        </span>
        {query.trim() && (
          <span className="w-full text-sm leading-relaxed text-hub-muted sm:w-auto sm:pl-2">Search active — showing matches in this category.</span>
        )}
      </div>
    </nav>
  )
}
