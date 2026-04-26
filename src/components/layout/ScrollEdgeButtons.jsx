import { useCallback } from 'react'

const MAIN_ID = 'main-content'

function scrollMainTo(edge) {
  const prefersMainScroll =
    typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches
  const el = document.getElementById(MAIN_ID)
  if (prefersMainScroll && el) {
    if (edge === 'top') {
      el.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    return
  }
  const doc = document.documentElement
  const body = document.body
  const top = 0
  const bottom = Math.max(doc?.scrollHeight ?? 0, body?.scrollHeight ?? 0)
  window.scrollTo({ top: edge === 'top' ? top : bottom, behavior: 'smooth' })
}

/** Primary workspace scroll jumps. Mobile: top only to reduce overlap with bottom nav. */
export default function ScrollEdgeButtons() {
  const toTop = useCallback(() => scrollMainTo('top'), [])
  const toBottom = useCallback(() => scrollMainTo('bottom'), [])

  const btn =
    'pointer-events-auto flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 text-[var(--hub-text)] shadow-md backdrop-blur-md transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] dark:bg-[var(--hub-elevated)]/95 sm:h-10 sm:w-10 sm:shadow-lg'

  return (
    <div
      className="pointer-events-none fixed bottom-[max(0.85rem,calc(5.25rem+env(safe-area-inset-bottom,0px)))] right-2 z-[92] flex flex-col gap-1.5 sm:bottom-[max(1rem,calc(5.35rem+env(safe-area-inset-bottom,0px)))] sm:right-4 sm:gap-2 lg:bottom-6 lg:right-6"
      role="navigation"
      aria-label="Scroll workspace"
    >
      <button type="button" className={btn} onClick={toTop} title="Scroll to top" aria-label="Scroll to top">
        <svg className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
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
        <svg className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
          <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
