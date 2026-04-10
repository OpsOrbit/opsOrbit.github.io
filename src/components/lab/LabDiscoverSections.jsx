import { motion } from 'motion/react'

/** First stops on a typical DevOps learning path — ids must exist in SCRIPTING_GUIDES */
const FEATURED_TOPIC_IDS = ['dockerfile', 'docker-compose', 'github-actions', 'kubernetes-manifest']

/**
 * @param {{
 *   guides: Array<{ id: string, title: string, tagline?: string }>
 *   onSelectTopic: (id: string) => void
 * }} props
 */
export default function LabDiscoverSections({ guides, onSelectTopic }) {
  const byId = Object.fromEntries(guides.map((g) => [g.id, g]))
  const featured = FEATURED_TOPIC_IDS.map((id) => byId[id]).filter(Boolean)

  if (featured.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
      aria-labelledby="lab-featured-topics-title"
    >
      <div className="mb-3">
        <h2 id="lab-featured-topics-title" className="text-lg font-bold tracking-tight text-[var(--hub-text)]">
          Featured labs
        </h2>
        <p className="text-xs text-[var(--hub-muted)]">Hands-on guides from images to CI and Kubernetes</p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((g) => (
          <motion.button
            key={g.id}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectTopic(g.id)}
            className="rounded-2xl border border-white/30 bg-gradient-to-br from-white/90 to-violet-50/30 p-4 text-left shadow-md backdrop-blur-sm transition hover:border-indigo-400/40 hover:shadow-lg dark:border-white/10 dark:from-[var(--hub-elevated)] dark:to-violet-950/25 dark:hover:border-cyan-500/30"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:text-cyan-400/90">LAB</p>
            <p className="mt-1 text-[15px] font-extrabold leading-snug text-[var(--hub-text)]">{g.title}</p>
            {g.tagline ? (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--hub-muted)]">{g.tagline}</p>
            ) : null}
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}
