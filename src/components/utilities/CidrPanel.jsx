import { useState, useMemo } from 'react'
import { computeCidr, intToIpv4 } from '../../utils/cidrMath'

export default function CidrPanel() {
  const [input, setInput] = useState('10.0.0.0/24')
  const result = useMemo(() => {
    try {
      return { ok: true, data: computeCidr(input) }
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : 'Invalid CIDR' }
    }
  }, [input])

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-extrabold text-[var(--hub-text)]">CIDR calculator</h2>
      <label className="block">
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Input</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2.5 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
          placeholder="192.168.1.0/24"
          spellCheck={false}
        />
      </label>
      <div>
        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Output</span>
        {!result.ok ? (
          <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">{result.error}</p>
        ) : (
          <dl className="grid gap-2 rounded-xl border border-[var(--hub-line)] bg-[var(--hub-elevated)]/40 p-4 font-mono text-xs text-[var(--hub-sub)] sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Network</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">{result.data.network}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Broadcast</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">{result.data.broadcast}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Netmask</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">{intToIpv4(result.data.maskInt)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Wildcard</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">{intToIpv4(result.data.wildcardInt)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Prefix</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">/{result.data.prefix}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Total addresses</dt>
              <dd className="mt-0.5 text-[var(--hub-text)]">{result.data.totalAddresses}</dd>
            </div>
            {result.data.firstHost ? (
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Usable range</dt>
                <dd className="mt-0.5 text-[var(--hub-text)]">
                  {result.data.firstHost} — {result.data.lastHost} ({result.data.usableHosts} host
                  {result.data.usableHosts === 1 ? '' : 's'})
                </dd>
              </div>
            ) : (
              <div className="sm:col-span-2">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">Hosts</dt>
                <dd className="mt-0.5 text-[var(--hub-text)]">Narrow prefix — verify host counts for your use case</dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </div>
  )
}
