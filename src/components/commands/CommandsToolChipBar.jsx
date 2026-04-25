import ToolIcon from '../ToolIcon'

/** Command workspace tool filter chips (aligned with Tools `DomainNavBar` pattern). */
export const COMMAND_TOOL_CHIP_IDS = [
  'all',
  'aws',
  'azure',
  'gcp',
  'linux',
  'git',
  'github-actions',
  'docker',
  'terraform',
  'kubernetes',
  'helm',
  'ansible',
  'nginx',
  'apache',
  'tomcat',
  'haproxy',
  'prometheus',
  'grafana',
  'postgresql',
  'redis',
  'maven',
  'shell',
]

const chipBase =
  'inline-flex max-w-full shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] active:scale-[0.98] sm:text-sm'
const chipIdle =
  'border-[var(--hub-border2)] bg-[var(--hub-surface)]/90 text-[var(--hub-tool)] backdrop-blur-sm hover:border-indigo-400/45 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-violet-50/40 dark:bg-[var(--hub-elevated)]/50 dark:hover:from-indigo-950/40 dark:hover:to-violet-950/20'
const chipActive =
  'border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 ring-1 ring-cyan-400/40 dark:from-indigo-500 dark:to-violet-600'

/**
 * @param {{
 *   activeToolId: string
 *   toolCounts: Record<string, number>
 *   toolLabel: (id: string) => string
 *   onSelectTool: (id: string) => void
 * }} props
 */
export default function CommandsToolChipBar({ activeToolId, toolCounts, toolLabel, onSelectTool }) {
  const normalized = activeToolId && activeToolId !== 'all' ? activeToolId : null
  const allActive = !normalized

  return (
    <div className="commands-tool-chip-bar mb-2 max-w-full overflow-hidden rounded-xl border border-indigo-200/40 bg-[var(--hub-surface)]/95 p-2 shadow-[0_8px_20px_-14px_rgba(79,70,229,0.2)] ring-1 ring-indigo-500/15 backdrop-blur-md dark:border-indigo-500/20 dark:bg-[var(--hub-elevated)]/88 dark:shadow-black/30 dark:ring-indigo-400/20 sm:p-2.5">
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold sm:text-sm" aria-label="Commands path">
          <button
            type="button"
            onClick={() => onSelectTool('all')}
            className="shrink-0 rounded-md px-1 py-0.5 text-[var(--hub-muted)] underline-offset-2 transition-colors hover:text-[var(--hub-text)] hover:underline"
          >
            Commands
          </button>
          {normalized ? (
            <>
              <span className="shrink-0 text-[var(--hub-muted)]" aria-hidden>
                ›
              </span>
              <span className="min-w-0 truncate text-[var(--hub-text)]">{toolLabel(normalized)}</span>
            </>
          ) : null}
        </div>
        {!allActive ? (
          <button
            type="button"
            onClick={() => onSelectTool('all')}
            className="shrink-0 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-bg)]/60 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)] transition-colors hover:border-indigo-400/50 hover:text-[var(--hub-text)] dark:bg-[var(--hub-bg)]/40"
            aria-label="Clear tool filter"
          >
            ✕ Clear
          </button>
        ) : null}
      </div>

      {/* Static wrap layout (no horizontal scroll) — matches Tools desktop domain chips */}
      <div className="flex min-w-0 flex-wrap justify-start gap-1.5 sm:justify-center sm:gap-2">
        {COMMAND_TOOL_CHIP_IDS.map((id) => {
          const active = id === 'all' ? allActive : normalized === id
          const count = id === 'all' ? (toolCounts.all ?? 0) : (toolCounts[id] ?? 0)
          const label = id === 'all' ? 'ALL' : toolLabel(id)
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelectTool(id)}
              className={`${chipBase} ${active ? chipActive : chipIdle}`}
              aria-pressed={active}
            >
              {id !== 'all' ? <ToolIcon tool={id} className="h-4 w-4 shrink-0 opacity-90" /> : null}
              <span className="max-w-[8.75rem] truncate whitespace-nowrap sm:max-w-none">{label}</span>
              <span
                className={`rounded-full px-1 py-0.5 font-mono text-[10px] font-bold tabular-nums ${
                  active ? 'bg-white/25 text-white' : 'bg-[var(--hub-border2)] text-[var(--hub-muted)]'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
