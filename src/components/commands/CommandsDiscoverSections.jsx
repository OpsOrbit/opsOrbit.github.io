import { motion } from 'motion/react'
import ToolIcon from '../ToolIcon'

const QUICK_TOOLS = ['docker', 'git', 'kubernetes', 'linux', 'terraform', 'github-actions']

const LABELS = {
  docker: 'Containers',
  git: 'Git',
  kubernetes: 'K8s',
  linux: 'Linux',
  terraform: 'Terraform',
  'github-actions': 'CI/CD',
}

/**
 * Quick jumps into common CLI tool lists (sidebar-aligned).
 *
 * @param {{ onPickTool: (toolId: string) => void }} props
 */
export default function CommandsDiscoverSections({ onPickTool }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-6"
      aria-labelledby="commands-quick-tools-title"
    >
      <div className="mb-3">
        <h2 id="commands-quick-tools-title" className="text-lg font-bold tracking-tight text-[var(--hub-text)]">
          Popular entry points
        </h2>
        <p className="text-xs text-[var(--hub-muted)]">Jump straight to a tool — pairs with the sidebar</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {QUICK_TOOLS.map((tid) => (
          <motion.button
            key={tid}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onPickTool(tid)}
            className="flex min-h-[88px] flex-col items-start gap-2 rounded-2xl border border-white/30 bg-gradient-to-br from-white/90 to-indigo-50/40 p-3 text-left shadow-md backdrop-blur-sm transition hover:border-indigo-400/40 hover:shadow-lg dark:border-white/10 dark:from-[var(--hub-elevated)] dark:to-indigo-950/30 dark:hover:border-cyan-500/30"
          >
            <ToolIcon tool={tid} className="h-7 w-7 text-[var(--hub-muted)]" />
            <span className="text-[12px] font-bold leading-tight text-[var(--hub-text)]">
              {LABELS[tid] ?? tid}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}
