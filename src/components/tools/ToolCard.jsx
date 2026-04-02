import { motion } from 'motion/react'
import { categoryLabel } from '../../data/toolsData'

const LICENSE_BADGE = {
  'Open Source': 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  Paid: 'bg-amber-500/15 text-amber-900 dark:text-amber-100',
  Hybrid: 'bg-violet-500/15 text-violet-900 dark:text-violet-100',
}

/**
 * @param {{
 *   tool: object
 *   isFavorite: boolean
 *   onToggleFavorite: (e: import('react').MouseEvent) => void
 *   onOpen: () => void
 * }} props
 */
export default function ToolCard({ tool, isFavorite, onToggleFavorite, onOpen }) {
  const licClass = LICENSE_BADGE[tool.license] || 'bg-[var(--hub-elevated)] text-[var(--hub-muted)]'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] shadow-[var(--hub-shadow-card)] transition-shadow hover:shadow-[var(--hub-shadow-card-hover)] dark:bg-[var(--hub-elevated)]/40"
    >
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col rounded-xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
      >
        <div className="mb-3 flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-xl"
            aria-hidden
          >
            {tool.logo || '◆'}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[15px] font-bold text-[var(--hub-text)]">{tool.name}</h3>
              {tool.popularity === 'popular' && (
                <span className="shrink-0 text-[11px]" title="Popular">
                  🔥
                </span>
              )}
              {tool.popularity === 'enterprise' && (
                <span className="shrink-0 text-[11px]" title="Enterprise">
                  ⭐
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[11px] font-medium text-[var(--hub-brand)]">
              {categoryLabel(tool.categoryId)}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(e)
            }}
            className={`shrink-0 rounded-lg border border-[var(--hub-line)] p-1.5 text-[14px] transition-colors ${
              isFavorite
                ? 'border-amber-400/60 bg-amber-400/10 text-amber-600 dark:text-amber-300'
                : 'text-[var(--hub-muted)] opacity-0 group-hover:opacity-100 hover:border-[var(--hub-tool)] hover:text-[var(--hub-text)] md:opacity-100'
            }`}
            aria-label={isFavorite ? 'Remove bookmark' : 'Bookmark tool'}
            title={isFavorite ? 'Saved' : 'Save'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        <p className="mb-3 line-clamp-2 text-[13px] leading-snug text-[var(--hub-sub)]">{tool.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2">
          <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${licClass}`}>
            {tool.license}
          </span>
          {tool.cloudNative && (
            <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
              Cloud native
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-[11px] text-[var(--hub-faint)]">
          <span className="font-semibold text-[var(--hub-muted)]">Used for: </span>
          {tool.usedFor}
        </p>
      </button>
    </motion.article>
  )
}
