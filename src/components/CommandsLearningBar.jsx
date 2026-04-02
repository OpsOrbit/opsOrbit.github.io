import { useCommandsWorkspace } from '../context/CommandsWorkspaceContext'

/**
 * Learn/quick view toggle for the commands workspace (above lists).
 */
export default function CommandsLearningBar({ visible, className = '' }) {
  const ctx = useCommandsWorkspace()
  if (!visible || !ctx) return null

  const { learnMode, setLearnMode } = ctx

  return (
    <div
      className={`mb-5 flex flex-col gap-3 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)]/80 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-end sm:gap-4 dark:bg-[var(--hub-elevated)]/40 ${className}`}
      role="region"
      aria-label="Command learning options"
    >
      <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">View</span>
        <div
          className="inline-flex rounded-lg border border-[var(--hub-line)] bg-[var(--hub-surface)] p-0.5 dark:bg-[var(--hub-elevated)]/50"
          role="group"
          aria-label="Learning mode"
        >
          <button
            type="button"
            onClick={() => setLearnMode('learn')}
            className={`rounded-md px-3 py-1.5 text-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
              learnMode === 'learn'
                ? 'bg-[var(--hub-primary)] text-white shadow-sm dark:text-[#0d1117]'
                : 'text-[var(--hub-muted)] hover:text-[var(--hub-text)]'
            }`}
          >
            Learn
          </button>
          <button
            type="button"
            onClick={() => setLearnMode('quick')}
            className={`rounded-md px-3 py-1.5 text-[11px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
              learnMode === 'quick'
                ? 'bg-[var(--hub-primary)] text-white shadow-sm dark:text-[#0d1117]'
                : 'text-[var(--hub-muted)] hover:text-[var(--hub-text)]'
            }`}
          >
            Quick
          </button>
        </div>
        <span className="hidden text-[10px] text-[var(--hub-faint)] sm:inline" title="Keyboard shortcut">
          Press / to search
        </span>
      </div>
    </div>
  )
}
