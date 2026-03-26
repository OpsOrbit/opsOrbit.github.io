import ToolIcon from './ToolIcon'

const TOOLS = [
  { id: 'all', label: 'All tools', short: 'All' },
  { id: 'git', label: 'Git', short: 'Git' },
  { id: 'linux', label: 'Linux', short: 'LX' },
  { id: 'nginx', label: 'Nginx', short: 'Nx' },
  { id: 'apache', label: 'Apache', short: 'Ap' },
  { id: 'haproxy', label: 'HAProxy', short: 'HP' },
  { id: 'tomcat', label: 'Tomcat', short: 'Tc' },
  { id: 'postgresql', label: 'PostgreSQL', short: 'Pg' },
  { id: 'redis', label: 'Redis', short: 'Rd' },
  { id: 'docker', label: 'Docker', short: 'DK' },
  { id: 'kubernetes', label: 'Kubernetes', short: 'K8s' },
  { id: 'helm', label: 'Helm', short: 'Hm' },
  { id: 'terraform', label: 'Terraform', short: 'TF' },
  { id: 'ansible', label: 'Ansible', short: 'An' },
  { id: 'aws', label: 'AWS', short: 'AWS' },
  { id: 'prometheus', label: 'Prometheus', short: 'Pr' },
  { id: 'grafana', label: 'Grafana', short: 'Gr' },
  { id: 'github-actions', label: 'GitHub Actions', short: 'GA' },
  { id: 'maven', label: 'Maven', short: 'MV' },
  { id: 'shell', label: 'Shell', short: 'Sh' },
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
        {TOOLS.map((t) => {
          const active = tool === t.id
          const count = toolCounts[t.id] ?? 0
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onToolChange(t.id)
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
                {t.id === 'all' ? (
                  <span className="font-mono text-[10px] font-extrabold">∗</span>
                ) : (
                  <ToolIcon tool={t.id} className="h-3.5 w-3.5" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[12px] font-semibold leading-tight ${
                    active ? 'text-[var(--hub-text)]' : 'text-[var(--hub-muted)] group-hover:text-[var(--hub-text)]'
                  }`}
                >
                  {t.id === 'all' ? t.label : toolLabel(t.id)}
                </span>
                <span className="mt-px block truncate text-[9px] text-[var(--hub-faint)]">
                  {t.id === 'all' ? 'Every tool' : `${count} cmds`}
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
    </>
  )

  if (layout === 'stack') {
    return <div className={`flex flex-col ${className}`}>{toolsBlock}</div>
  }

  return (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{toolsBlock}</div>
    </div>
  )
}
