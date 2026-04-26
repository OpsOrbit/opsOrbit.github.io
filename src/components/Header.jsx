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
  onOpenFavorites,
  searchQuery,
  onSearchQueryChange,
  onGlobalSearchNavigate,
  searchBarRef,
}) {
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-[100] flex shrink-0 flex-col gap-0 border-b border-[var(--hub-line)] backdrop-blur-[16px] transition-[padding] duration-200"
      style={{ background: 'var(--hub-topbar)' }}
    >
      <div className="flex min-h-[46px] w-full min-w-0 flex-nowrap items-start gap-1.5 px-2 pb-1 pt-[max(0.2rem,env(safe-area-inset-top,0px))] sm:min-h-[50px] sm:items-center sm:gap-2 sm:px-3 sm:pb-1.5 sm:pt-[max(0.25rem,env(safe-area-inset-top,0px))] lg:min-h-[54px] lg:gap-4 lg:px-4 lg:pb-2">
        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-text)] transition-colors duration-150 hover:border-[var(--hub-tool)] sm:h-10 sm:w-10 lg:hidden"
            aria-label="Open menu"
            onClick={() => setToolDrawerOpen(true)}
          >
            <span className="text-lg leading-none" aria-hidden>
              ☰
            </span>
          </button>
          <a
            href="#/tools"
            onClick={() => onLogoHomeClick?.()}
            className="flex min-w-0 shrink-0 items-center rounded-lg outline-none ring-offset-2 ring-offset-[var(--hub-topbar)] transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
            aria-label="OpsOrbit home — Tools"
          >
            <BrandLogoMark className="h-[2.15rem] w-[4.6rem] max-w-[min(42vw,5.5rem)] min-[360px]:h-[2.35rem] min-[360px]:w-[5rem] sm:h-[3.15rem] sm:max-w-none sm:w-[6.5rem] md:h-[4.25rem] md:w-[8.5rem] lg:h-[4.75rem] lg:w-[9.75rem]" />
          </a>
        </div>

        {/* Mobile: column-reverse → search above news; lg+: single row news | search */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col-reverse gap-1 sm:gap-1.5 lg:flex-row lg:items-center lg:gap-3">
          <div className="min-h-0 min-w-0 w-full overflow-hidden border-t border-[var(--hub-line)]/60 pt-1 lg:order-1 lg:flex-1 lg:border-0 lg:pt-0">
            <HeaderNewsBanner />
          </div>
          <div className="min-w-0 w-full shrink-0 lg:order-2 lg:max-w-md lg:flex-none xl:max-w-lg">
            <GlobalSearchBar
              ref={searchBarRef}
              query={searchQuery}
              onQueryChange={onSearchQueryChange}
              onNavigate={onGlobalSearchNavigate}
            />
          </div>
        </div>

        <div className="hidden min-w-0 shrink-0 items-center gap-2 self-center border-[var(--hub-line)]/60 lg:flex lg:border-l lg:pl-4 xl:gap-2.5">
          <div className="flex shrink-0 items-center justify-end gap-1.5 xl:gap-2">
            {onOpenFavorites ? (
              <button
                type="button"
                onClick={() => onOpenFavorites()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] xl:h-10 xl:w-10"
                title="Favorites"
                aria-label="Open favorites"
              >
                <span className="text-base leading-none xl:text-lg" aria-hidden>
                  ★
                </span>
              </button>
            ) : null}
            <div className="hidden items-center rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2 py-1.5 font-mono text-[11px] font-semibold text-[var(--hub-muted)] lg:flex xl:px-3">
              <span className="text-[var(--hub-tool)]">{headerBadgeCount}</span>
              <span className="ml-1">{headerBadgeNoun}</span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center xl:h-10 xl:w-10">
              <ThemeToggle />
            </div>
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
        onOpenFavorites={onOpenFavorites}
      />
    </header>
  )
}
