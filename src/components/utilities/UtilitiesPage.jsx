import { useMemo, useEffect } from 'react'
import { motion } from 'motion/react'
import { UTILITIES_TOOLS, UTILITIES_TOOL_ORDER } from '../../data/utilitiesData'
import CidrPanel from './CidrPanel'
import Base64Panel from './Base64Panel'
import JsonPanel from './JsonPanel'
import PortPanel from './PortPanel'

/**
 * @param {{ query: string, activeToolId: string, onSelectTool: (id: string) => void }} props
 */
export default function UtilitiesPage({ query, activeToolId, onSelectTool }) {
  const visibleIds = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return UTILITIES_TOOL_ORDER
    return UTILITIES_TOOL_ORDER.filter((id) => {
      const t = UTILITIES_TOOLS.find((x) => x.id === id)
      if (!t) return false
      return (
        t.title.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        id.includes(q)
      )
    })
  }, [query])

  useEffect(() => {
    if (!visibleIds.length) return
    if (!visibleIds.includes(activeToolId)) onSelectTool(visibleIds[0])
  }, [visibleIds, activeToolId, onSelectTool])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-w-0 pb-10"
    >
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Tools</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--hub-brand)] sm:text-3xl">Utilities</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">
          Small DevOps helpers in the browser — CIDR math, Base64, JSON, and HTTP port probes (browser limits apply).
        </p>
      </div>

      <ul className="mb-8 grid list-none gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {visibleIds.map((id) => {
          const t = UTILITIES_TOOLS.find((x) => x.id === id)
          if (!t) return null
          const active = activeToolId === id
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelectTool(id)}
                className={`flex h-full w-full flex-col rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
                  active
                    ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] shadow-[inset_0_0_0_1px_var(--hub-tool)]'
                    : 'border-[var(--hub-line)] bg-[var(--hub-card)] hover:border-[var(--hub-tool)]/60 hover:shadow-sm'
                }`}
              >
                <span className="text-lg font-bold text-[var(--hub-text)]" aria-hidden>
                  {t.icon}
                </span>
                <span className="mt-2 text-sm font-extrabold text-[var(--hub-text)]">{t.title}</span>
                <span className="mt-1 text-xs leading-relaxed text-[var(--hub-muted)]">{t.shortDescription}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {visibleIds.length === 0 ? (
        <p className="mb-6 rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-4 py-8 text-center text-sm text-[var(--hub-muted)]">
          No utility matches your search. Clear the header search to see all tools.
        </p>
      ) : null}

      {visibleIds.length > 0 ? (
        <div className="rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-4 shadow-sm sm:p-6">
          {activeToolId === 'cidr' && <CidrPanel />}
          {activeToolId === 'base64' && <Base64Panel />}
          {activeToolId === 'json' && <JsonPanel />}
          {activeToolId === 'portcheck' && <PortPanel />}
        </div>
      ) : null}
    </motion.div>
  )
}
