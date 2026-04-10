import { useEffect } from 'react'
import { motion } from 'motion/react'
import { ARCHITECTURES, getArchitectureById } from '../../data/architectureData'
import ArchitectureFlowStrip from './ArchitectureFlowStrip'
import { ArchitectureDiagram } from './ArchitectureDiagrams'
import Modal from '../ui/Modal'

/**
 * @param {{
 *   selectedArchitectureId: string | null
 *   onSelectArchitecture: (id: string | null) => void
 * }} props
 */
export default function ArchitecturePage({ selectedArchitectureId, onSelectArchitecture }) {
  const selected = selectedArchitectureId ? getArchitectureById(selectedArchitectureId) : null

  useEffect(() => {
    if (!selectedArchitectureId) return
    const found = getArchitectureById(selectedArchitectureId)
    if (!found) onSelectArchitecture(null)
  }, [selectedArchitectureId, onSelectArchitecture])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-w-0 pb-10"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Reference</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--hub-brand)] sm:text-3xl">Architecture</h1>
        <p className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">
          High-level diagrams for common cloud and DevOps patterns — how traffic, compute, and data fit together.
        </p>
      </div>

      <div className="mb-10">
        <ArchitectureFlowStrip />
      </div>

      <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Patterns</p>
      <ul className="grid list-none gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {ARCHITECTURES.map((a, idx) => (
          <li key={a.id}>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              whileHover={{ y: -3 }}
              onClick={() => onSelectArchitecture(a.id)}
              className="flex h-full w-full flex-col rounded-2xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 text-left shadow-sm transition-shadow hover:border-[var(--hub-tool)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)]"
            >
              <span className="text-lg" aria-hidden>
                {idx === 0 ? '☁' : idx === 1 ? '↔' : idx === 2 ? '☸' : '◇'}
              </span>
              <span className="mt-2 text-base font-extrabold leading-snug text-[var(--hub-text)]">{a.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-[var(--hub-muted)]">{a.shortDescription}</span>
              <span className="mt-3 text-xs font-semibold text-[var(--hub-tool)]">View diagram →</span>
            </motion.button>
          </li>
        ))}
      </ul>

      <Modal
        open={Boolean(selected)}
        onClose={() => onSelectArchitecture(null)}
        title={selected?.title ?? 'Architecture'}
        titleId="architecture-modal-title"
        panelClassName="max-w-2xl max-h-[min(92vh,720px)] overflow-hidden flex flex-col"
      >
        {selected ? (
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-1">
            <p className="text-sm leading-relaxed text-[var(--hub-muted)]">{selected.shortDescription}</p>

            <div
              className="mt-4 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-elevated)]/50 p-4"
              data-modal-initial-focus
              tabIndex={0}
            >
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Diagram</p>
              <div className="overflow-x-auto">
                <ArchitectureDiagram diagramKey={selected.diagramKey} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Components</p>
              {selected.components.map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-surface)] p-4 shadow-sm"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">{c.label}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--hub-text)]">{c.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--hub-sub)]">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </motion.div>
  )
}
