import { motion } from 'motion/react'

/**
 * Horizontal strip of first modules — scrolls to the module card in the path.
 *
 * @param {{
 *   steps: Array<{ id: string, mainTitle: string, panelTitle?: string }>
 * }} props
 */
export default function RoadmapPathHighlights({ steps }) {
  const slice = steps.slice(0, 5)

  const scrollToStep = (id) => {
    document.getElementById(`roadmap-step-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (slice.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 px-3 sm:px-5"
      aria-labelledby="roadmap-highlights-title"
    >
      <div className="tools-glass overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-r from-indigo-600/10 via-violet-600/5 to-cyan-500/10 p-4 shadow-lg backdrop-blur-xl dark:from-indigo-500/15 dark:via-violet-900/20 dark:to-cyan-900/10 sm:p-5">
        <h2 id="roadmap-highlights-title" className="text-sm font-bold text-[var(--hub-text)]">
          Start here
        </h2>
        <p className="mt-1 text-xs text-[var(--hub-muted)]">Jump to a module along the path (order still runs top to bottom)</p>
        <div className="mt-4 flex min-w-0 gap-2 overflow-x-auto overflow-y-hidden pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slice.map((step, i) => (
            <div key={step.id} className="flex shrink-0 items-center gap-2">
              {i > 0 ? (
                <span className="text-indigo-400/80 dark:text-cyan-400/60" aria-hidden>
                  →
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => scrollToStep(step.id)}
                className="max-w-[11rem] shrink-0 rounded-xl border border-white/40 bg-white/70 px-3 py-2.5 text-left text-xs font-bold text-[var(--hub-text)] shadow-sm backdrop-blur-sm transition hover:border-cyan-400/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500/40"
              >
                <span className="line-clamp-2">{step.panelTitle || step.mainTitle}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
