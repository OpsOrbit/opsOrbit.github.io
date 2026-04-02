import ToolIcon from './ToolIcon'

/** Order matches hub (`TOOL_ORDER`): cloud → DevOps → platform & ops. */
const TOOL_SECTIONS = [
  { heading: null, ids: ['all'] },
  { heading: 'Cloud', ids: ['aws', 'azure', 'gcp'] },
  {
    heading: 'DevOps',
    ids: ['linux', 'git', 'github-actions', 'docker', 'terraform', 'kubernetes', 'helm', 'ansible'],
  },
  {
    heading: 'Platform & ops',
    ids: ['nginx', 'apache', 'tomcat', 'haproxy', 'prometheus', 'grafana', 'postgresql', 'redis', 'maven', 'shell'],
  },
]

/**
 * Left rail: level on top, then tools.
 * `layout="split"` — level fixed at top, tools scroll below (desktop sidebar).
 * `layout="stack"` — same order, one column for drawers.
 */
export default function SidebarNav({
  tool,
  onToolChange,
  toolCounts = {},
  toolLabel,
  onNavigate,
  layout = 'split',
  className = '',
}) {
  const finish = () => onNavigate?.()

  const toolsBlock = (
    <>
      <p className="sidebar-label px-3 pb-1.5 pt-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)]">
        Tools
      </p>
      <div className="flex flex-col gap-px pb-1">
        {TOOL_SECTIONS.map((section) => (
          <div key={section.heading ?? 'all'} className="flex flex-col gap-px">
            {section.heading ? (
              <p className="sidebar-label px-3 pb-0.5 pt-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)]">
                {section.heading}
              </p>
            ) : null}
            {section.ids.map((id) => {
              const active = tool === id
              const count = toolCounts[id] ?? 0
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    onToolChange(id)
                    finish()
                  }}
                  className={`group tool-rail-btn flex w-full items-center gap-2 border-l-2 border-transparent py-1.5 pl-3 pr-2 text-left transition-all duration-150 ${
                    active
                      ? 'bg-[var(--hub-tool-dim)] border-l-[var(--hub-tool)]'
                      : 'hover:bg-white/[0.04] dark:hover:bg-white/[0.04]'
                  } `}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
                      active
                        ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim2)] text-[var(--hub-text)]'
                        : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)]'
                    }`}
                  >
                    {id === 'all' ? (
                      <span className="font-mono text-[10px] font-extrabold">∗</span>
                    ) : (
                      <ToolIcon tool={id} className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[12px] font-semibold leading-tight ${
                        active ? 'text-[var(--hub-text)]' : 'text-[var(--hub-muted)] group-hover:text-[var(--hub-text)]'
                      }`}
                    >
                      {id === 'all' ? 'All tools' : toolLabel(id)}
                    </span>
                    <span className="mt-px block truncate text-[9px] text-[var(--hub-faint)]">
                      {id === 'all' ? 'Every tool' : `${count} cmds`}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-1 py-px font-mono text-[9px] font-semibold ${
                      active ? 'bg-[var(--hub-tool)] text-white' : 'bg-[var(--hub-border2)] text-[var(--hub-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )

  if (layout === 'stack') {
    return <div className={`flex min-w-0 flex-col ${className}`}>{toolsBlock}</div>
  }

  return (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{toolsBlock}</div>
    </div>
  )
}
