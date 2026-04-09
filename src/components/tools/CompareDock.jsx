import { motion, AnimatePresence } from 'motion/react'
import { DEVOPS_TOOLS } from '../../data/toolsData'

/**
 * @param {{ ids: string[], onClear: () => void, onRemove: (id: string) => void }} props
 */
export default function CompareDock({ ids, onClear, onRemove }) {
  const tools = ids.map((id) => DEVOPS_TOOLS.find((t) => t.id === id)).filter(Boolean)

  return (
    <AnimatePresence>
      {tools.length > 0 ? (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] left-3 right-3 z-[90] rounded-2xl border border-indigo-400/30 bg-gradient-to-r from-indigo-600/95 to-violet-700/95 p-3 text-white shadow-2xl shadow-indigo-900/40 backdrop-blur-md lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-md"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">Compare</p>
              <p className="text-xs text-white/90">Select up to two tools ({tools.length}/2)</p>
            </div>
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg bg-white/15 px-2 py-1 text-xs font-bold uppercase tracking-wide hover:bg-white/25"
            >
              Clear
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {tools.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-1.5 rounded-lg bg-black/20 px-2 py-1 text-xs font-semibold"
              >
                {t.logo} {t.name}
                <button
                  type="button"
                  className="ml-1 rounded px-1 hover:bg-white/20"
                  onClick={() => onRemove(t.id)}
                  aria-label={`Remove ${t.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {tools.length === 2 ? (
            <p className="mt-2 border-t border-white/20 pt-2 text-[11px] leading-snug text-white/85">
              ⚖️ Compare UI: side-by-side deep-dive is on the roadmap. For now, open each card for full details.
            </p>
          ) : (
            <p className="mt-2 text-[11px] text-white/75">Add another tool with ⚖️ on a card to build a pair.</p>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
