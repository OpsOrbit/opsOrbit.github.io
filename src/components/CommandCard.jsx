import { useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import ToolIcon from './ToolIcon'
import { isDangerousCommand } from '../utils/commandSafety'

const levelStyles = {
  beginner: 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
  intermediate: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
  advanced: 'bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200',
}

export default function CommandCard({ command, index, onClick, toolLabel, levelLabel }) {
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const dangerous = isDangerousCommand(command.command)

  const copyOnly = useCallback(
    (e) => {
      e.stopPropagation()
      navigator.clipboard.writeText(command.command).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
    },
    [command.command]
  )

  return (
    <motion.article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="group/cmd relative cursor-pointer touch-manipulation overflow-hidden rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] shadow-[var(--hub-shadow-card)] outline-none transition-[border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-bg)] hover:border-[var(--hub-border2)]"
      style={{
        animationDelay: `${Math.min(index * 25, 280)}ms`,
      }}
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -2, transition: { type: 'spring', stiffness: 420, damping: 28 } }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.995 }}
    >
      {dangerous && (
        <span className="absolute left-0 top-0 z-[2] h-full w-1 rounded-r bg-hub-danger" aria-hidden />
      )}

      <div className={`relative border-b border-[var(--hub-line)] ${dangerous ? 'pl-1' : ''}`}>
        <pre
          className={`max-h-[5rem] overflow-x-auto overflow-y-auto px-2.5 py-2.5 font-mono text-[11px] font-medium leading-relaxed sm:text-[12px] ${
            dangerous
              ? 'bg-[var(--hub-danger-bg)] text-[var(--hub-danger)]'
              : 'bg-[var(--hub-code-bg)] text-[var(--hub-code-text)]'
          }`}
        >
          <code className="whitespace-pre-wrap break-all">{command.command}</code>
        </pre>
        <button
          type="button"
          className="absolute right-2 top-2 z-[3] rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)] opacity-100 shadow-sm backdrop-blur-sm transition-opacity duration-150 md:opacity-0 md:group-hover/cmd:opacity-100"
          onClick={copyOnly}
          title="Copy command"
          aria-label="Copy command to clipboard"
        >
          {copied ? '✓' : 'Copy'}
        </button>
      </div>

      <div className={`relative space-y-1.5 p-3 sm:p-3.5 ${dangerous ? 'pl-3' : ''}`}>
        {dangerous && (
          <p className="text-[11px] font-medium leading-snug text-hub-danger sm:text-xs">
            Potentially destructive — verify before running.
          </p>
        )}

        <p className="text-[12px] font-semibold leading-snug text-[var(--hub-text)] sm:text-[13px]">{command.name}</p>

        <div className="flex flex-wrap items-center gap-1.5 gap-y-2">
          {command.category && (
            <span
              className="max-w-[14rem] truncate rounded-md border border-[var(--hub-tool)]/25 bg-[var(--hub-tool-dim)] px-1.5 py-0.5 text-[9px] font-semibold text-[var(--hub-tool)]"
              title={command.category}
            >
              {command.category}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
            <ToolIcon tool={command.tool} className="inline-flex h-2.5 w-2.5 text-[var(--hub-muted)]" />
            {toolLabel(command.tool)}
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${levelStyles[command.level] || levelStyles.beginner}`}
          >
            {levelLabel(command.level)}
          </span>
        </div>
      </div>
    </motion.article>
  )
}
