import { useState, useCallback, useMemo } from 'react'
import { motion } from 'motion/react'
import {
  CHEATSHEET_TABS,
  CHEATSHEET_TAB_ORDER,
  getFilteredCheatsheetContent,
} from '../../data/cheatsheetsData'

/**
 * @param {{
 *   query: string
 *   activeTabId: string
 *   onSelectTab: (id: string) => void
 * }} props
 */
export default function CheatsheetsPage({ query, activeTabId, onSelectTab }) {
  const [copiedKey, setCopiedKey] = useState(null)

  const content = useMemo(
    () => getFilteredCheatsheetContent(activeTabId, query),
    [activeTabId, query]
  )

  const copy = useCallback(async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600)
    } catch {
      setCopiedKey(null)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-w-0 pb-8 max-lg:pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] lg:pb-10"
    >
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Reference</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--hub-brand)] sm:text-3xl">Cheatsheets</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">
          Copy-paste friendly commands for Git, Docker, Kubernetes, and Linux — use the header search to filter.
        </p>
      </div>

      <div
        className="mb-6 flex min-w-0 flex-wrap gap-2 border-b border-[var(--hub-line)] pb-4"
        role="tablist"
        aria-label="Cheatsheet tool"
      >
        {CHEATSHEET_TAB_ORDER.map((id) => {
          const t = CHEATSHEET_TABS.find((x) => x.id === id)
          if (!t) return null
          const active = activeTabId === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelectTab(id)}
              className={`flex min-h-[40px] shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
                active
                  ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1px_var(--hub-tool)]'
                  : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-line)] hover:text-[var(--hub-text)]'
              }`}
            >
              <span aria-hidden>{t.icon}</span>
              {t.label}
            </button>
          )
        })}
      </div>

      {content.sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-6 py-14 text-center">
          <p className="text-sm text-[var(--hub-muted)]">No commands match your search. Try another tab or clear the search.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {content.sections.map((sec) => (
            <section key={sec.title} className="min-w-0">
              <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--hub-muted)]">{sec.title}</h2>
              <div className="overflow-x-auto rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] shadow-sm">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--hub-line)] bg-[var(--hub-elevated)]/60">
                      <th className="px-3 py-2.5 font-semibold text-[var(--hub-text)] sm:px-4">Command</th>
                      <th className="hidden px-3 py-2.5 font-semibold text-[var(--hub-text)] sm:table-cell sm:px-4 md:w-[42%]">
                        Description
                      </th>
                      <th className="w-px whitespace-nowrap px-2 py-2.5 text-right font-semibold text-[var(--hub-text)] sm:px-4">
                        <span className="sr-only">Copy</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sec.rows.map((row, idx) => {
                      const key = `${sec.title}-${idx}-${row.cmd}`
                      const isImportant = Boolean(row.important)
                      return (
                        <tr
                          key={key}
                          className={`border-b border-[var(--hub-line)]/80 last:border-b-0 ${
                            isImportant
                              ? 'bg-[var(--hub-tool-dim)]/35 dark:bg-[var(--hub-tool-dim)]/25'
                              : 'bg-transparent'
                          }`}
                        >
                          <td className="align-top px-3 py-2.5 font-mono text-[13px] text-[var(--hub-text)] sm:px-4 sm:text-sm">
                            {isImportant ? (
                              <span className="inline-flex items-start gap-2">
                                <span
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--hub-tool)]"
                                  aria-hidden
                                />
                                <code className="break-all text-[var(--hub-text)]">{row.cmd}</code>
                              </span>
                            ) : (
                              <code className="break-all">{row.cmd}</code>
                            )}
                            <span className="mt-1 block text-[11px] text-[var(--hub-muted)] sm:hidden">{row.desc}</span>
                          </td>
                          <td className="hidden align-top px-3 py-2.5 text-[var(--hub-sub)] sm:table-cell sm:px-4">
                            {row.desc}
                          </td>
                          <td className="align-middle px-2 py-2 text-right sm:px-4">
                            <button
                              type="button"
                              onClick={() => copy(row.cmd, key)}
                              className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-card)] px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-[var(--hub-muted)] transition-colors hover:border-[var(--hub-tool)] hover:text-[var(--hub-tool)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
                            >
                              {copiedKey === key ? 'Copied' : 'Copy'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      )}
    </motion.div>
  )
}
