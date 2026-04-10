import { motion } from 'motion/react'
import { TECH_WORDS } from '../../data/techWordsData'

/** Curated “everyone should know” terms — stable ids from techWordsData */
const ESSENTIAL_TERM_IDS = ['dns', 'vpc', 'iam', 'pod', 'cicd-term', 'pipeline']

/** Small narrative chain: networking → cloud → K8s → delivery */
const FOUNDATION_CHAIN_IDS = ['dns', 'load-balancer', 'vpc', 'pod', 'deployment']

/**
 * @param {{ onPickTerm: (id: string) => void }} props
 */
export function EssentialTermsStrip({ onPickTerm }) {
  const terms = ESSENTIAL_TERM_IDS.map((id) => TECH_WORDS.find((t) => t.id === id)).filter(Boolean)

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
      aria-labelledby="essential-terms-title"
    >
      <div className="mb-3">
        <h2 id="essential-terms-title" className="text-lg font-bold tracking-tight text-[var(--hub-text)]">
          Essential terms
        </h2>
        <p className="text-xs text-[var(--hub-muted)]">Core vocabulary — tap to scroll and expand</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {terms.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPickTerm(t.id)}
            className="flex min-h-[88px] flex-col items-start rounded-2xl border border-white/30 bg-gradient-to-br from-white/90 to-indigo-50/40 p-3 text-left shadow-md backdrop-blur-sm transition hover:border-indigo-400/40 hover:shadow-lg dark:border-white/10 dark:from-[var(--hub-elevated)] dark:to-indigo-950/30 dark:hover:border-cyan-500/30"
          >
            <span className="line-clamp-2 text-[12px] font-bold leading-tight text-[var(--hub-text)]">{t.term}</span>
            <span className="mt-1 line-clamp-2 text-[10px] text-[var(--hub-muted)]">{t.shortDefinition}</span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}

/**
 * @param {{ onPickTerm: (id: string) => void }} props
 */
export function FoundationConceptChain({ onPickTerm }) {
  const chain = FOUNDATION_CHAIN_IDS.map((id) => TECH_WORDS.find((t) => t.id === id)).filter(Boolean)

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="tools-glass mb-6 overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-r from-indigo-600/10 via-violet-600/5 to-cyan-500/10 p-4 shadow-lg backdrop-blur-xl dark:from-indigo-500/15 dark:via-violet-900/20 dark:to-cyan-900/10 sm:p-5"
      aria-labelledby="foundation-chain-title"
    >
      <h2 id="foundation-chain-title" className="text-sm font-bold text-[var(--hub-text)]">
        Foundation path
      </h2>
      <p className="mt-1 text-xs text-[var(--hub-muted)]">From DNS to workloads — follow the chain or jump in anywhere</p>
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
              onClick={() => onPickTerm(t.id)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/40 bg-white/70 px-3 py-2 text-left text-xs font-bold text-[var(--hub-text)] shadow-sm backdrop-blur-sm transition hover:border-cyan-400/50 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500/40 sm:min-h-0"
            >
              <span className="max-w-[9rem] truncate sm:max-w-none">{t.term}</span>
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
