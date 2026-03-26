import { useState } from 'react'
import ThemeToggle from './ThemeToggle'
import MobileMenuDrawer from './MobileMenuDrawer'
import HeaderNewsBanner from './HeaderNewsBanner'

export default function Header({
  query,
  onQueryChange,
  tool,
  onToolChange,
  toolCounts,
  toolLabel,
  visibleCommandCount,
  workspaceMode = 'commands',
  onWorkspaceModeChange,
}) {
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-[100] flex h-[52px] min-h-[52px] shrink-0 items-center gap-1 border-b border-[var(--hub-line)] pl-0 pr-2 backdrop-blur-[16px] md:gap-3 sm:gap-2 sm:pr-4"
      style={{ background: 'var(--hub-topbar)' }}
    >
      <div className="flex h-full shrink-0 items-center gap-1.5 border-r border-[var(--hub-line)] px-2 sm:gap-2.5 sm:px-4">
        <button
          type="button"
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-text)] transition-colors duration-150 hover:border-[var(--hub-tool)] md:hidden"
          aria-label="Select tool"
          onClick={() => setToolDrawerOpen(true)}
        >
          ☰
        </button>
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--hub-tool)]/35 text-sm text-white shadow-sm"
          style={{
            background: 'linear-gradient(135deg, var(--hub-primary-hover), var(--hub-primary))',
          }}
          aria-hidden
        >
          W
        </div>
        <div className="min-w-0 shrink-0 leading-tight">
          <p className="hidden whitespace-nowrap font-[family-name:Orbitron] text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--hub-brand)] sm:block sm:text-[9px]">
            opsmatrix
          </p>
          <p className="whitespace-nowrap text-[11px] font-bold tracking-tight text-[var(--hub-text)] sm:mt-0.5 sm:text-[13px]">
            OpsMatrix
          </p>
        </div>
      </div>

      <div className="relative z-[1] hidden min-h-0 min-w-0 flex-1 basis-0 overflow-hidden md:flex md:min-w-[min(100%,200px)] lg:min-w-[260px]">
        <HeaderNewsBanner />
      </div>

      <div className="relative z-[2] flex min-w-0 shrink-0 items-center justify-end gap-1 border-l border-[var(--hub-line)]/60 bg-[var(--hub-topbar)] pl-1.5 sm:gap-2.5 sm:pl-3 sm:pr-1">
        {workspaceMode === 'commands' ? (
          <>
            <div className="relative w-[min(100%,8.5rem)] shrink-0 sm:w-[min(100%,12.5rem)] md:w-[min(100%,14rem)] lg:w-[min(100%,16rem)]">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--hub-muted)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.3}
                aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                enterKeyHint="search"
                className="h-9 w-full rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] py-2 pl-9 pr-2 text-[12px] text-[var(--hub-text)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--hub-muted)] focus:border-[var(--hub-tool)] focus:shadow-[0_0_0_3px_var(--hub-tool-dim)] sm:pr-2.5 sm:text-[13px]"
                placeholder="Search…"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                aria-label="Search commands"
              />
            </div>
            <div className="hidden shrink-0 items-center rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--hub-muted)] sm:flex md:px-3">
              <span className="text-[var(--hub-tool)]">{visibleCommandCount}</span>
              <span className="ml-1">commands</span>
            </div>
          </>
        ) : workspaceMode === 'scripting' ? (
          <div className="hidden min-w-0 max-w-[10rem] truncate rounded-md border border-dashed border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1.5 text-[11px] text-[var(--hub-muted)] sm:block md:max-w-[14rem] md:text-[12px]">
            Beginner guides — configs & pipelines
          </div>
        ) : (
          <div className="hidden min-w-0 max-w-[10rem] truncate rounded-md border border-dashed border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1.5 text-[11px] text-[var(--hub-muted)] sm:block md:max-w-[14rem] md:text-[12px]">
            Tool roadmap — animated flow
          </div>
        )}
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>

      <MobileMenuDrawer
        open={toolDrawerOpen}
        onClose={() => setToolDrawerOpen(false)}
        tool={tool}
        onToolChange={onToolChange}
        toolCounts={toolCounts}
        toolLabel={toolLabel}
        workspaceMode={workspaceMode}
        onWorkspaceModeChange={onWorkspaceModeChange}
      />
    </header>
  )
}
