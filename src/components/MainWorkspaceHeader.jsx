import ToolIcon from './ToolIcon'
import { SCRIPTING_GUIDES } from '../data/scriptingGuides'

const TOOL_DESC = {
  git: 'Version control & collaboration',
  linux: 'Shell & system utilities',
  nginx: 'Web server & reverse proxy',
  apache: 'Apache HTTP Server',
  haproxy: 'Load balancing & TCP/HTTP proxy',
  tomcat: 'Java servlet container',
  postgresql: 'psql, pg_dump, and maintenance',
  redis: 'redis-cli & cache operations',
  aws: 'Amazon Web Services CLI',
  helm: 'Kubernetes package manager',
  'github-actions': 'CI/CD automation',
  kubernetes: 'Container orchestration',
  terraform: 'Infrastructure as code',
  docker: 'Containers & images',
  ansible: 'Config management & automation',
  prometheus: 'Metrics & PromQL',
  grafana: 'Dashboards & observability UI',
  maven: 'Java build & dependencies',
  shell: 'Bash & scripting',
}

export default function MainWorkspaceHeader({ tool, toolLabel, visibleCount, browseKey, workspaceMode = 'commands' }) {
  const title =
    workspaceMode === 'scripting'
      ? 'Scripting guides'
      : workspaceMode === 'roadmap'
        ? 'Tool roadmap'
        : browseKey != null
        ? `${toolLabel(browseKey.tool)} · ${browseKey.category}`
        : tool === 'all'
          ? 'OpsMatrix'
          : toolLabel(tool)

  const subtitle =
    workspaceMode === 'scripting'
      ? 'Plain-language intros to Dockerfile, Compose, Jenkinsfile, Ansible, Terraform, and Kubernetes YAML — for beginners.'
      : workspaceMode === 'roadmap'
        ? 'Animated flow graph covering what to learn across all tools, from fundamentals to delivery and observability.'
      : browseKey != null
        ? 'Filtered category — pick commands below'
        : tool === 'all'
          ? 'Searchable CLI reference across tools'
          : TOOL_DESC[tool] || 'Command reference'

  return (
    <header className="flex shrink-0 items-center gap-3.5 overflow-visible border-b border-[var(--hub-line)] px-4 pb-4 pt-5 sm:gap-4 sm:px-7">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-lg font-black sm:h-11 sm:w-11">
        {workspaceMode === 'scripting' ? (
          <span className="select-none font-mono text-sm font-bold text-[var(--hub-tool)]" aria-hidden>
            {'</>'}
          </span>
        ) : workspaceMode === 'roadmap' ? (
          <span className="select-none font-mono text-sm font-bold text-[var(--hub-tool)]" aria-hidden>
            ⤳
          </span>
        ) : tool !== 'all' && !browseKey ? (
          <ToolIcon tool={tool} className="h-6 w-6 text-[var(--hub-muted)]" />
        ) : (
          <span className="font-mono text-[var(--hub-tool)]" aria-hidden>
            ⚡
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-extrabold leading-none tracking-tight text-[var(--hub-text)] sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--hub-muted)]">{subtitle}</p>
      </div>
      <div className="hidden shrink-0 rounded-full border border-[var(--hub-border2)] px-3 py-1 font-mono text-[11px] font-semibold text-[var(--hub-muted)] sm:block">
        {workspaceMode === 'scripting' ? `${SCRIPTING_GUIDES.length} topics` : workspaceMode === 'roadmap' ? 'all tools' : `${visibleCount} cmds`}
      </div>
    </header>
  )
}
