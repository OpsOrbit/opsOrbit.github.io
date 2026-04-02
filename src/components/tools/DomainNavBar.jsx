import { useMemo } from 'react'
import { motion } from 'motion/react'
import { TOOL_CATEGORIES, DEVOPS_TOOLS } from '../../data/toolsData'
import { CATEGORY_PILL_NAV_CLASS } from '../categoryPillStyles'

function buildCounts() {
  const counts = { all: DEVOPS_TOOLS.length }
  for (const c of TOOL_CATEGORIES) {
    counts[c.id] = DEVOPS_TOOLS.filter((t) => t.categoryId === c.id).length
  }
  return counts
}

const pillBase =
  'inline-flex max-w-full min-h-[36px] shrink-0 touch-manipulation items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-left text-[9px] font-bold uppercase leading-snug tracking-[0.05em] shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] sm:min-h-[40px] sm:px-3 sm:text-[10px] active:scale-[0.98]'

const pillIdle =
  'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-tool)] hover:border-[var(--hub-tool)]/55 hover:bg-[var(--hub-tool-dim)] dark:bg-[var(--hub-elevated)]/50'

const pillActive =
  'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-md ring-1 ring-[var(--hub-tool)]/35 dark:ring-[var(--hub-tool)]/25'

/**
 * Centered domain picker — same pill vocabulary as CategoryHub / command browse.
 */
export default function DomainNavBar({ activeCategoryId, onSelectCategory }) {
  const counts = useMemo(() => buildCounts(), [])
  const allActive = activeCategoryId === 'all' || !activeCategoryId

  const Pill = ({ id, label, count }) => {
    const active = id === 'all' ? allActive : activeCategoryId === id
    return (
      <motion.button
        layout
        type="button"
        onClick={() => onSelectCategory(id)}
        className={`${pillBase} ${active ? pillActive : pillIdle}`}
        aria-pressed={active}
      >
        <span className="truncate">{label}</span>
        <span
          className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold sm:text-[10px] ${
            active ? 'bg-[var(--hub-tool)] text-white' : 'bg-[var(--hub-border2)] text-[var(--hub-muted)]'
          }`}
        >
          {count}
        </span>
      </motion.button>
    )
  }

  return (
    <nav
      className="mb-6 rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-4 shadow-[var(--hub-shadow-card)] dark:bg-[var(--hub-elevated)]/40"
      aria-label="Browse tools by domain"
    >
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">
        Browse by domain
      </p>
      <div
        className={`${CATEGORY_PILL_NAV_CLASS} justify-center`}
        style={{ scrollbarGutter: 'stable' }}
      >
        <Pill id="all" label="All" count={counts.all} />
        {TOOL_CATEGORIES.map((c) => (
          <Pill key={c.id} id={c.id} label={c.shortLabel || c.label} count={counts[c.id] ?? 0} />
        ))}
      </div>
    </nav>
  )
}
