import { Fragment, useMemo, useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PORT_FILTER_CATEGORIES, categoryLabelForPort } from '../../data/portsData'
import { filterPorts } from '../../utils/portsFilter'
import FilterChip from '../tools/FilterChip'

/** @type {Record<string, string>} */
const CONTEXT_BADGE_STYLES = {
  AWS: 'border-amber-400/40 bg-amber-50/90 text-amber-950 dark:border-amber-500/35 dark:bg-amber-950/50 dark:text-amber-100',
  Kubernetes: 'border-sky-400/40 bg-sky-50/90 text-sky-950 dark:border-sky-500/35 dark:bg-sky-950/50 dark:text-sky-100',
  Linux: 'border-slate-400/40 bg-slate-50/90 text-slate-900 dark:border-slate-500/35 dark:bg-slate-900/60 dark:text-slate-100',
  DevOps: 'border-violet-400/40 bg-violet-50/90 text-violet-950 dark:border-violet-500/35 dark:bg-violet-950/50 dark:text-violet-100',
}

function useLgUp() {
  const [lg, setLg] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const fn = () => setLg(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return lg
}

function PortFlowPanel({ flow }) {
  return (
    <div className="rounded-xl border border-indigo-300/40 bg-gradient-to-r from-indigo-50/95 via-white/80 to-cyan-50/80 p-3 shadow-sm dark:border-indigo-500/25 dark:from-indigo-950/50 dark:via-[var(--hub-elevated)] dark:to-cyan-950/30">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400/90">
        Traffic flow
      </p>
      <div className="flex min-w-0 flex-wrap items-stretch justify-start gap-1.5 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {flow.map((node, i) => (
          <Fragment key={node.id}>
            {i > 0 ? (
              <span
                className="flex shrink-0 items-center px-0.5 text-lg font-bold text-indigo-500 dark:text-cyan-400/90"
                aria-hidden
              >
                →
              </span>
            ) : null}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="min-w-[4.5rem] shrink-0 rounded-lg border border-indigo-200/70 bg-white/90 px-2.5 py-2 text-center shadow-sm dark:border-indigo-500/30 dark:bg-[var(--hub-surface)]"
            >
              <p className="text-xs font-bold leading-tight text-[var(--hub-text)]">{node.label}</p>
              {node.hint ? <p className="mt-0.5 text-[10px] text-[var(--hub-muted)]">{node.hint}</p> : null}
            </motion.div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function ExpandedBody({ port, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden border-t border-[var(--hub-line)] bg-[var(--hub-elevated)]/40"
    >
      <div className="space-y-4 p-4 sm:p-5">
        <PortFlowPanel flow={port.flow} />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Details</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--hub-text)]">{port.detail}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Real-world</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--hub-sub)]">{port.realWorld}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Commands</p>
          <ul className="mt-2 space-y-1.5">
            {port.commands.map((cmd, idx) => (
              <li key={idx}>
                <code className="block w-full overflow-x-auto rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-2 font-mono text-[11px] text-[var(--hub-text)] sm:text-xs">
                  {cmd}
                </code>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {port.contextBadges.map((b) => (
            <span
              key={b}
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${CONTEXT_BADGE_STYLES[b] || 'border-[var(--hub-line)] bg-[var(--hub-surface)]'}`}
            >
              {b}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-indigo-600 underline-offset-2 hover:underline dark:text-cyan-400/90"
        >
          Collapse
        </button>
      </div>
    </motion.div>
  )
}

/**
 * @param {{
 *   query: string
 *   activeCategoryId: string
 *   onSelectCategory: (id: string) => void
 * }} props
 */
export default function PortsPage({ query, activeCategoryId, onSelectCategory }) {
  const filtered = useMemo(() => filterPorts(query, activeCategoryId), [query, activeCategoryId])
  const isLg = useLgUp()
  const viewMode = isLg ? 'table' : 'card'
  const [expandedId, setExpandedId] = useState(/** @type {string | null} */ (null))

  const toggleExpand = useCallback((id) => {
    setExpandedId((cur) => (cur === id ? null : id))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-w-0 pb-8"
    >
      <div className="mb-4 flex min-w-0 flex-wrap gap-2">
        {PORT_FILTER_CATEGORIES.map((c) => {
          const active = activeCategoryId === c.id || (!activeCategoryId && c.id === 'all')
          const icons = {
            all: '✦',
            web: '🌍',
            database: '🗄',
            networking: '📡',
            devops: '⚙️',
            security: '🛡',
            monitoring: '📊',
            storage: '💾',
            general: '◎',
          }
          return (
            <FilterChip
              key={c.id}
              active={active}
              label={c.label}
              icon={icons[c.id] || '◇'}
              onClick={() => onSelectCategory(c.id)}
            />
          )
        })}
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-2xl border border-[var(--hub-line)] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] dark:shadow-black/30">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead className="sticky top-0 z-10 bg-[var(--hub-elevated)] shadow-sm backdrop-blur-sm">
              <tr className="border-b border-[var(--hub-line)]">
                <th scope="col" className="whitespace-nowrap px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Port
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Protocol
                </th>
                <th scope="col" className="min-w-[8rem] px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Service
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Category
                </th>
                <th scope="col" className="min-w-[12rem] px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Description
                </th>
                <th scope="col" className="whitespace-nowrap px-3 py-3 font-bold text-[var(--hub-text)] sm:px-4">
                  Use case
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <Fragment key={p.id}>
                  <motion.tr
                    layout
                    onClick={() => toggleExpand(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleExpand(p.id)
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={expandedId === p.id}
                    className={`cursor-pointer border-b border-[var(--hub-line)] transition-colors hover:bg-[var(--hub-tool-dim2)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--hub-tool)] ${
                      p.highlight ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                    }`}
                  >
                    <td className="whitespace-nowrap px-3 py-3 font-mono text-base font-bold text-indigo-600 dark:text-cyan-400 sm:px-4">
                      {p.port}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs font-mono text-[var(--hub-sub)] sm:px-4">{p.protocol}</td>
                    <td className="px-3 py-3 font-semibold text-[var(--hub-text)] sm:px-4">{p.service}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-xs text-[var(--hub-muted)] sm:px-4">
                      {categoryLabelForPort(p.categoryId)}
                    </td>
                    <td className="max-w-xs px-3 py-3 text-[var(--hub-sub)] sm:px-4">{p.description}</td>
                    <td className="px-3 py-3 sm:px-4">
                      <span className="inline-flex rounded-full border border-violet-300/50 bg-violet-50/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-900 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-100">
                        {p.useCaseLabel}
                      </span>
                    </td>
                  </motion.tr>
                  {expandedId === p.id ? (
                    <tr key={`${p.id}-exp`} className="bg-[var(--hub-elevated)]/30">
                      <td colSpan={6} className="p-0">
                        <AnimatePresence mode="wait">
                          <ExpandedBody key={p.id} port={p} onClose={() => setExpandedId(null)} />
                        </AnimatePresence>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-[var(--hub-muted)]">No ports match your filters.</p>
          ) : null}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              className={`flex flex-col overflow-hidden rounded-2xl border shadow-md transition-shadow hover:shadow-lg ${
                p.highlight
                  ? 'border-indigo-300/60 bg-gradient-to-br from-indigo-50/95 to-violet-50/60 dark:border-indigo-500/35 dark:from-indigo-950/50 dark:to-violet-950/40'
                  : 'border-[var(--hub-line)] bg-[var(--hub-card)]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleExpand(p.id)}
                className="flex flex-1 flex-col p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
                aria-expanded={expandedId === p.id}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-3xl font-black tabular-nums text-indigo-600 dark:text-cyan-400">{p.port}</span>
                  <span className="rounded-full border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--hub-muted)]">
                    {p.protocol}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[var(--hub-text)]">{p.service}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-[var(--hub-sub)]">{p.description}</p>
                <span className="mt-3 inline-flex w-fit rounded-full border border-violet-300/50 bg-violet-50/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-900 dark:border-violet-500/30 dark:bg-violet-950/50 dark:text-violet-100">
                  {p.useCaseLabel}
                </span>
                <span className="mt-3 text-xs font-semibold text-indigo-600 dark:text-cyan-400/90">
                  {expandedId === p.id ? '▼ Hide details' : '▶ Expand'}
                </span>
              </button>
              <AnimatePresence mode="wait">
                {expandedId === p.id ? (
                  <ExpandedBody key={p.id} port={p} onClose={() => setExpandedId(null)} />
                ) : null}
              </AnimatePresence>
            </motion.article>
          ))}
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-xl border border-dashed border-[var(--hub-line)] px-4 py-12 text-center text-sm text-[var(--hub-muted)]">
              No ports match your filters.
            </p>
          ) : null}
        </div>
      )}
    </motion.div>
  )
}
