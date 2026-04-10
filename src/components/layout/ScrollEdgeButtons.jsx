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

/**
 * Fixed controls to jump the primary workspace scroll (#main-content) to top or bottom.
 * Shown on every page; clears mobile bottom nav via bottom offset.
 */
export default function ScrollEdgeButtons() {
  const toTop = useCallback(() => scrollMainTo('top'), [])
  const toBottom = useCallback(() => scrollMainTo('bottom'), [])

  const btn =
    'pointer-events-auto flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 text-[var(--hub-text)] shadow-lg backdrop-blur-md transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] dark:bg-[var(--hub-elevated)]/95'

  return (
    <div
      className="pointer-events-none fixed bottom-[max(1rem,calc(4.75rem+env(safe-area-inset-bottom,0px)+0.5rem))] right-3 z-[90] flex flex-col gap-2 sm:right-5 lg:bottom-6 lg:right-6"
      role="navigation"
      aria-label="Scroll workspace"
    >
      <button type="button" className={btn} onClick={toTop} title="Scroll to top" aria-label="Scroll to top">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className={btn}
        onClick={toBottom}
        title="Scroll to bottom"
        aria-label="Scroll to bottom"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
