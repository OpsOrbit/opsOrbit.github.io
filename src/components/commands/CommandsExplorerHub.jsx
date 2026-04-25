import { useMemo } from 'react'
import { motion } from 'motion/react'
import { compareTools } from '../../data/categoryOrder'
import ToolIcon from '../ToolIcon'
import { COMMAND_TOOL_SHORT_DESC } from '../../data/commandToolDescriptions'

const VIEW_BTN =
  'inline-flex min-h-[34px] w-full items-center justify-center gap-1 rounded-lg border border-indigo-200/70 bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-md shadow-indigo-500/25 transition hover:brightness-110 dark:border-indigo-500/40'

/**
 * Commands landing grid (tool chips live in `CommandsToolChipBar` in App so they stay visible).
 */
export default function CommandsExplorerHub({ summaries, toolLabel, onSelectTool }) {
  const byTool = useMemo(() => {
    const map = new Map()
    for (const row of summaries) {
      if (!map.has(row.tool)) map.set(row.tool, 0)
      map.set(row.tool, map.get(row.tool) + row.count)
    }
    return [...map.entries()]
      .sort(([a], [b]) => compareTools(a, b))
      .map(([tool, count]) => ({
        tool,
        count,
        label: toolLabel(tool),
        blurb: COMMAND_TOOL_SHORT_DESC[tool] || 'CLI commands and workflows.',
      }))
  }, [summaries, toolLabel])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="commands-workspace min-w-0 pb-2"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {byTool.map(({ tool, count, label, blurb }) => (
          <motion.article
            key={tool}
            layout
            className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/30 bg-gradient-to-br from-white/90 via-white/75 to-indigo-50/25 shadow-[0_4px_20px_-6px_rgba(79,70,229,0.12)] backdrop-blur-md dark:border-white/10 dark:from-[var(--hub-elevated)]/90 dark:via-[var(--hub-card)]/82 dark:to-indigo-950/20"
          >
            <div className="flex flex-1 flex-col p-2.5 sm:p-3">
              <div className="mb-2 flex items-start gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/50 bg-gradient-to-br from-slate-50 to-indigo-50/80 text-lg shadow-inner dark:border-white/10 dark:from-slate-800 dark:to-indigo-950/50">
                  <ToolIcon tool={tool} className="h-5 w-5 text-[var(--hub-muted)]" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-extrabold leading-tight text-[var(--hub-text)]">{label}</h3>
                  <p className="mt-0.5 font-mono text-[11px] font-bold tabular-nums text-[var(--hub-muted)]">{count} commands</p>
                </div>
              </div>
              <p className="mb-2 line-clamp-2 flex-1 text-[12px] leading-snug text-[var(--hub-sub)]">{blurb}</p>
              <button type="button" onClick={() => onSelectTool(tool)} className={VIEW_BTN}>
                <span aria-hidden>🔍</span> View commands
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  )
}
