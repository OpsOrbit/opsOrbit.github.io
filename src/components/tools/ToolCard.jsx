import { motion } from 'motion/react'
import { categoryLabel } from '../../data/toolsData'

const LICENSE_BADGE = {
  'Open Source': 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-200',
  Paid: 'bg-amber-500/15 text-amber-900 dark:text-amber-100',
  Hybrid: 'bg-violet-500/15 text-violet-900 dark:text-violet-100',
}

/** Curated “trending” tools for badge display */
const TRENDING_IDS = new Set([
  'kubernetes',
  'docker',
  'terraform',
  'github-actions',
  'prometheus',
  'grafana',
  'ansible',
  'vault',
])

const BEGINNER_CATEGORIES = new Set(['scm', 'cicd', 'containers', 'build'])

function buildBadges(tool) {
  /** @type {{ key: string, label: string }[]} */
  const out = []
  if (TRENDING_IDS.has(tool.id)) out.push({ key: 'trending', label: '🔥 Trending' })
  if (tool.popularity === 'popular') out.push({ key: 'popular', label: '⭐ Popular' })
  if (tool.license === 'Open Source' && BEGINNER_CATEGORIES.has(tool.categoryId)) {
    out.push({ key: 'beginner', label: '🧠 Beginner friendly' })
  }
  if (tool.popularity === 'enterprise') out.push({ key: 'enterprise', label: '🏢 Enterprise' })
  const seen = new Set()
  return out.filter((b) => {
    if (seen.has(b.key)) return false
    seen.add(b.key)
    return true
  }).slice(0, 3)
}

function usageTags(tool) {
  const cat = categoryLabel(tool.categoryId)
  const bits = [cat]
  if (tool.cloudNative) bits.push('Cloud-native')
  return bits.slice(0, 3).join(' · ')
}

/**
 * @param {{
 *   tool: object
 *   isFavorite: boolean
 *   onToggleFavorite: (e: import('react').MouseEvent) => void
 *   onOpen: () => void
 *   onCompare?: (tool: object) => void
 * }} props
 */
export default function ToolCard({ tool, isFavorite, onToggleFavorite, onOpen, onCompare }) {
  const licClass = LICENSE_BADGE[tool.license] || 'bg-[var(--hub-elevated)] text-[var(--hub-muted)]'
  const badges = buildBadges(tool)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      className="group relative flex min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-white/30 bg-gradient-to-br from-white/90 via-white/75 to-indigo-50/25 shadow-[0_4px_20px_-6px_rgba(79,70,229,0.12)] backdrop-blur-md dark:border-white/10 dark:from-[var(--hub-elevated)]/90 dark:via-[var(--hub-card)]/82 dark:to-indigo-950/20 dark:shadow-black/25"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-[0_0_40px_-4px_rgba(34,211,238,0.35)] transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col p-2.5 sm:p-3">
        <div className="mb-1.5 flex flex-wrap gap-1">
          {badges.map((b) => (
            <span
              key={b.key}
              className="rounded-md border border-indigo-200/60 bg-indigo-50/90 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-indigo-800 dark:border-cyan-500/20 dark:bg-cyan-950/40 dark:text-cyan-200"
            >
              {b.label}
            </span>
          ))}
        </div>

        <div className="mb-2 flex min-w-0 items-start gap-2.5">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/50 bg-gradient-to-br from-slate-50 to-indigo-50/80 text-lg shadow-inner dark:border-white/10 dark:from-slate-800 dark:to-indigo-950/50"
            aria-hidden
          >
            {tool.logo || '◆'}
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <button
              type="button"
              onClick={onOpen}
              className="w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
            >
              <h3 className="break-words text-[15px] font-bold leading-tight tracking-tight text-[var(--hub-text)]">
                {tool.name}
              </h3>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-cyan-300 dark:to-indigo-300">
                {categoryLabel(tool.categoryId)}
              </p>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mb-2 flex-1 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
        >
          <p className="line-clamp-2 break-words text-[13px] leading-relaxed text-[var(--hub-sub)]">{tool.description}</p>
        </button>

        <div className="mb-2 rounded-lg border border-emerald-500/15 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 px-2 py-1.5 dark:from-emerald-500/10 dark:to-cyan-500/5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-700/90 dark:text-emerald-300/90">
            Used for
          </p>
          <p className="mt-0.5 text-[11px] font-medium leading-snug text-[var(--hub-text)]">{usageTags(tool)}</p>
          <p className="mt-0.5 line-clamp-2 text-[10px] text-[var(--hub-muted)]">{tool.usedFor}</p>
        </div>

        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${licClass}`}>
            {tool.license}
          </span>
          {tool.cloudNative && (
            <span className="rounded-md bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-sky-800 dark:text-sky-200">
              Cloud native
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t border-white/30 pt-2 dark:border-white/10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(e)
            }}
            className={`inline-flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border text-sm transition-all sm:min-h-8 sm:min-w-8 ${
              isFavorite
                ? 'border-amber-400/60 bg-amber-400/15 text-amber-600 shadow-sm dark:text-amber-300'
                : 'border-[var(--hub-line)] text-[var(--hub-muted)] hover:border-indigo-400/50 hover:bg-indigo-50/50 hover:text-indigo-700 dark:hover:bg-white/5'
            }`}
            aria-label={isFavorite ? 'Remove bookmark' : 'Bookmark'}
            title={isFavorite ? 'Saved' : 'Bookmark'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-[34px] flex-1 items-center justify-center gap-1 rounded-lg border border-indigo-200/70 bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110 sm:min-h-8 dark:border-indigo-500/40"
          >
            <span aria-hidden>🔍</span> View details
          </button>
          {onCompare ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onCompare(tool)
              }}
              className="inline-flex min-h-[34px] min-w-[34px] items-center justify-center rounded-lg border border-[var(--hub-line)] text-sm text-[var(--hub-muted)] transition hover:border-violet-400/50 hover:bg-violet-50/50 hover:text-violet-700 dark:hover:bg-white/5 dark:hover:text-violet-300 sm:min-h-8 sm:min-w-8"
              title="Add to compare"
              aria-label="Compare"
            >
              ⚖️
            </button>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
