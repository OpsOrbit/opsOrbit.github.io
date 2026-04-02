import { SCRIPTING_GUIDES } from '../data/scriptingGuides'

/** Matches workspace Tools / Commands / LAB / Roadmap buttons (App sidebar). */
const TOPIC_BTN_ACTIVE =
  'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
const TOPIC_BTN_IDLE =
  'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
const TOPIC_BTN_BASE =
  'flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-2 py-2 text-center text-[10px] font-bold leading-tight tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-bg)] sm:text-[11px]'

function ProgressGlyph({ learned, className = '' }) {
  if (learned) {
    return (
      <span
        className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 ${className}`}
        aria-label="Marked as learned"
      >
        ✓
      </span>
    )
  }
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--hub-line)]/80 text-[9px] text-[var(--hub-faint)] ${className}`}
      aria-hidden
    >
      ○
    </span>
  )
}

function StackedTopicButtons({ guides, activeId, onSelectTopic, finish, isTopicLearned }) {
  return (
    <div className="flex flex-col gap-1">
      {guides.map((g) => {
        const on = g.id === activeId
        const learned = isTopicLearned?.(g.id)
        return (
          <button
            key={g.id}
            type="button"
            onClick={() => {
              onSelectTopic(g.id)
              finish()
            }}
            className={`${TOPIC_BTN_BASE} gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
              on ? TOPIC_BTN_ACTIVE : TOPIC_BTN_IDLE
            }`}
          >
            {isTopicLearned ? <ProgressGlyph learned={learned} /> : null}
            <span className="line-clamp-2 min-w-0 flex-1">{g.title}</span>
          </button>
        )
      })}
    </div>
  )
}

/**
 * @param {'rail' | 'workspace' | 'asideStack'} variant
 * @param {(topicId: string) => boolean} [isTopicLearned]
 */
export default function ScriptingTopicsNav({
  activeId,
  onSelectTopic,
  onNavigate,
  className = '',
  variant = 'rail',
  guides = SCRIPTING_GUIDES,
  isTopicLearned,
}) {
  const finish = () => onNavigate?.()

  if (variant === 'asideStack') {
    return (
      <nav
        className={`flex min-h-0 min-w-0 flex-1 flex-col ${className}`}
        aria-label="LAB topics"
      >
        <p className="sidebar-label mb-1.5 shrink-0 px-2 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)] md:px-2.5">
          Topics
        </p>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] p-1 shadow-sm dark:bg-[var(--hub-elevated)] [scrollbar-width:thin]">
          <StackedTopicButtons
            guides={guides}
            activeId={activeId}
            onSelectTopic={onSelectTopic}
            finish={finish}
            isTopicLearned={isTopicLearned}
          />
        </div>
      </nav>
    )
  }

  if (variant === 'workspace') {
    return (
      <div className={`w-full shrink-0 ${className}`}>
        <div
          className="-mx-0.5 sticky top-0 z-[8] mb-4 flex flex-wrap gap-2 border-b border-[var(--hub-line)]/60 bg-[var(--hub-bg)] pb-3 pt-2 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.08)] supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-[var(--hub-bg)]/92 dark:border-[var(--hub-line)]/40 dark:shadow-black/25 md:hidden"
          role="tablist"
          aria-label="LAB topics"
        >
          {guides.map((g) => {
            const on = g.id === activeId
            const learned = isTopicLearned?.(g.id)
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
                className={`${TOPIC_BTN_BASE} gap-1.5 border border-transparent transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] ${
                  on ? TOPIC_BTN_ACTIVE : `${TOPIC_BTN_IDLE} bg-[var(--hub-surface)] dark:bg-[var(--hub-elevated)]`
                }`}
              >
                {isTopicLearned ? (
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                      learned ? 'bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]' : 'bg-[var(--hub-line)]'
                    }`}
                    aria-hidden
                  />
                ) : null}
                {g.title}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <nav className={`flex min-h-0 flex-1 flex-col ${className}`} aria-label="LAB guide topics">
      <p className="sidebar-label px-3 pb-1.5 pt-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--hub-faint)]">
        Topics
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-px overflow-y-auto overscroll-contain pb-2">
        {guides.map((g) => {
          const on = g.id === activeId
          const learned = isTopicLearned?.(g.id)
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => {
                onSelectTopic(g.id)
                finish()
              }}
              className={`group flex w-full items-center gap-2 border-l-2 border-transparent py-1.5 pl-3 pr-2 text-left transition-all duration-200 hover:scale-[1.01] hover:border-l-[var(--hub-line)]/80 hover:bg-white/[0.06] active:scale-[0.99] dark:hover:bg-white/[0.06] ${
                on
                  ? 'border-l-[var(--hub-tool)] bg-[var(--hub-tool-dim)] shadow-[inset_0_0_0_9999px_rgba(0,0,0,0.02)] dark:shadow-none'
                  : ''
              }`}
            >
              {isTopicLearned ? <ProgressGlyph learned={learned} className="mt-0.5" /> : null}
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[12px] font-semibold leading-tight transition-colors ${
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
