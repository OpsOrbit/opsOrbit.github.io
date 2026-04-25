import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  PLAYGROUND_TABS,
  findPlaygroundSimulation,
  filterSuggestionsForTab,
  normalizePlaygroundInput,
  PLAYGROUND_SIMULATIONS,
} from '../../data/playgroundData'
import { useTypingText } from '../../hooks/useTypingText'

const TERM =
  'rounded-2xl border border-zinc-700/90 bg-zinc-950 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'

const LS_RUN_COUNTS = 'opsorbit-playground-run-counts'
const LS_FAVORITES = 'opsorbit-playground-favorites'
const LS_HISTORY = 'opsorbit-playground-run-history'

function loadJson(key, fallback) {
  try {
    const v = localStorage.getItem(key)
    return v ? JSON.parse(v) : fallback
  } catch {
    return fallback
  }
}

/** Simple tokenizer for input highlight: flags, subcommands */
function tokenizeHighlight(line) {
  const parts = line.split(/(\s+)/)
  return parts.map((p, i) => {
    if (/^\s+$/.test(p)) return { key: `w-${i}`, text: p, cls: '' }
    if (p.startsWith('-')) return { key: `f-${i}`, text: p, cls: 'text-amber-400/95' }
    if (/^[a-z0-9_-]+$/i.test(p) && p.includes('.'))
      return { key: `h-${i}`, text: p, cls: 'text-cyan-400/90' }
    return { key: `t-${i}`, text: p, cls: 'text-zinc-100' }
  })
}

/**
 * @param {{
 *   activeTabId: import('../../data/playgroundData').PlaygroundTabId
 *   onSelectTab: (id: import('../../data/playgroundData').PlaygroundTabId) => void
 *   inputRef?: React.RefObject<HTMLInputElement | null>
 * }} props
 */
