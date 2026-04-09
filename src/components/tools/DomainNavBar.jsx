import { useMemo, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import { TOOL_CATEGORIES, DEVOPS_TOOLS, categoryLabel } from '../../data/toolsData'

function buildCounts() {
  const counts = { all: DEVOPS_TOOLS.length }
  for (const c of TOOL_CATEGORIES) {
    counts[c.id] = DEVOPS_TOOLS.filter((t) => t.categoryId === c.id).length
  }
  return counts
}

/** Collapsible groups in the mobile sheet; flat wrap on `lg+`. */
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

const DOMAIN_ICONS = {
  all: '✦',
  scm: '🔀',
  cicd: '⚡',
  build: '📦',
  artifacts: '📚',
  containers: '🐳',
  registries: '🗃️',
  orchestration: '☸️',
  iac: '🏗',
  configmgmt: '🔧',
  secrets: '🗝',
  monitoring: '📈',
  logging: '📜',
  security: '🛡',
  testing: '🧪',
  apim: '🌐',
  mesh: '🕸',
  cloud: '☁️',
  serverless: 'λ',
  cdn: '🌍',
  collab: '🤝',
}

const pillBase =
  'inline-flex min-h-11 max-w-full shrink-0 items-center gap-1.5 rounded-full border px-3 py-2 text-left text-xs font-bold uppercase leading-snug tracking-[0.05em] shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] active:scale-[0.98] sm:min-h-10 sm:py-1.5 sm:text-sm motion-safe:transition-transform'

const pillIdle =
  'border-[var(--hub-border2)] bg-[var(--hub-surface)]/90 text-[var(--hub-tool)] backdrop-blur-sm hover:border-indigo-400/45 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-violet-50/40 hover:shadow-md dark:bg-[var(--hub-elevated)]/50 dark:hover:from-indigo-950/40 dark:hover:to-violet-950/20'

const pillActive =
  'border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-cyan-400/35 dark:from-indigo-500 dark:to-violet-600 dark:shadow-indigo-900/40'

const categoryById = Object.fromEntries(TOOL_CATEGORIES.map((c) => [c.id, c]))

/**
 * Domain pills: bottom sheet on small screens, full nav card on `lg+`.
 */
export default function DomainNavBar({ activeCategoryId, onSelectCategory }) {
  const counts = useMemo(() => buildCounts(), [])
  const allActive = activeCategoryId === 'all' || !activeCategoryId
  const [sheetOpen, setSheetOpen] = useState(false)
  const dragControls = useDragControls()

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

  useEffect(() => {
    if (!sheetOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sheetOpen])

  const pickDomain = useCallback(
    (id) => {
      onSelectCategory(id)
      setSheetOpen(false)
    },
    [onSelectCategory]
  )

  const categoryTitle =
    activeCategoryId === 'all' || !activeCategoryId ? 'All domains' : categoryLabel(activeCategoryId)

  const Pill = ({ id, label, count, onPick }) => {
    const active = id === 'all' ? allActive : activeCategoryId === id
    const go = onPick ?? onSelectCategory
    const icon = DOMAIN_ICONS[id] || '◇'
    return (
      <button
        type="button"
        onClick={() => go(id)}
        className={`${pillBase} ${active ? pillActive : pillIdle}`}
        aria-pressed={active}
      >
        <span className="text-sm leading-none opacity-90" aria-hidden>
          {icon}
        </span>
        <span className="whitespace-nowrap">{label}</span>
        <span
          className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] font-bold sm:text-[11px] ${
            active ? 'bg-white/25 text-white' : 'bg-[var(--hub-border2)] text-[var(--hub-muted)]'
          }`}
        >
          {count}
        </span>
      </button>
    )
  }

  const sheet =
    typeof document !== 'undefined'
      ? createPortal(
          <AnimatePresence>
            {sheetOpen ? (
              <motion.div
                key="domain-sheet-root"
                className="fixed inset-0 z-[120] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  type="button"
                  aria-label="Close domain picker"
                  className="absolute inset-0 bg-[var(--hub-text)]/45 backdrop-blur-sm dark:bg-black/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSheetOpen(false)}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="domain-sheet-title"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                  className="absolute bottom-0 left-0 right-0 flex max-h-[min(88dvh,920px)] flex-col overflow-hidden rounded-t-2xl border-x border-t border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-[0_-8px_40px_-4px_rgba(0,0,0,0.2)] dark:bg-[var(--hub-elevated)]"
                  style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
                  drag="y"
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ top: 0, bottom: 280 }}
                  dragElastic={{ top: 0, bottom: 0.35 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 64 || info.velocity.y > 400) setSheetOpen(false)
                  }}
                >
                  <div
                    className="flex shrink-0 touch-none flex-col items-center gap-2 border-b border-[var(--hub-line)] px-4 pb-3 pt-3"
                    onPointerDown={(e) => dragControls.start(e)}
                  >
                    <div
                      className="h-1.5 w-12 cursor-grab rounded-full bg-[var(--hub-border2)] active:cursor-grabbing"
                      aria-hidden
                    />
                    <div className="flex w-full min-w-0 items-center justify-between gap-3">
                      <h2 id="domain-sheet-title" className="text-sm font-extrabold text-[var(--hub-text)]">
                        Browse domains
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSheetOpen(false)}
                        className="flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--hub-border2)] text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]"
                        aria-label="Close"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 [-webkit-overflow-scrolling:touch]">
                    <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">
                      Pick a domain to filter tools
                    </p>
                    <div className="mb-4 flex flex-wrap justify-center gap-2">
                      <Pill id="all" label="All" count={counts.all} onPick={pickDomain} />
                    </div>
                    <div className="space-y-2">
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
                              aria-controls={`domain-sheet-section-${section.id}`}
                              id={`domain-sheet-trigger-${section.id}`}
                            >
                              <span>{section.title}</span>
                              <span className="text-[var(--hub-muted)]" aria-hidden>
                                {expanded ? '▾' : '▸'}
                              </span>
                            </button>
                            {expanded ? (
                              <div
                                id={`domain-sheet-section-${section.id}`}
                                role="group"
                                aria-labelledby={`domain-sheet-trigger-${section.id}`}
                                className="flex flex-wrap gap-2 border-t border-[var(--hub-line)]/60 px-3 pb-3 pt-2"
                              >
                                {section.categoryIds.map((cid) => {
                                  const c = categoryById[cid]
                                  if (!c) return null
                                  return (
                                    <Pill
                                      key={cid}
                                      id={c.id}
                                      label={c.shortLabel || c.label}
                                      count={counts[c.id] ?? 0}
                                      onPick={pickDomain}
                                    />
                                  )
                                })}
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null

  return (
    <>
      {sheet}

      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex w-full min-h-[3rem] items-center justify-between gap-3 rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] px-4 py-3 text-left shadow-[var(--hub-shadow-card)] transition-colors hover:border-[var(--hub-tool)]/40 dark:bg-[var(--hub-elevated)]/40"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">Browse by domain</p>
            <p className="mt-0.5 truncate text-sm font-bold text-[var(--hub-text)]">{categoryTitle}</p>
          </div>
          <span className="shrink-0 text-lg leading-none text-[var(--hub-muted)]" aria-hidden>
            ▾
          </span>
        </button>
      </div>

      <nav
        className="mb-4 hidden overflow-hidden rounded-2xl border border-white/25 bg-[var(--hub-surface)]/95 p-3 shadow-[0_12px_40px_-12px_rgba(79,70,229,0.18)] ring-1 ring-indigo-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-[var(--hub-elevated)]/85 dark:shadow-black/40 dark:ring-indigo-400/15 sm:mb-6 sm:p-4 lg:mb-6 lg:block lg:p-6"
        aria-label="Browse tools by domain"
      >
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)] sm:mb-3">
          Browse by domain
        </p>
        <div className="mb-3 flex flex-wrap justify-center gap-2 sm:gap-2.5">
          <Pill id="all" label="All" count={counts.all} />
        </div>
        <div className="flex min-w-0 flex-wrap justify-center gap-2 sm:gap-2.5">
          {TOOL_CATEGORIES.map((c) => (
            <Pill key={c.id} id={c.id} label={c.shortLabel || c.label} count={counts[c.id] ?? 0} />
          ))}
        </div>
      </nav>
    </>
  )
}
