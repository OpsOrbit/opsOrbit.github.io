import ToolIcon from './ToolIcon'
import { BRAND_NAME } from '../brand'
import { COMMAND_TOOL_SHORT_DESC } from '../data/commandToolDescriptions'

/** Workspaces whose page already has a hero or top intro — skip the duplicate strip. */
const PAGE_HAS_OWN_INTRO = new Set([
  'tools',
  'techwords',
  'concepts',
  'ports',
  'scenarios',
  'scripting',
  'roadmap',
  'playground',
  'architecture',
  'cheatsheets',
  'utilities',
  'daily',
  'commands',
])

export default function MainWorkspaceHeader({
  tool,
  toolLabel,
  visibleCount,
  browseKey,
  workspaceMode = 'commands',
  onBackToAllTools,
  /** True when the user typed a query and command search spans all tools. */
  commandsSearchGlobal = false,
}) {
  const headerShellClass =
    'flex shrink-0 items-center gap-2 overflow-visible border-b border-[var(--hub-line)] px-3 pb-2.5 pt-3 sm:gap-3 sm:px-5 sm:pb-3 sm:pt-4 md:gap-4 lg:px-8'
  const iconBoxClass =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-lg font-black sm:h-11 sm:w-11'
  const countPillClass =
    'hidden shrink-0 rounded-full border border-[var(--hub-border2)] px-3 py-1 font-mono text-[11px] font-semibold sm:block'

  if (PAGE_HAS_OWN_INTRO.has(workspaceMode)) {
    return null
  }

  if (
    workspaceMode === 'commands' &&
    tool === 'all' &&
    browseKey == null &&
    !commandsSearchGlobal
  ) {
    return null
  }

  const title = commandsSearchGlobal
    ? 'Search results'
    : browseKey != null
      ? `${toolLabel(browseKey.tool)} · ${browseKey.category}`
      : tool === 'all'
        ? BRAND_NAME
        : toolLabel(tool)

  const subtitle = commandsSearchGlobal
    ? 'Matches across every CLI tool — clear the search box to narrow by the sidebar again'
    : browseKey != null
      ? 'Filtered category — pick commands below'
      : tool === 'all'
        ? 'Searchable CLI reference across tools'
        : COMMAND_TOOL_SHORT_DESC[tool] || 'Command reference'

  return (
    <header className={headerShellClass}>
      <div className={iconBoxClass}>
        {tool !== 'all' && !browseKey ? (
          <ToolIcon tool={tool} className="h-6 w-6 text-[var(--hub-muted)]" />
        ) : (
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            ⚡
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-extrabold leading-tight tracking-tight text-[var(--hub-text)] sm:text-lg lg:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-[var(--hub-muted)] sm:text-[13px]">{subtitle}</p>
      </div>
      {workspaceMode === 'commands' && tool !== 'all' && typeof onBackToAllTools === 'function' && (
        <button
          type="button"
          onClick={onBackToAllTools}
          className="shrink-0 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1.5 text-xs font-semibold text-[var(--hub-muted)] transition-colors hover:text-[var(--hub-text)]"
          aria-label="Back to all tools"
        >
          ← Back
        </button>
      )}
      <div className={countPillClass}>
        <span className="text-[var(--hub-tool)]">{visibleCount}</span>
        <span className="ml-1 text-[var(--hub-muted)]">cmds</span>
      </div>
    </header>
  )
}
