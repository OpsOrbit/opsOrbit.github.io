import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SidebarNav from './SidebarNav'
import { DEVOPS_TOOLS, TOOL_CATEGORIES } from '../data/toolsData'
import { TECH_WORD_CATEGORIES } from '../data/techWordsData'
import { techWordsCountForCategory } from '../utils/techWordsFilter'
import { CREATOR_LINKEDIN_URL, CREATOR_NAME } from '../brand'

function buildToolsDomainCounts() {
  const counts = { all: DEVOPS_TOOLS.length }
  for (const c of TOOL_CATEGORIES) {
    counts[c.id] = DEVOPS_TOOLS.filter((t) => t.categoryId === c.id).length
  }
  return counts
}

export default function MobileMenuDrawer({
  open,
  onClose,
  tool,
  onToolChange,
  toolCounts,
  toolLabel,
  workspaceMode = 'commands',
  onWorkspaceModeChange,
  toolsCategoryId = 'all',
  onSelectToolsCategory,
  techWordsCategoryId = 'all',
  onSelectTechWordsCategory,
}) {
  const domainCounts = useMemo(() => buildToolsDomainCounts(), [])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="tool-drawer-shell"
          className="fixed inset-0 z-[110] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[var(--hub-text)]/45 backdrop-blur-sm dark:bg-black/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            id="mobile-tool-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={
              workspaceMode === 'scripting'
                ? 'LAB topics'
                : workspaceMode === 'tools'
                  ? 'Menu and tool domains'
                  : workspaceMode === 'techwords'
                    ? 'Menu and tech dictionary categories'
                    : 'Select tool'
            }
            className="absolute bottom-0 left-0 top-0 z-10 flex w-full max-w-full min-h-0 flex-col overflow-hidden border-r border-[var(--hub-line)] bg-[var(--hub-sidebar)] shadow-2xl sm:w-[min(22rem,calc(100vw-1rem))] sm:max-w-none"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <div className="flex h-[52px] shrink-0 items-center justify-between gap-2 border-b border-[var(--hub-line)] px-4 pt-[max(0px,env(safe-area-inset-top,0px))]">
              <span className="text-[13px] font-bold tracking-tight text-[var(--hub-text)]">
                {workspaceMode === 'scripting'
                  ? 'LAB'
                  : workspaceMode === 'tools'
                    ? 'Browse domains'
                    : workspaceMode === 'techwords'
                      ? 'Tech Words'
                      : 'Select tool'}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--hub-border2)] text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-surface)] hover:text-[var(--hub-text)]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <nav className="flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-y-contain py-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] [-webkit-overflow-scrolling:touch]">
              {onWorkspaceModeChange && (
                <div
                  className="mx-3 mb-3 min-w-0 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] p-2"
                  role="group"
                  aria-label="Workspace: Tools, Commands, LAB, Roadmap, or Tech Words"
                >
                  {/* Full-width column: 2×2 grid clipped labels on narrow drawers; stack reads clearly on all phones */}
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('tools')
                        onClose()
                      }}
                      className={`min-w-0 rounded-md px-3 py-3 text-left text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'tools'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'tools'}
                    >
                      Tools
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('commands')
                        onClose()
                      }}
                      className={`min-w-0 rounded-md px-3 py-3 text-left text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'commands'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'commands'}
                    >
                      Commands
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('scripting')
                        onClose()
                      }}
                      className={`min-w-0 rounded-md px-3 py-3 text-left text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'scripting'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'scripting'}
                      title="Interactive lab modules"
                    >
                      LAB
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('roadmap')
                        onClose()
                      }}
                      className={`min-w-0 rounded-md px-3 py-3 text-left text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'roadmap'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'roadmap'}
                    >
                      Roadmap
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('techwords')
                        onClose()
                      }}
                      className={`min-w-0 rounded-md px-3 py-3 text-left text-[13px] font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'techwords'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'techwords'}
                    >
                      Tech Words
                    </button>
                  </div>
                </div>
              )}
              {workspaceMode === 'commands' ? (
                <SidebarNav
                  layout="stack"
                  tool={tool}
                  onToolChange={onToolChange}
                  toolCounts={toolCounts}
                  toolLabel={toolLabel}
                  onNavigate={onClose}
                />
              ) : null}
              {workspaceMode === 'tools' && onSelectToolsCategory ? (
                <div className="mx-3.5 mt-3 border-t border-[var(--hub-line)] pt-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                    Domain filter
                  </p>
                  <div className="flex flex-col gap-1 pr-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectToolsCategory('all')
                        onClose()
                      }}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        toolsCategoryId === 'all' || !toolsCategoryId
                          ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                          : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={toolsCategoryId === 'all' || !toolsCategoryId}
                    >
                      <span>All domains</span>
                      <span className="font-mono text-[11px] text-[var(--hub-tool)]">{domainCounts.all}</span>
                    </button>
                    {TOOL_CATEGORIES.map((c) => {
                      const active = toolsCategoryId === c.id
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            onSelectToolsCategory(c.id)
                            onClose()
                          }}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                            active
                              ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                              : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                          }`}
                          aria-pressed={active}
                        >
                          <span className="min-w-0 pr-2">{c.shortLabel || c.label}</span>
                          <span className="shrink-0 font-mono text-[11px] text-[var(--hub-tool)]">
                            {domainCounts[c.id] ?? 0}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}
              {workspaceMode === 'techwords' && onSelectTechWordsCategory ? (
                <div className="mx-3.5 mt-3 border-t border-[var(--hub-line)] pt-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                    Category filter
                  </p>
                  <div className="flex flex-col gap-1 pr-0.5">
                    {TECH_WORD_CATEGORIES.map((c) => {
                      const active =
                        techWordsCategoryId === c.id ||
                        (c.id === 'all' && (!techWordsCategoryId || techWordsCategoryId === 'all'))
                      const count = techWordsCountForCategory(c.id)
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            onSelectTechWordsCategory(c.id)
                            onClose()
                          }}
                          className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                            active
                              ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                              : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                          }`}
                          aria-pressed={active}
                        >
                          <span className="min-w-0 pr-2">{c.label}</span>
                          <span className="shrink-0 font-mono text-[11px] text-[var(--hub-tool)]">{count}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : null}
              <div className="mx-3.5 mt-4 border-t border-[var(--hub-line)] pt-4">
                <a
                  href={CREATOR_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="mb-2 block rounded-lg px-3.5 py-2.5 text-[13px] font-semibold text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-tool-dim)] hover:text-[var(--hub-tool)]"
                >
                  Created by {CREATOR_NAME} · LinkedIn ↗
                </a>
                <a
                  href="#main-content"
                  onClick={onClose}
                  className="block rounded-lg px-3.5 py-2.5 text-[13px] font-semibold text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-tool-dim)] hover:text-[var(--hub-text)]"
                >
                  Go to main content
                </a>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
