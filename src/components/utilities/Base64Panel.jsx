import { useState, useCallback } from 'react'

function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)))
}

function base64ToUtf8(str) {
  return decodeURIComponent(escape(atob(str)))
}

export default function Base64Panel() {
  const [plain, setPlain] = useState('')
  const [b64, setB64] = useState('')

  const encode = useCallback(() => {
    try {
      setB64(utf8ToBase64(plain))
    } catch {
      setB64('// encode error')
    }
  }, [plain])

  const decode = useCallback(() => {
    try {
      const t = b64.trim()
      if (!t) {
        setPlain('')
        return
      }
      setPlain(base64ToUtf8(t))
    } catch {
      setPlain('// invalid Base64')
    }
  }, [b64])

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-extrabold text-[var(--hub-text)]">Base64 encoder / decoder</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Plain text</span>
          <textarea
            value={plain}
            onChange={(e) => setPlain(e.target.value)}
            rows={8}
            className="w-full resize-y rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2.5 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
            placeholder="Type UTF-8 text…"
          />
          <button
            type="button"
            onClick={encode}
            className="mt-2 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-tool-dim)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--hub-text)] hover:border-[var(--hub-tool)]"
          >
            Encode →
          </button>
        </div>
        <div>
          <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-[var(--hub-muted)]">Base64</span>
          <textarea
            value={b64}
            onChange={(e) => setB64(e.target.value)}
            rows={8}
            className="w-full resize-y rounded-xl border border-[var(--hub-border2)] bg-[var(--hub-card)] px-3 py-2.5 font-mono text-sm text-[var(--hub-text)] outline-none focus:border-[var(--hub-tool)]"
            placeholder="Paste Base64…"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={decode}
            className="mt-2 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-tool-dim)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[var(--hub-text)] hover:border-[var(--hub-tool)]"
          >
            ← Decode
          </button>
        </div>
      </div>
    </div>
  )
}
