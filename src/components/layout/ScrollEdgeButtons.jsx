import { useCallback } from 'react'

const MAIN_ID = 'main-content'

function scrollMainTo(edge) {
  const el = document.getElementById(MAIN_ID)
  if (!el) return
  if (edge === 'top') {
    el.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
}

/** Primary workspace scroll jumps. Mobile: top only to reduce overlap with bottom nav. */
export default function ScrollEdgeButtons() {
  const toTop = useCallback(() => scrollMainTo('top'), [])
  const toBottom = useCallback(() => scrollMainTo('bottom'), [])

  const btn =
    'pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 text-[var(--hub-text)] shadow-md backdrop-blur-md transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] dark:bg-[var(--hub-elevated)]/95 sm:h-11 sm:w-11 sm:shadow-lg'

  return (
    <div
      className="pointer-events-none fixed bottom-[max(0.75rem,calc(4.25rem+env(safe-area-inset-bottom,0px)+0.35rem))] right-2 z-[88] flex flex-col gap-1.5 sm:bottom-[max(1rem,calc(4.25rem+env(safe-area-inset-bottom,0px)+0.5rem))] sm:right-4 sm:gap-2 lg:bottom-6 lg:right-6"
      role="navigation"
      aria-label="Scroll workspace"
    >
      <button type="button" className={btn} onClick={toTop} title="Scroll to top" aria-label="Scroll to top">
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className={`${btn} hidden sm:flex`}
        onClick={toBottom}
        title="Scroll to bottom"
        aria-label="Scroll to bottom"
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
