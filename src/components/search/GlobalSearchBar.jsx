import { useMemo, useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { searchGlobal } from '../../utils/globalSearchIndex'

const SECTION = 'px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]'
const ROW =
  'flex w-full cursor-pointer items-start gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-[var(--hub-line)] hover:bg-[var(--hub-elevated)]'

function SearchGlyph({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

/**
 * Header-embedded search: icon-only until opened; expands into the field beside news.
 * Ref exposes `focus()` for / and ⌘K (expands + focuses input).
 *
 * @param {object} props
 * @param {string} props.query
 * @param {(q: string) => void} props.onQueryChange
 * @param {(p: { type: string, payload: unknown }) => void} props.onNavigate
 */
const GlobalSearchBar = forwardRef(function GlobalSearchBar({ query, onQueryChange, onNavigate }, ref) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(() => Boolean(query?.trim()))
  const wrapRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))

  useImperativeHandle(ref, () => ({
    focus: () => {
      setExpanded(true)
      requestAnimationFrame(() => inputRef.current?.focus())
    },
  }))

  useEffect(() => {
    if (query?.trim()) setExpanded(true)
  }, [query])

  const results = useMemo(() => searchGlobal(query), [query])

  const hasAny =
    results.commands.length + results.tools.length + results.concepts.length + results.ports.length > 0

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const showPanel = open && query.trim().length > 0
  const showField = expanded || Boolean(query?.trim())

  const collapseIfEmpty = () => {
    if (!query?.trim()) setExpanded(false)
  }

  return (
    <div
      ref={wrapRef}
      className={`relative z-[102] min-w-0 ${showField ? 'w-full max-w-none flex-1 sm:max-w-md lg:max-w-lg' : 'shrink-0'}`}
      role="search"
    >
      {!showField ? (
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] sm:h-11 sm:w-11"
          aria-label="Open search"
          title="Search ( / )"
          onClick={() => {
            setExpanded(true)
            requestAnimationFrame(() => inputRef.current?.focus())
          }}
        >
          <SearchGlyph className="h-5 w-5" />
        </button>
      ) : (
        <div className="relative w-full min-w-0">
          <div className="relative">
            <SearchGlyph className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--hub-muted)] sm:left-3.5 sm:h-4 sm:w-4" />
            <input
              ref={inputRef}
              id="global-primary-search"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              placeholder="Search commands, tools, concepts, ports…"
              aria-label="Search commands, tools, concepts, and ports"
              aria-expanded={showPanel}
              aria-controls="global-search-suggestions"
              className="h-10 w-full min-w-0 rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 py-2 pl-10 pr-16 text-[13px] text-[var(--hub-text)] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.12)] outline-none ring-[var(--hub-tool)] placeholder:text-[var(--hub-muted)] focus:border-[var(--hub-tool)] focus:shadow-[0_0_0_3px_var(--hub-tool-dim)] dark:shadow-black/20 sm:h-11 sm:rounded-2xl sm:pl-11 sm:pr-20 sm:text-sm"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={() => setOpen(true)}
              onBlur={() => {
                requestAnimationFrame(() => {
                  if (!wrapRef.current?.contains(document.activeElement)) collapseIfEmpty()
                })
              }}
            />
            <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
              <button
                type="button"
                tabIndex={-1}
                aria-label={query ? 'Clear search' : 'Close search'}
                className="pointer-events-auto rounded-lg p-1.5 text-[var(--hub-muted)] transition-colors hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]"
                onMouseDown={(e) => {
                  e.preventDefault()
                  if (query) {
                    onQueryChange('')
                    inputRef.current?.focus()
                  } else {
                    setExpanded(false)
                    onQueryChange('')
                  }
                }}
              >
                <span className="text-lg leading-none" aria-hidden>
                  ×
                </span>
              </button>
              <kbd className="hidden rounded border border-[var(--hub-border2)] bg-[var(--hub-elevated)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--hub-muted)] sm:inline">
                /
              </kbd>
            </div>
          </div>

          {showPanel ? (
            <div
              id="global-search-suggestions"
              className="absolute left-0 right-0 top-full z-[120] mt-1 max-h-[min(50dvh,22rem)] w-full min-w-0 overflow-y-auto overscroll-contain rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)]/98 p-2 shadow-2xl backdrop-blur-md dark:bg-[var(--hub-elevated)]/98 sm:max-h-[min(70vh,28rem)] sm:rounded-2xl"
              role="listbox"
              aria-label="Search suggestions"
            >
              {!hasAny ? (
                <p className="px-3 py-6 text-center text-sm text-[var(--hub-muted)]">No matches. Try other keywords.</p>
              ) : (
                <>
                  {results.commands.length > 0 ? (
                    <div>
                      <div className={SECTION}>Commands</div>
                      {results.commands.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          role="option"
                          className={ROW}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onNavigate({ type: 'command', payload: c })
                            setOpen(false)
                          }}
                        >
                          <span className="mt-0.5 text-[var(--hub-tool)]" aria-hidden>
                            ⌘
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[var(--hub-text)]">{c.name}</span>
                            <span className="block truncate font-mono text-xs text-[var(--hub-sub)]">{c.command}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {results.tools.length > 0 ? (
                    <div>
                      <div className={SECTION}>Tools</div>
                      {results.tools.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          role="option"
                          className={ROW}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onNavigate({ type: 'tool', payload: t })
                            setOpen(false)
                          }}
                        >
                          <span className="text-lg" aria-hidden>
                            {t.logo || '🔧'}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[var(--hub-text)]">{t.name}</span>
                            <span className="line-clamp-2 text-xs text-[var(--hub-sub)]">{t.description}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {results.concepts.length > 0 ? (
                    <div>
                      <div className={SECTION}>Concepts</div>
                      {results.concepts.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          role="option"
                          className={ROW}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onNavigate({ type: 'concept', payload: c })
                            setOpen(false)
                          }}
                        >
                          <span className="text-lg" aria-hidden>
                            {c.icon || '💡'}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[var(--hub-text)]">{c.title}</span>
                            <span className="line-clamp-2 text-xs text-[var(--hub-sub)]">{c.summary?.[0]}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                  {results.ports.length > 0 ? (
                    <div>
                      <div className={SECTION}>Ports</div>
                      {results.ports.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          role="option"
                          className={ROW}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            onNavigate({ type: 'port', payload: p })
                            setOpen(false)
                          }}
                        >
                          <span className="font-mono text-sm font-bold text-indigo-600 dark:text-cyan-400" aria-hidden>
                            {p.port}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-[var(--hub-text)]">{p.service}</span>
                            <span className="line-clamp-2 text-xs text-[var(--hub-sub)]">{p.description}</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
})

GlobalSearchBar.displayName = 'GlobalSearchBar'

export default GlobalSearchBar
