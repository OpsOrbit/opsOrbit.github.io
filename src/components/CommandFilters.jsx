const TOOLS = [
  { id: 'all', label: 'All' },
  { id: 'aws', label: 'AWS' },
  { id: 'azure', label: 'Azure' },
  { id: 'gcp', label: 'GCP' },
  { id: 'linux', label: 'Linux' },
  { id: 'git', label: 'Git' },
  { id: 'github-actions', label: 'Jenkins / CI' },
  { id: 'docker', label: 'Docker' },
  { id: 'terraform', label: 'Terraform' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'helm', label: 'Helm' },
  { id: 'ansible', label: 'Ansible' },
  { id: 'nginx', label: 'Nginx' },
  { id: 'apache', label: 'Apache' },
  { id: 'tomcat', label: 'Tomcat' },
  { id: 'haproxy', label: 'HAProxy' },
  { id: 'prometheus', label: 'Prometheus' },
  { id: 'grafana', label: 'Grafana' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'redis', label: 'Redis' },
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
 * Tool filter chips (desktop Nav when used).
 */
export default function CommandFilters({ tool, onToolChange, className = '' }) {
  return (
    <div className={className}>
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
  )
}
