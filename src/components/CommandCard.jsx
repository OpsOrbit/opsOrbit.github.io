import { Fragment, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import ToolIcon from './ToolIcon'
import { isDangerousCommand } from '../utils/commandSafety'
import { useCommandsWorkspace } from '../context/CommandsWorkspaceContext'

const levelStyles = {
  beginner: 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
  intermediate: 'bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
  advanced: 'bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200',
}

function ActionBtn({ children, onClick, title, active, className = '' }) {
  return (
    <button
      type="button"
      title={title}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
      className={`rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[var(--hub-text)] transition-all duration-200 hover:border-hub-primary/40 hover:text-hub-primary active:scale-[0.98] dark:bg-[var(--hub-elevated)]/80 sm:text-[11px] ${active ? 'border-amber-400/60 text-amber-700 dark:text-amber-300' : ''} ${className}`}
    >
      {children}
    </button>
  )
}

function CommandFlowViz({ steps }) {
  if (!steps?.length) return null
  return (
    <div className="mt-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">Typical flow</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {steps.map((s, i) => (
          <Fragment key={`${i}-${s.slice(0, 24)}`}>
            {i > 0 ? (
              <span className="text-[11px] font-black text-[var(--hub-tool)]" aria-hidden>
                →
              </span>
            ) : null}
            <span
              className="max-w-[min(100%,200px)] truncate rounded-lg border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] px-2 py-1 font-mono text-[10px] text-[var(--hub-code-text)] sm:text-[11px]"
              title={s}
            >
              {s}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default function CommandCard({
  command,
  enriched,
  index,
  onOpenExplain,
  toolLabel,
  levelLabel,
  relatedCommands = [],
  flowSteps = [],
  realUseCaseText = '',
}) {
  const reduceMotion = useReducedMotion()
  const ctx = useCommandsWorkspace()
  const learnMode = ctx?.learnMode ?? 'learn'
  const expandedCommandId = ctx?.expandedCommandId
  const setExpandedCommandId = ctx?.setExpandedCommandId
  const isFavorite = ctx?.isFavorite?.(command.id) ?? false
  const toggleFavorite = ctx?.toggleFavorite

  const expanded = expandedCommandId === command.id
  const toggleExpand = useCallback(() => {
    setExpandedCommandId?.((id) => (id === command.id ? null : command.id))
  }, [command.id, setExpandedCommandId])

  const [copied, setCopied] = useState(false)
  const [simulated, setSimulated] = useState(false)
  const dangerous = isDangerousCommand(command.command)

  const copyCmd = useCallback(() => {
    navigator.clipboard.writeText(command.command).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }, [command.command])

  const runSim = useCallback(() => {
    setSimulated(true)
    window.setTimeout(() => setSimulated(false), 2200)
  }, [])

  const desc = command.description || ''
  const exampleOut = enriched?.exampleOutput
  const example = enriched?.example

  return (
    <motion.article
      layout={!reduceMotion}
      data-command-id={command.id}
      style={{
        animationDelay: `${Math.min(index * 25, 280)}ms`,
      }}
      initial={false}
      whileHover={
        reduceMotion || expanded
          ? undefined
          : { y: -2, transition: { type: 'spring', stiffness: 420, damping: 28 } }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.997 }}
      animate={
        reduceMotion
          ? undefined
          : {
              boxShadow: expanded
                ? '0 0 0 2px var(--hub-primary), 0 12px 40px -12px rgba(0,0,0,0.15)'
                : '0 1px 3px rgba(0,0,0,0.06)',
            }
      }
      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      className={`group/cmd relative overflow-hidden rounded-xl border bg-[var(--hub-card)] outline-none transition-[border-color] duration-200 focus-within:ring-2 focus-within:ring-[var(--hub-tool)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--hub-bg)] ${
        expanded
          ? 'border-hub-primary/50 ring-1 ring-hub-primary/20'
          : 'border-[var(--hub-line)] shadow-[var(--hub-shadow-card)] hover:border-[var(--hub-border2)]'
      }`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key !== 'Enter') return
        const tag = e.target?.tagName
        if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT') return
        e.preventDefault()
        toggleExpand()
      }}
    >
      {dangerous && (
        <span className="absolute left-0 top-0 z-[2] h-full w-1 rounded-r bg-hub-danger" aria-hidden />
      )}

      <div className={`relative border-b border-[var(--hub-line)] ${dangerous ? 'pl-1' : ''}`}>
        <button
          type="button"
          aria-expanded={expanded}
          className="flex w-full touch-manipulation text-left transition-colors hover:bg-[var(--hub-tool-dim)]/20"
          onClick={toggleExpand}
        >
          <pre
            className={`max-h-[5rem] min-w-0 flex-1 overflow-x-auto overflow-y-auto px-2.5 py-2.5 pr-14 font-mono text-[11px] font-medium leading-relaxed sm:text-[12px] ${
              dangerous
                ? 'bg-[var(--hub-danger-bg)] text-[var(--hub-danger)]'
                : 'bg-[var(--hub-code-bg)] text-[var(--hub-code-text)]'
            }`}
          >
            <code className="whitespace-pre-wrap break-all">{command.command}</code>
          </pre>
        </button>
        <div className="absolute right-2 top-2 z-[3] flex items-center gap-1">
          <span
            className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold text-[var(--hub-muted)] transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
            aria-hidden
          >
            ▾
          </span>
          <button
            type="button"
            className="rounded-md border border-[var(--hub-border2)] bg-[var(--hub-surface)]/95 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-[var(--hub-tool)] shadow-sm backdrop-blur-sm transition-opacity duration-150 hover:border-hub-primary/40"
            onClick={(e) => {
              e.stopPropagation()
              copyCmd()
            }}
            title="Copy command"
            aria-label="Copy command to clipboard"
          >
            {copied ? '✓' : 'Copy'}
          </button>
        </div>
      </div>

      <div className={`relative space-y-2 p-3 sm:p-3.5 ${dangerous ? 'pl-3' : ''}`}>
        {dangerous && (
          <p className="text-[11px] font-medium leading-snug text-hub-danger sm:text-xs">
            Potentially destructive — verify before running.
          </p>
        )}

        <div className="flex flex-wrap items-start justify-between gap-2">
          <button type="button" className="min-w-0 flex-1 text-left" onClick={toggleExpand}>
            <p className="text-[12px] font-semibold leading-snug text-[var(--hub-text)] sm:text-[13px]">{command.name}</p>
          </button>
          <div className="flex shrink-0 flex-wrap justify-end gap-1">
            <ActionBtn title="Copy" onClick={copyCmd}>
              {copied ? 'Copied' : 'Copy'}
            </ActionBtn>
            <ActionBtn title="Simulated run (no shell execution)" onClick={runSim}>
              Run
            </ActionBtn>
            <ActionBtn
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              onClick={() => toggleFavorite?.(command.id)}
              active={isFavorite}
            >
              {isFavorite ? 'Saved' : 'Save'}
            </ActionBtn>
            <ActionBtn title="Open full explanation panel" onClick={() => onOpenExplain?.(command)}>
              Explain
            </ActionBtn>
          </div>
        </div>

        {learnMode === 'learn' && desc && !expanded && (
          <p className="line-clamp-2 text-[11px] leading-relaxed text-[var(--hub-sub)] sm:text-[12px]">{desc}</p>
        )}

        <AnimatePresence>
          {simulated && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-[11px] font-medium text-emerald-800 dark:text-emerald-200"
              role="status"
            >
              Simulated: command would run in your terminal — nothing was executed on this machine.
            </motion.p>
          )}
        </AnimatePresence>

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

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expand"
              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
              animate={reduceMotion ? undefined : { height: 'auto', opacity: 1 }}
              exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="overflow-hidden border-t border-[var(--hub-line)]/80 pt-3"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                    Description
                  </h4>
                  <p className="text-[13px] leading-relaxed text-[var(--hub-sub)]">{desc || '—'}</p>
                </div>

                <div>
                  <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                    Real use case
                  </h4>
                  <p className="text-[13px] leading-relaxed text-[var(--hub-sub)]">{realUseCaseText}</p>
                </div>

                {example && (
                  <div>
                    <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                      Example
                    </h4>
                    <pre className="overflow-x-auto rounded-lg border border-[var(--hub-code-bd)] bg-[var(--hub-code-bg)] p-3 font-mono text-[11px] leading-relaxed text-[var(--hub-code-text)] sm:text-[12px]">
                      {example}
                    </pre>
                  </div>
                )}

                {exampleOut && (
                  <div>
                    <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                      Output preview
                    </h4>
                    <pre className="max-h-48 overflow-auto rounded-lg border border-[var(--hub-line)] bg-[var(--hub-bg)] p-3 font-mono text-[11px] leading-relaxed text-[var(--hub-sub)] dark:bg-[var(--hub-elevated)]/50 sm:text-[12px]">
                      {exampleOut}
                    </pre>
                  </div>
                )}

                <CommandFlowViz steps={flowSteps} />

                {relatedCommands.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--hub-muted)]">
                      Related commands
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {relatedCommands.map((rc) => (
                        <li key={rc.id}>
                          <button
                            type="button"
                            className="w-full rounded-lg border border-[var(--hub-line)] bg-[var(--hub-surface)] px-3 py-2.5 text-left transition-all duration-200 hover:border-hub-primary/35 hover:shadow-sm dark:bg-[var(--hub-elevated)]/40"
                            onClick={(e) => {
                              e.stopPropagation()
                              ctx?.setExpandedCommandId?.(rc.id)
                              requestAnimationFrame(() => {
                                document
                                  .querySelector(`[data-command-id="${rc.id}"]`)
                                  ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                              })
                            }}
                          >
                            <code className="block font-mono text-[11px] text-[var(--hub-tool)] sm:text-xs">{rc.command}</code>
                            <span className="mt-0.5 block text-[12px] text-[var(--hub-sub)]">{rc.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {learnMode === 'quick' && !expanded && (
          <p className="text-[10px] text-[var(--hub-faint)]">Enter — expand · Explain — full article</p>
        )}
      </div>
    </motion.article>
  )
}
