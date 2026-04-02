import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SidebarNav from './SidebarNav'

export default function MobileMenuDrawer({
  open,
  onClose,
  tool,
  onToolChange,
  toolCounts,
  toolLabel,
  workspaceMode = 'commands',
  onWorkspaceModeChange,
}) {
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
          className="fixed inset-0 z-[110] flex justify-start md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-[var(--hub-text)]/35 backdrop-blur-sm dark:bg-black/55"
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
                  ? 'Tool categories'
                  : 'Select tool'
            }
            className="relative z-10 flex h-full w-[min(100vw-1.5rem,320px)] flex-col border-r border-[var(--hub-line)] bg-[var(--hub-sidebar)] shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
          >
            <div className="flex h-[52px] shrink-0 items-center justify-between gap-2 border-b border-[var(--hub-line)] px-4">
              <span className="text-[13px] font-bold tracking-tight text-[var(--hub-text)]">
                {workspaceMode === 'scripting'
                  ? 'LAB'
                  : workspaceMode === 'tools'
                    ? 'Tool categories'
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
            <nav className="flex-1 overflow-y-auto overscroll-contain py-2">
              {onWorkspaceModeChange && (
                <div
                  className="mx-3.5 mb-3 flex gap-2 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] p-1"
                  role="group"
                  aria-label="Workspace: Tools, Commands, LAB, or Roadmap"
                >
                  <div className="grid w-full grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onWorkspaceModeChange('tools')
                        onClose()
                      }}
                      className={`rounded-md py-2.5 text-[12px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
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
                      className={`rounded-md py-2.5 text-[12px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
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
                      className={`rounded-md py-2.5 text-[12px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
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
                      className={`rounded-md py-2.5 text-[12px] font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                        workspaceMode === 'roadmap'
                          ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                          : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)]'
                      }`}
                      aria-pressed={workspaceMode === 'roadmap'}
                    >
                      Roadmap
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
              <div className="mx-3.5 mt-4 border-t border-[var(--hub-line)] pt-4">
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
