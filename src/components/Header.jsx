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
  toolsCategoryId,
  onSelectToolsCategory,
  techWordsCategoryId,
  onSelectTechWordsCategory,
}) {
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-[100] flex shrink-0 flex-col gap-3 border-b border-[var(--hub-line)] py-3 pl-0 pr-3 backdrop-blur-[16px] sm:flex-row sm:items-center sm:gap-2 sm:py-2 sm:pr-4 md:gap-3"
      style={{ background: 'var(--hub-topbar)' }}
    >
      <div className="flex min-h-[44px] shrink-0 items-center gap-2 border-[var(--hub-line)] px-2 sm:min-h-0 sm:border-r sm:gap-3 sm:px-4">
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-text)] transition-colors duration-150 hover:border-[var(--hub-tool)] lg:hidden"
          aria-label="Open menu"
          onClick={() => setToolDrawerOpen(true)}
        >
          ☰
        </button>
        <a
          href="#/tools"
          onClick={() => onLogoHomeClick?.()}
          className="flex min-w-0 shrink-0 items-center rounded-lg outline-none ring-offset-2 ring-offset-[var(--hub-topbar)] transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] sm:items-start"
          aria-label="OpsOrbit home — Tools"
        >
          <BrandLogoMark className="h-[3.75rem] w-[7.5rem] min-[380px]:h-[4.25rem] min-[380px]:w-[8.5rem] sm:h-[4.75rem] sm:w-[9.75rem] md:h-[5.25rem] md:w-[11.25rem]" />
        </a>
      </div>

      <div className="relative z-[1] hidden min-h-0 min-w-0 flex-1 overflow-hidden px-1 sm:px-2 lg:flex">
        <HeaderNewsBanner />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pl-2 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:border-l sm:border-[var(--hub-line)]/60 sm:bg-[var(--hub-topbar)] sm:pl-3 lg:max-w-none lg:flex-initial">
        <div className="relative w-full min-w-0 sm:w-[min(100%,12rem)] sm:max-w-[12rem] md:max-w-[13rem] lg:w-[min(100%,13rem)]">
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
            className="h-11 min-h-[44px] w-full rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] py-2 pl-9 pr-2 text-sm text-[var(--hub-text)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--hub-muted)] focus:border-[var(--hub-tool)] focus:shadow-[0_0_0_3px_var(--hub-tool-dim)] sm:h-9 sm:min-h-0 sm:text-[13px]"
            placeholder={
              workspaceMode === 'scripting'
                ? 'Search lab topics…'
                : workspaceMode === 'roadmap'
                  ? 'Search modules…'
                  : workspaceMode === 'tools'
                    ? 'Search tools & categories…'
                    : workspaceMode === 'techwords'
                      ? 'Search tech dictionary…'
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
                    : workspaceMode === 'techwords'
                      ? 'Search technical dictionary'
                      : 'Search commands'
            }
          />
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2">
          <div className="hidden items-center rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-2 font-mono text-xs font-semibold text-[var(--hub-muted)] sm:flex md:px-3">
            <span className="text-[var(--hub-tool)]">{headerBadgeCount}</span>
            <span className="ml-1">{headerBadgeNoun}</span>
          </div>
          <div className="flex min-h-[44px] min-w-[44px] items-center justify-center sm:min-h-0 sm:min-w-0">
            <ThemeToggle />
          </div>
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
        toolsCategoryId={toolsCategoryId}
        onSelectToolsCategory={onSelectToolsCategory}
        techWordsCategoryId={techWordsCategoryId}
        onSelectTechWordsCategory={onSelectTechWordsCategory}
      />
    </header>
  )
}
