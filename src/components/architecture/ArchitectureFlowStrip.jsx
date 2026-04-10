import { CANONICAL_REQUEST_FLOW } from '../../data/architectureData'

/**
 * Animated left-to-right flow: User → DNS → CDN → LB → App → DB
 */
export default function ArchitectureFlowStrip() {
  return (
    <div className="rounded-2xl border border-[var(--hub-line)] bg-gradient-to-r from-slate-50/90 via-white to-emerald-50/50 p-4 shadow-sm dark:from-slate-900/40 dark:via-[var(--hub-elevated)] dark:to-emerald-950/20">
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--hub-muted)]">
        Typical web request path
      </p>
      <div className="flex min-w-0 flex-wrap items-center justify-center gap-0 sm:flex-nowrap sm:justify-between sm:gap-1">
        {CANONICAL_REQUEST_FLOW.map((label, i) => (
          <div key={label} className="flex min-w-0 items-center">
            <div
              className="rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-2 text-center text-[11px] font-bold text-[var(--hub-text)] shadow-sm sm:min-w-[4.5rem] sm:px-3.5 sm:text-xs"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {label}
            </div>
            {i < CANONICAL_REQUEST_FLOW.length - 1 ? (
              <FlowArrow delay={i} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function FlowArrow({ delay }) {
  return (
    <span
      className="arch-flow-arrow mx-0.5 inline-flex shrink-0 sm:mx-1"
      style={{ animationDelay: `${delay * 0.2}s` }}
      aria-hidden
    >
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--hub-tool)]">
        <path
          d="M2 8h14M14 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arch-flow-arrow-path"
        />
      </svg>
    </span>
  )
}
