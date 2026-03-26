const LEVELS = [
  { id: 'all', label: 'All' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

const TOOLS = [
  { id: 'all', label: 'All' },
  { id: 'git', label: 'Git' },
  { id: 'linux', label: 'Linux' },
  { id: 'nginx', label: 'Nginx' },
  { id: 'apache', label: 'Apache' },
  { id: 'haproxy', label: 'HAProxy' },
  { id: 'tomcat', label: 'Tomcat' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'redis', label: 'Redis' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'helm', label: 'Helm' },
  { id: 'terraform', label: 'Terraform' },
  { id: 'ansible', label: 'Ansible' },
  { id: 'aws', label: 'AWS' },
  { id: 'prometheus', label: 'Prometheus' },
  { id: 'grafana', label: 'Grafana' },
  { id: 'github-actions', label: 'GitHub Actions' },
  { id: 'maven', label: 'Maven' },
  { id: 'shell', label: 'Shell' },
]

function chipClass(selected) {
  const base =
    'min-h-[48px] shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-250 ease-out touch-manipulation md:min-h-[44px]'
  if (selected) {
    return `${base} scale-[1.02] bg-hub-primary text-white shadow-md shadow-hub-primary/25 dark:text-[#0d1117] dark:shadow-hub-primary/20`
  }
  return `${base} text-hub-sub hover:scale-[1.02] hover:bg-hub-surface hover:text-hub-text active:scale-[0.98] active:bg-hub-surface dark:hover:bg-hub-elevated/80 dark:active:bg-hub-elevated`
}

/**
 * Shared level + tool filter chips (desktop Nav and mobile drawer).
 */
export default function CommandFilters({ level, onLevelChange, tool, onToolChange, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3" role="group" aria-label="Skill level">
        <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-hub-muted">Level</span>
        <div className="inline-flex flex-wrap gap-1 rounded-2xl bg-hub-bg p-1 ring-1 ring-hub-line/80 dark:bg-hub-elevated/50 dark:ring-hub-line">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              aria-pressed={level === l.id}
              onClick={() => onLevelChange(l.id)}
              className={chipClass(level === l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-hub-line pt-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
          <span className="shrink-0 pt-1 text-xs font-bold uppercase tracking-wider text-hub-muted">Tool</span>
          <div className="nav-tool-scroll min-w-0 flex-1 touch-pan-x overflow-x-auto overflow-y-visible pb-0.5 sm:overflow-visible">
            <div className="inline-flex min-w-max flex-nowrap gap-1 rounded-2xl bg-hub-bg p-1 ring-1 ring-hub-line/80 dark:bg-hub-elevated/50 dark:ring-hub-line sm:min-w-0 sm:flex-wrap">
              {TOOLS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={tool === t.id}
                  onClick={() => onToolChange(t.id)}
                  className={chipClass(tool === t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