export default function PlaygroundPage({ activeTabId, onSelectTab, inputRef }) {
  const [line, setLine] = useState('')
  const [history, setHistory] = useState(
    /** @type {{ type: 'cmd' | 'out' | 'err' | 'hint', text: string, outKind?: string }[]} */ ([])
  )
  const [pendingOutput, setPendingOutput] = useState('')
  const [pendingExplain, setPendingExplain] = useState(/** @type {{ command: string, output: string, usage: string } | null} */ (null))
  const [pendingOutKind, setPendingOutKind] = useState(/** @type {string | undefined} */ (undefined))
  const [explainOpen, setExplainOpen] = useState(false)
  const [explainUnlocked, setExplainUnlocked] = useState(false)
  const [latencySim, setLatencySim] = useState(/** @type {import('../../data/playgroundData').PlaygroundSimulation | null} */ (null))
  const [inputFocused, setInputFocused] = useState(false)
  const [runCounts, setRunCounts] = useState(() => loadJson(LS_RUN_COUNTS, {}))
  const [favoriteIds, setFavoriteIds] = useState(() => loadJson(LS_FAVORITES, []))
  const [runHistory, setRunHistory] = useState(() => loadJson(LS_HISTORY, []))
  const [historyOpen, setHistoryOpen] = useState(false)

  const activeSimRef = useRef(/** @type {import('../../data/playgroundData').PlaygroundSimulation | null} */ (null))

  const suggestions = useMemo(
    () => PLAYGROUND_SIMULATIONS.filter((s) => s.tab === activeTabId).map((s) => s.canonical),
    [activeTabId]
  )

  const filteredSuggest = useMemo(() => filterSuggestionsForTab(activeTabId, line), [line, activeTabId])

  const draftCommandHint = useMemo(() => {
    const r = findPlaygroundSimulation(line, activeTabId)
    if (r.kind !== 'ok' || !r.simulation.hint) return null
    return r.simulation.hint
  }, [line, activeTabId])

  const mostUsedForTab = useMemo(() => {
    const sims = PLAYGROUND_SIMULATIONS.filter((s) => s.tab === activeTabId)
    return [...sims]
      .sort((a, b) => (runCounts[b.id] || 0) - (runCounts[a.id] || 0))
      .slice(0, 6)
  }, [activeTabId, runCounts])

  const favoritesInTab = useMemo(() => {
    return PLAYGROUND_SIMULATIONS.filter((s) => s.tab === activeTabId && favoriteIds.includes(s.id))
  }, [activeTabId, favoriteIds])

  const persistCounts = useCallback((next) => {
    setRunCounts(next)
    try {
      localStorage.setItem(LS_RUN_COUNTS, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  const toggleFavorite = useCallback((simId) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(simId) ? prev.filter((x) => x !== simId) : [...prev, simId]
      try {
        localStorage.setItem(LS_FAVORITES, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const pushRunHistory = useCallback((canonical) => {
    setRunHistory((prev) => {
      const entry = { tab: activeTabId, canonical, at: Date.now() }
      const next = [entry, ...prev.filter((x) => !(x.tab === entry.tab && x.canonical === entry.canonical))].slice(0, 25)
      try {
        localStorage.setItem(LS_HISTORY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      return next
    })
  }, [activeTabId])

  const { displayed: typedOut, done: typingDone } = useTypingText(pendingOutput, {
    enabled: Boolean(pendingOutput),
    msPerChar: 5,
  })

  useEffect(() => {
    if (!typingDone || !pendingOutput) return
    const sim = activeSimRef.current
    const outKind = sim?.outputKind || 'success'
    setHistory((h) => {
      const last = h[h.length - 1]
      if (last?.type === 'out' && last.text === pendingOutput) return h
      return [...h, { type: 'out', text: pendingOutput, outKind }]
    })
    setExplainUnlocked(true)
    if (sim?.id) {
      persistCounts((c) => ({ ...c, [sim.id]: (c[sim.id] || 0) + 1 }))
    }
    setPendingOutput('')
    activeSimRef.current = null
  }, [typingDone, pendingOutput, persistCounts])

  useEffect(() => {
    if (!latencySim) return
    const t = window.setTimeout(() => {
      activeSimRef.current = latencySim
      setPendingExplain(latencySim.explain)
      setPendingOutKind(latencySim.outputKind || 'success')
      setPendingOutput(latencySim.output)
      setLatencySim(null)
    }, 420)
    return () => window.clearTimeout(t)
  }, [latencySim])

  const runCommand = useCallback(() => {
    const raw = line.trim()
    if (!raw) return

    setExplainOpen(false)
    setPendingExplain(null)
    setExplainUnlocked(false)
    setPendingOutput('')
    setLatencySim(null)
    activeSimRef.current = null

    const tabMeta = PLAYGROUND_TABS.find((t) => t.id === activeTabId)
    const tabLabel = tabMeta?.label || 'shell'
    const prompt = `${tabMeta?.icon || '◇'} ${tabMeta?.cli || 'sh'}`
    setHistory((h) => [...h, { type: 'cmd', text: `${prompt} $ ${raw}` }])

    const result = findPlaygroundSimulation(raw, activeTabId)

    if (result.kind === 'empty') {
      setLine('')
      return
    }

    if (result.kind === 'wrongTab') {
      setHistory((h) => [...h, { type: 'hint', text: result.message }])
      setLine('')
      return
    }

    if (result.kind === 'unknown') {
      setHistory((h) => [
        ...h,
        {
          type: 'err',
          text: `bash: ${raw}: command not found (simulated — try a suggested command or pick from Most used)`,
        },
      ])
      setLine('')
      return
    }

    pushRunHistory(result.simulation.canonical)
    setLatencySim(result.simulation)
    setLine('')
  }, [line, activeTabId, pushRunHistory])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      runCommand()
    }
  }

  const applySuggestion = (cmd) => {
    setLine(cmd)
    inputRef?.current?.focus()
  }

  const copyLastCommand = useCallback(() => {
    const cmdLine = [...history].reverse().find((r) => r.type === 'cmd')
    if (!cmdLine) return
    const m = cmdLine.text.match(/\$\s+(.+)$/)
    const cmd = m ? m[1] : cmdLine.text
    navigator.clipboard?.writeText(cmd).catch(() => {})
  }, [history])

  const clearTerminal = useCallback(() => {
    setHistory([])
    setPendingOutput('')
    setLatencySim(null)
    setPendingExplain(null)
    setExplainOpen(false)
    setExplainUnlocked(false)
    activeSimRef.current = null
  }, [])

  const showExplainButton = Boolean(pendingExplain) && explainUnlocked && !pendingOutput && !latencySim

  const activeTab = PLAYGROUND_TABS.find((t) => t.id === activeTabId)

  return (
    <div className="min-w-0 max-w-full pb-8 sm:pb-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm leading-relaxed text-[var(--hub-muted)]">
          Type CLI commands — output is <strong className="text-[var(--hub-text)]">simulated</strong> for learning. Use{' '}
          <kbd className="rounded border border-[var(--hub-border2)] bg-[var(--hub-elevated)] px-1.5 py-0.5 font-mono text-[11px]">
            , 
          </kbd>{' '}
          /{' '}
          <kbd className="rounded border border-[var(--hub-border2)] bg-[var(--hub-elevated)] px-1.5 py-0.5 font-mono text-[11px]">
            .
          </kbd>{' '}
          to switch workspaces app-wide; here, pick a tool tab and run suggested commands.
        </p>
      </div>

      <div className="mb-3 flex max-w-full flex-wrap gap-1.5 sm:gap-2">
        {PLAYGROUND_TABS.map((t) => {
          const active = activeTabId === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                onSelectTab(t.id)
                setExplainOpen(false)
                setPendingExplain(null)
                setExplainUnlocked(false)
                setPendingOutput('')
                setLatencySim(null)
                setHistory([])
              }}
              className={`flex min-h-[2.15rem] items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] sm:gap-2 sm:px-3 sm:py-2 sm:text-sm ${
                active
                  ? 'border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] text-[var(--hub-text)]'
                  : 'border-[var(--hub-border2)] bg-[var(--hub-surface)] text-[var(--hub-muted)] hover:border-[var(--hub-line)] hover:text-[var(--hub-text)]'
              }`}
              aria-pressed={active}
            >
              <span aria-hidden>{t.icon}</span>
              {t.label}
            </button>
          )
        })}
      </div>

      <div className={`${TERM} max-w-full overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900/80 px-3 py-2 sm:px-4 sm:py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-lg leading-none" aria-hidden>
              {activeTab?.icon}
            </span>
            <div className="min-w-0">
              <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Simulated terminal
              </span>
              <span className="block truncate font-mono text-[10px] text-emerald-500/90">{activeTab?.label}</span>
            </div>
          </div>
          <div className="flex min-w-0 shrink-0 flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={copyLastCommand}
              className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-2 py-1 font-mono text-[10px] font-bold text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300"
            >
              Copy command
            </button>
            <button
              type="button"
              onClick={clearTerminal}
              className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-2 py-1 font-mono text-[10px] font-bold text-zinc-300 hover:border-rose-500/40 hover:text-rose-300"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setHistoryOpen((v) => !v)}
              className={`rounded-lg border px-2 py-1 font-mono text-[10px] font-bold ${
                historyOpen ? 'border-violet-500/50 bg-violet-950/40 text-violet-200' : 'border-zinc-600 bg-zinc-800/80 text-zinc-300'
              }`}
            >
              History ({runHistory.length})
            </button>
            <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-500">local only</span>
          </div>
        </div>

        <AnimatePresence>
          {historyOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-zinc-800 bg-black/30"
            >
              <div className="max-h-40 overflow-y-auto p-3 font-mono text-[11px] text-zinc-400">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Run history (session)</p>
                {runHistory.length === 0 ? (
                  <p className="text-zinc-600">No commands yet.</p>
                ) : (
                  <ul className="space-y-1">
                    {runHistory.slice(0, 15).map((h, i) => (
                      <li key={`${h.at}-${i}`} className="flex justify-between gap-2 border-b border-zinc-800/80 pb-1">
                        <span className="truncate text-emerald-500/90">{h.canonical}</span>
                        <span className="shrink-0 text-zinc-600">{new Date(h.at).toLocaleTimeString()}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="max-h-[min(440px,52vh)] overflow-y-auto p-3 font-mono text-[12px] leading-relaxed sm:p-4 sm:text-sm">
          {history.length === 0 && !pendingOutput && !latencySim ? (
            <p className="text-zinc-500">
              Welcome. Try <span className="text-emerald-400">{suggestions[0] || 'a command'}</span> or choose from{' '}
              <strong className="text-zinc-300">Most used</strong> below.
            </p>
          ) : null}
          {latencySim ? (
            <div className="mb-3 flex items-center gap-2 text-zinc-400">
              <span
                className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400"
                aria-hidden
              />
              <span>Preparing simulated output…</span>
            </div>
          ) : null}
          {history.map((row, i) => {
            const outCls =
              row.outKind === 'error'
                ? 'text-rose-400'
                : row.outKind === 'table'
                  ? 'border-l-2 border-emerald-500/25 pl-2 text-zinc-100'
                  : 'text-zinc-100'
            return (
              <div
                key={i}
                className={`mb-3 whitespace-pre-wrap break-words ${
                  row.type === 'cmd'
                    ? 'text-zinc-300'
                    : row.type === 'err'
                      ? 'text-rose-400'
                      : row.type === 'hint'
                        ? 'text-amber-400/95'
                        : outCls
                }`}
              >
                {row.text}
              </div>
            )
          })}
          {pendingOutput ? (
            <div
              className={`mb-3 whitespace-pre-wrap break-words ${
                pendingOutKind === 'error' ? 'text-rose-400' : pendingOutKind === 'table' ? 'border-l-2 border-emerald-500/25 pl-2 text-zinc-100' : 'text-zinc-100'
              }`}
            >
              {typedOut}
            </div>
          ) : null}
        </div>

        <div className="border-t border-zinc-800 bg-zinc-900/50 p-3">
          {mostUsedForTab.length > 0 ? (
            <div className="mb-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-500/90">Most used</p>
              <div className="flex max-w-full flex-wrap gap-1.5">
                {mostUsedForTab.map((sim) => (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => applySuggestion(sim.canonical)}
                    className="max-w-full truncate rounded-lg border border-amber-900/50 bg-amber-950/30 px-2.5 py-1 font-mono text-[10px] text-amber-200/95 transition-colors hover:border-amber-500/50 sm:text-[11px]"
                  >
                    {sim.canonical}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-amber-500/90">Most used</p>
              <p className="text-[11px] text-zinc-500">Run commands to populate this list from your usage.</p>
            </div>
          )}

          {favoritesInTab.length > 0 ? (
            <div className="mb-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-violet-400/90">Favorites</p>
              <div className="flex max-w-full flex-wrap gap-1.5">
                {favoritesInTab.map((sim) => (
                  <button
                    key={sim.id}
                    type="button"
                    onClick={() => applySuggestion(sim.canonical)}
                    className="max-w-full truncate rounded-lg border border-violet-800/60 bg-violet-950/40 px-2.5 py-1 font-mono text-[10px] text-violet-200/95 hover:border-violet-500/50 sm:text-[11px]"
                  >
                    {sim.canonical}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Suggestions</p>
          <div className="mb-3 flex max-w-full flex-wrap gap-1.5">
            {filteredSuggest.slice(0, 14).map((cmd) => {
              const sim = PLAYGROUND_SIMULATIONS.find((s) => s.tab === activeTabId && s.canonical === cmd)
              const fav = sim && favoriteIds.includes(sim.id)
              return (
                <span key={cmd} className="inline-flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => applySuggestion(cmd)}
                    className="max-w-full truncate rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-mono text-[10px] text-emerald-400/95 transition-colors hover:border-emerald-500/50 hover:bg-zinc-800 sm:text-[11px]"
                  >
                    {cmd}
                  </button>
                  {sim ? (
                    <button
                      type="button"
                      title={fav ? 'Remove favorite' : 'Favorite'}
                      onClick={() => toggleFavorite(sim.id)}
                      className="rounded p-0.5 text-sm leading-none text-zinc-500 hover:text-amber-400"
                      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {fav ? '★' : '☆'}
                    </button>
                  ) : null}
                </span>
              )
            })}
          </div>

          <p className="mb-2 font-mono text-[10px] text-zinc-500">
            <span className="text-zinc-600">Tips:</span> flags often look like{' '}
            <span className="text-amber-400/90">-n</span> or <span className="text-amber-400/90">--name</span> — simulated
            commands match exactly; use suggestions or Most used.
          </p>

          <div className="relative flex flex-col items-stretch gap-2 rounded-xl border border-zinc-700 bg-black/40 px-3 py-2 sm:flex-row sm:items-stretch">
            <span className="flex shrink-0 items-center font-mono text-emerald-500">$</span>
            <div className="relative min-h-[1.5rem] min-w-0 flex-1 font-mono text-sm leading-normal">
              <div className="pointer-events-none absolute inset-0 whitespace-pre-wrap break-all" aria-hidden>
                {tokenizeHighlight(line).map((tok) => (
                  <span key={tok.key} className={tok.cls || 'text-zinc-100'}>
                    {tok.text}
                  </span>
                ))}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={line}
                onChange={(e) => setLine(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder={`Type command for ${activeTab?.label}…`}
                autoComplete="off"
                spellCheck={false}
                list="playground-cmd-suggest"
                className="relative w-full bg-transparent font-mono text-sm text-transparent caret-emerald-400 outline-none placeholder:text-zinc-600"
                style={{ caretColor: '#34d399' }}
                aria-label="Simulated command line"
              />
            </div>
            {inputFocused ? (
              <span className="pointer-events-none mr-0.5 inline-block min-h-[1.25rem] w-2 self-center animate-pulse bg-emerald-400/90" aria-hidden />
            ) : null}
            <button
              type="button"
              onClick={runCommand}
              className="shrink-0 self-stretch rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500 sm:self-center"
            >
              Run
            </button>
          </div>
          {draftCommandHint ? (
            <p className="mt-2 font-mono text-[10px] leading-relaxed text-cyan-400/90">
              <span className="text-zinc-500">Command hint:</span> {draftCommandHint}
            </p>
          ) : null}
          <datalist id="playground-cmd-suggest">
            {suggestions.map((cmd) => (
              <option key={cmd} value={cmd} />
            ))}
          </datalist>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={!showExplainButton}
              onClick={() => setExplainOpen((v) => !v)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors ${
                showExplainButton
                  ? 'border-violet-500/50 bg-violet-950/50 text-violet-200 hover:bg-violet-900/50'
                  : 'cursor-not-allowed border-zinc-800 text-zinc-600'
              }`}
            >
              Explain output
            </button>
            {latencySim || pendingOutput ? (
              <span className="text-[11px] text-zinc-500">{latencySim ? 'Preparing output…' : 'Typing output…'}</span>
            ) : null}
          </div>

          <AnimatePresence>
            {explainOpen && pendingExplain ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-3 rounded-xl border border-violet-500/30 bg-violet-950/40 p-3 text-sm leading-relaxed text-violet-100/95">
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-violet-300/90">What the command does</p>
                    <p>{pendingExplain.command}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-violet-300/90">Reading the output</p>
                    <p>{pendingExplain.output}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-violet-300/90">Real-world usage</p>
                    <p>{pendingExplain.usage}</p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
