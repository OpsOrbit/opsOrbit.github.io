import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  PLAYGROUND_TABS,
  findPlaygroundSimulation,
  suggestionsForTab,
  normalizePlaygroundInput,
} from '../../data/playgroundData'
import { useTypingText } from '../../hooks/useTypingText'

const TERM =
  'rounded-2xl border border-zinc-700/90 bg-zinc-950 text-zinc-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]'

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
    /** @type {{ type: 'cmd' | 'out' | 'err' | 'hint', text: string }[]} */ ([])
  )
  const [pendingOutput, setPendingOutput] = useState('')
  const [pendingExplain, setPendingExplain] = useState(/** @type {string | null} */ (null))
  const [explainOpen, setExplainOpen] = useState(false)
  const [explainUnlocked, setExplainUnlocked] = useState(false)

  const suggestions = useMemo(() => suggestionsForTab(activeTabId), [activeTabId])
  const filteredSuggest = useMemo(() => {
    const q = normalizePlaygroundInput(line)
    if (!q) return suggestions
    return suggestions.filter((s) => s.includes(q))
  }, [line, suggestions])

  const { displayed: typedOut, done: typingDone } = useTypingText(pendingOutput, {
    enabled: Boolean(pendingOutput),
    msPerChar: 6,
  })

  useEffect(() => {
    if (!typingDone || !pendingOutput) return
    setHistory((h) => {
      const last = h[h.length - 1]
      if (last?.type === 'out' && last.text === pendingOutput) return h
      return [...h, { type: 'out', text: pendingOutput }]
    })
    setExplainUnlocked(true)
    setPendingOutput('')
  }, [typingDone, pendingOutput])

  const runCommand = useCallback(() => {
    const raw = line.trim()
    if (!raw) return

    setExplainOpen(false)
    setPendingExplain(null)
    setExplainUnlocked(false)
    setPendingOutput('')

    const tabLabel = PLAYGROUND_TABS.find((t) => t.id === activeTabId)?.label || 'shell'
    setHistory((h) => [...h, { type: 'cmd', text: `${tabLabel} $ ${raw}` }])

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
          text: `bash: ${raw}: command not found (simulated — try a suggested command below)`,
        },
      ])
      setLine('')
      return
    }

    setPendingExplain(result.simulation.explain)
    setPendingOutput(result.simulation.output)
    setLine('')
  }, [line, activeTabId])

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

  const showExplainButton = Boolean(pendingExplain) && explainUnlocked && !pendingOutput

  return (
    <div className="min-w-0 pb-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-sm leading-relaxed text-[var(--hub-muted)]">
          Type real-looking CLI commands — output is <strong className="text-[var(--hub-text)]">simulated</strong> for
          learning. No cluster, daemon, or cloud credentials required.
        </p>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
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
                setHistory([])
              }}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] ${
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

      <div className={`${TERM} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Simulated terminal
          </span>
          <span className="rounded bg-zinc-800 px-2 py-0.5 font-mono text-[10px] text-zinc-400">dark · local only</span>
        </div>

        <div className="max-h-[min(420px,50vh)] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
          {history.length === 0 && !pendingOutput ? (
            <p className="text-zinc-500">
              Welcome. Try <span className="text-emerald-400">{suggestions[0] || 'a command'}</span> or pick a suggestion
              below.
            </p>
          ) : null}
          {history.map((row, i) => (
            <div
              key={i}
              className={`mb-3 whitespace-pre-wrap break-words ${
                row.type === 'cmd'
                  ? 'text-zinc-300'
                  : row.type === 'err'
                    ? 'text-rose-400'
                    : row.type === 'hint'
                      ? 'text-amber-400/95'
                      : 'text-zinc-100'
              }`}
            >
              {row.text}
            </div>
          ))}
          {pendingOutput ? (
            <div className="mb-3 whitespace-pre-wrap break-words text-zinc-100">{typedOut}</div>
          ) : null}
        </div>

        <div className="border-t border-zinc-800 bg-zinc-900/50 p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">Suggestions</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {filteredSuggest.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => applySuggestion(cmd)}
                className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 font-mono text-[11px] text-emerald-400/95 transition-colors hover:border-emerald-500/50 hover:bg-zinc-800"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-black/40 px-3 py-2">
            <span className="shrink-0 font-mono text-emerald-500">$</span>
            <datalist id="playground-cmd-suggest">
              {suggestions.map((cmd) => (
                <option key={cmd} value={cmd} />
              ))}
            </datalist>
            <input
              ref={inputRef}
              type="text"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              onKeyDown={onKeyDown}
              list="playground-cmd-suggest"
              placeholder={`Type command for ${PLAYGROUND_TABS.find((t) => t.id === activeTabId)?.label}…`}
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
              aria-label="Simulated command line"
            />
            <button
              type="button"
              onClick={runCommand}
              className="shrink-0 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
            >
              Run
            </button>
          </div>

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
            {pendingOutput ? (
              <span className="text-[11px] text-zinc-500">Typing output…</span>
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
                <div className="mt-3 rounded-xl border border-violet-500/30 bg-violet-950/40 p-3 text-sm leading-relaxed text-violet-100/95">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-violet-300/90">Explanation</p>
                  <p>{pendingExplain}</p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
