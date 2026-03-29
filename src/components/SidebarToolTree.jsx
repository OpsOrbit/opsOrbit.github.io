import { useMemo, useState, useEffect } from 'react'
import { orderedCategorySummaries, compareCategories } from '../data/categoryOrder'
import { CATEGORY_PILL_BUTTON_CLASS, CATEGORY_PILL_NAV_CLASS } from './categoryPillStyles'
import DockMagnify from './DockMagnify'
import { getToolExplanation } from '../data/toolExplanations'
import { getToolInstall } from '../data/toolInstallInfo'

const ALL_KEY = '__all__'
const OTHER_KEY = '__other__'
const ABOUT_KEY = '__about__'
const INSTALL_KEY = '__install__'
const INSTALL_TABS = [
  { id: 'ubuntu', label: 'Ubuntu' },
  { id: 'linux', label: 'Linux' },
  { id: 'windows', label: 'Windows' },
]

function categoryPillClass(active) {
  if (!active) return CATEGORY_PILL_BUTTON_CLASS
  // Base pill class includes text-[var(--hub-tool)]; without !, that can win over text-white and hide
  // label + count on the default-selected first pill (green-on-green).
  return `${CATEGORY_PILL_BUTTON_CLASS} !border-transparent !bg-[var(--hub-primary)] !text-white shadow-md hover:!border-transparent hover:!bg-[var(--hub-primary-hover)] hover:!text-white dark:!text-[#0d1117] dark:hover:!text-[#0d1117]`
}

const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2 }

function sortInCategory(a, b) {
  const d = (LEVEL_RANK[a.level] ?? 9) - (LEVEL_RANK[b.level] ?? 9)
  if (d !== 0) return d
  return String(a.name).localeCompare(String(b.name))
}

/** Main column: compact card for grid (command strip + description). */
function MainCommandCard({ cmd, onPick, levelLabel }) {
  const desc = cmd.description || ''
  return (
    <button
      type="button"
      onClick={() => onPick(cmd)}
      title={cmd.name}
      className="flex h-full min-h-[7.5rem] flex-col overflow-hidden rounded-lg border border-[var(--hub-line)] bg-[var(--hub-card)] text-left shadow-[var(--hub-shadow-card)] transition-all duration-150 hover:border-[var(--hub-tool)]/40 hover:shadow-[var(--hub-shadow-card-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
    >
      <div className="border-b border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] px-2.5 py-2.5">
        <span className="mb-1 block text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--hub-faint)]">Command</span>
        <code className="block break-words font-mono text-[12px] font-semibold leading-snug text-[var(--hub-code-text)] sm:text-[13px]">
          {cmd.command}
        </code>
      </div>
      <div className="flex flex-1 flex-col bg-[var(--hub-surface)] px-2.5 py-2.5">
        <p className="flex-1 text-[11px] leading-relaxed text-[var(--hub-sub)] sm:text-[12px]">{desc || '—'}</p>
        <span className="mt-2 inline-flex w-fit rounded-md border border-[var(--hub-border2)] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
          {levelLabel(cmd.level)}
        </span>
      </div>
    </button>
  )
}

/** In-card section title above the command grid (single-tool view). */
function CategoryBlockTitle({ category, count, id: headingId }) {
  return (
    <h3
      id={headingId}
      className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--hub-sub)] sm:text-xs"
    >
      {category}{' '}
      <span className="font-mono tabular-nums text-[var(--hub-muted)]">{count}</span>
    </h3>
  )
}

function CommandRow({ cmd, onPick, levelLabel }) {
  return (
    <button
      type="button"
      onClick={() => onPick(cmd)}
      className="w-full rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-[var(--hub-tool-dim)] focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--hub-tool)] sm:py-2"
    >
      <span className="block truncate text-[11px] font-medium leading-snug text-[var(--hub-text)]">{cmd.name}</span>
      <code className="mt-0.5 block truncate font-mono text-[9px] leading-tight text-[var(--hub-muted)]">{cmd.command}</code>
      <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wide text-[var(--hub-faint)]">{levelLabel(cmd.level)}</span>
    </button>
  )
}

