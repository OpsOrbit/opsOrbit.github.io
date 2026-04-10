import { useState, useMemo, useCallback } from 'react'
import { COMMON_PORTS } from './portCommonPorts'

export default function PortPanel() {
  const [host, setHost] = useState('localhost')
  const [portStr, setPortStr] = useState('443')
  const [protocol, setProtocol] = useState('auto')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const commonName = useMemo(() => {
    const p = Number(portStr)
    if (!Number.isInteger(p) || p < 1 || p > 65535) return null
    return COMMON_PORTS[p] ?? null
  }, [portStr])

  const runProbe = useCallback(async () => {
    setResult(null)
    const p = Number(portStr)
    if (!host.trim()) {
      setResult({ type: 'err', text: 'Enter a hostname or IP.' })
      return
    }
    if (!Number.isInteger(p) || p < 1 || p > 65535) {
      setResult({ type: 'err', text: 'Port must be an integer 1–65535.' })
      return
    }

    let url
    if (protocol === 'https' || (protocol === 'auto' && p === 443)) {
      url = `https://${host.trim()}:${p}/`
    } else if (protocol === 'http' || protocol === 'auto') {
      url = `http://${host.trim()}:${p}/`
    } else {
      url = p === 443 ? `https://${host.trim()}:${p}/` : `http://${host.trim()}:${p}/`
    }

    setLoading(true)
    const controller = new AbortController()
    const tid = window.setTimeout(() => controller.abort(), 12000)
    try {
      const res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        mode: 'cors',
        cache: 'no-store',
      })
      window.clearTimeout(tid)
      setResult({
        type: 'ok',
        text: `HTTP ${res.status} ${res.statusText}. A response usually means something accepted the connection.`,
      })
    } catch (e) {
      window.clearTimeout(tid)
      const name = e?.name || ''
      const msg = e instanceof Error ? e.message : String(e)
      if (name === 'AbortError') {
        setResult({
          type: 'warn',
          text: 'Request timed out (12s). Port may be closed, filtered, or not speaking HTTP on this URL.',
        })
      } else {
        setResult({
          type: 'warn',
          text: `No usable HTTP response: ${msg}. Browsers cannot open raw TCP; only HTTP(S) probes work.`,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [host, portStr, protocol])

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-extrabold text-[var(--hub-text)]">Port checker (HTTP probe)</h2>
      <p className="text-xs leading-relaxed text-[var(--hub-muted)]">
        Validates host and port, shows a common service name when known, then runs a short HTTP GET. Raw TCP cannot be tested in the browser — use{' '}
        <code className="rounded bg-[var(--hub-card)] px-1">nc</code> from a shell when needed.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Host</span>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            className="w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
            placeholder="example.com or 10.0.0.1"
            autoComplete="off"
          />
        </label>
        <label>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Port</span>
          <input
            type="text"
            inputMode="numeric"
            value={portStr}
            onChange={(e) => setPortStr(e.target.value)}
            className="w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
            placeholder="443"
          />
        </label>
        <label>
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Protocol</span>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2 text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
          >
            <option value="auto">Auto (http; 443 uses https)</option>
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>
        </label>
      </div>
      {commonName ? (
        <p className="text-xs text-[var(--hub-sub)]">
          <span className="font-bold text-[var(--hub-tool)]">Common use:</span> {commonName}
        </p>
      ) : null}
      <button
        type="button"
        disabled={loading}
        onClick={runProbe}
        className="rounded-xl border border-[var(--hub-tool)] bg-[var(--hub-tool-dim)] px-4 py-2.5 text-sm font-bold text-[var(--hub-text)] hover:opacity-95 disabled:opacity-50"
      >
        {loading ? 'Probing…' : 'Check port (HTTP GET)'}
      </button>
      <div>
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Result</span>
        {!result ? (
          <p className="rounded-xl border border-dashed border-[var(--hub-line)] bg-[var(--hub-elevated)]/30 px-3 py-4 text-sm text-[var(--hub-muted)]">
            Run a probe to see results here.
          </p>
        ) : (
          <p
            className={`rounded-xl border px-3 py-3 text-sm leading-relaxed ${
              result.type === 'ok'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                : result.type === 'err'
                  ? 'border-rose-500/40 bg-rose-500/10 text-rose-100'
                  : 'border-amber-500/40 bg-amber-500/10 text-amber-100'
            }`}
          >
            {result.text}
          </p>
        )}
      </div>
    </div>
  )
}
