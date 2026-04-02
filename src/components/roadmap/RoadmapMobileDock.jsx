/**
 * Sticky bottom nav for small screens while viewing the roadmap workspace.
 */
export default function RoadmapMobileDock({ onRoadmap, onCommands }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[var(--hub-line)] bg-[var(--hub-surface)]/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.12)] backdrop-blur-md dark:bg-[var(--hub-elevated)]/95 lg:hidden"
      aria-label="Roadmap quick navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-center gap-4 px-4">
        <button
          type="button"
          onClick={onRoadmap}
          className="flex min-h-[44px] min-w-[120px] flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide text-hub-primary"
        >
          <span className="text-base leading-none" aria-hidden>
            🗺
          </span>
          Roadmap
        </button>
        <button
          type="button"
          onClick={onCommands}
          className="flex min-h-[44px] min-w-[120px] flex-1 flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)] transition hover:text-[var(--hub-text)]"
        >
          <span className="text-base leading-none" aria-hidden>
            ⌘
          </span>
          Commands
        </button>
      </div>
    </nav>
  )
}
