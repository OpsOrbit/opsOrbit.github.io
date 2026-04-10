import { useState, useCallback } from 'react'

export default function JsonPanel() {
  const [input, setInput] = useState('{\n  "hello": "world"\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)

  const format = useCallback(
    (minify) => {
      setError(null)
      const t = input.trim()
      if (!t) {
        setOutput('')
        return
      }
      try {
        const obj = JSON.parse(t)
        setOutput(minify ? JSON.stringify(obj) : JSON.stringify(obj, null, 2))
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Invalid JSON')
        setOutput('')
      }
    },
    [input]
  )

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-extrabold text-[var(--hub-text)]">JSON formatter</h2>
      <div>
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Input</span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          className="w-full resize-y rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2.5 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
          spellCheck={false}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => format(false)}
            className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-tool-dim)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--hub-text)] hover:border-[var(--hub-tool)]"
          >
            Pretty-print
          </button>
          <button
            type="button"
            onClick={() => format(true)}
            className="rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--hub-muted)] hover:border-[var(--hub-tool)] hover:text-[var(--hub-text)]"
          >
            Minify
          </button>
        </div>
      </div>
      <div>
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Output</span>
        {error ? (
          <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 font-mono text-sm text-rose-200">{error}</p>
        ) : (
          <textarea
            readOnly
            value={output}
            rows={12}
            className="w-full resize-y rounded-xl border border-[var(--hub-line)] bg-[var(--hub-elevated)]/50 px-3 py-2.5 font-mono text-sm text-[var(--hub-text)]"
            placeholder="Pretty-print or minify output…"
          />
        )}
      </div>
    </div>
  )
}
