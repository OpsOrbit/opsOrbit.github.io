import ToolIcon from './ToolIcon'
import { BRAND_NAME } from '../brand'

const TOOL_DESC = {
  aws: 'Amazon Web Services CLI',
  helm: 'Kubernetes package manager',
  ansible: 'Config management & automation',
  azure: 'Microsoft Azure CLI',
  gcp: 'Google Cloud CLI',
  git: 'Version control & collaboration',
  linux: 'Shell & system utilities',
  nginx: 'Web server & reverse proxy',
  apache: 'Apache HTTP Server',
  haproxy: 'Load balancing & TCP/HTTP proxy',
  tomcat: 'Java servlet container',
  postgresql: 'psql, pg_dump, and maintenance',
  redis: 'redis-cli & cache operations',
  'github-actions': 'CI/CD (GitHub Actions)',
  kubernetes: 'Container orchestration',
  terraform: 'Infrastructure as code',
  docker: 'Containers & images',
  prometheus: 'Metrics & PromQL',
  grafana: 'Dashboards & observability UI',
  maven: 'Java build & dependencies',
  shell: 'Bash & scripting',
}

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
    'flex shrink-0 items-center gap-3 overflow-visible border-b border-[var(--hub-line)] px-4 pb-3 pt-4 sm:gap-4 sm:px-6 sm:pb-4 sm:pt-5 lg:px-8'
  const iconBoxClass =
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-lg font-black sm:h-11 sm:w-11'
  const countPillClass =
    'hidden shrink-0 rounded-full border border-[var(--hub-border2)] px-3 py-1 font-mono text-[11px] font-semibold sm:block'

  if (workspaceMode === 'scripting') {
    return (
      <header className={headerShellClass}>
        <div className={iconBoxClass}>
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            ⚡
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold leading-tight tracking-tight text-[var(--hub-brand)] sm:text-lg lg:text-xl">
            LAB
          </h2>
          <p className="mt-1 text-sm text-[var(--hub-muted)] sm:text-[13px]">
            Interactive DevOps modules — IaC, CI/CD, containers
          </p>
        </div>
        <div className={countPillClass}>
          <span className="text-[var(--hub-tool)]">{visibleCount}</span>
          <span className="ml-1 text-[var(--hub-muted)]">topics</span>
        </div>
      </header>
    )
  }

  if (workspaceMode === 'roadmap') {
    return (
      <header className={headerShellClass}>
        <div className={iconBoxClass}>
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            ⚡
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold leading-tight tracking-tight text-[var(--hub-brand)] sm:text-lg lg:text-xl">
            Roadmap
          </h2>
          <p className="mt-1 text-sm text-[var(--hub-muted)] sm:text-[13px]">
            Suggested learning path across DevOps topics
          </p>
        </div>
        <div className={countPillClass}>
          <span className="text-[var(--hub-tool)]">{visibleCount}</span>
          <span className="ml-1 text-[var(--hub-muted)]">modules</span>
        </div>
      </header>
    )
  }

  if (workspaceMode === 'tools') {
    return (
      <header className={headerShellClass}>
        <div className={iconBoxClass}>
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            🧰
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold leading-tight tracking-tight text-[var(--hub-brand)] sm:text-lg lg:text-xl">
            DevOps Tools
          </h2>
          <p className="mt-1 text-sm text-[var(--hub-muted)] sm:text-[13px]">
            Encyclopedia across SCM, CI/CD, cloud, security, observability, and more
          </p>
        </div>
        <div className={countPillClass}>
          <span className="text-[var(--hub-tool)]">{visibleCount}</span>
          <span className="ml-1 text-[var(--hub-muted)]">tools</span>
        </div>
      </header>
    )
  }

  if (workspaceMode === 'techwords') {
    return (
      <header className={headerShellClass}>
        <div className={iconBoxClass}>
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            📖
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-extrabold leading-tight tracking-tight text-[var(--hub-brand)] sm:text-lg lg:text-xl">
            Tech Words
          </h2>
          <p className="mt-1 text-sm text-[var(--hub-muted)] sm:text-[13px]">
            Explore essential technical terms across Cloud, DevOps, and Networking
          </p>
        </div>
        <div className={countPillClass}>
          <span className="text-[var(--hub-tool)]">{visibleCount}</span>
          <span className="ml-1 text-[var(--hub-muted)]">terms</span>
        </div>
      </header>
    )
  }

  const title = commandsSearchGlobal
    ? 'Search results'
    : browseKey != null
      ? `${toolLabel(browseKey.tool)} · ${browseKey.category}`
      : tool === 'all'
        ? BRAND_NAME
        : toolLabel(tool)

  const isBrandHomeTitle =
    workspaceMode === 'commands' && tool === 'all' && browseKey == null && !commandsSearchGlobal

  const subtitle = commandsSearchGlobal
    ? 'Matches across every CLI tool — clear the search box to narrow by the sidebar again'
    : browseKey != null
      ? 'Filtered category — pick commands below'
      : tool === 'all'
        ? 'Searchable CLI reference across tools'
        : TOOL_DESC[tool] || 'Command reference'

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
        <h2
          className={`text-base font-extrabold leading-tight tracking-tight sm:text-lg lg:text-xl ${
            isBrandHomeTitle ? 'text-[var(--hub-brand)]' : 'text-[var(--hub-text)]'
          }`}
        >
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
