import { useMemo, useState, useEffect } from 'react'
import { TOOL_CATEGORIES, DEVOPS_TOOLS } from '../../data/toolsData'

function buildCounts() {
  const counts = { all: DEVOPS_TOOLS.length }
  for (const c of TOOL_CATEGORIES) {
    counts[c.id] = DEVOPS_TOOLS.filter((t) => t.categoryId === c.id).length
  }
  return counts
}

/** Collapsible groups on small screens; flat wrap on `lg+`. */
const DOMAIN_SECTIONS = [
  { id: 'delivery', title: 'Delivery & build', categoryIds: ['scm', 'cicd', 'build', 'artifacts'] },
  { id: 'platform', title: 'Containers & orchestration', categoryIds: ['containers', 'registries', 'orchestration'] },
  {
    id: 'foundation',
    title: 'Infra, security & ops',
    categoryIds: ['iac', 'configmgmt', 'secrets', 'monitoring', 'logging', 'security', 'testing'],
  },
  { id: 'edge', title: 'Cloud, APIs & collaboration', categoryIds: ['apim', 'mesh', 'cloud', 'serverless', 'cdn', 'collab'] },
]

const pillBase =
  'inline-flex min-h-11 max-w-full shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-left text-xs font-bold uppercase leading-snug tracking-[0.05em] shadow-sm transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] active:scale-[0.98] sm:min-h-10 sm:py-1.5 sm:text-sm'

const pillIdle =
  'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-tool)] hover:border-[var(--hub-tool)]/55 hover:bg-[var(--hub-tool-dim)] dark:bg-[var(--hub-elevated)]/50'

const pillActive =
  'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-md ring-1 ring-[var(--hub-tool)]/35 dark:ring-[var(--hub-tool)]/25'

const categoryById = Object.fromEntries(TOOL_CATEGORIES.map((c) => [c.id, c]))

/**
 * Domain pills: accordion sections on mobile, flat grid on large screens.
 */
export default function DomainNavBar({ activeCategoryId, onSelectCategory }) {
  const counts = useMemo(() => buildCounts(), [])
  const allActive = activeCategoryId === 'all' || !activeCategoryId

  const [openSection, setOpenSection] = useState(() => {
    if (allActive) return 'delivery'
    const sid = DOMAIN_SECTIONS.find((s) => s.categoryIds.includes(activeCategoryId))?.id
    return sid ?? 'delivery'
  })

  useEffect(() => {
    if (activeCategoryId === 'all' || !activeCategoryId) return
    const sid = DOMAIN_SECTIONS.find((s) => s.categoryIds.includes(activeCategoryId))?.id
    if (sid) setOpenSection(sid)
  }, [activeCategoryId])

  const Pill = ({ id, label, count }) => {
    const active = id === 'all' ? allActive : activeCategoryId === id
    return (
      <button
        type="button"
        onClick={() => onSelectCategory(id)}
        className={`${pillBase} ${active ? pillActive : pillIdle}`}
        aria-pressed={active}
      >
        <span className="whitespace-nowrap">{label}</span>
        <span
          className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold sm:text-[11px] ${
            active ? 'bg-[var(--hub-tool)] text-white' : 'bg-[var(--hub-border2)] text-[var(--hub-muted)]'
          }`}
        >
          {count}
        </span>
      </button>
    )
  }

  return (
    <nav
      className="mb-4 overflow-hidden rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-3 shadow-[var(--hub-shadow-card)] dark:bg-[var(--hub-elevated)]/40 sm:mb-6 sm:p-4 lg:p-6"
      aria-label="Browse tools by domain"
    >
      <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)] sm:mb-3">
        Browse by domain
      </p>

      <div className="mb-3 flex flex-wrap justify-center gap-2 sm:gap-2.5">
        <Pill id="all" label="All" count={counts.all} />
      </div>

      <div className="space-y-2 lg:hidden">
        {DOMAIN_SECTIONS.map((section) => {
          const expanded = openSection === section.id
          return (
            <div
              key={section.id}
              className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-bg)]/40 dark:bg-[var(--hub-bg)]/25"
            >
              <button
                type="button"
                onClick={() => setOpenSection((s) => (s === section.id ? '' : section.id))}
                className="flex min-h-12 w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-[12px] font-bold text-[var(--hub-text)] transition-colors hover:bg-[var(--hub-tool-dim2)]"
                aria-expanded={expanded}
                aria-controls={`domain-section-${section.id}`}
                id={`domain-section-trigger-${section.id}`}
              >
                <span>{section.title}</span>
                <span className="text-[var(--hub-muted)]" aria-hidden>
                  {expanded ? '▾' : '▸'}
                </span>
              </button>
              {expanded ? (
                <div
                  id={`domain-section-${section.id}`}
                  role="group"
                  aria-labelledby={`domain-section-trigger-${section.id}`}
                  className="flex flex-wrap gap-2 border-t border-[var(--hub-line)]/60 px-3 pb-3 pt-2"
                >
                  {section.categoryIds.map((cid) => {
                    const c = categoryById[cid]
                    if (!c) return null
                    return (
                      <Pill key={cid} id={c.id} label={c.shortLabel || c.label} count={counts[c.id] ?? 0} />
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="hidden min-w-0 flex-wrap justify-center gap-2 sm:gap-2.5 lg:flex">
        {TOOL_CATEGORIES.map((c) => (
          <Pill key={c.id} id={c.id} label={c.shortLabel || c.label} count={counts[c.id] ?? 0} />
        ))}
      </div>
    </nav>
  )
}