/**
 * When a single tool is selected: categories + commands.
 * `variant="main"` — category pills; picking a pill shows that category’s commands inline below (no scroll jump).
 * `variant="sidebar"` — compact accordion list.
 */
export default function SidebarToolTree({
  tool,
  commands,
  onSelectCommand,
  onNavigate,
  levelLabel,
  variant = 'sidebar',
  className = '',
  preferredCategory = null,
}) {
  const explanation = getToolExplanation(tool)
  const installInfo = getToolInstall(tool)
  const [installTab, setInstallTab] = useState('ubuntu')

  const { sections, uncategorized } = useMemo(() => {
    if (!tool || tool === 'all') return { sections: [], uncategorized: [] }
    const forTool = commands.filter((c) => c.tool === tool)
    const summaries = orderedCategorySummaries(forTool).filter((r) => r.tool === tool)
    summaries.sort((a, b) => compareCategories(tool, a.category, b.category))
    const sections = summaries.map((s) => ({
      category: s.category,
      count: s.count,
      items: forTool.filter((c) => c.category === s.category).sort(sortInCategory),
    }))
    const uncategorized = forTool.filter((c) => !c.category).sort(sortInCategory)
    return { sections, uncategorized }
  }, [commands, tool])

  const sectionKeys = useMemo(() => {
    const keys = [ALL_KEY, ...sections.map((s) => s.category)]
    if (uncategorized.length > 0) keys.push(OTHER_KEY)
    if (explanation) keys.push(ABOUT_KEY)
    if (installInfo) keys.push(INSTALL_KEY)
    return keys
  }, [sections, uncategorized.length, explanation, installInfo])

  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    setActiveCategory((prev) => {
      if (sectionKeys.length === 0) return null
      if (prev != null && sectionKeys.includes(prev)) return prev
      return sectionKeys[0]
    })
  }, [sectionKeys])

  useEffect(() => {
    if (!preferredCategory) return
    if (sectionKeys.includes(preferredCategory)) {
      setActiveCategory(preferredCategory)
    }
  }, [preferredCategory, sectionKeys])

  const pick = (cmd) => {
    onSelectCommand(cmd)
    onNavigate?.()
  }

  const activeSection = useMemo(() => {
    if (activeCategory == null) return null
    if (activeCategory === ABOUT_KEY) {
      return { kind: 'about', category: 'About', count: 0 }
    }
    if (activeCategory === INSTALL_KEY) {
      return { kind: 'install', category: 'Install', count: 0 }
    }
    if (activeCategory === ALL_KEY) {
      const items = [...sections.flatMap((s) => s.items), ...uncategorized].sort(sortInCategory)
      return {
        kind: 'commands',
        category: 'All',
        count: items.length,
        items,
      }
    }
    if (activeCategory === OTHER_KEY) {
      return uncategorized.length > 0
        ? { kind: 'commands', category: 'Other', count: uncategorized.length, items: uncategorized }
        : null
    }
    const section = sections.find((s) => s.category === activeCategory)
    return section ? { ...section, kind: 'commands' } : null
  }, [activeCategory, sections, uncategorized])

  const totalToolCount = useMemo(
    () => commands.filter((c) => c.tool === tool).length,
    [commands, tool]
  )


  if (!tool || tool === 'all') return null

  const isMain = variant === 'main'

  const shell =
    isMain
      ? `rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] shadow-[var(--hub-shadow-card)] ${className}`
      : `mt-1 border-t border-[var(--hub-line)] pt-2 ${className}`

  const headingCls = isMain
    ? 'px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)] sm:px-4 sm:pt-4'
    : 'sidebar-label px-3.5 pb-1.5 pt-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)]'

  const catTitle = 'text-[11px]'
  const listBg = 'bg-[var(--hub-sidebar)] dark:bg-[var(--hub-bg)]/30'

  if (sections.length === 0 && uncategorized.length === 0) {
    return (
      <div className={shell}>
        <p
          className={`text-[10px] leading-snug text-[var(--hub-muted)] ${isMain ? 'px-3 py-4 sm:px-4' : 'px-3.5 pb-2'}`}
        >
          No commands for current search / level.
        </p>
      </div>
    )
  }

  return (
    <div className={shell}>
      <p className={headingCls}>Categories &amp; commands</p>
      {isMain ? (
        <>
          <div className="border-t border-hub-line/60 bg-hub-bg/40 px-3 py-3 dark:border-hub-line/60 dark:bg-hub-bg/20 sm:px-4 sm:py-3.5">
            <DockMagnify
              as="nav"
              className={CATEGORY_PILL_NAV_CLASS}
              itemClipClassName="inline-flex max-w-full shrink-0 overflow-hidden rounded-full"
              itemWrapperClassName="inline-flex max-w-full shrink-0 origin-center"
              aria-label="Select a category"
            >
              <button
                type="button"
                aria-pressed={activeCategory === ALL_KEY}
                className={categoryPillClass(activeCategory === ALL_KEY)}
                title={`All — ${totalToolCount} commands`}
                onClick={() => setActiveCategory(ALL_KEY)}
              >
                <span className="whitespace-nowrap">All</span>
                <span
                  className={`ml-1 shrink-0 font-mono text-[0.95em] font-bold tabular-nums ${
                    activeCategory === ALL_KEY ? 'opacity-95' : 'opacity-90'
                  }`}
                >
                  ({totalToolCount})
                </span>
              </button>
              {sections.map(({ category, count }) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  className={categoryPillClass(activeCategory === category)}
                  title={`${category} — ${count} commands`}
                  onClick={() => setActiveCategory(category)}
                >
                  <span className="whitespace-nowrap">{category}</span>
                  <span
                    className={`ml-1 shrink-0 font-mono text-[0.95em] font-bold tabular-nums ${
                      activeCategory === category ? 'opacity-95' : 'opacity-90'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              ))}
              {uncategorized.length > 0 && (
                <button
                  type="button"
                  aria-pressed={activeCategory === OTHER_KEY}
                  className={categoryPillClass(activeCategory === OTHER_KEY)}
                  title={`Other — ${uncategorized.length} commands`}
                  onClick={() => setActiveCategory(OTHER_KEY)}
                >
                  <span className="whitespace-nowrap">Other</span>
                  <span
                    className={`ml-1 shrink-0 font-mono text-[0.95em] font-bold tabular-nums ${
                      activeCategory === OTHER_KEY ? 'opacity-95' : 'opacity-90'
                    }`}
                  >
                    ({uncategorized.length})
                  </span>
                </button>
              )}
              {explanation && (
                <button
                  type="button"
                  aria-pressed={activeCategory === ABOUT_KEY}
                  className={categoryPillClass(activeCategory === ABOUT_KEY)}
                  title={`About — ${tool}`}
                  onClick={() => setActiveCategory(ABOUT_KEY)}
                >
                  <span className="whitespace-nowrap">About</span>
                </button>
              )}
              {installInfo && (
                <button
                  type="button"
                  aria-pressed={activeCategory === INSTALL_KEY}
                  className={categoryPillClass(activeCategory === INSTALL_KEY)}
                  title={`Install — ${tool}`}
                  onClick={() => setActiveCategory(INSTALL_KEY)}
                >
                  <span className="whitespace-nowrap">Install</span>
                </button>
              )}
            </DockMagnify>
          </div>
          <div className="px-2 pb-4 pt-4 sm:px-3 sm:pb-5">
            {activeSection && (
              <section aria-labelledby="main-cat-active">
                {activeSection.kind === 'commands' ? (
                  <>
                    <CategoryBlockTitle
                      id="main-cat-active"
                      category={activeSection.category}
                      count={activeSection.count}
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {activeSection.items.map((cmd) => (
                        <MainCommandCard key={cmd.id} cmd={cmd} onPick={pick} levelLabel={levelLabel} />
                      ))}
                    </div>
                  </>
                ) : null}
                {activeSection.kind === 'about' && explanation ? (
                  <div className="space-y-4 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-4 sm:p-5">
                    <h3 id="main-cat-active" className="text-[12px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">
                      About {tool}
                    </h3>
                    {[
                      { t: 'What it is', b: explanation.whatItIs },
                      { t: 'Why we use it', b: explanation.whyWeUseIt },
                      { t: 'How we use it in practice', b: explanation.howWeUseIt },
                    ].map(({ t, b }) => (
                      <div key={t}>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">{t}</p>
                        <p className="mt-1 text-[13px] leading-relaxed text-[var(--hub-sub)]">{b}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {activeSection.kind === 'install' && installInfo ? (
                  <div className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-4 sm:p-5">
                    <h3 id="main-cat-active" className="text-[12px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">
                      Install {tool}
                    </h3>
                    <a
                      href={installInfo.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex max-w-full items-center gap-1 break-words text-[13px] font-semibold text-[var(--hub-tool)] underline underline-offset-2"
                    >
                      {installInfo.officialLabel} ↗
                    </a>
                    {installInfo.note && <p className="mt-2 text-[12px] leading-relaxed text-[var(--hub-muted)]">{installInfo.note}</p>}
                    <div className="mt-3 flex flex-wrap gap-1.5" role="tablist" aria-label="Installation platform">
                      {INSTALL_TABS.map(({ id, label }) => (
                        <button
                          key={id}
                          type="button"
                          role="tab"
                          aria-selected={installTab === id}
                          onClick={() => setInstallTab(id)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold ${
                            installTab === id
                              ? 'bg-[var(--hub-tool)] text-white'
                              : 'bg-[var(--hub-elevated)] text-[var(--hub-muted)] ring-1 ring-[var(--hub-border2)] hover:text-[var(--hub-text)]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <ol className="mt-3 list-decimal space-y-2 pl-5 text-[12px] leading-relaxed text-[var(--hub-text)]">
                      {(installInfo?.[installTab]?.steps || []).map((step, i) => (
                        <li key={i} className="pl-1 marker:font-semibold marker:text-[var(--hub-tool)]">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </section>
            )}
          </div>
        </>
      ) : (
        <div className="pb-2">
          {sections.map(({ category, count, items }, i) => (
            <details
              key={category}
              className="group border-b border-[var(--hub-line)]/70 last:border-b-0 open:bg-[var(--hub-tool-dim2)]/40"
              defaultOpen={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center gap-2 px-2 py-2 pr-2 text-left sm:px-3 [&::-webkit-details-marker]:hidden">
                <span
                  className="inline-block text-[10px] text-[var(--hub-muted)] transition-transform duration-150 group-open:rotate-90"
                  aria-hidden
                >
                  ▸
                </span>
                <span className={`min-w-0 flex-1 truncate font-semibold leading-tight text-[var(--hub-text)] ${catTitle}`}>
                  {category}
                </span>
                <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--hub-muted)]">{count}</span>
              </summary>
              <ul className={`divide-y divide-[var(--hub-line)]/60 border-t border-[var(--hub-line)]/50 py-1 ${listBg}`}>
                {items.map((cmd) => (
                  <li key={cmd.id}>
                    <CommandRow cmd={cmd} onPick={pick} levelLabel={levelLabel} />
                  </li>
                ))}
              </ul>
            </details>
          ))}
          {uncategorized.length > 0 && (
            <details className="group border-b border-[var(--hub-line)]/70 open:bg-[var(--hub-tool-dim2)]/40" open>
              <summary className="flex cursor-pointer list-none items-center gap-2 px-2 py-2 pr-2 text-left sm:px-3 [&::-webkit-details-marker]:hidden">
                <span className="inline-block text-[10px] text-[var(--hub-muted)] transition-transform duration-150 group-open:rotate-90" aria-hidden>
                  ▸
                </span>
                <span className={`min-w-0 flex-1 truncate font-semibold text-[var(--hub-text)] ${catTitle}`}>Other</span>
                <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--hub-muted)]">{uncategorized.length}</span>
              </summary>
              <ul className={`divide-y divide-[var(--hub-line)]/60 border-t border-[var(--hub-line)]/50 py-1 ${listBg}`}>
                {uncategorized.map((cmd) => (
                  <li key={cmd.id}>
                    <CommandRow cmd={cmd} onPick={pick} levelLabel={levelLabel} />
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  )
}
