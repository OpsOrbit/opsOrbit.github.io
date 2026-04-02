import { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import ToolIcon from './ToolIcon'
import { isDangerousCommand } from '../utils/commandSafety'
import { useCommandsWorkspace } from '../context/CommandsWorkspaceContext'
import {
  buildStepBreakdown,
  defaultCommonMistakes,
  buildSimulationLines,
  buildVisualFlow,
} from '../utils/commandPanelBreakdown'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'breakdown', label: 'Breakdown' },
  { id: 'output', label: 'Output' },
  { id: 'useCase', label: 'Use case' },
  { id: 'related', label: 'Related' },
]

function levelBadgeClass(level) {
  if (level === 'beginner') {
    return 'bg-emerald-500/15 text-emerald-800 ring-1 ring-emerald-500/25 dark:text-emerald-200'
  }
  if (level === 'intermediate') {
    return 'bg-amber-500/15 text-amber-900 ring-1 ring-amber-500/25 dark:text-amber-200'
  }
  if (level === 'advanced') {
    return 'bg-rose-500/15 text-rose-900 ring-1 ring-rose-500/25 dark:text-rose-200'
  }
  return 'bg-hub-border2/40 text-hub-muted ring-1 ring-hub-line'
}

function TabButton({ id, label, active, onSelect }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={`command-panel-tab-${id}`}
      id={`command-panel-tab-btn-${id}`}
      onClick={() => onSelect(id)}
      className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary focus-visible:ring-offset-2 focus-visible:ring-offset-hub-surface ${
        active
          ? 'bg-hub-primary text-white shadow-sm dark:text-[#0d1117]'
          : 'text-hub-muted hover:bg-hub-elevated hover:text-hub-text'
      }`}
    >
      {label}
    </button>
  )
}

export default function CommandPanel({
  command,
  suggestedCommands = [],
  onSelectCommand,
  onClose,
  toolLabel,
  levelLabel,
  resolveCommandByLine,
}) {
  const ctx = useCommandsWorkspace()
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState('overview')
  const [editedCommand, setEditedCommand] = useState(command.command || '')
  const [editingCmd, setEditingCmd] = useState(false)
  const [simVisible, setSimVisible] = useState(0)
  const [simRunning, setSimRunning] = useState(false)
  const simTimerRef = useRef(null)

  const effectiveCommand = useMemo(
    () => (editedCommand.trim() ? editedCommand.trim() : command.command),
    [editedCommand, command.command]
  )

  const dangerous = isDangerousCommand(effectiveCommand)
  const favorite = ctx?.isFavorite?.(command.id) ?? false
  const learned = ctx?.isLearned?.(command.id) ?? false

  const steps = useMemo(() => buildStepBreakdown({ ...command, command: effectiveCommand }, command), [command, effectiveCommand])
  const mistakes = useMemo(() => defaultCommonMistakes(command.tool, command), [command])
  const simLines = useMemo(
    () => buildSimulationLines({ ...command, command: effectiveCommand }, command),
    [command, effectiveCommand]
  )
  const flowSteps = useMemo(
    () => buildVisualFlow({ ...command, command: effectiveCommand }, command, suggestedCommands),
    [command, effectiveCommand, suggestedCommands]
  )

  useEffect(() => {
    setEditedCommand(command.command || '')
    setEditingCmd(false)
    setTab('overview')
    setSimVisible(0)
    setSimRunning(false)
  }, [command.id, command.command])

  useEffect(() => {
    return () => {
      if (simTimerRef.current) clearTimeout(simTimerRef.current)
    }
  }, [])

  const copy = useCallback(() => {
    navigator.clipboard.writeText(effectiveCommand).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    })
  }, [effectiveCommand])

  const stopSimulation = useCallback(() => {
    if (simTimerRef.current) clearTimeout(simTimerRef.current)
    simTimerRef.current = null
    setSimRunning(false)
  }, [])

  const startSimulation = useCallback(() => {
    stopSimulation()
    if (reduceMotion) {
      setSimVisible(simLines.length)
      setSimRunning(false)
      return
    }
    setSimVisible(1)
    setSimRunning(true)
  }, [stopSimulation, reduceMotion, simLines.length])

  useEffect(() => {
    if (!simRunning) return
    if (simVisible >= simLines.length) {
      setSimRunning(false)
      return
    }
    const delay = reduceMotion ? 0 : simLines[simVisible]?.startsWith('$') ? 360 : 90
    simTimerRef.current = setTimeout(() => {
      setSimVisible((n) => n + 1)
    }, delay)
    return () => {
      if (simTimerRef.current) clearTimeout(simTimerRef.current)
    }
  }, [simRunning, simVisible, simLines, reduceMotion])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      const t = e.target
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || t?.isContentEditable) return
      if (e.key === 'c' || e.key === 'C') {
        if (e.ctrlKey || e.metaKey || e.altKey) return
        e.preventDefault()
        copy()
      }
      if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey || e.altKey) return
        e.preventDefault()
        startSimulation()
      }
    }
    document.addEventListener('keydown', handleKey)
    document.body.classList.add('panel-open')
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.classList.remove('panel-open')
    }
  }, [onClose, copy, startSimulation])

  const toggleFavorite = () => ctx?.toggleFavorite?.(command.id)
  const toggleLearned = () => ctx?.toggleLearned?.(command.id)

  const placeholderImg = '/images/commands/placeholder.svg'

  const pickCommandFromFlow = (line) => {
    const resolved = resolveCommandByLine?.(line)
    if (resolved) onSelectCommand?.(resolved)
  }

  const tabContentVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
    >
      <button
        type="button"
        className="absolute inset-0 bg-hub-text/40 backdrop-blur-sm dark:bg-black/60"
        onClick={onClose}
        aria-label="Close panel"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="panel-title"
        initial={reduceMotion ? false : { x: '100%', opacity: 0.96 }}
        animate={{ x: 0, opacity: 1 }}
        exit={reduceMotion ? undefined : { x: '100%', opacity: 0.96 }}
        transition={{ type: 'spring', stiffness: 420, damping: 38, mass: 0.85 }}
        className="relative flex h-full min-h-[100dvh] w-full max-w-full flex-col border-l-0 border-hub-line bg-hub-surface shadow-2xl sm:max-w-lg sm:border-l dark:shadow-black/40"
      >
        <header className="sticky top-0 z-20 shrink-0 border-b border-hub-line bg-hub-surface/95 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] backdrop-blur-md sm:px-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 id="panel-title" className="text-lg font-bold leading-snug text-hub-text sm:text-xl">
                {command.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-hub-tool-dim2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-hub-primary ring-1 ring-hub-tool-dim">
                  <ToolIcon tool={command.tool} className="h-3 w-3" />
                  {toolLabel(command.tool)}
                </span>
                {command.category ? (
                  <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sky-800 ring-1 ring-sky-500/20 dark:text-sky-200">
                    {command.category}
                  </span>
                ) : null}
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${levelBadgeClass(command.level)}`}>
                  {levelLabel(command.level)}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-lg border border-hub-line text-xl text-hub-muted transition-colors hover:bg-hub-elevated hover:text-hub-text focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary"
              onClick={onClose}
              aria-label="Close panel"
            >
              ×
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={toggleFavorite}
              className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary ${
                favorite
                  ? 'border-amber-400/50 bg-amber-500/10 text-amber-800 dark:text-amber-200'
                  : 'border-hub-line text-hub-muted hover:border-hub-primary/30 hover:bg-hub-elevated hover:text-hub-text'
              }`}
              aria-pressed={favorite}
            >
              <span className="text-base" aria-hidden>
                {favorite ? '★' : '☆'}
              </span>
              {favorite ? 'Favorited' : 'Favorite'}
            </button>
            <button
              type="button"
              onClick={toggleLearned}
              className={`inline-flex min-h-[40px] items-center rounded-lg border px-3 py-2 text-xs font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary ${
                learned
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                  : 'border-hub-line text-hub-muted hover:border-hub-primary/30 hover:bg-hub-elevated hover:text-hub-text'
              }`}
              aria-pressed={learned}
            >
              {learned ? 'Learned ✓' : 'Mark as learned'}
            </button>
          </div>
          <p className="mt-2 text-[10px] text-hub-faint">
            Shortcuts: <kbd className="rounded border border-hub-line bg-hub-elevated px-1 font-mono">c</kbd> copy ·{' '}
            <kbd className="rounded border border-hub-line bg-hub-elevated px-1 font-mono">r</kbd> run sim ·{' '}
            <kbd className="rounded border border-hub-line bg-hub-elevated px-1 font-mono">Esc</kbd> close
          </p>
          <div
            className="mt-3 flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Panel sections"
          >
            {TABS.map((t) => (
              <TabButton key={t.id} id={t.id} label={t.label} active={tab === t.id} onSelect={setTab} />
            ))}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              role="tabpanel"
              id={`command-panel-tab-${tab}`}
              aria-labelledby={`command-panel-tab-btn-${tab}`}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={tabContentVariants}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {tab === 'overview' && (
                <>
                  <motion.section
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden rounded-xl border border-[#1e293b] bg-[#0f172a] shadow-inner ring-1 ring-black/20 dark:border-[#334155] dark:bg-[#0b1120]"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/90" />
                      <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        terminal
                      </span>
                    </div>
                    <div className="p-3 sm:p-4">
                      {editingCmd ? (
                        <textarea
                          value={editedCommand}
                          onChange={(e) => setEditedCommand(e.target.value)}
                          rows={4}
                          className="mb-3 w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-[13px] leading-relaxed text-emerald-100 placeholder:text-slate-600 focus:border-hub-primary/50 focus:outline-none focus:ring-1 focus:ring-hub-primary/40"
                          spellCheck={false}
                          aria-label="Edit command"
                        />
                      ) : (
                        <pre
                          className={`mb-3 overflow-x-auto whitespace-pre-wrap break-all rounded-lg border border-white/5 bg-black/30 px-3 py-2.5 font-mono text-[13px] leading-relaxed ${
                            dangerous ? 'text-red-300' : 'text-emerald-100'
                          }`}
                        >
                          {effectiveCommand}
                        </pre>
                      )}
                      {dangerous && (
                        <p className="mb-3 text-xs font-medium text-red-300/90">
                          Destructive or privileged — verify targets before running for real.
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={copy}
                          className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-hub-primary px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-hub-primary-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 dark:text-[#0d1117]"
                        >
                          {copied ? '✓ Copied' : 'Copy'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTab('output')
                            startSimulation()
                          }}
                          className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary"
                        >
                          Run (sim)
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingCmd((e) => !e)}
                          className="inline-flex min-h-[40px] items-center rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary"
                        >
                          {editingCmd ? 'Done editing' : 'Edit'}
                        </button>
                      </div>
                    </div>
                  </motion.section>

                  <p className="text-base leading-relaxed text-hub-sub">{command.description}</p>

                  {command.image && (
                    <div>
                      <img
                        src={command.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="max-h-52 w-full rounded-xl border border-hub-line bg-hub-code object-contain"
                        onError={(e) => {
                          e.target.src = placeholderImg
                        }}
                      />
                    </div>
                  )}

                  {command.explanation && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-hub-muted">Explanation</h3>
                      <div
                        className="prose-hub text-base leading-relaxed text-hub-sub"
                        dangerouslySetInnerHTML={{ __html: command.explanation }}
                      />
                    </div>
                  )}

                  {command.whyNeed && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-hub-muted">Why we need it</h3>
                      <p className="text-base leading-relaxed text-hub-sub">{command.whyNeed}</p>
                    </div>
                  )}

                  {command.commonOptions && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-hub-muted">Common options</h3>
                      <p className="text-base leading-relaxed text-hub-sub">{command.commonOptions}</p>
                    </div>
                  )}
                </>
              )}

              {tab === 'breakdown' && (
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-hub-muted">Step-by-step breakdown</h3>
                  <ol className="space-y-3">
                    {steps.map((s) => (
                      <motion.li
                        key={s.step}
                        initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: reduceMotion ? 0 : s.step * 0.04 }}
                        className="rounded-xl border border-hub-line bg-hub-card p-3 shadow-sm"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wide text-hub-faint">Step {s.step}</span>
                        <code className="mt-1 block font-mono text-sm font-semibold text-hub-primary dark:text-hub-accent">
                          {s.part}
                        </code>
                        <p className="mt-1.5 text-sm leading-relaxed text-hub-sub">{s.meaning}</p>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              )}

              {tab === 'output' && (
                <div className="space-y-5">
                  {(command.example || command.exampleOutput) && (
                    <div>
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-hub-muted">Example</h3>
                      {command.example && (
                        <pre className="mb-3 overflow-x-auto rounded-xl border border-hub-line bg-hub-code p-4 font-mono text-sm leading-relaxed text-hub-text">
                          {command.example}
                        </pre>
                      )}
                      {command.exampleOutput && (
                        <>
                          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-hub-muted">
                            Expected output
                          </span>
                          <pre className="overflow-x-auto rounded-xl border border-hub-line bg-hub-bg p-4 font-mono text-sm leading-relaxed text-hub-sub dark:bg-hub-elevated">
                            {command.exampleOutput}
                          </pre>
                        </>
                      )}
                    </div>
                  )}

                  <div>
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-hub-muted">Interactive terminal</h3>
                      <button
                        type="button"
                        onClick={startSimulation}
                        className="rounded-lg bg-hub-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-hub-primary-hover dark:text-[#0d1117]"
                      >
                        {simRunning || (simVisible > 0 && simVisible < simLines.length) ? 'Running…' : 'Run again'}
                      </button>
                    </div>
                    <div
                      className="min-h-[140px] overflow-x-auto rounded-xl border border-[#1e293b] bg-[#020617] p-4 font-mono text-[13px] leading-relaxed text-slate-200 shadow-inner dark:border-slate-700"
                      aria-live="polite"
                    >
                      {simLines.slice(0, simVisible).map((line, i) => (
                        <motion.div
                          key={`${i}-${line.slice(0, 24)}`}
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={line.startsWith('$') ? 'text-emerald-400' : 'text-slate-300'}
                        >
                          {line}
                        </motion.div>
                      ))}
                      {simRunning && simVisible < simLines.length && (
                        <span className="inline-block h-4 w-2 animate-pulse bg-emerald-500/80 align-middle motion-reduce:animate-none" />
                      )}
                    </div>
                    <p className="mt-2 text-[11px] text-hub-faint">Simulated output only — nothing runs on your machine.</p>
                  </div>
                </div>
              )}

              {tab === 'useCase' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-hub-muted">Real use case</h3>
                    {command.scenarios ? (
                      <p className="text-base leading-relaxed text-hub-sub">{command.scenarios}</p>
                    ) : (
                      <p className="text-sm italic text-hub-faint">No scenario text for this command yet — check the overview description.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-hub-muted">Common mistakes</h3>
                    <ul className="space-y-2">
                      {mistakes.map((m, i) => (
                        <motion.li
                          key={i}
                          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: reduceMotion ? 0 : i * 0.05 }}
                          className="flex gap-2 rounded-lg border border-hub-line bg-hub-elevated/50 px-3 py-2.5 text-sm text-hub-sub dark:bg-hub-elevated/30"
                        >
                          <span className="font-bold text-hub-primary">•</span>
                          <span>{m}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {tab === 'related' && (
                <div className="space-y-6">
                  {flowSteps.length > 0 && (
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-hub-muted">Visual flow</h3>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {flowSteps.map((step, i) => {
                          const match = resolveCommandByLine?.(step)
                          return (
                            <span key={`${i}-${step}`} className="flex flex-wrap items-center gap-1.5">
                              {i > 0 && (
                                <span className="text-hub-faint" aria-hidden>
                                  →
                                </span>
                              )}
                              {match ? (
                                <button
                                  type="button"
                                  onClick={() => pickCommandFromFlow(step)}
                                  className="max-w-full truncate rounded-lg border border-hub-primary/35 bg-hub-tool-dim2 px-2.5 py-1.5 text-left font-mono text-[11px] font-semibold text-hub-primary transition-colors hover:bg-hub-tool-dim dark:text-hub-accent"
                                >
                                  {step}
                                </button>
                              ) : (
                                <span className="rounded-lg border border-hub-line bg-hub-elevated px-2.5 py-1.5 font-mono text-[11px] text-hub-muted">
                                  {step}
                                </span>
                              )}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {suggestedCommands.length > 0 ? (
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-hub-muted">Related commands</h3>
                      <ul className="space-y-2">
                        {suggestedCommands.map((cmd) => (
                          <li key={cmd.id}>
                            <button
                              type="button"
                              className="w-full rounded-xl border border-hub-line bg-hub-bg px-3 py-3 text-left transition-all hover:border-hub-primary/40 hover:bg-hub-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-hub-primary dark:bg-hub-elevated/50"
                              onClick={() => onSelectCommand?.(cmd)}
                            >
                              <code className="block font-mono text-sm font-semibold text-hub-primary dark:text-hub-accent">
                                {cmd.command}
                              </code>
                              <span className="mt-1 block text-sm text-hub-sub">{cmd.name}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-hub-faint">No related commands linked for this entry.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <p className="mt-8 flex items-center gap-2 border-t border-hub-line pt-4 text-xs font-medium text-hub-muted">
            <ToolIcon tool={command.tool} className="h-4 w-4 shrink-0 text-hub-muted" />
            {toolLabel(command.tool)} · {levelLabel(command.level)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
