import { SCRIPTING_GUIDES } from '../data/scriptingGuides'

/**
 * @param {'rail' | 'workspace'} variant
 *   rail — left app sidebar (same visual language as tool rail).
 *   workspace — topics in main area: wrapped chip row on small screens (no horizontal scroll), sticky panel on lg+.
 */
export default function ScriptingTopicsNav({
  activeId,
  onSelectTopic,
  onNavigate,
  className = '',
  variant = 'rail',
  guides = SCRIPTING_GUIDES,
}) {
  const finish = () => onNavigate?.()

  if (variant === 'workspace') {
    return (
      <div className={`w-full shrink-0 lg:w-[min(100%,15.5rem)] xl:w-64 ${className}`}>
        {/* Mobile / tablet: all topics visible — wrap rows, no horizontal scroll */}
        <div
          className="-mx-0.5 mb-4 flex flex-wrap gap-2 pb-1 pt-0.5 lg:mb-0 lg:hidden"
          role="tablist"
          aria-label="Scripting topics"
        >
          {guides.map((g) => {
            const on = g.id === activeId
            return (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  onSelectTopic(g.id)
                  finish()
                }}
                className={`rounded-lg border px-3 py-2 text-left text-[11px] font-semibold transition-colors sm:text-[12px] ${
                  on
                    ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                    : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-tool)]/40 hover:text-[var(--hub-text)]'
                }`}
              >
                {g.title}
              </button>
            )
          })}
        </div>

        {/* Desktop: static middle column — sticky so it stays visible while reading */}
        <nav
          className="sticky top-3 z-[1] hidden rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-2 shadow-[var(--hub-shadow-card)] lg:block"
          aria-label="Scripting topics"
        >
          <p className="mb-2 px-2 pt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-faint)]">
            Topics
          </p>
          <div className="flex max-h-[min(70vh,32rem)] flex-col gap-1 overflow-y-auto overscroll-contain pb-1 [scrollbar-width:thin]">
            {guides.map((g) => {
              const on = g.id === activeId
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    onSelectTopic(g.id)
                    finish()
                  }}
                  className={`w-full rounded-lg border px-2.5 py-2 text-left text-[12px] font-semibold transition-colors ${
                    on
                      ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                      : 'border-transparent text-[var(--hub-muted)] hover:border-[var(--hub-border2)] hover:bg-[var(--hub-surface)] hover:text-[var(--hub-text)]'
                  }`}
                >
                  <span className="line-clamp-2">{g.title}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    )
  }

  /* rail — app sidebar */
  return (
    <nav className={`flex min-h-0 flex-1 flex-col ${className}`} aria-label="Scripting guide topics">
      <p className="sidebar-label px-3 pb-1.5 pt-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)]">
        Topics
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-px overflow-y-auto overscroll-contain pb-2">
        {guides.map((g) => {
          const on = g.id === activeId
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                onSelectTopic(g.id)
                finish()
              }}
              className={`group flex w-full items-center gap-2 border-l-2 border-transparent py-1.5 pl-3 pr-2 text-left transition-all duration-150 ${
                on
                  ? 'bg-[var(--hub-tool-dim)] border-l-[var(--hub-tool)]'
                  : 'hover:bg-white/[0.04] dark:hover:bg-white/[0.04]'
              }`}
            >
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[12px] font-semibold leading-tight ${
                    on ? 'text-[var(--hub-text)]' : 'text-[var(--hub-muted)] group-hover:text-[var(--hub-text)]'
                  }`}
                >
                  {g.title}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
