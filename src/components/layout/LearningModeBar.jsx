/**
 * Top-level learning intent: Roadmap (Learn), browse Tools/Commands (Explore), LAB (Practice).
 */
export default function LearningModeBar({ workspaceMode, onWorkspaceModeChange }) {
  const isLearn = workspaceMode === 'roadmap'
  const isExplore =
    workspaceMode === 'tools' || workspaceMode === 'commands' || workspaceMode === 'techwords'
  const isPractice = workspaceMode === 'scripting'

  const btn =
    'flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-center text-[11px] font-bold uppercase tracking-wide transition-all duration-200 sm:min-h-0 sm:flex-none sm:px-4 sm:text-xs'

  return (
    <div
      className="flex shrink-0 flex-col gap-2 border-b border-[var(--hub-line)] bg-[var(--hub-elevated)]/80 px-3 py-2.5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-4"
      role="navigation"
      aria-label="Learning mode"
    >
      <p className="hidden text-[11px] font-semibold uppercase tracking-wider text-[var(--hub-muted)] sm:block">
        Mode
      </p>
      <div className="flex w-full min-w-0 gap-1.5 sm:w-auto sm:justify-end">
        <button
          type="button"
          className={`${btn} ${
            isLearn
              ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
              : 'text-[var(--hub-muted)] hover:bg-[var(--hub-surface)] hover:text-[var(--hub-text)]'
          }`}
          aria-pressed={isLearn}
          onClick={() => onWorkspaceModeChange('roadmap')}
        >
          <span aria-hidden>🚀</span>
          <span className="truncate">Learn</span>
        </button>
        <button
          type="button"
          className={`${btn} ${
            isExplore
              ? 'bg-[rgba(59,130,246,0.12)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_rgb(59,130,246)] dark:bg-[rgba(96,165,250,0.12)]'
              : 'text-[var(--hub-muted)] hover:bg-[var(--hub-surface)] hover:text-[var(--hub-text)]'
          }`}
          aria-pressed={isExplore}
          title="Tools, Commands, and Tech Words"
          onClick={() => onWorkspaceModeChange('tools')}
        >
          <span aria-hidden>⚡</span>
          <span className="truncate">Explore</span>
        </button>
        <button
          type="button"
          className={`${btn} ${
            isPractice
              ? 'bg-[rgba(147,51,234,0.1)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_rgb(147,51,234)] dark:bg-[rgba(192,132,252,0.12)]'
              : 'text-[var(--hub-muted)] hover:bg-[var(--hub-surface)] hover:text-[var(--hub-text)]'
          }`}
          aria-pressed={isPractice}
          onClick={() => onWorkspaceModeChange('scripting')}
        >
          <span aria-hidden>🧪</span>
          <span className="truncate">Practice</span>
        </button>
      </div>
    </div>
  )
}
