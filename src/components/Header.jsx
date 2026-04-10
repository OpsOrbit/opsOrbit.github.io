import { useState } from 'react'
import BrandLogoMark from './BrandLogoMark'
import ThemeToggle from './ThemeToggle'
import MobileMenuDrawer from './MobileMenuDrawer'
import HeaderNewsBanner from './HeaderNewsBanner'
import GlobalSearchBar from './search/GlobalSearchBar'

export default function Header({
  tool,
  onToolChange,
  toolCounts,
  toolLabel,
  headerBadgeCount,
  headerBadgeNoun,
  workspaceMode = 'commands',
  onWorkspaceModeChange,
  onLogoHomeClick,
  toolsCategoryId,
  onSelectToolsCategory,
  techWordsCategoryId,
  onSelectTechWordsCategory,
  conceptsCategoryId,
  onSelectConceptsCategory,
  portsCategoryId,
  onSelectPortsCategory,
  scenariosCategoryId,
  scenariosDifficultyId,
  onSelectScenariosCategory,
  onSelectScenariosDifficulty,
  onOpenFavorites,
  searchQuery,
  onSearchQueryChange,
  onGlobalSearchNavigate,
  searchBarRef,
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

      <div className="relative z-[1] flex min-h-0 min-w-0 flex-1 items-center gap-2 overflow-visible px-1 sm:gap-3 sm:px-2">
        <div className="hidden min-h-0 min-w-0 flex-1 overflow-hidden lg:block">
          <HeaderNewsBanner />
        </div>
        <GlobalSearchBar
          ref={searchBarRef}
          query={searchQuery}
          onQueryChange={onSearchQueryChange}
          onNavigate={onGlobalSearchNavigate}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 pl-2 sm:flex-row sm:items-center sm:justify-end sm:gap-2.5 sm:border-l sm:border-[var(--hub-line)]/60 sm:bg-[var(--hub-topbar)] sm:pl-3 lg:max-w-none lg:flex-initial">
        <div className="flex shrink-0 items-center justify-end gap-2">
          {onOpenFavorites ? (
            <button
              type="button"
              onClick={() => onOpenFavorites()}
              className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] sm:min-h-9 sm:min-w-9"
              title="Favorites"
              aria-label="Open favorites"
            >
              <span className="text-lg leading-none" aria-hidden>
                ★
              </span>
            </button>
          ) : null}
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
        conceptsCategoryId={conceptsCategoryId}
        onSelectConceptsCategory={onSelectConceptsCategory}
        portsCategoryId={portsCategoryId}
        onSelectPortsCategory={onSelectPortsCategory}
        scenariosCategoryId={scenariosCategoryId}
        scenariosDifficultyId={scenariosDifficultyId}
        onSelectScenariosCategory={onSelectScenariosCategory}
        onSelectScenariosDifficulty={onSelectScenariosDifficulty}
      />
    </header>
  )
}
