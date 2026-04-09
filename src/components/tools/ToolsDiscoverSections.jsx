import { motion } from 'motion/react'
import { DEVOPS_TOOLS } from '../../data/toolsData'

const STACK_IDS = ['git', 'github', 'jenkins', 'docker', 'kubernetes', 'prometheus']

/**
 * @param {{ onPickTool: (id: string) => void }} props
 */
export function RecommendedStack({ onPickTool }) {
  const chain = STACK_IDS.map((id) => DEVOPS_TOOLS.find((t) => t.id === id)).filter(Boolean)

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="tools-glass mb-6 overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-r from-indigo-600/10 via-violet-600/5 to-cyan-500/10 p-4 shadow-lg backdrop-blur-xl dark:from-indigo-500/15 dark:via-violet-900/20 dark:to-cyan-900/10 sm:p-5"
      aria-labelledby="recommended-stack-title"
    >
      <h2 id="recommended-stack-title" className="text-sm font-bold text-[var(--hub-text)]">
        Recommended stack
      </h2>
      <p className="mt-1 text-xs text-[var(--hub-muted)]">A common path from code to production observability — tap a tool.</p>
      <div className="mt-4 flex min-w-0 flex-wrap items-center justify-center gap-1 sm:justify-start">
        {chain.map((t, i) => (
          <div key={t.id} className="flex items-center gap-1">
            {i > 0 ? (
              <motion.span
                className="hidden text-indigo-400/90 dark:text-cyan-400/80 sm:inline"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.1 }}
                aria-hidden
              >
                →
              </motion.span>
            ) : null}
            <button
              type="button"
              onClick={() => onPickTool(t.id)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/40 bg-white/70 px-3 py-2 text-left text-xs font-bold text-[var(--hub-text)] shadow-sm backdrop-blur-sm transition hover:border-cyan-400/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500/40 sm:min-h-0"
            >
              <span className="text-lg" aria-hidden>
                {t.logo}
              </span>
              <span className="max-w-[7rem] truncate sm:max-w-none">{t.name}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

/**
 * @param {{ onPickTool: (id: string) => void }} props
 */
export function TopToolsStrip({ onPickTool }) {
  const top = [...DEVOPS_TOOLS].filter((t) => t.popularity === 'popular').slice(0, 6)

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="mb-6"
      aria-labelledby="top-tools-title"
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id="top-tools-title" className="text-lg font-bold tracking-tight text-[var(--hub-text)]">
            Top tools
          </h2>
          <p className="text-xs text-[var(--hub-muted)]">Popular picks across teams — quick access</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {top.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPickTool(t.id)}
            className="flex min-h-[88px] flex-col items-start rounded-2xl border border-white/30 bg-gradient-to-br from-white/90 to-indigo-50/40 p-3 text-left shadow-md backdrop-blur-sm transition hover:border-indigo-400/40 hover:shadow-lg dark:border-white/10 dark:from-[var(--hub-elevated)] dark:to-indigo-950/30 dark:hover:border-cyan-500/30"
          >
            <span className="text-2xl" aria-hidden>
              {t.logo}
            </span>
            <span className="mt-2 line-clamp-2 text-[12px] font-bold leading-tight text-[var(--hub-text)]">{t.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}
