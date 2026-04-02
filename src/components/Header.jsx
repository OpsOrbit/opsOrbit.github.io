import { useState } from 'react'
import BrandLogoMark from './BrandLogoMark'
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
  headerBadgeCount,
  headerBadgeNoun,
  workspaceMode = 'commands',
  onWorkspaceModeChange,
  searchInputRef,
  onLogoHomeClick,
}) {
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-[100] flex min-h-[5.5rem] shrink-0 items-center gap-1 border-b border-[var(--hub-line)] py-2 pl-0 pr-2 backdrop-blur-[16px] sm:min-h-[6rem] sm:py-2 md:gap-3 sm:gap-2 sm:pr-4"
      style={{ background: 'var(--hub-topbar)' }}
    >
      <div className="flex shrink-0 items-center gap-2 border-r border-[var(--hub-line)] px-2 sm:gap-3 sm:px-4">
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-text)] transition-colors duration-150 hover:border-[var(--hub-tool)] md:hidden"
          aria-label="Select tool"
          onClick={() => setToolDrawerOpen(true)}
        >
          ☰
        </button>
        <a
          href="#/tools"
          onClick={() => onLogoHomeClick?.()}
          className="flex shrink-0 items-center rounded-lg outline-none ring-offset-2 ring-offset-[var(--hub-topbar)] transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] sm:items-start"
          aria-label="OpsOrbit home — Tools"
        >
          <BrandLogoMark className="h-[4.25rem] w-[8.5rem] sm:h-[4.75rem] sm:w-[9.75rem] md:h-[5.25rem] md:w-[11.25rem]" />
        </a>
      </div>

      <div className="relative z-[1] hidden min-h-0 min-w-0 flex-1 overflow-hidden px-1 sm:px-2 md:flex">
        <HeaderNewsBanner />
      </div>

      <div className="relative z-[2] flex shrink-0 items-center justify-end gap-2 border-l border-[var(--hub-line)]/60 bg-[var(--hub-topbar)] pl-1.5 sm:gap-2.5 sm:pl-3 sm:pr-1">
        <>
          <div className="relative w-[min(100%,8.5rem)] max-w-[9rem] shrink-0 sm:w-[min(100%,10rem)] sm:max-w-[10.5rem] md:max-w-[11.5rem]">
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
              ref={searchInputRef}
              type="search"
              enterKeyHint="search"
              className="h-9 w-full rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] py-2 pl-9 pr-2 text-[12px] text-[var(--hub-text)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--hub-muted)] focus:border-[var(--hub-tool)] focus:shadow-[0_0_0_3px_var(--hub-tool-dim)] sm:pr-2.5 sm:text-[13px]"
              placeholder={
                workspaceMode === 'scripting'
                  ? 'Search lab topics…'
                  : workspaceMode === 'roadmap'
                    ? 'Search modules…'
                    : workspaceMode === 'tools'
                      ? 'Search tools & categories…'
                      : 'Search…'
              }
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              aria-label={
                workspaceMode === 'scripting'
                  ? 'Search LAB topics'
                  : workspaceMode === 'roadmap'
                    ? 'Search roadmap modules'
                    : workspaceMode === 'tools'
                      ? 'Search DevOps tools encyclopedia'
                      : 'Search commands'
              }
            />
          </div>
          <div className="hidden shrink-0 items-center rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1 font-mono text-[11px] font-semibold text-[var(--hub-muted)] sm:flex md:px-3">
            <span className="text-[var(--hub-tool)]">{headerBadgeCount}</span>
            <span className="ml-1">{headerBadgeNoun}</span>
          </div>
        </>
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
