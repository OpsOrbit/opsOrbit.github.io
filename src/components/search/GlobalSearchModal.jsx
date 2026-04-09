import { useMemo, useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import { searchGlobal } from '../../utils/globalSearchIndex'

const SECTION = 'px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]'
const ROW =
  'flex w-full cursor-pointer items-start gap-2 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-[var(--hub-line)] hover:bg-[var(--hub-elevated)]'

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {(p: { type: string, payload: unknown }) => void} props.onNavigate
 */
export default function GlobalSearchModal({ open, onClose, onNavigate }) {
  const [q, setQ] = useState('')

  useEffect(() => {
    if (open) setQ('')
  }, [open])

  const results = useMemo(() => searchGlobal(q), [q])

  const hasAny =
    results.commands.length +
      results.tools.length +
      results.labs.length +
      results.techWords.length >
    0

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Search OpsOrbit"
      titleId="global-search-title"
      panelClassName="max-w-xl"
    >
      <div className="border-b border-[var(--hub-line)] p-3">
        <label htmlFor="global-search-input" className="sr-only">
          Search commands, tools, labs, and glossary
        </label>
        <input
          id="global-search-input"
          data-modal-initial-focus
          type="search"
          autoComplete="off"
          placeholder="Commands, tools, LAB topics, tech terms…"
          className="h-11 w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-bg)] px-3 text-sm text-[var(--hub-text)] outline-none ring-[var(--hub-tool)] placeholder:text-[var(--hub-muted)] focus:border-[var(--hub-tool)] focus:ring-2 focus:ring-[var(--hub-tool-dim)]"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <p className="mt-2 text-[11px] text-[var(--hub-muted)]">
          Tip: use the header search to filter the current workspace; this searches everywhere.
        </p>
      </div>

      <div className="pb-3">
        {!q.trim() ? (
          <p className="px-4 py-8 text-center text-sm text-[var(--hub-muted)]">Type to search across the platform.</p>
        ) : !hasAny ? (
          <p className="px-4 py-8 text-center text-sm text-[var(--hub-muted)]">No results found. Try different keywords.</p>
        ) : (
          <>
            {results.commands.length > 0 ? (
              <div>
                <div className={SECTION}>Commands</div>
                {results.commands.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={ROW}
                    onClick={() => {
                      onNavigate({ type: 'command', payload: c })
                      onClose()
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
                    className={ROW}
                    onClick={() => {
                      onNavigate({ type: 'tool', payload: t })
                      onClose()
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
            {results.labs.length > 0 ? (
              <div>
                <div className={SECTION}>LAB</div>
                {results.labs.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={ROW}
                    onClick={() => {
                      onNavigate({ type: 'lab', payload: g })
                      onClose()
                    }}
                  >
                    <span aria-hidden>🧪</span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-[var(--hub-text)]">{g.title}</span>
                      <span className="line-clamp-2 text-xs text-[var(--hub-sub)]">{g.tagline}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
            {results.techWords.length > 0 ? (
              <div>
                <div className={SECTION}>Tech words</div>
                {results.techWords.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    className={ROW}
                    onClick={() => {
                      onNavigate({ type: 'techword', payload: w })
                      onClose()
                    }}
                  >
                    <span aria-hidden>📘</span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-[var(--hub-text)]">{w.term}</span>
                      <span className="line-clamp-2 text-xs text-[var(--hub-sub)]">{w.shortDefinition}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </Modal>
  )
}
